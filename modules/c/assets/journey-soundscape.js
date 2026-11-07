(function(root){
 'use strict';
 const files=Object.fromEntries(['river','cold','battle','room','gorge','snow','grass','north','courtyard','dayroom','remembrance'].map(key=>[key,'assets/audio/soundscapes-v051/'+key+'.ogg']));
 const frontline=new Set(['xj-arrive','xj-offer-sleeve','xj-sleeve','xj-three','xj-cover-fire-v035','xj-cover-wait-v035','xj-choice','xj-a-lusheng','xj-a-name','xj-a-roll','xj-a-introduce','xj-a-tell','xj-a-tell-spoken-v034','xj-a-water','xj-shallows-v034','xj-b-handoff','xj-b-bag','xj-b-leave','xj-pack-cross-v034','xj-release-v034']);
 const indoors=new Set(['wuqi-choice','wuqi-sew','wuqi-sew-reply','wuqi-sew-reply-spoken-v034','wuqi-sew-still','wuqi-sew-result','wuqi-sew-letter','wuqi-sew-letter-wrap-v034','wuqi-sew-confirm','wuqi-write','wuqi-write-home','wuqi-write-lusheng','wuqi-read-wait','wuqi-read-turn','wuqi-write-letter','wuqi-writing']);
 function ambienceFor(node,chapter){
  if(node.ambient)return node.ambient;
  if(chapter.id==='xiangjiang')return frontline.has(node.id)?'battle':'cold';
  if(chapter.id==='wuqi')return indoors.has(node.id)?'dayroom':'courtyard';
  if(chapter.id==='north')return 'north';
  if(chapter.id==='epilogue')return 'remembrance';
  return chapter.ambient||'river';
 }
 function create(primary,options={}){
  const make=options.makeAudio||(()=>new Audio()),clock=options.clock||(()=>performance.now()),onError=options.onError||(()=>{});
  // Audio envelopes must keep running when the window is occluded and visual animation frames are throttled.
  const schedule=options.schedule||(fn=>root.setTimeout(()=>fn(clock()),25)),cancel=options.cancel||root.clearTimeout.bind(root);
  const secondary=make();secondary.id='ambient-audio-crossfade';
  primary.after?.(secondary);
  const slots=[primary,secondary].map(audio=>{audio.volume=0;audio.loop=true;audio.preload='none';return {audio,src:'',fade:null,value:0,releasing:false};});
  let current=0,level=0,running=false,frame=0;const master={value:0,fade:null},failures=new Set();
  function report(slot,error){if(running&&slot===slots[current]&&error?.name!=='AbortError'&&!failures.has(slot.src)){failures.add(slot.src);onError(error);}}
  function start(slot){if(!running||!slot.src||slot.releasing)return;const source=slot.src;Promise.resolve(slot.audio.play()).catch(error=>{if(slot.src===source)report(slot,error);});}
  function tick(now){
   frame=0;let more=false;
   for(const slot of [master,...slots]){const fade=slot.fade;if(fade){const t=Math.max(0,Math.min(1,(now-fade.start)/fade.duration)),e=t*t*(3-2*t);slot.value=fade.from+(fade.to-fade.from)*e;
    if(t===1){slot.fade=null;if(slot.releasing){slot.audio.pause();slot.releasing=false;}}else more=true;}
    if(slot.audio)slot.audio.volume=Math.max(0,Math.min(1,slot.value*master.value));
   }
   if(more)frame=schedule(tick);
  }
  function fade(slot,target,duration){slot.fade={from:slot.value,to:target,start:clock(),duration};if(!frame)frame=schedule(tick);}
  function select(src){
   if(slots[current].src===src)return;
   const old=slots[current],next=slots[1-current];next.audio.pause();next.fade=null;next.value=0;next.audio.volume=0;next.releasing=false;
   next.src=src;next.audio.src=src;next.audio.load();next.audio.onerror=()=>report(next,new Error('Ambient media failed'));current=1-current;
   if(running){old.releasing=true;fade(old,0,1200);start(next);fade(next,1,1400);}else{old.audio.pause();old.value=0;old.audio.volume=0;old.fade=null;}
  }
  function setVolume(value){const target=Math.max(0,Math.min(1,value));if(Math.abs(target-level)<.0001)return;const previous=level;level=target;if(running)fade(master,level,target<previous?180:950);}
  function play(){if(running)return;running=true;start(slots[current]);fade(slots[current],1,700);fade(master,level,700);}
  function pause(){running=false;if(frame){cancel(frame);frame=0;}master.value=0;master.fade=null;for(const slot of slots){slot.fade=null;slot.audio.pause();slot.value=0;slot.audio.volume=0;slot.releasing=false;}}
  function stop(){pause();for(const slot of slots)if(slot.src)slot.audio.currentTime=0;}
  return {select,setVolume,play,pause,stop};
 }
 const api={create,ambienceFor,files};if(typeof module==='object'&&module.exports)module.exports=api;else root.JourneySoundscape=api;
})(typeof window==='undefined'?globalThis:window);
