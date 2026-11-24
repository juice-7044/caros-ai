import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';

const load = () => import('../components/caros/pricing-scene/model.ts');
test('nine genuine models have finite distinct surfaces and centered shared pivot', async()=>{
  const { buildModel } = await load();
  const keys=['platform','marketing','sales','communication','reactivation','automation','service','reputation','community'];
  const signatures=[];
  for(const key of keys){
    const g=buildModel(key);g.computeBoundingBox();
    const size=g.boundingBox.getSize(new THREE.Vector3());
    assert.ok([...g.attributes.position.array].every(Number.isFinite));
    assert.ok(size.x>1 && size.y>0.5 && size.z>0.15);
    assert.ok(g.boundingBox.getCenter(new THREE.Vector3()).length()<1e-5);
    signatures.push(`${g.attributes.position.count}:${size.x.toFixed(3)}:${size.y.toFixed(3)}`);g.dispose();
  }
  assert.equal(new Set(signatures).size,9);
});
test('transition interpolates actual homes without mutating source and gives bounded phases', async()=>{
  const { mixHomes, transitionAt }=await load();
  const a=new Float32Array([0,1,2]),b=new Float32Array([2,3,4]);
  assert.deepEqual([...mixHomes(a,b,.5)],[1,2,3]);assert.deepEqual([...a],[0,1,2]);
  assert.notEqual(mixHomes(a,b,0),a);
  assert.equal(transitionAt(0).phase,'dissolving');
  assert.equal(transitionAt(.5).phase,'morphing');
  assert.equal(transitionAt(.9).phase,'reforming');
  assert.equal(transitionAt(1).phase,'idle');
  assert.equal(transitionAt(1).morph,1);
});
test('area sampler is deterministic, finite, uniform within triangles and area weighted', async () => {
  const { sampleSurface } = await load();
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, 1,0,0, 0,1,0, 10,0,0, 12,0,0, 10,2,0],3));
  g.computeVertexNormals();
  const a = sampleSurface(g, 10000, 42), b = sampleSurface(g,10000,42);
  assert.deepEqual(a,b);
  assert.equal(a.positions.length,30000);
  assert.ok([...a.positions,...a.normals,...a.seeds].every(Number.isFinite));
  const big = Array.from({length:10000},(_,i)=>a.positions[i*3]>5).filter(Boolean).length;
  assert.ok(big>7700&&big<8300, `4:1 area distribution, got ${big}`);
  assert.ok(Math.abs(a.normals[2]-1)<1e-6);
  assert.throws(()=>sampleSurface(new THREE.BufferGeometry(),10), /surface/i);
});
