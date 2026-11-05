const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../assets/yudu-core.js'),D=require('../assets/yudu-data.js');
function walk(target,choices={}){
 let state=C.create(D);
 for(let guard=0;state.node!==target&&guard<512;guard++){
  const n=C.current(D,state),next=C.advance(D,state,choices[n.id]||n.choices?.[0]?.id);
  assert.notEqual(next,state,'cannot reach '+target+' from '+state.node);state=next;
 }
 assert.equal(state.node,target);return state;
}
test('previous scene follows the chosen route and removes only decisions after that scene',()=>{
 for(const choice of ['hand','help']){
  const original=walk('name',{choice}),snapshot=JSON.stringify(original);
  let state=original;
  while(state.node!=='choice'){
   const next=C.back(D,state);assert.notEqual(next,state);assert.equal(C.chapter(D,next).id,'yudu');state=next;
  }
  assert.equal(state.choices.choice,undefined);assert.equal(state.choices.name,undefined);
  assert.equal(JSON.stringify(original),snapshot);
  const other=C.advance(D,state,choice==='hand'?'help':'hand');
  assert.equal(other.choices.choice,choice==='hand'?'help':'hand');
 }
});
test('back skips invisible anchors, stops at the station start and disables automatic advance',()=>{
 const data={start:'a',chapters:[{id:'one',start:'a',end:'b'}],memories:{},nodes:[
  {id:'a',chapter:'one',text:'开始',next:'empty'},{id:'empty',chapter:'one',next:'b'},
  {id:'b',chapter:'one',text:'下一幕'}]};
 let state=C.advance(data,C.advance(data,C.create(data)));state.settings.auto=true;
 const previous=C.back(data,state);assert.equal(previous.node,'a');assert.equal(previous.settings.auto,false);
 assert(!C.canBack(data,previous));assert.equal(C.back(data,previous),previous);
 const nextStation=walk('xj-arrive');assert(!C.canBack(D,nextStation));
});
test('rewinding an ending and refreshing preserves later station unlocks and bookmarks',()=>{
 const end=walk('journey-end'),later=end.chapterProgress.wuqi;
 const firstEnd=C.openChapter(D,end,'yudu'),previous=C.back(D,firstEnd),restored=C.restore(D,JSON.stringify(previous));
 assert.notEqual(restored.node,'end');assert.equal(C.chapter(D,restored).id,'yudu');
 for(const ch of D.chapters)assert(C.canOpenChapter(D,restored,ch.id),ch.id);
 assert.deepEqual(restored.chapterProgress.wuqi,later);
 assert.equal(C.openChapter(D,restored,'yudu').node,restored.node);
});
test('continue and restart act on the selected station without changing other station bookmarks',()=>{
 const state=walk('journey-end'),zunyi=state.chapterProgress.zunyi;
 const resumed=C.openChapter(D,state,'xiangjiang');assert.equal(resumed.node,'xj-end');
 const restarted=C.beginChapter(D,resumed,'xiangjiang');assert.equal(restarted.node,'xj-arrive');
 const saved=C.restore(D,JSON.stringify(restarted));assert.deepEqual(saved.chapterProgress.zunyi,zunyi);
 for(const ch of D.chapters)assert(C.canOpenChapter(D,saved,ch.id),ch.id);
});
