const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const S=require('../assets/journey-soundscape.js'),D=require('../assets/yudu-data.js');
function harness(){let now=0,id=0,frames=new Map();const players=[];const makeAudio=()=>{const a={volume:1,paused:true,currentTime:0,play(){this.paused=false;return Promise.resolve();},pause(){this.paused=true;},load(){}};players.push(a);return a;};const first=makeAudio(),m=S.create(first,{makeAudio,schedule:fn=>{frames.set(++id,fn);return id;},cancel:id=>frames.delete(id),clock:()=>now});const step=ms=>{now+=ms;const tasks=[...frames.values()];frames.clear();for(const fn of tasks)fn(now);};return {m,players,step};}
test('field-recording backgrounds crossfade without restarting on every line and duck below speech',()=>{
 const {m,players,step}=harness();m.select('river');m.setVolume(.35);m.play();step(750);const first=players.find(a=>a.src==='river');assert(!first.paused);assert(Math.abs(first.volume-.35)<.001);first.currentTime=10;m.select('river');assert.equal(first.currentTime,10);
 m.select('snow');step(600);const next=players.find(a=>a.src==='snow');assert(first.volume>0&&next.volume>0);step(850);assert(first.paused);assert(Math.abs(next.volume-.35)<.001);
 m.setVolume(.09);step(200);assert(next.volume<.1);m.setVolume(0);step(200);assert.equal(next.volume,0);m.setVolume(.35);step(1000);assert(Math.abs(next.volume-.35)<.001);
});
test('speech and film ducking also silence an outgoing track during a scene crossfade',()=>{
 const {m,players,step}=harness();m.select('river');m.setVolume(.35);m.play();step(750);m.select('snow');m.setVolume(.09);step(200);assert(players.every(a=>a.volume<=.09));m.setVolume(0);step(200);assert(players.every(a=>a.volume===0));
});
test('pause, leaving and rapid scene changes cannot leave a hidden background playing',()=>{
 const {m,players,step}=harness();m.select('river');m.setVolume(.35);m.play();step(800);m.select('snow');step(100);m.select('room');step(1500);assert.equal(players.filter(a=>!a.paused).length,1);assert(players.find(a=>!a.paused).src==='room');
 m.pause();step(2000);assert(players.every(a=>a.paused&&a.volume===0));m.play();step(800);assert.equal(players.filter(a=>!a.paused).length,1);m.stop();assert(players.every(a=>a.paused&&a.currentTime===0));
});
test('backgrounds follow the fighting, indoor and outdoor scenes without changing story decisions',()=>{
 const at=id=>D.nodes.find(n=>n.id===id),ch=n=>D.chapters.find(c=>c.id===n.chapter),ambient=id=>S.ambienceFor(at(id),ch(at(id)));
 assert.equal(ambient('xj-arrive'),'battle');assert.equal(ambient('xj-loss'),'cold');assert.equal(ambient('zy-arrive'),'room');assert.equal(ambient('snow-path'),'snow');assert.equal(ambient('grass-a-night'),'grass');assert.equal(ambient('north-arrive'),'north');assert.equal(ambient('wuqi-arrive'),'courtyard');assert.equal(ambient('wuqi-write'),'dayroom');assert.equal(ambient('wuqi-later-route'),'courtyard');assert.equal(ambient('epilogue-remember'),'remembrance');
 for(const n of D.nodes){const key=S.ambienceFor(n,ch(n));assert(S.files[key],n.id);assert(fs.statSync(path.join(__dirname,'..',S.files[key])).size>1000);}
 const M=require('../assets/audio/soundscapes-v051/manifest.json');assert.equal(M.tracks.length,11);assert.equal(M.cash_cost_cny,0);assert(M.tracks.every(t=>t.peak<=.241&&t.duration>=40));assert(M.sources.every(s=>['PD','CC0-1.0','project-original'].includes(s.license)));
});
test('the Zunyi letter stays in the lamplit room while the Xiangjiang letter keeps its riverside view',()=>{
 const at=id=>D.nodes.find(n=>n.id===id);for(const id of ['zy-b-letter','zy-b-offer','zy-b-offer-spoken-v034'])assert.equal(at(id).scene,'chenhe-unfinished-letter-first');assert.equal(at('xj-b-letter').scene,'keepsakes');assert.equal(at('zy-b-letter').document,'娘，等有了落脚的地方……');
 assert.equal(at('wuqi-unpack-v034').scene,'wuqi-unpack-v051');assert.equal(at('wuqi-unpack-v034').narration.id,'XN080');for(const id of ['t1-dry','t1-letter','t1-go'])assert.equal(at(id).scene,'jinsha-pack-v051');
 for(const scene of ['wuqi-unpack-v051','jinsha-pack-v051']){assert(D.imageAlt[scene]);assert(fs.statSync(path.join(__dirname,'..',D.images[scene])).size>1000);}
});
