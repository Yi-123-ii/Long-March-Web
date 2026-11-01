const test=require('node:test'),assert=require('node:assert/strict');
const T=require('../assets/yudu-text.js');
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
