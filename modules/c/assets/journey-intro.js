(function(){
 'use strict';
 const $=id=>document.getElementById(id),overlay=$('intro-film'),video=$('intro-video');
 const text='小满，该出发了',plan=window.YuduText.plan(text);
 let current=null,frame=0;
 function captions(){
  if(!current)return;
  const t=video.currentTime,visible=t>=.25&&t<4.8;
  $('intro-caption').hidden=!visible;
  if(visible)$('intro-line').textContent=window.YuduText.frame(plan,window.YuduText.mediaTime(plan,t,.25,2.2),false).text;
  frame=requestAnimationFrame(captions);
 }
 function pause(){
  if(!current||current.finishing)return;
  video.pause();$('intro-pause').textContent='继续';$('intro-pause').setAttribute('aria-pressed','true');$('intro-resume').hidden=false;
 }
 function play(){
  if(!current||current.finishing)return;
  const source=video.src;
  video.play().then(()=>{
   if(!current||current.finishing){video.pause();return;}
   if(source!==video.src)return;
   $('intro-resume').hidden=true;$('intro-pause').textContent='暂停';$('intro-pause').setAttribute('aria-pressed','false');
  }).catch(()=>{if(current&&source===video.src)pause();});
 }
 function finish(){
  if(!current||current.finishing)return;
  current.finishing=true;video.pause();cancelAnimationFrame(frame);overlay.classList.add('is-leaving');
  const task=current;
  setTimeout(()=>{
   overlay.hidden=true;overlay.classList.remove('is-leaving');$('intro-caption').hidden=true;
   for(const [el,wasInert]of task.inert)el.inert=wasInert;
   current=null;task.resolve();
  },matchMedia('(prefers-reduced-motion:reduce)').matches?0:650);
 }
 $('intro-skip').onclick=finish;$('intro-resume').onclick=play;
 $('intro-pause').onclick=()=>video.paused?play():pause();
 video.onended=finish;
 video.onerror=()=>{
  if(!current||current.finishing)return;
  if(!current.fallback){
   current.fallback=true;video.src='assets/prologue/yudu-arrival-v022.webm';video.load();
   if(document.hidden)pause();else play();return;
  }
  pause();$('intro-error').hidden=false;$('intro-error').textContent='导入影片未能播放，可以跳过并继续于都故事。';
 };
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
 window.addEventListener('pagehide',pause);
 document.addEventListener('keydown',e=>{
  if(!current)return;
  if(e.key==='Escape'||(e.code==='Space'&&!['BUTTON','INPUT'].includes(e.target.tagName))){e.preventDefault();e.stopImmediatePropagation();video.paused?play():pause();}
 },true);
 window.JourneyIntro={get busy(){return !!current;},open(volume=.9){
  if(current)return current.promise;
  if(!video.src){
   video.poster=video.dataset.poster;
   video.src=video.dataset.src;
  }
  let resolve;const promise=new Promise(r=>resolve=r);
  const inert=[$('map-screen'),$('story-screen')].map(el=>[el,el.inert]);
  current={promise,resolve,inert,finishing:false,fallback:video.src.endsWith('.webm')};for(const [el]of inert)el.inert=true;
  overlay.hidden=false;overlay.classList.remove('is-leaving');$('intro-error').hidden=true;$('intro-caption').hidden=true;$('intro-line').textContent='';
  video.volume=volume;video.muted=false;video.currentTime=0;
  $('intro-skip').focus({preventScroll:true});frame=requestAnimationFrame(captions);
  if(video.error)video.onerror();else if(document.hidden)pause();else play();
  return promise;
 }};
})();
