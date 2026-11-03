const test=require('node:test'),assert=require('node:assert/strict'),V=require('../assets/video-corner.js');
test('corner repair uses the visible frame boundary and preserves pixels outside its interior',()=>{
 const w=9,h=9,p=new Uint8ClampedArray(w*h*4).fill(60);
 for(let i=3;i<p.length;i+=4)p[i]=255;
 p[(4*w+4)*4]=240;const copy=p.slice();V.repair(p,w,h);
 assert.equal(p[(4*w+4)*4],60);assert.deepEqual([...p.slice(0,w*4)],[...copy.slice(0,w*4)]);
 for(let i=3;i<p.length;i+=4)assert.equal(p[i],255);
});
test('the repair stays on its source corner for portrait and wide cover layouts',()=>{
 const r={x:11,y:11,width:114,height:60};
 assert.deepEqual(V.cover(1280,720,1280,720,r),{left:11,top:11,width:114,height:60});
 const portrait=V.cover(1280,720,360,720,r);assert.equal(portrait.left,-449);assert.equal(portrait.top,11);
 const wide=V.cover(1280,720,1920,720,r);assert.equal(wide.left,16.5);assert.equal(wide.top,-145.5);
 const bars=V.cover(1280,720,320,320,r,.5,.45,'contain');assert.deepEqual(bars,{left:2.75,top:65.75,width:28.5,height:15});
});
