(function(root){
 'use strict';
 function speaker(node){
  if(node.end||node.checkpoint)return null;
  if(node.mode==='thought')return {name:'小满',kind:'心声'};
  if(node.mode==='dialogue'&&['陈禾','梁叔','陆生','小满'].includes(node.speaker))return {name:node.speaker,kind:''};
  return null;
 }
 function media(path,embedded){return embedded?.[path]||(/\.(mp4|png)$/.test(path)?path+'?v=017':path);}
 const api={speaker,media};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.YuduPresentation=api;
})(typeof window==='undefined'?globalThis:window);
