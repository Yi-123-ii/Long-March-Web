const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const D=require('../assets/yudu-data.js'),C=require('../assets/yudu-core.js'),P=require('../assets/yudu-presentation.js'),M=require('../assets/journey-media.js'),levels=require('../assets/audio/leveled-v056/manifest.json');
const at=id=>D.nodes.find(n=>n.id===id),base=path.resolve(__dirname,'..');
test('every complete story sentence has terminal punctuation, including interrupted speech',()=>{
 for(const n of D.nodes.filter(n=>n.text?.trim())){
  const text=n.id==='epilogue-remember'?n.text.split('\n\n1936—2026')[0]:n.text;
  assert(/[。！？?!…][”」）)]?$/u.test(text.trim()),n.id+': '+text);
 }
 assert(at('grass-b-home-street').text.endsWith('……'));
 assert.equal(at('grass-b-home-street').captionPages.map(p=>p.text).join(''),at('grass-b-home-street').text);
});
test('grass rest, returning bowls, reading a page and seated arrivals have distinct complete images',()=>{
 const ids=['grass-dawn-route','grass-dawn-end','wuqi-read-wait','wuqi-writing','wuqi-later-route','wuqi-hear-newcomer'];
 assert.equal(new Set(ids.map(id=>at(id).scene)).size,6);
 for(const id of ids){const n=at(id);assert(D.imageAlt[n.scene]?.length>10);assert(fs.statSync(path.join(base,D.images[n.scene])).size>1000);}
 assert.equal(at('wuqi-writing').documentInScene,true);assert(at('wuqi-writing').document.includes('枣树'));assert(!at('wuqi-writing').document.includes('娘，'));
});
test('old courtyard saves continue without replaying writing and backward navigation skips the empty anchor',()=>{
 const old=require('./fixtures/backyard-before-v056.json'),s=C.restore(D,old);assert.equal(s.node,old.node);assert.deepEqual(s.path,old.path);
 const next=C.advance(D,s);assert.equal(next.node,'wuqi-later-route');assert(!at(s.node).text&&!at(s.node).choices);
 // Use a complete validated writing branch, and preserve its chosen options after return.
 let w=C.create(D);while(w.node!=='wuqi-writing'){const n=C.current(D,w);w=C.advance(D,w,n.id==='wuqi-choice'?'write':n.choices?.[0]?.id);}
 const anchor=C.advance(D,w,'write-names'),yard=C.advance(D,anchor);assert.equal(yard.node,'wuqi-later-route');assert.equal(C.back(D,yard).node,'wuqi-writing');assert.equal(C.restore(D,yard).node,yard.node);
 assert.equal(D.nodes.filter(n=>n.narration?.id==='XN087').length,1);
});
test('normalized delivery uses the approved recording, retains all originals and provides measured headroom',()=>{
 assert.equal(levels.recordings.length,167);let processed=0;
 for(const r of levels.recordings){if(!r.processed)continue;processed++;
  for(const key of r.paths)assert.equal(P.media(key,null,M),r.playback);
  const original=fs.readFileSync(path.join(base,r.file)),out=fs.readFileSync(path.join(base,r.playback));
  const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
  assert.equal(hash(original),r.original_sha256);assert.equal(hash(out),r.verification.playback_sha256);
  assert(r.verification.decode_ok);assert(r.verification.true_peak_dbtp<=-1);
  const tolerance=r.nodes.includes('wuqi-answer-name')?1.5:1;assert(Math.abs(r.verification.integrated_lufs+18)<=tolerance,r.file);
  if(r.native)assert.equal(r.verification.video_bitstream_identical,true);
 }
 assert.equal(processed,160);const lu=levels.recordings.find(r=>r.nodes.includes('wuqi-read-wait'));assert(lu.verification.integrated_lufs>-19);assert(Number(lu.measurement.input_i)<-30);
 const clean=levels.recordings.find(r=>r.nodes.includes('grass-b-names'));assert.equal(clean.file,'assets/review-v053/XN060-clean.mp3');assert(clean.verification.duration_after<13);
});
