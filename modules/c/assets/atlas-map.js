(function(){
 'use strict';
 const D=window.YUDU_DATA,C=window.YuduCore,resolve=p=>window.YUDU_EMBEDDED?.[p]||p;
 const $=id=>document.getElementById(id),world=$('atlas-canvas'),viewport=$('atlas-window'),pins=$('atlas-pins');
 const points=[
  {id:'yudu',name:'于都',lon:115.414,lat:25.95,no:'一',dx:-20,dy:24},
  {id:'xiangjiang',name:'湘江',lon:111.07,lat:25.94,no:'二',dx:15,dy:22},
  {id:'zunyi',name:'遵义',lon:106.92,lat:27.70,no:'三',dx:18,dy:22},
  {id:'rivers',name:'赤水',lon:105.70,lat:28.59,dx:16,dy:-25},
  {id:'rivers',key:'jinsha',name:'金沙江',lon:102.35,lat:26.53,dx:16,dy:20},
  {id:'luding',name:'泸定桥',lon:102.23,lat:29.92,dx:-65,dy:8},
  {id:'snow',name:'夹金山',lon:102.72,lat:30.85,no:'四',dx:18,dy:8},
  {id:'grass',name:'草地',lon:102.75,lat:32.70,no:'五',dx:18,dy:8},
  {id:'north',name:'六盘山',lon:106.10,lat:35.65,dx:17,dy:17},
  {id:'wuqi',name:'吴起',lon:108.18,lat:36.92,no:'六',dx:18,dy:8},
  {id:'epilogue',name:'会宁',lon:105.05,lat:35.69,dx:-58,dy:-19},
  {id:'epilogue',key:'jiangtai',name:'将台堡',lon:105.69,lat:35.80,dx:-7,dy:-43}
 ];
 const xy=p=>[(p.lon-98)/20*1180,(39-p.lat)/16*780];
 let mobile=matchMedia('(max-width:600px)').matches,zoom=mobile?1.8:1,chosen='yudu',currentState=null,drag=null,lastChapter='';
 const byId=id=>D.chapters.find(c=>c.id===id);
 function select(id){
  const ch=byId(id);if(!ch)return;chosen=id;
  $('atlas-place').textContent=ch.location;$('atlas-date').textContent=ch.date;$('station-title').textContent=ch.title;
  $('atlas-photo').src=resolve(D.images[ch.image]);$('atlas-photo').alt=ch.location+'这一程的画面';
  const allowed=currentState&&C.canOpenChapter(D,currentState,id);$('enter').disabled=!allowed;$('enter').textContent=allowed?'翻开这一站':'前一程走完，这一站就亮起';
  $('atlas-description').textContent=ch.summary;
  for(const b of pins.querySelectorAll('button'))b.classList.toggle('selected',b.dataset.chapter===id);
  window.dispatchEvent(new CustomEvent('journey:station-selected',{detail:id}));
 }
 function position(){
  const fit=Math.min(viewport.clientWidth,viewport.clientHeight*1180/780);
  world.style.width=Math.round(fit*zoom)+'px';world.dataset.zoom=String(zoom);$('atlas-fit').setAttribute('aria-pressed',zoom===1);
 }
 function follow(id,behavior='smooth'){
  const p=points.find(p=>p.id===id);if(!p)return;const [x,y]=xy(p);
  viewport.scrollTo({left:x/1180*world.clientWidth-viewport.clientWidth*.52,top:y/780*world.clientHeight-viewport.clientHeight*.52,behavior});
 }
 for(const p of points){
  const [x,y]=xy(p),b=document.createElement('button');b.className='atlas-station'+(p.no?' main-station':'');b.id='map-'+(p.key||p.id);b.dataset.chapter=p.id;
  b.style.left=(x/1180*100)+'%';b.style.top=(y/780*100)+'%';b.style.setProperty('--label-x',p.dx+'px');b.style.setProperty('--label-y',p.dy+'px');
  b.setAttribute('aria-label','走进'+p.name+'，'+byId(p.id).name);
  const dot=document.createElement('span');dot.className='station-dot';dot.textContent=p.no||'';const label=document.createElement('strong');label.textContent=p.name;b.append(dot,label);
  b.addEventListener('pointerenter',()=>select(p.id));b.addEventListener('focus',()=>{select(p.id);follow(p.id);});
  b.onclick=()=>window.dispatchEvent(new CustomEvent('journey:chapter',{detail:p.id}));pins.append(b);
 }
 const route=points.slice(0,10).map(p=>xy(p).join(',')).join(' ');$('atlas-main-route').setAttribute('points',route);
 $('atlas-fit').onclick=()=>{zoom=1;position();viewport.scrollTo({top:0,left:0,behavior:'smooth'});};
 for(const [id,dir]of[['atlas-zoom-in',1],['atlas-zoom-out',-1]])$(id).onclick=()=>{zoom=Math.max(.8,Math.min(2.8,zoom*(dir===1?1.25:.8)));position();follow(chosen);};
 viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.pointerType!=='mouse')return;drag={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture(e.pointerId);});
 viewport.addEventListener('pointermove',e=>{if(!drag)return;viewport.scrollLeft=drag.left-(e.clientX-drag.x);viewport.scrollTop=drag.top-(e.clientY-drag.y);});
 viewport.addEventListener('pointerup',()=>drag=null);viewport.addEventListener('pointercancel',()=>drag=null);
 window.addEventListener('resize',()=>{const nextMobile=matchMedia('(max-width:600px)').matches;if(nextMobile!==mobile){mobile=nextMobile;zoom=mobile?1.8:1;position();follow(chosen,'instant');}else position();});
 window.AtlasMap={selected:()=>chosen,update(state){
  currentState=state;const ch=C.chapter(D,state),n=C.current(D,state),index=D.chapters.findIndex(c=>c.id===ch.id);
  for(const b of pins.querySelectorAll('button')){const c=byId(b.dataset.chapter),allowed=C.canOpenChapter(D,state,c.id);b.disabled=!allowed;b.dataset.status=state.path.includes(c.start)?'visited':allowed?'available':'locked';b.title=allowed?c.name+'：'+c.title:'先走过前一段故事';}
  $('atlas-progress').textContent=n.end?'这一程，已走到会师的日子':'脚步停在'+ch.location;
  const next=n.checkpoint?D.chapters[index+1]:ch;select(next?.id||ch.id);position();
  if(lastChapter!==ch.id){follow(next?.id||ch.id,'instant');lastChapter=ch.id;}
 }};
 position();
})();
