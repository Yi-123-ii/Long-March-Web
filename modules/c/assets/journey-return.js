(function(root){
 'use strict';
 const KEY='longmarch-c:return:v1';
 function outbound(href,view='story'){
  const url=new URL(href);url.searchParams.set('from','journey');url.searchParams.set('view',view==='map'?'map':'story');return url;
 }
 function destination(pageHref,scriptHref){
  const page=new URL(pageHref),script=new URL(scriptHref);
  if(page.origin!==script.origin||page.searchParams.get('from')!=='journey'||!['chronicle.html','post-office.html'].includes(page.pathname.split('/').at(-1)))return null;
  const url=new URL('../journey.html',script);url.searchParams.set('resume',page.searchParams.get('view')==='map'?'map':'story');return url;
 }
 function restore(data,core,current,raw){
  try{
   const snapshot=JSON.parse(raw);if(snapshot?.version!==1||!['map','story'].includes(snapshot.view)||!snapshot.state)return null;
   const state=core.restore(data,snapshot.state);
   if(state.node!==snapshot.state.node||state.path.length!==snapshot.state.path?.length)return null;
   return {state,view:snapshot.view};
  }catch{return null;}
 }
 const api={KEY,outbound,destination,restore};
 if(typeof module==='object'&&module.exports){module.exports=api;return;}
 root.JourneyReturn=api;
 const script=document.currentScript?.src;if(!script)return;
 const back=destination(location.href,script);if(!back)return;
 const view=back.searchParams.get('resume'),style=document.createElement('link');
 style.rel='stylesheet';style.href=new URL('journey-return.css',script).href;document.head.append(style);
 const dock=document.createElement('nav'),note=document.createElement('span'),link=document.createElement('a');
 dock.className='c-game-return';dock.setAttribute('aria-label','返回正在进行的游戏');note.textContent='读完、写完，还可以继续这一程。';
 link.href=back.href;link.textContent=view==='map'?'返回游戏地图':'返回游戏，继续这一站';dock.append(note,link);document.body.append(dock);document.body.classList.add('c-game-visitor');
 const articleBar=document.querySelector('#event-dialog .lm-article-bar');
 if(articleBar){const inner=link.cloneNode(true);inner.className='c-game-return-dialog';articleBar.insertBefore(inner,articleBar.querySelector('[data-close]'));}
 function carry(a){
  const url=new URL(a.href,location.href);if(url.origin!==back.origin)return;
  const base=new URL('../../../',script),path=url.pathname;
  let target;
  if(path===new URL('chronicle.html',base).pathname||path===new URL('post-office.html',base).pathname)target=outbound(url.href,view);
  else if(path===new URL('journey.html',base).pathname||path===back.pathname)target=back;
  if(target&&a.href!==target.href)a.href=target.href;
 }
 for(const a of document.querySelectorAll('a[href]'))carry(a);
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a)carry(a);},true);
 // Event details replace their mail link when readers open a different article.
 new MutationObserver(changes=>{for(const change of changes)if(change.target.matches('a[href]'))carry(change.target);}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['href']});
})(typeof window==='undefined'?globalThis:window);
