(function(){
 'use strict';
 const $=id=>document.getElementById(id),overlay=$('album-transition'),glints=$('album-glints');
 let current=null,token=0;
 for(let i=0;i<26;i++){const s=document.createElement('i');s.style.setProperty('--x',((i*37+11)%100)+'%');s.style.setProperty('--y',((i*23+13)%85)+'%');s.style.setProperty('--delay',(i%9*.055)+'s');s.style.setProperty('--size',(i%4+2)+'px');s.style.setProperty('--drift',((i%2?1:-1)*(12+i%18))+'px');glints.append(s);}
 function skip(){if(current)current.finish();}
 $('skip-album').onclick=skip;
 window.JourneyFX={get busy(){return !!current;},skip,open(ch,image,onReveal){
  if(current)return current.promise;
  const id=++token,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let done=false,revealed=false,timerReveal,timerEnd,resolve;
  const promise=new Promise(r=>resolve=r);
  function reveal(){if(revealed||id!==token)return;revealed=true;onReveal();}
  function finish(){if(done)return;done=true;clearTimeout(timerReveal);clearTimeout(timerEnd);reveal();overlay.hidden=true;overlay.classList.remove('opening');$('map-screen').inert=false;$('story-screen').inert=false;document.body.classList.remove('album-busy');current=null;resolve();}
  current={finish,promise};$('album-place').textContent=ch.location;$('album-title').textContent=ch.title;$('album-date').textContent=ch.date;$('album-photo').src=image;
  $('album-live').textContent='正在翻开'+ch.location+'这一页';overlay.hidden=false;$('map-screen').inert=true;$('story-screen').inert=true;document.body.classList.add('album-busy');
  overlay.classList.remove('opening');void overlay.offsetWidth;overlay.classList.add('opening');$('skip-album').focus({preventScroll:true});
  timerReveal=setTimeout(reveal,reduce?30:1450);timerEnd=setTimeout(finish,reduce?150:2600);
  return promise;
 }};
})();
