(function(root){
 'use strict';
 const width=1180,height=620;
 // Story-map coordinates follow the approved landscape plate, not a geographic projection.
 // Each cubic is also sampled for the travelling flag, so flag and painted route agree.
 const points=[
  {id:'yudu',name:'于都',x:913,y:476,no:'01',date:'1934.10',dx:20,dy:-43,curve:[825,510,835,404]},
  {id:'xiangjiang',name:'湘江',x:603,y:435,no:'02',date:'1934.11',dx:16,dy:-40,curve:[443,435,595,338]},
  {id:'zunyi',name:'遵义',x:502,y:308,no:'03',date:'1935.01',dx:18,dy:-43,curve:[437,294,405,381]},
  {id:'rivers',name:'赤水',x:337,y:318,dx:16,dy:-13,curve:[307,304,333,286]},
  {id:'rivers',key:'jinsha',name:'金沙江',x:325,y:268,dx:16,dy:-15,curve:[309,242,288,243]},
  {id:'luding',name:'泸定桥',x:277,y:221,dx:17,dy:-15,curve:[251,180,264,164]},
  {id:'snow',name:'夹金山',x:306,y:162,no:'04',date:'1935.06',dx:17,dy:-43,curve:[391,226,452,164]},
  {id:'grass',name:'草地',x:555,y:147,no:'05',date:'1935.08',dx:17,dy:-42,curve:[610,140,638,118]},
  {id:'north',name:'六盘山',x:694,y:136,dx:-18,dy:18,curve:[734,130,772,122]},
  {id:'wuqi',name:'吴起',x:812,y:119,no:'06',date:'1935.10',dx:16,dy:-43,curve:[889,102,940,98]},
  {id:'epilogue',name:'会宁',x:1008,y:80,dx:-9,dy:-29,curve:[1040,101,1070,81]},
  {id:'epilogue',key:'jiangtai',name:'将台堡',x:1095,y:80,dx:-15,dy:-29}
 ];
 const xy=p=>[p.x,p.y];
 function segment(a,b){
  const [cx,cy,dx,dy]=a.curve||[a.x,a.y,b.x,b.y],out=[];
  for(let i=0;i<=32;i++){const t=i/32,u=1-t;out.push([u*u*u*a.x+3*u*u*t*cx+3*u*t*t*dx+t*t*t*b.x,u*u*u*a.y+3*u*u*t*cy+3*u*t*t*dy+t*t*t*b.y]);}
  return out;
 }
 function path(start=0,end=points.length-1){
  let d='M'+xy(points[start]).join(' ');
  for(let i=start;i<end;i++)d+=' C'+[...points[i].curve,...xy(points[i+1])].join(' ');
  return d;
 }
 function station(id,atEnd=false){const matches=points.filter(p=>p.id===id);return matches[atEnd?matches.length-1:0];}
 function between(from,to,atEnd=false){
  const start=points.indexOf(station(from,atEnd)),end=points.indexOf(station(to));
  if(start<0||end<0)return [];
  if(start===end)return [xy(points[start])];
  const route=[];
  for(let i=Math.min(start,end);i<Math.max(start,end);i++)route.push(...segment(points[i],points[i+1]).slice(route.length?1:0));
  return start>end?route.reverse():route;
 }
 function length(route){return route.slice(1).reduce((n,p,i)=>n+Math.hypot(p[0]-route[i][0],p[1]-route[i][1]),0);}
 function sample(route,progress){
  if(!route.length)return null;
  if(progress<=0)return [...route[0]];
  if(progress>=1)return [...route[route.length-1]];
  let remaining=length(route)*Math.max(0,Math.min(1,progress));
  for(let i=1;i<route.length;i++){
   const a=route[i-1],b=route[i],segment=Math.hypot(b[0]-a[0],b[1]-a[1]);
   if(remaining<=segment&&segment){const t=remaining/segment;return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];}
   remaining-=segment;
  }
  return [...route[route.length-1]];
 }
 const api={points,xy,station,between,length,sample,path,width,height};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.AtlasRoute=api;
})(typeof window==='undefined'?globalThis:window);
