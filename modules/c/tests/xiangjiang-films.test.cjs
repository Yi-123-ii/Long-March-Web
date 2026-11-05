const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js'),T=require('../assets/yudu-text.js');
const n=id=>D.nodes.find(n=>n.id===id);
function walk(target,crossing='stretcher'){
 let state=C.create(D);for(let guard=0;state.node!==target&&guard<512;guard++){
  const node=C.current(D,state);state=C.advance(D,state,node.id==='xj-choice'?crossing:node.choices?.[0]?.id);
 }assert.equal(state.node,target);return state;
}
test('the silent crossing film keeps the original two choices and belongs to both routes',()=>{
 const film=n('xj-choice');assert(film.nativeAudio&&film.textAfterMovie);assert(!film.advanceOnEnd);
 assert.equal(film.filmId,'XJ-02');assert(!film.captionCues);assert.equal(film.choices.length,2);
 for(const route of ['stretcher','luggage'])assert(walk('xj-end',route).path.includes(film.id));
});
test('Lu uses one continuous source across the sleeve interaction without changing story topology',()=>{
 const first=n('xj-a-name'),second=n('xj-a-introduce');
 assert.equal(first.video,second.video);assert.equal(first.mediaEnd,second.mediaStart);
 assert.equal(first.next,'xj-a-roll');assert.equal(n('xj-a-roll').choices[0].next,second.id);
 assert.equal(first.hold,second.poster);assert.equal(first.hold,D.images[n('xj-a-roll').scene]);
 assert.equal(second.hold,D.images[n('xj-a-tell').scene]);
 for(const film of [first,second]){assert.equal(film.speaker,'陆生');assert(film.nativeAudio);assert.equal(film.captionCues.map(c=>c.text).join(''),film.text);}
 assert.equal(C.advance(D,walk('xj-a-roll')).node,'xj-a-roll');
 assert.equal(C.advance(D,walk('xj-a-tell')).node,'xj-a-tell');
 const other=walk('xj-end','luggage');assert(!other.path.includes(first.id));assert(!other.path.includes(second.id));
});
test('source-clock captions keep the natural pauses and resume only the second sentence',()=>{
 for(const id of ['xj-a-name','xj-a-introduce']){
  const film=n(id),line=T.plan(film.text),at=t=>T.frame(line,T.cueTime(line,t,film.captionCues)).text;
  assert.equal(at(film.mediaStart),'');assert.equal(at(film.mediaEnd),film.text);
  const pause=film.captionCues[0].end+.01;assert.equal(at(pause),film.captionCues[0].text);
 }
 const saved=C.restore(D,JSON.stringify(walk('xj-a-roll')));assert.equal(saved.node,'xj-a-roll');
 const resumed=C.advance(D,saved,'roll-sleeve');assert.equal(resumed.node,'xj-a-introduce');
 assert.equal(n(resumed.node).mediaStart,2.7);
});
test('Liang handoff belongs only to the luggage route and its stills preserve the same position',()=>{
 const film=n('xj-b-bag');assert.equal(film.filmId,'XJ-04');assert.equal(film.speaker,'梁叔');
 assert(film.nativeAudio&&film.advanceOnEnd);assert.equal(film.captionCues.map(c=>c.text).join(''),film.text);
 assert.equal(film.poster,D.images[n('xj-b-handoff').scene]);assert.equal(film.hold,D.images[n('xj-b-leave').scene]);
 assert(walk('xj-end','luggage').path.includes(film.id));assert(!walk('xj-end','stretcher').path.includes(film.id));
});
test('both routes meet the same report without receiving the needle pouch twice',()=>{
 const film=n('xj-loss');assert.equal(film.filmId,'XJ-05');assert.equal(film.speaker,'转运同志');
 assert(film.nativeAudio);assert.equal(film.advanceOnEnd,false);assert(!film.text.includes('摘下帽子'));
 assert.equal(film.captionPages.map(c=>c.text).join(''),film.text);
 for(const route of ['stretcher','luggage']){
  const state=walk('xj-end',route);assert.equal(state.path.filter(id=>id===film.id).length,1);
  assert.equal(state.path.includes('xj-news-a'),route==='stretcher');
  assert.equal(state.path.includes('xj-news-b'),route==='luggage');
 }
 assert.equal(film.poster,D.images[n('xj-ask-liang').scene]);
});
test('the report replaces a single subtitle line and keeps its pause before the final sentence',()=>{
 const film=n('xj-loss'),at=t=>T.pageFrame(film.captionPages,t).text;
 assert.equal(at(1.9),'梁叔回去帮我们抬担架，');
 assert.equal(at(4.5),'在江边中了弹。');
 assert.equal(at(7),'我们没能把他救回来。');
 assert.equal(C.restore(D,JSON.stringify(walk('xj-loss','luggage'))).node,'xj-loss');
});
