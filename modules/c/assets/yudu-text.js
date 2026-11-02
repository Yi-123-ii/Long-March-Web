(function(root){
 'use strict';
 // Grapheme boundaries preserve punctuation, combining marks and emoji during reveal.
 function plan(text){
  const value=String(text||'');
  const glyphs=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter('zh',{granularity:'grapheme'}).segment(value)].map(s=>s.segment):Array.from(value);
  let duration=0;
  const ends=glyphs.map(g=>{duration+=/[。！？!?\n]/u.test(g)?230:/[，、；：,;:]/u.test(g)?130:/[…—]/u.test(g)?110:42;return duration;});
  return {glyphs,ends,duration};
 }
 function frame(line,ms,instant=false){
  let low=0,high=line.ends.length;
  if(instant)low=high;
  else while(low<high){const mid=(low+high)>>>1;if(line.ends[mid]<=Math.max(0,ms))low=mid+1;else high=mid;}
  return {text:line.glyphs.slice(0,low).join(''),complete:low===line.glyphs.length,shown:low};
 }
 function mediaTime(line,currentTime,start,end){
  if(end<=start)return currentTime>=end?line.duration:0;
  return Math.max(0,Math.min(1,(currentTime-start)/(end-start)))*line.duration;
 }
 // Keep the revealed words during spoken pauses instead of showing the next phrase early.
 function cueTime(line,currentTime,cues){
  let count=0,previous=0;
  for(const cue of cues){
   count+=plan(cue.text).glyphs.length;
   const end=line.ends[count-1]??line.duration;
   if(currentTime<cue.start)return previous;
   if(currentTime<cue.end)return previous+(end-previous)*Math.max(0,(currentTime-cue.start)/(cue.end-cue.start));
   previous=end;
  }
  return previous;
 }
 const api={plan,frame,mediaTime,cueTime};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.YuduText=api;
})(typeof window==='undefined'?globalThis:window);
