const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const D=require('../assets/yudu-data.js'),T=require('../assets/yudu-text.js');
test('fifth-part audio includes the two complete retakes at their original scenes',()=>{
 const m=require('../assets/audio/xiaoman-narration-v045/manifest.json'),by=new Map(D.nodes.map(n=>[n.id,n])),voices=D.nodes.filter(n=>n.narration?.src.includes('xiaoman-narration-v045/'));
 assert.equal(m.received_paragraph_count,22);assert.equal(voices.length,22);assert.equal(m.sentence_count,41);assert.deepEqual(m.pending_recordings,[]);
 assert.equal(by.get('wuqi-write').narration.id,'XN084');assert.equal(by.get('wuqi-later-help').narration.id,'XN089');
 assert(m.source_files.some(s=>s.file==='jimeng-2026-11-07-8793.wav'));
 for(const row of m.nodes){const n=by.get(row.node),v=n.narration,c=m.clips.find(c=>c.id===row.id);assert.equal(v.id,c.id);assert.equal(n.text,c.text);assert.equal(v.cues.map(c=>c.text).join(''),n.text);assert(!n.nativeAudio&&!n.voice);assert(fs.statSync(path.join(__dirname,'..',v.src)).size>1000);let end=0;for(const q of v.cues){assert(q.start>=end-.001);assert(q.end>q.start&&q.end<=v.duration+.001);end=q.end;}}
 assert.equal(by.get('wuqi-water-rim').narration.id,'XN077');assert.equal(by.get('wuqi-water').filmId,'WQ-02');
 assert.equal(D.nodes.filter(n=>n.narration).length,92);assert.equal(new Set(D.nodes.filter(n=>n.voice).map(n=>n.voiceId)).size,28);
});
test('6751 keeps its original dialogue and plays the rest continuously without an unsupported nickname question',()=>{
 const by=new Map(D.nodes.map(n=>[n.id,n])),clips=['snow-hold-pack','snow-pack'].map(id=>by.get(id));
 assert(clips.every(n=>n.video.endsWith('chenhe-mountain-pack-original6751-v046.mp4')&&n.nativeAudio&&n.advanceOnEnd));
 assert.equal(clips[0].mediaEnd,51/24);assert.equal(clips[1].mediaStart,clips[0].mediaEnd);assert(clips[1].mediaEnd>13&&clips[1].mediaEnd<13.2);
 assert.equal(clips[1].text,'在家也得我娘替我重捆。她隔着院子就喊，你又给捆歪了！哎。先别松，马上好了。');
 assert.equal(T.pageFrame(clips[1].captionPages,7,true).text,'你又给捆歪了！');assert(!clips[1].text.includes('阿禾'));
 for(const [index,n]of clips.entries()){assert.equal(n.captionPages.map(p=>p.text).join(''),n.text);assert.equal(n.hold,D.images[by.get(n.next).scene]);if(index)assert.equal(n.poster,clips[index-1].hold);}
 assert.equal(by.get('snow-ask-home-spoken-v034').voiceId,'XM10');
 for(const id of ['snow-nickname','snow-nickname-spoken-v034','snow-respond-name']){const n=by.get(id);assert.equal(n.text,'');assert(!n.voice&&!n.nativeAudio&&!n.choices);}
 assert(!D.nodes.some(n=>n.voiceId==='XM11'));assert.equal(D.storyRevision,13);
});
