(function(root){
 'use strict';
 const points=[
  {id:'yudu',name:'于都',lon:115.414,lat:25.95,no:'一',dx:-20,dy:24},
  {id:'xiangjiang',name:'湘江',lon:111.07,lat:25.94,no:'二',dx:15,dy:22},
  {id:'zunyi',name:'遵义',lon:106.92,lat:27.70,no:'三',dx:18,dy:22},
  {id:'rivers',name:'赤水',lon:105.70,lat:28.59,dx:16,dy:-25},
  {id:'rivers',key:'jinsha',name:'金沙江',lon:102.35,lat:26.53,dx:16,dy:20},
  {id:'luding',name:'泸定桥',lon:102.23,lat:29.92,dx:-65,dy:8},
  {id:'snow',name:'夹金山',lon:102.72,lat:30.85,no:'四',dx:18,dy:8},
  {id:'grass',name:'草地',lon:102.75,lat:32.70,no:'五',dx:18,dy:8},
  {id:'north',name:'六盘山',lon:106.10,lat:35.65,dx:17,dy:17},
  {id:'wuqi',name:'吴起',lon:108.18,lat:36.92,no:'六',dx:18,dy:8},
  {id:'epilogue',name:'会宁',lon:105.05,lat:35.69,dx:-58,dy:-19},
  {id:'epilogue',key:'jiangtai',name:'将台堡',lon:105.69,lat:35.80,dx:-7,dy:-43}
 ];
 const xy=p=>[(p.lon-98)/20*1180,(39-p.lat)/16*780];
 function station(id,atEnd=false){const matches=points.filter(p=>p.id===id);return matches[atEnd?matches.length-1:0];}
 function between(from,to,atEnd=false){
  const start=points.indexOf(station(from,atEnd)),end=points.indexOf(station(to));
  if(start<0||end<0)return [];
  const route=points.slice(Math.min(start,end),Math.max(start,end)+1);
  return (start>end?route.reverse():route).map(xy);
 }
 function length(route){return route.slice(1).reduce((n,p,i)=>n+Math.hypot(p[0]-route[i][0],p[1]-route[i][1]),0);}
 function sample(route,progress){
  if(!route.length)return null;
  let remaining=length(route)*Math.max(0,Math.min(1,progress));
  for(let i=1;i<route.length;i++){
   const a=route[i-1],b=route[i],segment=Math.hypot(b[0]-a[0],b[1]-a[1]);
   if(remaining<=segment&&segment){const t=remaining/segment;return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];}
   remaining-=segment;
  }
  return [...route[route.length-1]];
 }
 const api={points,xy,station,between,length,sample};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.AtlasRoute=api;
})(typeof window==='undefined'?globalThis:window);
