const test=require('node:test'),assert=require('node:assert/strict');
const R=require('../assets/atlas-route.js'),D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js');

test('every next chapter has a continuous route with the expected map endpoints',()=>{
 for(let i=1;i<D.chapters.length;i++){
  const from=D.chapters[i-1].id,to=D.chapters[i].id,route=R.between(from,to,true);
  assert.deepEqual(R.sample(route,0),R.xy(R.station(from,true)));
  assert.deepEqual(R.sample(route,1),R.xy(R.station(to)));
  const total=R.length(route);assert(total>0);
  let prior=R.sample(route,0);
  for(let n=1;n<=100;n++){const p=R.sample(route,n/100);assert(Math.hypot(p[0]-prior[0],p[1]-prior[1])<=total/100+.000001);prior=p;}
 }
});
test('the rivers chapter arrives at Chishui, departs Jinsha and cannot teleport across its route',()=>{
 const arrival=R.between('zunyi','rivers',true),departure=R.between('rivers','luding',true);
 assert.deepEqual(arrival.at(-1),R.xy(R.points.find(p=>p.name==='赤水')));
 assert.deepEqual(departure[0],R.xy(R.points.find(p=>p.name==='金沙江')));
 const back=R.between('snow','xiangjiang');assert(back.some(p=>p[0]===R.xy(R.station('rivers'))[0]));
 assert.deepEqual(R.between('missing','yudu'),[]);assert.equal(R.sample([],0),null);
});
test('replaying the final station keeps prior real choices and returns to that station, not Yudu',()=>{
 let state=C.create(D),guard=0;
 while(!C.current(D,state).end&&guard++<250){const n=C.current(D,state);state=C.advance(D,state,n.choices?.at(-1).id);}
 const endChapter=C.chapter(D,state),replay=C.beginChapter(D,state,endChapter.id);
 assert.equal(C.chapter(D,replay).id,'epilogue');assert.equal(replay.node,endChapter.start);
 const priorChoices=Object.fromEntries(Object.entries(state.choices).filter(([id])=>D.nodes.find(n=>n.id===id).chapter!==endChapter.id));
 assert.deepEqual(replay.choices,priorChoices);assert.deepEqual(replay.path,state.path.slice(0,state.path.indexOf(endChapter.start)+1));
});
