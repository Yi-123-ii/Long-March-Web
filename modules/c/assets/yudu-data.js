/* v0.20: full six-station story, eleven supplied movies, streamed text and no thought TTS. */
(function(root){
 const thought=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const nodes=[
  {id:'river',speaker:'河岸',text:'1934年10月，江西于都。暮色里，队伍正准备渡河。',scene:'gathering',view:'wide',next:'strap',mode:'observation'},
  thought('strap','肩带拧着，还是勒得慌。桥上的脚步没停，队伍快走远了。','gathering','newcomer',{view:'bridge',cue:'steps'}),
  thought('newcomer','前面那个人回头看了我一眼。他停下了，没有催。','portrait','reach'),
  {id:'reach',speaker:'陈禾',text:'别站在岸上了。来，跟上我们。',scene:'reach',next:'choice',mode:'dialogue',nativeAudio:true,duration:5.088005,captionStart:.18,captionEnd:4.65,title:'陈禾在河岸招呼你',replayLabel:'重看招呼',advanceOnEnd:true},
  {id:'choice',speaker:'心声',text:'他还伸着手。身后有人脚下一滑，我回头看了一眼。',scene:'hold',mode:'thought',cue:'stumble',choices:[
   {id:'hand',label:'握住他的手',next:'a-cross'},
   {id:'help',label:'先回身扶住身后的人',next:'b-bag'}]},
  thought('a-cross','我握住他的手，踩上木板。脚下轻轻晃了一下。','bridge-step','a-tight',{cue:'steps'}),
  thought('a-tight','肩带也理顺了，没刚才那么勒。我抬起头，队伍还在前面。','bridge-forward','a-fine'),
  thought('a-fine','先跟上。我抬起头，问起他的名字。','intro-first','meet'),
  thought('b-bag','后头那人的铺盖往下坠。我先托了一下。','bank-lookback','b-thanks',{cue:'stumble'}),
  thought('b-thanks','他站稳了，把包抱紧。我这才松手。','bank-lookback','b-this-way'),
  thought('b-this-way','前面的人还在等。我转过身，跟着队伍往桥上走。','hold','meet',{cue:'steps'}),
  thought('meet','跟上队伍后，我问起他的名字。','intro-first','introduce'),
  {id:'introduce',speaker:'陈禾',text:'我叫陈禾，禾苗的禾。你呢？',scene:'introduction',mode:'dialogue',nativeAudio:true,video:'assets/yudu/chenhe-introduction-v012.mp4',poster:'assets/yudu/chenhe-intro-first-v012.png',hold:'assets/yudu/chenhe-intro-hold-v012.png',duration:4.096009,title:'陈禾介绍名字',replayLabel:'重看相识',next:'name',advanceOnEnd:true},
  {id:'name',speaker:'心声',text:'陈禾，禾苗的禾。他问起我的名字。',scene:'intro-hold',mode:'thought',choices:[{id:'tell-name',label:'告诉他：大家叫我小满。',next:'joined'}]},
  thought('joined','名字说出口，好像也没那么生分了。前面的脚步还在继续。','intro-hold','liang-meet'),
  thought('liang-meet','我刚把包往上提，垂下来的带子又拖到了地上。旁边那位年长些的战士看见了。','liang-reminder-first','liang-reminder'),
  {id:'liang-reminder',speaker:'梁叔',text:'掖进去，别拖地上。磨断了怎么背？',scene:'liang-reminder-first',mode:'dialogue',nativeAudio:true,video:'assets/yudu/liang-reminder-v013.mp4',poster:'assets/yudu/liang-reminder-first-v013.png',hold:'assets/yudu/liang-reminder-hold-v013.png',duration:4.096009,title:'梁叔提醒收好行装',replayLabel:'重看梁叔',next:'strap-tucked',advanceOnEnd:true},
  thought('strap-tucked','我赶紧把那一截塞好。陈禾叫他梁叔，听着很熟。他看了一眼陈禾的行装，又看了看我的，像是总有操不完的心。','liang-reminder-hold','ask-home'),
  {id:'ask-home',speaker:'心声',text:'桥上的人还在往前走。趁着这一会儿，我问起他的家。',scene:'liang-home-first',mode:'thought',choices:[{id:'ask-liang-home',label:'问梁叔：您家也在于都？',next:'liang-home'}]},
  {id:'liang-home',speaker:'梁叔',text:'我家后头有棵枣树，这时候该打枣了。',scene:'liang-home-first',mode:'dialogue',nativeAudio:true,video:'assets/yudu/liang-home-v013.mp4',poster:'assets/yudu/liang-home-first-v013.png',hold:'assets/yudu/liang-home-hold-v013.png',duration:4.096009,title:'梁叔说起家里的枣树',replayLabel:'重看家乡',next:'home-after',advanceOnEnd:true},
  thought('home-after','听陈禾的意思，那棵枣树，梁叔已经跟人说过好几回了。小是小，甜。我也跟着笑了，刚才勒得慌的肩膀好像松了一点。','liang-home-hold','departure'),
  {id:'departure',speaker:'心声',text:'前头的脚步又动了。我低头看了看桥面，木船正停在尽头，得跟上他们。',scene:'boarding-first',mode:'thought',choices:[{id:'board',label:'背好行装，跟着队伍上船。',next:'boarding'}]},
  {id:'boarding',speaker:'启程',text:'',scene:'boarding-first',mode:'observation',nativeAudio:true,video:'assets/yudu/boarding-v013.mp4',poster:'assets/yudu/boarding-first-v013.png',hold:'assets/yudu/boarding-hold-v013.png',duration:4.096009,title:'沿木浮桥走上木船',replayLabel:'重看上船',next:'aboard',advanceOnEnd:true},
  thought('aboard','我踩进船里，跟着前面的人站稳。河水轻轻拍着船帮，岸上的灯还亮着。','boarding-hold','end'),
  {id:'end',scene:'boarding-hold',end:true}
 ];
 const data={version:1,storyRevision:9,title:'一只伸来的手',start:'river',nodes,
  memories:{hand:'河岸上，你先握住了陈禾的手。',help:'河岸上，你先回身扶了别人。'},
  imageAlt:{'bridge-step':'小满低头看向脚下的浮桥木板，前方战士正往船边走','bridge-forward':'向前延伸的木浮桥与停靠的木船','bank-lookback':'小满回身看向后方已站稳的战士，岸边仍有等候的队伍','liang-reminder-first':'梁叔面向小满提醒收好行装，身后队伍走过浮桥','liang-reminder-hold':'梁叔收回目光，身后仍是于都浮桥与木船','liang-home-first':'同一位梁叔站在浮桥边，准备回答关于家乡的问题','liang-home-hold':'梁叔说起家里的枣树后露出浅笑','boarding-first':'小满低头望向浮桥，前方是停靠的木船','boarding-hold':'小满已经站在木船里，旁边的战士与对岸队伍仍在画面中'},
  images:{'bridge-step':'assets/yudu/bridge-step-v013.png','bridge-forward':'assets/yudu/bridge-forward-v013.png','bank-lookback':'assets/yudu/bank-lookback-v013.png','liang-reminder-first':'assets/yudu/liang-reminder-first-v013.png','liang-reminder-hold':'assets/yudu/liang-reminder-hold-v013.png','liang-home-first':'assets/yudu/liang-home-first-v013.png','liang-home-hold':'assets/yudu/liang-home-hold-v013.png','boarding-first':'assets/yudu/boarding-first-v013.png','boarding-hold':'assets/yudu/boarding-hold-v013.png',gathering:'assets/yudu/yudu-gathering-v011.png','intro-first':'assets/yudu/chenhe-intro-first-v012.png','intro-hold':'assets/yudu/chenhe-intro-hold-v012.png',reachStill:'assets/yudu/chenhe-reach-still-v011.png',portrait:'assets/yudu/chenhe-first-v011.png',hold:'assets/yudu/chenhe-hold-v011.png'},
  video:'assets/yudu/chenhe-invitation-v011.mp4',
  historicalNote:'1934年10月，中央红军在于都集结，分批渡过于都河，开始长征。本作从其中一支队伍的虚构经历展开；不将于都表述为所有红军队伍唯一的长征出发地。',
  sources:[{title:'红军长征集结地为何选择于都 · 中国共产党新闻网',url:'https://cpc.people.com.cn/n1/2024/1011/c443712-40336727.html'}]
 };
 const extra=typeof module==='object'&&module.exports?require('./chapters-data.js'):root.MARCH_CHAPTERS;
 for(const n of nodes)n.chapter='yudu';
 const yuduEnd=nodes.find(n=>n.id==='end');delete yuduEnd.end;yuduEnd.checkpoint=true;yuduEnd.next='xj-arrive';
 nodes.push(...extra.nodes);Object.assign(data.images,extra.images);Object.assign(data.imageAlt,extra.alts);
 data.chapters=extra.chapters;
 data.ambiences={river:'assets/audio/yudu/river.ogg',cold:'assets/audio/chapters/cold-river.ogg',room:'assets/audio/chapters/room.ogg',gorge:'assets/audio/chapters/gorge.ogg'};
 data.historicalNote='故事目前从1934年10月于都出发，经过湘江、1935年1月遵义、赤水与金沙江，再到1935年5月泸定桥后续通行。人物与具体经历为虚构，不将这段叙事路线表述为所有红军队伍唯一的长征路线。主角不参与军事决策或夺桥战斗。';
 data.sources.push({title:'泸定桥的铁链与木板结构 · 泸定桥景区',url:'https://www.scldq.cn/about.html'},{title:'遵义会议 · 共产党员网',url:'https://www.12371.cn/2022/11/10/VIDE1668046562408781.shtml'},{title:'长征胜利90周年专题 · 中央党史和文献研究院',url:'https://www.dswxyjy.org.cn/GB/427277/462086/'});
 const late=typeof module==='object'&&module.exports?require('./late-chapters-data.js'):root.LATE_CHAPTERS;
 const bridgeEnd=nodes.find(n=>n.id==='t2-end');delete bridgeEnd.end;bridgeEnd.checkpoint=true;bridgeEnd.next='snow-arrive';
 Object.assign(data.chapters.find(c=>c.id==='luding'),{button:'翻开夹金山这一页',summary:'桥头让出通路，下一程是更高的山。'});
 nodes.push(...late.nodes);data.chapters.push(...late.chapters);Object.assign(data.images,late.images);Object.assign(data.imageAlt,late.alts);
 Object.assign(data.ambiences,{snow:'assets/audio/chapters/snow-wind-v015.ogg',grass:'assets/audio/chapters/grass-wind-v015.ogg'});
 data.historicalNote='故事从1934年10月于都出发，沿湘江、遵义与沿途江河，走过夹金山、草地，抵达1935年陕北吴起；1936年会宁与将台堡会师作为历史尾声。六站是虚构人物依托的叙事路径，不代表所有红军只有一条路线。人物与具体经历为虚构，主角不参与军事决策或夺桥战斗。';
 if(typeof module==='object'&&module.exports)module.exports=data;else root.YUDU_DATA=data;
})(typeof window==='undefined'?globalThis:window);
