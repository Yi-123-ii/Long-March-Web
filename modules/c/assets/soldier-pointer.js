(function(){
 'use strict';
 const fine=matchMedia('(hover:hover) and (pointer:fine)'),root=document.documentElement;
 const picture=new Image();
 let ready=false;
 const update=()=>root.classList.toggle('soldier-pointer-on',ready&&fine.matches);
 // Native image cursors also render in the dialog top layer.
 // The hotspot is the attached flag tip, with no trailing sprite or separate dot.
 picture.onload=()=>{
  ready=true;root.style.setProperty('--soldier-cursor','url("'+picture.src+'") 3 3');update();
 };
 picture.onerror=()=>{ready=false;update();root.style.removeProperty('--soldier-cursor');};
 fine.addEventListener('change',update);
 picture.src=window.YUDU_EMBEDDED?.['assets/soldier-pointer-flag-v031.png']||new URL('assets/soldier-pointer-flag-v031.png',document.baseURI).href;
})();
