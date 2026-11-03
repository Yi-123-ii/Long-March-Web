(function(root){
 'use strict';
 const t=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const f=(id,text,scene,next)=>({id,speaker:'行军纪事',text,scene,next,mode:'fact'});
 const nodes=[
  f('snow-arrive','1935年6月，夹金山。上山以前，我们又把行装检查了一遍。','mountain-pack','snow-pack'),
  t('snow-pack','陈禾的铺盖总有一头多出一截。我替他压住，他低头弄绳子，还念叨起他娘。说他娘总嫌他捆不齐，隔着院子喊：阿禾，你又给捆歪了。','mountain-pack','snow-nickname'),
  {id:'snow-nickname',speaker:'心声',mode:'thought',scene:'mountain-pack',text:'我试着叫了一声阿禾。他顺口应了，忙着让我别松手，绳子还没系好。原来家里人这么叫他。',choices:[{id:'climb',label:'背好铺盖，跟随队伍上山。',next:'snow-path'}]},
  t('snow-path','往上走，说话越来越费劲。陈禾停在路边，我跟着停下。他先看的是我肩膀。','snow-path','snow-concern-before'),
  t('snow-concern-before','他像平常那样，想替我看一看肩带。','snow-concern-first','snow-concern'),
  {id:'snow-concern',speaker:'陈禾',text:'你这……带子又……',scene:'snow-concern-first',mode:'dialogue',nativeAudio:true,video:'assets/chapters/snow-concern-v015.mp4',poster:'assets/chapters/snow-concern-first-v015.png',hold:'assets/chapters/snow-concern-hold-v015.png',duration:5.088005,title:'雪山上，陈禾还想照应你',replayLabel:'重看雪山',next:'snow-choice',advanceOnEnd:true},
  {id:'snow-choice',speaker:'心声',mode:'thought',scene:'snow-concern-hold',text:'我的肩带没歪。先别管我了，你脸都白了。',choices:[{id:'support',label:'提起于都，让他搭住我。',next:'snow-a-route'},{id:'call',label:'叫他“阿禾”，等他应声。',next:'snow-b-call'}]},
  t('snow-a-route','我让他把手给我。','snow-concern-hold','snow-a-hand',{routes:[{choice:'choice',equals:'help',next:'snow-a-help'}]}),
  t('snow-a-hand','在于都拉我那会儿，他可没这么客气。他看着我，像还想说句什么，最后只是提醒我拉稳点。','snow-concern-hold','snow-a-steady'),
  t('snow-a-help','我让他搭过来，自己站得住。他还记得于都那回，说我也是先去扶别人。都什么时候了，还顾着说这个。','snow-concern-hold','snow-a-steady'),
  t('snow-a-steady','他搭住我。我等他站稳，才跟着队伍慢慢往前。','snow-path','snow-shelter-before'),
  t('snow-b-call','我叫他阿禾。他点头，我没松口：应我一声，别光点头。他终于应了一声，还嫌我嗓门大。','snow-concern-hold','snow-b-answer'),
  t('snow-b-answer','风这么大，我怕他听不见。我没有催，就等他缓过这口气，再叫一声。这次，他答得清楚了些。','snow-path','snow-shelter-before'),
  t('snow-shelter-before','跟着队伍到了背风处。刚才他腿一下没劲，自己也吓着了。我问现在好点没有。','snow-shelter-first','snow-shelter'),
  {id:'snow-shelter',speaker:'陈禾',text:'嗯。你也歇会儿，别光站我跟前。',scene:'snow-shelter-first',mode:'dialogue',nativeAudio:true,video:'assets/chapters/snow-shelter-v015.mp4',poster:'assets/chapters/snow-shelter-first-v015.png',hold:'assets/chapters/snow-shelter-hold-v015.png',duration:4.096009,title:'背风处缓过一口气',replayLabel:'重看歇息',next:'snow-rest',advanceOnEnd:true},
  {id:'snow-rest',speaker:'心声',mode:'thought',scene:'snow-shelter-hold',text:'我在旁边也歇了一会儿。这回，他没再装作一点事也没有。',choices:[{id:'keep-climbing',label:'歇过这口气，随队继续。',next:'snow-end'}]},
  {id:'snow-end',scene:'snow-path',checkpoint:true,next:'grass-arrive'},
  f('grass-arrive','1935年8月，松潘草地一带。饥饿、湿冷与疾病困扰着队伍。','grass-camp','grass-meal'),
  t('grass-meal','这点热的，得慢慢喝。陈禾还提醒我碗沿烫。他的脚已经疼了一路，坐下以后，半天没换姿势。','grass-meal','grass-choice'),
  {id:'grass-choice',speaker:'心声',mode:'thought',scene:'grass-camp',text:'陆生也在，卫生员正照看他。集合点有人来找帮手，接回掉队的同志；营地也需要人留下协助照看。两边都已有人员安排。',choices:[{id:'stay',label:'留在营地，协助卫生员照看陆生。',next:'grass-a-route'},{id:'rescue',label:'随接应人员，去接回掉队的同志。',next:'grass-b-path'}]},
  t('grass-a-route','我在陆生身旁坐下，把水放在他看得见的地方。','lusheng-grass','grass-a-old',{routes:[{choice:'xj-choice',equals:'luggage',next:'grass-a-new'}]}),
  t('grass-a-old','陆生认出我，费劲地笑了笑。又是我，他大概也没想到。我让他想喝就叫我。','lusheng-grass','grass-a-night'),
  t('grass-a-new','我告诉他我叫小满，问他叫什么。陆生。他说完又问一遍，我叫小什么。我说没听清就算了，醒了再告诉他。他却自己低低重复了一遍：小满。','lusheng-grass','grass-a-night'),
  t('grass-a-night','他不是一下就好了。一会儿能听清，一会儿又迷糊，我就留在卫生员旁边，做些能做的。','lusheng-grass','grass-a-water'),
  {id:'grass-a-water',cornerRepair:true,speaker:'陆生',text:'放下吧，我想喝了叫你。',scene:'lusheng-night-first',next:'grass-a-return',mode:'dialogue',nativeAudio:true,video:'assets/chapters/lusheng-night-v020.mp4',poster:'assets/chapters/lusheng-night-first-v020.png',hold:'assets/chapters/lusheng-night-hold-v020.png',duration:6.08,captionCues:[{text:'放下吧，',start:1.68,end:2.50},{text:'我想喝了',start:3.47,end:4.45},{text:'叫你。',start:5.14,end:5.90}],title:'草地夜里，陆生醒来让小满放下水碗',replayLabel:'重看陆生',advanceOnEnd:true},
  t('grass-a-return','我把碗放下，陪他等到天快亮。外头响起陈禾的声音，他跟接应的人回来了。我没看见外头那段路，只知道他们总算回来了。','lusheng-night-hold','grass-dawn-route'),
  t('grass-b-path','我跟陈禾一起去，前头有人带路。听见应声，才知道草里还有人。他已经说不出整句话，先得让他缓一缓。','grass-path','grass-b-foot'),
  t('grass-b-foot','铺盖由另一位同志接了过去。再往回走，陈禾那只脚明显使不上劲。我让他搭过来，他倒先提醒我脚底滑。这回我知道他没说着玩。','chenhe-grass','grass-b-names'),
  t('grass-b-names','被接住的那位问我们叫什么，说等出去，要带我们去他家那条街。街名还没说完，他自己先接不上了。陈禾让他别急，回去慢慢说。','grass-path','grass-b-return'),
  t('grass-b-return','营地有人应声，我们就朝着那声音往回。陆生由卫生员照看着，已经安定些了。','grass-camp','grass-b-old',{routes:[{choice:'xj-choice',equals:'luggage',next:'grass-b-new'}]}),
  t('grass-b-old','陆生抬眼叫了我的名字。听见他说回来了，我才觉得这一趟真的走完。','lusheng-grass','grass-dawn-route'),
  t('grass-b-new','回营歇下来，我才跟旁边那人互通名字。他叫陆生。我说我叫小满。他说记住了。','lusheng-grass','grass-dawn-route'),
  t('grass-dawn-route','天亮得很慢。我们在营地边上坐着，碗已经摆在身旁。','grass-meal','grass-dawn-yudu',{routes:[{choice:'snow-choice',equals:'call',next:'grass-dawn-call'}]}),
  t('grass-dawn-yudu','陈禾说起了于都那一天。','chenhe-grass','grass-dawn-hand',{routes:[{choice:'choice',equals:'help',next:'grass-dawn-help'}]}),
  t('grass-dawn-hand','他问我是不是怕水，上了木板都不肯撒手。那木板直晃，我说。他笑我，再拽紧点，就把他也拽下去了。我想还嘴，想想那天，确实没怎么敢松。','chenhe-grass','grass-dawn-end'),
  t('grass-dawn-help','他笑我自己都没站稳，还忙着接别人的包。总不能看着人家摔水里，我说。他没接着笑。等我再看，脚边那截绳子已经替我收好了。','chenhe-grass','grass-dawn-end'),
  {id:'grass-dawn-call',cornerRepair:true,speaker:'陈禾',text:'你在山上喊那几声，跟我娘似的。以前她隔着田埂喊，我早听见了。就是没玩够，不想回去。',scene:'chenhe-dawn-first',next:'grass-dawn-home',mode:'dialogue',nativeAudio:true,video:'assets/chapters/chenhe-dawn-v020.mp4',poster:'assets/chapters/chenhe-dawn-first-v020.png',hold:'assets/chapters/chenhe-dawn-hold-v020.png',duration:9.088005,captionPages:[{text:'你在山上喊那几声，跟我娘似的。',start:.23,end:2.43},{text:'以前她隔着田埂喊，我早听见了。',start:3.68,end:5.66},{text:'就是没玩够，不想回去。',start:7.28,end:8.62}],title:'天亮后的营地，陈禾说起小时候',replayLabel:'重看田埂的回忆',advanceOnEnd:true},
  t('grass-dawn-home','他说着，自己先笑了下。我也跟着笑了，像是看见田埂那头一个不肯回家的小孩。','chenhe-dawn-hold','grass-dawn-end'),
  {id:'grass-dawn-end',speaker:'心声',mode:'thought',scene:'grass-meal',text:'热的早凉了，碗里也没剩多少。腿还是发沉。但能坐在这儿，说几句没什么要紧的话，也挺好。',choices:[{id:'leave-grass',label:'收起碗，和大家一起走。',next:'grass-end'}]},
  {id:'grass-end',scene:'grass-camp',checkpoint:true,next:'north-arrive'},
  f('north-arrive','1935年9月至10月，队伍继续北上，突破腊子口，经过哈达铺，翻越六盘山，向陕北进发。','north-trail','north-lusheng'),
  t('north-lusheng','草地过去了，路还没走完。陆生能跟着慢慢走了，重的东西还不能老让他背，大家轮换着接。他也不闲着，总找点自己能做的。','north-trail','north-answer'),
  {id:'north-answer',speaker:'心声',mode:'thought',scene:'north-trail',text:'有时陈禾回过头，只叫我一声。我应了，他就接着往前。没别的事，知道还在就行。',choices:[{id:'answer',label:'应声，继续前行。',next:'north-end'}]},
  {id:'north-end',scene:'north-trail',checkpoint:true,next:'wuqi-arrive'},
  f('wuqi-arrive','1935年10月19日，陕北吴起镇。中央红军抵达这里。这一段同行，终于暂时落下了脚。','wuqi-arrival','wuqi-rest'),
  t('wuqi-rest','前头说，在这儿歇。陈禾看了一会儿，才点头。我让他坐，他说两条腿真不想再动了。坐下才发现，我也一样。','chenhe-rest','wuqi-water',{routes:[{choice:'grass-choice',equals:'rescue',next:'wuqi-cloth'}]}),
  t('wuqi-water','陆生先叫了我，小满。这儿还有水，他让我慢慢喝。他记得。','lusheng-wuqi','wuqi-snow-route'),
  t('wuqi-cloth','那位被我们接回来的同志也到了。他送来一块旧衣裁下的布，说还结实，补衣能用。陈禾连着说用得上。那块布就留在我们身旁。','spare-cloth','wuqi-lusheng-old',{routes:[{choice:'xj-choice',equals:'luggage',next:'wuqi-lusheng-new'}]}),
  t('wuqi-lusheng-old','陆生也认出了我，叫一声小满，在近旁坐下。','lusheng-wuqi','wuqi-snow-route'),
  t('wuqi-lusheng-new','陆生在草地那夜才记住我，这会儿也朝我们点头。他还得歇着。','lusheng-wuqi','wuqi-snow-route'),
  t('wuqi-snow-route','陈禾终于肯把一直绷着的肩膀松下来。','chenhe-rest','wuqi-snow-support',{routes:[{choice:'snow-choice',equals:'call',next:'wuqi-snow-call'}]}),
  t('wuqi-snow-support','背带勒了一路，陈禾想抬胳膊又嫌费劲。这回不用他说，我帮他解开，动作都在膝头下面。他终于松了口气。','chenhe-rest','wuqi-choice'),
  t('wuqi-snow-call','他闭着眼，我叫阿禾。他顺口应了一声，眼都没睁。我走近，他才让我在这边坐。','chenhe-rest','wuqi-choice'),
  {id:'wuqi-choice',speaker:'心声',mode:'thought',scene:'chenhe-rest',text:'针线包就收在身边。歇下来，才有工夫把一路的事想一想。',choices:[{id:'sew',label:'坐下来，替陈禾补好袖口。',next:'wuqi-sew'},{id:'write',label:'把一路的人和事写下来。',next:'wuqi-write'}]},
  t('wuqi-sew','他问我会不会，别把袖口缝死了。我让他老实坐着。他上回替我缝的，也没多好看。他还不服气，说到底没掉。','chenhe-rest','wuqi-sew-result'),
  t('wuqi-sew-result','我现在也会一点了。针脚还是歪，好在口子合上了。梁叔要是在，准得说线头留长了。','new-cuff','wuqi-sew-old'),
  t('wuqi-sew-old','我的袖口上，梁叔的三针旧线还在，陈禾接上的线也没拆。','sleeve-mended','wuqi-sew-lusheng',{routes:[{choice:'xj-choice',equals:'luggage',next:'wuqi-sew-letter'}]}),
  t('wuqi-sew-lusheng','陆生也挨着坐下，不知看我们补衣，还是听我们拌嘴。','lusheng-wuqi','wuqi-sew-confirm'),
  t('wuqi-sew-letter','那半封信还在，一字没添。我把它另放好。','old-letter-room','wuqi-sew-confirm',{document:'娘，等有了落脚的地方……'}),
  {id:'wuqi-sew-confirm',speaker:'心声',mode:'thought',scene:'new-cuff',text:'我把针线收好。陈禾安静地坐在旁边。',choices:[{id:'remember-stitches',label:'收好针线，记住同行的人。',next:'wuqi-later-route'}]},
  t('wuqi-write','我借了一张纸，想把名字记下来。梁守成。我问陈禾，是这三个字吧。他点头。我又添上大家叫惯的两个字，梁叔。','memory-page','wuqi-write-home'),
  t('wuqi-write-home','江边抬担架的事，得写。那位转运同志告诉我们的，我把这句也记清楚。陈禾还让我把他家那棵枣树写上。我问，这也写？他觉得该写。梁叔自己爱说。','chenhe-rest','wuqi-write-lusheng',{routes:[{choice:'xj-choice',equals:'luggage',next:'wuqi-write-letter'}]}),
  t('wuqi-write-lusheng','陆生凑在一边，嫌我写得快，他还没看完。我就写慢一点。','lusheng-wuqi','wuqi-writing'),
  t('wuqi-write-letter','旧家书另用干布包着。我拿的是新纸，记的是我认识的梁叔。江边那段是转运同志告诉我们的，我也记上这是谁说的。至于旧信，就留着梁叔写下的半句话。','old-letter-room','wuqi-writing'),
  {id:'wuqi-writing',speaker:'心声',mode:'thought',scene:'memory-page',text:'我慢慢写，停一下，再往下记。',document:'梁守成。大家叫他梁叔。\n他会补衣，怕针线沾水。\n家里有棵枣树。\n临走前，替我缝了三针。',choices:[{id:'write-names',label:'写下这些名字。',next:'wuqi-later-route'}]},
  t('wuqi-later-route','附近又有一位年轻战士停下，行装有些歪，大家身旁还留着位置。','newcomer-later','wuqi-later-help',{routes:[{choice:'snow-choice',equals:'call',next:'wuqi-later-name'}]}),
  t('wuqi-later-help','我看见他带子翻了，起身帮他理了一下。以前总是别人叫我别急，站稳。这回，我也能等一等人了。','newcomer-later','wuqi-close'),
  t('wuqi-later-name','他还在回头找人，我先问他叫什么。他说完，我重复一遍，给他留了个位置。名字得听清。我知道这一声有人应着，是什么感觉。','newcomer-later','wuqi-close'),
  {id:'wuqi-close',speaker:'心声',mode:'thought',scene:'chenhe-rest',text:'那时候，还不知道这一路后来会被怎样讲起。我记得一只伸来的手，三针没拆的线，还有几个人的名字。',choices:[{id:'other-armies',label:'回到地图，看看其他队伍。',next:'wuqi-end'}]},
  {id:'wuqi-end',scene:'wuqi-arrival',checkpoint:true,next:'epilogue-arrive'},
  f('epilogue-arrive','这一段同行，到陕北暂时落下了脚。还有别的队伍，仍在路上。时间从1935年继续走向1936年。','atlas-1936','epilogue-huining'),
  f('epilogue-huining','1936年10月9日，红一、红四方面军在甘肃会宁会师。','atlas-1936','epilogue-jiangtai'),
  f('epilogue-jiangtai','1936年10月22日，红一、红二方面军在将台堡会师。红军三大主力胜利会师，长征胜利结束。','atlas-1936','epilogue-remember'),
  {id:'epilogue-remember',speaker:'纪念',mode:'fact',scene:'atlas-1936',text:'我们记住抵达的日子，也记住没有走到这一天的人。\n1936—2026，纪念红军长征胜利90周年。',choices:[{id:'look-back',label:'回望这一程。',next:'journey-end'}]},
  {id:'journey-end',scene:'atlas-1936',end:true}
 ];
 for(const [first,last,id]of[['snow-arrive','snow-end','snow'],['grass-arrive','grass-end','grass'],['north-arrive','north-end','north'],['wuqi-arrive','wuqi-end','wuqi'],['epilogue-arrive','journey-end','epilogue']]){let on=false;for(const n of nodes){if(n.id===first)on=true;if(on)n.chapter=id;if(n.id===last)on=false;}}
 const names=['spare-cloth','mountain-pack','snow-path','grass-camp','grass-meal','lusheng-grass','chenhe-grass','grass-path','north-trail','wuqi-arrival','chenhe-rest','lusheng-wuqi','memory-page','new-cuff','old-letter-room','newcomer-later'];
 const images=Object.fromEntries(names.map(n=>[n,'assets/chapters/'+n+'-v015.webp']));
 Object.assign(images,{'lusheng-river':'assets/chapters/lusheng-river-v015.webp','lusheng-lamp':'assets/chapters/lusheng-lamp-v015.webp','atlas-1936':'assets/atlas-1936.svg'});
 for(const name of ['snow-concern','snow-shelter'])for(const phase of ['first','hold'])images[name+'-'+phase]='assets/chapters/'+name+'-'+phase+'-v015.png';
 const chapters=[
  {id:'snow',name:'第四站 · 夹金山',title:'这次换你等他',location:'夹金山',date:'1935年6月',start:'snow-arrive',end:'snow-end',ambient:'snow',image:'mountain-pack',ending:'风里有人应声，\n我们再走一段。',summary:'陈禾也有走不动的时候。这一次，你留在他身旁。',button:'继续走进草地'},
  {id:'grass',name:'第五站 · 草地',title:'一口热的，几个名字',location:'松潘草地一带',date:'1935年8月',start:'grass-arrive',end:'grass-end',ambient:'grass',image:'grass-camp',ending:'天亮了，\n我们还在一起。',summary:'留下照看，或随队接应，都是那一夜真实发生的照应。',button:'随队继续北上'},
  {id:'north',name:'北上过场',title:'草地之后，还有山口',location:'腊子口—哈达铺—六盘山',date:'1935年9—10月',start:'north-arrive',end:'north-end',ambient:'grass',image:'north-trail',ending:'应一声，\n再往前走。',summary:'知道彼此还在，就接着走。',button:'前往吴起'},
  {id:'wuqi',name:'第六站 · 吴起',title:'把同行的人记住',location:'陕北吴起',date:'1935年10月19日',start:'wuqi-arrive',end:'wuqi-end',ambient:'room',image:'wuqi-arrival',ending:'有些人到了，\n有些人要被记住。',summary:'补好袖口，或写下见闻，都是同样完整的收束。',button:'翻开1936年的一页'},
  {id:'epilogue',name:'历史尾声 · 会师',title:'这条路上的更多人',location:'会宁 · 将台堡',date:'1936年10月',start:'epilogue-arrive',end:'journey-end',ambient:'room',image:'atlas-1936',ending:'我记得，\n我们同行过。',summary:'陈禾、梁守成、陆生、小满及具体经历为虚构。故事献给长征路上的人们。'}
 ];
 const alts=Object.fromEntries(names.map(n=>[n,{'mountain-pack':'陈禾在夹金山山脚整理行装','snow-path':'积雪山路上相隔行进的队伍','grass-camp':'湿冷草地上的临时营地','grass-meal':'旧碗、少量稀粥和收好的针线包','lusheng-grass':'陆生在草地营地歇息','chenhe-grass':'陈禾坐在草地营地，疲惫中仍看着同伴','grass-path':'接应队伍经过的草地来路','north-trail':'草地以后继续北上的山路','wuqi-arrival':'抵达陕北吴起的队伍与土路','chenhe-rest':'同一位陈禾在吴起停留处坐下休息','lusheng-wuqi':'同一位陆生在吴起留着水等同伴','memory-page':'新纸、短铅笔和收好的针线包','new-cuff':'陈禾补好的袖口上留下浅色新针脚','old-letter-room':'在屋内另用干布包着的梁叔旧家书','newcomer-later':'后来抵达的年轻战士与留下的空位'}[n]]));
 Object.assign(alts,{'spare-cloth':'同伴送来的可用于补衣的旧棉布与针线包','lusheng-river':'陆生靠稳在湘江边的担架上','lusheng-lamp':'陆生坐在遵义的灯旁','atlas-1936':'从陕北暂歇到会宁、将台堡会师的历史示意图'});
 for(const phase of ['first','hold']){alts['snow-concern-'+phase]='陈禾站在夹金山雪路边，想继续照应小满';alts['snow-shelter-'+phase]='陈禾在背风处靠稳，缓过一口气';}
 for(const name of ['lusheng-night','chenhe-dawn'])for(const phase of ['first','hold']){
  images[name+'-'+phase]='assets/chapters/'+name+'-'+phase+'-v020.png';
  alts[name+'-'+phase]=name==='lusheng-night'?'陆生在草地夜间营地靠着铺盖歇息，小满的水碗在近处':'陈禾坐在天亮后的草地营地，身后还有歇息的战士';
 }
 const data={nodes,images,alts,chapters};if(typeof module==='object'&&module.exports)module.exports=data;else root.LATE_CHAPTERS=data;
})(typeof window==='undefined'?globalThis:window);
