(function(root){
 'use strict';
 const thought=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const fact=(id,text,scene,next,extra={})=>({id,speaker:'行军纪事',text,scene,next,mode:'fact',...extra});
 const nodes=[
  fact('xj-arrive','1934年11月下旬至12月初，队伍转战广西湘江一线，为突破封锁付出了沉重代价','xiang-bank','xj-sleeve'),
  {id:'xj-sleeve',speaker:'梁叔',text:'别缩，针还没碰着呢，先缝三针，过了江再补',scene:'liang-sewing',next:'xj-three',mode:'dialogue',nativeAudio:true,video:'assets/chapters/liang-sewing-v018.mp4',poster:'assets/chapters/liang-sewing-first-v018.png',hold:'assets/chapters/liang-sewing-hold-v018.png',duration:6.08,captionCues:[{text:'别缩，',start:.54,end:1.10},{text:'针还没碰着呢，',start:1.68,end:2.55},{text:'先缝三针，',start:3.63,end:4.50},{text:'过了江再补',start:5.0,end:5.78}],title:'梁叔在湘江岸边替小满补袖口',replayLabel:'重看补衣',advanceOnEnd:true},
  thought('xj-three','破开的袖口已经缝上三针，前头却又传来催促声，我收回胳膊，准备跟着队伍过江','liang-sewing-hold','xj-choice'),
  {id:'xj-choice',speaker:'心声',mode:'thought',text:'转运的同志分成担架组和行装组，两边都有人带领；伤员与物资都要过江，我可以选择其中一组帮忙',scene:'xiang-bank',choices:[
   {id:'stretcher',label:'跟陈禾随担架组过江',next:'xj-a-lusheng'},
   {id:'luggage',label:'随行装组接运，替梁叔腾出手',next:'xj-b-bag'}]},
  thought('xj-a-lusheng','担架上那人一直看着我，我以为碰疼了他，听见的却是轻声提醒：我的袖子又掉下来了，亏他这时候还顾着这件事','lusheng-river','xj-a-name'),
  thought('xj-a-name','他叫陆生，我报上小满两个字，便让他先躺好，等过江再慢慢说；陈禾抬着前头，我跟在另一端','xiang-bank','xj-a-water'),
  thought('xj-a-water','到了对岸，我把留着的水放在陆生身边，看着他眼里的紧张慢慢缓下来','lusheng-river','xj-wait'),
  thought('xj-b-bag','梁叔把行装交给我，约好过江后再还他，便回头去帮忙；我随着行装组往前走，渐渐看不清他去了哪边','liang-sewing','xj-b-letter'),
  thought('xj-b-letter','上岸后，我看见布包里有一页受潮的纸，上头只留下了半句没写完的话','keepsakes','xj-b-protect',{document:'娘，等有了落脚的地方……'}),
  thought('xj-b-protect','我把纸包进干一些的衣襟，等着还给梁叔，连同针线包一起仔细收好','keepsakes','xj-wait'),
  thought('xj-wait','每过来一个人，我便抬头望一眼，可天色已经暗下去，梁叔仍没出现','chenhe-wait','xj-news-a',{routes:[{choice:'xj-choice',equals:'luggage',next:'xj-news-b'}]}),
  thought('xj-news-a','最后回来的转运战士带着梁叔的针线包，我连忙问他：梁叔在哪儿？','needle-pouch','xj-loss'),
  thought('xj-news-b','针线包和家书一直收在我身边，最后回来的转运战士只带来消息，我问他：梁叔在哪儿？','keepsakes','xj-loss'),
  thought('xj-loss','那位同志看了我一会儿，才说起梁叔回去接应另一副担架，在江边中弹后没能救回来；当时，他就在梁叔身旁','chenhe-wait','xj-unfinished'),
  thought('xj-unfinished','他刚才还在替我缝袖口，约好过了江再接着补','sleeve-three','xj-silence'),
  thought('xj-silence','陈禾安静地陪我坐着，直到远处又传来集合声；我知道该收好针线包了，这一次一定不能再弄丢','chenhe-wait','xj-pack'),
  {id:'xj-pack',speaker:'心声',text:'我把针线包收进衣襟，袖口上还留着梁叔缝下的三针',scene:'needle-pouch',mode:'thought',choices:[{id:'keep-pouch',label:'收好针线包，跟上队伍',next:'xj-end'}]},
  {id:'xj-end',checkpoint:true,scene:'xiang-bank',next:'zy-arrive'},
  fact('zy-arrive','1935年1月，遵义会议在贵州遵义召开；借住的屋里，陈禾拿起我开线的袖口，我看着他同线头较劲，问起梁叔教他补衣的事','zunyi-lamp','zy-thread'),
  {id:'zy-thread',speaker:'陈禾',text:'梁叔教过，到我手上……就是不听使唤，灯挪近点啊',scene:'zunyi-lamp',next:'zy-light',mode:'dialogue',nativeAudio:true,video:'assets/chapters/chenhe-sewing-v019.mp4',poster:'assets/chapters/chenhe-sewing-first-v019.png',hold:'assets/chapters/chenhe-sewing-hold-v019.png',duration:8.096009,captionCues:[{text:'梁叔教过，',start:.58,end:1.60},{text:'到我手上……',start:2.49,end:3.16},{text:'就是不听使唤，',start:3.69,end:4.55},{text:'灯挪近点啊',start:7.21,end:7.97}],title:'陈禾在遵义灯下替小满补衣',replayLabel:'重看灯下补衣',advanceOnEnd:true},
  {id:'zy-light',speaker:'心声',text:'我忍着笑，发现桌角的油灯照不到他手里的针线',scene:'chenhe-sewing-hold',mode:'thought',choices:[{id:'hold-light',label:'替他举稳灯',next:'zy-route'}]},
  thought('zy-route','挪近一些的灯光照着针线，针线包就放在我们身旁','chenhe-sewing-hold','zy-a-lusheng',{routes:[{choice:'xj-choice',equals:'luggage',next:'zy-b-letter'}]}),
  thought('zy-a-lusheng','陆生挪过来要替我拿灯，我让他坐着，他却说坐着也能拿；胳膊确实有些酸，我便把灯交给了他','lusheng-lamp','zy-a-return'),
  thought('zy-a-return','上回我在前头抬着陆生，这回换他坐在旁边替我照明；不过伤还没好，等他回去时，仍得有人扶上一把','lusheng-lamp','zy-mended'),
  thought('zy-b-letter','我一直带着梁叔的信，问陈禾要不要把后半封补完，他停下手里的活反问该写什么，我一时也答不上来','keepsakes','zy-b-fold',{document:'娘，等有了落脚的地方……'}),
  thought('zy-b-fold','我们决定先留着那半封信，折起快要破损的纸角时，动作都放得很轻，谁也没有再追问','keepsakes','zy-mended'),
  thought('zy-mended','我伸出胳膊试了试，袖口虽然缝得不太齐整，已经不再绷着；陈禾念叨着线不多了，我收住笑，看见新针脚正接在梁叔留下的三针旁边','sleeve-mended','zy-depart'),
  {id:'zy-depart',speaker:'心声',text:'屋外又响起收拾行装的声音，我们把油灯放回原处，准备再次出发',scene:'chenhe-sewing-hold',mode:'thought',choices:[{id:'pack-again',label:'收好针线，准备再出发',next:'zy-end'}]},
  {id:'zy-end',checkpoint:true,scene:'sleeve-mended',next:'t1-arrive'},
  fact('t1-arrive','1935年1月至5月，队伍离开遵义、转战黔滇，渡过一条河以后，还要寻找跨越下一条江的道路','chishui-trail','t1-familiar',{routePlace:'赤水河一带',routeDate:'1935年1—3月',routeStep:1}),
  thought('t1-familiar','眼前的河谷似曾相识，我问是不是又走回来了，陈禾指了指上次渡河的方向；前面队伍一动，我们也接着跟上','chishui-trail','t1-history',{routePlace:'赤水河一带',routeDate:'1935年1—3月',routeStep:1}),
  fact('t1-history','遵义会议后，中央红军四渡赤水、转战黔滇，随后于1935年5月上旬巧渡金沙江，这些连续的行动跨越了数月征程','jinsha-crossing','t1-dry',{routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2}),
  thought('t1-dry','过江时衣服又湿了，陈禾惦记着里面的针线包，听我说多包了一层才放下心；针要是泡锈了，以后补衣就不好使了','needle-pouch','t1-letter',{routes:[{choice:'xj-choice',equals:'stretcher',next:'t1-go'}],routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2}),
  thought('t1-letter','家书另包在干布里，曾经受潮的边角仍保留着一路携带的痕迹','keepsakes','t1-go',{routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2}),
  {id:'t1-go',speaker:'心声',text:'我隔着衣襟确认东西都在，前面的人也已经收拾好行装',scene:'jinsha-crossing',mode:'thought',routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2,choices:[{id:'northward',label:'收好东西，随队北上',next:'t1-end'}]},
  {id:'t1-end',checkpoint:true,scene:'jinsha-crossing',next:'t2-arrive',routePlace:'金沙江',routeDate:'1935年5月上旬',routeStep:2},
  fact('t2-arrive','1935年5月29日，红军夺取泸定桥，为后续部队打开通路，我们正是从这条通道继续前进的队伍','luding-bridge','t2-cross'),
  thought('t2-cross','桥下的水声直冲上来，陈禾嘱咐我跟着前面慢慢走，我便收住往下看的念头，盯紧脚下那段路','luding-bridge','t2-wait'),
  thought('t2-wait','到了对岸，才知道后面的队伍还没过完；又有担架送来，我们让出位置、上前接应，和仍在这里坚守的同志一起帮忙','luding-bank','t2-help'),
  {id:'t2-help',speaker:'心声',text:'我让出脚下的通道，同旁边的同志一起接运行装',scene:'luding-bank',mode:'thought',choices:[{id:'make-way',label:'让出通道，接着帮忙',next:'t2-end'}]},
  {id:'t2-end',scene:'luding-bank',end:true}
 ];
 for(const [first,last,id] of [['xj-arrive','xj-end','xiangjiang'],['zy-arrive','zy-end','zunyi'],['t1-arrive','t1-end','rivers'],['t2-arrive','t2-end','luding']]){
  let within=false;for(const n of nodes){if(n.id===first)within=true;if(within)n.chapter=id;if(n.id===last)within=false;}
 }
 const names=['xiang-bank','liang-sewing','lusheng-river','keepsakes','needle-pouch','chenhe-wait','zunyi-lamp','lusheng-lamp','sleeve-three','sleeve-mended','chishui-trail','jinsha-crossing','luding-bridge','luding-bank'];
 const data={nodes,images:{...Object.fromEntries(names.map(n=>[n,'assets/chapters/'+n+'-v014.webp'])),'liang-sewing':'assets/chapters/liang-sewing-first-v018.png','liang-sewing-hold':'assets/chapters/liang-sewing-hold-v018.png','zunyi-lamp':'assets/chapters/chenhe-sewing-first-v019.png','chenhe-sewing-hold':'assets/chapters/chenhe-sewing-hold-v019.png'},
  chapters:[
   {id:'yudu',name:'第一站 · 于都',title:'一只伸来的手',location:'江西于都',date:'1934年10月',start:'river',end:'end',ambient:'river',image:'portrait',ending:'路还很远，\n有人与你同行',summary:'于都河畔的相识与互相照应，伴随队伍渡河启程',button:'前往湘江'},
   {id:'xiangjiang',name:'第二站 · 湘江',title:'少了一个人的位置',location:'广西湘江一线',date:'1934年11月下旬—12月初',start:'xj-arrive',end:'xj-end',ambient:'cold',image:'xiang-bank',ending:'收好针线，\n再跟上队伍',summary:'队伍在相互照应中渡过湘江，梁叔留下的针线包伴着小满继续前行',button:'前往遵义'},
   {id:'zunyi',name:'第三站 · 遵义',title:'三针以后',location:'贵州遵义',date:'1935年1月',start:'zy-arrive',end:'zy-end',ambient:'room',image:'zunyi-lamp',ending:'灯挪近一点，\n袖口缝好了',summary:'新针脚接在旧线旁，灯下补好的袖口将陪我们走向下一程',button:'继续看赤水与金沙江'},
   {id:'rivers',name:'历史转场一',title:'河流又在面前',location:'赤水—金沙江',date:'1935年1—5月',start:'t1-arrive',end:'t1-end',ambient:'cold',image:'jinsha-crossing',ending:'又一条江，\n又一段路',summary:'从赤水到金沙江，地图上相连的路线隔着数月转战',button:'继续前往泸定桥'},
   {id:'luding',name:'历史转场二',title:'有人先把路打开',location:'大渡河 · 泸定桥',date:'1935年5月',start:'t2-arrive',end:'t2-end',ambient:'gorge',image:'luding-bridge',ending:'前头的路，\n有人先走过',summary:'在桥畔短暂休整，接着走向雪山'}
  ],
  alts:{'xiang-bank':'湿冷的湘江岸边，队伍与转运伤员的同志在等候过江','liang-sewing':'梁叔在湘江岸边替小满补袖口，背后战士继续走过','liang-sewing-hold':'梁叔补好三针后低下头，仍是同一片湘江岸边和过往的战士','lusheng-river':'年轻战士陆生已经靠稳在担架上，疲惫但清醒','keepsakes':'受潮的未完成家书与梁叔的旧针线包','needle-pouch':'收进干布中的同一个旧针线包','chenhe-wait':'陈禾在渐暗的湘江岸边陪小满等人','zunyi-lamp':'陈禾在遵义借住屋里低头缝衣，油灯照着桌面和小满伸出的袖口','chenhe-sewing-hold':'陈禾在同一张桌前抬起头请小满挪近灯，手里仍捏着袖口','lusheng-lamp':'同一位陆生坐稳在遵义屋里，灯在身旁照着','sleeve-three':'破开的灰布袖口上留下三针旧线','sleeve-mended':'同一片灰布袖口上旧线仍在，旁边接上新的补线','chishui-trail':'雨后的赤水河谷泥路，背着铺盖的战士向前行进','jinsha-crossing':'金沙江河谷与小木船，队伍在江边等候','luding-bridge':'战斗后已铺木板的泸定铁索桥通路，桥下是大渡河','luding-bank':'泸定桥边，照应后续队伍的战士留出通道'}
 };
 if(typeof module==='object'&&module.exports)module.exports=data;else root.MARCH_CHAPTERS=data;
})(typeof window==='undefined'?globalThis:window);
