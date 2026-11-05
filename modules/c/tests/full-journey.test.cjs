const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js');
function walk(a,b,c,d,e){let s=C.create(D),guard=0;const choices={choice:a,'xj-choice':b,'snow-choice':c,'grass-choice':d,'wuqi-choice':e};while(!C.current(D,s).end&&guard++<250){const n=C.current(D,s);s=C.advance(D,s,choices[n.id]||n.choices?.[0]?.id);}assert.equal(s.node,'journey-end');return s;}
test('all 32 stories reach the 1936 epilogue with their five real choices intact',()=>{
 for(const a of ['hand','help'])for(const b of ['stretcher','luggage'])for(const c of ['support','call'])for(const d of ['stay','rescue'])for(const e of ['sew','write']){
  const s=walk(a,b,c,d,e);assert.equal(s.choices.choice,a);assert.equal(s.choices['xj-choice'],b);assert.equal(s.choices['snow-choice'],c);assert.equal(s.choices['grass-choice'],d);assert.equal(s.choices['wuqi-choice'],e);
  assert.equal(s.path.includes('grass-a-new'),b==='luggage'&&d==='stay');assert.equal(s.path.includes('grass-b-new'),b==='luggage'&&d==='rescue');
  assert.equal(s.path.includes('grass-dawn-call'),c==='call');assert.equal(s.path.includes('wuqi-later-name'),c==='call');
  assert.equal(s.path.includes('grass-a-water'),d==='stay');
  assert.equal(s.path.includes('wuqi-water'),d==='stay');assert.equal(s.path.includes('wuqi-cloth'),d==='rescue');
  assert.equal(s.path.includes('wuqi-sew'),e==='sew');assert.equal(s.path.includes('wuqi-writing'),e==='write');
  assert.equal(s.path.includes('wuqi-write-home'),e==='write');
  assert.equal(s.path.includes('wuqi-write-letter'),b==='luggage'&&e==='write');
  assert.deepEqual(C.restore(D,JSON.stringify(s)).path,s.path);
 }
});
test('old saves at the former endpoint can enter the snow chapter without replaying earlier videos',()=>{
 const old=walk('help','luggage','call','stay','write'),i=old.path.indexOf('t2-end');
 const raw={...old,storyRevision:8,node:'t2-end',path:old.path.slice(0,i+1)};
 const s=C.restore(D,raw);assert.equal(s.node,'t2-end');assert.equal(s.storyRevision,D.storyRevision);assert(C.canOpenChapter(D,s,'snow'));
 const next=C.beginChapter(D,s,'snow');assert.equal(next.node,'snow-arrive');assert.equal(next.choices['xj-choice'],'luggage');assert.equal(next.choices['snow-choice'],undefined);
});
test('new Lu assets replace both previous appearances and only supplied grass scenes add movies',()=>{
 assert(D.images['lusheng-river'].endsWith('v015.webp'));assert(D.images['lusheng-lamp'].endsWith('v015.webp'));
 assert.equal(D.nodes.filter(n=>n.nativeAudio).length,12);
 for(const n of D.nodes.filter(n=>['grass','north','wuqi','epilogue'].includes(n.chapter)&&!['grass-a-water','grass-dawn-call','wuqi-write-home'].includes(n.id))){assert(!n.nativeAudio);assert(!n.video);}
});
test('the two endings keep distinct objects; new writing does not consume or deliver the old letter',()=>{
 const a=walk('hand','stretcher','support','rescue','sew'),b=walk('help','luggage','call','stay','write');
 assert(a.path.includes('wuqi-sew-result'));assert(!a.path.includes('wuqi-write-letter'));
 assert(b.path.includes('wuqi-write-letter'));assert(b.path.includes('wuqi-writing'));
 const writing=D.nodes.find(n=>n.id==='wuqi-writing');assert.equal(writing.scene,'memory-page');assert(writing.document.includes('梁叔'));assert(!writing.document.includes('梁守成'));
 assert.equal(D.nodes.find(n=>n.id==='wuqi-write-letter').scene,'memory-page');
});
test('every six-station album has a valid start, checkpoint, image and map entry',()=>{
 assert.equal(D.chapters.length,10);assert.equal(D.nodes.filter(n=>n.choices?.length===2).length,5);
 for(const c of D.chapters){assert(D.nodes.find(n=>n.id===c.start));assert(D.nodes.find(n=>n.id===c.end));assert(D.images[c.image]);}
});
