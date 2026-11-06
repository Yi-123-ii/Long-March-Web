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
    "video": "assets/chapters/chenhe-mountain-pack-v037.mp4",
    "poster": "assets/chapters/chenhe-mountain-pack-first-v037.png",
    "hold": "assets/chapters/chenhe-mountain-pack-question-v037.png",
    "duration": 2.1,
    "captionPages": [
      {
        "text": "你先压住，别松手。",
        "start": 0.24,
        "end": 1.4
      }
    ],
    "title": "夹金山山脚，陈禾请小满压住铺盖",
    "filmId": "JS-03",
    "advanceOnEnd": true,
    "mediaEnd": 2.1
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
    "text": "在家也得我娘替我重捆。她隔着院子就喊，阿禾，你又给捆歪了！",
    "scene": "chenhe-mountain-pack-question",
    "next": "snow-nickname",
    "mode": "dialogue",
    "chapter": "snow",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-mountain-pack-v037.mp4",
    "poster": "assets/chapters/chenhe-mountain-pack-question-v037.png",
    "hold": "assets/chapters/chenhe-mountain-pack-nickname-v037.png",
    "duration": 7.1,
    "captionPages": [
      {
        "text": "在家也得我娘替我重捆。",
        "start": 2.63,
        "end": 4.15
      },
      {
        "text": "她隔着院子就喊，",
        "start": 5.08,
        "end": 5.9
      },
      {
        "text": "阿禾，你又给捆歪了！",
        "start": 6.18,
        "end": 7.15
      }
    ],
    "title": "陈禾说起在家时母亲帮他捆铺盖",
    "filmId": "JS-03",
    "advanceOnEnd": true,
    "mediaStart": 2.1,
    "mediaEnd": 9.2
  },
  {
    "id": "snow-nickname",
    "speaker": "心声",
    "mode": "thought",
    "scene": "chenhe-mountain-pack-nickname",
    "text": "",
    "choices": [
      {
        "id": "ask-nickname",
        "label": "阿禾？",
        "next": "snow-nickname-spoken-v034",
        "legacyNext": "snow-respond-name"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-nickname-spoken-v034",
    "chapter": "snow",
    "scene": "chenhe-mountain-pack-nickname",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "阿禾？",
    "next": "snow-respond-name",
    "voice": "assets/audio/xiaoman-v034/XM11.mp3",
    "voiceDuration": 1.18,
    "voiceId": "XM11",
    "advanceOnEnd": true
  },
  {
    "id": "snow-respond-name",
    "text": "哎。先别松，马上好了。",
    "scene": "chenhe-mountain-pack-nickname",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-ready",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-mountain-pack-v037.mp4",
    "poster": "assets/chapters/chenhe-mountain-pack-nickname-v037.png",
    "hold": "assets/chapters/chenhe-mountain-pack-hold-v037.png",
    "duration": 3.888,
    "captionPages": [
      {
        "text": "哎。",
        "start": 10.5,
        "end": 10.73
      },
      {
        "text": "先别松，马上好了。",
        "start": 11.34,
        "end": 12.57
      }
    ],
    "title": "陈禾应了一声，低头继续理绳子",
    "filmId": "JS-03",
    "advanceOnEnd": true,
    "mediaStart": 9.2
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
    "text": "（抬头）你自己站稳了。",
    "scene": "snow-concern-hold",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-a-hand-yudu"
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
    "next": "snow-a-help-reply"
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
    "next": "snow-b-answer"
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
    "text": "（抬眼）在呢。",
    "scene": "snow-concern-hold",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-shelter-before"
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
    "text": "卫生员蹲在铺盖旁，替躺着的战士掖好衣服。接应队的人从外面回来，还没放下行装，就在找能跟着出去的人，草地上还有同志没接回来。\n\n陈禾背起包，站到接应队旁边。我往铺盖边靠了靠，给卫生员让出路。",
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
    "chapter": "grass"
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
    "chapter": "grass"
  },
  {
    "id": "grass-a-old",
    "speaker": "陆生",
    "text": "小满？又是你啊。",
    "scene": "lusheng-grass",
    "next": "grass-a-sit-close",
    "mode": "dialogue",
    "chapter": "grass"
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
    "next": "grass-a-show-cuff"
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
    "next": "grass-a-night"
  },
  {
    "id": "grass-a-new",
    "speaker": "陆生",
    "text": "你叫什么名字？",
    "scene": "lusheng-grass",
    "next": "grass-a-tell-name",
    "mode": "dialogue",
    "chapter": "grass"
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
    "next": "grass-a-repeat-name"
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
    "text": "（陆生点头，松开压着铺盖的手。）",
    "scene": "lusheng-grass",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-a-night"
  },
  {
    "id": "grass-a-night",
    "speaker": "心声",
    "text": "我端起水碗，往陆生那边挪了一点。",
    "scene": "lusheng-night-first",
    "next": "grass-a-water",
    "mode": "thought",
    "chapter": "grass"
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
    "text": "我把水放回他手边。\n\n后半夜，陆生醒过两回。有一回他伸手摸到碗边，我托着碗让他喝了几口，等他躺好，再把水碗放回原处。\n\n卫生员过来摸了摸他的额头，蹲了一会儿才走。我跟着看过去，盖在陆生肩头的衣服又滑下来了。",
    "scene": "lusheng-night-hold",
    "next": "grass-a-cover",
    "mode": "thought",
    "chapter": "grass"
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
    "text": "卫生员把人接过去，陈禾才卸下背上的包。他还撑着膝盖没直起身，我往里挪了挪，把身旁的位置空出来。",
    "scene": "chenhe-grass",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-a-room"
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
    "chapter": "grass"
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
    "scene": "grass-path",
    "next": "grass-b-support",
    "mode": "thought",
    "chapter": "grass"
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
    "scene": "grass-path",
    "next": "grass-b-ask-names",
    "mode": "thought",
    "chapter": "grass",
    "plannedFilm": "CD-03"
  },
  {
    "id": "grass-b-ask-names",
    "text": "你们俩叫什么名字？",
    "scene": "grass-path",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-b-tell-names"
  },
  {
    "id": "grass-b-tell-names",
    "text": "",
    "scene": "grass-path",
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
    "scene": "grass-path",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我叫小满，他叫陈禾。",
    "next": "grass-b-home-street",
    "voice": "assets/audio/xiaoman-v034/XM23.mp3",
    "voiceDuration": 2.135,
    "voiceId": "XM23"
  },
  {
    "id": "grass-b-home-street",
    "text": "等出去了，到我家坐坐。我家那条街，街口原来有家卖吃的——",
    "scene": "grass-path",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-b-breath"
  },
  {
    "id": "grass-b-breath",
    "text": "（他停下来，扶住陈禾的胳膊。）",
    "scene": "grass-path",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-b-rest-first"
  },
  {
    "id": "grass-b-rest-first",
    "text": "你先喘口气，回去慢慢说。",
    "scene": "grass-path",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "grass",
    "next": "grass-b-foot"
  },
  {
    "id": "grass-b-return",
    "speaker": "心声",
    "text": "营地方向传来喊声，带路的人应着回头，招呼我们跟上。",
    "scene": "grass-path",
    "next": "grass-b-camp-v034",
    "mode": "thought",
    "chapter": "grass"
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
    "next": "grass-b-old"
  },
  {
    "id": "grass-b-old",
    "speaker": "陆生",
    "text": "小满，坐这儿吧。水还剩一点。",
    "scene": "lusheng-grass",
    "next": "grass-b-drink",
    "mode": "dialogue",
    "chapter": "grass"
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
    "chapter": "grass"
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
    "next": "grass-dawn-route"
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
    "chapter": "grass"
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
    "chapter": "grass"
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
    "next": "grass-dawn-shoes"
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
    "text": "（陈禾低头系鞋带。）",
    "scene": "chenhe-grass",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "grass",
    "next": "grass-dawn-end"
  },
  {
    "id": "grass-dawn-help",
    "speaker": "心声",
    "text": "绳头又垂到脚边，我刚要去捡，陈禾先伸了手。他让我托一下铺盖，把那截绳头塞进了背带里。",
    "scene": "chenhe-grass",
    "next": "grass-dawn-hold-pack",
    "mode": "thought",
    "chapter": "grass"
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
    "chapter": "grass"
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
    "chapter": "north"
  },
  {
    "id": "north-lusheng",
    "speaker": "心声",
    "text": "我在后头停了一下，前面的陈禾已经回过头来。",
    "scene": "north-trail",
    "next": "north-answer",
    "mode": "thought",
    "chapter": "north"
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
    "chapter": "north"
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
    "historicalTab": "中共中央率领的中央红军到达吴起镇"
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
    "text": "",
    "scene": "lusheng-saved-water-hold",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "wuqi",
    "next": "wuqi-water-warning"
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
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-cloth-ask",
    "text": "你们看看，这块还能不能用？",
    "scene": "spare-cloth",
    "speaker": "战士",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-cloth-thanks"
  },
  {
    "id": "wuqi-cloth-thanks",
    "text": "用得上，谢了。",
    "scene": "chenhe-rest",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-cloth-look"
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
    "next": "wuqi-cloth-put-down"
  },
  {
    "id": "wuqi-cloth-put-down",
    "text": "（他把布放到陈禾膝上，在台阶边坐下。）",
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
    ]
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
    "text": "剩下那边背带卡在衣领旁，陈禾抬了抬胳膊，没能褪出来。我托住铺盖，让他慢慢把手臂抽出来。\n\n（陈禾揉了揉肩膀。）",
    "scene": "chenhe-rest",
    "next": "wuqi-put-pack",
    "mode": "thought",
    "chapter": "wuqi"
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
    "chapter": "wuqi"
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
    "next": "wuqi-sit-near"
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
    "chapter": "wuqi"
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
    "chapter": "wuqi"
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
    "chapter": "wuqi"
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
    ]
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
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-read-wait",
    "text": "等一下，这行我还没看完。",
    "scene": "memory-page",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-read-turn"
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
    ]
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
    "chapter": "wuqi"
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
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-later-help",
    "speaker": "心声",
    "text": "新来的战士停在门边，伸手去够滑下来的铺盖绳，另一边的背带却越扯越紧。垂下的绳头正好扫到我手背。",
    "scene": "newcomer-later",
    "next": "wuqi-help-newcomer",
    "mode": "thought",
    "chapter": "wuqi"
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
    "chapter": "wuqi"
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
    "next": "wuqi-close"
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
    "chapter": "wuqi"
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
    "chapter": "epilogue"
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
    ]
  },
  {
    "id": "epilogue-jiangtai",
    "speaker": "行军纪事",
    "text": "红一、红二方面军在将台堡会师。红军三大主力胜利会师。",
    "scene": "atlas-1936",
    "next": "epilogue-remember",
    "mode": "fact",
    "chapter": "epilogue",
    "routeDate": "1936年10月22日"
  },
  {
    "id": "epilogue-remember",
    "speaker": "纪念",
    "mode": "fact",
    "scene": "atlas-1936",
    "text": "1936—2026\n纪念红军长征胜利90周年",
    "choices": [
      {
        "id": "look-back",
        "label": "合上这一册。",
        "next": "journey-end"
      }
    ],
    "chapter": "epilogue"
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
    "historicalTab": "9月16日至17日，红军激战腊子口，打通北上通道"
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
    "next": "north-arrive"
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
    "text": "陆生坐在门边，旁边的矮凳上放着半碗水。",
    "next": "wuqi-water"
  },
  {
    "id": "wuqi-unpack-v034",
    "chapter": "wuqi",
    "scene": "needle-pouch",
    "speaker": "旁白",
    "mode": "observation",
    "text": "我把行装放到膝上，解开绳子，干泥便落了一点在手背上。针线包还藏在里层，外头的布已经磨薄了，得用手托着才能拿出来。",
    "next": "wuqi-enter-room"
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
 Object.assign(images,{'lusheng-river':'assets/chapters/lusheng-river-v015.webp','lusheng-lamp':'assets/chapters/lusheng-lamp-v015.webp','atlas-1936':'assets/atlas-1936.svg'});
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
 Object.assign(alts,{'spare-cloth':'同伴送来的可用于补衣的旧棉布与针线包','lusheng-river':'陆生靠稳在湘江边的担架上','lusheng-lamp':'陆生坐在遵义的灯旁','atlas-1936':'从陕北暂歇到会宁、将台堡会师的历史示意图'});
 for(const phase of ['first','hold']){alts['snow-concern-'+phase]='陈禾站在夹金山雪路边，想继续照应小满';alts['snow-shelter-'+phase]='陈禾在背风处靠稳，缓过一口气';}
 for(const name of ['lusheng-night','chenhe-dawn'])for(const phase of ['first','hold']){
  images[name+'-'+phase]='assets/chapters/'+name+'-'+phase+'-v020.png';
  alts[name+'-'+phase]=name==='lusheng-night'?'陆生在草地夜间营地靠着铺盖歇息，小满的水碗在近处':'陈禾坐在天亮后的草地营地，身后还有歇息的战士';
 }
 Object.assign(images,{'chenhe-memory-first':'assets/chapters/chenhe-memory-first-v021.png','chenhe-memory-hold':'assets/chapters/chenhe-memory-hold-v021.png'});
 Object.assign(alts,{'chenhe-memory-first':'白天的吴起借住屋内，陈禾坐在小满对面，桌上是新纸和短铅笔','chenhe-memory-hold':'同一张桌前，陈禾低头看向新纸，提醒小满记下梁叔家的枣树'});
 Object.assign(images,{"chenhe-mountain-pack-first": "assets/chapters/chenhe-mountain-pack-first-v037.png", "chenhe-mountain-pack-question": "assets/chapters/chenhe-mountain-pack-question-v037.png", "chenhe-mountain-pack-nickname": "assets/chapters/chenhe-mountain-pack-nickname-v037.png", "chenhe-mountain-pack-hold": "assets/chapters/chenhe-mountain-pack-hold-v037.png", "snow-wet-clothes": "assets/chapters/snow-wet-clothes-v037.webp"});
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
