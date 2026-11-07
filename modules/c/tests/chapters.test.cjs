const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js');
function walk(hand='hand',crossing='stretcher',until='t2-end'){
 let s=C.create(D),limit=0;
 while(s.node!==until&&limit++<180){const n=C.current(D,s);s=C.advance(D,s,n.id==='choice'?hand:n.id==='xj-choice'?crossing:n.choices?.[0]?.id);}
 assert.equal(s.node,until);return s;
}
test('all four combinations preserve the Xiang choice through Zunyi and both historical transitions',()=>{
 for(const hand of ['hand','help'])for(const cross of ['stretcher','luggage']){
  const s=walk(hand,cross);assert.equal(s.choices.choice,hand);assert.equal(s.choices['xj-choice'],cross);
  for(const id of ['end','xj-end','zy-end','t1-end','t2-end'])assert(s.path.includes(id));
  assert(s.path.includes('xj-loss'));assert(s.path.includes('xj-unfinished'));
  assert.equal(s.path.includes('zy-a-lusheng'),cross==='stretcher');
  assert.equal(s.path.includes('zy-b-letter'),cross==='luggage');
  assert.equal(s.path.includes('xj-news-a'),cross==='stretcher');
  assert.equal(s.path.includes('xj-news-b'),cross==='luggage');
  assert.equal(s.path.includes('t1-letter'),cross==='luggage');
 }
});
test('the letter cannot appear in the stretcher route and the pouch is received before it is kept',()=>{
 const a=walk(),b=walk('help','luggage');
 for(const s of [a,b]){
  const receive=s.path.indexOf(s.choices['xj-choice']==='stretcher'?'xj-news-a':'xj-b-bag');
  assert(receive<s.path.indexOf('xj-pack'));
  for(const id of s.path){const n=D.nodes.find(x=>x.id===id);if(n.document||n.scene==='keepsakes')assert.equal(s.choices['xj-choice'],'luggage');}
 }
});
test('chapter entry retains prior choices, rejects locked chapters and rewinds only to a valid prefix',()=>{
 const initial=C.create(D);assert.equal(C.beginChapter(D,initial,'zunyi'),initial);assert(!C.canOpenChapter(D,initial,'xiangjiang'));
 const y=walk('help','luggage','end');assert(C.canOpenChapter(D,y,'xiangjiang'));
 const x=C.beginChapter(D,y,'xiangjiang');assert.equal(x.node,'xj-arrive');assert.equal(x.choices.choice,'help');
 const done=walk('help','luggage'),z=C.beginChapter(D,done,'zunyi');
 assert.equal(z.node,'zy-arrive');assert.equal(z.choices['xj-choice'],'luggage');assert(!z.path.includes('t2-arrive'));
 assert.deepEqual(C.restore(D,JSON.stringify(done)).path,done.path);
});
test('v0.13 first-station saves migrate without replaying its videos or inventing the Xiang branch',()=>{
 const prior=walk('help','stretcher','end');prior.storyRevision=7;
 const migrated=C.restore(D,JSON.stringify(prior));assert.equal(migrated.node,'end');assert.equal(migrated.storyRevision,D.storyRevision);
 assert.equal(migrated.choices.choice,'help');assert.equal(migrated.choices['xj-choice'],undefined);assert(C.canOpenChapter(D,migrated,'xiangjiang'));
});
test('a forged callback path is rejected and only supplied spoken scenes load video',()=>{
 const b=walk('hand','luggage');const bad={...b,path:b.path.map(id=>id==='zy-b-letter'?'zy-a-lusheng':id)};
 assert.equal(C.restore(D,bad).node,D.start);
 for(const n of D.nodes.filter(n=>!['yudu','snow'].includes(n.chapter))){if(!['xj-sleeve','xj-choice','xj-a-name','xj-a-introduce','xj-b-bag','xj-loss','xj-cover-fire-v035','t1-chenhe-route-v036','zy-thread','zy-a-lusheng','zy-b-question','zy-b-advice','zy-b-paper','grass-a-water','grass-dawn-call','wuqi-water','wuqi-sew','wuqi-sew-still','wuqi-write-home'].includes(n.id)){assert(!n.nativeAudio);assert(!n.video);}if(n.voice){assert.equal(n.speaker,'小满');assert.equal(n.mode,'dialogue');}assert(D.images[n.scene]);}
});
