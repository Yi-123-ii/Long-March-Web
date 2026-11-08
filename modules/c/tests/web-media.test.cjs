const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const D=require('../assets/yudu-data.js'),media=require('../assets/journey-media.js'),P=require('../assets/yudu-presentation.js');
const base=path.resolve(__dirname,'..'),manifest=require('../../../docs/journey/web-media.json');
const leveled=require('../assets/audio/leveled-v056/manifest.json').recordings;
test('delivery copies match current supplied sources and every film keeps a fast-start 720p delivery path',()=>{
 const films=['assets/prologue/yudu-arrival-v022.mp4',...D.nodes.filter(n=>n.nativeAudio).map(n=>n.video||D.video)];
 for(const source of films){assert(media[source]?.endsWith('.mp4'),source);assert.equal(P.media(source,null,media),media[source]);}
 for(const file of manifest.files){
  const source=fs.readFileSync(path.join(base,file.source)),web=fs.readFileSync(path.join(base,file.web));
  assert.equal(createHash('sha256').update(source).digest('hex'),file.sha256,'Rebuild delivery copy after changing '+file.source);
  const adjusted=leveled.find(r=>r.processed&&r.paths.includes(file.source));
  assert.equal(media[file.source],adjusted?.playback||file.web);assert.equal(web.length,file.webBytes);assert(web.length<source.length);
  if(file.web.endsWith('.mp4')){
   const boxes=[];for(let at=0;at+8<=web.length;){const length=web.readUInt32BE(at);boxes.push(web.toString('ascii',at+4,at+8));assert(length>=8);at+=length;}
   assert(boxes.indexOf('moov')<boxes.indexOf('mdat'),file.web);
  }
 }
 assert.equal(P.media(films[0],{[films[0]]:'embedded'},media),'embedded');
});
