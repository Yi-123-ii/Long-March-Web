const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js');
function toChoice(){let s=C.create(D);while(C.current(D,s).id!=='choice')s=C.advance(D,s,C.current(D,s).choices?.[0]?.id);return s;}
function finish(branch,state=toChoice()){let s=C.advance(D,state,branch);let guard=0;while(!C.current(D,s).end&&!C.current(D,s).checkpoint&&guard++<120)s=C.advance(D,s,C.current(D,s).choices?.[0]?.id);assert(C.current(D,s).end||C.current(D,s).checkpoint);return s;}
test('all story targets exist and every node is reachable',()=>{
 const reached=new Set(),walk=id=>{if(reached.has(id))return;reached.add(id);const n=D.nodes.find(x=>x.id===id);assert(n,id);if(n.next)walk(n.next);for(const r of n.routes||[])walk(r.next);for(const c of n.choices||[])walk(c.next);};
 walk(D.start);assert.equal(reached.size,D.nodes.length);
});
test('both choices reach their own observations and remembered ending',()=>{
 const a=finish('hand'),b=finish('help');
 assert(a.path.includes('a-tight'));assert(!a.path.includes('b-thanks'));
 assert(b.path.includes('b-thanks'));assert(!b.path.includes('a-tight'));
 assert.equal(a.choices.choice,'hand');assert.equal(b.choices.choice,'help');assert.notEqual(D.memories.hand,D.memories.help);
});
test('automatic advance cannot choose for player or pass the ending',()=>{
 const s=toChoice();assert.equal(C.advance(D,s),s);assert.equal(C.advance(D,s,'invalid'),s);let end=finish('hand');while(!C.current(D,end).end)end=C.advance(D,end,C.current(D,end).choices?.[0]?.id);assert.equal(C.advance(D,end),end);
});
test('resume reconstructs the actual branch, ignores forged choice fields',()=>{
 const end=finish('help'),raw={...end,choices:{choice:'hand'}};const restored=C.restore(D,JSON.stringify(raw));
 assert.equal(restored.choices.choice,'help');assert.equal(restored.node,'end');assert.deepEqual(restored.path,end.path);
});
test('reject corrupt or impossible save paths and preserve settings safely',()=>{
 const s=toChoice();assert.equal(C.restore(D,{...s,path:['river','b-thanks'],node:'b-thanks'}).node,'river');
 assert.equal(C.restore(D,'{').node,'river');const restored=C.restore(D,{...s,settings:{voice:4,ambient:-4,auto:true}});assert.equal(restored.settings.voice,1);assert.equal(restored.settings.ambient,0);
});
test('replay preserves completed memories but makes a fresh branch',()=>{
 const a=finish('hand'),fresh=C.restart(D,a);assert.equal(fresh.node,'river');assert.deepEqual(fresh.choices,{});assert.deepEqual(fresh.completed,['hand']);
 const b=finish('help',(()=>{let s=fresh;while(C.current(D,s).id!=='choice')s=C.advance(D,s,C.current(D,s).choices?.[0]?.id);return s;})());assert.deepEqual(b.completed,['hand','help']);
});

