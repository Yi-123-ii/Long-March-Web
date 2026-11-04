const test=require('node:test'),assert=require('node:assert/strict'),{create}=require('../assets/journey-films.js');
function urls(){let id=0;return {created:[],revoked:[],createObjectURL(blob){this.created.push(blob);return 'blob:'+(++id);},revokeObjectURL(url){this.revoked.push(url);}};}
test('prefetch and playback share one complete download, with progress and no partial playback URL',async()=>{
 let finish,count=0;const U=urls(),progress=[];
 const stream=new ReadableStream({start(controller){controller.enqueue(new Uint8Array([1,2]));finish=()=>{controller.enqueue(new Uint8Array([3,4]));controller.close();};}});
 const cache=create(async()=>{count++;return new Response(stream,{headers:{'content-type':'video/mp4','content-length':'4'}});},U);
 cache.prepare('film.mp4');let ready=false;
 const result=cache.load('film.mp4',(loaded,total)=>progress.push([loaded,total])).then(url=>{ready=true;return url;});
 await new Promise(r=>setImmediate(r));assert.equal(ready,false);assert.equal(U.created.length,0);
 finish();assert.equal(await result,'blob:1');assert.equal(count,1);assert.equal(U.created[0].size,4);assert(progress.some(p=>p[0]===4&&p[1]===4));
 assert.equal(await cache.load('film.mp4'),'blob:1');assert.equal(count,1);
});
test('failed downloads can be retried and are never cached as playable data',async()=>{
 let count=0;const U=urls(),cache=create(async()=>++count===1?new Response('missing',{status:404}):new Response('movie'),U);
 await assert.rejects(cache.load('film.mp4'),/HTTP 404/);assert.equal(U.created.length,0);
 assert.equal(await cache.load('film.mp4'),'blob:1');assert.equal(count,2);
});
test('a bounded LRU cache releases old movie URLs while replay reuses recent clips',async()=>{
 const U=urls(),cache=create(async()=>new Response('movie'),U,3);
 for(const source of ['a','b','c'])await cache.load(source);
 assert.equal(await cache.load('a'),'blob:1');await cache.load('d');assert.deepEqual(U.revoked,['blob:2']);
 assert.equal(await cache.load('c'),'blob:3');assert.equal(U.created.length,4);
});
test('embedded film sources do not make HTTP requests',async()=>{
 const cache=create(async()=>{throw Error('unexpected HTTP');},urls());assert.equal(await cache.load('data:video/mp4;base64,eA=='),'data:video/mp4;base64,eA==');
});
test('skipping an unfinished film cancels its transfer before the next download',async()=>{
 let firstSignal;const cache=create((source,{signal})=>source==='old'?new Promise((resolve,reject)=>{firstSignal=signal;signal.addEventListener('abort',()=>reject(new Error('aborted')));}):Promise.resolve(new Response('new film')),urls());
 const skipped=cache.load('old');const rejection=assert.rejects(skipped,/aborted/);
 await cache.load('new');assert.equal(firstSignal.aborted,true);await rejection;
});
