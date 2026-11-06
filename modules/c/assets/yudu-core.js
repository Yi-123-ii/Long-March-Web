(function(root){
 'use strict';
 const SAVE_KEY='longmarch-c:companion:v1';
 function create(data){return remember(data,{version:1,storyRevision:data.storyRevision||1,node:data.start,path:[data.start],choices:{},completed:[],chapterProgress:{},settings:{voice:.9,thought:.85,ambient:.45,auto:false}});}
 function current(data,state){return data.nodes.find(n=>n.id===state.node);}
 function target(data,state,node){return node.routes?.find(r=>state.choices[r.choice]===r.equals)?.next||node.next;}
 function chapter(data,state){const n=current(data,state);return data.chapters?.find(c=>c.id===(n?.chapter||'yudu'))||data.chapters?.[0];}
 function remember(data,state){
  const id=chapter(data,state)?.id;if(!id)return state;
  const progress={...state.chapterProgress,[id]:{node:state.node,path:[...state.path]}},n=current(data,state),next=data.chapters?.find(c=>c.start===target(data,state,n));
  if(n.checkpoint&&next&&!progress[next.id])progress[next.id]={node:next.start,path:[...state.path,next.start]};
  return {...state,chapterProgress:progress};
 }
 function savedAt(data,state,id){return state.chapterProgress?.[id];}
 function canOpenChapter(data,state,id){
  const index=data.chapters?.findIndex(c=>c.id===id)??-1;
  if(index<0)return false;
  return index===0||!!savedAt(data,state,id)||state.path.includes(data.chapters[index].start)||state.path.includes(data.chapters[index-1].end)||savedAt(data,state,data.chapters[index-1].id)?.node===data.chapters[index-1].end;
 }
 function advance(data,state,choiceId){
  const n=current(data,state);if(!n||n.end)return state;
  const choice=n.choices?.find(c=>c.id===choiceId);
  if(n.choices&&!choice)return state;
  return enterNode(data,state,choice?choice.next:target(data,state,n),choice);
 }
 function enterNode(data,state,next,choice){
  const destination=data.nodes.find(x=>x.id===next);
  if(!destination)throw new Error('Unknown story node: '+next);
  const result={...remember(data,state),node:next,path:[...state.path,next],choices:{...state.choices}};
  if(choice)result.choices[state.node]=choice.id;
  if(destination.end||destination.checkpoint){
   result.completed=[...new Set([...state.completed,result.choices.choice])].filter(x=>data.memories[x]);
  }
  return remember(data,result);
 }
 function restart(data,state){const kept=remember(data,state);return remember(data,{...create(data),chapterProgress:{...kept.chapterProgress},completed:[...state.completed],settings:{...state.settings}});}
 // Recover decisions from the validated old path, never from serialized choice fields.
 function legacyDecisions(schema,raw){
  if(!schema||!Array.isArray(raw.path)||raw.path.length>512||raw.path[0]!==schema.start||raw.path.at(-1)!==raw.node)return null;
  const nodes=new Map(schema.nodes.map(n=>[n.id,n])),choices={};let n=nodes.get(schema.start);
  for(const id of raw.path.slice(1)){
   if(!n||n.end)return null;
   const choice=n.choices?.find(c=>c.next===id||c.legacyNext===id);
   if(n.choices&&!choice)return null;
   const next=choice?.next||n.routes?.find(r=>choices[r.choice]===r.equals)?.next||n.next;
   if(next!==id&&choice?.legacyNext!==id&&n.legacyNext!==id)return null;
   if(choice)choices[n.id]=choice.id;
   n=nodes.get(id);
  }
  return n?choices:null;
 }
 function upgradeProgress(data,saved){
  const revision=saved.storyRevision||1;
  if(revision===data.storyRevision||revision<7||revision>12)return saved;
  const schema=revision>=10?data.legacyStories?.[revision]:data.legacyStory;
  function rewrite(mark){
   const decisions=legacyDecisions(schema,mark);if(!decisions)return null;
   let state=create(data),guard=0;
   while(state.node!==mark.node&&guard++<512){
    const n=current(data,state);
    if(n.end)return null;
    const pick=n.choices?.length===1?n.choices[0].id:decisions[n.id];
    if(n.choices&&!n.choices.some(c=>c.id===pick))return null;
    const next=advance(data,state,pick);
    if(next===state)return null;state=next;
   }
   return state.node===mark.node?{node:state.node,path:state.path}:null;
  }
  const migrated=rewrite(saved);
  // Some supported older saves already carry the new topology (e.g. a re-saved migration).
  // They still pass the normal path validator below; this does not trust their decisions.
  if(!migrated)return {...saved,storyRevision:data.storyRevision};
  const chapterProgress={};
  for(const [id,mark]of Object.entries(saved.chapterProgress||{})){
   const mapped=rewrite(mark);if(mapped)chapterProgress[id]=mapped;
  }
  return {...saved,...migrated,chapterProgress,storyRevision:data.storyRevision};
 }
 function restore(data,raw){
  const fresh=create(data);try{
   let saved=typeof raw==='string'?JSON.parse(raw):raw;
   if(!saved||saved.version!==1||!Array.isArray(saved.path)||saved.path.length>512)return fresh;
   saved=upgradeProgress(data,saved);
   // An edited scene cannot resume at a removed speech node. Keep prior memories and audio settings.
   if((saved.storyRevision||1)!==fresh.storyRevision){
    fresh.completed=[...new Set((Array.isArray(saved.completed)?saved.completed:[]).filter(x=>data.memories[x]))];
    for(const key of ['voice','thought','ambient'])if(Number.isFinite(saved.settings?.[key]))fresh.settings[key]=Math.max(0,Math.min(1,saved.settings[key]));
    fresh.settings.auto=saved.settings?.auto===true;
    return fresh;
   }
   let state=fresh;
   for(const id of saved.path.slice(1)){
    const n=current(data,state),choice=n.choices?.find(c=>c.next===id||c.legacyNext===id);
    if(n.choices&&!choice)return fresh;
    // Saved paths may include the former connection without the newly inserted action.
    const legacyNext=choice?.legacyNext||n.legacyNext;
    const candidate=legacyNext===id?enterNode(data,state,id,choice):advance(data,state,choice?.id);
    if(candidate.node!==id||candidate===state)return fresh;
    state=candidate;
   }
   if(saved.path[0]!==data.start||state.node!==saved.node)return fresh;
   state.completed=[...new Set([...(Array.isArray(saved.completed)?saved.completed:[]).filter(x=>data.memories[x]),...state.completed])];
   for(const key of ['voice','thought','ambient'])if(Number.isFinite(saved.settings?.[key]))state.settings[key]=Math.max(0,Math.min(1,saved.settings[key]));
   state.settings.auto=saved.settings?.auto===true;
   // Validate independent chapter bookmarks without trusting serialized choice fields.
   for(const entry of data.chapters||[]){
    const mark=saved.chapterProgress?.[entry.id];if(!mark||!Array.isArray(mark.path)||mark.path.length>512)continue;
    const rebuilt=restore(data,{version:1,storyRevision:fresh.storyRevision,node:mark.node,path:mark.path});
    if(rebuilt.node===mark.node&&rebuilt.path.length===mark.path.length&&chapter(data,rebuilt)?.id===entry.id)state.chapterProgress[entry.id]={node:rebuilt.node,path:[...rebuilt.path]};
   }
   // Older rewound saves kept the first chapter's completed choice, but lost its path.
   const first=data.chapters?.[0];
   if(first&&state.completed.length&&!canOpenChapter(data,state,data.chapters[1]?.id)){
    let prior=create(data),guard=0;const memory=state.completed[state.completed.length-1];
    while(prior.node!==first.end&&guard++<512){const n=current(data,prior),choice=n.choices?.find(c=>c.id===memory)|| (n.choices?.length===1?n.choices[0]:null);if(n.choices&&!choice)break;const next=advance(data,prior,choice?.id);if(next===prior)break;prior=next;}
    if(prior.node===first.end)state.chapterProgress={...prior.chapterProgress,...state.chapterProgress,[first.id]:{node:prior.node,path:[...prior.path]}};
   }
   return state;
  }catch{return fresh;}
 }
 function beginChapter(data,state,id){
  if(!canOpenChapter(data,state,id))return state;
  const index=data.chapters.findIndex(c=>c.id===id),entry=data.chapters[index];
  if(index===0)return restart(data,state);
  const kept=remember(data,state),mark=savedAt(data,kept,id),priorMark=savedAt(data,kept,data.chapters[index-1].id);
  const path=state.path.includes(entry.start)?state.path:mark?.path||priorMark?.path||state.path;
  let at=path.indexOf(entry.start);
  if(at>=0)return remember(data,restore(data,{...kept,path:path.slice(0,at+1),node:entry.start,chapterProgress:{...kept.chapterProgress,[id]:{node:entry.start,path:path.slice(0,at+1)}}}));
  at=path.indexOf(data.chapters[index-1].end);
  if(at<0)return state;
  const prior=restore(data,{...kept,path:path.slice(0,at+1),node:data.chapters[index-1].end});
  return advance(data,prior);
 }
 function openChapter(data,state,id){
  if(!canOpenChapter(data,state,id))return state;
  const kept=remember(data,state),mark=savedAt(data,kept,id);
  return mark?restore(data,{...kept,node:mark.node,path:mark.path}):beginChapter(data,kept,id);
 }
 function previousIndex(data,state){
  const id=chapter(data,state)?.id;
  for(let i=state.path.length-2;i>=0;i--){
   const n=data.nodes.find(n=>n.id===state.path[i]);
   if(!n||n.chapter!==id)break;
   if(n.text||n.choices||n.nativeAudio)return i;
  }
  return -1;
 }
 function canBack(data,state){return previousIndex(data,state)>=0;}
 function back(data,state){
  const index=previousIndex(data,state);if(index<0)return state;
  const kept=remember(data,state),path=state.path.slice(0,index+1);
  // Rebuild choices from the actual truncated route, retaining independent station bookmarks.
  return restore(data,{...kept,node:path.at(-1),path,settings:{...state.settings,auto:false}});
 }
 const api={SAVE_KEY,create,current,advance,restart,restore,target,chapter,canOpenChapter,beginChapter,openChapter,canBack,back};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.YuduCore=api;
})(typeof window==='undefined'?globalThis:window);
