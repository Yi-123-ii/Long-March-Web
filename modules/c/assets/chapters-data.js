(function(root){
 'use strict';
 const thought=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const fact=(id,text,scene,next,extra={})=>({id,speaker:'行军纪事',text,scene,next,mode:'fact',...extra});
 const nodes=[
  fact('xj-arrive','1934年11月下旬至12月初，广西湘江一线。队伍在这里付出了沉重代价。','xiang-bank','xj-sleeve'),
  {id:'xj-sleeve',speaker:'梁叔',text:'别缩，针还没碰着呢。先缝三针，过了江再补。',scene:'liang-sewing',next:'xj-three',mode:'dialogue',nativeAudio:true,video:'assets/chapters/liang-sewing-v018.mp4',poster:'assets/chapters/liang-sewing-first-v018.png',hold:'assets/chapters/liang-sewing-hold-v018.png',duration:6.08,captionCues:[{text:'别缩，',start:.54,end:1.10},{text:'针还没碰着呢。',start:1.68,end:2.55},{text:'先缝三针，',start:3.63,end:4.50},{text:'过了江再补。',start:5.0,end:5.78}],title:'梁叔在湘江岸边替小满补袖口',replayLabel:'重看补衣',advanceOnEnd:true},
  thought('xj-three','破开的袖口上，已经落了三针。我把胳膊收回来。前头又有人在催了，得跟着过江。','liang-sewing-hold','xj-choice'),
  {id:'xj-choice',speaker:'心声',mode:'thought',text:'转运的同志分成两组。一组随伤员担架过江，一组接运行装。两边都有人带领，也都需要帮忙。',scene:'xiang-bank',choices:[
   {id:'stretcher',label:'跟陈禾随担架组过江。',next:'xj-a-lusheng'},
   {id:'luggage',label:'随行装组接运，替梁叔腾出手。',next:'xj-b-bag'}]},
  thought('xj-a-lusheng','担架上那人一直看着我。我以为哪里碰疼了他，他却小声提醒：我的袖子又掉下来了。都这样了，还有空管我袖子。','lusheng-river','xj-a-name'),
  thought('xj-a-name','他叫陆生。我说我叫小满，让他先躺好，别急着说话。陈禾在前，我跟着抬另一头。先过江，到了那边再说。','xiang-bank','xj-a-water'),
  thought('xj-a-water','到岸了。我把留着的水放到陆生身边，他的眼睛这才慢慢不那么紧了。','lusheng-river','xj-wait'),
  thought('xj-b-bag','梁叔把行装先交给我，说到了再还他。后头还要人手，他去搭把手。我跟着这一组往前，没有再看清他去了哪边。','liang-sewing','xj-b-letter'),
  thought('xj-b-letter','上岸后，我看见布包里有一页受潮的纸。只写了这么半句。','keepsakes','xj-b-protect',{document:'娘，等有了落脚的地方……'}),
  thought('xj-b-protect','我没再往下翻，把纸包进干一点的衣襟，等着还他。针线包也在，一样不能落下。','keepsakes','xj-wait'),
  thought('xj-wait','每过来一个人，我就抬一下头。天都暗下去了，梁叔还没来。','chenhe-wait','xj-news-a',{routes:[{choice:'xj-choice',equals:'luggage',next:'xj-news-b'}]}),
  thought('xj-news-a','最后回来的转运战士，把梁叔的针线包带回来了。我问他，梁叔在哪儿。','needle-pouch','xj-loss'),
  thought('xj-news-b','针线包和家书一直在我身边。最后回来的转运战士没有带包，只带来消息。我问他，梁叔在哪儿。','keepsakes','xj-loss'),
  thought('xj-loss','那位同志看了看我，过了一会儿才说，后头又来一副担架，梁叔回去抬，在江边中了弹，没救回来。他当时就在旁边。','chenhe-wait','xj-unfinished'),
  thought('xj-unfinished','他刚才还给我缝来着。说过了江再补。','sleeve-three','xj-silence'),
  thought('xj-silence','陈禾没催我，也没说别难过。他陪我坐了一会儿，直到远处又有人集合。针线包得收好，不能再弄掉了。','chenhe-wait','xj-pack'),
  {id:'xj-pack',speaker:'心声',text:'我把针线包收进衣襟。袖口那三针还在。',scene:'needle-pouch',mode:'thought',choices:[{id:'keep-pouch',label:'收好针线包，跟上队伍。',next:'xj-end'}]},
  {id:'xj-end',checkpoint:true,scene:'xiang-bank',next:'zy-arrive'},
  fact('zy-arrive','1935年1月，贵州遵义。遵义会议在这里召开。借住的屋里，陈禾拿过我开线的袖口。我看他跟线头较劲，问起梁叔教他补衣的事。','zunyi-lamp','zy-thread'),
  {id:'zy-thread',cornerRepair:true,speaker:'陈禾',text:'梁叔教过。到我手上……就是不听使唤。灯挪近点啊。',scene:'zunyi-lamp',next:'zy-light',mode:'dialogue',nativeAudio:true,video:'assets/chapters/chenhe-sewing-v019.mp4',poster:'assets/chapters/chenhe-sewing-first-v019.png',hold:'assets/chapters/chenhe-sewing-hold-v019.png',duration:8.096009,captionCues:[{text:'梁叔教过。',start:.58,end:1.60},{text:'到我手上……',start:2.49,end:3.16},{text:'就是不听使唤。',start:3.69,end:4.55},{text:'灯挪近点啊。',start:7.21,end:7.97}],title:'陈禾在遵义灯下替小满补衣',replayLabel:'重看灯下补衣',advanceOnEnd:true},
  {id:'zy-light',speaker:'心声',text:'我忍住笑。灯还搁在桌角，照不到他手里的针线。',scene:'chenhe-sewing-hold',mode:'thought',choices:[{id:'hold-light',label:'替他举稳灯。',next:'zy-route'}]},
  thought('zy-route','灯光挪近了一些。针线包就搁在身旁。','chenhe-sewing-hold','zy-a-lusheng',{routes:[{choice:'xj-choice',equals:'luggage',next:'zy-b-letter'}]}),
  thought('zy-a-lusheng','陆生挪过来，非要替我拿灯。我让他坐着。他说，坐着也能拿。我胳膊还真有点酸，就把灯让给他了。','lusheng-lamp','zy-a-return'),
  thought('zy-a-return','上回我在前头抬着他，这回轮到他坐在旁边替我照着。等他回去，还是得有人扶一把，伤没那么快好。','lusheng-lamp','zy-mended'),
  thought('zy-b-letter','梁叔的信，我一直带着。我问陈禾，要不要替他把后头写完。他停住，看着我：后头写什么呢？我说不上来。','keepsakes','zy-b-fold',{document:'娘，等有了落脚的地方……'}),
  thought('zy-b-fold','那就先别写。折的时候轻一点，纸角都快破了。他没有说别的，我也没再问。','keepsakes','zy-mended'),
  thought('zy-mended','陈禾让我伸胳膊试试。不绷了，样子也没多齐整。他嫌我再挂破就没线了，我没敢接着笑。旧的三针没拆，新针脚就接在旁边。','sleeve-mended','zy-depart'),
  {id:'zy-depart',speaker:'心声',text:'屋外又响起收拾行装的声音。我们把灯放回去，准备再出发。',scene:'chenhe-sewing-hold',mode:'thought',choices:[{id:'pack-again',label:'收好针线，准备再出发。',next:'zy-end'}]},
  {id:'zy-end',checkpoint:true,scene:'sleeve-mended',next:'t1-arrive'},
  fact('t1-arrive','1935年1月至5月。离开遵义后，队伍转战黔滇。一条河过去了，前头还有另一条河。','chishui-trail','t1-familiar',{routePlace:'赤水河一带',routeDate:'1935年1—3月',routeStep:1}),
  thought('t1-familiar','眼前的河谷，像是来过。我问是不是又走回来了。陈禾看一眼，说上回是从那边过的。前头又动了，我们也跟上。','chishui-trail','t1-history',{routePlace:'赤水河一带',routeDate:'1935年1—3月',routeStep:1}),
  fact('t1-history','遵义会议后，中央红军四渡赤水，转战黔滇；1935年5月上旬，巧渡金沙江。这些渡河与转战，隔着数月的路程。','jinsha-crossing','t1-dry',{routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2}),
  thought('t1-dry','又过了一条江，衣服湿了。陈禾问里头湿没湿，我说又包了一层，没事。他这才放下心。针泡锈了，就不好使了。','needle-pouch','t1-letter',{routes:[{choice:'xj-choice',equals:'stretcher',next:'t1-go'}],routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2}),
  thought('t1-letter','家书另包在干布里。边角还是潮过的样子，没有忽然变成一页新纸。','keepsakes','t1-go',{routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2}),
  {id:'t1-go',speaker:'心声',text:'我又摸了摸衣襟，东西都在。前面的人已经收拾好了。',scene:'jinsha-crossing',mode:'thought',routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2,choices:[{id:'northward',label:'收好东西，随队北上。',next:'t1-end'}]},
  {id:'t1-end',checkpoint:true,scene:'jinsha-crossing',next:'t2-arrive',routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2},
  fact('t2-arrive','1935年5月29日，红军夺取泸定桥，为后续部队打开通路。先行的同志已经把路打开。我们是随后的队伍。','luding-bridge','t2-cross'),
  thought('t2-cross','水声从桥底下冲上来。陈禾让我跟着前面，慢点，别总往下看。我只盯着前面的那段路。','luding-bridge','t2-wait'),
  thought('t2-wait','到这边才知道，后头还没过完。又有担架过来，我们往旁边让，让完便接着搭把手。有些人已经走了，有些人还得在这里守着。','luding-bank','t2-help'),
  {id:'t2-help',speaker:'心声',text:'我把脚下的位置让出来，和旁边的人一起接运行装。',scene:'luding-bank',mode:'thought',choices:[{id:'make-way',label:'让出通道，接着帮忙。',next:'t2-end'}]},
  {id:'t2-end',scene:'luding-bank',end:true}
 ];
 for(const [first,last,id] of [['xj-arrive','xj-end','xiangjiang'],['zy-arrive','zy-end','zunyi'],['t1-arrive','t1-end','rivers'],['t2-arrive','t2-end','luding']]){
  let within=false;for(const n of nodes){if(n.id===first)within=true;if(within)n.chapter=id;if(n.id===last)within=false;}
 }
 const names=['xiang-bank','liang-sewing','lusheng-river','keepsakes','needle-pouch','chenhe-wait','zunyi-lamp','lusheng-lamp','sleeve-three','sleeve-mended','chishui-trail','jinsha-crossing','luding-bridge','luding-bank'];
 const data={nodes,images:{...Object.fromEntries(names.map(n=>[n,'assets/chapters/'+n+'-v014.webp'])),'liang-sewing':'assets/chapters/liang-sewing-first-v018.png','liang-sewing-hold':'assets/chapters/liang-sewing-hold-v018.png','zunyi-lamp':'assets/chapters/chenhe-sewing-first-v019.png','chenhe-sewing-hold':'assets/chapters/chenhe-sewing-hold-v019.png'},
  chapters:[
   {id:'yudu',name:'第一站 · 于都',title:'一只伸来的手',location:'江西于都',date:'1934年10月',start:'river',end:'end',ambient:'river',image:'portrait',ending:'路还很远，\n有人与你同行。',summary:'河岸相识、梁叔的枣树和上船的脚步，都留在这一程里。',button:'前往湘江'},
   {id:'xiangjiang',name:'第二站 · 湘江',title:'少了一个人的位置',location:'广西湘江一线',date:'1934年11月下旬—12月初',start:'xj-arrive',end:'xj-end',ambient:'cold',image:'xiang-bank',ending:'收好针线，\n再跟上队伍。',summary:'两条路线都有人照应。梁叔没有归队，不是你的选择造成的。',button:'前往遵义'},
   {id:'zunyi',name:'第三站 · 遵义',title:'三针以后',location:'贵州遵义',date:'1935年1月',start:'zy-arrive',end:'zy-end',ambient:'room',image:'zunyi-lamp',ending:'灯挪近一点，\n袖口缝好了。',summary:'旧针脚没有拆，新的线接在旁边。下一程，河流又在面前。',button:'继续看赤水与金沙江'},
   {id:'rivers',name:'历史转场一',title:'河流又在面前',location:'赤水—金沙江',date:'1935年1—5月',start:'t1-arrive',end:'t1-end',ambient:'cold',image:'jinsha-crossing',ending:'又一条江，\n又一段路。',summary:'从赤水到金沙江，地图上的每一段前进，都隔着实实在在的日子。',button:'继续前往泸定桥'},
   {id:'luding',name:'历史转场二',title:'有人先把路打开',location:'大渡河 · 泸定桥',date:'1935年5月',start:'t2-arrive',end:'t2-end',ambient:'gorge',image:'luding-bridge',ending:'前头的路，\n有人先走过。',summary:'这一程，先在桥边歇一歇。下一站，是更高的山。雪山篇待续。'}
  ],
  alts:{'xiang-bank':'湿冷的湘江岸边，队伍与转运伤员的同志在等候过江','liang-sewing':'梁叔在湘江岸边替小满补袖口，背后战士继续走过','liang-sewing-hold':'梁叔补好三针后低下头，仍是同一片湘江岸边和过往的战士','lusheng-river':'年轻战士陆生已经靠稳在担架上，疲惫但清醒','keepsakes':'受潮的未完成家书与梁叔的旧针线包','needle-pouch':'收进干布中的同一个旧针线包','chenhe-wait':'陈禾在渐暗的湘江岸边陪小满等人','zunyi-lamp':'陈禾在遵义借住屋里低头缝衣，油灯照着桌面和小满伸出的袖口','chenhe-sewing-hold':'陈禾在同一张桌前抬起头请小满挪近灯，手里仍捏着袖口','lusheng-lamp':'同一位陆生坐稳在遵义屋里，灯在身旁照着','sleeve-three':'破开的灰布袖口上留下三针旧线','sleeve-mended':'同一片灰布袖口上旧线仍在，旁边接上新的补线','chishui-trail':'雨后的赤水河谷泥路，背着铺盖的战士向前行进','jinsha-crossing':'金沙江河谷与小木船，队伍在江边等候','luding-bridge':'战斗后已铺木板的泸定铁索桥通路，桥下是大渡河','luding-bank':'泸定桥边，照应后续队伍的战士留出通道'}
 };
 if(typeof module==='object'&&module.exports)module.exports=data;else root.MARCH_CHAPTERS=data;
})(typeof window==='undefined'?globalThis:window);
