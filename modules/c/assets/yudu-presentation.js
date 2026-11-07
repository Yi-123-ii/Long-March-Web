(function(root){
 'use strict';
 function speaker(node){
  if(node.end||node.checkpoint)return null;
  if(node.narration?.src){const name=node.narration.speaker||'小满';return {name,kind:name==='小满'?'心声':''};}
  if(node.mode==='thought')return {name:'小满',kind:'心声'};
  if(node.mode==='dialogue'&&node.speaker)return {name:node.speaker,kind:''};
  return null;
 }
 function media(path,embedded,delivery=root.JourneyMedia){return embedded?.[path]||delivery?.[path]||(/\.(mp4|png)$/.test(path)?path+'?v=023':path);}
 function choiceLabel(label){return label.replace(/。\s*$/u,'').replace(/。/gu,'，');}
 // Buffer one imminent film on the current route, never unchosen branches or later chapters.
 function upcomingFilm(data,core,state){
  let node=core.current(data,state);
  const chapter=node?.chapter,seen=new Set();
  for(let i=0;node&&i<4;i++){
   if(node.checkpoint||node.end||node.choices?.length>1||seen.has(node.id))return null;
   seen.add(node.id);
   const next=node.choices?.[0]?.next||core.target(data,state,node);
   node=data.nodes.find(n=>n.id===next);
   if(!node||node.chapter!==chapter)return null;
   if(node.nativeAudio)return node;
  }
  return null;
 }
 const api={speaker,media,upcomingFilm,choiceLabel};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.YuduPresentation=api;
})(typeof window==='undefined'?globalThis:window);
