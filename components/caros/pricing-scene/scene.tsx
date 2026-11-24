'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { PricingSceneCapability, PricingSceneProps } from '../../../lib/pricing3d-scene-types';
import { buildModel, mixHomes, sampleSurface, transitionAt, type SurfaceSamples } from './model';
import { erosionField, particleFragment, particleVertex } from './shaders';

export default function PricingScene(props: PricingSceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  latest.current = props;
  const control = useRef<(() => void) | null>(null);
  useEffect(() => { control.current?.(); }, [props.capability, props.paused, props.dissolve]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { latest.current.onError?.('WebGL is unavailable'); return; }
    const canvas = renderer.domElement;
    canvas.setAttribute('data-pricing3d-canvas', '');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');
    Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block', touchAction: 'pan-y' });
    container.appendChild(canvas);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 60);
    const pivot = new THREE.Group();
    pivot.rotation.set(.12, -.19, -.025);
    scene.add(pivot);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .05);
    scene.environment = environment.texture;
    room.dispose(); pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffefcf, 0x233044, 2));
    for (const [x,y,z,color,power] of [[-3,5,5,0xffedbe,4.5],[4,1,-2,0xd0e6ff,4],[1,-2,4,0xffc566,2.5]]) {
      const light = new THREE.DirectionalLight(color, power); light.position.set(x,y,z);scene.add(light);
    }
    const mobile = matchMedia('(pointer: coarse)').matches;
    const count = mobile ? 6000 : 18000;
    container.dataset.particleCount = String(count);
    const uniforms = { brush: { value: new THREE.Vector3() }, amount: { value: 0 }, globalMode: { value: 0 }, clock: { value: 0 }, density: { value: 1 }, morph: { value: 0 } };
    const gold = new THREE.MeshPhysicalMaterial({ color: 0xdbaa4c, metalness: 1, roughness: .27, clearcoat: .24, clearcoatRoughness: .3, side: THREE.DoubleSide });
    gold.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = 'varying vec3 restHome;\n' + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nrestHome=position;');
      shader.fragmentShader = erosionField + '\nvarying vec3 restHome;\n' + shader.fragmentShader.replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\nif(erosion(restHome)<amount)discard;');
    };
    gold.customProgramCacheKey = () => 'caros-rest-erosion-v1';
    type Model = { geometry: THREE.BufferGeometry; samples: SurfaceSamples };
    const cache = new Map<PricingSceneCapability, Model>();
    const model = (key: PricingSceneCapability) => {
      let m = cache.get(key);
      if (!m) { const geometry=buildModel(key);m={geometry,samples:sampleSurface(geometry,count,722)};cache.set(key,m); }
      return m;
    };
    let selected = latest.current.capability;
    let source = model(selected).samples;
    let target = source;
    const mesh = new THREE.Mesh(model(selected).geometry, gold);
    pivot.add(mesh);
    const cloud = new THREE.BufferGeometry();
    const attach = () => {
      const update = (name:string, values:Float32Array, size:number) => {
        const attribute=cloud.getAttribute(name);
        if(attribute){attribute.array.set(values);attribute.needsUpdate=true;}
        else cloud.setAttribute(name,new THREE.BufferAttribute(values.slice(),size).setUsage(THREE.DynamicDrawUsage));
      };
      update('position',source.positions,3);update('normal',source.normals,3);
      update('targetHome',target.positions,3);update('targetNormal',target.normals,3);update('seed',target.seeds,1);
    };
    attach();
    const dust = new THREE.ShaderMaterial({ uniforms, vertexShader:particleVertex, fragmentShader:particleFragment, transparent:true, depthWrite:false, depthTest:true });
    const points = new THREE.Points(cloud,dust);points.frustumCulled=false;pivot.add(points);
    // Analytic soft grounding pool, no fake model imagery or CPU shadow sampling.
    const groundGeometry = new THREE.PlaneGeometry(6,3);
    const groundMaterial = new THREE.ShaderMaterial({ transparent:true,depthWrite:false,
      vertexShader:'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:'varying vec2 v;void main(){float a=exp(-dot((v-.5)*vec2(4.,5.),(v-.5)*vec2(4.,5.)));gl_FragColor=vec4(.42,.26,.075,a*.13);}' });
    const ground = new THREE.Mesh(groundGeometry,groundMaterial);ground.rotation.x=-Math.PI/2;ground.position.y=-1.65;scene.add(ground);
    const ray = new THREE.Raycaster(), pointer = new THREE.Vector2(), aim = new THREE.Vector3();
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0, previous=0, elapsed=0, progress=1, visible=true, lost=false, disposed=false, inside=false, active=false, ready=false, dragX:number|null=null, yaw=0;
    let touch=false, reported=false;
    const release = () => { inside=false;active=false;dragX=null;reported=false; };
    const allowed = () => !disposed && !lost && visible && !document.hidden && !latest.current.paused;
    const schedule = () => { if(!raf && allowed())raf=requestAnimationFrame(draw); };
    const stop = () => { if(raf)cancelAnimationFrame(raf);raf=0;previous=0; };
    renderer.debug.onShaderError = () => { lost=true;stop();latest.current.onError?.('WebGL shader compilation failed'); };
    function changeSelection() {
      const key=latest.current.capability;
      if(key===selected)return;
      const interrupted=progress<1;
      // Snapshot current homes on rapid retarget; never mutate cached sample buffers.
      source={positions:mixHomes(source.positions,target.positions,uniforms.morph.value),normals:mixHomes(source.normals,target.normals,uniforms.morph.value),seeds:target.seeds};
      target=model(key).samples;selected=key;release();
      if(motion.matches){source=target;mesh.geometry=model(key).geometry;progress=1;uniforms.amount.value=0;uniforms.morph.value=0;}
      else {progress=interrupted?.24:0;uniforms.morph.value=0;}
      attach();container!.dataset.selected=key;
    }
    function draw(now:number) {
      raf=0;if(!allowed())return;
      const dt=Math.min(.04,previous?(now-previous)/1000:.016);previous=now;
      elapsed+=dt;uniforms.clock.value=elapsed;
      changeSelection();
      const staticMotion=motion.matches;
      pivot.rotation.y=THREE.MathUtils.damp(pivot.rotation.y,-.19+yaw,10,dt);
      scene.updateMatrixWorld(true);
      if(inside && !staticMotion && progress>=1){
        ray.setFromCamera(pointer,camera);const hit=ray.intersectObject(mesh,false)[0];active=!!hit;
        if(hit){pivot.worldToLocal(aim.copy(hit.point));if(uniforms.amount.value<.001)uniforms.brush.value.copy(aim);if(!reported){latest.current.onInteraction?.('dissolve');reported=true;}}
      } else active=false;
      uniforms.brush.value.lerp(aim,1-Math.exp(-16*dt));
      let phase='idle';
      if(progress<1 && !staticMotion){
        progress=Math.min(1,progress+dt/2.35);const state=transitionAt(progress);
        uniforms.globalMode.value=1;uniforms.amount.value=state.exposure;uniforms.morph.value=state.morph;phase=state.phase;
        if(state.morph>=.5)mesh.geometry=model(selected).geometry;
        if(progress===1){source=target;attach();uniforms.morph.value=0;latest.current.onInteraction?.('reassemble');}
      }else{
        if(staticMotion){progress=1;source=target;mesh.geometry=model(selected).geometry;uniforms.morph.value=0;}
        const keyboard=!!latest.current.dissolve&&!staticMotion;
        // Global preview persists during release; prevents keyboard dissolve from snapping into a brush.
        if(keyboard)uniforms.globalMode.value=1;else if(uniforms.amount.value<.002)uniforms.globalMode.value=0;
        const wanted=staticMotion?0:keyboard?1.7:active?1:0;
        uniforms.amount.value=staticMotion?0:THREE.MathUtils.damp(uniforms.amount.value,wanted,wanted?8:3.5,dt);
        if(uniforms.amount.value<.001)uniforms.amount.value=0;
        if(uniforms.amount.value>.002)phase=wanted?'dissolving':'reforming';
      }
      points.visible=uniforms.amount.value>0;
      container!.dataset.phase=phase;
      container!.dataset.exposure=uniforms.amount.value.toFixed(3);
      container!.dataset.morph=uniforms.morph.value.toFixed(3);
      container!.dataset.hit=String(active);
      container!.dataset.frames=String(Number(container!.dataset.frames||0)+1);
      renderer.render(scene,camera);
      if(!ready){ready=true;latest.current.onReady?.();}
      if(!staticMotion && (progress<1||inside||uniforms.amount.value>0||Math.abs(pivot.rotation.y+.19-yaw)>.001))schedule();
    }
    function pointerEvent(e:PointerEvent){
      const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;
      pointer.set((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2);
      touch=e.pointerType==='touch';inside=true;
      if(dragX!==null && !motion.matches){const delta=e.clientX-dragX;if(Math.abs(delta)>1){yaw=THREE.MathUtils.clamp(yaw+delta*.004,-.65,.65);latest.current.onInteraction?.('rotate');}dragX=e.clientX;}
      schedule();
    }
    const down=(e:PointerEvent)=>{pointerEvent(e);dragX=e.clientX;};
    const up=()=>{dragX=null;if(touch)release();schedule();};
    const leave=()=>{release();schedule();};
    const visibility=()=>{release();if(document.hidden)stop();else schedule();};
    const preferences=()=>{release();progress=1;source=target;attach();mesh.geometry=model(selected).geometry;uniforms.amount.value=0;uniforms.morph.value=0;schedule();};
    const contextLost=(e:Event)=>{e.preventDefault();lost=true;stop();latest.current.onError?.('WebGL context was lost');};
    const resize=()=>{
      const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;
      const dpr=Math.min(devicePixelRatio||1,mobile?1:1.5);uniforms.density.value=dpr;
      renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);camera.aspect=w/h;
      camera.position.set(0,.15,7.1/Math.min(1,camera.aspect));camera.lookAt(0,0,0);camera.updateProjectionMatrix();camera.updateMatrixWorld();schedule();
    };
    const ro=new ResizeObserver(resize);ro.observe(container);
    const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{release();stop();}},{threshold:0});io.observe(container);
    canvas.addEventListener('pointermove',pointerEvent);canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointerleave',leave);canvas.addEventListener('pointercancel',leave);canvas.addEventListener('webglcontextlost',contextLost);
    window.addEventListener('blur',leave);document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',preferences);
    control.current=()=>{changeSelection();if(latest.current.paused){release();stop();}else schedule();};
    container.dataset.selected=selected;container.dataset.phase='idle';resize();schedule();
    return()=>{
      disposed=true;stop();control.current=null;ro.disconnect();io.disconnect();
      canvas.removeEventListener('pointermove',pointerEvent);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('pointercancel',leave);canvas.removeEventListener('webglcontextlost',contextLost);
      window.removeEventListener('blur',leave);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',preferences);
      cache.forEach(m=>m.geometry.dispose());cache.clear();cloud.dispose();gold.dispose();dust.dispose();groundGeometry.dispose();groundMaterial.dispose();environment.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();
    };
  }, []);
  return <div ref={host} data-pricing3d-scene="" style={{ position:'relative',width:'100%',height:'100%',overflow:'hidden' }} />;
}
