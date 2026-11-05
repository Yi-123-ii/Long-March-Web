(function(root){
 'use strict';
 const t=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const f=(id,text,scene,next)=>({id,speaker:'行军纪事',text,scene,next,mode:'fact'});
 const nodes=[
  f('snow-arrive','1935年6月，队伍来到夹金山脚下，上山以前，我们又仔细检查了一遍行装','mountain-pack','snow-pack'),
  t('snow-pack','陈禾的铺盖总有一头多出一截，我替他压着绳子，听他念叨娘隔着院子的叮嘱：阿禾，你又给捆歪了','mountain-pack','snow-nickname'),
  {id:'snow-nickname',speaker:'心声',mode:'thought',scene:'mountain-pack',text:'我试着喊了一声阿禾，他应得自然，接着便让我压紧还没系好的绳子，原来家里人一直这样叫他',choices:[{id:'climb',label:'背好铺盖，跟随队伍上山',next:'snow-path'}]},
  t('snow-path','越往山上走，说话越费劲，陈禾一停下，我也随他站到路边，却发现他先看的是我的肩膀','snow-path','snow-concern-before'),
  t('snow-concern-before','他仍像平常那样，想伸手替我检查肩带','snow-concern-first','snow-concern'),
  {id:'snow-concern',speaker:'陈禾',text:'你这……带子又……',scene:'snow-concern-first',mode:'dialogue',nativeAudio:true,video:'assets/chapters/snow-concern-v015.mp4',poster:'assets/chapters/snow-concern-first-v015.png',hold:'assets/chapters/snow-concern-hold-v015.png',duration:5.088005,title:'雪山上，陈禾还想照应你',replayLabel:'重看雪山',next:'snow-choice',advanceOnEnd:true},
  {id:'snow-choice',speaker:'心声',mode:'thought',scene:'snow-concern-hold',text:'我的肩带明明没歪，他的脸色却白得让人担心，这时候该先顾着他了',choices:[{id:'support',label:'提起于都，让他搭住我',next:'snow-a-route'},{id:'call',label:'叫他“阿禾”，等他应声',next:'snow-b-call'}]},
  t('snow-a-route','我把手伸过去，让他搭住我','snow-concern-hold','snow-a-hand',{routes:[{choice:'choice',equals:'help',next:'snow-a-help'}]}),
  t('snow-a-hand','于都河边拉我上桥时，他可没这么客气，如今看着我像是有话要说，最后却只提醒了一声拉稳些','snow-concern-hold','snow-a-steady'),
  t('snow-a-help','我站稳后让他搭过来，他还记得我在于都先去扶别人的事，到了这时候仍放不下旁人的安稳','snow-concern-hold','snow-a-steady'),
  t('snow-a-steady','等他搭住我、站稳脚步，我们才随着队伍慢慢往前走','snow-path','snow-shelter-before'),
  t('snow-b-call','我喊他阿禾，见他只点头，便坚持要听一句应声；他终于答了，还嫌我的嗓门太大','snow-concern-hold','snow-b-answer'),
  t('snow-b-answer','风声太大，我怕他听不见，等他缓过这口气才又叫了一声，这一次听见的回答清楚了些','snow-path','snow-shelter-before'),
  t('snow-shelter-before','到了背风处，我问起他现在好些没有，刚才那一下腿软，连他自己也吓了一跳','snow-shelter-first','snow-shelter'),
  {id:'snow-shelter',speaker:'陈禾',text:'嗯，你也歇会儿，别光站我跟前',scene:'snow-shelter-first',mode:'dialogue',nativeAudio:true,video:'assets/chapters/snow-shelter-v015.mp4',poster:'assets/chapters/snow-shelter-first-v015.png',hold:'assets/chapters/snow-shelter-hold-v015.png',duration:4.096009,title:'背风处缓过一口气',replayLabel:'重看歇息',next:'snow-rest',advanceOnEnd:true},
  {id:'snow-rest',speaker:'心声',mode:'thought',scene:'snow-shelter-hold',text:'我在他身旁也歇了一会儿，看着他终于肯承认自己需要休息',choices:[{id:'keep-climbing',label:'歇过这口气，随队继续',next:'snow-end'}]},
  {id:'snow-end',scene:'snow-path',checkpoint:true,next:'grass-arrive'},
  f('grass-arrive','1935年8月，队伍行至松潘草地一带，饥饿与湿冷中还要应对疾病带来的困难','grass-camp','grass-meal'),
  t('grass-meal','陈禾提醒我碗沿烫、要慢慢喝，自己却一直没换过坐姿，那只脚已经疼了一路','grass-meal','grass-choice'),
  {id:'grass-choice',speaker:'心声',mode:'thought',scene:'grass-camp',text:'卫生员正照料陆生，集合点又有人来找接应掉队同志的帮手；营地与接应队都已安排人员，我可以选择一边协助',choices:[{id:'stay',label:'留在营地，协助卫生员照看陆生',next:'grass-a-route'},{id:'rescue',label:'随接应人员，去接回掉队的同志',next:'grass-b-path'}]},
  t('grass-a-route','我坐到陆生身旁，把水放在他抬眼就能看见的地方','lusheng-grass','grass-a-old',{routes:[{choice:'xj-choice',equals:'luggage',next:'grass-a-new'}]}),
  t('grass-a-old','陆生认出我，费劲地笑了一下，大概没想到又是我在这里，我便让他想喝水时叫我','lusheng-grass','grass-a-night'),
  t('grass-a-new','我介绍自己叫小满，听他报上陆生的名字；他没听清，又追问了一遍，没等我说醒来再聊，已经低低重复着记住了小满两个字','lusheng-grass','grass-a-night'),
  t('grass-a-night','陆生的状况时有反复，我留在卫生员旁边帮忙，等他清醒些时照应着，迷糊时便守在近处','lusheng-grass','grass-a-water'),
  {id:'grass-a-water',speaker:'陆生',text:'放下吧，我想喝了叫你',scene:'lusheng-night-first',next:'grass-a-return',mode:'dialogue',nativeAudio:true,video:'assets/chapters/lusheng-night-v020.mp4',poster:'assets/chapters/lusheng-night-first-v020.png',hold:'assets/chapters/lusheng-night-hold-v020.png',duration:6.08,captionCues:[{text:'放下吧，',start:1.68,end:2.50},{text:'我想喝了',start:3.47,end:4.45},{text:'叫你',start:5.14,end:5.90}],title:'草地夜里，陆生醒来让小满放下水碗',replayLabel:'重看陆生',advanceOnEnd:true},
  t('grass-a-return','我把碗放下，陪陆生等到天快亮，终于听见外头陈禾与接应队回来的声音；那段路我没亲眼看见，只知道他们总算平安回到了营地','lusheng-night-hold','grass-dawn-route'),
  t('grass-b-path','我和陈禾跟着带路的人往前，听见草丛里的应声才找到掉队的同志，他已经说不出完整的话，得先停下缓一缓','grass-path','grass-b-foot'),
  t('grass-b-foot','另一位同志接过铺盖后，我们继续往回走，陈禾的脚却越发使不上劲；我让他搭住自己，他还先惦记着提醒我脚下滑，这回可不是随口说说','chenhe-grass','grass-b-names'),
  t('grass-b-names','被接住的同志问起我们的名字，约好走出去后带我们逛家乡那条街，可街名还没说完就接不上气，陈禾便让他回到营地再慢慢讲','grass-path','grass-b-return'),
  t('grass-b-return','听见营地传来的应声，我们朝那个方向返回，见陆生在卫生员照看下安定了一些，才稍稍放下心','grass-camp','grass-b-old',{routes:[{choice:'xj-choice',equals:'luggage',next:'grass-b-new'}]}),
  t('grass-b-old','陆生抬头叫了我的名字，听见他那声回来了，我才觉得这一趟真的走到了尽头','lusheng-grass','grass-dawn-route'),
  t('grass-b-new','回营歇下来，我才和身旁的人互通名字，他叫陆生，而我报上的小满两个字，他说自己已经记住了','lusheng-grass','grass-dawn-route'),
  t('grass-dawn-route','天色一点点亮起来，我们坐在营地边，喝过的碗就放在身旁','grass-meal','grass-dawn-yudu',{routes:[{choice:'snow-choice',equals:'call',next:'grass-dawn-call'}]}),
  t('grass-dawn-yudu','陈禾慢慢说起了于都那一天','chenhe-grass','grass-dawn-hand',{routes:[{choice:'choice',equals:'help',next:'grass-dawn-help'}]}),
  t('grass-dawn-hand','他笑问我是不是怕水，上了木板还不肯撒手，我辩解说木板一直在晃；可想起那天紧拽着他的样子，又实在找不出别的话来还嘴','chenhe-grass','grass-dawn-end'),
  t('grass-dawn-help','他还笑我在于都没站稳就忙着接别人的包，我说总不能看着人摔进水里；等我再低头时，脚边的绳子已被他悄悄收好','chenhe-grass','grass-dawn-end'),
  {id:'grass-dawn-call',speaker:'陈禾',text:'你在山上喊那几声，跟我娘似的，以前她隔着田埂喊，我早听见了，就是没玩够，不想回去',scene:'chenhe-dawn-first',next:'grass-dawn-home',mode:'dialogue',nativeAudio:true,video:'assets/chapters/chenhe-dawn-v020.mp4',poster:'assets/chapters/chenhe-dawn-first-v020.png',hold:'assets/chapters/chenhe-dawn-hold-v020.png',duration:9.088005,captionPages:[{text:'你在山上喊那几声，跟我娘似的',start:.23,end:2.43},{text:'以前她隔着田埂喊，我早听见了',start:3.68,end:5.66},{text:'就是没玩够，不想回去',start:7.28,end:8.62}],title:'天亮后的营地，陈禾说起小时候',replayLabel:'重看田埂的回忆',advanceOnEnd:true},
  t('grass-dawn-home','他说着先笑起来，我也跟着笑了，仿佛看见田埂那头那个玩得不肯回家的孩子','chenhe-dawn-hold','grass-dawn-end'),
  {id:'grass-dawn-end',speaker:'心声',mode:'thought',scene:'grass-meal',text:'碗里剩下的一点早已凉了，腿仍沉得厉害，可这样坐在一起说几句家常，也让人舍不得立刻起身',choices:[{id:'leave-grass',label:'收起碗，和大家一起走',next:'grass-end'}]},
  {id:'grass-end',scene:'grass-camp',checkpoint:true,next:'north-arrive'},
  f('north-arrive','1935年9月至10月，队伍继续北上，突破腊子口后经过哈达铺，再翻越六盘山，向陕北进发','north-trail','north-lusheng'),
  t('north-lusheng','走出草地后，陆生已经能慢慢随队行进，重物仍由大家轮换着背，他也总找些力所能及的事做，一起走完前面的路','north-trail','north-answer'),
  {id:'north-answer',speaker:'心声',mode:'thought',scene:'north-trail',text:'有时陈禾回头只喊我一声，听见回答便继续往前，知道彼此都在，脚步就能接着走下去',choices:[{id:'answer',label:'应声，继续前行',next:'north-end'}]},
  {id:'north-end',scene:'north-trail',checkpoint:true,next:'wuqi-arrive'},
  f('wuqi-arrive','1935年10月19日，中央红军抵达陕北吴起镇，我们这段漫长的同行终于有了落脚之地','wuqi-arrival','wuqi-rest'),
  t('wuqi-rest','听见前头说可以在这里歇脚，陈禾看了一会儿才肯坐下，念叨着两条腿再也不想动，我这才发现自己也一样疲惫','chenhe-rest','wuqi-water',{routes:[{choice:'grass-choice',equals:'rescue',next:'wuqi-cloth'}]}),
  t('wuqi-water','陆生叫着小满，把有水的地方指给我，嘱咐我慢些喝，原来他一直记得我的名字','lusheng-wuqi','wuqi-snow-route'),
  t('wuqi-cloth','那位被我们接回来的同志送来一块旧衣裁下的布，陈禾连声说补衣正用得上，我们便把这块结实的布收在身旁','spare-cloth','wuqi-lusheng-old',{routes:[{choice:'xj-choice',equals:'luggage',next:'wuqi-lusheng-new'}]}),
  t('wuqi-lusheng-old','陆生认出我，叫了一声小满，便在近旁坐下','lusheng-wuqi','wuqi-snow-route'),
  t('wuqi-lusheng-new','草地那夜才记住我的陆生，也朝我们点头招呼过，如今仍需要好好歇着','lusheng-wuqi','wuqi-snow-route'),
  t('wuqi-snow-route','陈禾终于肯放松那副一路紧绷的肩膀','chenhe-rest','wuqi-snow-support',{routes:[{choice:'snow-choice',equals:'call',next:'wuqi-snow-call'}]}),
  t('wuqi-snow-support','背带勒了一路，陈禾连抬胳膊都嫌费劲，不用他开口，我便俯身帮着解开，听见他终于舒出一口气','chenhe-rest','wuqi-choice'),
  t('wuqi-snow-call','我走近时叫了一声阿禾，他闭着眼便应了，直到我来到身旁才招呼我坐下','chenhe-rest','wuqi-choice'),
  {id:'wuqi-choice',speaker:'心声',mode:'thought',scene:'chenhe-rest',text:'针线包仍收在身边，终于歇下脚来，也有了把一路见闻慢慢想清楚的工夫',choices:[{id:'sew',label:'坐下来，替陈禾补好袖口',next:'wuqi-sew'},{id:'write',label:'把一路的人和事写下来',next:'wuqi-write'}]},
  t('wuqi-sew','他担心我把袖口缝死，我让他好好坐着，提起上回他替我补衣时的歪针脚，他却不服气地说到底没掉；我们就这样一边补衣一边拌嘴','chenhe-rest','wuqi-sew-result'),
  t('wuqi-sew-result','我也渐渐会补衣了，针脚虽歪，口子总算合上，只是梁叔若在，准会说线头留得太长','new-cuff','wuqi-sew-old'),
  t('wuqi-sew-old','我的袖口上仍留着梁叔的三针旧线，旁边接着陈禾后来缝上的针脚','sleeve-mended','wuqi-sew-lusheng',{routes:[{choice:'xj-choice',equals:'luggage',next:'wuqi-sew-letter'}]}),
  t('wuqi-sew-lusheng','陆生也挨着坐下，不知是在看我们补衣，还是听我们拌嘴','lusheng-wuqi','wuqi-sew-confirm'),
  t('wuqi-sew-letter','那半封一字未添的家书还在，我把它另放妥当','old-letter-room','wuqi-sew-confirm',{document:'娘，等有了落脚的地方……'}),
  {id:'wuqi-sew-confirm',speaker:'心声',mode:'thought',scene:'new-cuff',text:'收好针线时，陈禾正安静地坐在我身旁',choices:[{id:'remember-stitches',label:'收好针线，记住同行的人',next:'wuqi-later-route'}]},
  t('wuqi-write','我借来新纸，与陈禾在桌边坐下，先写梁守成，再添上大家叫惯的梁叔；临走前替我缝的三针也要记下，江边抬担架的那段，则注明是转运同志告诉我们的','chenhe-memory-first','wuqi-write-home'),
  {id:'wuqi-write-home',speaker:'陈禾',text:'还有他家那棵枣树，也写上吧，他自己老爱说',scene:'chenhe-memory-first',next:'wuqi-write-lusheng',mode:'dialogue',nativeAudio:true,video:'assets/chapters/chenhe-memory-v021.mp4',poster:'assets/chapters/chenhe-memory-first-v021.png',hold:'assets/chapters/chenhe-memory-hold-v021.png',duration:6.08,captionPages:[{text:'还有他家那棵枣树，也写上吧',start:.43,end:2.35},{text:'他自己老爱说',start:4.48,end:5.60}],title:'吴起的桌边，陈禾提醒记下梁叔家的枣树',replayLabel:'重看枣树的回忆',advanceOnEnd:false,routes:[{choice:'xj-choice',equals:'luggage',next:'wuqi-write-letter'}]},
  t('wuqi-write-lusheng','陆生在一旁嫌我写得太快，还没来得及看完，我便放慢笔，等他跟上','lusheng-wuqi','wuqi-writing'),
  t('wuqi-write-letter','旧家书仍用干布另包着，我在新纸上记下自己认识的梁叔，并注明江边的经过来自转运同志的讲述，旧信里那半句话则照原样留着','old-letter-room','wuqi-writing'),
  {id:'wuqi-writing',speaker:'心声',mode:'thought',scene:'memory-page',text:'我慢慢落笔，想起一段便记下一段，停下来时再理一理思绪',document:'梁守成，大家叫他梁叔\n怕针线沾水的他，临走前还替我补了三针\n他家那棵常被念叨的枣树，我也记得',choices:[{id:'write-names',label:'写下这些名字',next:'wuqi-later-route'}]},
  t('wuqi-later-route','附近又有一位年轻战士停下，行装背得有些歪，我们身旁还留着位置','newcomer-later','wuqi-later-help',{routes:[{choice:'snow-choice',equals:'call',next:'wuqi-later-name'}]}),
  t('wuqi-later-help','看见他的带子翻了，我起身替他理好，想起一路上别人让我别急、先站稳的叮嘱，如今也轮到我停下来等人了','newcomer-later','wuqi-close'),
  t('wuqi-later-name','他还在回头找人，我先问清名字，重复一遍后在身旁留出位置，自己一路听过的应声，如今也想好好回给他','newcomer-later','wuqi-close'),
  {id:'wuqi-close',speaker:'心声',mode:'thought',scene:'chenhe-rest',text:'那时还不知道后来的人会怎样讲起这条路，我记得的，是于都那只伸来的手，以及袖口上没拆的针线和一路相识的人',choices:[{id:'other-armies',label:'回到地图，看看其他队伍',next:'wuqi-end'}]},
  {id:'wuqi-end',scene:'wuqi-arrival',checkpoint:true,next:'epilogue-arrive'},
  f('epilogue-arrive','我们的同行在陕北暂时落脚，其他红军队伍仍在转战与北上，长征的历程也由1935年延续至1936年','atlas-1936','epilogue-huining'),
  f('epilogue-huining','1936年10月9日，红一、红四方面军在甘肃会宁会师','atlas-1936','epilogue-jiangtai'),
  f('epilogue-jiangtai','1936年10月22日，红一、红二方面军在将台堡会师，三大主力的胜利会合标志着长征胜利结束','atlas-1936','epilogue-remember'),
  {id:'epilogue-remember',speaker:'纪念',mode:'fact',scene:'atlas-1936',text:'记住抵达的日子，也铭记未能走到这一天的人\n1936—2026，纪念红军长征胜利90周年',choices:[{id:'look-back',label:'回望这一程',next:'journey-end'}]},
  {id:'journey-end',scene:'atlas-1936',end:true}
 ];
 for(const [first,last,id]of[['snow-arrive','snow-end','snow'],['grass-arrive','grass-end','grass'],['north-arrive','north-end','north'],['wuqi-arrive','wuqi-end','wuqi'],['epilogue-arrive','journey-end','epilogue']]){let on=false;for(const n of nodes){if(n.id===first)on=true;if(on)n.chapter=id;if(n.id===last)on=false;}}
 const names=['spare-cloth','mountain-pack','snow-path','grass-camp','grass-meal','lusheng-grass','chenhe-grass','grass-path','north-trail','wuqi-arrival','chenhe-rest','lusheng-wuqi','memory-page','new-cuff','old-letter-room','newcomer-later'];
 const images=Object.fromEntries(names.map(n=>[n,'assets/chapters/'+n+'-v015.webp']));
 Object.assign(images,{'lusheng-river':'assets/chapters/lusheng-river-v015.webp','lusheng-lamp':'assets/chapters/lusheng-lamp-v015.webp','atlas-1936':'assets/atlas-1936.svg'});
 for(const name of ['snow-concern','snow-shelter'])for(const phase of ['first','hold'])images[name+'-'+phase]='assets/chapters/'+name+'-'+phase+'-v015.png';
 const chapters=[
  {id:'snow',name:'第四站 · 夹金山',title:'这次换你等他',location:'夹金山',date:'1935年6月',start:'snow-arrive',end:'snow-end',ambient:'snow',image:'mountain-pack',ending:'风里有人应声，\n我们再走一段',summary:'曾在于都拉住我的人也会疲惫，这一回换我停下来陪他',button:'继续走进草地'},
  {id:'grass',name:'第五站 · 草地',title:'一口热的，几个名字',location:'松潘草地一带',date:'1935年8月',start:'grass-arrive',end:'grass-end',ambient:'grass',image:'grass-camp',ending:'天亮了，\n我们还在一起',summary:'有人留在营地照护伤员，也有人随队接应掉队的同志',button:'随队继续北上'},
  {id:'north',name:'北上过场',title:'草地之后，还有山口',location:'腊子口—哈达铺—六盘山',date:'1935年9—10月',start:'north-arrive',end:'north-end',ambient:'grass',image:'north-trail',ending:'应一声，\n再往前走',summary:'越过草地以后，彼此的一声回应伴着队伍继续北上',button:'前往吴起'},
  {id:'wuqi',name:'第六站 · 吴起',title:'把同行的人记住',location:'陕北吴起',date:'1935年10月19日',start:'wuqi-arrive',end:'wuqi-end',ambient:'room',image:'wuqi-arrival',ending:'有些人到了，\n有些人要被记住',summary:'在补衣与记述中回望一路同行，把相识的人留在记忆里',button:'翻开1936年的一页'},
  {id:'epilogue',name:'历史尾声 · 会师',title:'这条路上的更多人',location:'会宁 · 将台堡',date:'1936年10月',start:'epilogue-arrive',end:'journey-end',ambient:'room',image:'atlas-1936',ending:'我记得，\n我们同行过',summary:'人物与具体经历为虚构，这段故事献给长征路上的人们'}
 ];
 const alts=Object.fromEntries(names.map(n=>[n,{'mountain-pack':'陈禾在夹金山山脚整理行装','snow-path':'积雪山路上相隔行进的队伍','grass-camp':'湿冷草地上的临时营地','grass-meal':'旧碗、少量稀粥和收好的针线包','lusheng-grass':'陆生在草地营地歇息','chenhe-grass':'陈禾坐在草地营地，疲惫中仍看着同伴','grass-path':'接应队伍经过的草地来路','north-trail':'草地以后继续北上的山路','wuqi-arrival':'抵达陕北吴起的队伍与土路','chenhe-rest':'同一位陈禾在吴起停留处坐下休息','lusheng-wuqi':'同一位陆生在吴起留着水等同伴','memory-page':'新纸、短铅笔和收好的针线包','new-cuff':'陈禾补好的袖口上留下浅色新针脚','old-letter-room':'在屋内另用干布包着的梁叔旧家书','newcomer-later':'后来抵达的年轻战士与留下的空位'}[n]]));
 Object.assign(alts,{'spare-cloth':'同伴送来的可用于补衣的旧棉布与针线包','lusheng-river':'陆生靠稳在湘江边的担架上','lusheng-lamp':'陆生坐在遵义的灯旁','atlas-1936':'从陕北暂歇到会宁、将台堡会师的历史示意图'});
 for(const phase of ['first','hold']){alts['snow-concern-'+phase]='陈禾站在夹金山雪路边，想继续照应小满';alts['snow-shelter-'+phase]='陈禾在背风处靠稳，缓过一口气';}
 for(const name of ['lusheng-night','chenhe-dawn'])for(const phase of ['first','hold']){
  images[name+'-'+phase]='assets/chapters/'+name+'-'+phase+'-v020.png';
  alts[name+'-'+phase]=name==='lusheng-night'?'陆生在草地夜间营地靠着铺盖歇息，小满的水碗在近处':'陈禾坐在天亮后的草地营地，身后还有歇息的战士';
 }
 Object.assign(images,{'chenhe-memory-first':'assets/chapters/chenhe-memory-first-v021.png','chenhe-memory-hold':'assets/chapters/chenhe-memory-hold-v021.png'});
 Object.assign(alts,{'chenhe-memory-first':'白天的吴起借住屋内，陈禾坐在小满对面，桌上是新纸和短铅笔','chenhe-memory-hold':'同一张桌前，陈禾低头看向新纸，提醒小满记下梁叔家的枣树'});
 const data={nodes,images,alts,chapters};if(typeof module==='object'&&module.exports)module.exports=data;else root.LATE_CHAPTERS=data;
})(typeof window==='undefined'?globalThis:window);
