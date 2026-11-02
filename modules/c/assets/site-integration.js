(function(root){
 'use strict';
 const events=Object.freeze({yudu:'yudu',xiangjiang:'xiangjiang',zunyi:'zunyi',rivers:'chishui',luding:'luding',snow:'jiajin',grass:'grassland',north:'wuqi',wuqi:'wuqi',epilogue:'huishi'});
 if(typeof module==='object'&&module.exports){module.exports=events;return;}
 const base=new URL('../../',document.baseURI),chronicle=new URL('chronicle.html',base);
 const R=root.JourneyReturn,history=R.outbound(chronicle.href,'map');let selected=root.AtlasMap.selected();
 function update(){
  for(const a of document.querySelectorAll('[data-c-history]'))a.href=history.href;
  const url=new URL(history);url.hash='event='+(events[selected]||'yudu');document.getElementById('chapter-facts').href=url.href;
 }
 function ending(id){
  const event=events[id]||'yudu',facts=new URL(chronicle),post=new URL('post-office.html',base);
  facts.hash='event='+event;post.searchParams.set('event',event);post.hash='letter-form';
  document.getElementById('ending-history').href=R.outbound(facts.href,'story').href;document.getElementById('ending-post').href=R.outbound(post.href,'story').href;
 }
 root.addEventListener('journey:station-selected',e=>{if(Object.hasOwn(events,e.detail)){selected=e.detail;update();}});
 root.addEventListener('journey:chapter-ended',e=>ending(e.detail));
 document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');if(!a)return;
  const url=new URL(a.href,document.baseURI);if(url.origin!==base.origin||![new URL('chronicle.html',base).pathname,new URL('post-office.html',base).pathname].includes(url.pathname))return;
  const view=document.getElementById('story-screen').hidden?'map':'story';a.href=R.outbound(url.href,view).href;
  root.dispatchEvent(new CustomEvent('journey:leaving-site'));
 },true);
 update();
 const initialEnding=document.getElementById('ending');
 if(initialEnding&&!initialEnding.hidden&&Object.hasOwn(events,initialEnding.dataset.chapter))ending(initialEnding.dataset.chapter);
})(typeof window==='undefined'?globalThis:window);
