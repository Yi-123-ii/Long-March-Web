(function(){
 'use strict';
 if(new URL(location.href).searchParams.get('resume')!=='story')return;
 const root=document.documentElement,style=document.createElement('style');
 // Run in the head, before the default map can be painted or receive focus.
 style.textContent='html.journey-restoring{min-height:100%;background:#0b1c20}html.journey-restoring body{visibility:hidden}';
 document.head.append(style);root.classList.add('journey-restoring');
 function finish(){clearTimeout(timer);root.classList.remove('journey-restoring');style.remove();}
 const timer=setTimeout(finish,20000);
 window.JourneyResume={finish};
})();
