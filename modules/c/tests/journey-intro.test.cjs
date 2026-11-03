const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');

function fixture(){
 const nodes=new Map(),events={},frames=new Map();let nextFrame=0;
 function element(id){if(!nodes.has(id))nodes.set(id,{hidden:false,inert:false,textContent:'',src:'assets/prologue/yudu-arrival-v022.mp4',classList:{add(){},remove(){}},setAttribute(){},focus(){},load(){this.paused=true;},paused:true,currentTime:0,pause(){this.paused=true;},play(){this.paused=false;return Promise.resolve();}});return nodes.get(id);}
 const document={hidden:false,getElementById:element,addEventListener:(type,fn)=>{events[type]=fn;}};
 const window={YuduText:require('../assets/yudu-text.js'),addEventListener(){}};
 const context={document,window,matchMedia:()=>({matches:true}),requestAnimationFrame:fn=>{const id=++nextFrame;frames.set(id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id),setTimeout};
 vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/journey-intro.js'),'utf8'),context);
 return {api:window.JourneyIntro,el:element,document,events,frames};
}

test('the intro owns one playback, restores prior interaction state and never changes chapter progress',async()=>{
 const f=fixture();f.el('map-screen').inert=true;
 const first=f.api.open(.65),second=f.api.open(.2);
 assert.equal(first,second);assert.equal(f.api.busy,true);assert.equal(f.el('intro-video').volume,.65);
 assert.equal(f.el('story-screen').inert,true);
 f.el('intro-skip').onclick();await first;
 assert.equal(f.api.busy,false);assert.equal(f.el('intro-film').hidden,true);
 assert.equal(f.el('map-screen').inert,true);assert.equal(f.el('story-screen').inert,false);
 assert.equal(f.el('intro-video').paused,true);
});

test('hiding the page pauses the supplied film and returning requires explicit resume',async()=>{
 const f=fixture(),done=f.api.open();await Promise.resolve();
 f.document.hidden=true;f.events.visibilitychange();
 assert.equal(f.el('intro-video').paused,true);assert.equal(f.el('intro-resume').hidden,false);
 f.document.hidden=false;f.events.visibilitychange();assert.equal(f.el('intro-video').paused,true);
 f.el('intro-resume').onclick();await Promise.resolve();assert.equal(f.el('intro-video').paused,false);
 f.el('intro-video').onended();await done;assert.equal(f.api.busy,false);
});

test('the confirmed caption streams from the film clock and seeking beyond speech hides it',async()=>{
 const f=fixture(),done=f.api.open(),tick=()=>{[...f.frames.values()].at(-1)();};
 f.el('intro-video').currentTime=1;tick();assert.equal(f.el('intro-caption').hidden,false);
 const partial=f.el('intro-line').textContent;assert(partial.length>0&&partial.length<'小满，该出发了'.length);
 f.el('intro-video').currentTime=2.4;tick();assert.equal(f.el('intro-line').textContent,'小满，该出发了');
 f.el('intro-video').currentTime=6;tick();assert.equal(f.el('intro-caption').hidden,true);
 f.el('intro-skip').onclick();await done;
});

test('media failure remains skippable and a subsequent replay can open cleanly',async()=>{
 const f=fixture(),first=f.api.open();f.el('intro-video').onerror();
 assert(f.el('intro-video').src.endsWith('.webm'));assert.equal(f.el('intro-error').hidden,true);
 f.el('intro-video').onerror();
 assert.equal(f.el('intro-error').hidden,false);assert.equal(f.el('intro-video').paused,true);
 f.el('intro-skip').onclick();await first;
 const replay=f.api.open();assert.equal(f.el('intro-error').hidden,true);assert.equal(f.el('intro-video').currentTime,0);
 f.el('intro-skip').onclick();await replay;
});
