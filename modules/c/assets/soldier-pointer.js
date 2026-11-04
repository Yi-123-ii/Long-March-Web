(function(){
 'use strict';
 const fine=matchMedia('(hover:hover) and (pointer:fine)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
 const cursor=document.createElement('div'),picture=document.createElement('img'),tip=document.createElement('i');
 cursor.className='soldier-pointer';cursor.hidden=true;cursor.setAttribute('aria-hidden','true');
 picture.alt='';picture.draggable=false;picture.src=window.YUDU_EMBEDDED?.['assets/soldier-pointer-v016.png']||'assets/soldier-pointer-fast.webp';
 cursor.append(tip,picture);document.body.append(cursor);
 let ready=false,idle;
 const hide=()=>{cursor.hidden=true;document.documentElement.classList.remove('soldier-pointer-on');};
 picture.onload=()=>{ready=true;};picture.onerror=()=>{ready=false;hide();};
 if(picture.complete&&picture.naturalWidth)ready=true;
 document.addEventListener('pointermove',e=>{
  if(!ready||!fine.matches||e.pointerType!=='mouse'){hide();return;}
  cursor.hidden=false;document.documentElement.classList.add('soldier-pointer-on');
  cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  cursor.classList.toggle('near-edge',e.clientX>innerWidth-65);
  cursor.classList.toggle('near-bottom',e.clientY>innerHeight-85);
  cursor.classList.toggle('is-disabled',!!e.target.closest('button:disabled,[inert]'));
  cursor.classList.toggle('is-moving',!reduce.matches);
  clearTimeout(idle);idle=setTimeout(()=>cursor.classList.remove('is-moving'),110);
 },{passive:true});
 document.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')hide();});
 document.documentElement.addEventListener('pointerleave',hide);
 document.addEventListener('keydown',e=>{if(e.key==='Tab')hide();});
 window.addEventListener('blur',hide);document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});
 fine.addEventListener('change',hide);
})();
