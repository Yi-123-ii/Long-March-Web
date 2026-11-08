const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js'),T=require('../assets/yudu-text.js'),M=require('../assets/audio/narrator-opening-v052/manifest.json');
test('expanded Yudu opening keeps the approved recording in three timed pages without changing saved progress',()=>{
 const n=D.nodes.find(n=>n.id==='river'),v=n.narration;
 assert.equal(n.text,M.text);assert.equal(v.id,'NR001');assert.equal(v.pages.length,3);assert.equal(v.pages.map(p=>p.text).join('\n\n'),n.text);assert(n.text.includes('第五次反“围剿”失利后，中央红军被迫进行战略转移。'));assert(n.text.includes('你叫小满，是队伍里的一名新战士。'));
 let end=0;for(const p of v.pages){assert(p.start>=end&&p.end>p.start&&p.end<=v.duration);assert.equal(p.cues.map(c=>c.text).join(''),p.text);let spoken=p.start;for(const c of p.cues){assert(c.start>=spoken&&c.end>c.start&&c.end<=p.end);spoken=c.end;}assert.equal(T.pageFrame(v.pages,p.end-.001,true).text,p.text);end=p.end;}
 assert.equal(T.pageFrame(v.pages,3.8).text,v.pages[0].text);assert.equal(T.pageFrame(v.pages,4).text,'');assert.equal(T.pageFrame(v.pages,13.8).text,v.pages[1].text);assert.equal(T.pageFrame(v.pages,14).text,'');assert(T.pageFrame(v.pages,Infinity,true).complete);
 const s=C.create(D),restored=C.restore(D,JSON.stringify(s));assert.equal(restored.node,'river');assert.equal(C.advance(D,restored).node,'strap');assert.equal(D.storyRevision,13);
 assert(fs.statSync(path.join(__dirname,'..',v.src)).size>1000);assert(fs.statSync(path.join(__dirname,'../assets/audio/narrator-v047/NR001.mp3')).size>1000);assert.deepEqual(M.retained_source_range,[0,23.02]);assert(M.source_duration>v.duration);assert.equal(fs.readFileSync(path.join(__dirname,'../journey.html'),'utf8').includes('yudu-data.js?v=053'),true);
});
