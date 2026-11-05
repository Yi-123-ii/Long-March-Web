(function(){
 'use strict';
 const $=id=>document.getElementById(id),overlay=$('intro-film'),video=$('intro-video');
 const text='小满，该出发了',plan=window.YuduText.plan(text);
 let current=null,frame=0;
 const source=()=>window.YuduPresentation.media(video.dataset.src,window.YUDU_EMBEDDED);
 function prepare(){video.poster=video.dataset.poster;window.JourneyFilms.prepare(source());}
 function loadFilm(src){
  const task=current,request=++task.request;task.prepared=false;$('intro-loading').hidden=task.paused;
  window.JourneyFilms.load(src,(loaded,total)=>{
   if(current!==task||task.finishing||task.request!==request)return;
   $('intro-loading').textContent='影片准备中'+(total?' '+Math.min(100,Math.round(loaded/total*100))+'%':'');
  }).then(url=>{
   if(current!==task||task.finishing||task.request!==request)return;
   task.prepared=true;video.src=url;video.currentTime=0;$('intro-loading').hidden=true;
   if(document.hidden)pause();else if(!task.paused)play();
  }).catch(()=>{if(current===task&&!task.finishing&&task.request===request)video.onerror();});
 }
 function captions(){
  if(!current)return;
  const t=video.currentTime,visible=t>=.25&&t<4.8;
  $('intro-caption').hidden=!visible;
  if(visible)$('intro-line').textContent=window.YuduText.frame(plan,window.YuduText.mediaTime(plan,t,.25,2.2),false).text;
  frame=requestAnimationFrame(captions);
 }
 function pause(){
  if(!current||current.finishing)return;
  current.paused=true;video.pause();$('intro-loading').hidden=true;$('intro-pause').textContent='继续';$('intro-pause').setAttribute('aria-pressed','true');$('intro-resume').hidden=false;
 }
 function play(){
  if(!current||current.finishing)return;
  current.paused=false;$('intro-resume').hidden=true;$('intro-pause').textContent='暂停';$('intro-pause').setAttribute('aria-pressed','false');
  if(!current.prepared){$('intro-loading').hidden=false;return;}
  const source=video.src;
  video.play().then(()=>{
   if(!current||current.finishing){video.pause();return;}
   if(source!==video.src)return;
   if(current.paused){video.pause();return;}
   $('intro-resume').hidden=true;$('intro-pause').textContent='暂停';$('intro-pause').setAttribute('aria-pressed','false');
  }).catch(()=>{if(current&&source===video.src)pause();});
 }
 function finish(){
  if(!current||current.finishing)return;
  current.finishing=true;video.pause();$('intro-loading').hidden=true;cancelAnimationFrame(frame);overlay.classList.add('is-leaving');
  const task=current;
  setTimeout(()=>{
   overlay.hidden=true;overlay.classList.remove('is-leaving');$('intro-caption').hidden=true;
   for(const [el,wasInert]of task.inert)el.inert=wasInert;
   current=null;task.resolve();
  },matchMedia('(prefers-reduced-motion:reduce)').matches?0:650);
 }
 $('intro-skip').onclick=finish;$('intro-resume').onclick=play;
 $('intro-pause').onclick=()=>current?.paused?play():pause();
 video.onended=finish;
 video.onerror=()=>{
  if(!current||current.finishing)return;
  if(!current.fallback){
   current.fallback=true;loadFilm('assets/prologue/yudu-arrival-v022.webm');return;
  }
  pause();$('intro-error').hidden=false;$('intro-error').textContent='导入影片暂未播放，可跳过影片继续于都故事';
 };
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
 window.addEventListener('pagehide',pause);
 document.addEventListener('keydown',e=>{
  if(!current)return;
  if(e.key==='Escape'||(e.code==='Space'&&!['BUTTON','INPUT'].includes(e.target.tagName))){e.preventDefault();e.stopImmediatePropagation();current.paused?play():pause();}
 },true);
 window.JourneyIntro={prepare,get busy(){return !!current;},open(volume=.9){
  if(current)return current.promise;
  video.poster=video.dataset.poster;
  let resolve;const promise=new Promise(r=>resolve=r);
  const inert=[$('map-screen'),$('story-screen')].map(el=>[el,el.inert]);
  current={promise,resolve,inert,finishing:false,fallback:false,prepared:false,paused:document.hidden,request:0};for(const [el]of inert)el.inert=true;
  overlay.hidden=false;overlay.classList.remove('is-leaving');$('intro-error').hidden=true;$('intro-caption').hidden=true;$('intro-line').textContent='';
  video.volume=volume;video.muted=false;
  $('intro-skip').focus({preventScroll:true});frame=requestAnimationFrame(captions);
  loadFilm(source());if(document.hidden)pause();else play();
  return promise;
 }};
})();
