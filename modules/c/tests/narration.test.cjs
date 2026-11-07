const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js');
const M=require('../assets/audio/xiaoman-narration-v039/manifest.json');

test('the six supplied narration recordings cover exactly 51 scenes and 112 sentence cues',()=>{
 const voiced=D.nodes.filter(n=>n.narration?.src.includes('xiaoman-narration-v039/')),by=new Map(D.nodes.map(n=>[n.id,n]));
 assert.equal(M.source_files.length,6);assert.equal(voiced.length,51);
 assert.equal(new Set(voiced.map(n=>n.narration.id)).size,51);
 assert.equal(voiced.reduce((total,n)=>total+n.narration.cues.length,0),112);
 for(const row of M.nodes){
  const n=by.get(row.node),v=n.narration,clip=M.clips.find(c=>c.id===row.id);
  assert.equal(v.id,row.id);assert.equal(n.text,clip.text);assert.equal(v.cues.map(c=>c.text).join(''),n.text);
  assert.deepEqual(v.sentences,clip.sentence_ids);assert.equal(v.cues.length,v.sentences.length);
  assert(!n.voice,'old dialogue and narration must not share one node');assert(['thought','observation'].includes(n.mode));
  assert(fs.statSync(path.join(__dirname,'..',v.src)).size>1000);
  let end=0;for(const cue of v.cues){assert(cue.start>=end-.001,n.id);assert(cue.end>cue.start);assert(cue.end<=v.duration+.001);end=cue.end;}
  if(n.nativeAudio){assert(n.textAfterMovie);assert(!n.advanceOnEnd,'silent films must retain the player choice after narration');}
 }
 assert.deepEqual(voiced.filter(n=>n.nativeAudio).map(n=>n.id).sort(),['xj-choice','zy-a-lusheng']);
});

test('the fourth recording part adds 19 scene narrations and 39 sentence cues on both grass routes and the northern passage',()=>{
 const fourth=require('../assets/audio/xiaoman-narration-v041/manifest.json');
 const voiced=D.nodes.filter(n=>n.narration?.src.includes('xiaoman-narration-v041/')),by=new Map(D.nodes.map(n=>[n.id,n]));
 assert.equal(fourth.source_files.length,2);assert.equal(voiced.length,19);assert.equal(voiced.reduce((s,n)=>s+n.narration.cues.length,0),39);
 for(const row of fourth.nodes){
  const n=by.get(row.node),v=n.narration,c=fourth.clips.find(c=>c.id===row.id);
  assert.equal(v.id,row.id);assert.equal(n.text,c.text);assert.equal(v.cues.map(c=>c.text).join(''),n.text);
  assert(!n.nativeAudio&&!n.voice);assert(['thought','observation'].includes(n.mode));
  assert(fs.statSync(path.join(__dirname,'..',v.src)).size>1000);
  let end=0;for(const cue of v.cues){assert(cue.start>=end-.001,n.id);assert(cue.end>cue.start);assert(cue.end<=v.duration+.001);end=cue.end;}
 }
 assert.equal(D.nodes.filter(n=>n.narration).length,70);
 assert.equal(by.get('grass-choice').narration.id,'XN052');
 assert.equal(by.get('grass-a-chen-return').text,'卫生员把人接过去，陈禾才卸下背上的包。他还撑着膝盖没直起身，我往里挪了挪。');
 assert.equal(by.get('north-passage-v034').narration.id,'XN070');
 for(const n of D.nodes.filter(n=>n.narration))assert(!fourth.remaining_unrecorded_ids.includes(n.narration.id));
 for(const source of fourth.source_files)for(const edit of source.edits)for(const edge of edit.boundaries)assert(edge.time>=edge.silence[0]&&edge.time<=edge.silence[1]);
});

test('new narration follows the active latest-main scenes without reviving obsolete aliases',()=>{
 const by=new Map(D.nodes.map(n=>[n.id,n]));
 assert.equal(by.get('t1-shoulder-pack-v036').narration.id,'XN035');
 assert.equal(by.get('snow-wet-clothes-v037').narration.id,'XN041');
 for(const id of ['t1-chishui-wait-v034','snow-wet-v034']){assert.equal(by.get(id).text,'');assert(!by.get(id).narration);}
 const paragraphIds=new Set(D.nodes.filter(n=>n.narration).map(n=>n.narration.id));
 assert.equal(M.missing_third_part_second_half.length,0);
 for(let i=1;i<=51;i++)assert(paragraphIds.has('XN'+String(i).padStart(3,'0')));
 for(const id of M.missing_third_part_second_half)assert(!paragraphIds.has(id));
 assert.equal(D.storyRevision,13);assert.equal(new Set(D.nodes.filter(n=>n.voice).map(n=>n.voiceId)).size,29);assert.equal(D.nodes.filter(n=>n.nativeAudio).length,31);
 // Existing saves and all five decisions still traverse the complete real graph.
 for(const choice of ['hand','help'])for(const xj of ['stretcher','luggage'])for(const snow of ['support','call'])for(const grass of ['stay','rescue'])for(const wuqi of ['sew','write']){
  const picks={choice,'xj-choice':xj,'snow-choice':snow,'grass-choice':grass,'wuqi-choice':wuqi};let s=C.create(D),guard=0;
  while(s.node!=='journey-end'&&guard++<512){const n=C.current(D,s),next=C.advance(D,s,picks[n.id]||n.choices?.[0]?.id);assert.notEqual(next,s);s=next;}
  assert.equal(s.node,'journey-end');assert.deepEqual(C.restore(D,s).path,s.path);
 }
});