test('all supplied movie segments keep source audio and lead into matching holds',()=>{
 const voiced=D.nodes.filter(n=>n.nativeAudio);assert.deepEqual(voiced.map(n=>n.id),['reach','introduce','liang-reminder','liang-home','boarding','xj-sleeve','xj-choice','xj-a-name','xj-a-introduce','xj-b-bag','xj-loss','zy-thread','zy-a-lusheng','zy-b-question','zy-b-advice','zy-b-paper','xj-cover-fire-v035','t1-chenhe-route-v036','snow-hold-pack','snow-pack','snow-respond-name','snow-concern','snow-shelter','grass-a-water','grass-dawn-call','wuqi-water','wuqi-sew','wuqi-sew-still','wuqi-write-home']);
 for(const n of voiced){assert(n.duration>0);if(n.id==='xj-choice'){assert(!n.advanceOnEnd);assert(n.textAfterMovie);assert.equal(n.choices.length,2);}else if(n.id==='zy-a-lusheng'){assert(n.textAfterMovie);assert.equal(n.advanceOnEnd,false);assert.equal(D.images[D.nodes.find(x=>x.id===n.next).scene],n.hold);}else if(['wuqi-write-home','xj-loss'].includes(n.id)){assert.equal(n.advanceOnEnd,false);assert.equal(n.hold,D.images[n.id==='xj-loss'?'xiang-loss-hold':'chenhe-memory-hold']);}else{assert(n.advanceOnEnd);if(n.hold)assert.equal(D.images[D.nodes.find(x=>x.id===n.next).scene],n.hold);}}
 const intro=D.nodes.find(n=>n.id==='introduce');assert(intro.text.includes('你呢'));assert.equal(intro.hold,D.images['intro-hold']);
 assert.equal(D.nodes.find(n=>n.id==='boarding').text,'');
 const fs=require('node:fs'),path=require('node:path');for(const p of [D.video,...voiced.filter(n=>n.video).map(n=>n.video),...Object.values(D.images)])assert(fs.statSync(path.join(__dirname,'..',p)).size>1000);
});
test('previous spoken-picture saves restart safely while keeping memories and volume settings',()=>{
 const old={version:1,path:['river','strap','newcomer','yesterday'],node:'yesterday',completed:['hand','invalid'],settings:{voice:.3,ambient:.2,auto:true}};
 const s=C.restore(D,old);assert.equal(s.node,D.start);assert.deepEqual(s.completed,['hand']);assert.equal(s.settings.voice,.3);assert.equal(s.settings.ambient,.2);assert.equal(s.settings.auto,true);assert.equal(s.storyRevision,D.storyRevision);
});

test('the view follows looking down, turning back, facing Liang and standing in the boat',()=>{
 const node=id=>D.nodes.find(x=>x.id===id);
 assert.equal(node('choice').scene,'hold');
 assert.equal(node('a-cross').scene,'bridge-step');assert.equal(node('a-tight').scene,'bridge-forward');
 assert.equal(node('b-bag').scene,'bank-lookback');assert.equal(node('b-thanks').scene,'bank-lookback');
 assert.notEqual(D.images['bank-lookback'],D.images['bridge-step']);
 assert.equal(node('liang-meet').scene,'liang-reminder-first');
 assert.equal(node('departure').scene,'boarding-first');assert.equal(node('end').scene,'boarding-hold');
 for(const n of D.nodes)assert.notEqual(n.scene,'river',n.id+' must not cut to an empty river');
});
test('both branches meet Chenhe once, and the single name response is never auto-selected',()=>{
 for(const branch of ['hand','help']){
  const end=finish(branch);assert.equal(end.path.filter(x=>x==='introduce').length,1);assert.equal(end.choices.name,'tell-name');
 }
 let s=toChoice();s=C.advance(D,s,'hand');while(s.node!=='name')s=C.advance(D,s,C.current(D,s).choices?.[0]?.id);
 assert.equal(C.advance(D,s),s);assert.equal(C.current(D,s).choices.length,1);
 const fs=require('node:fs'),path=require('node:path'),html=fs.readFileSync(path.join(__dirname,'../journey.html'),'utf8');
 assert(!html.includes('yudu-thoughts.js'));assert(!html.includes('thought-volume'));
 for(const p of [D.video,D.images['intro-first'],D.images['intro-hold'],D.images.gathering,D.images.reachStill])assert(fs.statSync(path.join(__dirname,'..',p)).size>1000);
});


test('both first choices include Liang, the question, boarding and the complete first-station ending',()=>{
 for(const branch of ['hand','help']){
  const end=finish(branch);
  for(const id of ['liang-reminder','liang-home','boarding'])assert.equal(end.path.filter(x=>x===id).length,1);
  assert.equal(end.choices['ask-home'],'ask-liang-home');assert.equal(end.choices.departure,'board');
 }
 for(const id of ['ask-home','departure']){
  let s=toChoice();s=C.advance(D,s,'hand');while(s.node!==id)s=C.advance(D,s,C.current(D,s).choices?.[0]?.id);
  assert.equal(C.advance(D,s),s);
 }
});
