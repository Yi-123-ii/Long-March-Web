(function(){
 'use strict';
 const D=window.YUDU_DATA,C=window.YuduCore,resolve=p=>window.YuduPresentation.media(p,window.YUDU_EMBEDDED);
 const $=id=>document.getElementById(id),world=$('atlas-canvas'),viewport=$('atlas-window'),pins=$('atlas-pins');
 const R=window.AtlasRoute,points=R.points,xy=R.xy,W=R.width,H=R.height;
 const flag=$('atlas-flag'),trail=$('atlas-travel-route'),travelPanel=$('atlas-travel-panel');
 let journey=null,frame=0;
 let mobile=matchMedia('(max-width:600px)').matches,zoom=mobile?1.8:1,overview=false,chosen='yudu',currentState=null,drag=null,lastChapter='';
 const byId=id=>D.chapters.find(c=>c.id===id);
 function select(id){
  if(journey)return;
  const ch=byId(id);if(!ch)return;chosen=id;
  $('atlas-place').textContent=ch.location;$('atlas-date').textContent=ch.date;$('station-title').textContent=ch.title;
  $('atlas-chapter').textContent=ch.name;
  $('atlas-photo').src=resolve(D.images[ch.image]);$('atlas-photo').alt=ch.location+'这一程的画面';
  const allowed=currentState&&C.canOpenChapter(D,currentState,id),mark=currentState?.chapterProgress?.[id];$('enter').disabled=!allowed;$('enter').textContent=allowed?(mark&&mark.node!==ch.start?'继续这一站':'翻开这一站'):'前一程走完，这一站就亮起';
  $('atlas-description').textContent=ch.summary;
  for(const b of pins.querySelectorAll('button')){const selected=b.dataset.chapter===id;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);}
  window.dispatchEvent(new CustomEvent('journey:station-selected',{detail:id}));
 }
 function position(){
  const fit=(mobile||overview?Math.min:Math.max)(viewport.clientWidth,viewport.clientHeight*W/H);
  world.style.width=Math.round(fit*zoom)+'px';world.style.setProperty('--map-scale',String(Math.max(.8,Math.min(1.35,fit*zoom/W))));world.dataset.zoom=String(zoom);$('atlas-fit').setAttribute('aria-pressed',overview&&zoom===1);
 }
 function follow(id,behavior='smooth'){
  const p=points.find(p=>p.id===id);if(!p)return;const [x,y]=xy(p);
  viewport.scrollTo({left:x/W*world.clientWidth-viewport.clientWidth*.52,top:y/H*world.clientHeight-viewport.clientHeight*.52,behavior});
 }
 for(const p of points){
  const [x,y]=xy(p),b=document.createElement('button');b.className='atlas-station'+(p.no?' main-station':'');b.id='map-'+(p.key||p.id);b.dataset.chapter=p.id;
  b.style.left=(x/W*100)+'%';b.style.top=(y/H*100)+'%';b.style.setProperty('--label-x',p.dx+'px');b.style.setProperty('--label-y',p.dy+'px');
  b.setAttribute('aria-label','走进'+p.name+'，'+byId(p.id).name);
  const dot=document.createElement('span');dot.className='station-dot';
  const label=document.createElement('span');label.className='station-label';
  if(p.no){const number=document.createElement('em');number.textContent=p.no;label.append(number);}
  const name=document.createElement('strong');name.textContent=p.name;label.append(name);
  if(p.date){const date=document.createElement('small');date.textContent=p.date;label.append(date);}
  b.append(dot,label);
  b.addEventListener('pointerenter',()=>select(p.id));b.addEventListener('focus',()=>{select(p.id);if(!journey)follow(p.id);});
  b.onclick=()=>window.dispatchEvent(new CustomEvent('journey:chapter',{detail:p.id}));pins.append(b);
 }
 $('atlas-main-route').setAttribute('d',R.path(0,9));$('atlas-epilogue-route').setAttribute('d',R.path(9,11));
 $('atlas-fit').onclick=()=>{overview=true;zoom=1;position();viewport.scrollTo({top:0,left:0,behavior:'smooth'});};
 for(const [id,dir]of[['atlas-zoom-in',1],['atlas-zoom-out',-1]])$(id).onclick=()=>{zoom=Math.max(.8,Math.min(2.8,zoom*(dir===1?1.25:.8)));position();follow(chosen);};
 viewport.addEventListener('pointerdown',e=>{if(journey||e.target.closest('button')||e.pointerType!=='mouse')return;drag={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture(e.pointerId);});
 viewport.addEventListener('pointermove',e=>{if(!drag)return;viewport.scrollLeft=drag.left-(e.clientX-drag.x);viewport.scrollTop=drag.top-(e.clientY-drag.y);});
 viewport.addEventListener('pointerup',()=>drag=null);viewport.addEventListener('pointercancel',()=>drag=null);
 window.addEventListener('resize',()=>{const nextMobile=matchMedia('(max-width:600px)').matches;if(nextMobile!==mobile){mobile=nextMobile;overview=false;zoom=mobile?1.8:1;position();follow(chosen,'instant');}else position();});
 function moveFlag(p,center=false){
  flag.setAttribute('transform','translate('+p.join(' ')+')');flag.removeAttribute('hidden');
  if(center)viewport.scrollTo({left:p[0]/W*world.clientWidth-viewport.clientWidth*.5,top:p[1]/H*world.clientHeight-viewport.clientHeight*.52,behavior:'instant'});
 }
 function atChapterEnd(state){return !!C.current(D,state).checkpoint||!!C.current(D,state).end||(C.current(D,state).routeStep||0)>=2;}
 function travel(state,to){
  if(journey)return journey.promise;
  const from=C.chapter(D,state),route=R.between(from.id,to,atChapterEnd(state));
  if(!route.length||from.id===to)return Promise.resolve();
  select(to);position();drag=null;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){moveFlag(route.at(-1),true);return Promise.resolve();}
  const inertTargets=[...document.querySelectorAll('.atlas-header,.atlas-card,.atlas-controls,.atlas-directory,.atlas-pins')].map(el=>[el,el.inert]);
  for(const [el]of inertTargets)el.inert=true;
  let resolve,done=false,start;
  const promise=new Promise(r=>resolve=r),total=R.length(route),duration=Math.min(2800,Math.max(1600,1300+total*2));
  function finish(){
   if(done)return;done=true;cancelAnimationFrame(frame);moveFlag(route.at(-1),true);
   trail.style.strokeDashoffset='0';travelPanel.hidden=true;world.classList.remove('flag-travelling');
   for(const [el,wasInert]of inertTargets)el.inert=wasInert;
   journey=null;resolve();
  }
  journey={finish,promise};
  trail.setAttribute('points',route.map(p=>p.join(',')).join(' '));trail.removeAttribute('hidden');
  trail.style.strokeDasharray=String(total);trail.style.strokeDashoffset=String(total);
  $('atlas-travel-text').textContent='从'+R.station(from.id,atChapterEnd(state)).name+'，走向'+R.station(to).name;
  travelPanel.hidden=false;world.classList.add('flag-travelling');moveFlag(route[0],true);$('skip-travel').focus({preventScroll:true});
  function tick(now){
   if(done)return;if(start===undefined)start=now;
   const t=Math.min(1,(now-start)/duration),progress=t*t*(3-2*t);
   moveFlag(R.sample(route,progress),true);trail.style.strokeDashoffset=String(total*(1-progress));
   if(t===1)finish();else frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);return promise;
 }
 $('skip-travel').onclick=()=>journey?.finish();
 window.AtlasMap={selected:()=>chosen,travel,get travelling(){return !!journey;},skipTravel(){journey?.finish();},update(state){
  currentState=state;const ch=C.chapter(D,state),n=C.current(D,state),index=D.chapters.findIndex(c=>c.id===ch.id);
  for(const b of pins.querySelectorAll('button')){const c=byId(b.dataset.chapter),allowed=C.canOpenChapter(D,state,c.id),mark=state.chapterProgress?.[c.id];b.disabled=!allowed;b.dataset.status=mark?.node===c.end?'completed':mark||state.path.includes(c.start)?'visited':allowed?'available':'locked';b.title=allowed?c.name+'：'+c.title:'先走过前一段故事';}
  $('atlas-progress').textContent=n.end?'这一程，已走到会师的日子':'脚步停在'+ch.location;
  const next=n.checkpoint?D.chapters[index+1]:ch;select(next?.id||ch.id);position();
  moveFlag(xy(R.station(ch.id,atChapterEnd(state))));trail.setAttribute('hidden','');
  if(lastChapter!==ch.id){
   if(!lastChapter&&!mobile&&!overview)viewport.scrollTo({left:world.clientWidth-viewport.clientWidth,top:0,behavior:'instant'});
   else follow(next?.id||ch.id,'instant');
   lastChapter=ch.id;
  }
 }};
 position();
})();
