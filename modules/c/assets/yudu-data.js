/* v0.29: approved manuscript, static dialogue beats and validated progress migration. */
(function(root){
 const thought=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const nodes=[
  {
    "id": "river",
    "speaker": "河岸",
    "text": "1934年10月，江西于都。",
    "scene": "gathering",
    "view": "wide",
    "next": "strap",
    "mode": "observation",
    "chapter": "yudu"
  },
  {
    "id": "strap",
    "speaker": "心声",
    "text": "肩带翻折着压在锁骨上，我试着托高铺盖，还是磨得疼。",
    "scene": "gathering",
    "next": "newcomer",
    "mode": "thought",
    "view": "bridge",
    "cue": "steps",
    "chapter": "yudu"
  },
  {
    "id": "newcomer",
    "speaker": "心声",
    "text": "前面的人已经上了浮桥，桥边的陈禾正回头看我。",
    "scene": "portrait",
    "next": "reach",
    "mode": "thought",
    "chapter": "yudu"
  },
  {
    "id": "reach",
    "speaker": "陈禾",
    "text": "别站在岸上了。来，跟上我们。",
    "scene": "reach",
    "next": "choice",
    "mode": "dialogue",
    "nativeAudio": true,
    "duration": 5.088005,
    "captionStart": 0.18,
    "captionEnd": 4.65,
    "title": "陈禾在河岸招呼你",
    "replayLabel": "重看招呼",
    "advanceOnEnd": true,
    "chapter": "yudu"
  },
  {
    "id": "choice",
    "speaker": "心声",
    "text": "身后有人踩滑，铺盖跟着蹭到我背上。那位战士没够着桥边的木桩，松开的绳子也兜不住往下坠的包。",
    "scene": "hold",
    "mode": "thought",
    "cue": "stumble",
    "choices": [
      {
        "id": "hand",
        "label": "握住陈禾的手。",
        "next": "a-cross"
      },
      {
        "id": "help",
        "label": "先扶身后的人。",
        "next": "b-bag"
      }
    ],
    "chapter": "yudu"
  },
  {
    "id": "a-cross",
    "speaker": "心声",
    "text": "旁边已经有人托住那位战士的铺盖，我借着陈禾的手跨上木板。",
    "scene": "bridge-step",
    "next": "a-tight",
    "mode": "thought",
    "cue": "steps",
    "chapter": "yudu"
  },
  {
    "id": "a-tight",
    "speaker": "心声",
    "text": "脚下还在晃，他一直没松手，直到我站稳才转身往前走。",
    "scene": "bridge-forward",
    "next": "a-fine",
    "mode": "thought",
    "chapter": "yudu"
  },
  {
    "id": "a-fine",
    "speaker": "旁白",
    "text": "",
    "scene": "intro-first",
    "next": "meet",
    "mode": "observation",
    "chapter": "yudu"
  },
  {
    "id": "b-bag",
    "speaker": "心声",
    "text": "松开的铺盖压在我胳膊上，那位战士扶着我的肩，脚下还在找落稳的地方。",
    "scene": "bank-lookback",
    "next": "b-thanks",
    "mode": "thought",
    "cue": "stumble",
    "chapter": "yudu"
  },
  {
    "id": "b-thanks",
    "speaker": "小满",
    "text": "我站得住，你先把包抱稳。",
    "scene": "bank-lookback",
    "next": "b-steady",
    "mode": "dialogue",
    "chapter": "yudu"
  },
  {
    "id": "b-steady",
    "text": "（抱紧铺盖）拿住了，你先过去吧。",
    "scene": "bank-lookback",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "yudu",
    "next": "b-this-way"
  },
  {
    "id": "b-this-way",
    "speaker": "心声",
    "text": "陈禾还在桥边等着，后面的人贴着我们身旁往前走。",
    "scene": "hold",
    "next": "meet",
    "mode": "thought",
    "cue": "steps",
    "chapter": "yudu"
  },
  {
    "id": "meet",
    "speaker": "旁白",
    "text": "",
    "scene": "intro-first",
    "next": "introduce",
    "mode": "observation",
    "chapter": "yudu"
  },
  {
    "id": "introduce",
    "speaker": "陈禾",
    "text": "我叫陈禾，禾苗的禾。你呢？",
    "scene": "introduction",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/yudu/chenhe-introduction-v012.mp4",
    "poster": "assets/yudu/chenhe-intro-first-v012.png",
    "hold": "assets/yudu/chenhe-intro-hold-v012.png",
    "duration": 4.096009,
    "title": "陈禾介绍名字",
    "replayLabel": "重看相识",
    "next": "name",
    "advanceOnEnd": true,
    "chapter": "yudu"
  },
  {
    "id": "name",
    "speaker": "旁白",
    "text": "",
    "scene": "intro-hold",
    "mode": "observation",
    "choices": [
      {
        "id": "tell-name",
        "label": "我叫小满。",
        "next": "joined"
      }
    ],
    "chapter": "yudu"
  },
  {
    "id": "joined",
    "speaker": "旁白",
    "text": "",
    "scene": "intro-hold",
    "next": "liang-meet",
    "mode": "observation",
    "chapter": "yudu"
  },
  {
    "id": "liang-meet",
    "speaker": "心声",
    "text": "我刚把铺盖托上去，一截带子就拖进了泥里。梁叔在旁边看见，伸手指了指地上。",
    "scene": "liang-reminder-first",
    "next": "liang-reminder",
    "mode": "thought",
    "chapter": "yudu"
  },
  {
    "id": "liang-reminder",
    "speaker": "梁叔",
    "text": "掖进去，别拖地上。磨断了怎么背？",
    "scene": "liang-reminder-first",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/yudu/liang-reminder-v013.mp4",
    "poster": "assets/yudu/liang-reminder-first-v013.png",
    "hold": "assets/yudu/liang-reminder-hold-v013.png",
    "duration": 4.096009,
    "title": "梁叔提醒收好行装",
    "replayLabel": "重看梁叔",
    "next": "strap-tucked",
    "advanceOnEnd": true,
    "chapter": "yudu"
  },
  {
    "id": "strap-tucked",
    "speaker": "心声",
    "text": "（把那截带子掖进背带。）",
    "scene": "liang-reminder-hold",
    "next": "ask-home",
    "mode": "thought",
    "chapter": "yudu"
  },
  {
    "id": "ask-home",
    "speaker": "心声",
    "text": "前头还在安排人上船，梁叔和我站在一旁等着。远处传来几声狗叫，近处的船帮偶尔撞一下木桩。",
    "scene": "liang-home-first",
    "mode": "thought",
    "choices": [
      {
        "id": "ask-liang-home",
        "label": "梁叔，您家里这时候都忙些什么？",
        "next": "liang-home"
      }
    ],
    "chapter": "yudu"
  },
  {
    "id": "liang-home",
    "speaker": "梁叔",
    "text": "我家后头有棵枣树，这时候该打枣了。",
    "scene": "liang-home-first",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/yudu/liang-home-v013.mp4",
    "poster": "assets/yudu/liang-home-first-v013.png",
    "hold": "assets/yudu/liang-home-hold-v013.png",
    "duration": 4.096009,
    "title": "梁叔说起家里的枣树",
    "replayLabel": "重看家乡",
    "next": "home-after",
    "advanceOnEnd": true,
    "chapter": "yudu"
  },
  {
    "id": "home-after",
    "speaker": "心声",
    "text": "轮到我们上船了。梁叔托住背后的行装，跟着前面的人走上木板。",
    "scene": "liang-home-hold",
    "next": "departure",
    "mode": "thought",
    "chapter": "yudu"
  },
  {
    "id": "departure",
    "speaker": "心声",
    "text": "",
    "scene": "boarding-first",
    "mode": "thought",
    "choices": [
      {
        "id": "board",
        "label": "背好行装，跟着上船。",
        "next": "boarding"
      }
    ],
    "chapter": "yudu"
  },
  {
    "id": "boarding",
    "speaker": "启程",
    "text": "",
    "scene": "boarding-first",
    "mode": "observation",
    "nativeAudio": true,
    "video": "assets/yudu/boarding-v013.mp4",
    "poster": "assets/yudu/boarding-first-v013.png",
    "hold": "assets/yudu/boarding-hold-v013.png",
    "duration": 4.096009,
    "title": "沿木浮桥走上木船",
    "replayLabel": "重看上船",
    "next": "aboard",
    "advanceOnEnd": true,
    "chapter": "yudu"
  },
  {
    "id": "aboard",
    "speaker": "心声",
    "text": "又有人踏进船里，船身随着那一步沉了沉。我扶住船沿，往先上来的战士旁边靠，身后才又空出一块落脚的地方。",
    "scene": "boarding-hold",
    "next": "end",
    "mode": "thought",
    "chapter": "yudu"
  },
  {
    "id": "end",
    "scene": "boarding-hold",
    "chapter": "yudu",
    "end": true
  }
];
 const data={version:1,storyRevision:10,title:'一只伸来的手',start:'river',nodes,
  memories:{hand:'河岸上，你先握住了陈禾的手。',help:'河岸上，你先回身扶了别人。'},
  imageAlt:{'bridge-step':'小满低头看向脚下的浮桥木板，前方战士正往船边走','bridge-forward':'向前延伸的木浮桥与停靠的木船','bank-lookback':'小满回身看向后方已站稳的战士，岸边仍有等候的队伍','liang-reminder-first':'梁叔面向小满提醒收好行装，身后队伍走过浮桥','liang-reminder-hold':'梁叔收回目光，身后仍是于都浮桥与木船','liang-home-first':'同一位梁叔站在浮桥边，准备回答关于家乡的问题','liang-home-hold':'梁叔说起家里的枣树后露出浅笑','boarding-first':'小满低头望向浮桥，前方是停靠的木船','boarding-hold':'小满已经站在木船里，旁边的战士与对岸队伍仍在画面中'},
  images:{'bridge-step':'assets/yudu/bridge-step-v013.png','bridge-forward':'assets/yudu/bridge-forward-v013.png','bank-lookback':'assets/yudu/bank-lookback-v013.png','liang-reminder-first':'assets/yudu/liang-reminder-first-v013.png','liang-reminder-hold':'assets/yudu/liang-reminder-hold-v013.png','liang-home-first':'assets/yudu/liang-home-first-v013.png','liang-home-hold':'assets/yudu/liang-home-hold-v013.png','boarding-first':'assets/yudu/boarding-first-v013.png','boarding-hold':'assets/yudu/boarding-hold-v013.png',gathering:'assets/yudu/yudu-gathering-v011.png','intro-first':'assets/yudu/chenhe-intro-first-v012.png','intro-hold':'assets/yudu/chenhe-intro-hold-v012.png',reachStill:'assets/yudu/chenhe-reach-still-v011.png',portrait:'assets/yudu/chenhe-first-v011.png',hold:'assets/yudu/chenhe-hold-v011.png'},
  video:'assets/yudu/chenhe-invitation-v011.mp4',
  historicalNote:'1934年10月，中央红军在于都集结，分批渡过于都河，开始长征。本作从其中一支队伍的虚构经历展开；不将于都表述为所有红军队伍唯一的长征出发地。',
  sources:[{title:'红军长征集结地为何选择于都 · 中国共产党新闻网',url:'https://cpc.people.com.cn/n1/2024/1011/c443712-40336727.html'}]
 };
 data.legacyStory=typeof module==='object'&&module.exports?require('./story-legacy-v009.js'):root.MARCH_LEGACY;
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
