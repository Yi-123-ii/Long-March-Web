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
    "chapter": "yudu",
    "historicalTab": "1934年10月，中央红军主力从于都等地出发，开始战略转移"
  },
  {
    "id": "strap",
    "speaker": "心声",
    "text": "肩带翻了边，正硌在锁骨上。我托着铺盖往上提了提，还没走两步，它又坠了下来。桥边亮着灯，上船的人一个挨着一个往前挪，陈禾就站在木板旁，回头等我。",
    "scene": "gathering",
    "next": "newcomer",
    "mode": "thought",
    "view": "bridge",
    "cue": "steps",
    "chapter": "yudu",
    "narration": {
      "id": "XN001",
      "src": "assets/audio/xiaoman-narration-v039/XN001.mp3",
      "duration": 18.685,
      "cues": [
        {
          "text": "肩带翻了边，正硌在锁骨上。",
          "start": 0.8599999999999965,
          "end": 3.34
        },
        {
          "text": "我托着铺盖往上提了提，还没走两步，它又坠了下来。",
          "start": 4.34,
          "end": 9.24
        },
        {
          "text": "桥边亮着灯，上船的人一个挨着一个往前挪，陈禾就站在木板旁，回头等我。",
          "start": 10.36,
          "end": 17.98
        }
      ],
      "sentences": [
        "XN001-01",
        "XN001-02",
        "XN001-03"
      ]
    }
  },
  {
    "id": "newcomer",
    "speaker": "心声",
    "text": "",
    "scene": "portrait",
    "mode": "thought",
    "chapter": "yudu",
    "choices": [
      {
        "id": "continue-newcomer",
        "label": "走到他面前。",
        "next": "reach"
      }
    ]
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
    "title": "陈禾在河岸招呼你",
    "replayLabel": "重看招呼",
    "advanceOnEnd": true,
    "chapter": "yudu",
    "captionStart": 0.18,
    "captionEnd": 4.65
  },
  {
    "id": "choice",
    "speaker": "心声",
    "text": "身后忽然有人踩滑，背上的铺盖撞到我肩头。他伸手没够着桥边的木桩，包又往下滑，带得人一歪。",
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
    "chapter": "yudu",
    "narration": {
      "id": "XN002",
      "src": "assets/audio/xiaoman-narration-v039/XN002.mp3",
      "duration": 9.7775,
      "cues": [
        {
          "text": "身后忽然有人踩滑，背上的铺盖撞到我肩头。",
          "start": 0.5349999999999966,
          "end": 4.174999999999997
        },
        {
          "text": "他伸手没够着桥边的木桩，包又往下滑，带得人一歪。",
          "start": 4.914999999999999,
          "end": 9.254999999999999
        }
      ],
      "sentences": [
        "XN002-01",
        "XN002-02"
      ]
    }
  },
  {
    "id": "a-cross",
    "speaker": "心声",
    "text": "旁边的人已经托住了他的铺盖，我握着陈禾的手跨上木板。船身一晃，他的手也跟着紧了紧，等我站稳才松开。",
    "scene": "bridge-step",
    "next": "a-tight",
    "mode": "thought",
    "cue": "steps",
    "chapter": "yudu",
    "narration": {
      "id": "XN003",
      "src": "assets/audio/xiaoman-narration-v039/XN003.mp3",
      "duration": 11.1175,
      "cues": [
        {
          "text": "旁边的人已经托住了他的铺盖，我握着陈禾的手跨上木板。",
          "start": 0.11750000000000327,
          "end": 5.277500000000003
        },
        {
          "text": "船身一晃，他的手也跟着紧了紧，等我站稳才松开。",
          "start": 6.077500000000001,
          "end": 10.4775
        }
      ],
      "sentences": [
        "XN003-01",
        "XN003-02"
      ]
    }
  },
  {
    "id": "a-tight",
    "speaker": "心声",
    "text": "",
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
    "mode": "observation",
    "chapter": "yudu",
    "choices": [
      {
        "id": "continue-a-fine",
        "label": "跟上陈禾。",
        "next": "meet"
      }
    ]
  },
  {
    "id": "b-bag",
    "speaker": "心声",
    "text": "我托住滑下来的铺盖，那位战士扶着我的肩，挪了两次脚才踩稳。",
    "scene": "bank-lookback",
    "next": "b-thanks",
    "mode": "thought",
    "cue": "stumble",
    "chapter": "yudu",
    "narration": {
      "id": "XN004",
      "src": "assets/audio/xiaoman-narration-v039/XN004.mp3",
      "duration": 6.88,
      "cues": [
        {
          "text": "我托住滑下来的铺盖，那位战士扶着我的肩，挪了两次脚才踩稳。",
          "start": 0.4000000000000057,
          "end": 6.200000000000003
        }
      ],
      "sentences": [
        "XN004-01"
      ]
    }
  },
  {
    "id": "b-thanks",
    "speaker": "小满",
    "text": "我能站得住，你先把包抱稳。",
    "scene": "bank-lookback",
    "next": "b-steady",
    "mode": "dialogue",
    "chapter": "yudu",
    "voice": "assets/audio/xiaoman-v034/XM01.mp3",
    "voiceDuration": 2.975,
    "voiceId": "XM01"
  },
  {
    "id": "b-steady",
    "text": "好了，你先过去吧。",
    "scene": "bank-lookback",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "yudu",
    "next": "b-this-way"
  },
  {
    "id": "b-this-way",
    "speaker": "心声",
    "text": "后面的人从身旁挤过去，陈禾还站在桥边，没有往前走。",
    "scene": "hold",
    "mode": "thought",
    "cue": "steps",
    "chapter": "yudu",
    "choices": [
      {
        "id": "continue-b-this-way",
        "label": "松开手，跟上陈禾。",
        "next": "meet"
      }
    ],
    "narration": {
      "id": "XN005",
      "src": "assets/audio/xiaoman-narration-v039/XN005.mp3",
      "duration": 6.31,
      "cues": [
        {
          "text": "后面的人从身旁挤过去，陈禾还站在桥边，没有往前走。",
          "start": 0.4000000000000057,
          "end": 5.640000000000008
        }
      ],
      "sentences": [
        "XN005-01"
      ]
    }
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
        "next": "name-spoken-v034"
      }
    ],
    "chapter": "yudu"
  },
  {
    "id": "name-spoken-v034",
    "chapter": "yudu",
    "scene": "intro-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我叫小满。",
    "next": "joined",
    "voice": "assets/audio/xiaoman-v034/XM02.mp3",
    "voiceDuration": 1.525,
    "voiceId": "XM02"
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
    "text": "我刚把铺盖往背上托稳，带子的一头又拖进泥里。梁叔伸手指了指，我这才低头看见。",
    "scene": "liang-reminder-first",
    "next": "liang-reminder",
    "mode": "thought",
    "chapter": "yudu",
    "narration": {
      "id": "XN006",
      "src": "assets/audio/xiaoman-narration-v039/XN006.mp3",
      "duration": 9.0725,
      "cues": [
        {
          "text": "我刚把铺盖往背上托稳，带子的一头又拖进泥里。",
          "start": 0.37000000000000455,
          "end": 4.690000000000005
        },
        {
          "text": "梁叔伸手指了指，我这才低头看见。",
          "start": 5.350000000000001,
          "end": 8.39
        }
      ],
      "sentences": [
        "XN006-01",
        "XN006-02"
      ]
    }
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
    "text": "我把那截带子掖进背带。",
    "scene": "liang-reminder-hold",
    "next": "ask-home",
    "mode": "thought",
    "chapter": "yudu",
    "narration": {
      "id": "XN007",
      "src": "assets/audio/xiaoman-narration-v039/XN007.mp3",
      "duration": 2.93,
      "cues": [
        {
          "text": "我把那截带子掖进背带。",
          "start": 0.5375000000000014,
          "end": 2.3774999999999977
        }
      ],
      "sentences": [
        "XN007-01"
      ]
    }
  },
  {
    "id": "ask-home",
    "speaker": "心声",
    "text": "还没轮到我们上船，梁叔把肩上的行装往上托了托，和我站到旁边。船帮撞了一下木桩，远处的狗叫声隔着水传过来。",
    "scene": "liang-home-first",
    "mode": "thought",
    "choices": [
      {
        "id": "ask-liang-home",
        "label": "梁叔，您家里这时候都忙些什么？",
        "next": "ask-home-spoken-v034"
      }
    ],
    "chapter": "yudu",
    "narration": {
      "id": "XN008",
      "src": "assets/audio/xiaoman-narration-v039/XN008.mp3",
      "duration": 12.51,
      "cues": [
        {
          "text": "还没轮到我们上船，梁叔把肩上的行装往上托了托，和我站到旁边。",
          "start": 0.2874999999999943,
          "end": 6.207499999999996
        },
        {
          "text": "船帮撞了一下木桩，远处的狗叫声隔着水传过来。",
          "start": 7.447499999999991,
          "end": 11.80749999999999
        }
      ],
      "sentences": [
        "XN008-01",
        "XN008-02"
      ]
    }
  },
  {
    "id": "ask-home-spoken-v034",
    "chapter": "yudu",
    "scene": "liang-home-first",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "梁叔，您家里这时候都忙些什么？",
    "next": "liang-home",
    "voice": "assets/audio/xiaoman-v034/XM03.mp3",
    "voiceDuration": 3.08,
    "voiceId": "XM03"
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
    "text": "船里的人往里挪开，终于空出位置。梁叔托着行装走上木板，我跟在他后头。",
    "scene": "liang-home-hold",
    "next": "departure",
    "mode": "thought",
    "chapter": "yudu",
    "narration": {
      "id": "XN009",
      "src": "assets/audio/xiaoman-narration-v039/XN009.mp3",
      "duration": 8.395,
      "cues": [
        {
          "text": "船里的人往里挪开，终于空出位置。",
          "start": 0.4975000000000023,
          "end": 3.7575000000000074
        },
        {
          "text": "梁叔托着行装走上木板，我跟在他后头。",
          "start": 4.737499999999997,
          "end": 8.39500000000001
        }
      ],
      "sentences": [
        "XN009-01",
        "XN009-02"
      ]
    }
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
    "text": "身后又有人上船，我扶着船沿往里挪，鞋尖碰到了前面战士的脚。他侧过身让了让，船身还在轻轻晃。",
    "scene": "boarding-hold",
    "next": "end",
    "mode": "thought",
    "chapter": "yudu",
    "narration": {
      "id": "XN010",
      "src": "assets/audio/xiaoman-narration-v039/XN010.mp3",
      "duration": 9.3,
      "cues": [
        {
          "text": "身后又有人上船，我扶着船沿往里挪，鞋尖碰到了前面战士的脚。",
          "start": 0,
          "end": 5.56
        },
        {
          "text": "他侧过身让了让，船身还在轻轻晃。",
          "start": 6.14,
          "end": 8.88
        }
      ],
      "sentences": [
        "XN010-01",
        "XN010-02"
      ]
    }
  },
  {
    "id": "end",
    "scene": "boarding-hold",
    "chapter": "yudu",
    "checkpoint": true,
    "next": "xj-arrive"
  }
];
 const data={version:1,storyRevision:13,title:'一只伸来的手',start:'river',nodes,
  memories:{"hand":"河岸上，你先握住了陈禾的手","help":"河岸上，你先回身扶了别人"},
  imageAlt:{'bridge-step':'小满低头看向脚下的浮桥木板，前方战士正往船边走','bridge-forward':'向前延伸的木浮桥与停靠的木船','bank-lookback':'小满回身看向后方已站稳的战士，岸边仍有等候的队伍','liang-reminder-first':'梁叔面向小满提醒收好行装，身后队伍走过浮桥','liang-reminder-hold':'梁叔收回目光，身后仍是于都浮桥与木船','liang-home-first':'同一位梁叔站在浮桥边，准备回答关于家乡的问题','liang-home-hold':'梁叔说起家里的枣树后露出浅笑','boarding-first':'小满低头望向浮桥，前方是停靠的木船','boarding-hold':'小满已经站在木船里，旁边的战士与对岸队伍仍在画面中'},
  images:{'bridge-step':'assets/yudu/bridge-step-v013.png','bridge-forward':'assets/yudu/bridge-forward-v013.png','bank-lookback':'assets/yudu/bank-lookback-v013.png','liang-reminder-first':'assets/yudu/liang-reminder-first-v013.png','liang-reminder-hold':'assets/yudu/liang-reminder-hold-v013.png','liang-home-first':'assets/yudu/liang-home-first-v013.png','liang-home-hold':'assets/yudu/liang-home-hold-v013.png','boarding-first':'assets/yudu/boarding-first-v013.png','boarding-hold':'assets/yudu/boarding-hold-v013.png',gathering:'assets/yudu/yudu-gathering-v011.png','intro-first':'assets/yudu/chenhe-intro-first-v012.png','intro-hold':'assets/yudu/chenhe-intro-hold-v012.png',reachStill:'assets/yudu/chenhe-reach-still-v011.png',portrait:'assets/yudu/chenhe-first-v011.png',hold:'assets/yudu/chenhe-hold-v011.png'},
  video:'assets/yudu/chenhe-invitation-v011.mp4',
  historicalNote:'1934年10月，中央红军在于都集结，分批渡过于都河，开始长征。本作从其中一支队伍的虚构经历展开；不将于都表述为所有红军队伍唯一的长征出发地。',
  sources:[{title:'红军长征集结地为何选择于都 · 中国共产党新闻网',url:'https://cpc.people.com.cn/n1/2024/1011/c443712-40336727.html'}]
 };
 data.legacyStories={10:typeof module==='object'&&module.exports?require('./story-legacy-v010.js'):root.MARCH_LEGACY_V010,11:typeof module==='object'&&module.exports?require('./story-legacy-v011.js'):root.MARCH_LEGACY_V011,12:typeof module==='object'&&module.exports?require('./story-legacy-v012.js'):root.MARCH_LEGACY_V012};
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
 Object.assign(data.chapters.find(c=>c.id==='luding'),{button:'翻开夹金山这一页',summary:'桥头让出通路，下一程是更高的山'});
 nodes.push(...late.nodes);data.chapters.push(...late.chapters);Object.assign(data.images,late.images);Object.assign(data.imageAlt,late.alts);
 Object.assign(data.ambiences,{snow:'assets/audio/chapters/snow-wind-v015.ogg',grass:'assets/audio/chapters/grass-wind-v015.ogg'});
 data.historicalNote="六站故事以1934年10月于都出发为起点，经湘江、遵义及沿途江河，越过夹金山、走出草地，抵达1935年的陕北吴起，并以1936年会宁、将台堡会师作为尾声；人物与具体经历为虚构，主角不参与军事决策或夺桥战斗，这条叙事路径也不能代表各路红军的全部路线";
 if(typeof module==='object'&&module.exports)module.exports=data;else root.YUDU_DATA=data;
})(typeof window==='undefined'?globalThis:window);
