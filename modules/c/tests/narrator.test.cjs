const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js'),P=require('../assets/yudu-presentation.js');
const M=require('../assets/audio/narrator-v047/manifest.json');
test('original narrator recordings remain available while the last clip is retained inside the user closing',()=>{
 const nodes=D.nodes.filter(n=>n.narration?.src.includes('narrator-v047/'));
 assert.deepEqual(nodes.map(n=>n.id),['epilogue-arrive','epilogue-huining','epilogue-jiangtai']);
 assert.equal(M.paragraph_count,5);assert.equal(M.sentence_count,7);
 for(const n of nodes){const v=n.narration,c=M.clips.find(c=>c.node===n.id);assert.equal(c.id,v.id);assert.equal(c.text,n.text);assert.equal(v.cues.map(c=>c.text).join(''),n.text);assert(!n.voice&&!n.nativeAudio);assert(fs.statSync(path.join(__dirname,'..',v.src)).size>1000);assert.deepEqual(P.speaker(n),{name:'旁白',kind:''});let end=0;for(const cue of v.cues){assert(cue.start>=end&&cue.end>cue.start&&cue.end<=v.duration);end=cue.end;}}
 const xiaoman=D.nodes.filter(n=>n.narration?.id.startsWith('XN'));assert.equal(xiaoman.length,92);assert(xiaoman.every(n=>P.speaker(n).name==='小满'));
 assert.equal(D.storyRevision,13);assert.equal(new Set(D.nodes.filter(n=>n.voiceId?.startsWith('XM')).map(n=>n.voiceId)).size,28);
});
test('narration leaves the two epilogue actions under player control and keeps source text and dates',()=>{
 let state=C.create(D);while(state.node!=='epilogue-huining'){const n=C.current(D,state),next=C.advance(D,state,n.choices?.[0]?.id);assert.notEqual(next,state);state=next;}
 for(const id of ['epilogue-huining','epilogue-remember']){if(state.node!==id)while(state.node!==id){const n=C.current(D,state);state=C.advance(D,state,n.choices?.[0]?.id);}assert.equal(C.advance(D,state),state);assert(!C.current(D,state).advanceOnEnd);assert.equal(C.restore(D,state).node,id);}
 const at=id=>D.nodes.find(n=>n.id===id);assert(at('river').text.startsWith('1934年10月，江西于都。'));assert(fs.existsSync(path.join(__dirname,'../assets/audio/narrator-v047/NR001.mp3')));assert.equal(at('epilogue-huining').routeDate,'1936年10月9日');assert.equal(at('epilogue-jiangtai').routeDate,'1936年10月22日');assert.equal(at('epilogue-remember').narration.pages.at(-1).text,'1936—2026\n纪念红军长征胜利90周年');
});
