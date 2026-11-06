(function(root){
 'use strict';
 const thought=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const fact=(id,text,scene,next,extra={})=>({id,speaker:'行军纪事',text,scene,next,mode:'fact',...extra});
 const nodes=[
  {
    "id": "xj-arrive",
    "speaker": "旁白",
    "text": "河那边又响起枪声，岸上的人低下头，贴着土坎往前挪。梁叔拉我在坎后蹲下，把针线包摊在膝上；见我还在扯袖口的断线，他伸手按住了。",
    "scene": "liang-sewing",
    "next": "xj-offer-sleeve",
    "mode": "observation",
    "chapter": "xiangjiang",
    "historicalTab": "中央红军在湘江一线激战，突破第四道封锁线"
  },
  {
    "id": "xj-offer-sleeve",
    "text": "",
    "scene": "liang-sewing",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "offer-sleeve",
        "label": "把胳膊伸过去。",
        "next": "xj-sleeve"
      }
    ],
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-sleeve",
    "speaker": "梁叔",
    "text": "别缩，针还没碰着呢。先缝三针，过了江再补。",
    "scene": "liang-sewing",
    "next": "xj-three",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/chapters/liang-sewing-v018.mp4",
    "poster": "assets/chapters/liang-sewing-first-v018.png",
    "hold": "assets/chapters/liang-sewing-hold-v018.png",
    "duration": 6.08,
    "title": "梁叔在湘江岸边替小满补袖口",
    "replayLabel": "重看补衣",
    "advanceOnEnd": true,
    "chapter": "xiangjiang",
    "captionCues": [
      {
        "text": "别缩，",
        "start": 0.54,
        "end": 1.1
      },
      {
        "text": "针还没碰着呢。",
        "start": 1.68,
        "end": 2.55
      },
      {
        "text": "先缝三针，",
        "start": 3.63,
        "end": 4.5
      },
      {
        "text": "过了江再补。",
        "start": 5,
        "end": 5.78
      }
    ]
  },
  {
    "id": "xj-three",
    "speaker": "心声",
    "text": "炮声从远处传来，坎沿的土簌簌落在膝头。梁叔刚收好针，陈禾已经伏到我身旁，帽檐沾着湿泥。近处又响了一阵枪，我赶紧把胳膊收进怀里。",
    "scene": "liang-sewing-hold",
    "next": "xj-cover-v034",
    "mode": "thought",
    "chapter": "xiangjiang",
    "legacyNext": "xj-choice"
  },
  {
    "chapter": "xiangjiang",
    "scene": "chenhe-wait",
    "speaker": "陈禾",
    "mode": "dialogue",
    "id": "xj-cover-v034",
    "text": "",
    "next": "xj-cover-fire-v035"
  },
  {
    "id": "xj-choice",
    "speaker": "心声",
    "mode": "thought",
    "text": "趁枪声稍歇，旁边的人开始往河边抬担架。行装组也在招手，几个捆好的包还搁在岸边。我把刚补过的袖口往上拢了拢，起身跟过去。",
    "scene": "xiang-groups-hold",
    "choices": [
      {
        "id": "stretcher",
        "label": "跟陈禾去抬担架。",
        "next": "xj-a-lusheng"
      },
      {
        "id": "luggage",
        "label": "去行装组，替梁叔接运行装。",
        "next": "xj-b-handoff"
      }
    ],
    "chapter": "xiangjiang",
    "nativeAudio": true,
    "video": "assets/chapters/xiang-groups-v032.mp4",
    "poster": "assets/chapters/xiang-groups-first-v032.png",
    "hold": "assets/chapters/xiang-groups-hold-v032.png",
    "duration": 4.096009,
    "textAfterMovie": true,
    "title": "湘江渡口的担架与行装转运",
    "filmId": "XJ-02"
  },
  {
    "id": "xj-a-lusheng",
    "speaker": "心声",
    "text": "担架还没抬起来，我走到后头蹲下，手背碰到了垂着的布边。上面躺着个年轻战士，见我伸手去握把手，朝我的袖子指了一下。",
    "scene": "lusheng-stretcher-first",
    "next": "xj-a-name",
    "mode": "thought",
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-a-name",
    "speaker": "陆生",
    "text": "你先把袖子挽好，别挂住了。",
    "scene": "lusheng-stretcher-first",
    "next": "xj-a-roll",
    "mode": "dialogue",
    "chapter": "xiangjiang",
    "nativeAudio": true,
    "video": "assets/chapters/lusheng-stretcher-v032.mp4",
    "poster": "assets/chapters/lusheng-stretcher-first-v032.png",
    "hold": "assets/chapters/lusheng-stretcher-pause-v032.png",
    "duration": 2.7,
    "advanceOnEnd": true,
    "filmId": "XJ-03",
    "title": "担架上的陆生与你相识",
    "mediaStart": 0,
    "mediaEnd": 2.7,
    "captionCues": [
      {
        "text": "你先把袖子挽好，",
        "start": 0.21,
        "end": 1.31
      },
      {
        "text": "别挂住了。",
        "start": 1.55,
        "end": 2.05
      }
    ]
  },
  {
    "id": "xj-a-roll",
    "text": "",
    "scene": "lusheng-river-pause",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "roll-sleeve",
        "label": "把袖口往上卷好。",
        "next": "xj-a-introduce"
      }
    ],
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-a-introduce",
    "text": "我叫陆生。你呢？",
    "scene": "lusheng-stretcher-first",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "xiangjiang",
    "next": "xj-a-tell",
    "nativeAudio": true,
    "video": "assets/chapters/lusheng-stretcher-v032.mp4",
    "poster": "assets/chapters/lusheng-stretcher-pause-v032.png",
    "hold": "assets/chapters/lusheng-stretcher-hold-v032.png",
    "duration": 3.316667,
    "advanceOnEnd": true,
    "filmId": "XJ-03",
    "title": "担架上的陆生与你相识",
    "mediaStart": 2.7,
    "mediaEnd": 6.016667,
    "captionCues": [
      {
        "text": "我叫陆生。",
        "start": 3.18,
        "end": 4.88
      },
      {
        "text": "你呢？",
        "start": 5.52,
        "end": 5.87
      }
    ]
  },
  {
    "id": "xj-a-tell",
    "text": "",
    "scene": "lusheng-river-hold",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "tell-lusheng",
        "label": "我叫小满。",
        "next": "xj-a-tell-spoken-v034"
      }
    ],
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-a-tell-spoken-v034",
    "chapter": "xiangjiang",
    "scene": "lusheng-river-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "我叫小满。",
    "next": "xj-a-water",
    "voice": "assets/audio/xiaoman-v034/XM02.mp3",
    "voiceDuration": 1.525,
    "voiceId": "XM02"
  },
  {
    "id": "xj-a-water",
    "speaker": "心声",
    "text": "陈禾在前头握住把手，回头看了我一眼。等我点头，两个人才一起起身。",
    "scene": "xiang-bank",
    "next": "xj-shallows-v034",
    "mode": "thought",
    "chapter": "xiangjiang"
  },
  {
    "chapter": "xiangjiang",
    "scene": "xiang-bank",
    "speaker": "旁白",
    "mode": "observation",
    "id": "xj-shallows-v034",
    "text": "担架的重量压在掌根上，走到浅水里，前面的人还堵着。水从鞋口灌进来，河面接连溅起几团水花，枪声跟着压过来。陈禾低下身子，脚却没挪，直到前面空出位置才往前走。",
    "choices": [
      {
        "id": "continue-xj-shallows-v034",
        "label": "握稳把手，跟着陈禾的步子走。",
        "next": "xj-release-v034"
      }
    ]
  },
  {
    "id": "xj-b-handoff",
    "text": "梁叔收好针线包，托着行装朝我转过身。",
    "scene": "liang-handoff-first",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "xiangjiang",
    "next": "xj-b-bag"
  },
  {
    "id": "xj-b-bag",
    "speaker": "梁叔",
    "text": "这个你先替我拿着，过了江再给我。",
    "scene": "liang-handoff-first",
    "next": "xj-b-leave",
    "mode": "dialogue",
    "chapter": "xiangjiang",
    "nativeAudio": true,
    "video": "assets/chapters/liang-handoff-v033.mp4",
    "poster": "assets/chapters/liang-handoff-first-v033.png",
    "hold": "assets/chapters/liang-handoff-hold-v033.png",
    "duration": 4.096009,
    "title": "梁叔临时托小满接运行装",
    "filmId": "XJ-04",
    "advanceOnEnd": true,
    "captionCues": [
      {
        "text": "这个你先替我拿着，",
        "start": 0.42,
        "end": 2.38
      },
      {
        "text": "过了江再给我。",
        "start": 2.81,
        "end": 4.01
      }
    ]
  },
  {
    "id": "xj-b-leave",
    "text": "后头又在叫人，梁叔转身往那边去了。我把他的包往怀里抱紧，跟上前面搬行装的人。",
    "scene": "liang-handoff-hold",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "xiangjiang",
    "next": "xj-pack-cross-v034"
  },
  {
    "chapter": "xiangjiang",
    "scene": "liang-handoff-hold",
    "speaker": "旁白",
    "mode": "observation",
    "id": "xj-pack-cross-v034",
    "text": "我抱着梁叔的包往水边挪，背后的人还在催。包被挤得滑下来一点，腾不出手扶木桩，我只好把下巴抵在包布上。",
    "choices": [
      {
        "id": "continue-xj-pack-cross-v034",
        "label": "抱稳包，沿着前面空出的地方过去。",
        "next": "xj-b-letter"
      }
    ]
  },
  {
    "id": "xj-b-letter",
    "speaker": "心声",
    "text": "到了对岸，包布已经湿了一大片。我把黏在上面的纸角轻轻揭开，才看出是一封没写完的信。",
    "scene": "keepsakes",
    "next": "xj-b-protect",
    "mode": "thought",
    "document": "娘，等有了落脚的地方……",
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-b-protect",
    "speaker": "心声",
    "text": "",
    "scene": "keepsakes",
    "mode": "thought",
    "chapter": "xiangjiang",
    "choices": [
      {
        "id": "protect-letter",
        "label": "不再展开，把纸和针线包分别裹好。",
        "next": "xj-wait"
      }
    ]
  },
  {
    "id": "xj-wait",
    "speaker": "心声",
    "text": "渡口还得给后面的人让路，我和陈禾退到石头后面。过来的战士裤腿都湿透了，一走，鞋里就往外冒水。河上断断续续响着枪声，我听见脚步近了，便抬头看一眼。\n\n陈禾把行装往身边拢了拢，石头旁留下一块空地。",
    "scene": "chenhe-wait",
    "next": "xj-news-a",
    "mode": "thought",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "xj-news-b"
      }
    ],
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-news-a",
    "speaker": "心声",
    "text": "转运同志从渡口过来，在石头旁停下，把一个布包递给我。露在他掌外的包角已经磨白，我认得，是梁叔的针线包。",
    "scene": "needle-pouch",
    "mode": "thought",
    "chapter": "xiangjiang",
    "choices": [
      {
        "id": "continue-xj-news-a",
        "label": "接住包，抬头问他。",
        "next": "xj-ask-liang"
      }
    ]
  },
  {
    "id": "xj-news-b",
    "speaker": "旁白",
    "text": "",
    "scene": "keepsakes",
    "next": "xj-ask-liang",
    "mode": "observation",
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-ask-liang",
    "text": "",
    "scene": "xiang-loss-first",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "ask-liang",
        "label": "梁叔呢？他还在后头吗？",
        "next": "xj-ask-liang-spoken-v034"
      }
    ],
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-ask-liang-spoken-v034",
    "chapter": "xiangjiang",
    "scene": "xiang-loss-first",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "梁叔呢？他还在后头吗？",
    "next": "xj-loss",
    "voice": "assets/audio/xiaoman-v034/XM04.mp3",
    "voiceDuration": 2.4675,
    "voiceId": "XM04"
  },
  {
    "id": "xj-loss",
    "speaker": "转运同志",
    "text": "梁叔回去帮我们抬担架，在江边中了弹。我们没能把他救回来。",
    "scene": "xiang-loss-first",
    "next": "xj-unfinished",
    "mode": "dialogue",
    "chapter": "xiangjiang",
    "nativeAudio": true,
    "video": "assets/chapters/xiang-loss-v033.mp4",
    "poster": "assets/chapters/xiang-loss-first-v033.png",
    "hold": "assets/chapters/xiang-loss-hold-v033.png",
    "duration": 7.103991,
    "title": "转运同志在湘江另一侧报信",
    "filmId": "XJ-05",
    "advanceOnEnd": false,
    "captionPages": [
      {
        "text": "梁叔回去帮我们抬担架，",
        "start": 0.23,
        "end": 1.85
      },
      {
        "text": "在江边中了弹。",
        "start": 2.07,
        "end": 3.43
      },
      {
        "text": "我们没能把他救回来。",
        "start": 5.23,
        "end": 6.75
      }
    ]
  },
  {
    "id": "xj-unfinished",
    "speaker": "心声",
    "text": "我低头翻开袖口，裂口边上还留着他刚缝的三针。",
    "scene": "sleeve-three",
    "next": "xj-last-stitches",
    "mode": "thought",
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-last-stitches",
    "text": "过江前他还说，到了这边再给我补。",
    "scene": "sleeve-three",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "xiangjiang",
    "next": "xj-silence",
    "voice": "assets/audio/xiaoman-v034/XM05.mp3",
    "voiceDuration": 3.1375,
    "voiceId": "XM05"
  },
  {
    "id": "xj-silence",
    "speaker": "心声",
    "text": "（陈禾在旁边蹲下。）\n\n背后有人扛着包挤过去，湿衣服擦过我的肩。陈禾往里拖了拖脚边的行装，给他们让出路，才在我旁边坐下。\n\n等集合声喊到第二遍，他才起身。",
    "scene": "chenhe-wait",
    "next": "xj-pack",
    "mode": "thought",
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-pack",
    "speaker": "心声",
    "text": "",
    "scene": "needle-pouch",
    "mode": "thought",
    "choices": [
      {
        "id": "keep-pouch",
        "label": "收好针线包，跟着陈禾站起来。",
        "next": "xj-gather-v034"
      }
    ],
    "chapter": "xiangjiang"
  },
  {
    "id": "xj-end",
    "checkpoint": true,
    "scene": "xiang-bank",
    "next": "zy-arrive",
    "chapter": "xiangjiang"
  },
  {
    "id": "zy-arrive",
    "speaker": "旁白",
    "text": "门边晾着几双湿袜子，水滴落在地上。我卸下行装，抬起胳膊时袖口又绷住了；江边那道裂口，只靠梁叔的三针撑到现在。\n\n油灯搁在桌角，凑近了能闻见一股油味。陈禾把我的袖口往亮处拉了拉，手里的针停了一会儿，又抬头看了眼灯。",
    "scene": "zunyi-lamp",
    "next": "zy-ask-sewing",
    "mode": "observation",
    "chapter": "zunyi",
    "historicalTab": "1月15日至17日，遵义会议召开，集中解决当时具有决定意义的军事和组织问题"
  },
  {
    "id": "zy-ask-sewing",
    "text": "",
    "scene": "zunyi-lamp",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "ask-sewing",
        "label": "你以前跟梁叔学过补衣服？",
        "next": "zy-ask-sewing-spoken-v034"
      }
    ],
    "chapter": "zunyi"
  },
  {
    "id": "zy-ask-sewing-spoken-v034",
    "chapter": "zunyi",
    "scene": "zunyi-lamp",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "你以前跟梁叔学过补衣服？",
    "next": "zy-thread",
    "voice": "assets/audio/xiaoman-v034/XM06.mp3",
    "voiceDuration": 2.15,
    "voiceId": "XM06"
  },
  {
    "id": "zy-thread",
    "speaker": "陈禾",
    "text": "梁叔教过。到我手上……就是不听使唤。灯挪近点啊。",
    "scene": "zunyi-lamp",
    "next": "zy-light",
    "mode": "dialogue",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-sewing-v019.mp4",
    "poster": "assets/chapters/chenhe-sewing-first-v019.png",
    "hold": "assets/chapters/chenhe-sewing-hold-v019.png",
    "duration": 8.096009,
    "title": "陈禾在遵义灯下替小满补衣",
    "replayLabel": "重看灯下补衣",
    "advanceOnEnd": true,
    "chapter": "zunyi",
    "captionCues": [
      {
        "text": "梁叔教过。",
        "start": 0.58,
        "end": 1.6
      },
      {
        "text": "到我手上……",
        "start": 2.49,
        "end": 3.16
      },
      {
        "text": "就是不听使唤。",
        "start": 3.69,
        "end": 4.55
      },
      {
        "text": "灯挪近点啊。",
        "start": 7.21,
        "end": 7.97
      }
    ]
  },
  {
    "id": "zy-light",
    "speaker": "心声",
    "text": "",
    "scene": "chenhe-sewing-hold",
    "mode": "thought",
    "choices": [
      {
        "id": "hold-light",
        "label": "把灯往陈禾手边挪近一些。",
        "next": "zy-route"
      }
    ],
    "chapter": "zunyi"
  },
  {
    "id": "zy-route",
    "speaker": "旁白",
    "text": "",
    "scene": "chenhe-sewing-hold",
    "next": "zy-a-lusheng",
    "mode": "observation",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "zy-b-letter"
      }
    ],
    "chapter": "zunyi"
  },
  {
    "id": "zy-a-lusheng",
    "speaker": "心声",
    "text": "陆生挪开桌边的包，我把灯再往前推了推。陈禾放低胳膊，不用再举着袖口找光了。",
    "scene": "lusheng-clears-table-first",
    "next": "zy-a-return",
    "mode": "thought",
    "chapter": "zunyi",
    "nativeAudio": true,
    "video": "assets/chapters/lusheng-clears-table-v034.mp4",
    "poster": "assets/chapters/lusheng-clears-table-first-v034.png",
    "hold": "assets/chapters/lusheng-clears-table-hold-v034.png",
    "duration": 4.096,
    "advanceOnEnd": false,
    "filmId": "ZY-02",
    "title": "陆生挪开桌边的布包",
    "textAfterMovie": true
  },
  {
    "id": "zy-a-return",
    "speaker": "心声",
    "text": "包放到了脚下，陆生想伸一伸腿，又碰到了它。",
    "scene": "lusheng-clears-table-hold",
    "next": "zy-a-move-bag",
    "mode": "thought",
    "chapter": "zunyi"
  },
  {
    "id": "zy-a-move-bag",
    "text": "",
    "scene": "lusheng-clears-table-hold",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "move-bag",
        "label": "替他把包提到凳子旁边。",
        "next": "zy-mended"
      }
    ],
    "chapter": "zunyi"
  },
  {
    "id": "zy-b-letter",
    "speaker": "心声",
    "text": "陈禾松开我的袖口，我把怀里的旧信拿出来，放到他面前。裹了这么久，信纸展开后还是皱的，折痕处已经有些起毛。",
    "scene": "keepsakes",
    "next": "zy-b-offer",
    "mode": "thought",
    "chapter": "zunyi"
  },
  {
    "id": "zy-b-offer",
    "text": "",
    "scene": "keepsakes",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "offer-letter",
        "label": "这是梁叔没写完的家书，要不我替他接着写？",
        "next": "zy-b-offer-spoken-v034"
      }
    ],
    "chapter": "zunyi"
  },
  {
    "id": "zy-b-offer-spoken-v034",
    "chapter": "zunyi",
    "scene": "keepsakes",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "这是梁叔没写完的家书，要不我替他接着写？",
    "next": "zy-b-question",
    "voice": "assets/audio/xiaoman-v034/XM07.mp3",
    "voiceDuration": 4.0825,
    "voiceId": "XM07"
  },
  {
    "id": "zy-b-question",
    "text": "你打算写什么？",
    "scene": "chenhe-unfinished-letter-first",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "zunyi",
    "next": "zy-b-answer",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-unfinished-letter-v034.mp4",
    "poster": "assets/chapters/chenhe-unfinished-letter-first-v034.png",
    "hold": "assets/chapters/chenhe-unfinished-letter-pause-v034.png",
    "duration": 7.104,
    "title": "陈禾问小满打算写什么",
    "advanceOnEnd": true,
    "filmId": "ZY-03",
    "mediaEnd": 2.15,
    "captionCues": [
      {
        "text": "你打算写什么？",
        "start": 0.3,
        "end": 1.22
      }
    ]
  },
  {
    "id": "zy-b-answer",
    "text": "",
    "scene": "chenhe-unfinished-letter-pause",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "not-yet",
        "label": "还没想好。",
        "next": "zy-b-answer-spoken-v034"
      }
    ],
    "chapter": "zunyi"
  },
  {
    "id": "zy-b-answer-spoken-v034",
    "chapter": "zunyi",
    "scene": "chenhe-unfinished-letter-pause",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "还没想好。",
    "next": "zy-b-advice",
    "voice": "assets/audio/xiaoman-v034/XM08.mp3",
    "voiceDuration": 1.1625,
    "voiceId": "XM08"
  },
  {
    "id": "zy-b-advice",
    "text": "那就先收着吧。",
    "scene": "chenhe-unfinished-letter-pause",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "zunyi",
    "next": "zy-b-move-lamp",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-unfinished-letter-v034.mp4",
    "poster": "assets/chapters/chenhe-unfinished-letter-pause-v034.png",
    "hold": "assets/chapters/chenhe-unfinished-letter-lamp-v034.png",
    "duration": 7.104,
    "title": "陈禾劝小满先收好旧信",
    "advanceOnEnd": true,
    "filmId": "ZY-03",
    "mediaStart": 2.15,
    "mediaEnd": 5.02,
    "captionCues": [
      {
        "text": "那就先收着吧。",
        "start": 3.32,
        "end": 4.19
      }
    ]
  },
  {
    "id": "zy-b-move-lamp",
    "text": "",
    "scene": "chenhe-unfinished-letter-lamp",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "zunyi",
    "next": "zy-b-paper"
  },
  {
    "id": "zy-b-paper",
    "text": "纸别挨着火。",
    "scene": "chenhe-unfinished-letter-lamp",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "zunyi",
    "next": "zy-b-fold",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-unfinished-letter-v034.mp4",
    "poster": "assets/chapters/chenhe-unfinished-letter-lamp-v034.png",
    "hold": "assets/chapters/chenhe-unfinished-letter-hold-v034.png",
    "duration": 7.104,
    "advanceOnEnd": true,
    "filmId": "ZY-03",
    "title": "陈禾提醒把信纸放远些",
    "mediaStart": 5.02,
    "captionPages": [
      {
        "text": "那就先收着吧。",
        "start": 3.32,
        "end": 4.19
      },
      {
        "text": "纸别挨着火。",
        "start": 5.27,
        "end": 6.22
      }
    ]
  },
  {
    "id": "zy-b-fold",
    "speaker": "心声",
    "text": "",
    "scene": "chenhe-unfinished-letter-hold",
    "mode": "thought",
    "chapter": "zunyi",
    "choices": [
      {
        "id": "fold-letter",
        "label": "沿着原来的折痕收好，包回干布里。",
        "next": "zy-mended"
      }
    ],
    "document": "娘，等有了落脚的地方……"
  },
  {
    "id": "zy-mended",
    "speaker": "心声",
    "text": "我伸了伸胳膊，袖口这回没再勒着。陈禾接上的新线挨着梁叔留下的三针，两段针脚还分得出来。",
    "scene": "sleeve-mended",
    "next": "zy-depart",
    "mode": "thought",
    "chapter": "zunyi"
  },
  {
    "id": "zy-depart",
    "speaker": "心声",
    "text": "门外响起磕鞋泥的声音。合好的针线包放在桌沿，我放下袖口，伸手去拿。",
    "scene": "chenhe-sewing-hold",
    "mode": "thought",
    "choices": [
      {
        "id": "pack-again",
        "label": "收好针线，跟陈禾出门。",
        "next": "zy-door-v034"
      }
    ],
    "chapter": "zunyi"
  },
  {
    "id": "zy-end",
    "checkpoint": true,
    "scene": "sleeve-mended",
    "next": "t1-arrive",
    "chapter": "zunyi"
  },
  {
    "id": "t1-arrive",
    "speaker": "旁白",
    "text": "跟着队伍拐上小路，我又看见那截歪树根，昨天刚从这里走过。袜子还没晾干，贴在脚底磨得疼，我赶上陈禾，问了一句。",
    "scene": "chishui-trail",
    "next": "t1-familiar",
    "mode": "observation",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1,
    "chapter": "rivers",
    "historicalTab": "中央红军四渡赤水，在围追堵截中灵活机动"
  },
  {
    "id": "t1-familiar",
    "speaker": "旁白",
    "text": "",
    "scene": "chishui-trail",
    "next": "t1-route-question-v034",
    "mode": "observation",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1,
    "chapter": "rivers",
    "legacyNext": "t1-history"
  },
  {
    "chapter": "rivers",
    "scene": "chenhe-chishui-route-first",
    "speaker": "心声",
    "mode": "thought",
    "id": "t1-route-question-v034",
    "text": "",
    "next": "t1-ask-route-v036",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1
  },
  {
    "id": "t1-route-question-v034-spoken-v034",
    "chapter": "rivers",
    "scene": "chenhe-chishui-route-first",
    "speaker": "小满",
    "mode": "dialogue",
    "text": "刚从这边过来，怎么又往回走？",
    "next": "t1-route-answer-v034",
    "voice": "assets/audio/xiaoman-v034/XM09.mp3",
    "voiceDuration": 2.74,
    "voiceId": "XM09",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1
  },
  {
    "chapter": "rivers",
    "scene": "chenhe-chishui-route-first",
    "speaker": "陈禾",
    "mode": "dialogue",
    "id": "t1-route-answer-v034",
    "text": "",
    "next": "t1-chenhe-route-v036",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1
  },
  {
    "id": "t1-history",
    "speaker": "旁白",
    "text": "船刚离岸，一股水拍上船帮，打湿了衣襟。我低头掀开包布看了看，针线包还干着，只湿了外头露着的一角。",
    "scene": "jinsha-crossing",
    "next": "t1-dry",
    "mode": "observation",
    "routePlace": "金沙江",
    "routeDate": "1935年5月上旬",
    "routeStep": 2,
    "chapter": "rivers"
  },
  {
    "id": "t1-dry",
    "speaker": "心声",
    "text": "",
    "scene": "needle-pouch",
    "mode": "thought",
    "routePlace": "金沙江",
    "routeDate": "1935年5月上旬",
    "routeStep": 2,
    "chapter": "rivers",
    "choices": [
      {
        "id": "continue-t1-dry",
        "label": "把布换个干些的面，重新裹好。",
        "next": "t1-jinsha-route-v034"
      }
    ]
  },
  {
    "id": "t1-letter",
    "speaker": "心声",
    "text": "旧信裹在更里面，没沾着水。我沿着折痕展开一点，纸已经磨薄了，便没再往下翻。",
    "scene": "keepsakes",
    "next": "t1-go",
    "mode": "thought",
    "routePlace": "金沙江",
    "routeDate": "1935年5月上旬",
    "routeStep": 2,
    "chapter": "rivers"
  },
  {
    "id": "t1-go",
    "speaker": "心声",
    "text": "",
    "scene": "jinsha-crossing",
    "mode": "thought",
    "routePlace": "金沙江",
    "routeDate": "1935年5月上旬",
    "routeStep": 2,
    "choices": [
      {
        "id": "northward",
        "label": "沿着折痕把信折好，放回行装内层。",
        "next": "t1-end"
      }
    ],
    "chapter": "rivers"
  },
  {
    "id": "t1-end",
    "checkpoint": true,
    "scene": "jinsha-crossing",
    "next": "t2-arrive",
    "routePlace": "金沙江",
    "routeDate": "1935年5月上旬",
    "routeStep": 2,
    "chapter": "rivers"
  },
  {
    "id": "t2-arrive",
    "speaker": "旁白",
    "text": "新补的桥板旁还留着焦黑的木头。我扶着铁索往前挪，掌心蹭上一层湿灰，脚下也随着前面的人晃起来。陈禾放慢脚步，等我跨过板缝。",
    "scene": "luding-bridge",
    "next": "t2-cross",
    "mode": "observation",
    "chapter": "luding"
  },
  {
    "id": "t2-cross",
    "speaker": "心声",
    "text": "快到桥头，后面又有担架过来。风掀起盖在伤员身上的军衣，抬担架的人腾出一只手按住，我赶紧往旁边靠。",
    "scene": "luding-bridge",
    "next": "t2-wait",
    "mode": "thought",
    "chapter": "luding"
  },
  {
    "id": "t2-wait",
    "speaker": "旁白",
    "text": "",
    "scene": "luding-bank",
    "next": "t2-help",
    "mode": "observation",
    "chapter": "luding"
  },
  {
    "id": "t2-help",
    "speaker": "心声",
    "text": "",
    "scene": "luding-bank",
    "mode": "thought",
    "choices": [
      {
        "id": "make-way",
        "label": "退到桥头旁边，让出通道。",
        "next": "t2-end"
      }
    ],
    "chapter": "luding"
  },
  {
    "id": "t2-end",
    "scene": "luding-bank",
    "chapter": "luding",
    "checkpoint": true,
    "next": "snow-arrive"
  },
  {
    "id": "t1-chishui-wait-v034",
    "chapter": "rivers",
    "scene": "chenhe-chishui-route-hold",
    "speaker": "旁白",
    "mode": "observation",
    "text": "",
    "next": "t1-history",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1
  },
  {
    "id": "t1-jinsha-route-v034",
    "chapter": "rivers",
    "scene": "jinsha-crossing",
    "text": "",
    "next": "t1-end",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "t1-letter"
      }
    ]
  },
  {
    "id": "xj-release-v034",
    "chapter": "xiangjiang",
    "scene": "chenhe-wait",
    "speaker": "旁白",
    "mode": "observation",
    "text": "对岸的人迎上来接过担架，我这才松开把手，手指还蜷着，一时伸不直。",
    "next": "xj-wait"
  },
  {
    "id": "xj-gather-v034",
    "chapter": "xiangjiang",
    "scene": "needle-pouch",
    "speaker": "旁白",
    "mode": "observation",
    "text": "走出几步，陈禾回头等我。路边抬担架的人正弯腰换手，我侧身从他们旁边过去，衣里的针线包隔着布抵住肋下。",
    "next": "xj-end"
  },
  {
    "id": "zy-door-v034",
    "chapter": "zunyi",
    "scene": "chenhe-sewing-hold",
    "speaker": "旁白",
    "mode": "observation",
    "text": "门口有人蹲着换鞋，把还没晾干的袜子卷进包里。陈禾扶住门，让我先过；袖口蹭到门框，我抬了抬胳膊，这回没挂住。",
    "choices": [
      {
        "id": "join-company",
        "label": "背好行装，走到队伍里。",
        "next": "zy-end"
      }
    ]
  },
  {
    "id": "xj-cover-fire-v035",
    "speaker": "陈禾",
    "text": "别站起来！等这阵过去，担架先走。",
    "scene": "chenhe-xiang-cover-first",
    "next": "xj-cover-wait-v035",
    "mode": "dialogue",
    "chapter": "xiangjiang",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-xiang-cover-v035.mp4",
    "poster": "assets/chapters/chenhe-xiang-cover-first-v035.png",
    "hold": "assets/chapters/chenhe-xiang-cover-hold-v035.png",
    "duration": 5.088,
    "captionPages": [
      {
        "text": "别站起来！",
        "start": 1.7,
        "end": 2.55
      },
      {
        "text": "等这阵过去，担架先走。",
        "start": 2.8,
        "end": 4.5
      }
    ],
    "title": "陈禾在湘江岸边示意小满伏低",
    "filmId": "XJ-06",
    "advanceOnEnd": true
  },
  {
    "id": "t1-chenhe-route-v036",
    "speaker": "陈禾",
    "text": "前头改了路。先跟上，别落在后头。",
    "scene": "chenhe-chishui-route-first",
    "next": "t1-shoulder-pack-v036",
    "mode": "dialogue",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1,
    "chapter": "rivers",
    "nativeAudio": true,
    "video": "assets/chapters/chenhe-chishui-route-v036.mp4",
    "poster": "assets/chapters/chenhe-chishui-route-first-v036.png",
    "hold": "assets/chapters/chenhe-chishui-route-hold-v036.png",
    "duration": 4.096,
    "captionPages": [
      {
        "text": "前头改了路。",
        "start": 1.3,
        "end": 2
      },
      {
        "text": "先跟上，别落在后头。",
        "start": 2.34,
        "end": 3.65
      }
    ],
    "title": "赤水山路上，陈禾回头招呼小满跟上",
    "filmId": "CS-01",
    "advanceOnEnd": true
  },
  {
    "id": "xj-cover-wait-v035",
    "speaker": "心声",
    "text": "",
    "scene": "chenhe-xiang-cover-hold",
    "mode": "thought",
    "choices": [
      {
        "id": "stay-low",
        "label": "伏低，等陈禾示意再起身",
        "next": "xj-choice"
      }
    ],
    "chapter": "xiangjiang"
  },
  {
    "id": "t1-ask-route-v036",
    "speaker": "小满",
    "text": "",
    "scene": "chenhe-chishui-route-first",
    "mode": "thought",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1,
    "chapter": "rivers",
    "choices": [
      {
        "id": "ask-route",
        "label": "刚从这边过来，怎么又往回走？",
        "next": "t1-route-question-v034-spoken-v034"
      }
    ]
  },
  {
    "id": "t1-shoulder-pack-v036",
    "speaker": "旁白",
    "text": "到了河边，船还没回来，身旁的人已经靠着包坐下。我刚把一边肩带卸开，前头又动了，赶紧把它拽回肩上。",
    "scene": "chenhe-chishui-route-hold",
    "mode": "observation",
    "routePlace": "赤水河一带",
    "routeDate": "1935年1—3月",
    "routeStep": 1,
    "chapter": "rivers",
    "choices": [
      {
        "id": "shoulder-pack",
        "label": "背紧行装，跟上前面的人",
        "next": "t1-chishui-wait-v034"
      }
    ]
  }
];
 for(const [first,last,id] of [['xj-arrive','xj-end','xiangjiang'],['zy-arrive','zy-end','zunyi'],['t1-arrive','t1-end','rivers'],['t2-arrive','t2-end','luding']]){
  let within=false;for(const n of nodes){if(n.id===first)within=true;if(within)n.chapter=id;if(n.id===last)within=false;}
 }
 const names=['xiang-bank','liang-sewing','lusheng-river','keepsakes','needle-pouch','chenhe-wait','zunyi-lamp','lusheng-lamp','sleeve-three','sleeve-mended','chishui-trail','jinsha-crossing','luding-bridge','luding-bank'];
 const data={nodes,images:{'liang-handoff-first':'assets/chapters/liang-handoff-first-v033.png','liang-handoff-hold':'assets/chapters/liang-handoff-hold-v033.png','xiang-loss-first':'assets/chapters/xiang-loss-first-v033.png','xiang-loss-hold':'assets/chapters/xiang-loss-hold-v033.png',...Object.fromEntries(names.map(n=>[n,'assets/chapters/'+n+'-v014.webp'])),'xiang-groups-hold':'assets/chapters/xiang-groups-hold-v032.png','lusheng-stretcher-first':'assets/chapters/lusheng-stretcher-first-v032.png','lusheng-river-pause':'assets/chapters/lusheng-stretcher-pause-v032.png','lusheng-river-hold':'assets/chapters/lusheng-stretcher-hold-v032.png','liang-sewing':'assets/chapters/liang-sewing-first-v018.png','liang-sewing-hold':'assets/chapters/liang-sewing-hold-v018.png','zunyi-lamp':'assets/chapters/chenhe-sewing-first-v019.png','chenhe-sewing-hold':'assets/chapters/chenhe-sewing-hold-v019.png'},
  chapters:[
  {
    "id": "yudu",
    "name": "第一站 · 于都",
    "title": "一只伸来的手",
    "location": "江西于都",
    "date": "1934年10月",
    "start": "river",
    "end": "end",
    "ambient": "river",
    "image": "portrait",
    "ending": "路还很远，\n有人与你同行",
    "summary": "于都河畔的相识与互相照应，伴随队伍渡河启程",
    "button": "前往湘江"
  },
  {
    "id": "xiangjiang",
    "name": "第二站 · 湘江",
    "title": "少了一个人的位置",
    "location": "广西湘江一线",
    "date": "1934年11月下旬—12月初",
    "start": "xj-arrive",
    "end": "xj-end",
    "ambient": "cold",
    "image": "xiang-bank",
    "ending": "收好针线，\n再跟上队伍",
    "summary": "梁叔的针线包带过了江，他却没能回来",
    "button": "前往遵义"
  },
  {
    "id": "zunyi",
    "name": "第三站 · 遵义",
    "title": "三针以后",
    "location": "贵州遵义",
    "date": "1935年1月",
    "start": "zy-arrive",
    "end": "zy-end",
    "ambient": "room",
    "image": "zunyi-lamp",
    "ending": "灯挪近一点，\n袖口缝好了",
    "summary": "新针脚接在旧线旁，灯下补好的袖口将陪我们走向下一程",
    "button": "继续看赤水与金沙江"
  },
  {
    "id": "rivers",
    "name": "历史转场一",
    "title": "河流又在面前",
    "location": "赤水—金沙江",
    "date": "1935年1—5月",
    "start": "t1-arrive",
    "end": "t1-end",
    "ambient": "cold",
    "image": "jinsha-crossing",
    "ending": "又一条江，\n又一段路",
    "summary": "从赤水到金沙江，地图上相连的路线隔着数月转战",
    "button": "继续前往泸定桥"
  },
  {
    "id": "luding",
    "name": "历史转场二",
    "title": "有人先把路打开",
    "location": "大渡河 · 泸定桥",
    "date": "1935年5月",
    "start": "t2-arrive",
    "end": "t2-end",
    "ambient": "gorge",
    "image": "luding-bridge",
    "ending": "前头的路，\n有人先走过",
    "summary": "跟随后续部队过桥，再向前方的雪山进发",
    "button": "翻开夹金山这一页"
  }
],
  alts:{'liang-handoff-first':'梁叔托着旧布行装在湘江渡口旁临时请小满帮忙','liang-handoff-hold':'小满接住梁叔的行装，梁叔看向身侧的队伍','xiang-loss-first':'转运同志在湘江另一侧蹲到小满面前，身后有人走过','xiang-loss-hold':'同一位转运同志说完后低下视线，仍在石头旁停着','xiang-bank':'湿冷的湘江岸边，队伍与转运伤员的同志在等候过江','liang-sewing':'梁叔在湘江岸边替小满补袖口，背后战士继续走过','liang-sewing-hold':'梁叔补好三针后低下头，仍是同一片湘江岸边和过往的战士','xiang-groups-hold':'湘江渡口的担架队经过身前，岸边战士仍在接运行装','lusheng-stretcher-first':'陆生侧靠在湘江岸边尚未抬起的担架上，抬手提醒小满挽好袖口','lusheng-river-pause':'陆生说完袖口提醒，仍靠在同一副担架上等候','lusheng-river-hold':'陆生在同一副担架上抬眼看向小满，等待回答名字','keepsakes':'受潮的未完成家书与梁叔的旧针线包','needle-pouch':'收进干布中的同一个旧针线包','chenhe-wait':'陈禾在渐暗的湘江岸边陪小满等人','zunyi-lamp':'陈禾在遵义借住屋里低头缝衣，油灯照着桌面和小满伸出的袖口','chenhe-sewing-hold':'陈禾在同一张桌前抬起头请小满挪近灯，手里仍捏着袖口','lusheng-lamp':'同一位陆生坐稳在遵义屋里，灯在身旁照着','sleeve-three':'破开的灰布袖口上留下三针旧线','sleeve-mended':'同一片灰布袖口上旧线仍在，旁边接上新的补线','chishui-trail':'雨后的赤水河谷泥路，背着铺盖的战士向前行进','jinsha-crossing':'金沙江河谷与小木船，队伍在江边等候','luding-bridge':'战斗后已铺木板的泸定铁索桥通路，桥下是大渡河','luding-bank':'泸定桥边，照应后续队伍的战士留出通道'}
 };
 Object.assign(data.images,{"chenhe-chishui-route-first": "assets/chapters/chenhe-chishui-route-first-v036.png", "chenhe-chishui-route-hold": "assets/chapters/chenhe-chishui-route-hold-v036.png", "chenhe-xiang-cover-first": "assets/chapters/chenhe-xiang-cover-first-v035.png", "chenhe-xiang-cover-hold": "assets/chapters/chenhe-xiang-cover-hold-v035.png", "lusheng-clears-table-first": "assets/chapters/lusheng-clears-table-first-v034.png", "lusheng-clears-table-hold": "assets/chapters/lusheng-clears-table-hold-v034.png", "chenhe-unfinished-letter-first": "assets/chapters/chenhe-unfinished-letter-first-v034.png", "chenhe-unfinished-letter-pause": "assets/chapters/chenhe-unfinished-letter-pause-v034.png", "chenhe-unfinished-letter-lamp": "assets/chapters/chenhe-unfinished-letter-lamp-v034.png", "chenhe-unfinished-letter-hold": "assets/chapters/chenhe-unfinished-letter-hold-v034.png"});
 Object.assign(data.alts,{"chenhe-chishui-route-first": "陈禾背着铺盖走在赤水的泥泞山路上，回头望向小满", "chenhe-chishui-route-hold": "陈禾侧身跟上队伍，湿泥路沿着山坡伸向远处", "chenhe-xiang-cover-first": "陈禾伏在湘江岸边的土坎后，朝河面望去", "chenhe-xiang-cover-hold": "陈禾仍伏在土坎后，回头看向小满", "lusheng-clears-table-first": "陆生坐在遵义借住屋里，双手扶着桌边的布包", "lusheng-clears-table-hold": "陆生把包移到脚边，低头看向被挡住的腿", "chenhe-unfinished-letter-first": "陈禾坐在遵义借住屋的油灯旁，桌前放着梁叔的旧信", "chenhe-unfinished-letter-pause": "陈禾问完后坐在灯旁，等小满回答", "chenhe-unfinished-letter-lamp": "陈禾伸手挪动油灯，旧信仍放在桌上", "chenhe-unfinished-letter-hold": "陈禾说完后扶着油灯，旧信仍放在桌上"});
 if(typeof module==='object'&&module.exports)module.exports=data;else root.MARCH_CHAPTERS=data;
})(typeof window==='undefined'?globalThis:window);
