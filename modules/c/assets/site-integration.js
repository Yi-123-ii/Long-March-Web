(function(root){
 'use strict';
 const events=Object.freeze({yudu:'yudu',xiangjiang:'xiangjiang',zunyi:'zunyi',rivers:'chishui',luding:'luding',snow:'jiajin',grass:'grassland',north:'wuqi',wuqi:'wuqi',epilogue:'huishi'});
 if(typeof module==='object'&&module.exports){module.exports=events;return;}
 const base=new URL('../../',document.baseURI),chronicle=new URL('chronicle.html',base);
 const history=chronicle;let selected=root.AtlasMap.selected();
 function update(){
  for(const a of document.querySelectorAll('[data-c-history]'))a.href=history.href;
  const url=new URL(history);url.hash='event='+(events[selected]||'yudu');document.getElementById('chapter-facts').href=url.href;
 }
 root.addEventListener('journey:station-selected',e=>{if(Object.hasOwn(events,e.detail)){selected=e.detail;update();}});
 update();
})(typeof window==='undefined'?globalThis:window);
