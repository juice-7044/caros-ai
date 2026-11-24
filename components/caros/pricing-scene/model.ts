import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { PricingSceneCapability } from '../../../lib/pricing3d-scene-types';

export interface SurfaceSamples { positions: Float32Array; normals: Float32Array; seeds: Float32Array }
/** Area-weighted sampling adapted from Meng To's MIT hover-particle-dissolve demo. */
export function sampleSurface(geometry: THREE.BufferGeometry, count: number, seed = 722): SurfaceSamples {
  const p = geometry.getAttribute('position'), n = geometry.getAttribute('normal');
  if (!p || p.count < 3 || count < 1) throw new Error('A nonempty triangle surface is required');
  const index = geometry.index, triangles = Math.floor((index ? index.count : p.count) / 3);
  const areas = new Float64Array(triangles), a = new THREE.Vector3(), b = a.clone(), c = a.clone();
  const tri = new THREE.Triangle(a,b,c);
  const at = (i: number) => index ? index.getX(i) : i;
  let total = 0;
  for (let i=0;i<triangles;i++) {
    a.fromBufferAttribute(p,at(i*3)); b.fromBufferAttribute(p,at(i*3+1)); c.fromBufferAttribute(p,at(i*3+2));
    areas[i] = total += tri.getArea();
  }
  if (!Number.isFinite(total) || total <= 0) throw new Error('A nonzero surface is required');
  const random = () => ((seed = (Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  const positions = new Float32Array(count*3), normals = new Float32Array(count*3), seeds = new Float32Array(count);
  for(let i=0;i<count;i++) {
    let lo=0,hi=triangles-1; const pick=random()*total;
    while(lo<hi){const m=(lo+hi)>>>1;if(areas[m]<pick)lo=m+1;else hi=m;}
    const u=Math.sqrt(random()), v=random(), w=[1-u,u*(1-v),u*v];
    for(let j=0;j<3;j++) {
      const k=at(lo*3+j);
      positions[i*3]+=p.getX(k)*w[j];positions[i*3+1]+=p.getY(k)*w[j];positions[i*3+2]+=p.getZ(k)*w[j];
      if(n){normals[i*3]+=n.getX(k)*w[j];normals[i*3+1]+=n.getY(k)*w[j];normals[i*3+2]+=n.getZ(k)*w[j];}
    }
    a.fromArray(normals,i*3).normalize().toArray(normals,i*3); seeds[i]=random();
  }
  return {positions,normals,seeds};
}

export function mixHomes(a: Float32Array, b: Float32Array, t: number): Float32Array {
  if(a.length!==b.length) throw new Error('Equal particle budgets required');
  const out=new Float32Array(a.length);t=Math.max(0,Math.min(1,t));
  for(let i=0;i<a.length;i++)out[i]=a[i]+(b[i]-a[i])*t;
  return out;
}
export function transitionAt(progress: number) {
  const t=Math.max(0,Math.min(1,progress));
  const smooth=(x:number)=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
  return {
    phase: t>=1?'idle':t<.24?'dissolving':t<.76?'morphing':'reforming',
    morph:smooth((t-.22)/.56),
    exposure:t<.24?smooth(t/.24)*1.7:t>.76?(1-smooth((t-.76)/.24))*1.7:1.7,
  };
}

/** All vertices baked to a common pivot; no external font or model download. */
export function buildModel(kind: PricingSceneCapability): THREE.BufferGeometry {
  const pieces: THREE.BufferGeometry[]=[];
  function part(g: THREE.BufferGeometry,x=0,y=0,z=0,rx=0,ry=0,rz=0){
    g.rotateX(rx);g.rotateY(ry);g.rotateZ(rz);g.translate(x,y,z);
    const flat=g.index?g.toNonIndexed():g;
    if(flat!==g)g.dispose();
    // Keep identical attributes for mergeGeometries.
    flat.deleteAttribute('uv');pieces.push(flat);return flat;
  }
  const box=(w:number,h:number,d:number,x=0,y=0,z=0,rz=0)=>part(new THREE.BoxGeometry(w,h,d),x,y,z,0,0,rz);
  const ring=(r:number,t:number,x=0,y=0,z=0,rx=0,ry=0,arc=Math.PI*2)=>part(new THREE.TorusGeometry(r,t,12,64,arc),x,y,z,rx,ry);
  const sphere=(r:number,x:number,y:number,z=0)=>part(new THREE.SphereGeometry(r,24,16),x,y,z);
  const extrude=(s:THREE.Shape,x=0,y=0,depth=.23)=>part(new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1,curveSegments:20}),x,y,-depth/2);
  function polygon(points:number[][]){const s=new THREE.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return s;}
  function tube(points:number[][],radius=.1){return part(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p as [number,number,number]))),48,radius,10,false));}
  function star(x=0,y=0,r=.85){const pts=[];for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,k=i%2?.43:1;pts.push([x+Math.cos(a)*r*k,y+Math.sin(a)*r*k]);}extrude(polygon(pts));}
  function gear(x:number,y:number,r:number,teeth:number){
    const pts=[];for(let i=0;i<teeth*4;i++){const a=i/(teeth*4)*Math.PI*2,rr=r*(i%4<2?1:.81);pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}
    const s=polygon(pts),h=new THREE.Path();h.absarc(x,y,r*.38,0,Math.PI*2,true);s.holes.push(h);extrude(s,0,0,.35);
  }
  if(kind==='platform'){
    // Condensed C, A, R, asymmetric oval O and S traced as sculptural brand adaptation.
    const c=new THREE.Shape();c.moveTo(.86,.93);c.bezierCurveTo(.86,1.38,0,1.42,0,.9);c.lineTo(0,.3);c.bezierCurveTo(0,-.16,.86,-.17,.86,.3);c.lineTo(.86,.45);c.lineTo(.61,.45);c.lineTo(.61,.28);c.bezierCurveTo(.61,.08,.25,.08,.25,.31);c.lineTo(.25,.9);c.bezierCurveTo(.25,1.13,.61,1.13,.61,.93);c.lineTo(.61,.86);c.lineTo(.86,.86);c.closePath();extrude(c,-2.6,-.55);
    const a=polygon([[0,0],[.32,1.28],[.63,1.28],[.96,0],[.7,0],[.63,.28],[.3,.28],[.24,0]]);
    const ah=new THREE.Path();ah.moveTo(.37,.5);ah.lineTo(.57,.5);ah.lineTo(.47,1.03);ah.closePath();a.holes.push(ah);extrude(a,-1.58,-.55);
    const r=new THREE.Shape();r.moveTo(0,0);r.lineTo(0,1.28);r.lineTo(.47,1.28);r.bezierCurveTo(.96,1.28,.99,.65,.64,.52);r.lineTo(.92,0);r.lineTo(.61,0);r.lineTo(.38,.49);r.lineTo(.25,.49);r.lineTo(.25,0);r.closePath();
    const rh=new THREE.Path();rh.moveTo(.25,.72);rh.lineTo(.25,1.07);rh.lineTo(.46,1.07);rh.bezierCurveTo(.73,1.07,.73,.72,.46,.72);rh.closePath();r.holes.push(rh);extrude(r,-.51,-.55);
    const o=new THREE.Shape();o.absellipse(0,.1,.49,.73,0,Math.PI*2,false,0);const oh=new THREE.Path();oh.absellipse(.02,.07,.31,.59,0,Math.PI*2,true,0);o.holes.push(oh);extrude(o,1.02,.05,.27);
    for(let i=0;i<7;i++){const angle=(32+i*19.3)*Math.PI/180,inner=.87,length=i%2?.43:.7;const ray=new THREE.CapsuleGeometry(.022,length,3,8);part(ray,1.02+Math.cos(angle)*(inner+length/2),.15+Math.sin(angle)*(inner+length/2),0,0,0,angle-Math.PI/2);}
    const s=new THREE.Shape();s.moveTo(.78,1.02);s.bezierCurveTo(.78,1.46,-.05,1.43,.02,.92);s.bezierCurveTo(.05,.63,.66,.49,.57,.25);s.bezierCurveTo(.51,.07,.24,.08,.24,.34);s.lineTo(0,.34);s.bezierCurveTo(-.06,-.17,.82,-.16,.82,.28);s.bezierCurveTo(.82,.65,.18,.82,.25,1.01);s.bezierCurveTo(.3,1.16,.57,1.14,.55,.98);s.lineTo(.78,.98);s.closePath();extrude(s,1.68,-.55);
  } else if(kind==='marketing'){
    // Hollow flared bell with lip, handle and radiating signal arcs.
    const bell=new THREE.CylinderGeometry(.8,.27,1.4,48,1,true);part(bell,0,.12,0,0,0,-Math.PI/2);
    ring(.8,.075,.7,.12,0,0,Math.PI/2);ring(.27,.06,-.7,.12,0,0,Math.PI/2);
    box(.22,.75,.26,-.4,-.55,0,-.22);part(new THREE.CylinderGeometry(.23,.23,.27,32),-.82,.12,0,0,0,Math.PI/2);
    for(let i=0;i<3;i++)tube([[1.02+i*.17,-.36,0],[1.15+i*.21,.12,0],[1.02+i*.17,.6,0]],.035);
  } else if(kind==='sales'){
    for(let i=0;i<3;i++){const h=.65+i*.57;box(.46,h,.48,-.85+i*.8,-.9+h/2);ring(.15,.055,-.85+i*.8,-1.02);}
    tube([[-1,.0,.32],[-.3,.45,.32],[.48,1.05,.32],[1.02,1.38,.32]],.07);
    extrude(polygon([[.55,1.34],[1.18,1.53],[1.07,.87]]),0,0,.17);
  } else if(kind==='communication'){
    // Sculpted telephone receiver: curved spine and tilted earpieces.
    tube([[-.85,.85,0],[-1,.25,0],[-.65,-.5,0],[.12,-.95,0],[.8,-.86,0]],.16);
    box(.62,.38,.45,-.83,.83,0,-.5);box(.4,.64,.45,.83,-.78,0,-.5);
    tube([[.1,.05,-.2],[.12,.85,-.2],[.95,.85,-.2],[1.03,.17,-.2],[.65,.14,-.2],[.37,-.14,-.2],[.38,.13,-.2]],.06);
  } else if(kind==='reactivation'){
    const s=new THREE.Shape();s.absarc(0,0,.94,.35,5.55,false);s.absarc(0,0,.66,5.55,.35,true);s.closePath();extrude(s,0,0,.3);
    extrude(polygon([[.67,-.75],[1.25,-.69],[.9,-.17]]),0,0,.3);sphere(.18,0,0);ring(.31,.025);
  } else if(kind==='automation'){
    gear(-.47,.31,.81,12);gear(.63,-.54,.59,10);ring(.22,.035,-.47,.31,.24);ring(.15,.03,.63,-.54,.24);
  } else if(kind==='service'){
    ring(.9,.22);ring(.9,.035,0,0,.22);ring(.9,.035,0,0,-.22);
    for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2;box(.4,.33,.47,.9*Math.cos(a),.9*Math.sin(a),0,a);}
    // Support headset floats behind the lifebuoy.
    tube([[-1.16,-.2,-.23],[-1.2,.65,-.23],[0,1.32,-.23],[1.2,.65,-.23],[1.16,-.2,-.23]],.065);
  } else if(kind==='reputation'){
    star(0,.14,.92);
    for(const side of [-1,1]){
      tube([[side*.16,-1,0],[side*.86,-.55,0],[side*1.05,.34,0]],.045);
      for(let i=0;i<5;i++){const a=-1.15+i*.29,x=side*(.52+i*.12),y=-.8+i*.26;const leaf=new THREE.SphereGeometry(1,14,10);leaf.scale(.1,.23,.065);part(leaf,x,y,0,0,0,side*a);}
    }
  } else {
    for(let i=0;i<3;i++){const x=(i-1)*.85,y=i===1?.38:0;sphere(.24,x,y+.55);part(new THREE.CapsuleGeometry(.23,.44,5,16),x,y-.12);}
    ring(.98,.065,0,-.4,0,Math.PI/2);ring(.98,.035,0,-.56,0,Math.PI/2);
  }
  const merged=mergeGeometries(pieces,false);
  pieces.forEach(p=>p.dispose());
  if(!merged)throw new Error('Unable to compose sculpture');
  merged.computeBoundingBox();const size=merged.boundingBox!.getSize(new THREE.Vector3());
  const scale=kind==='platform'?4.9/size.x:2.85/Math.max(size.x,size.y);
  merged.center();merged.scale(scale,scale,scale);merged.computeBoundingSphere();return merged;
}

