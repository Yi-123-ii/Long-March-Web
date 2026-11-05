(function(root){
 'use strict';
 // Short films are fetched completely before playback, so slow HTTP delivery cannot interrupt speech.
 function create(fetcher=root.fetch.bind(root),urls=root.URL,limit=3){
  const cache=new Map();
  function load(source,progress){
   if(/^(data|blob):/.test(source))return Promise.resolve(source);
   let entry=cache.get(source);
   if(entry){cache.delete(source);cache.set(source,entry);}
   else{
    // There is one active film player; obsolete unfinished clips must not compete with its next clip.
    for(const [key,old]of cache)if(!old.url){cache.delete(key);old.controller.abort();}
    entry={listeners:new Set(),loaded:0,total:0,url:null,controller:new AbortController()};cache.set(source,entry);
    entry.promise=(async()=>{
     const response=await fetcher(source,{cache:'force-cache',signal:entry.controller.signal});
     if(!response.ok)throw Error('Film HTTP '+response.status);
     entry.total=Number(response.headers.get('content-length'))||0;
     const chunks=[];
     if(response.body?.getReader){
      const reader=response.body.getReader();
      while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);entry.loaded+=value.byteLength;for(const listener of entry.listeners)listener(entry.loaded,entry.total);}
     }else{const bytes=await response.arrayBuffer();chunks.push(bytes);entry.loaded=bytes.byteLength;}
     const blob=new Blob(chunks,{type:response.headers.get('content-type')||'video/mp4'});
     if(!blob.size)throw Error('Empty film');
     entry.url=urls.createObjectURL(blob);return entry.url;
    })().catch(error=>{if(cache.get(source)===entry)cache.delete(source);throw error;}).finally(()=>entry.listeners.clear());
   }
   if(progress){if(!entry.url)entry.listeners.add(progress);progress(entry.loaded,entry.total);}
   while(cache.size>limit){const [key,old]=cache.entries().next().value;cache.delete(key);old.controller.abort();if(old.url)urls.revokeObjectURL(old.url);}
   return entry.promise;
  }
  return {load,prepare(source){load(source).catch(()=>{});}};
 }
 const api={create};if(typeof module==='object'&&module.exports)module.exports=api;else root.JourneyFilms=create();
})(typeof window==='undefined'?globalThis:window);
