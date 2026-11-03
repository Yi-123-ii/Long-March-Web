(function(root){
 'use strict';
 // Interpolate a small corner from its current frame's boundary, retaining original audio/video files.
 function repair(pixels,width,height){
  const at=(x,y,c)=>(y*width+x)*4+c;
  for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
   const u=x/(width-1),v=y/(height-1),feather=Math.min(1,Math.min(x,y,width-1-x,height-1-y)/3);
   for(let c=0;c<3;c++){
    const horizontal=pixels[at(0,y,c)]*(1-u)+pixels[at(width-1,y,c)]*u;
    const vertical=pixels[at(x,0,c)]*(1-v)+pixels[at(x,height-1,c)]*v;
    const i=at(x,y,c);pixels[i]=pixels[i]*(1-feather)+(horizontal+vertical)*.5*feather;
   }
  }
  return pixels;
 }
 function cover(sourceWidth,sourceHeight,width,height,region,px=.5,py=.45,fit='cover'){
  const scale=(fit==='contain'?Math.min:Math.max)(width/sourceWidth,height/sourceHeight);
  return {left:region.x*scale-(sourceWidth*scale-width)*px,top:region.y*scale-(sourceHeight*scale-height)*py,width:region.width*scale,height:region.height*scale};
 }
 function attach(video,canvas){
  const region={x:11,y:11,width:114,height:60};
  canvas.width=region.width;canvas.height=region.height;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  let enabled=false,pending=null,usingVideoFrames=typeof video.requestVideoFrameCallback==='function';
  function draw(){
   if(!enabled||video.hidden||video.readyState<2||!video.videoWidth){canvas.hidden=true;return;}
   const style=getComputedStyle(video),position=style.objectPosition.split(' ').map(v=>v.endsWith('%')?parseFloat(v)/100:.5);
   const bounds=video.getBoundingClientRect(),parent=canvas.offsetParent.getBoundingClientRect();
   const box=cover(video.videoWidth,video.videoHeight,bounds.width,bounds.height,region,position[0],position[1],style.objectFit);
   Object.assign(canvas.style,{left:bounds.left-parent.left+box.left+'px',top:bounds.top-parent.top+box.top+'px',width:box.width+'px',height:box.height+'px'});
   try{
    ctx.drawImage(video,region.x,region.y,region.width,region.height,0,0,region.width,region.height);
    const frame=ctx.getImageData(0,0,region.width,region.height);repair(frame.data,frame.width,frame.height);ctx.putImageData(frame,0,0);canvas.hidden=false;
   }catch{canvas.hidden=true;}
  }
  function tick(){pending=null;draw();schedule();}
  function schedule(){if(!enabled||pending!==null||video.paused||video.ended)return;pending=usingVideoFrames?video.requestVideoFrameCallback(tick):requestAnimationFrame(tick);}
  function refresh(){draw();schedule();}
  for(const event of ['loadeddata','seeked','timeupdate','play','pause'])video.addEventListener(event,refresh);
  for(const event of ['ended','error','emptied'])video.addEventListener(event,()=>{canvas.hidden=true;});
  const observer=new ResizeObserver(refresh);observer.observe(video);observer.observe(video.parentElement);window.addEventListener('resize',refresh);
  return {setEnabled(value){enabled=value;if(!value){if(pending!==null){if(usingVideoFrames)video.cancelVideoFrameCallback(pending);else cancelAnimationFrame(pending);}pending=null;canvas.hidden=true;}else refresh();}};
 }
 const api={repair,cover,attach};if(typeof module==='object'&&module.exports)module.exports=api;else root.VideoCorner=api;
})(typeof window==='undefined'?globalThis:window);
