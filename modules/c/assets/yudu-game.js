(function(){
'use strict';
const D=window.YUDU_DATA,C=window.YuduCore,T=window.YuduText;
const $=id=>document.getElementById(id),resolve=p=>window.YuduPresentation.media(p,window.YUDU_EMBEDDED);
let state=C.create(D),active=false,paused=false,epoch=0,elapsed=0,lastTick=performance.now(),minimum=0,voiceDone=true,modalResume=false,storageNotice=false,noticeTimer,movieDone=true;
let textPlan=T.plan(''),lineDone=true,lineInstant=false,lineShown=-1;
let navigating=false;
let moviePrepared=false,introPending=false;
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
try{state=C.restore(D,localStorage.getItem(C.SAVE_KEY));}catch{storageNotice=true;}
const resumeView=new URL(location.href).searchParams.get('resume');
if(['map','story'].includes(resumeView)){
 try{
  const snapshot=window.JourneyReturn.restore(D,C,state,sessionStorage.getItem(window.JourneyReturn.KEY));
  if(snapshot?.view===resumeView)state=snapshot.state;
  sessionStorage.removeItem(window.JourneyReturn.KEY);
  sessionStorage.removeItem(window.JourneyReturn.VISIT_KEY);
 }catch{/* The existing local save remains the fallback when session storage is unavailable. */}
 const cleanURL=new URL(location.href);cleanURL.searchParams.delete('resume');history.replaceState(null,'',cleanURL);
}
let ambientKey='river';
const river=$('ambient-audio');river.src=resolve(D.ambiences.river);
river.loop=true;river.preload='none';
const playerVoice=$('player-voice');
playerVoice.preload='none';
// The hold image is the last decoded movie frame, ready before the cut.
const warmed=new Set();function warm(paths){for(const p of paths.filter(Boolean)){if(warmed.has(p))continue;warmed.add(p);const img=new Image();img.src=resolve(p);}}
const video=$('scene-video'),image=$('scene-image');
const videoCorner=window.VideoCorner.attach(video,$('video-corner'));
video.preload='none';
const cueTimers=new Set(),cuePlayers=new Set();
const dialogs=[$('sound-dialog'),$('history-dialog'),$('about-dialog')];
for(const img of document.querySelectorAll('img[src]'))img.src=resolve(img.getAttribute('src'));
function notice(text){$('notice').textContent=text;$('notice').hidden=false;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').hidden=true,6500);}
function save(){try{localStorage.setItem(C.SAVE_KEY,JSON.stringify(state));}catch{if(!storageNotice){notice('进度暂未保存，本次仍可继续阅读');storageNotice=true;}}}
function nativeMovie(){return active&&C.current(D,state).nativeAudio===true&&!video.hidden;}
function volumes(){river.volume=nativeMovie()&&!movieDone?0:state.settings.ambient*((C.current(D,state)?.voice&&!voiceDone) ? .32 : .7);video.volume=state.settings.voice;playerVoice.volume=state.settings.voice;video.muted=false;for(const a of cuePlayers)a.volume=state.settings.ambient*.55;$('voice-volume').value=state.settings.voice*100;$('ambient-volume').value=state.settings.ambient*100;$('voice-value').textContent=Math.round(state.settings.voice*100)+'%';$('ambient-value').textContent=Math.round(state.settings.ambient*100)+'%';$('auto').textContent='自动：'+(state.settings.auto?'开':'关');$('auto').setAttribute('aria-pressed',state.settings.auto);}
function cancelCues(){for(const t of cueTimers)clearTimeout(t);cueTimers.clear();for(const a of cuePlayers){a.pause();a.src='';}cuePlayers.clear();}
function cue(kind){
 cancelCues();if(!kind||paused)return;
 const moments=kind==='stumble'?[0,260,840]:[0,640,1280,1970];
 for(const ms of moments){const timer=setTimeout(()=>{cueTimers.delete(timer);if(!active||paused)return;const a=new Audio(resolve('assets/audio/yudu/wood-step.ogg'));cuePlayers.add(a);a.volume=state.settings.ambient*.55;a.playbackRate=kind==='stumble'?.84:1+(ms%3)*.025;a.onended=()=>cuePlayers.delete(a);a.onerror=()=>cuePlayers.delete(a);a.play().catch(()=>cuePlayers.delete(a));},ms);cueTimers.add(timer);}
}
function playRiver(){if(active&&!paused){const requestEpoch=epoch,source=river.src;river.play().catch(e=>{if(e.name==='AbortError'||!active||paused||requestEpoch!==epoch||source!==river.src)return;notice('环境声暂未播放，可到“声音”检查音量后重新进入');});}}
function mapStatus(options){
 const buttons=$('chapter-buttons');buttons.replaceChildren();
 for(const c of D.chapters){const allowed=C.canOpenChapter(D,state,c.id),button=document.createElement('button');
  button.textContent=c.name+' · '+c.title;button.disabled=!allowed;button.title=allowed?'走进这一段':'先完成前一段故事';button.dataset.chapter=c.id;button.onclick=()=>enterChapter(c.id);buttons.append(button);
  const pin=$('map-'+c.id);if(pin)pin.disabled=!allowed;
 }
 window.AtlasMap.update(state,options);
}
function enterChapter(id,replay=false){if(navigating||window.JourneyFX.busy||!C.canOpenChapter(D,state,id))return;return changeChapter(replay?C.beginChapter(D,state,id):C.openChapter(D,state,id));}
async function changeChapter(next){
 if(navigating||window.JourneyFX.busy)return;
 const from=C.chapter(D,state),to=C.chapter(D,next);
 if(from.id!==to.id){
  leave(false);navigating=true;
  try{await window.AtlasMap.travel(state,to.id);}finally{navigating=false;}
 }
 state=next;await enter();
}
function chapterView(n){
 const ch=C.chapter(D,state);
 $('chapter-label').textContent=ch.name+' · '+ch.title;
 $('scene-place').textContent=n.routePlace||ch.location;$('scene-date').textContent=n.routeDate||ch.date;
 $('historical-tab').textContent=n.historicalTab||'';$('historical-tab').hidden=!n.historicalTab;
 $('route-progress').hidden=ch.id!=='rivers';$('route-chishui').classList.toggle('passed',(n.routeStep||1)>=1);$('route-jinsha').classList.toggle('passed',(n.routeStep||1)>=2);
 if(ambientKey!==ch.ambient){ambientKey=ch.ambient;river.pause();river.src=resolve(D.ambiences[ambientKey]);river.load();playRiver();}
}
function memoryText(){
 const result=[D.memories[state.choices.choice]].filter(Boolean);
 if(state.path.includes('xj-end'))result.push(state.choices['xj-choice']==='stretcher'?'在湘江岸边，我记住了陆生的名字':'我带过江的家书里，仍留着梁叔没写完的半句话');
 if(state.path.includes('zy-end'))result.push('梁叔的三针旧线旁，接上了陈禾新补的针脚');
 if(state.path.includes('snow-end'))result.push(state.choices['snow-choice']==='call'?'雪山风里，我喊了一声阿禾，听见了他的回应':'到了雪山，这回换我停下来等他');
 if(state.path.includes('grass-end'))result.push(state.choices['grass-choice']==='stay'?'那一夜，我守在陆生身旁，陪他等到天亮':'那一夜，我们接回掉队的同志，也彼此扶持着回到营地');
 if(state.path.includes('wuqi-end'))result.push(state.choices['wuqi-choice']==='sew'?'袖口总算补好，歪斜的针脚也记下了同行的情谊':'我写下梁叔的名字，也记下与他同行时的见闻');
 return result.join('\n');
}

function goBack(){
 if(!active||paused||navigating||window.JourneyFX.busy||dialogs.some(d=>d.open))return;
 const next=C.back(D,state);if(next===state)return;
 state=next;render();volumes();($('previous').disabled?$('next'):$('previous')).focus({preventScroll:true});
}
function setPaused(value){
 if(!active)return;
 paused=value;$('pause').textContent=value?'继续':'暂停';$('pause').setAttribute('aria-pressed',value);
 $('pause-overlay').hidden=!value||dialogs.some(d=>d.open);
 $('story-screen').classList.toggle('is-paused',value);
 if(value&&!$('pause-overlay').hidden)$('resume').focus({preventScroll:true});
 else if(!value&&document.activeElement===$('resume'))$('pause').focus({preventScroll:true});
 if(value){river.pause();video.pause();playerVoice.pause();cancelCues();}
 else{lastTick=performance.now();playRiver();playMovie();playVoice();}
}
function playMovie(){
 if(!active||paused||!moviePrepared||movieDone||video.hidden||!C.current(D,state).nativeAudio)return;
 const token=epoch;video.play().catch(e=>{if(token===epoch&&!paused&&e.name!=='AbortError'){setPaused(true);notice('点击“继续这一程”播放，也可以跳过镜头');}});
}
function stopVoice(){voiceDone=true;playerVoice.onended=null;playerVoice.onerror=null;playerVoice.ontimeupdate=null;playerVoice.pause();playerVoice.removeAttribute('src');playerVoice.load();cancelCues();}
function playVoice(){
 if(!active||paused||voiceDone||!C.current(D,state).voice)return;
 const token=epoch;
 playerVoice.play().catch(e=>{
  if(token!==epoch||paused||e.name==='AbortError')return;
  if(e.name==='NotAllowedError'){setPaused(true);notice('点击“继续这一程”播放小满的回答');return;}
  playerVoice.onerror?.();
 });
}
function updateNext(){
 const n=C.current(D,state),playing=n.nativeAudio&&!movieDone;
 const label=playing?'跳过镜头':n.voice&&!voiceDone?'跳过语音':!lineDone?'显示全文':'继续';
 $('next').hidden=!!n.choices&&lineDone&&!playing;
 $('next').replaceChildren(document.createTextNode(label+' '));
 const arrow=document.createElement('span');arrow.textContent='›';$('next').append(arrow);
}
function revealText(){
 const n=C.current(D,state);if(n.end||n.checkpoint)return;
 if(n.textAfterMovie&&!movieDone){$('line').hidden=true;$('choices').hidden=true;lineDone=false;return;}
 const progress=n.nativeAudio?(n.captionCues?T.cueTime(textPlan,video.currentTime,n.captionCues):T.mediaTime(textPlan,video.currentTime,n.captionStart??.12,n.captionEnd??Math.max(.2,n.duration-.30))):n.voice?T.mediaTime(textPlan,playerVoice.currentTime,0,n.voiceDuration):elapsed;
 const f=n.nativeAudio&&n.captionPages?T.pageFrame(n.captionPages,video.currentTime,lineInstant||reduceMotion):T.frame(textPlan,progress,lineInstant||reduceMotion);
 const frameKey=f.key??f.shown;
 if(frameKey!==lineShown){$('line').textContent=f.text;lineShown=frameKey;}
 const changed=lineDone!==f.complete;lineDone=f.complete;
 $('line').classList.toggle('is-revealing',!lineDone);
 $('line').hidden=!textPlan.glyphs.length;
 $('choices').hidden=!n.choices||!lineDone||(n.nativeAudio&&!movieDone);$('document-text').hidden=!n.document||!lineDone;
 if(changed){updateNext();if(lineDone&&n.choices&&document.activeElement===$('next'))$('choices').querySelector('button')?.focus({preventScroll:true});}
}
function finishText(){
 if(!active||paused||dialogs.some(d=>d.open)||lineDone)return;
 lineInstant=true;revealText();updateNext();
}

async function presentStill(path,n,token,cut=false){
 // Keep the outgoing movie's last frame until the replacement is decoded.
 const source=resolve(path),nextImage=new Image();nextImage.src=source;
 await nextImage.decode().catch(()=>{});
 if(token!==epoch)return;
 const apply=()=>{
  if(token!==epoch)return;
  image.loading='eager';image.src=source;image.dataset.scene=n.scene;image.dataset.view=n.view||'wide';
  video.hidden=true;image.hidden=false;
  const film=window.YuduPresentation.upcomingFilm(D,C,state);
  if(film&&!n.nativeAudio&&!introPending)window.JourneyFilms.prepare(resolve(film.video||D.video));
 };
 if(cut){$('scene-cut-veil').animate([{opacity:0},{opacity:.72,offset:.33},{opacity:0}],{duration:380,easing:'ease-in-out'});setTimeout(apply,110);}
 else apply();
}

function visual(n){
 const token=epoch,useVideo=n.nativeAudio===true;
 moviePrepared=false;$('film-loading').hidden=true;
 videoCorner.setEnabled(false);
 movieDone=!useVideo;
 $('story-screen').classList.toggle('film-playing',useVideo);
 $('story-screen').classList.toggle('caption-pages',useVideo&&!!n.captionPages);
 $('story-screen').classList.toggle('river-scene',n.scene==='river');
 const portrait=D.images[n.scene]|| (n.scene==='hold'?(D.images.hold||D.images.portrait):n.scene==='reach-still'?D.images.reachStill:D.images.portrait);
 image.alt=D.imageAlt?.[n.scene]||(n.scene==='gathering'?'陈禾背对着你望向于都渡口，红军战士沿浮桥行进，河边停着木船':n.scene.startsWith('intro')?'陈禾在于都河岸与你相识，身后战士沿浮桥行进':n.scene==='reach-still'||n.scene==='hold'?'陈禾伸手接应你，身后有正沿浮桥行进的红军战士':'陈禾站在于都河岸，身后战士背着行装走向浮桥');
 const imagePath=n.scene==='river'?D.images.river:portrait,imageSource=resolve(imagePath);
 const changesImage=image.getAttribute('src')!==imageSource;
 const veil=$('scene-cut-veil');veil.getAnimations().forEach(a=>a.cancel());
 $('story-screen').dataset.mode=n.mode||'observation';
 const nextNode=D.nodes.find(x=>x.id===C.target(D,state,n));warm([n.poster,n.hold,D.images[n.scene],nextNode&&D.images[nextNode.scene],...(n.choices||[]).map(c=>D.images[D.nodes.find(x=>x.id===c.next)?.scene])]);

 video.pause();video.controls=false;video.onended=null;video.onerror=null;video.onloadedmetadata=null;video.onplaying=null;video.onseeked=null;video.ontimeupdate=null;
 updateNext();
 if(!useVideo){presentStill(imagePath,n,token,changesImage&&active&&!window.JourneyFX.busy&&!reduceMotion);volumes();return;}
 video.hidden=false;image.hidden=true;volumes();
 video.loop=false;video.muted=!n.nativeAudio;video.volume=state.settings.voice;
 const source=resolve(n.video||D.video);
 video.preload='auto';
 if(video.dataset.filmSource!==source||video.error){video.removeAttribute('src');video.load();}
 video.poster=resolve(n.poster||D.images.portrait);video.setAttribute('aria-label',n.title||'于都河岸电影镜头');
 const ready=()=>{
  if(token!==epoch)return;
  videoCorner.setEnabled(n.cornerRepair===true);
  const start=n.mediaStart||0;
  const play=()=>{if(token!==epoch)return;video.onseeked=null;playMovie();};
  if(Math.abs(video.currentTime-start)<.015&&!video.seeking)play();
  else{video.onseeked=play;video.currentTime=start;}
 };
 video.onended=()=>{
  if(token!==epoch||movieDone)return;
  video.pause();
  moviePrepared=false;movieDone=true;voiceDone=true;lineInstant=true;revealText();
  videoCorner.setEnabled(false);
  if(n.advanceOnEnd)$('story-screen').classList.remove('film-playing');$('voice-state').textContent='';
  updateNext();volumes();
  if(n.advanceOnEnd)go(undefined,true);else presentStill(n.hold||D.images.hold||D.images.portrait,n,token);
 };
 // One source film can stop at an interaction and resume from that same source later.
 video.ontimeupdate=()=>{if(token===epoch&&!movieDone&&n.mediaEnd&&video.currentTime>=n.mediaEnd)video.onended?.();};
 video.onerror=()=>{
  if(token!==epoch)return;
  moviePrepared=false;movieDone=true;video.hidden=true;image.hidden=false;$('story-screen').classList.remove('film-playing');
  $('film-loading').hidden=true;
  videoCorner.setEnabled(false);
  presentStill(n.poster||imagePath,n,token);
  voiceDone=true;lineInstant=true;revealText();updateNext();volumes();notice('镜头暂未载入，可先阅读文字或返回上一幕后重试');
 };
 video.onplaying=()=>{if(token===epoch){video.controls=false;$('voice-state').textContent='';}};
 video.onloadedmetadata=ready;
 $('film-loading').hidden=false;
 window.JourneyFilms.load(source,(loaded,total)=>{
  if(token!==epoch)return;
  $('film-loading').textContent='镜头准备中'+(total?' '+Math.min(100,Math.round(loaded/total*100))+'%':'');
 }).then(url=>{
  if(token!==epoch)return;
  $('film-loading').hidden=true;moviePrepared=true;video.dataset.filmSource=source;
  if(video.getAttribute('src')!==url)video.src=url;
  if(video.readyState>=1)ready();
 }).catch(()=>{if(token===epoch)video.onerror();});
}
function speak(n){
 voiceDone=!n.nativeAudio&&!n.voice;$('voice-state').textContent='';
 if(!n.voice)return;
 const token=epoch;playerVoice.src=resolve(n.voice);playerVoice.volume=state.settings.voice;
 playerVoice.onended=()=>{if(token!==epoch)return;voiceDone=true;lineInstant=true;revealText();updateNext();volumes();};
 playerVoice.onerror=()=>{if(token!==epoch||voiceDone)return;voiceDone=true;lineInstant=true;revealText();updateNext();volumes();notice('这句配音暂未载入，可继续阅读文字');};
 playerVoice.ontimeupdate=()=>{if(token===epoch)revealText();};
 volumes();updateNext();playVoice();
}
function render(){
 // Empty legacy anchors keep old bookmarks valid without adding blank story screens.
 for(let guard=0;guard<512;guard++){
  const n=C.current(D,state);if(n.text||n.choices||n.nativeAudio||n.end||n.checkpoint)break;
  const next=C.advance(D,state);if(next===state)break;state=next;
 }
 epoch++;elapsed=0;lastTick=performance.now();stopVoice();
 const n=C.current(D,state);
 // A reply keeps the question on screen; action-only choices keep the last visible context.
 const previous=!n.text&&n.choices?[...state.path].slice(0,-1).reverse().map(id=>D.nodes.find(x=>x.id===id)).find(x=>x?.text&&x.chapter===n.chapter&&!x.checkpoint&&!x.end):null;
 const display=previous||n,badge=window.YuduPresentation.speaker(display);
 chapterView(n);visual(n);$('ending').hidden=!(n.end||n.checkpoint);$('dialogue-panel').hidden=!!(n.end||n.checkpoint);
 $('previous').disabled=!C.canBack(D,state);$('ending-previous').disabled=!C.canBack(D,state);
 if(n.end||n.checkpoint){
  const ch=C.chapter(D,state),nextChapter=D.chapters[D.chapters.findIndex(c=>c.id===ch.id)+1];
  $('ending').dataset.chapter=ch.id;
  $('ending-place').textContent=ch.location;$('ending-title').textContent=ch.ending;$('ending-note').textContent=ch.summary;$('memory-text').textContent=memoryText();
  $('continue-route').hidden=!n.checkpoint||!nextChapter;
  $('continue-route').textContent=nextChapter?'进入下一站 · '+nextChapter.location:'这一程已走完';$('replay').textContent='重玩这一站';
  window.dispatchEvent(new CustomEvent('journey:chapter-ended',{detail:ch.id}));
  const cards=$('memory-cards');cards.replaceChildren();cards.hidden=!n.end;
  if(n.end){const entries=[D.memories[state.choices.choice],state.choices['xj-choice']==='stretcher'?'在湘江岸边，我记住了陆生的名字':'我带过江的家书里，仍留着梁叔没写完的半句话',state.choices['snow-choice']==='call'?'雪山风里，我喊了一声阿禾，听见了他的回应':'到了雪山，这回换我停下来等他',state.choices['grass-choice']==='stay'?'那一夜，我守在陆生身旁，陪他等到天亮':'那一夜，我们接回掉队的同志，也彼此扶持着回到营地',state.choices['wuqi-choice']==='sew'?'袖口总算补好，歪斜的针脚也记下了同行的情谊':'我写下梁叔的名字，也记下与他同行时的见闻'];for(const text of entries){const li=document.createElement('li');li.textContent=text;cards.append(li);}}
  save();return;
 }
 $('document-text').hidden=true;$('document-text').textContent=n.document||'';$('speaker').textContent=badge?.name||display.speaker;textPlan=T.plan(display.text);lineInstant=!!previous;lineDone=!textPlan.glyphs.length;lineShown=-1;$('line-accessible').textContent=display.text||'';$('voice-state').textContent='';
 const choices=$('choices');choices.replaceChildren();choices.hidden=!n.choices;$('next').hidden=!!n.choices;
 if(n.choices){for(const [index,choice] of n.choices.entries()){
  const b=document.createElement('button');b.className='choice-button';b.dataset.choice=choice.id;
  const mark=document.createElement('span');mark.textContent=n.choices.length===1?'':index?'乙':'甲';b.append(mark,document.createTextNode(window.YuduPresentation.choiceLabel(choice.label)));b.onclick=()=>go(choice.id);choices.append(b);
 }}
 minimum=Math.max(2300,(n.text?.length||0)*115,n.nativeAudio?(n.duration*1000+350):0);
 revealText();updateNext();speak(n);cue(n.cue);save();
}
function go(choiceId,force=false){
 if(!active||paused||navigating||window.JourneyFX.busy||dialogs.some(d=>d.open))return;
 if(!force&&!C.current(D,state).nativeAudio&&!lineDone&&!C.current(D,state).voice){finishText();return;}
 if(C.current(D,state).nativeAudio&&!movieDone&&C.current(D,state).choices){
  if(choiceId)return;video.onended?.();return;
 }
 const entry=C.current(D,state),index=D.chapters.findIndex(c=>c.id===entry.chapter),following=D.chapters[index+1];
 const next=entry.checkpoint&&following?C.openChapter(D,state,following.id):C.advance(D,state,choiceId);if(next===state)return;
 const previous=C.chapter(D,state).id;if(C.chapter(D,next).id!==previous){changeChapter(next);return;}state=next;render();
 if(C.current(D,state).end||C.current(D,state).checkpoint)$('back-map').focus();else if(C.current(D,state).choices&&lineDone)$('choices').querySelector('button').focus();else $('next').focus({preventScroll:true});
}
async function enter(restart=false,withAlbum=true){
 if(navigating||window.JourneyFX.busy)return;
 if(restart)state=C.restart(D,state);
 paused=true;river.pause();video.pause();cancelCues();
 const ch=C.chapter(D,state),n=C.current(D,state),picture=resolve(D.images[n.scene]||D.images[ch.image]);
 introPending=withAlbum&&ch.id==='yudu'&&n.id===ch.start;
 if(introPending)window.JourneyIntro.prepare();
 const reveal=()=>{
  active=true;paused=true;$('map-screen').hidden=true;$('story-screen').hidden=false;document.body.style.overflow='hidden';
  $('pause-overlay').hidden=true;$('pause').textContent='继续';$('pause').setAttribute('aria-pressed','true');volumes();render();
 };
 if(withAlbum)await window.JourneyFX.open(ch,picture,reveal);else reveal();
 if(introPending){try{await window.JourneyIntro.open(state.settings.voice);}finally{introPending=false;}}
 const film=window.YuduPresentation.upcomingFilm(D,C,state);
 if(!n.nativeAudio&&film)window.JourneyFilms.prepare(resolve(film.video||D.video));
 setPaused(document.hidden);$('leave').focus({preventScroll:true});
 if(storageNotice)notice('当前浏览器暂时无法保存进度，仍可继续体验这一程');
}

function leave(focus=true){
 active=false;paused=false;epoch++;stopVoice();river.pause();river.currentTime=0;video.pause();video.controls=false;video.onended=null;video.onerror=null;video.onloadedmetadata=null;video.onplaying=null;
 $('map-screen').hidden=false;$('story-screen').hidden=true;document.body.style.overflow='';save();mapStatus({keepCamera:!focus});
 // Hiding the map screen also hides the hero, so the browser clamps the document scroll to zero.
 // Restore the actual map before either the next route animation or manual return.
 $('journey-map').scrollIntoView({block:'start',behavior:'instant'});
 if(focus)$('enter').focus({preventScroll:true});
}
function openDialog(dialog){
 modalResume=active&&!paused;if(active)setPaused(true);dialog.showModal();$('pause-overlay').hidden=true;
}
for(const d of dialogs){
 d.querySelectorAll('.close-dialog').forEach(b=>b.onclick=()=>d.close());
 d.addEventListener('close',()=>{const resume=modalResume;modalResume=false;if(resume&&!document.hidden)setPaused(false);else if(active)$('pause-overlay').hidden=!paused;});
 d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
}
$('continue-route').onclick=()=>go(undefined,true);$('enter').onclick=()=>enterChapter(window.AtlasMap.selected());$('restart-map').onclick=()=>enterChapter(window.AtlasMap.selected(),true);$('leave').onclick=()=>leave();$('back-map').onclick=()=>leave();$('replay').onclick=()=>enterChapter(C.chapter(D,state).id,true);
$('line').onclick=finishText;$('next').onclick=()=>go();$('pause').onclick=()=>setPaused(!paused);$('resume').onclick=()=>setPaused(false);
$('previous').onclick=goBack;$('ending-previous').onclick=goBack;
$('auto').onclick=()=>{state.settings.auto=!state.settings.auto;volumes();save();};
$('sound-open').onclick=()=>openDialog($('sound-dialog'));$('sound-done').onclick=()=>$('sound-dialog').close();
$('history-open').onclick=()=>{
 const list=$('history-list');list.replaceChildren();
 for(const id of state.path){
  const n=D.nodes.find(x=>x.id===id);if(!n||n.end||(!n.text&&!n.choices&&!n.nativeAudio))continue;
  const li=document.createElement('li'),name=document.createElement('strong'),p=document.createElement('p');
  if(n.choices){const c=n.choices.find(c=>c.id===state.choices[n.id]);if(!c)continue;name.textContent='你选择了';p.textContent=window.YuduPresentation.choiceLabel(c.label);p.className='history-choice';}
  else{name.textContent=window.YuduPresentation.speaker(n)?.name||n.speaker;p.textContent=n.text||(n.nativeAudio?(n.title||'于都镜头')+'（影片原声）':'');}
  li.append(name,p);list.append(li);
 }
 openDialog($('history-dialog'));list.scrollTop=list.scrollHeight;
};
$('about-open').onclick=()=>openDialog($('about-dialog'));$('history-fact').textContent=D.historicalNote;
for(const source of D.sources){const a=document.createElement('a');a.textContent=source.title;a.href=source.url;a.target='_blank';a.rel='noopener';$('source-links').append(a);}
for(const [key,id]of [['voice','voice-volume'],['ambient','ambient-volume']])$(id).addEventListener('input',e=>{state.settings[key]=Number(e.target.value)/100;volumes();save();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active){modalResume=false;setPaused(true);}});
window.addEventListener('pagehide',()=>{if(active){river.pause();video.pause();playerVoice.pause();cancelCues();save();}});
window.addEventListener('journey:leaving-site',()=>{
 save();
 try{sessionStorage.setItem(window.JourneyReturn.KEY,JSON.stringify({version:1,view:active?'story':'map',state}));}catch{}
 if(active)setPaused(true);
});
window.addEventListener('journey:chapter',e=>enterChapter(e.detail));
document.addEventListener('keydown',e=>{
 if(window.AtlasMap.travelling){if(e.key==='Escape'){e.preventDefault();window.AtlasMap.skipTravel();}return;}
 if(window.JourneyFX.busy){if(e.key==='Escape'){e.preventDefault();window.JourneyFX.skip();}return;}
 if(!active||dialogs.some(d=>d.open))return;
 if(e.key==='Escape'){e.preventDefault();setPaused(!paused);return;}
 if(paused&&e.key==='Tab'){e.preventDefault();$('resume').focus({preventScroll:true});return;}
 if(['INPUT','BUTTON','A'].includes(e.target.tagName))return;
 if(e.code==='Space'){e.preventDefault();if(paused)setPaused(false);else go();}
 if(e.key==='Escape'){e.preventDefault();setPaused(!paused);}
});
setInterval(()=>{
 const now=performance.now(),delta=Math.min(250,now-lastTick);lastTick=now;
 if(!active||paused||dialogs.some(d=>d.open))return;
 elapsed+=delta;revealText();const n=C.current(D,state);
 if(state.settings.auto&&!n.choices&&!n.end&&!n.checkpoint&&voiceDone&&movieDone&&lineDone&&elapsed>=minimum)go();
},35);
volumes();mapStatus();
if(resumeView==='story')enter(false,false);
})();
