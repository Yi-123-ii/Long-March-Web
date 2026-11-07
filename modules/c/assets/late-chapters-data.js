(function(root){
 'use strict';
 const t=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const f=(id,text,scene,next)=>({id,speaker:'行军纪事',text,scene,next,mode:'fact'});
 const nodes=[
  {
    "id": "snow-arrive",
    "speaker": "旁白",
    "text": "陈禾把绳子绕上铺盖，刚一收紧，短的那头就缩了进去。我伸手替他压住，他只好松开绳子重捆。",
    "scene": "chenhe-mountain-pack-first",
    "next": "snow-hold-pack",
    "mode": "observation",
    "chapter": "snow",
    "historicalTab": "中央红军翻越夹金山",
    "narration": {
      "id": "XN040",
      "src": "assets/audio/xiaoman-narration-v039/XN040.mp3",
      "duration": 8.4525,
      "cues": [
        {
          "text": "陈禾把绳子绕上铺盖，刚一收紧，短的那头就缩了进去。",
          "start": 0.15750000000000597,
          "end": 4.617500000000007
        },
        {
          "text": "我伸手替他压住，他只好松开绳子重捆。",
          "start": 4.977500000000006,
          "end": 7.917500000000004
        }
      ],
      "sentences": [
        "XN040-01",
        "XN040-02"
      ]
    }
  },
  {
    "id": "snow-hold-pack",
    "text": "你先压住，别松手。",
    "scene": "chenhe-mountain-pack-first",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-ask-home",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-mountain-pack-original6751-v046.mp4",
    "poster": "assets/chapters/chenhe-mountain-pack-first-v046.webp",
    "hold": "assets/chapters/chenhe-mountain-pack-question-v046.webp",
    "duration": 2.125,
    "captionPages": [
      {
        "text": "你先压住，别松手。",
        "start": 0.12,
        "end": 1.48
      }
    ],
    "title": "夹金山山脚，陈禾请小满压住铺盖",
    "filmId": "JS-03",
    "advanceOnEnd": true,
    "mediaEnd": 2.125
  },
  {
    "id": "snow-ask-home",
    "text": "",
    "scene": "chenhe-mountain-pack-question",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "choices": [
      {
        "id": "ask-pack-history",
        "label": "你以前也捆成这样？",
        "next": "snow-ask-home-spoken-v034",
        "legacyNext": "snow-pack"
      }
    ]
  },
  {
    "id": "snow-ask-home-spoken-v034",
    "chapter": "snow",
    "scene": "chenhe-mountain-pack-question",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "你以前也捆成这样？",
    "next": "snow-pack",
    "voice": "assets/audio/xiaoman-v034/XM10.mp3",
    "voiceDuration": 1.9125,
    "voiceId": "XM10",
    "advanceOnEnd": true
  },
  {
    "id": "snow-pack",
    "speaker": "陈禾",
    "text": "在家也得我娘替我重捆。她隔着院子就喊，你又给捆歪了！哎。先别松，马上好了。",
    "scene": "chenhe-mountain-pack-question",
    "next": "snow-nickname",
    "mode": "dialogue",
    "chapter": "snow",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-mountain-pack-original6751-v046.mp4",
    "poster": "assets/chapters/chenhe-mountain-pack-question-v046.webp",
    "hold": "assets/chapters/chenhe-mountain-pack-hold-v046.webp",
    "duration": 10.891667,
    "captionPages": [
      {
        "text": "在家也得我娘替我重捆。",
        "start": 2.46,
        "end": 4.04
      },
      {
        "text": "她隔着院子就喊，",
        "start": 5.04,
        "end": 5.82
      },
      {
        "text": "你又给捆歪了！",
        "start": 6.26,
        "end": 7.06
      },
      {
        "text": "哎。",
        "start": 10.32,
        "end": 10.64
      },
      {
        "text": "先别松，马上好了。",
        "start": 11.28,
        "end": 12.42
      }
    ],
    "title": "陈禾说起在家时母亲帮他捆铺盖",
    "filmId": "JS-03",
    "advanceOnEnd": true,
    "mediaStart": 2.125,
    "mediaEnd": 13.016667
  },
  {
    "id": "snow-nickname",
    "chapter": "snow",
    "scene": "chenhe-mountain-pack-hold",
    "mode": "thought",
    "text": "",
    "next": "snow-nickname-spoken-v034"
  },
  {
    "id": "snow-nickname-spoken-v034",
    "chapter": "snow",
    "scene": "chenhe-mountain-pack-hold",
    "mode": "thought",
    "text": "",
    "next": "snow-respond-name"
  },
  {
    "id": "snow-respond-name",
    "chapter": "snow",
    "scene": "chenhe-mountain-pack-hold",
    "mode": "thought",
    "text": "",
    "next": "snow-ready"
  },
  {
    "id": "snow-ready",
    "text": "",
    "scene": "chenhe-mountain-pack-hold",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "climb",
        "label": "背好铺盖，跟随队伍上山。",
        "next": "snow-wet-v034",
        "legacyNext": "snow-path"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-path",
    "speaker": "心声",
    "text": "踩进雪里以后，抬脚也费劲。我沿着前人的脚印往上走，走几步就得停下来喘气；陈禾已经站在路边，肩膀一下一下地起伏。我挪过去，他还看着我的肩带。",
    "scene": "snow-path",
    "next": "snow-concern-before",
    "mode": "thought",
    "chapter": "snow",
    "narration": {
      "id": "XN042",
      "src": "assets/audio/xiaoman-narration-v039/XN042.mp3",
      "duration": 14.7625,
      "cues": [
        {
          "text": "踩进雪里以后，抬脚也费劲。",
          "start": 0.2674999999999983,
          "end": 2.6074999999999875
        },
        {
          "text": "我沿着前人的脚印往上走，走几步就得停下来喘气；",
          "start": 3.2674999999999983,
          "end": 7.447499999999991
        },
        {
          "text": "陈禾已经站在路边，肩膀一下一下地起伏。",
          "start": 7.907499999999999,
          "end": 11.184999999999986
        },
        {
          "text": "我挪过去，他还看着我的肩带。",
          "start": 11.367499999999993,
          "end": 14.287499999999994
        }
      ],
      "sentences": [
        "XN042-01",
        "XN042-02",
        "XN042-03",
        "XN042-04"
      ]
    }
  },
  {
    "id": "snow-concern-before",
    "speaker": "旁白",
    "text": "",
    "scene": "snow-concern-first",
    "next": "snow-concern",
    "mode": "observation",
    "chapter": "snow"
  },
  {
    "id": "snow-concern",
    "speaker": "陈禾",
    "text": "你这……带子又……",
    "scene": "snow-concern-first",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/chapters/snow-concern-v015.mp4",
    "poster": "assets/chapters/snow-concern-first-v015.png",
    "hold": "assets/chapters/snow-concern-hold-v015.png",
    "duration": 5.088005,
    "title": "雪山上，陈禾还想照应你",
    "replayLabel": "重看雪山",
    "next": "snow-choice",
    "advanceOnEnd": true,
    "chapter": "snow"
  },
  {
    "id": "snow-choice",
    "speaker": "心声",
    "mode": "thought",
    "scene": "snow-concern-hold",
    "text": "他抬起的手又落回胸前。",
    "choices": [
      {
        "id": "support",
        "label": "我这儿没事，你先搭住我。",
        "next": "snow-choice-spoken-v034"
      },
      {
        "id": "call",
        "label": "叫他“阿禾”，等他应声。",
        "next": "snow-b-call"
      }
    ],
    "chapter": "snow",
    "narration": {
      "id": "XN043",
      "src": "assets/audio/xiaoman-narration-v039/XN043.mp3",
      "duration": 2.3475,
      "cues": [
        {
          "text": "他抬起的手又落回胸前。",
          "start": 0.125,
          "end": 2.1850000000000023
        }
      ],
      "sentences": [
        "XN043-01"
      ]
    }
  },
  {
    "id": "snow-choice-spoken-v034",
    "chapter": "snow",
    "scene": "snow-concern-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我这儿没事，你先搭住我。",
    "next": "snow-a-route",
    "voice": "assets/audio/xiaoman-v034/XM12.mp3",
    "voiceDuration": 2.385,
    "voiceId": "XM12"
  },
  {
    "id": "snow-a-route",
    "speaker": "旁白",
    "text": "",
    "scene": "snow-concern-hold",
    "next": "snow-a-hand",
    "mode": "observation",
    "routes": [
      {
        "choice": "choice",
        "equals": "help",
        "next": "snow-a-help"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-a-hand",
    "speaker": "小满",
    "text": "手给我，你先搭过来。",
    "scene": "snow-concern-hold",
    "next": "snow-a-hand-chen",
    "mode": "dialogue",
    "chapter": "snow",
    "voice": "assets/audio/xiaoman-v034/XM13.mp3",
    "voiceDuration": 2.1825,
    "voiceId": "XM13"
  },
  {
    "id": "snow-a-hand-chen",
    "text": "你自己站稳了。",
    "scene": "snow-concern-hold",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-a-hand-yudu",
    "stageDirection": "抬头",
    "voice": "assets/audio/character-voices-v049/CH01.mp3",
    "voiceId": "CH01",
    "voiceDuration": 1.57,
    "voiceCues": [
      {
        "text": "你自己站稳了。",
        "start": 0.24000000000000005,
        "end": 1.04
      }
    ]
  },
  {
    "id": "snow-a-hand-yudu",
    "text": "你在于都拉我的时候，可没这么客气。",
    "scene": "snow-concern-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-a-hand-step",
    "voice": "assets/audio/xiaoman-v034/XM14.mp3",
    "voiceDuration": 3.02,
    "voiceId": "XM14"
  },
  {
    "id": "snow-a-hand-step",
    "text": "他把手搭上来，肩上一沉，我赶紧握住他的胳膊。两个人站稳以后，才踩着脚印往前挪。",
    "chapter": "snow",
    "mode": "observation",
    "speaker": "旁白",
    "scene": "snow-path",
    "next": "snow-a-steady",
    "narration": {
      "id": "XN044",
      "src": "assets/audio/xiaoman-narration-v039/XN044.mp3",
      "duration": 8.4675,
      "cues": [
        {
          "text": "他把手搭上来，肩上一沉，我赶紧握住他的胳膊。",
          "start": 0,
          "end": 4.5
        },
        {
          "text": "两个人站稳以后，才踩着脚印往前挪。",
          "start": 4.9399999999999995,
          "end": 7.98
        }
      ],
      "sentences": [
        "XN044-01",
        "XN044-02"
      ]
    }
  },
  {
    "id": "snow-a-help",
    "speaker": "小满",
    "text": "我站得住，你搭这儿。",
    "scene": "snow-concern-hold",
    "next": "snow-a-help-yudu",
    "mode": "dialogue",
    "chapter": "snow",
    "voice": "assets/audio/xiaoman-v034/XM15.mp3",
    "voiceDuration": 1.9875,
    "voiceId": "XM15"
  },
  {
    "id": "snow-a-help-yudu",
    "text": "你之前在于都也是这么说的。",
    "scene": "snow-concern-hold",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-a-help-reply",
    "voice": "assets/audio/character-voices-v049/CH02.mp3",
    "voiceId": "CH02",
    "voiceDuration": 2.24,
    "voiceCues": [
      {
        "text": "你之前在于都也是这么说的。",
        "start": 0.27,
        "end": 2.11
      }
    ]
  },
  {
    "id": "snow-a-help-reply",
    "text": "那个人的包我不是接住了？你先搭过来再说。",
    "scene": "snow-concern-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-a-help-step",
    "voice": "assets/audio/xiaoman-v034/XM16.mp3",
    "voiceDuration": 4.02,
    "voiceId": "XM16"
  },
  {
    "id": "snow-a-help-step",
    "text": "陈禾抓住我的肩带，先试着迈了一步。我托住他的胳膊，等他把脚落稳，再一起往前挪。",
    "chapter": "snow",
    "mode": "observation",
    "speaker": "旁白",
    "scene": "snow-path",
    "next": "snow-a-steady",
    "narration": {
      "id": "XN045",
      "src": "assets/audio/xiaoman-narration-v039/XN045.mp3",
      "duration": 8.0425,
      "cues": [
        {
          "text": "陈禾抓住我的肩带，先试着迈了一步。",
          "start": 0.192499999999999,
          "end": 2.9725
        },
        {
          "text": "我托住他的胳膊，等他把脚落稳，再一起往前挪。",
          "start": 3.5725,
          "end": 7.592499999999999
        }
      ],
      "sentences": [
        "XN045-01",
        "XN045-02"
      ]
    }
  },
  {
    "id": "snow-a-steady",
    "speaker": "旁白",
    "text": "",
    "scene": "snow-path",
    "next": "snow-shelter-before",
    "mode": "observation",
    "chapter": "snow"
  },
  {
    "id": "snow-b-call",
    "speaker": "小满",
    "text": "阿禾，你听得见吗？",
    "scene": "snow-concern-hold",
    "next": "snow-b-nod",
    "mode": "dialogue",
    "chapter": "snow",
    "voice": "assets/audio/xiaoman-v034/XM17.mp3",
    "voiceDuration": 2.24,
    "voiceId": "XM17"
  },
  {
    "id": "snow-b-nod",
    "text": "陈禾点头。",
    "scene": "snow-concern-hold",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "snow",
    "next": "snow-b-insist",
    "narration": {
      "id": "XN046",
      "src": "assets/audio/xiaoman-narration-v039/XN046.mp3",
      "duration": 1.66,
      "cues": [
        {
          "text": "陈禾点头。",
          "start": 0.19000000000000128,
          "end": 1.2700000000000031
        }
      ],
      "sentences": [
        "XN046-01"
      ]
    }
  },
  {
    "id": "snow-b-insist",
    "text": "别光点头，应我一声。",
    "scene": "snow-concern-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-b-heard",
    "voice": "assets/audio/xiaoman-v034/XM18.mp3",
    "voiceDuration": 2.49,
    "voiceId": "XM18"
  },
  {
    "id": "snow-b-heard",
    "text": "听见了，你别喊那么大声。",
    "scene": "snow-concern-hold",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-b-answer",
    "voice": "assets/audio/character-voices-v049/CH03.mp3",
    "voiceId": "CH03",
    "voiceDuration": 2.32,
    "voiceCues": [
      {
        "text": "听见了，你别喊那么大声。",
        "start": 0.1899999999999995,
        "end": 1.9699999999999998
      }
    ]
  },
  {
    "id": "snow-b-answer",
    "speaker": "心声",
    "text": "他说到后头，声音被风盖住了。我往近处挪了挪，等他喘匀一点，又叫了一声。",
    "scene": "snow-path",
    "next": "snow-b-again",
    "mode": "thought",
    "chapter": "snow",
    "narration": {
      "id": "XN047",
      "src": "assets/audio/xiaoman-narration-v039/XN047.mp3",
      "duration": 7.6075,
      "cues": [
        {
          "text": "他说到后头，声音被风盖住了。",
          "start": 0.10999999999999943,
          "end": 2.849999999999998
        },
        {
          "text": "我往近处挪了挪，等他喘匀一点，又叫了一声。",
          "start": 3.289999999999999,
          "end": 7.229999999999997
        }
      ],
      "sentences": [
        "XN047-01",
        "XN047-02"
      ]
    }
  },
  {
    "id": "snow-b-again",
    "text": "阿禾？",
    "scene": "snow-concern-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-b-here",
    "voice": "assets/audio/xiaoman-v034/XM19.mp3",
    "voiceDuration": 1.4525,
    "voiceId": "XM19"
  },
  {
    "id": "snow-b-here",
    "text": "在呢。",
    "scene": "snow-concern-hold",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-shelter-before",
    "stageDirection": "抬眼",
    "voice": "assets/audio/character-voices-v049/CH04.mp3",
    "voiceId": "CH04",
    "voiceDuration": 0.6025,
    "voiceCues": [
      {
        "text": "在呢。",
        "start": 0.23000000000000043,
        "end": 0.5100000000000007
      }
    ]
  },
  {
    "id": "snow-shelter-before",
    "speaker": "心声",
    "text": "绕到石头后面，风声小了些，陈禾扶着包坐下。我解开水壶，壶口冻住了，晃了两下也倒不出水，只好重新揣进衣里。他松开勒在掌心的绳子，低头揉了揉手。",
    "scene": "snow-shelter-first",
    "next": "snow-ask-better",
    "mode": "thought",
    "chapter": "snow",
    "narration": {
      "id": "XN048",
      "src": "assets/audio/xiaoman-narration-v039/XN048.mp3",
      "duration": 15.77,
      "cues": [
        {
          "text": "绕到石头后面，风声小了些，陈禾扶着包坐下。",
          "start": 0.14250000000000185,
          "end": 4.462499999999999
        },
        {
          "text": "我解开水壶，壶口冻住了，晃了两下也倒不出水，只好重新揣进衣里。",
          "start": 5.022500000000001,
          "end": 11.382499999999997
        },
        {
          "text": "他松开勒在掌心的绳子，低头揉了揉手。",
          "start": 12.102500000000003,
          "end": 15.502500000000001
        }
      ],
      "sentences": [
        "XN048-01",
        "XN048-02",
        "XN048-03"
      ]
    }
  },
  {
    "id": "snow-ask-better",
    "text": "",
    "scene": "snow-shelter-first",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "ask-better",
        "label": "现在好点没有？",
        "next": "snow-ask-better-spoken-v034"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-ask-better-spoken-v034",
    "chapter": "snow",
    "scene": "snow-shelter-first",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "现在好点没有？",
    "next": "snow-shelter",
    "voice": "assets/audio/xiaoman-v034/XM20.mp3",
    "voiceDuration": 1.215,
    "voiceId": "XM20"
  },
  {
    "id": "snow-shelter",
    "speaker": "陈禾",
    "text": "嗯。你也歇会儿，别光站我跟前。",
    "scene": "snow-shelter-first",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/chapters/snow-shelter-v015.mp4",
    "poster": "assets/chapters/snow-shelter-first-v015.png",
    "hold": "assets/chapters/snow-shelter-hold-v015.png",
    "duration": 4.096009,
    "title": "背风处缓过一口气",
    "replayLabel": "重看歇息",
    "next": "snow-rest",
    "advanceOnEnd": true,
    "chapter": "snow"
  },
  {
    "id": "snow-rest",
    "speaker": "心声",
    "mode": "thought",
    "scene": "snow-shelter-hold",
    "text": "",
    "choices": [
      {
        "id": "keep-climbing",
        "label": "在他旁边坐下。",
        "next": "snow-continue"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-continue",
    "text": "前头的人陆续起身，拍掉裤腿上的雪。陈禾压低帽檐，扶着石头站起来，等我背好铺盖才往前走。",
    "scene": "snow-path",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "snow",
    "next": "snow-continue-choice",
    "narration": {
      "id": "XN049",
      "src": "assets/audio/xiaoman-narration-v039/XN049.mp3",
      "duration": 9.435,
      "cues": [
        {
          "text": "前头的人陆续起身，拍掉裤腿上的雪。",
          "start": 0.17249999999999943,
          "end": 3.292500000000004
        },
        {
          "text": "陈禾压低帽檐，扶着石头站起来，等我背好铺盖才往前走。",
          "start": 3.9125000000000014,
          "end": 9.012500000000003
        }
      ],
      "sentences": [
        "XN049-01",
        "XN049-02"
      ]
    }
  },
  {
    "id": "snow-continue-choice",
    "text": "",
    "scene": "snow-path",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "keep-going",
        "label": "随队继续上山。",
        "next": "snow-end"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-end",
    "scene": "snow-path",
    "checkpoint": true,
    "next": "grass-arrive",
    "chapter": "snow"
  },
  {
    "id": "grass-arrive",
    "speaker": "旁白",
    "text": "我端着碗，喝了两口稀汤才见到碗底那几粒麦子。灶底的湿草烧不起来，烟倒吹得人睁不开眼。陈禾解开一只鞋，脚刚往外抽了一半，又停住，扶着膝盖把鞋穿了回去。",
    "scene": "grass-meal",
    "next": "grass-meal",
    "mode": "observation",
    "chapter": "grass",
    "historicalTab": "红军穿越草地，缺粮、湿冷与沼泽影响行军",
    "narration": {
      "id": "XN050",
      "src": "assets/audio/xiaoman-narration-v039/XN050.mp3",
      "duration": 15.875,
      "cues": [
        {
          "text": "我端着碗，喝了两口稀汤才见到碗底那几粒麦子。",
          "start": 0.197499999999998,
          "end": 4.297499999999999
        },
        {
          "text": "灶底的湿草烧不起来，烟倒吹得人睁不开眼。",
          "start": 5.077500000000001,
          "end": 8.5775
        },
        {
          "text": "陈禾解开一只鞋，脚刚往外抽了一半，又停住，扶着膝盖把鞋穿了回去。",
          "start": 9.237499999999997,
          "end": 15.257499999999993
        }
      ],
      "sentences": [
        "XN050-01",
        "XN050-02",
        "XN050-03"
      ]
    }
  },
  {
    "id": "grass-meal",
    "speaker": "心声",
    "text": "",
    "scene": "grass-meal",
    "next": "grass-sit",
    "mode": "thought",
    "chapter": "grass"
  },
  {
    "id": "grass-sit",
    "text": "",
    "scene": "grass-meal",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "sit-down",
        "label": "把碗放稳，在旁边坐下。",
        "next": "grass-grain-v034"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-choice",
    "speaker": "心声",
    "mode": "thought",
    "scene": "grass-camp",
    "text": "卫生员蹲在铺盖旁，替躺着的战士掖好衣服。接应队的人从外面回来，还没放下行装，就在找能跟着出去的人，草地上还有同志没接回来。陈禾背起包，站到接应队旁边。我往铺盖边靠了靠，给卫生员让出路。",
    "choices": [
      {
        "id": "stay",
        "label": "留在营地，照看这位战士。",
        "next": "grass-a-route"
      },
      {
        "id": "rescue",
        "label": "跟陈禾随接应队出去。",
        "next": "grass-b-path"
      }
    ],
    "chapter": "grass",
    "narration": {
      "id": "XN052",
      "src": "assets/audio/xiaoman-narration-v041/XN052.mp3",
      "duration": 18.1475,
      "cues": [
        {
          "text": "卫生员蹲在铺盖旁，替躺着的战士掖好衣服。",
          "start": 0.37999999999999967,
          "end": 4.12
        },
        {
          "text": "接应队的人从外面回来，还没放下行装，就在找能跟着出去的人，草地上还有同志没接回来。",
          "start": 4.9,
          "end": 11.58
        },
        {
          "text": "陈禾背起包，站到接应队旁边。",
          "start": 12.18,
          "end": 14.46
        },
        {
          "text": "我往铺盖边靠了靠，给卫生员让出路。",
          "start": 15.06,
          "end": 17.7
        }
      ],
      "sentences": [
        "XN052-01",
        "XN052-02",
        "XN052-03",
        "XN052-04"
      ]
    }
  },
  {
    "id": "grass-a-route",
    "speaker": "心声",
    "text": "我在铺盖边蹲下，把水往陆生手边推了推。他睁开眼，手还攥着盖在肩上的衣服。",
    "scene": "lusheng-grass",
    "next": "grass-a-old",
    "mode": "thought",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "grass-a-new"
      }
    ],
    "chapter": "grass",
    "narration": {
      "id": "XN053",
      "src": "assets/audio/xiaoman-narration-v041/XN053.mp3",
      "duration": 6.8725,
      "cues": [
        {
          "text": "我在铺盖边蹲下，把水往陆生手边推了推。",
          "start": 0.23249999999999815,
          "end": 3.3125
        },
        {
          "text": "他睁开眼，手还攥着盖在肩上的衣服。",
          "start": 3.8324999999999996,
          "end": 6.432499999999997
        }
      ],
      "sentences": [
        "XN053-01",
        "XN053-02"
      ]
    }
  },
  {
    "id": "grass-a-old",
    "speaker": "陆生",
    "text": "小满？又是你啊。",
    "scene": "lusheng-grass",
    "next": "grass-a-sit-close",
    "mode": "dialogue",
    "chapter": "grass",
    "voice": "assets/audio/character-voices-v049/LS01.mp3",
    "voiceId": "LS01",
    "voiceDuration": 2.46,
    "voiceCues": [
      {
        "text": "小满？又是你啊。",
        "start": 0.24500000000000005,
        "end": 2.2
      }
    ]
  },
  {
    "id": "grass-a-sit-close",
    "text": "",
    "scene": "lusheng-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "sit-close",
        "label": "坐近些，让他看清。",
        "next": "grass-a-cuff"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-a-cuff",
    "text": "你那袖口补好了没有？",
    "scene": "lusheng-grass",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-a-show-cuff",
    "voice": "assets/audio/character-voices-v049/LS02.mp3",
    "voiceId": "LS02",
    "voiceDuration": 2.05,
    "voiceCues": [
      {
        "text": "你那袖口补好了没有？",
        "start": 0.4800000000000004,
        "end": 1.6000000000000005
      }
    ]
  },
  {
    "id": "grass-a-show-cuff",
    "text": "",
    "scene": "lusheng-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "show-cuff",
        "label": "把补过的地方给他看。",
        "next": "grass-a-seen"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-a-seen",
    "text": "陆生看过袖口，点了点头，把攥着衣服的手松开。",
    "scene": "lusheng-grass",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-a-night",
    "narration": {
      "id": "XN054",
      "src": "assets/audio/xiaoman-narration-v041/XN054.mp3",
      "duration": 4.54,
      "cues": [
        {
          "text": "陆生看过袖口，点了点头，把攥着衣服的手松开。",
          "start": 0.16000000000000014,
          "end": 4.080000000000002
        }
      ],
      "sentences": [
        "XN054-01"
      ]
    }
  },
  {
    "id": "grass-a-new",
    "speaker": "陆生",
    "text": "你叫什么名字？",
    "scene": "lusheng-grass",
    "next": "grass-a-tell-name",
    "mode": "dialogue",
    "chapter": "grass",
    "voice": "assets/audio/character-voices-v049/LS03.mp3",
    "voiceId": "LS03",
    "voiceDuration": 1.5775,
    "voiceCues": [
      {
        "text": "你叫什么名字？",
        "start": 0.1900000000000004,
        "end": 1.21
      }
    ]
  },
  {
    "id": "grass-a-tell-name",
    "text": "",
    "scene": "lusheng-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "say-name",
        "label": "我叫小满。你呢？",
        "next": "grass-a-tell-name-spoken-v034"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-a-tell-name-spoken-v034",
    "chapter": "grass",
    "scene": "lusheng-grass",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我叫小满。你呢？",
    "next": "grass-a-new-repeat",
    "voice": "assets/audio/xiaoman-v034/XM21.mp3",
    "voiceDuration": 1.87,
    "voiceId": "XM21"
  },
  {
    "id": "grass-a-new-repeat",
    "text": "我叫陆生。刚才没听清，你叫小什么来着？",
    "scene": "lusheng-grass",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-a-repeat-name",
    "voice": "assets/audio/character-voices-v049/LS04.mp3",
    "voiceId": "LS04",
    "voiceDuration": 4.0425,
    "voiceCues": [
      {
        "text": "我叫陆生。",
        "start": 0.07249999999999979,
        "end": 0.9524999999999997
      },
      {
        "text": "刚才没听清，你叫小什么来着？",
        "start": 1.7924999999999995,
        "end": 3.892499999999999
      }
    ]
  },
  {
    "id": "grass-a-repeat-name",
    "text": "",
    "scene": "lusheng-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "repeat-name",
        "label": "小满。",
        "next": "grass-a-repeat-name-spoken-v034"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-a-repeat-name-spoken-v034",
    "chapter": "grass",
    "scene": "lusheng-grass",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "小满。",
    "next": "grass-a-new-nod",
    "voice": "assets/audio/xiaoman-v034/XM22.mp3",
    "voiceDuration": 0.89,
    "voiceId": "XM22"
  },
  {
    "id": "grass-a-new-nod",
    "text": "陆生点头，松开压着铺盖的手。",
    "scene": "lusheng-grass",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-a-night",
    "narration": {
      "id": "XN055",
      "src": "assets/audio/xiaoman-narration-v041/XN055.mp3",
      "duration": 2.9525,
      "cues": [
        {
          "text": "陆生点头，松开压着铺盖的手。",
          "start": 0,
          "end": 2.6799999999999997
        }
      ],
      "sentences": [
        "XN055-01"
      ]
    }
  },
  {
    "id": "grass-a-night",
    "speaker": "心声",
    "text": "我端起水碗，往陆生那边挪了一点。",
    "scene": "lusheng-night-first",
    "next": "grass-a-water",
    "mode": "thought",
    "chapter": "grass",
    "narration": {
      "id": "XN056",
      "src": "assets/audio/xiaoman-narration-v041/XN056.mp3",
      "duration": 3.0075,
      "cues": [
        {
          "text": "我端起水碗，往陆生那边挪了一点。",
          "start": 0,
          "end": 2.6074999999999946
        }
      ],
      "sentences": [
        "XN056-01"
      ]
    }
  },
  {
    "id": "grass-a-water",
    "speaker": "陆生",
    "text": "放下吧，我想喝了叫你。",
    "scene": "lusheng-night-first",
    "next": "grass-a-return",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/chapters/lusheng-night-v020.mp4",
    "poster": "assets/chapters/lusheng-night-first-v020.png",
    "hold": "assets/chapters/lusheng-night-hold-v020.png",
    "duration": 6.08,
    "title": "草地夜里，陆生醒来让小满放下水碗",
    "replayLabel": "重看陆生",
    "advanceOnEnd": true,
    "chapter": "grass",
    "captionCues": [
      {
        "text": "放下吧，",
        "start": 1.68,
        "end": 2.5
      },
      {
        "text": "我想喝了",
        "start": 3.47,
        "end": 4.45
      },
      {
        "text": "叫你。",
        "start": 5.14,
        "end": 5.9
      }
    ]
  },
  {
    "id": "grass-a-return",
    "speaker": "心声",
    "text": "我把水放回他手边。后半夜，陆生醒过两回。有一回他伸手摸到碗边，我托着碗让他喝了几口，等他躺好，再把水碗放回原处。卫生员过来摸了摸他的额头，蹲了一会儿才走。我跟着看过去，盖在陆生肩头的衣服又滑下来了。",
    "scene": "lusheng-night-hold",
    "next": "grass-a-cover",
    "mode": "thought",
    "chapter": "grass",
    "narration": {
      "id": "XN057",
      "src": "assets/audio/xiaoman-narration-v041/XN057.mp3",
      "duration": 21.235,
      "cues": [
        {
          "text": "我把水放回他手边。",
          "start": 0.22000000000000597,
          "end": 1.5400000000000063
        },
        {
          "text": "后半夜，陆生醒过两回。",
          "start": 2.219999999999999,
          "end": 4.780000000000001
        },
        {
          "text": "有一回他伸手摸到碗边，我托着碗让他喝了几口，等他躺好，再把水碗放回原处。",
          "start": 5.540000000000006,
          "end": 11.540000000000006
        },
        {
          "text": "卫生员过来摸了摸他的额头，蹲了一会儿才走。",
          "start": 12.840000000000003,
          "end": 15.920000000000002
        },
        {
          "text": "我跟着看过去，盖在陆生肩头的衣服又滑下来了。",
          "start": 16.500000000000007,
          "end": 20.980000000000004
        }
      ],
      "sentences": [
        "XN057-01",
        "XN057-02",
        "XN057-03",
        "XN057-04",
        "XN057-05"
      ]
    }
  },
  {
    "id": "grass-a-cover",
    "text": "",
    "scene": "lusheng-night-hold",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "cover-lusheng",
        "label": "替他把衣服盖好。",
        "next": "grass-a-chen-return"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-a-chen-return",
    "text": "卫生员把人接过去，陈禾才卸下背上的包。他还撑着膝盖没直起身，我往里挪了挪。",
    "scene": "chenhe-grass",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-a-room",
    "narration": {
      "id": "XN058",
      "src": "assets/audio/xiaoman-narration-v041/XN058.mp3",
      "duration": 7.055,
      "cues": [
        {
          "text": "卫生员把人接过去，陈禾才卸下背上的包。",
          "start": 0,
          "end": 3.404999999999994
        },
        {
          "text": "他还撑着膝盖没直起身，我往里挪了挪。",
          "start": 3.767499999999991,
          "end": 6.884999999999998
        }
      ],
      "sentences": [
        "XN058-01",
        "XN058-02"
      ]
    }
  },
  {
    "id": "grass-a-room",
    "text": "",
    "scene": "chenhe-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "make-room",
        "label": "拍拍身边的空位，让陈禾坐下。",
        "next": "grass-dawn-route"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-b-path",
    "speaker": "心声",
    "text": "前面的人用长棍试着落脚，回身让我踩他的脚印。我刚迈过去，旁边的草皮便陷下一块，水从裂口冒出来。再往前，草里有人应了一声，紧接着咳起来。",
    "scene": "grass-path",
    "next": "grass-b-call-out",
    "mode": "thought",
    "chapter": "grass",
    "narration": {
      "id": "XN059",
      "src": "assets/audio/xiaoman-narration-v041/XN059.mp3",
      "duration": 12.895,
      "cues": [
        {
          "text": "前面的人用长棍试着落脚，回身让我踩他的脚印。",
          "start": 0,
          "end": 3.832499999999996
        },
        {
          "text": "我刚迈过去，旁边的草皮便陷下一块，水从裂口冒出来。",
          "start": 4.135000000000005,
          "end": 8.852500000000006
        },
        {
          "text": "再往前，草里有人应了一声，紧接着咳起来。",
          "start": 9.017500000000013,
          "end": 12.532500000000013
        }
      ],
      "sentences": [
        "XN059-01",
        "XN059-02",
        "XN059-03"
      ]
    }
  },
  {
    "id": "grass-b-call-out",
    "text": "",
    "scene": "grass-path",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "call-out",
        "label": "停下来，朝声音那边喊话。",
        "next": "grass-b-names"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-b-foot",
    "speaker": "心声",
    "text": "同行的人把铺盖接过去，又换下陈禾，扶住那位战士。陈禾刚松手，身子也跟着晃了一下，我连忙托住他的胳膊。",
    "scene": "grass-rescue-hold-v049",
    "next": "grass-b-support",
    "mode": "thought",
    "chapter": "grass",
    "narration": {
      "id": "XN062",
      "src": "assets/audio/xiaoman-narration-v041/XN062.mp3",
      "duration": 12.7025,
      "cues": [
        {
          "text": "同行的人把铺盖接过去，又换下陈禾，扶住那位战士。",
          "start": 0.3400000000000003,
          "end": 5.58
        },
        {
          "text": "陈禾刚松手，身子也跟着晃了一下，我连忙托住他的胳膊。",
          "start": 6.719999999999999,
          "end": 12.239999999999998
        }
      ],
      "sentences": [
        "XN062-01",
        "XN062-02"
      ]
    }
  },
  {
    "id": "grass-b-support",
    "text": "",
    "scene": "grass-path",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "support-chen",
        "label": "让陈禾搭住自己，继续跟队伍走。",
        "next": "grass-b-return"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-b-names",
    "speaker": "心声",
    "text": "接应的人扶住他的胳膊，把人带到脚下稳些的地方，陈禾才凑过去让他搭住肩。走出没几步，他又站不住了，只能靠着陈禾缓一缓。他抹掉嘴边的草屑，抬头看向我。",
    "scene": "grass-rescue-first-v049",
    "next": "grass-b-ask-names",
    "mode": "thought",
    "chapter": "grass",
    "narration": {
      "id": "XN060",
      "src": "assets/audio/xiaoman-narration-v041/XN060.mp3",
      "duration": 14.521583333333334,
      "cues": [
        {
          "text": "接应的人扶住他的胳膊，把人带到脚下稳些的地方，陈禾才凑过去让他搭住肩。",
          "start": 0.31750000000000966,
          "end": 5.877500000000012
        },
        {
          "text": "走出没几步，他又站不住了，只能靠着陈禾缓一缓。",
          "start": 5.987500000000011,
          "end": 9.717500000000015
        },
        {
          "text": "他抹掉嘴边的草屑，抬头看向我。",
          "start": 10.197500000000005,
          "end": 12.637500000000017
        }
      ],
      "sentences": [
        "XN060-01",
        "XN060-02",
        "XN060-03"
      ]
    }
  },
  {
    "id": "grass-b-ask-names",
    "text": "你们俩叫什么名字？",
    "scene": "grass-rescue-first-v049",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-b-tell-names",
    "video": "assets/chapters/grass-rescue-cd03-v049.mp4",
    "poster": "assets/chapters/grass-rescue-first-v049.webp",
    "hold": "assets/chapters/grass-rescue-question-v049.webp",
    "nativeAudio": true,
    "advanceOnEnd": true,
    "filmId": "CD-03",
    "title": "草地接应，陈禾扶着获救战士同行",
    "duration": 3.6,
    "mediaStart": 0,
    "mediaEnd": 3.6,
    "captionPages": [
      {
        "text": "你们俩叫什么名字？",
        "start": 1.65,
        "end": 2.86
      }
    ]
  },
  {
    "id": "grass-b-tell-names",
    "text": "",
    "scene": "grass-rescue-question-v049",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "tell-names",
        "label": "我叫小满，他叫陈禾。",
        "next": "grass-b-tell-names-spoken-v034"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-b-tell-names-spoken-v034",
    "chapter": "grass",
    "scene": "grass-rescue-question-v049",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我叫小满，他叫陈禾。",
    "next": "grass-b-home-street",
    "voice": "assets/audio/xiaoman-v034/XM23.mp3",
    "voiceDuration": 2.135,
    "voiceId": "XM23",
    "advanceOnEnd": true
  },
  {
    "id": "grass-b-home-street",
    "text": "等出去了，到我家坐坐。我家那条街，街口有家卖吃的——",
    "scene": "grass-rescue-question-v049",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-b-breath",
    "video": "assets/chapters/grass-rescue-cd03-v049.mp4",
    "poster": "assets/chapters/grass-rescue-question-v049.webp",
    "hold": "assets/chapters/grass-rescue-breath-v049.webp",
    "nativeAudio": true,
    "advanceOnEnd": true,
    "filmId": "CD-03",
    "title": "草地接应，陈禾扶着获救战士同行",
    "duration": 6.6,
    "mediaStart": 3.6,
    "mediaEnd": 10.2,
    "captionPages": [
      {
        "text": "等出去了，",
        "start": 4.54,
        "end": 5.4
      },
      {
        "text": "到我家坐坐。",
        "start": 5.7,
        "end": 6.68
      },
      {
        "text": "我家那条街，",
        "start": 7.14,
        "end": 8.04
      },
      {
        "text": "街口有家卖吃的——",
        "start": 8.4,
        "end": 10.04
      }
    ]
  },
  {
    "id": "grass-b-breath",
    "text": "他停下来，扶住陈禾的胳膊。",
    "scene": "grass-rescue-breath-v049",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-b-rest-first",
    "narration": {
      "id": "XN061",
      "src": "assets/audio/xiaoman-narration-v041/XN061.mp3",
      "duration": 3.82,
      "cues": [
        {
          "text": "他停下来，扶住陈禾的胳膊。",
          "start": 0,
          "end": 3.32
        }
      ],
      "sentences": [
        "XN061-01"
      ]
    },
    "advanceOnEnd": true
  },
  {
    "id": "grass-b-rest-first",
    "text": "你先喘口气，回去慢慢说。",
    "scene": "grass-rescue-breath-v049",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-b-foot",
    "video": "assets/chapters/grass-rescue-cd03-v049.mp4",
    "poster": "assets/chapters/grass-rescue-breath-v049.webp",
    "hold": "assets/chapters/grass-rescue-hold-v049.webp",
    "nativeAudio": true,
    "advanceOnEnd": true,
    "filmId": "CD-03",
    "title": "草地接应，陈禾扶着获救战士同行",
    "duration": 4.816667000000001,
    "mediaStart": 10.2,
    "mediaEnd": 15.016667,
    "captionPages": [
      {
        "text": "你先喘口气，",
        "start": 10.25,
        "end": 10.97
      },
      {
        "text": "回去慢慢说。",
        "start": 11.36,
        "end": 12.05
      }
    ]
  },
  {
    "id": "grass-b-return",
    "speaker": "心声",
    "text": "营地方向传来喊声，带路的人应着回头，招呼我们跟上。",
    "scene": "grass-path",
    "next": "grass-b-camp-v034",
    "mode": "thought",
    "chapter": "grass",
    "narration": {
      "id": "XN063",
      "src": "assets/audio/xiaoman-narration-v041/XN063.mp3",
      "duration": 6.3775,
      "cues": [
        {
          "text": "营地方向传来喊声，带路的人应着回头，招呼我们跟上。",
          "start": 0.3774999999999977,
          "end": 5.677499999999998
        }
      ],
      "sentences": [
        "XN063-01"
      ]
    }
  },
  {
    "chapter": "grass",
    "scene": "lusheng-grass",
    "speaker": "旁白",
    "mode": "observation",
    "id": "grass-b-camp-v034",
    "text": "我们走到铺盖旁，躺着的战士听见声音，转过头看了一眼。",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "grass-b-new"
      }
    ],
    "next": "grass-b-old",
    "narration": {
      "id": "XN064",
      "src": "assets/audio/xiaoman-narration-v041/XN064.mp3",
      "duration": 6.375,
      "cues": [
        {
          "text": "我们走到铺盖旁，躺着的战士听见声音，转过头看了一眼。",
          "start": 0.4600000000000044,
          "end": 5.720000000000002
        }
      ],
      "sentences": [
        "XN064-01"
      ]
    }
  },
  {
    "id": "grass-b-old",
    "speaker": "陆生",
    "text": "小满，坐这儿吧。水还剩一点。",
    "scene": "lusheng-grass",
    "next": "grass-b-drink",
    "mode": "dialogue",
    "chapter": "grass",
    "voice": "assets/audio/character-voices-v049/LS05.mp3",
    "voiceId": "LS05",
    "voiceDuration": 2.6875,
    "voiceCues": [
      {
        "text": "小满，坐这儿吧。",
        "start": 0.21000000000000085,
        "end": 1.33
      },
      {
        "text": "水还剩一点。",
        "start": 1.5300000000000011,
        "end": 2.41
      }
    ]
  },
  {
    "id": "grass-b-drink",
    "text": "",
    "scene": "lusheng-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "drink-water",
        "label": "接过水，在铺盖边坐下。",
        "next": "grass-dawn-route"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-b-new",
    "speaker": "陆生",
    "text": "你坐这儿吧。我还不知道你叫什么。",
    "scene": "lusheng-grass",
    "next": "grass-b-player-name",
    "mode": "dialogue",
    "chapter": "grass",
    "voice": "assets/audio/character-voices-v049/LS06.mp3",
    "voiceId": "LS06",
    "voiceDuration": 2.4625,
    "voiceCues": [
      {
        "text": "你坐这儿吧。",
        "start": 0.16249999999999964,
        "end": 0.8224999999999998
      },
      {
        "text": "我还不知道你叫什么。",
        "start": 1.1225000000000005,
        "end": 2.2424999999999997
      }
    ]
  },
  {
    "id": "grass-b-player-name",
    "text": "",
    "scene": "lusheng-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "new-name",
        "label": "我叫小满。你呢？",
        "next": "grass-b-player-name-spoken-v034"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-b-player-name-spoken-v034",
    "chapter": "grass",
    "scene": "lusheng-grass",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我叫小满。你呢？",
    "next": "grass-b-lusheng-name",
    "voice": "assets/audio/xiaoman-v034/XM21.mp3",
    "voiceDuration": 1.87,
    "voiceId": "XM21"
  },
  {
    "id": "grass-b-lusheng-name",
    "text": "我叫陆生。",
    "scene": "lusheng-grass",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-dawn-route",
    "voice": "assets/audio/character-voices-v049/LS07.mp3",
    "voiceId": "LS07",
    "voiceDuration": 1.4125,
    "voiceCues": [
      {
        "text": "我叫陆生。",
        "start": 0.11999999999999922,
        "end": 0.9399999999999995
      }
    ]
  },
  {
    "id": "grass-dawn-route",
    "speaker": "心声",
    "text": "天亮后，我们挪到营地边上歇脚。陈禾坐在我旁边，脚边的空碗倒扣着。",
    "scene": "grass-meal",
    "next": "grass-dawn-yudu",
    "mode": "thought",
    "routes": [
      {
        "choice": "snow-choice",
        "equals": "call",
        "next": "grass-dawn-call"
      }
    ],
    "chapter": "grass",
    "narration": {
      "id": "XN065",
      "src": "assets/audio/xiaoman-narration-v041/XN065.mp3",
      "duration": 8.4775,
      "cues": [
        {
          "text": "天亮后，我们挪到营地边上歇脚。",
          "start": 0.485000000000003,
          "end": 3.645000000000003
        },
        {
          "text": "陈禾坐在我旁边，脚边的空碗倒扣着。",
          "start": 4.2450000000000045,
          "end": 7.884999999999998
        }
      ],
      "sentences": [
        "XN065-01",
        "XN065-02"
      ]
    }
  },
  {
    "id": "grass-dawn-yudu",
    "speaker": "旁白",
    "text": "",
    "scene": "chenhe-grass",
    "next": "grass-dawn-hand",
    "mode": "observation",
    "routes": [
      {
        "choice": "choice",
        "equals": "help",
        "next": "grass-dawn-help"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-dawn-hand",
    "speaker": "陈禾",
    "text": "你那天在于都，手攥得可真紧。",
    "scene": "chenhe-grass",
    "next": "grass-dawn-hand-reply",
    "mode": "dialogue",
    "chapter": "grass",
    "voice": "assets/audio/character-voices-v049/CH06.mp3",
    "voiceId": "CH06",
    "voiceDuration": 3.33,
    "voiceCues": [
      {
        "text": "你那天在于都，手攥得可真紧。",
        "start": 0.2524999999999995,
        "end": 2.8125
      }
    ]
  },
  {
    "id": "grass-dawn-hand-reply",
    "text": "那木板一晃，我两只脚都站不稳，不攥着你怎么办？",
    "scene": "chenhe-grass",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-dawn-hand-joke",
    "voice": "assets/audio/xiaoman-v034/XM24.mp3",
    "voiceDuration": 4.535,
    "voiceId": "XM24"
  },
  {
    "id": "grass-dawn-hand-joke",
    "text": "你倒是攥稳了，再拽两下，我也得跟着下去。",
    "scene": "chenhe-grass",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-dawn-shoes",
    "voice": "assets/audio/character-voices-v049/CH07.mp3",
    "voiceId": "CH07",
    "voiceDuration": 4.595,
    "voiceCues": [
      {
        "text": "你倒是攥稳了，再拽两下，我也得跟着下去。",
        "start": 0.40249999999999986,
        "end": 4.082500000000001
      }
    ]
  },
  {
    "id": "grass-dawn-shoes",
    "text": "",
    "scene": "chenhe-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "loose-shoes",
        "label": "指指他的鞋：你鞋带又松了。",
        "next": "grass-dawn-shoes-spoken-v034"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-dawn-shoes-spoken-v034",
    "chapter": "grass",
    "scene": "chenhe-grass",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "你鞋带又松了。",
    "next": "grass-dawn-tie-shoes",
    "voice": "assets/audio/xiaoman-v034/XM25.mp3",
    "voiceDuration": 1.5275,
    "voiceId": "XM25"
  },
  {
    "id": "grass-dawn-tie-shoes",
    "text": "陈禾低头系鞋带。",
    "scene": "chenhe-grass",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-dawn-end",
    "narration": {
      "id": "XN066",
      "src": "assets/audio/xiaoman-narration-v041/XN066.mp3",
      "duration": 2.5675,
      "cues": [
        {
          "text": "陈禾低头系鞋带。",
          "start": 0.427500000000002,
          "end": 1.9875000000000043
        }
      ],
      "sentences": [
        "XN066-01"
      ]
    }
  },
  {
    "id": "grass-dawn-help",
    "speaker": "心声",
    "text": "绳头又垂到脚边，我刚要去捡，陈禾先伸了手。他让我托一下铺盖，把那截绳头塞进了背带里。",
    "scene": "chenhe-grass",
    "next": "grass-dawn-hold-pack",
    "mode": "thought",
    "chapter": "grass",
    "narration": {
      "id": "XN067",
      "src": "assets/audio/xiaoman-narration-v041/XN067.mp3",
      "duration": 10.65,
      "cues": [
        {
          "text": "绳头又垂到脚边，我刚要去捡，陈禾先伸了手。",
          "start": 0.3999999999999986,
          "end": 5.299999999999997
        },
        {
          "text": "他让我托一下铺盖，把那截绳头塞进了背带里。",
          "start": 6.060000000000002,
          "end": 10.119999999999997
        }
      ],
      "sentences": [
        "XN067-01",
        "XN067-02"
      ]
    }
  },
  {
    "id": "grass-dawn-hold-pack",
    "text": "",
    "scene": "chenhe-grass",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "hold-pack",
        "label": "扶稳铺盖，等他掖好绳头。",
        "next": "grass-dawn-end"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-dawn-call",
    "speaker": "陈禾",
    "text": "你在山上喊那几声，跟我娘似的。以前她隔着田埂喊，我早听见了。就是没玩够，不想回去。",
    "scene": "chenhe-dawn-first",
    "next": "grass-dawn-home",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-dawn-v020.mp4",
    "poster": "assets/chapters/chenhe-dawn-first-v020.png",
    "hold": "assets/chapters/chenhe-dawn-hold-v020.png",
    "duration": 9.088005,
    "title": "天亮后的营地，陈禾说起小时候",
    "replayLabel": "重看田埂的回忆",
    "advanceOnEnd": true,
    "chapter": "grass",
    "captionPages": [
      {
        "text": "你在山上喊那几声，跟我娘似的。",
        "start": 0.23,
        "end": 2.43
      },
      {
        "text": "以前她隔着田埂喊，我早听见了。",
        "start": 3.68,
        "end": 5.66
      },
      {
        "text": "就是没玩够，不想回去。",
        "start": 7.28,
        "end": 8.62
      }
    ]
  },
  {
    "id": "grass-dawn-home",
    "speaker": "旁白",
    "text": "",
    "scene": "chenhe-dawn-hold",
    "next": "grass-dawn-end",
    "mode": "observation",
    "chapter": "grass"
  },
  {
    "id": "grass-dawn-end",
    "speaker": "心声",
    "mode": "thought",
    "scene": "grass-meal",
    "text": "我擦掉碗沿的草屑，把碗递给正在收拾炊具的同志。陈禾已经背好行装，在前头等我。",
    "choices": [
      {
        "id": "leave-grass",
        "label": "收好东西，随队离开营地。",
        "next": "grass-end"
      }
    ],
    "chapter": "grass",
    "narration": {
      "id": "XN068",
      "src": "assets/audio/xiaoman-narration-v041/XN068.mp3",
      "duration": 8.9375,
      "cues": [
        {
          "text": "我擦掉碗沿的草屑，把碗递给正在收拾炊具的同志。",
          "start": 0.3100000000000023,
          "end": 4.837499999999999
        },
        {
          "text": "陈禾已经背好行装，在前头等我。",
          "start": 5.517499999999998,
          "end": 8.4375
        }
      ],
      "sentences": [
        "XN068-01",
        "XN068-02"
      ]
    }
  },
  {
    "id": "grass-end",
    "scene": "grass-camp",
    "checkpoint": true,
    "next": "north-pass-v034",
    "chapter": "grass"
  },
  {
    "id": "north-arrive",
    "speaker": "旁白",
    "text": "陆生在路边停下，扶着石头调整肩上的包。同行的战士接过来，推了推他的胳膊，让他先走。",
    "scene": "north-trail",
    "next": "north-lusheng",
    "mode": "observation",
    "chapter": "north",
    "narration": {
      "id": "XN071",
      "src": "assets/audio/xiaoman-narration-v045/XN071.mp3",
      "duration": 7.315,
      "cues": [
        {
          "text": "陆生在路边停下，扶着石头调整肩上的包。",
          "start": 0,
          "end": 3.42
        },
        {
          "text": "同行的战士接过来，推了推他的胳膊，让他先走。",
          "start": 3.8,
          "end": 7.08
        }
      ],
      "sentences": [
        "XN071-01",
        "XN071-02"
      ]
    }
  },
  {
    "id": "north-lusheng",
    "speaker": "心声",
    "text": "我在后头停了一下，前面的陈禾已经回过头来。",
    "scene": "north-trail",
    "next": "north-answer",
    "mode": "thought",
    "chapter": "north",
    "narration": {
      "id": "XN072",
      "src": "assets/audio/xiaoman-narration-v045/XN072.mp3",
      "duration": 3.57,
      "cues": [
        {
          "text": "我在后头停了一下，前面的陈禾已经回过头来。",
          "start": 0.1250000000000009,
          "end": 3.405000000000001
        }
      ],
      "sentences": [
        "XN072-01"
      ]
    }
  },
  {
    "id": "north-answer",
    "speaker": "陈禾",
    "mode": "dialogue",
    "scene": "north-trail",
    "text": "小满，跟上。",
    "choices": [
      {
        "id": "answer",
        "label": "应声，跟上队伍。",
        "next": "north-end"
      }
    ],
    "chapter": "north",
    "voice": "assets/audio/character-voices-v049/CH08.mp3",
    "voiceId": "CH08",
    "voiceDuration": 1.8475,
    "voiceCues": [
      {
        "text": "小满，跟上。",
        "start": 0.24749999999999872,
        "end": 1.447499999999998
      }
    ]
  },
  {
    "id": "north-end",
    "scene": "north-trail",
    "checkpoint": true,
    "next": "wuqi-arrive",
    "chapter": "north"
  },
  {
    "id": "wuqi-arrive",
    "speaker": "旁白",
    "text": "踩进院子，鞋底终于没再往外冒水。陈禾靠着门框坐下，铺盖还在背上，一边肩带已经滑了下来。我扶住门槛，腿弯发紧，没能一下蹲下去。",
    "scene": "chenhe-rest",
    "next": "wuqi-rest",
    "mode": "observation",
    "chapter": "wuqi",
    "historicalTab": "中共中央率领的中央红军到达吴起镇",
    "narration": {
      "id": "XN073",
      "src": "assets/audio/xiaoman-narration-v045/XN073.mp3",
      "duration": 10.9725,
      "cues": [
        {
          "text": "踩进院子，鞋底终于没再往外冒水。",
          "start": 0.17499999999999893,
          "end": 2.7349999999999977
        },
        {
          "text": "陈禾靠着门框坐下，铺盖还在背上，一边肩带已经滑了下来。",
          "start": 3.1549999999999976,
          "end": 7.535
        },
        {
          "text": "我扶住门槛，腿弯发紧，没能一下蹲下去。",
          "start": 7.875,
          "end": 10.754999999999999
        }
      ],
      "sentences": [
        "XN073-01",
        "XN073-02",
        "XN073-03"
      ]
    }
  },
  {
    "id": "wuqi-rest",
    "speaker": "心声",
    "text": "",
    "scene": "chenhe-rest",
    "mode": "thought",
    "chapter": "wuqi",
    "choices": [
      {
        "id": "continue-wuqi-rest",
        "label": "放下自己的行装，在他旁边蹲下。",
        "next": "wuqi-rest-route-v034"
      }
    ]
  },
  {
    "id": "wuqi-water",
    "speaker": "陆生",
    "text": "小满，给你留了点水，你先喝。碗这边缺了一块，你换一边喝。",
    "scene": "lusheng-saved-water-first",
    "next": "wuqi-water-rim",
    "mode": "dialogue",
    "chapter": "wuqi",
    "nativeAudio": true,
    "video": "assets/chapters/lusheng-saved-water-v040.mp4",
    "poster": "assets/chapters/lusheng-saved-water-first-v040.png",
    "duration": 7.104,
    "title": "吴起院门边，陆生给小满留了半碗水",
    "filmId": "WQ-02",
    "advanceOnEnd": true,
    "hold": "assets/chapters/lusheng-saved-water-hold-v040.png",
    "captionPages": [
      {
        "text": "小满，给你留了点水，你先喝。",
        "start": 0.18,
        "end": 2.56
      },
      {
        "text": "碗这边缺了一块，你换一边喝。",
        "start": 3.72,
        "end": 5.66
      }
    ]
  },
  {
    "id": "wuqi-water-rim",
    "text": "他指了指碗沿的缺口。",
    "scene": "lusheng-saved-water-hold",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "wuqi",
    "next": "wuqi-water-warning",
    "narration": {
      "id": "XN077",
      "src": "assets/audio/xiaoman-narration-v045/XN077.mp3",
      "duration": 1.7225,
      "cues": [
        {
          "text": "他指了指碗沿的缺口。",
          "start": 0,
          "end": 1.5324999999999989
        }
      ],
      "sentences": [
        "XN077-01"
      ]
    }
  },
  {
    "id": "wuqi-water-warning",
    "text": "",
    "scene": "lusheng-saved-water-hold",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-water-drink"
  },
  {
    "id": "wuqi-water-drink",
    "text": "",
    "scene": "lusheng-saved-water-hold",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "drink",
        "label": "端起水碗，避开缺口喝两口。",
        "next": "wuqi-snow-route"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-cloth",
    "speaker": "心声",
    "text": "草地上接回来的那位战士走进院子，把一块从旧衣上裁下的布展开给我们看。",
    "scene": "spare-cloth",
    "next": "wuqi-cloth-ask",
    "mode": "thought",
    "chapter": "wuqi",
    "narration": {
      "id": "XN074",
      "src": "assets/audio/xiaoman-narration-v045/XN074.mp3",
      "duration": 5.59,
      "cues": [
        {
          "text": "草地上接回来的那位战士走进院子，把一块从旧衣上裁下的布展开给我们看。",
          "start": 0.18249999999999744,
          "end": 5.282499999999999
        }
      ],
      "sentences": [
        "XN074-01"
      ]
    }
  },
  {
    "id": "wuqi-cloth-ask",
    "text": "你们看看，这块还能不能用？",
    "scene": "spare-cloth",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-cloth-thanks",
    "voice": "assets/audio/character-voices-v049/SF03.mp3",
    "voiceId": "SF03",
    "voiceDuration": 2.8725,
    "voiceCues": [
      {
        "text": "你们看看，这块还能不能用？",
        "start": 0.6149999999999984,
        "end": 2.42
      }
    ]
  },
  {
    "id": "wuqi-cloth-thanks",
    "text": "用得上，谢了。",
    "scene": "chenhe-rest",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-cloth-look",
    "voice": "assets/audio/character-voices-v049/CH09.mp3",
    "voiceId": "CH09",
    "voiceDuration": 1.66,
    "voiceCues": [
      {
        "text": "用得上，",
        "start": 0.2799999999999976,
        "end": 0.6600000000000001
      },
      {
        "text": "谢了。",
        "start": 1.1600000000000001,
        "end": 1.5199999999999996
      }
    ]
  },
  {
    "id": "wuqi-cloth-look",
    "text": "",
    "scene": "spare-cloth",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "look-cloth",
        "label": "看看他手里的布。",
        "next": "wuqi-cloth-street"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-cloth-street",
    "text": "你那天说到街口那家铺子，还没说完呢。后来怎么了？",
    "scene": "spare-cloth",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-cloth-answer",
    "voice": "assets/audio/xiaoman-v034/XM26.mp3",
    "voiceDuration": 5.24,
    "voiceId": "XM26"
  },
  {
    "id": "wuqi-cloth-answer",
    "text": "你说卖吃的那家吗？早搬了。",
    "scene": "spare-cloth",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-cloth-put-down",
    "voice": "assets/audio/character-voices-v049/SF04.mp3",
    "voiceId": "SF04",
    "voiceDuration": 3.2175,
    "voiceCues": [
      {
        "text": "你说卖吃的那家吗？",
        "start": 0.45250000000000057,
        "end": 1.7475000000000005
      },
      {
        "text": "早搬了。",
        "start": 2.227500000000001,
        "end": 2.9875000000000007
      }
    ]
  },
  {
    "id": "wuqi-cloth-put-down",
    "text": "他把布放到陈禾膝上，在台阶边坐下。",
    "scene": "spare-cloth",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "wuqi",
    "next": "wuqi-lusheng-old",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "wuqi-lusheng-new"
      }
    ],
    "narration": {
      "id": "XN075",
      "src": "assets/audio/xiaoman-narration-v045/XN075.mp3",
      "duration": 2.955,
      "cues": [
        {
          "text": "他把布放到陈禾膝上，在台阶边坐下。",
          "start": 0.032500000000002416,
          "end": 2.8725000000000023
        }
      ],
      "sentences": [
        "XN075-01"
      ]
    }
  },
  {
    "id": "wuqi-lusheng-old",
    "speaker": "旁白",
    "text": "",
    "scene": "lusheng-wuqi",
    "next": "wuqi-snow-route",
    "mode": "observation",
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-lusheng-new",
    "speaker": "旁白",
    "text": "",
    "scene": "lusheng-wuqi",
    "next": "wuqi-snow-route",
    "mode": "observation",
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-snow-route",
    "speaker": "旁白",
    "text": "",
    "scene": "chenhe-rest",
    "next": "wuqi-snow-support",
    "mode": "observation",
    "routes": [
      {
        "choice": "snow-choice",
        "equals": "call",
        "next": "wuqi-snow-call"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-snow-support",
    "speaker": "心声",
    "text": "剩下那边背带卡在衣领旁，陈禾抬了抬胳膊，没能褪出来。我托住铺盖，让他慢慢把手臂抽出来。陈禾揉了揉肩膀。",
    "scene": "chenhe-rest",
    "next": "wuqi-put-pack",
    "mode": "thought",
    "chapter": "wuqi",
    "narration": {
      "id": "XN078",
      "src": "assets/audio/xiaoman-narration-v045/XN078.mp3",
      "duration": 8.9625,
      "cues": [
        {
          "text": "剩下那边背带卡在衣领旁，陈禾抬了抬胳膊，没能褪出来。",
          "start": 0,
          "end": 4.3700000000000045
        },
        {
          "text": "我托住铺盖，让他慢慢把手臂抽出来。",
          "start": 4.517499999999998,
          "end": 7.310000000000002
        },
        {
          "text": "陈禾揉了揉肩膀。",
          "start": 7.482500000000002,
          "end": 8.79
        }
      ],
      "sentences": [
        "XN078-01",
        "XN078-02",
        "XN078-03"
      ]
    }
  },
  {
    "id": "wuqi-put-pack",
    "text": "",
    "scene": "chenhe-rest",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "put-pack",
        "label": "把铺盖放到他脚边。",
        "next": "wuqi-unpack-v034"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-snow-call",
    "speaker": "心声",
    "text": "陈禾把铺盖卸在身旁，靠着墙闭上眼睛。帽子还扣在他膝上，我凑近些，叫了他一声。",
    "scene": "chenhe-rest",
    "next": "wuqi-call-name",
    "mode": "thought",
    "chapter": "wuqi",
    "narration": {
      "id": "XN079",
      "src": "assets/audio/xiaoman-narration-v045/XN079.mp3",
      "duration": 7.27,
      "cues": [
        {
          "text": "陈禾把铺盖卸在身旁，靠着墙闭上眼睛。",
          "start": 0,
          "end": 3.427499999999995
        },
        {
          "text": "帽子还扣在他膝上，我凑近些，叫了他一声。",
          "start": 3.6499999999999915,
          "end": 7.007499999999993
        }
      ],
      "sentences": [
        "XN079-01",
        "XN079-02"
      ]
    }
  },
  {
    "id": "wuqi-call-name",
    "text": "阿禾。",
    "scene": "chenhe-rest",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-answer-name",
    "voice": "assets/audio/xiaoman-v034/XM27.mp3",
    "voiceDuration": 1.155,
    "voiceId": "XM27"
  },
  {
    "id": "wuqi-answer-name",
    "text": "哎。",
    "scene": "chenhe-rest",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-sit-near",
    "voice": "assets/audio/character-voices-v049/CH10.mp3",
    "voiceId": "CH10",
    "voiceDuration": 0.425,
    "voiceCues": [
      {
        "text": "哎。",
        "start": 0.16499999999999915,
        "end": 0.26500000000000057
      }
    ]
  },
  {
    "id": "wuqi-sit-near",
    "text": "",
    "scene": "chenhe-rest",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "sit-near",
        "label": "在他旁边坐下。",
        "next": "wuqi-unpack-v034"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-enter-room",
    "text": "",
    "scene": "chenhe-rest",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "enter-room",
        "label": "拿着针线包进屋，在窗下坐好。",
        "next": "wuqi-choice"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-choice",
    "speaker": "心声",
    "mode": "thought",
    "scene": "chenhe-memory-first",
    "text": "陈禾在对面落座，把开线的袖口翻给我看。桌上放着一张新纸，旁边是半截铅笔。",
    "choices": [
      {
        "id": "sew",
        "label": "替陈禾补袖口。",
        "next": "wuqi-sew"
      },
      {
        "id": "write",
        "label": "拿新纸，把一路的见闻写下来。",
        "next": "wuqi-write"
      }
    ],
    "chapter": "wuqi",
    "narration": {
      "id": "XN081",
      "src": "assets/audio/xiaoman-narration-v045/XN081.mp3",
      "duration": 5.9475,
      "cues": [
        {
          "text": "陈禾在对面落座，把开线的袖口翻给我看。",
          "start": 0,
          "end": 3.0775000000000006
        },
        {
          "text": "桌上放着一张新纸，旁边是半截铅笔。",
          "start": 3.2325000000000017,
          "end": 5.8174999999999955
        }
      ],
      "sentences": [
        "XN081-01",
        "XN081-02"
      ]
    }
  },
  {
    "id": "wuqi-sew",
    "speaker": "陈禾",
    "text": "哎，你慢点。",
    "scene": "chenhe-wuqi-sew-first",
    "next": "wuqi-sew-reply",
    "mode": "dialogue",
    "chapter": "wuqi",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-wuqi-sew-v040.mp4",
    "poster": "assets/chapters/chenhe-wuqi-sew-first-v040.png",
    "duration": 3.25,
    "title": "吴起窗下，陈禾提醒小满慢点补袖口",
    "filmId": "WQ-03",
    "advanceOnEnd": true,
    "hold": "assets/chapters/chenhe-wuqi-sew-pause-v040.png",
    "mediaEnd": 3.25,
    "captionCues": [
      {
        "text": "哎，",
        "start": 0.2,
        "end": 0.39
      },
      {
        "text": "你慢点。",
        "start": 0.59,
        "end": 1.16
      }
    ]
  },
  {
    "id": "wuqi-sew-reply",
    "text": "",
    "scene": "chenhe-wuqi-sew-pause",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "not-started",
        "label": "我还没下针呢，是你自己先动了。",
        "next": "wuqi-sew-reply-spoken-v034"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-sew-reply-spoken-v034",
    "chapter": "wuqi",
    "scene": "chenhe-wuqi-sew-pause",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我还没下针呢，是你自己先动了。",
    "next": "wuqi-sew-still",
    "voice": "assets/audio/xiaoman-v034/XM28.mp3",
    "voiceDuration": 3.0875,
    "voiceId": "XM28",
    "advanceOnEnd": true
  },
  {
    "id": "wuqi-sew-still",
    "text": "行，你缝吧，我不动了。",
    "scene": "chenhe-wuqi-sew-pause",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-sew-result",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-wuqi-sew-v040.mp4",
    "poster": "assets/chapters/chenhe-wuqi-sew-pause-v040.png",
    "duration": 3.854,
    "title": "陈禾把胳膊放回桌沿，让小满继续缝",
    "filmId": "WQ-03",
    "advanceOnEnd": true,
    "mediaStart": 3.25,
    "captionCues": [
      {
        "text": "行，",
        "start": 4.64,
        "end": 4.91
      },
      {
        "text": "你缝吧，",
        "start": 5.22,
        "end": 5.76
      },
      {
        "text": "我不动了。",
        "start": 6,
        "end": 6.57
      }
    ]
  },
  {
    "id": "wuqi-sew-result",
    "speaker": "心声",
    "text": "我剪掉线头，陈禾伸了伸胳膊，把袖口翻过来，看了看那几针歪线。他没说什么，只把胳膊重新搁到桌上，这回倒是没再乱动。",
    "scene": "new-cuff",
    "next": "wuqi-sew-confirm",
    "mode": "thought",
    "chapter": "wuqi",
    "narration": {
      "id": "XN082",
      "src": "assets/audio/xiaoman-narration-v045/XN082.mp3",
      "duration": 8.785,
      "cues": [
        {
          "text": "我剪掉线头，陈禾伸了伸胳膊，把袖口翻过来，看了看那几针歪线。",
          "start": 0,
          "end": 4.769999999999996
        },
        {
          "text": "他没说什么，只把胳膊重新搁到桌上，这回倒是没再乱动。",
          "start": 4.999999999999986,
          "end": 8.749999999999986
        }
      ],
      "sentences": [
        "XN082-01",
        "XN082-02"
      ]
    }
  },
  {
    "id": "wuqi-sew-old",
    "speaker": "旁白",
    "text": "",
    "scene": "sleeve-mended",
    "next": "wuqi-sew-lusheng",
    "mode": "observation",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "wuqi-sew-letter"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-sew-lusheng",
    "speaker": "旁白",
    "text": "",
    "scene": "lusheng-wuqi",
    "next": "wuqi-back-yard",
    "mode": "observation",
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-sew-letter",
    "speaker": "心声",
    "text": "收好针线，我又把旧信摊到膝上。折痕已经快磨透了，里面还是那半句话。",
    "scene": "old-letter-room",
    "next": "wuqi-sew-letter-wrap-v034",
    "mode": "thought",
    "document": "娘，等有了落脚的地方……",
    "chapter": "wuqi",
    "narration": {
      "id": "XN083",
      "src": "assets/audio/xiaoman-narration-v045/XN083.mp3",
      "duration": 5.8325,
      "cues": [
        {
          "text": "收好针线，我又把旧信摊到膝上。",
          "start": 0,
          "end": 2.3249999999999886
        },
        {
          "text": "折痕已经快磨透了，里面还是那半句话。",
          "start": 2.5449999999999875,
          "end": 5.804999999999993
        }
      ],
      "sentences": [
        "XN083-01",
        "XN083-02"
      ]
    }
  },
  {
    "id": "wuqi-sew-confirm",
    "speaker": "心声",
    "mode": "thought",
    "scene": "new-cuff",
    "text": "",
    "choices": [
      {
        "id": "remember-stitches",
        "label": "把针线收回包里。",
        "next": "wuqi-sew-old"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-write",
    "speaker": "心声",
    "text": "我把新纸铺平，拿起那半截铅笔，先写了“梁叔”。再往下，是江边那三针，还有他让我过江后再找他补衣服的话。",
    "scene": "chenhe-memory-first",
    "mode": "thought",
    "chapter": "wuqi",
    "choices": [
      {
        "id": "continue-wuqi-write",
        "label": "接着往下写。",
        "next": "wuqi-write-home"
      }
    ],
    "narration": {
      "id": "XN084",
      "src": "assets/audio/xiaoman-narration-v045/XN084.mp3",
      "duration": 12.545,
      "cues": [
        {
          "text": "我把新纸铺平，拿起那半截铅笔，先写了“梁叔”。",
          "start": 0,
          "end": 5.3
        },
        {
          "text": "再往下，是江边那三针，还有他让我过江后再找他补衣服的话。",
          "start": 6.2700000000000005,
          "end": 12.325
        }
      ],
      "sentences": [
        "XN084-01",
        "XN084-02"
      ]
    }
  },
  {
    "id": "wuqi-write-home",
    "speaker": "陈禾",
    "text": "还有他家那棵枣树，也写上吧。他自己老爱说。",
    "scene": "chenhe-memory-first",
    "next": "wuqi-write-lusheng",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-memory-v021.mp4",
    "poster": "assets/chapters/chenhe-memory-first-v021.png",
    "hold": "assets/chapters/chenhe-memory-hold-v021.png",
    "duration": 6.08,
    "title": "吴起的桌边，陈禾提醒记下梁叔家的枣树",
    "replayLabel": "重看枣树的回忆",
    "advanceOnEnd": false,
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "wuqi-write-letter"
      }
    ],
    "chapter": "wuqi",
    "captionPages": [
      {
        "text": "还有他家那棵枣树，也写上吧。",
        "start": 0.43,
        "end": 2.35
      },
      {
        "text": "他自己老爱说。",
        "start": 4.48,
        "end": 5.6
      }
    ]
  },
  {
    "id": "wuqi-write-lusheng",
    "speaker": "心声",
    "text": "最后一行刚写完，陆生便凑近了些。我正要折纸，他伸手按住纸角。",
    "scene": "chenhe-memory-hold",
    "next": "wuqi-read-wait",
    "mode": "thought",
    "chapter": "wuqi",
    "narration": {
      "id": "XN085",
      "src": "assets/audio/xiaoman-narration-v045/XN085.mp3",
      "duration": 7.32,
      "cues": [
        {
          "text": "最后一行刚写完，陆生便凑近了些。",
          "start": 0.09750000000000014,
          "end": 2.9574999999999996
        },
        {
          "text": "我正要折纸，他伸手按住纸角。",
          "start": 3.6174999999999997,
          "end": 6.629999999999999
        }
      ],
      "sentences": [
        "XN085-01",
        "XN085-02"
      ]
    }
  },
  {
    "id": "wuqi-read-wait",
    "text": "等一下，这行我还没看完。",
    "scene": "memory-page",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-read-turn",
    "voice": "assets/audio/character-voices-v049/LS08.mp3",
    "voiceId": "LS08",
    "voiceDuration": 2.595,
    "voiceCues": [
      {
        "text": "等一下，",
        "start": 0.3874999999999993,
        "end": 0.7225000000000001
      },
      {
        "text": "这行我还没看完。",
        "start": 1.3874999999999993,
        "end": 2.3674999999999997
      }
    ]
  },
  {
    "id": "wuqi-read-turn",
    "text": "",
    "scene": "memory-page",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "turn-paper",
        "label": "把纸转向陆生，等他看完。",
        "next": "wuqi-writing"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-write-letter",
    "speaker": "心声",
    "text": "梁叔的旧信还裹在干布里，放在桌子另一边。我另起一行，记下江边传来的消息，也写上是谁告诉我们的，免得往后记混。",
    "scene": "memory-page",
    "mode": "thought",
    "chapter": "wuqi",
    "choices": [
      {
        "id": "continue-wuqi-write-letter",
        "label": "继续写下记得的事。",
        "next": "wuqi-writing"
      }
    ],
    "narration": {
      "id": "XN086",
      "src": "assets/audio/xiaoman-narration-v045/XN086.mp3",
      "duration": 11.515,
      "cues": [
        {
          "text": "梁叔的旧信还裹在干布里，放在桌子另一边。",
          "start": 0.4299999999999997,
          "end": 3.9899999999999984
        },
        {
          "text": "我另起一行，记下江边传来的消息，也写上是谁告诉我们的，免得往后记混。",
          "start": 4.849999999999998,
          "end": 10.989999999999998
        }
      ],
      "sentences": [
        "XN086-01",
        "XN086-02"
      ]
    }
  },
  {
    "id": "wuqi-writing",
    "speaker": "心声",
    "mode": "thought",
    "scene": "memory-page",
    "text": "笔尖已经写钝了，我把铅笔搁到一旁。梁叔的名字下面写着那棵枣树，陈禾还坐在对面，脚边搁着行装。",
    "document": "梁叔。\n在湘江边替我补了三针。\n他家后头有棵枣树。",
    "choices": [
      {
        "id": "write-names",
        "label": "把写好的纸折起来，收进包里。",
        "next": "wuqi-back-yard"
      }
    ],
    "chapter": "wuqi",
    "narration": {
      "id": "XN087",
      "src": "assets/audio/xiaoman-narration-v045/XN087.mp3",
      "duration": 10.395,
      "cues": [
        {
          "text": "笔尖已经写钝了，我把铅笔搁到一旁。",
          "start": 0.3149999999999977,
          "end": 4.055
        },
        {
          "text": "梁叔的名字下面写着那棵枣树，陈禾还坐在对面，脚边搁着行装。",
          "start": 4.734999999999999,
          "end": 10.055
        }
      ],
      "sentences": [
        "XN087-01",
        "XN087-02"
      ]
    }
  },
  {
    "id": "wuqi-back-yard",
    "text": "",
    "scene": "chenhe-memory-hold",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "back-yard",
        "label": "收好东西，和陈禾回到院子里。",
        "next": "wuqi-later-route"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-later-route",
    "speaker": "心声",
    "text": "门边的陆生正帮着收碗，摞好的碗碰得轻轻响。我挨着陈禾坐下，门外又来了人，背上的铺盖还没卸。",
    "scene": "newcomer-later",
    "next": "wuqi-later-help",
    "mode": "thought",
    "routes": [
      {
        "choice": "snow-choice",
        "equals": "call",
        "next": "wuqi-later-name"
      }
    ],
    "chapter": "wuqi",
    "narration": {
      "id": "XN088",
      "src": "assets/audio/xiaoman-narration-v045/XN088.mp3",
      "duration": 10.3425,
      "cues": [
        {
          "text": "门边的陆生正帮着收碗，摞好的碗碰得轻轻响。",
          "start": 0.04000000000000625,
          "end": 4.6200000000000045
        },
        {
          "text": "我挨着陈禾坐下，门外又来了人，背上的铺盖还没卸。",
          "start": 5.060000000000002,
          "end": 9.940000000000005
        }
      ],
      "sentences": [
        "XN088-01",
        "XN088-02"
      ]
    }
  },
  {
    "id": "wuqi-later-help",
    "speaker": "心声",
    "text": "新来的战士停在门边，伸手去够滑下来的铺盖绳，另一边的背带却越扯越紧。垂下的绳头正好扫到我手背。",
    "scene": "newcomer-later",
    "next": "wuqi-help-newcomer",
    "mode": "thought",
    "chapter": "wuqi",
    "narration": {
      "id": "XN089",
      "src": "assets/audio/xiaoman-narration-v045/XN089.mp3",
      "duration": 9.6225,
      "cues": [
        {
          "text": "新来的战士停在门边，伸手去够滑下来的铺盖绳，另一边的背带却越扯越紧。",
          "start": 0.21750000000000114,
          "end": 6.737500000000004
        },
        {
          "text": "垂下的绳头正好扫到我手背。",
          "start": 7.372499999999999,
          "end": 9.432500000000001
        }
      ],
      "sentences": [
        "XN089-01",
        "XN089-02"
      ]
    }
  },
  {
    "id": "wuqi-help-newcomer",
    "text": "",
    "scene": "newcomer-later",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "help-newcomer",
        "label": "起身托住他的铺盖，把背带翻正。",
        "next": "wuqi-close"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-later-name",
    "speaker": "心声",
    "text": "新来的战士站在门口，朝院里看了看。我抬手示意他过来。",
    "scene": "newcomer-later",
    "next": "wuqi-ask-newcomer",
    "mode": "thought",
    "chapter": "wuqi",
    "narration": {
      "id": "XN090",
      "src": "assets/audio/xiaoman-narration-v045/XN090.mp3",
      "duration": 4.715,
      "cues": [
        {
          "text": "新来的战士站在门口，朝院里看了看。",
          "start": 0,
          "end": 2.6200000000000045
        },
        {
          "text": "我抬手示意他过来。",
          "start": 3.000000000000014,
          "end": 4.359999999999999
        }
      ],
      "sentences": [
        "XN090-01",
        "XN090-02"
      ]
    }
  },
  {
    "id": "wuqi-ask-newcomer",
    "text": "",
    "scene": "newcomer-later",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "ask-newcomer",
        "label": "你叫什么？坐这儿吧。",
        "next": "wuqi-ask-newcomer-spoken-v034"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-ask-newcomer-spoken-v034",
    "chapter": "wuqi",
    "scene": "newcomer-later",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "你叫什么？坐这儿吧。",
    "next": "wuqi-hear-newcomer",
    "voice": "assets/audio/xiaoman-v034/XM29.mp3",
    "voiceDuration": 2.16,
    "voiceId": "XM29"
  },
  {
    "id": "wuqi-hear-newcomer",
    "text": "他报了名字，我跟着念了一遍，往凳子里让了让。他这才把包放下，坐到我旁边。",
    "scene": "newcomer-later",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "wuqi",
    "next": "wuqi-close",
    "narration": {
      "id": "XN091",
      "src": "assets/audio/xiaoman-narration-v045/XN091.mp3",
      "duration": 7.685,
      "cues": [
        {
          "text": "他报了名字，我跟着念了一遍，往凳子里让了让。",
          "start": 0.18500000000000227,
          "end": 4.045000000000016
        },
        {
          "text": "他这才把包放下，坐到我旁边。",
          "start": 4.605000000000018,
          "end": 7.445000000000007
        }
      ],
      "sentences": [
        "XN091-01",
        "XN091-02"
      ]
    }
  },
  {
    "id": "wuqi-close",
    "speaker": "心声",
    "mode": "thought",
    "scene": "chenhe-rest",
    "text": "陈禾拍掉帽上的土，重新戴好。陆生把摞好的碗交出去，也在门框边坐下。",
    "choices": [
      {
        "id": "other-armies",
        "label": "翻到相册的下一页。",
        "next": "wuqi-end"
      }
    ],
    "chapter": "wuqi",
    "narration": {
      "id": "XN092",
      "src": "assets/audio/xiaoman-narration-v045/XN092.mp3",
      "duration": 7.34,
      "cues": [
        {
          "text": "陈禾拍掉帽上的土，重新戴好。",
          "start": 0.11999999999999034,
          "end": 2.6599999999999966
        },
        {
          "text": "陆生把摞好的碗交出去，也在门框边坐下。",
          "start": 3.519999999999996,
          "end": 7.200000000000003
        }
      ],
      "sentences": [
        "XN092-01",
        "XN092-02"
      ]
    }
  },
  {
    "id": "wuqi-end",
    "scene": "wuqi-arrival",
    "checkpoint": true,
    "next": "epilogue-arrive",
    "chapter": "wuqi"
  },
  {
    "id": "epilogue-arrive",
    "speaker": "旁白",
    "text": "相册翻到下一页，地图上标出了会宁。",
    "scene": "atlas-1936",
    "next": "epilogue-huining",
    "mode": "observation",
    "chapter": "epilogue",
    "narration": {
      "id": "NR002",
      "speaker": "旁白",
      "src": "assets/audio/narrator-v047/NR002.mp3",
      "duration": 4.395,
      "cues": [
        {
          "text": "相册翻到下一页，地图上标出了会宁。",
          "start": 0.21750000000000025,
          "end": 3.7575000000000003
        }
      ],
      "sentences": [
        "NR002-01"
      ]
    }
  },
  {
    "id": "epilogue-huining",
    "speaker": "行军纪事",
    "text": "红一、红四方面军在会宁会师。",
    "scene": "atlas-1936",
    "mode": "fact",
    "chapter": "epilogue",
    "routeDate": "1936年10月9日",
    "choices": [
      {
        "id": "continue-epilogue-huining",
        "label": "继续翻页。",
        "next": "epilogue-jiangtai"
      }
    ],
    "narration": {
      "id": "NR003",
      "speaker": "旁白",
      "src": "assets/audio/narrator-v047/NR003.mp3",
      "duration": 3.48,
      "cues": [
        {
          "text": "红一、红四方面军在会宁会师。",
          "start": 0.1825000000000001,
          "end": 2.9225000000000003
        }
      ],
      "sentences": [
        "NR003-01"
      ]
    }
  },
  {
    "id": "epilogue-jiangtai",
    "speaker": "行军纪事",
    "text": "红一、红二方面军在将台堡会师。红军三大主力胜利会师。",
    "scene": "atlas-1936",
    "next": "epilogue-remember",
    "mode": "fact",
    "chapter": "epilogue",
    "routeDate": "1936年10月22日",
    "narration": {
      "id": "NR004",
      "speaker": "旁白",
      "src": "assets/audio/narrator-v047/NR004.mp3",
      "duration": 6.775,
      "cues": [
        {
          "text": "红一、红二方面军在将台堡会师。",
          "start": 0.1225000000000005,
          "end": 3.182500000000001
        },
        {
          "text": "红军三大主力胜利会师。",
          "start": 3.8625000000000007,
          "end": 6.202499999999999
        }
      ],
      "sentences": [
        "NR004-01",
        "NR004-02"
      ]
    }
  },
  {
    "id": "epilogue-remember",
    "speaker": "纪念",
    "mode": "fact",
    "scene": "atlas-1936",
    "text": "再看这张地图，你会记起湘江岸边的枪声，也会记起陈禾在渡口伸来的手；会记起梁叔那封没写完的家书，也会记起陆生留给你的半碗水。\n\n长征迎来了会师，却不是每一个出发的人都能抵达。记住胜利，也要记住那些在饥寒和战火中，仍然尽力照应同伴的普通战士。\n\n这一程到这里暂告一段落。合上相册以后，你还可以去长征纪事里读一读真实的历史，或在山河邮局给他们写一封信。把今天想说的话留下来，也把这些一路同行的人记在心里。\n\n1936—2026\n纪念红军长征胜利90周年",
    "choices": [
      {
        "id": "look-back",
        "label": "合上这一册。",
        "next": "journey-end"
      }
    ],
    "chapter": "epilogue",
    "narration": {
      "id": "NR006",
      "speaker": "旁白",
      "src": "assets/audio/narrator-ending-v050/ending-v050.mp3",
      "duration": 59.4375,
      "cues": [
        {
          "text": "再看这张地图，",
          "start": 0.235,
          "end": 1.44
        },
        {
          "text": "你会记起湘江岸边的枪声，",
          "start": 1.86,
          "end": 4.24
        },
        {
          "text": "也会记起陈禾在渡口伸来的手；",
          "start": 4.8,
          "end": 8.46
        },
        {
          "text": "会记起梁叔那封没写完的家书，",
          "start": 8.92,
          "end": 12.46
        },
        {
          "text": "也会记起陆生留给你的半碗水。\n\n",
          "start": 12.96,
          "end": 16.66
        },
        {
          "text": "长征迎来了会师，",
          "start": 17.86,
          "end": 19.58
        },
        {
          "text": "却不是每一个出发的人都能抵达。",
          "start": 20.06,
          "end": 23.16
        },
        {
          "text": "记住胜利，",
          "start": 23.74,
          "end": 24.84
        },
        {
          "text": "也要记住那些在饥寒和战火中，",
          "start": 25.22,
          "end": 28.02
        },
        {
          "text": "仍然尽力照应同伴的普通战士。\n\n",
          "start": 28.3,
          "end": 31.5
        },
        {
          "text": "这一程到这里暂告一段落。",
          "start": 32.14,
          "end": 35.2
        },
        {
          "text": "合上相册以后，",
          "start": 35.62,
          "end": 36.82
        },
        {
          "text": "你还可以去长征纪事里读一读真实的历史，",
          "start": 37.235,
          "end": 41.06
        },
        {
          "text": "或在山河邮局给他们写一封信。",
          "start": 41.58,
          "end": 44.84
        },
        {
          "text": "把今天想说的话留下来，",
          "start": 45.79,
          "end": 48.08
        },
        {
          "text": "也把这些一路同行的人",
          "start": 48.475,
          "end": 50.9
        },
        {
          "text": "记在心里。\n\n",
          "start": 51.3,
          "end": 52.66
        },
        {
          "text": "1936—2026\n",
          "start": 53.6475,
          "end": 56.0875
        },
        {
          "text": "纪念红军长征胜利90周年",
          "start": 56.5475,
          "end": 59.2475
        }
      ],
      "pages": [
        {
          "text": "再看这张地图，你会记起湘江岸边的枪声，也会记起陈禾在渡口伸来的手；会记起梁叔那封没写完的家书，也会记起陆生留给你的半碗水。",
          "start": 0,
          "end": 17.43,
          "cues": [
            {
              "text": "再看这张地图，",
              "start": 0.235,
              "end": 1.44
            },
            {
              "text": "你会记起湘江岸边的枪声，",
              "start": 1.86,
              "end": 4.24
            },
            {
              "text": "也会记起陈禾在渡口伸来的手；",
              "start": 4.8,
              "end": 8.46
            },
            {
              "text": "会记起梁叔那封没写完的家书，",
              "start": 8.92,
              "end": 12.46
            },
            {
              "text": "也会记起陆生留给你的半碗水。",
              "start": 12.96,
              "end": 16.66
            }
          ]
        },
        {
          "text": "长征迎来了会师，却不是每一个出发的人都能抵达。记住胜利，也要记住那些在饥寒和战火中，仍然尽力照应同伴的普通战士。",
          "start": 17.43,
          "end": 32.03,
          "cues": [
            {
              "text": "长征迎来了会师，",
              "start": 17.86,
              "end": 19.58
            },
            {
              "text": "却不是每一个出发的人都能抵达。",
              "start": 20.06,
              "end": 23.16
            },
            {
              "text": "记住胜利，",
              "start": 23.74,
              "end": 24.84
            },
            {
              "text": "也要记住那些在饥寒和战火中，",
              "start": 25.22,
              "end": 28.02
            },
            {
              "text": "仍然尽力照应同伴的普通战士。",
              "start": 28.3,
              "end": 31.5
            }
          ]
        },
        {
          "text": "这一程到这里暂告一段落。合上相册以后，你还可以去长征纪事里读一读真实的历史，或在山河邮局给他们写一封信。把今天想说的话留下来，也把这些一路同行的人记在心里。",
          "start": 32.03,
          "end": 53.5,
          "cues": [
            {
              "text": "这一程到这里暂告一段落。",
              "start": 32.14,
              "end": 35.2
            },
            {
              "text": "合上相册以后，",
              "start": 35.62,
              "end": 36.82
            },
            {
              "text": "你还可以去长征纪事里读一读真实的历史，",
              "start": 37.235,
              "end": 41.06
            },
            {
              "text": "或在山河邮局给他们写一封信。",
              "start": 41.58,
              "end": 44.84
            },
            {
              "text": "把今天想说的话留下来，",
              "start": 45.79,
              "end": 48.08
            },
            {
              "text": "也把这些一路同行的人",
              "start": 48.475,
              "end": 50.9
            },
            {
              "text": "记在心里。",
              "start": 51.3,
              "end": 52.66
            }
          ]
        },
        {
          "text": "1936—2026\n纪念红军长征胜利90周年",
          "start": 53.5,
          "end": 59.4375,
          "cues": [
            {
              "text": "1936—2026\n",
              "start": 53.6475,
              "end": 56.0875
            },
            {
              "text": "纪念红军长征胜利90周年",
              "start": 56.5475,
              "end": 59.2475
            }
          ]
        }
      ],
      "sentences": [
        "NR006-01",
        "NR006-02",
        "NR006-03",
        "NR006-04",
        "NR006-05",
        "NR006-06",
        "NR006-07",
        "NR006-08",
        "NR006-09",
        "NR006-10",
        "NR006-11",
        "NR006-12",
        "NR006-13",
        "NR006-14",
        "NR006-15",
        "NR006-16",
        "NR006-17",
        "NR006-18",
        "NR006-19"
      ],
      "source_ids": [
        "4864",
        "NR005"
      ]
    }
  },
  {
    "id": "journey-end",
    "scene": "atlas-1936",
    "end": true,
    "chapter": "epilogue"
  },
  {
    "id": "snow-wet-v034",
    "chapter": "snow",
    "scene": "snow-wet-clothes",
    "speaker": "旁白",
    "mode": "observation",
    "text": "",
    "next": "snow-wet-clothes-v037"
  },
  {
    "id": "grass-grain-v034",
    "chapter": "grass",
    "scene": "grass-meal",
    "speaker": "旁白",
    "mode": "observation",
    "text": "解开粮袋，里面受潮的粮食已经结成了团。我把没沾泥的部分拣到包布上，袋底湿透的地方先翻开晾着。陈禾挪走脚边的包，让躺在铺盖上的人能把腿伸开。",
    "choices": [
      {
        "id": "wrap-grain",
        "label": "把拣出的粮食裹好，放到干些的地方。",
        "next": "grass-choice"
      }
    ],
    "narration": {
      "id": "XN051",
      "src": "assets/audio/xiaoman-narration-v039/XN051.mp3",
      "duration": 14.7775,
      "cues": [
        {
          "text": "解开粮袋，里面受潮的粮食已经结成了团。",
          "start": 0.36249999999999716,
          "end": 3.862499999999997
        },
        {
          "text": "我把没沾泥的部分拣到包布上，袋底湿透的地方先翻开晾着。",
          "start": 4.6825000000000045,
          "end": 9.722499999999997
        },
        {
          "text": "陈禾挪走脚边的包，让躺在铺盖上的人能把腿伸开。",
          "start": 10.342500000000001,
          "end": 14.402500000000003
        }
      ],
      "sentences": [
        "XN051-01",
        "XN051-02",
        "XN051-03"
      ]
    }
  },
  {
    "id": "north-pass-v034",
    "chapter": "north",
    "scene": "north-trail",
    "speaker": "旁白",
    "mode": "observation",
    "routePlace": "腊子口后方",
    "routeDate": "1935年9月",
    "text": "山口的枪声一直没停，担架队也堵在坡下。我抱着包坐了半夜，想换个姿势，才发现手指扣在带子上，已经麻了。",
    "choices": [
      {
        "id": "make-way-stretcher",
        "label": "松开手，替后面过来的担架让出路。",
        "next": "north-passage-v034"
      }
    ],
    "historicalTab": "9月16日至17日，红军激战腊子口，打通北上通道",
    "narration": {
      "id": "XN069",
      "src": "assets/audio/xiaoman-narration-v041/XN069.mp3",
      "duration": 12.3825,
      "cues": [
        {
          "text": "山口的枪声一直没停，担架队也堵在坡下。",
          "start": 0.28000000000000114,
          "end": 4.3999999999999915
        },
        {
          "text": "我抱着包坐了半夜，想换个姿势，才发现手指扣在带子上，已经麻了。",
          "start": 5.3799999999999955,
          "end": 11.980000000000004
        }
      ],
      "sentences": [
        "XN069-01",
        "XN069-02"
      ]
    }
  },
  {
    "id": "north-passage-v034",
    "chapter": "north",
    "scene": "north-trail",
    "speaker": "旁白",
    "mode": "observation",
    "routePlace": "腊子口后续通行",
    "routeDate": "1935年9月",
    "text": "前面不断有人下来，裤腿蹭满了土，擦着我们的包挤过去。等天色泛白，队伍才开始往山口走。经过木桥时，我看见桥边的石头崩掉一角，碎屑还散在脚下。",
    "next": "north-arrive",
    "narration": {
      "id": "XN070",
      "src": "assets/audio/xiaoman-narration-v041/XN070.mp3",
      "duration": 17.3525,
      "cues": [
        {
          "text": "前面不断有人下来，裤腿蹭满了土，擦着我们的包挤过去。",
          "start": 0.31749999999999545,
          "end": 5.717499999999987
        },
        {
          "text": "等天色泛白，队伍才开始往山口走。",
          "start": 6.8374999999999915,
          "end": 10.477499999999992
        },
        {
          "text": "经过木桥时，我看见桥边的石头崩掉一角，碎屑还散在脚下。",
          "start": 11.117499999999993,
          "end": 17.017499999999984
        }
      ],
      "sentences": [
        "XN070-01",
        "XN070-02",
        "XN070-03"
      ]
    }
  },
  {
    "id": "wuqi-rest-route-v034",
    "chapter": "wuqi",
    "scene": "chenhe-rest",
    "text": "",
    "next": "wuqi-water-context-v034",
    "routes": [
      {
        "choice": "grass-choice",
        "equals": "rescue",
        "next": "wuqi-cloth"
      }
    ]
  },
  {
    "id": "wuqi-water-context-v034",
    "chapter": "wuqi",
    "scene": "lusheng-saved-water-first",
    "speaker": "旁白",
    "mode": "observation",
    "text": "陆生坐在门边，见我放下包，朝凳上的半碗水示意了一下。",
    "next": "wuqi-water",
    "narration": {
      "id": "XN076",
      "src": "assets/audio/xiaoman-narration-v045/XN076.mp3",
      "duration": 4.565,
      "cues": [
        {
          "text": "陆生坐在门边，见我放下包，朝凳上的半碗水示意了一下。",
          "start": 0,
          "end": 4.317499999999999
        }
      ],
      "sentences": [
        "XN076-01"
      ]
    }
  },
  {
    "id": "wuqi-unpack-v034",
    "chapter": "wuqi",
    "scene": "needle-pouch",
    "speaker": "旁白",
    "mode": "observation",
    "text": "我把行装放到膝上，解开绳子，干泥便落了一点在手背上。针线包还藏在里层，外头的布已经磨薄了，得用手托着才能拿出来。",
    "next": "wuqi-enter-room",
    "narration": {
      "id": "XN080",
      "src": "assets/audio/xiaoman-narration-v045/XN080.mp3",
      "duration": 9.62,
      "cues": [
        {
          "text": "我把行装放到膝上，解开绳子，干泥便落了一点在手背上。",
          "start": 0,
          "end": 4.357500000000002
        },
        {
          "text": "针线包还藏在里层，外头的布已经磨薄了，得用手托着才能拿出来。",
          "start": 4.4950000000000045,
          "end": 9.5775
        }
      ],
      "sentences": [
        "XN080-01",
        "XN080-02"
      ]
    }
  },
  {
    "id": "wuqi-sew-letter-wrap-v034",
    "chapter": "wuqi",
    "scene": "old-letter-room",
    "text": "",
    "choices": [
      {
        "id": "wrap-old-letter",
        "label": "把信重新裹好，放进行装内层。",
        "next": "wuqi-back-yard"
      }
    ]
  },
  {
    "id": "snow-wet-clothes-v037",
    "speaker": "旁白",
    "text": "走出林子时，后背已经汗湿，刚松开的领口一灌风，我又赶紧扣上。坡上没了树，前面的人绕过石头便看不全了，只剩几个帽顶在招手的人旁边慢慢移动。",
    "scene": "snow-wet-clothes",
    "mode": "observation",
    "chapter": "snow",
    "choices": [
      {
        "id": "follow-footprints",
        "label": "扣好领口，踩着前面的脚印走",
        "next": "snow-path"
      }
    ],
    "narration": {
      "id": "XN041",
      "src": "assets/audio/xiaoman-narration-v039/XN041.mp3",
      "duration": 13.5175,
      "cues": [
        {
          "text": "走出林子时，后背已经汗湿，刚松开的领口一灌风，我又赶紧扣上。",
          "start": 0.3850000000000051,
          "end": 5.625000000000007
        },
        {
          "text": "坡上没了树，前面的人绕过石头便看不全了，只剩几个帽顶在招手的人旁边慢慢移动。",
          "start": 6.285000000000004,
          "end": 13.065000000000012
        }
      ],
      "sentences": [
        "XN041-01",
        "XN041-02"
      ]
    }
  }
];
 for(const [first,last,id]of[['snow-arrive','snow-end','snow'],['grass-arrive','grass-end','grass'],['north-arrive','north-end','north'],['wuqi-arrive','wuqi-end','wuqi'],['epilogue-arrive','journey-end','epilogue']]){let on=false;for(const n of nodes){if(n.id===first)on=true;if(on)n.chapter=id;if(n.id===last)on=false;}}
 const names=['spare-cloth','mountain-pack','snow-path','grass-camp','grass-meal','lusheng-grass','chenhe-grass','grass-path','north-trail','wuqi-arrival','chenhe-rest','lusheng-wuqi','memory-page','new-cuff','old-letter-room','newcomer-later'];
 const images=Object.fromEntries(names.map(n=>[n,'assets/chapters/'+n+'-v015.webp']));
 Object.assign(images,{'lusheng-river':'assets/chapters/lusheng-river-v015.webp','lusheng-lamp':'assets/chapters/lusheng-lamp-v015.webp','atlas-1936':'assets/chapters/epilogue-atlas-v050.webp'});
 for(const name of ['snow-concern','snow-shelter'])for(const phase of ['first','hold'])images[name+'-'+phase]='assets/chapters/'+name+'-'+phase+'-v015.png';
 const chapters=[
  {
    "id": "snow",
    "name": "第四站 · 夹金山",
    "title": "这次换你等他",
    "location": "夹金山",
    "date": "1935年6月",
    "start": "snow-arrive",
    "end": "snow-end",
    "ambient": "snow",
    "image": "mountain-pack",
    "ending": "风里有人应声，\n我们再走一段",
    "summary": "曾在于都拉住我的人也会疲惫，这一回换我停下来陪他",
    "button": "继续走进草地"
  },
  {
    "id": "grass",
    "name": "第五站 · 草地",
    "title": "一口热的，几个名字",
    "location": "松潘草地一带",
    "date": "1935年8月",
    "start": "grass-arrive",
    "end": "grass-end",
    "ambient": "grass",
    "image": "grass-camp",
    "ending": "天亮了，\n我们还在一起",
    "summary": "营地里有人守着，接应的人也在往回赶",
    "button": "随队继续北上"
  },
  {
    "id": "north",
    "name": "北上过场",
    "title": "草地之后，还有山口",
    "location": "腊子口—哈达铺—六盘山",
    "date": "1935年9—10月",
    "start": "north-pass-v034",
    "end": "north-end",
    "ambient": "grass",
    "image": "north-trail",
    "ending": "应一声，\n再往前走",
    "summary": "越过草地以后，彼此的一声回应伴着队伍继续北上",
    "button": "前往吴起"
  },
  {
    "id": "wuqi",
    "name": "第六站 · 吴起",
    "title": "把同行的人记住",
    "location": "陕北吴起",
    "date": "1935年10月19日",
    "start": "wuqi-arrive",
    "end": "wuqi-end",
    "ambient": "room",
    "image": "wuqi-arrival",
    "ending": "有些人到了，\n有些人要被记住",
    "summary": "行装放下以后，有了补衣、写字的工夫",
    "button": "翻开1936年的一页"
  },
  {
    "id": "epilogue",
    "name": "历史尾声 · 会师",
    "title": "这条路上的更多人",
    "location": "会宁 · 将台堡",
    "date": "1936年10月",
    "start": "epilogue-arrive",
    "end": "journey-end",
    "ambient": "room",
    "image": "atlas-1936",
    "ending": "我记得，\n我们同行过",
    "summary": "人物与具体经历为虚构，这段故事献给长征路上的人们"
  }
];
 const alts=Object.fromEntries(names.map(n=>[n,{'mountain-pack':'陈禾在夹金山山脚整理行装','snow-path':'积雪山路上相隔行进的队伍','grass-camp':'湿冷草地上的临时营地','grass-meal':'旧碗、少量稀粥和收好的针线包','lusheng-grass':'陆生在草地营地歇息','chenhe-grass':'陈禾坐在草地营地，疲惫中仍看着同伴','grass-path':'接应队伍经过的草地来路','north-trail':'草地以后继续北上的山路','wuqi-arrival':'抵达陕北吴起的队伍与土路','chenhe-rest':'同一位陈禾在吴起停留处坐下休息','lusheng-wuqi':'同一位陆生在吴起留着水等同伴','memory-page':'新纸、短铅笔和收好的针线包','new-cuff':'陈禾补好的袖口上留下浅色新针脚','old-letter-room':'在屋内另用干布包着的梁叔旧家书','newcomer-later':'后来抵达的年轻战士与留下的空位'}[n]]));

 Object.assign(images,{
 "grass-rescue-first-v049": "assets/chapters/grass-rescue-first-v049.webp",
 "grass-rescue-question-v049": "assets/chapters/grass-rescue-question-v049.webp",
 "grass-rescue-breath-v049": "assets/chapters/grass-rescue-breath-v049.webp",
 "grass-rescue-hold-v049": "assets/chapters/grass-rescue-hold-v049.webp"
});
 Object.assign(alts,{
 "grass-rescue-first-v049": "草地接应途中，陈禾扶住获救战士，与第一人称视角的小满交谈",
 "grass-rescue-question-v049": "草地接应途中，陈禾扶住获救战士，与第一人称视角的小满交谈",
 "grass-rescue-breath-v049": "草地接应途中，陈禾扶住获救战士，与第一人称视角的小满交谈",
 "grass-rescue-hold-v049": "草地接应途中，陈禾扶住获救战士，与第一人称视角的小满交谈"
});
 Object.assign(alts,{'spare-cloth':'同伴送来的可用于补衣的旧棉布与针线包','lusheng-river':'陆生靠稳在湘江边的担架上','lusheng-lamp':'陆生坐在遵义的灯旁','atlas-1936':'暖色山河画卷中，会宁城墙、红军队伍与红旗融入秋日西北山地，标注吴起、会宁和将台堡的会师纪事节点及1936—2026纪念字样；路线为叙事示意'});
 for(const phase of ['first','hold']){alts['snow-concern-'+phase]='陈禾站在夹金山雪路边，想继续照应小满';alts['snow-shelter-'+phase]='陈禾在背风处靠稳，缓过一口气';}
 for(const name of ['lusheng-night','chenhe-dawn'])for(const phase of ['first','hold']){
  images[name+'-'+phase]='assets/chapters/'+name+'-'+phase+'-v020.png';
  alts[name+'-'+phase]=name==='lusheng-night'?'陆生在草地夜间营地靠着铺盖歇息，小满的水碗在近处':'陈禾坐在天亮后的草地营地，身后还有歇息的战士';
 }
 Object.assign(images,{'chenhe-memory-first':'assets/chapters/chenhe-memory-first-v021.png','chenhe-memory-hold':'assets/chapters/chenhe-memory-hold-v021.png'});
 Object.assign(alts,{'chenhe-memory-first':'白天的吴起借住屋内，陈禾坐在小满对面，桌上是新纸和短铅笔','chenhe-memory-hold':'同一张桌前，陈禾低头看向新纸，提醒小满记下梁叔家的枣树'});
 Object.assign(images,{"chenhe-mountain-pack-first": "assets/chapters/chenhe-mountain-pack-first-v046.webp", "chenhe-mountain-pack-question": "assets/chapters/chenhe-mountain-pack-question-v046.webp", "chenhe-mountain-pack-nickname": "assets/chapters/chenhe-mountain-pack-hold-v046.webp", "chenhe-mountain-pack-hold": "assets/chapters/chenhe-mountain-pack-hold-v046.webp", "snow-wet-clothes": "assets/chapters/snow-wet-clothes-v037.webp"});
 Object.assign(alts,{"chenhe-mountain-pack-first": "陈禾在夹金山山脚低头整理铺盖绳", "chenhe-mountain-pack-question": "陈禾从铺盖上抬起头，看向帮忙的小满", "chenhe-mountain-pack-nickname": "陈禾说起母亲叫他的乳名，停下来看着小满", "chenhe-mountain-pack-hold": "陈禾低头收紧铺盖绳", "snow-wet-clothes": "背着铺盖的战士走出树林，沿着泥雪山路继续上行"});
 Object.assign(images,{
  'lusheng-saved-water-first':'assets/chapters/lusheng-saved-water-first-v040.png',
  'lusheng-saved-water-hold':'assets/chapters/lusheng-saved-water-hold-v040.png',
  'chenhe-wuqi-sew-first':'assets/chapters/chenhe-wuqi-sew-first-v040.png',
  'chenhe-wuqi-sew-pause':'assets/chapters/chenhe-wuqi-sew-pause-v040.png'
 });
 Object.assign(alts,{
  'lusheng-saved-water-first':'陆生坐在吴起借住屋的门边，半碗水放在身旁的矮凳上',
  'lusheng-saved-water-hold':'陆生坐在凳旁看向小满，水碗仍放在原处',
  'chenhe-wuqi-sew-first':'吴起借住屋的窗边，陈禾坐在桌前等小满补袖口',
  'chenhe-wuqi-sew-pause':'陈禾在桌前停下来，等小满回话'
 });
 const data={nodes,images,alts,chapters};if(typeof module==='object'&&module.exports)module.exports=data;else root.LATE_CHAPTERS=data;
})(typeof window==='undefined'?globalThis:window);
