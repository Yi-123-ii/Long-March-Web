const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js'),R=require('../assets/journey-return.js');
const prior={...D,storyRevision:10,nodes:D.legacyStories[10].nodes};
function walk(data,picks,target='journey-end'){
 let s=C.create(data),guard=0;
 while(s.node!==target&&guard++<512){const n=C.current(data,s),next=C.advance(data,s,picks[n.id]||n.choices?.[0]?.id);assert.notEqual(next,s,'stuck at '+s.node);s=next;}
 assert.equal(s.node,target);return s;
}
test('all 32 revision 10 saves retain their five decisions and all station bookmarks after the new scenes',()=>{
 for(const choice of ['hand','help'])for(const crossing of ['stretcher','luggage'])for(const snow of ['support','call'])for(const grass of ['stay','rescue'])for(const ending of ['sew','write']){
  const picks={choice,'xj-choice':crossing,'snow-choice':snow,'grass-choice':grass,'wuqi-choice':ending};
  const old=walk(prior,picks),current=C.restore(D,{...old,choices:{choice:'forged'}});
  assert.equal(current.node,'journey-end');assert.equal(current.storyRevision,13);
  for(const [id,pick]of Object.entries(picks))assert.equal(current.choices[id],pick);
  for(const ch of D.chapters){assert(C.canOpenChapter(D,current,ch.id));assert.equal(current.chapterProgress[ch.id].node,old.chapterProgress[ch.id].node);}
  assert(current.path.includes('xj-cover-v034'));assert(current.path.includes('north-pass-v034'));
  assert.deepEqual(C.restore(D,current).path,current.path);
 }
});
test('a rewound revision 10 save and external-page return keep the later unfinished station',()=>{
 const picks={choice:'help','xj-choice':'luggage','snow-choice':'call','grass-choice':'stay','wuqi-choice':'write'};
 const old=walk(prior,picks,'wuqi-write-home'),rewound=C.beginChapter(prior,old,'yudu');
 const current=C.restore(D,rewound);assert.equal(current.node,'river');
 assert.equal(C.openChapter(D,current,'wuqi').node,'wuqi-write-home');
 const returned=R.restore(D,C,C.create(D),JSON.stringify({version:1,view:'story',state:old}));
 assert.equal(returned.state.node,'wuqi-write-home');assert.equal(returned.state.choices['xj-choice'],'luggage');
});
test('all 32 previous voiced-preview saves retain their branch choices and later station bookmarks',()=>{
 const preview={...D,storyRevision:11,nodes:D.legacyStories[11].nodes};
 for(const choice of ['hand','help'])for(const crossing of ['stretcher','luggage'])for(const snow of ['support','call'])for(const grass of ['stay','rescue'])for(const ending of ['sew','write']){
  const picks={choice,'xj-choice':crossing,'snow-choice':snow,'grass-choice':grass,'wuqi-choice':ending};
  const old=walk(preview,picks),current=C.restore(D,old);
  assert.equal(current.node,'journey-end');
  for(const [id,pick]of Object.entries(picks))assert.equal(current.choices[id],pick);
  for(const ch of D.chapters){assert(C.canOpenChapter(D,current,ch.id));assert.equal(current.chapterProgress[ch.id].node,old.chapterProgress[ch.id].node);}
 }
});
test('29 unique player recordings are attached only to direct speech and chosen answers',()=>{
 const clips=require('../assets/audio/xiaoman-v034/manifest.json').clips,voices=D.nodes.filter(n=>n.voice),by=new Map(D.nodes.map(n=>[n.id,n]));
 assert.equal(new Set(voices.map(n=>n.voiceId)).size,29);
 assert.equal(by.get('b-thanks').text,'我能站得住，你先把包抱稳。');
 for(const n of voices){const clip=clips.find(c=>c.id===n.voiceId);assert.equal(n.text,clip.text);assert.equal(n.speaker,'小满');assert.equal(n.mode,'dialogue');assert(!n.nativeAudio);assert(!n.choices);assert(n.voiceDuration>0);assert(fs.statSync(path.join(__dirname,'..',n.voice)).size>1000);}
 for(const n of D.nodes.filter(n=>n.choices)){
  assert(!n.voice,'option prompts must stay silent');
  for(const c of n.choices){const reply=by.get(c.next);if(reply.voice)assert.equal(reply.speaker,'小满');}
 }
 for(const n of D.nodes.filter(n=>n.mode==='observation'||n.mode==='fact'||n.mode==='thought'))assert(!n.voice);
});
test('the published revision 12 preview resumes across the two mountain questions and the former wet-clothes still',()=>{
 const preview={...D,storyRevision:12,nodes:D.legacyStories[12].nodes};
 const picks={choice:'help','xj-choice':'luggage','snow-choice':'call','grass-choice':'stay','wuqi-choice':'write'};
 for(const target of ['snow-ask-home','snow-nickname','snow-wet-v034','t1-ask-route-v036','wuqi-write-home']){
  const old=walk(preview,picks,target),restored=C.restore(D,old);
  assert.equal(restored.node,target);assert.equal(restored.choices['xj-choice'],'luggage');
  for(const chapter of D.chapters.filter(ch=>C.canOpenChapter(preview,old,ch.id)))assert(C.canOpenChapter(D,restored,chapter.id));
 }
});
test('old movies remain present and ZY04 stays static while the completed letter movie waits for a player response',()=>{
 const at=id=>D.nodes.find(n=>n.id===id);
 for(const id of ['reach','introduce','liang-reminder','liang-home','boarding','xj-sleeve','xj-choice','xj-a-name','xj-a-introduce','xj-b-bag','xj-loss','zy-thread','snow-concern','snow-shelter','grass-a-water','grass-dawn-call','wuqi-write-home'])assert(at(id).nativeAudio,id);
 for(const id of ['zy-mended','zy-depart']){assert(!at(id).nativeAudio);assert(!at(id).plannedFilm);assert(!at(id).video);}
 assert.equal(at('zy-b-question').video,at('zy-b-advice').video);
 assert.equal(at('zy-b-question').mediaEnd,at('zy-b-advice').mediaStart);
 assert.equal(at('zy-b-question').captionCues.map(c=>c.text).join(''),'你打算写什么？');
 assert.equal(at('zy-b-advice').captionCues.map(c=>c.text).join(''),'那就先收着吧。');
 assert.equal(at('zy-b-paper').text,'纸别挨着火。');
 assert.equal(at('zy-b-advice').mediaEnd,at('zy-b-paper').mediaStart);
 assert(at('zy-b-answer').choices);assert.equal(at(at('zy-b-answer').choices[0].next).voiceId,'XM08');
 assert.equal(D.nodes.filter(n=>n.choices?.length===2).length,5);
});
