(function(root){
 'use strict';
 const SAVE_KEY='longmarch-c:companion:v1';
 function create(data){return {version:1,storyRevision:data.storyRevision||1,node:data.start,path:[data.start],choices:{},completed:[],settings:{voice:.9,thought:.85,ambient:.45,auto:false}};}
 function current(data,state){return data.nodes.find(n=>n.id===state.node);}
 function target(data,state,node){return node.routes?.find(r=>state.choices[r.choice]===r.equals)?.next||node.next;}
 function chapter(data,state){const n=current(data,state);return data.chapters?.find(c=>c.id===(n?.chapter||'yudu'))||data.chapters?.[0];}
 function canOpenChapter(data,state,id){
  const index=data.chapters?.findIndex(c=>c.id===id)??-1;
  if(index<0)return false;
  return index===0||state.path.includes(data.chapters[index].start)||state.path.includes(data.chapters[index-1].end);
 }
 function advance(data,state,choiceId){
  const n=current(data,state);if(!n||n.end)return state;
  const choice=n.choices?.find(c=>c.id===choiceId);
  if(n.choices&&!choice)return state;
  const next=choice?choice.next:target(data,state,n);
  if(!data.nodes.some(x=>x.id===next))throw new Error('Unknown story node: '+next);
  const result={...state,node:next,path:[...state.path,next],choices:{...state.choices}};
  if(choice)result.choices[n.id]=choice.id;
  if(data.nodes.find(x=>x.id===next).end||data.nodes.find(x=>x.id===next).checkpoint){
   result.completed=[...new Set([...state.completed,result.choices.choice])].filter(x=>data.memories[x]);
  }
  return result;
 }
 function restart(data,state){return {...create(data),completed:[...state.completed],settings:{...state.settings}};}
 function restore(data,raw){
  const fresh=create(data);try{
   const saved=typeof raw==='string'?JSON.parse(raw):raw;
   if(!saved||saved.version!==1||!Array.isArray(saved.path)||saved.path.length>512)return fresh;
   // An edited scene cannot resume at a removed speech node. Keep prior memories and audio settings.
   if((saved.storyRevision||1)!==fresh.storyRevision&&!(saved.storyRevision>=7&&saved.storyRevision<fresh.storyRevision&&fresh.storyRevision<=9)){
    fresh.completed=[...new Set((Array.isArray(saved.completed)?saved.completed:[]).filter(x=>data.memories[x]))];
    for(const key of ['voice','thought','ambient'])if(Number.isFinite(saved.settings?.[key]))fresh.settings[key]=Math.max(0,Math.min(1,saved.settings[key]));
    fresh.settings.auto=saved.settings?.auto===true;
    return fresh;
   }
   let state=fresh;
   for(const id of saved.path.slice(1)){
    const n=current(data,state),choice=n.choices?.find(c=>c.next===id);
    if(n.choices&&!choice)return fresh;
    const candidate=advance(data,state,choice?.id);
    if(candidate.node!==id||candidate===state)return fresh;
    state=candidate;
   }
   if(saved.path[0]!==data.start||state.node!==saved.node)return fresh;
   state.completed=[...new Set([...(Array.isArray(saved.completed)?saved.completed:[]).filter(x=>data.memories[x]),...state.completed])];
   for(const key of ['voice','thought','ambient'])if(Number.isFinite(saved.settings?.[key]))state.settings[key]=Math.max(0,Math.min(1,saved.settings[key]));
   state.settings.auto=saved.settings?.auto===true;
   return state;
  }catch{return fresh;}
 }
 function beginChapter(data,state,id){
  if(!canOpenChapter(data,state,id))return state;
  const index=data.chapters.findIndex(c=>c.id===id),entry=data.chapters[index];
  if(index===0)return restart(data,state);
  let at=state.path.indexOf(entry.start);
  if(at>=0)return restore(data,{...state,path:state.path.slice(0,at+1),node:entry.start});
  at=state.path.indexOf(data.chapters[index-1].end);
  const prior=restore(data,{...state,path:state.path.slice(0,at+1),node:data.chapters[index-1].end});
  return advance(data,prior);
 }
 const api={SAVE_KEY,create,current,advance,restart,restore,target,chapter,canOpenChapter,beginChapter};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.YuduCore=api;
})(typeof window==='undefined'?globalThis:window);
