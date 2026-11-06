const test=require('node:test'),assert=require('node:assert/strict');
const R=require('../assets/atlas-route.js'),D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js');
const T=require('../assets/yudu-text.js');

function walk(data,target,crossing){
 let state=C.create(data);
 while(state.node!==target&&state.path.length<512){
  const n=C.current(data,state);
  const next=C.advance(data,state,n.id==='xj-choice'?crossing:n.choices?.[0]?.id);
  if(next===state)break;
  state=next;
 }
 assert.equal(state.node,target);return state;
}

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
test('the Chishui film waits for the question and holds before the Jinsha crossing',()=>{
 const ask=walk(D,'t1-ask-route-v036','stretcher');ask.settings.auto=true;
 assert.equal(C.advance(D,ask),ask);
 const reply=C.advance(D,ask,'ask-route');assert.equal(C.current(D,reply).voiceId,'XM09');
 const playing=walk(D,'t1-chenhe-route-v036','stretcher'),film=C.current(D,playing);
 assert.equal(film.filmId,'CS-01');assert(film.nativeAudio&&film.advanceOnEnd);
 assert.equal(D.images[C.current(D,ask).scene],film.poster);
 const at=t=>T.pageFrame(film.captionPages,t).text;
 assert.equal(at(1),'');assert.equal(at(2.1),'前头改了路。');
 assert.equal(at(3.8),'先跟上，别落在后头。');
 const holding=C.advance(D,playing),pack=C.current(D,holding);
 assert.equal(D.images[pack.scene],film.hold);assert.equal(C.advance(D,holding),holding);
 assert.equal(pack.routeStep,1);const packed=C.advance(D,holding,'shoulder-pack');assert.equal(C.current(D,C.advance(D,packed)).routeStep,2);
 assert.equal(C.restore(D,{...holding,node:'t1-history',path:[...playing.path,'t1-history']}).node,D.start);
});
test('saved river crossings restore without new actions and still preserve the old letter branch',()=>{
 const old={...D,nodes:D.nodes.map(n=>n.id==='t1-familiar'?{...n,next:'t1-history'}:n)};
 for(const route of ['stretcher','luggage']){
  const saved=walk(old,'t2-arrive',route),restored=C.restore(D,JSON.stringify(saved));
  assert.deepEqual(restored.path,saved.path);assert.deepEqual(restored.chapterProgress,saved.chapterProgress);
  assert.deepEqual(restored.choices,saved.choices);
  const replay=C.beginChapter(D,restored,'rivers');assert.equal(replay.node,'t1-arrive');
  const current=walk(D,'t1-end',route);
  assert(current.path.includes('t1-chenhe-route-v036'));
  assert.equal(current.path.includes('t1-letter'),route==='luggage');
 }
});
test('replaying the final station keeps prior real choices and returns to that station, not Yudu',()=>{
 let state=C.create(D),guard=0;
 while(!C.current(D,state).end&&guard++<250){const n=C.current(D,state);state=C.advance(D,state,n.choices?.at(-1).id);}
 const endChapter=C.chapter(D,state),replay=C.beginChapter(D,state,endChapter.id);
 assert.equal(C.chapter(D,replay).id,'epilogue');assert.equal(replay.node,endChapter.start);
 const priorChoices=Object.fromEntries(Object.entries(state.choices).filter(([id])=>D.nodes.find(n=>n.id===id).chapter!==endChapter.id));
 assert.deepEqual(replay.choices,priorChoices);assert.deepEqual(replay.path,state.path.slice(0,state.path.indexOf(endChapter.start)+1));
});
