const test=require('node:test'),assert=require('node:assert/strict');
const T=require('../assets/yudu-text.js');
test('Wuqi memory film holds its two confirmed sentences and leaves both history branches intact',()=>{
 const D=require('../assets/yudu-data.js'),P=require('../assets/yudu-presentation.js'),n=D.nodes.find(x=>x.id==='wuqi-write-home');
 assert.equal(n.text,'还有他家那棵枣树，也写上吧。他自己老爱说。');assert.equal(n.captionPages.map(p=>p.text).join(''),n.text);
 assert.equal(T.pageFrame(n.captionPages,.42).text,'');assert.equal(T.pageFrame(n.captionPages,3).text,'还有他家那棵枣树，也写上吧。');
 assert.equal(T.pageFrame(n.captionPages,4.47).text,T.pageFrame(n.captionPages,3).text);assert.equal(T.pageFrame(n.captionPages,4.48).text,'');
 assert.equal(T.pageFrame(n.captionPages,5.7).text,'他自己老爱说。');assert(T.pageFrame(n.captionPages,n.duration).complete);
 assert.equal(P.speaker(n).name,'陈禾');assert.equal(n.advanceOnEnd,false);assert.equal(n.next,'wuqi-write-lusheng');
 assert.deepEqual(n.routes,[{choice:'xj-choice',equals:'luggage',next:'wuqi-write-letter'}]);assert.equal(D.storyRevision,13);
 assert(!D.nodes.some(x=>(x.video||'').includes('6099')));
});
test('Chenhe dawn captions replace one sentence at a time and retain it through pauses',()=>{
 const D=require('../assets/yudu-data.js'),n=D.nodes.find(x=>x.id==='grass-dawn-call');
 assert.equal(n.captionPages.map(p=>p.text).join(''),n.text);assert.equal(n.captionPages.length,3);
 const at=t=>T.pageFrame(n.captionPages,t);
 assert.equal(at(0).text,'');assert.equal(at(2.5).text,'你在山上喊那几声，跟我娘似的。');
 assert.deepEqual(at(2.5),at(3.67));assert.equal(at(3.68).text,'');assert.notEqual(at(3.68).key,at(3.67).key);
 assert.equal(at(5.7).text,'以前她隔着田埂喊，我早听见了。');assert(!at(5.7).complete);
 assert.equal(at(7.27).text,at(5.7).text);assert.equal(at(7.28).text,'');
 assert.equal(at(8.7).text,'就是没玩够，不想回去。');assert(at(8.7).complete);assert(at(n.duration).complete);
 assert.equal(at(0).text,'');assert.equal(T.pageFrame(n.captionPages,4,true).text,n.captionPages[1].text);
 assert(!T.pageFrame(n.captionPages,4,true).complete);
});
test('Lu night caption keeps the confirmed words and does not start before he speaks',()=>{
 const D=require('../assets/yudu-data.js'),P=require('../assets/yudu-presentation.js'),n=D.nodes.find(x=>x.id==='grass-a-water'),p=T.plan(n.text);
 assert.equal(n.text,'放下吧，我想喝了叫你。');assert.equal(n.captionCues.map(c=>c.text).join(''),n.text);
 assert.equal(P.speaker(n).name,'陆生');assert.equal(T.frame(p,T.cueTime(p,1.67,n.captionCues)).text,'');
 assert.equal(T.frame(p,T.cueTime(p,3,n.captionCues)).text,'放下吧，');
 assert(T.frame(p,T.cueTime(p,5.91,n.captionCues)).complete);
});
test('Chenhe keeps the changed dialogue and does not ask for the lamp during the long pause',()=>{
 const D=require('../assets/yudu-data.js'),P=require('../assets/yudu-presentation.js');
 const n=D.nodes.find(n=>n.id==='zy-thread'),p=T.plan(n.text),at=t=>T.frame(p,T.cueTime(p,t,n.captionCues));
 assert.equal(n.text,'梁叔教过。到我手上……就是不听使唤。灯挪近点啊。');
 assert.equal(n.captionCues.map(c=>c.text).join(''),n.text);assert.equal(P.speaker(n).name,'陈禾');
 assert.equal(at(.57).text,'');assert.equal(at(1.7).text,'梁叔教过。');assert.equal(at(3.3).text,'梁叔教过。到我手上……');
 const paused='梁叔教过。到我手上……就是不听使唤。';assert.equal(at(4.6).text,paused);assert.equal(at(7.2).text,paused);
 assert(at(7.97).complete);assert.equal(at(0).text,'');assert.deepEqual(at(4),at(4));
 const light=D.nodes.find(x=>x.id===n.next);assert.equal(D.images[light.scene],n.hold);assert.equal(light.choices[0].id,'hold-light');
 assert(!light.text.includes('灯挪近点啊'));assert.equal(D.storyRevision,13);
});
test('Liang captions follow four spoken phrases and hold their text during pauses and replay',()=>{
 const D=require('../assets/yudu-data.js'),P=require('../assets/yudu-presentation.js');
 const n=D.nodes.find(n=>n.id==='xj-sleeve'),p=T.plan(n.text);
 assert.equal(n.captionCues.map(c=>c.text).join(''),'别缩，针还没碰着呢。先缝三针，过了江再补。');
 assert.equal(n.text,n.captionCues.map(c=>c.text).join(''));
 const at=t=>T.frame(p,T.cueTime(p,t,n.captionCues));
 assert.equal(at(.53).text,'');assert.equal(at(1.1).text,'别缩，');
 assert.equal(at(1.5).text,at(1.1).text);assert.equal(at(2.8).text,'别缩，针还没碰着呢。');
 assert.equal(at(3.5).text,at(2.8).text);assert.equal(at(4.8).text,'别缩，针还没碰着呢。先缝三针，');
 assert(at(5.78).complete);assert(at(n.duration).complete);assert.equal(at(0).text,'');
 assert.deepEqual(at(4),at(4));assert.equal(P.speaker(n).name,'梁叔');
 assert.equal(n.poster,D.images[n.scene]);assert.equal(n.hold,D.images[D.nodes.find(x=>x.id===n.next).scene]);
});
test('the opening invitation has its confirmed caption and completes before the original clip ends',()=>{
 const n=require('../assets/yudu-data.js').nodes.find(n=>n.id==='reach'),p=T.plan(n.text);
 assert.equal(n.text,'别站在岸上了。来，跟上我们。');assert.equal(n.speaker,'陈禾');
 const at=t=>T.frame(p,T.mediaTime(p,t,n.captionStart,n.captionEnd));
 assert.equal(at(0).text,'');assert(at(1).shown>0);assert.deepEqual(at(2),at(2));
 assert(at(n.captionEnd).complete);assert(n.duration-n.captionEnd>.4);assert.equal(at(0).shown,0);
});
test('text streams without splitting graphemes and can be revealed instantly',()=>{
 const p=T.plan('你，👨‍👩‍👧‍👦好。');
 assert.equal(T.frame(p,0).text,'');assert.equal(T.frame(p,42).text,'你');
 assert.equal(p.glyphs.length,5);assert.equal(T.frame(p,214).text,'你，👨‍👩‍👧‍👦');
 assert.equal(T.frame(p,0,true).text,'你，👨‍👩‍👧‍👦好。');assert(T.frame(p,p.duration).complete);
});
test('commas and sentence endings create readable pauses, empty clips finish immediately',()=>{
 const p=T.plan('甲，乙。');assert(p.ends[1]-p.ends[0]>p.ends[2]-p.ends[1]);
 assert(p.ends[3]-p.ends[2]>p.ends[1]-p.ends[0]);assert(T.frame(T.plan(''),0).complete);
});
test('video captions follow the media clock through pause and seek, finishing before the cut',()=>{
 const p=T.plan('我叫陈禾，禾苗的禾。你呢？');
 const at=t=>T.frame(p,T.mediaTime(p,t,.12,3.79));
 assert.equal(at(0).text,'');assert.equal(at(.11).text,'');
 assert.deepEqual(at(1.5),at(1.5));assert(at(3.79).complete);
 assert(at(2).shown>at(1).shown);assert.equal(at(.1).shown,0);
 assert(at(4.096).complete);
});
