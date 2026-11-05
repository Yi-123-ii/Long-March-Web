(function(root){
 'use strict';
 const t=(id,text,scene,next,extra={})=>({id,speaker:'心声',text,scene,next,mode:'thought',...extra});
 const f=(id,text,scene,next)=>({id,speaker:'行军纪事',text,scene,next,mode:'fact'});
 const nodes=[
  {
    "id": "snow-arrive",
    "speaker": "旁白",
    "text": "铺盖一头长、一头短，陈禾刚把绳子绕上去，短的那头就往里缩。我替他压住，等他重新捆。",
    "scene": "mountain-pack",
    "next": "snow-hold-pack",
    "mode": "observation",
    "chapter": "snow"
  },
  {
    "id": "snow-hold-pack",
    "text": "你先压住，别松手。",
    "scene": "mountain-pack",
    "speaker": "陈禾",
    "mode": "dialogue",
    "plannedFilm": "JS-03",
    "chapter": "snow",
    "next": "snow-ask-home"
  },
  {
    "id": "snow-ask-home",
    "text": "你以前也捆成这样？",
    "scene": "mountain-pack",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-pack"
  },
  {
    "id": "snow-pack",
    "speaker": "陈禾",
    "text": "在家的时候，我娘还得替我重捆。看见我弄成这样，隔着院子就喊，阿禾，你又给捆歪了！",
    "scene": "mountain-pack",
    "next": "snow-nickname",
    "mode": "dialogue",
    "chapter": "snow"
  },
  {
    "id": "snow-nickname",
    "speaker": "心声",
    "mode": "thought",
    "scene": "mountain-pack",
    "text": "",
    "choices": [
      {
        "id": "ask-nickname",
        "label": "阿禾？",
        "next": "snow-respond-name"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-respond-name",
    "text": "哎。先别松，马上好了。",
    "scene": "mountain-pack",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-ready"
  },
  {
    "id": "snow-ready",
    "text": "",
    "scene": "mountain-pack",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "climb",
        "label": "背好铺盖，跟随队伍上山。",
        "next": "snow-path"
      }
    ],
    "chapter": "snow"
  },
  {
    "id": "snow-path",
    "speaker": "心声",
    "text": "脚下开始有雪，说话也越来越费劲。陈禾在路边停住，我走到他旁边时，他的目光还落在我的肩带上。",
    "scene": "snow-path",
    "next": "snow-concern-before",
    "mode": "thought",
    "chapter": "snow"
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
    "text": "（他抬起的手又落回胸前。）",
    "choices": [
      {
        "id": "support",
        "label": "我这儿没事，你先搭住我。",
        "next": "snow-a-route"
      },
      {
        "id": "call",
        "label": "叫他“阿禾”，等他应声。",
        "next": "snow-b-call"
      }
    ],
    "chapter": "snow"
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
    "chapter": "snow"
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
    "next": "snow-a-hand-step"
  },
  {
    "id": "snow-a-hand-step",
    "text": "他的手搭上来，压住我半边肩膀。我扶着他的胳膊，等两个人都站稳了才往前走。",
    "chapter": "snow",
    "mode": "observation",
    "speaker": "旁白",
    "scene": "snow-path",
    "next": "snow-a-steady"
  },
  {
    "id": "snow-a-help",
    "speaker": "小满",
    "text": "我站得住，你搭这儿。",
    "scene": "snow-concern-hold",
    "next": "snow-a-help-yudu",
    "mode": "dialogue",
    "chapter": "snow"
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
    "next": "snow-a-help-step"
  },
  {
    "id": "snow-a-help-step",
    "text": "陈禾抓住我的肩带，脚下试了试，才跟着往前迈步。前面的人还没走远，我们慢慢跟上去。",
    "chapter": "snow",
    "mode": "observation",
    "speaker": "旁白",
    "scene": "snow-path",
    "next": "snow-a-steady"
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
    "chapter": "snow"
  },
  {
    "id": "snow-b-nod",
    "text": "（陈禾点头。）",
    "scene": "snow-concern-hold",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "snow",
    "next": "snow-b-insist"
  },
  {
    "id": "snow-b-insist",
    "text": "别光点头，应我一声。",
    "scene": "snow-concern-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-b-heard"
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
    "text": "风声夹在他说话的声音里，我又往他那边靠近些。等他喘过这口气，我才再叫他。",
    "scene": "snow-path",
    "next": "snow-b-again",
    "mode": "thought",
    "chapter": "snow"
  },
  {
    "id": "snow-b-again",
    "text": "阿禾？",
    "scene": "snow-concern-hold",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "snow",
    "next": "snow-b-here"
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
    "text": "到了石头后面，耳边的风声小下去，陈禾终于能靠着坐一会儿。他松开铺盖绳，掌心留下了一道压痕。",
    "scene": "snow-shelter-first",
    "next": "snow-ask-better",
    "mode": "thought",
    "chapter": "snow"
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
        "next": "snow-shelter"
      }
    ],
    "chapter": "snow"
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
    "text": "前头有人起身，拍着裤腿上的雪。陈禾把帽檐拉低了些，等我重新背好铺盖，才跟我一起站起来。",
    "scene": "snow-path",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "snow",
    "next": "snow-continue-choice"
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
    "text": "碗沿还烫着，里面却没多少粥。我等它凉一点，陈禾把脱到一半的鞋又穿了回去。",
    "scene": "grass-meal",
    "next": "grass-meal",
    "mode": "observation",
    "chapter": "grass"
  },
  {
    "id": "grass-meal",
    "speaker": "心声",
    "text": "（他扶着膝盖坐了一会儿。）",
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
        "next": "grass-choice"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-choice",
    "speaker": "心声",
    "mode": "thought",
    "scene": "grass-camp",
    "text": "卫生员正在给陆生掖衣服，水碗放在铺盖边上。接应队的人走过来，问还有谁能跟着出去，外面还有掉队的同志没回来。\n\n陈禾已经背起行装。留在营地的人往陆生那边挪了挪，腾出卫生员走动的地方。",
    "choices": [
      {
        "id": "stay",
        "label": "留在营地，帮忙照看陆生。",
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
    "text": "我在陆生旁边坐下，水碗放得离他近了些。他睁眼看过来，手还攥着肩头的衣服。",
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
    "text": "他看了看针脚，点一下头，又把眼睛合上。",
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
        "next": "grass-a-new-repeat"
      }
    ],
    "chapter": "grass"
  },
  {
    "id": "grass-a-new-repeat",
    "text": "我叫陆生。你刚才说小什么？没听清。",
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
        "next": "grass-a-new-nod"
      }
    ],
    "chapter": "grass"
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
    ],
    "title": "草地夜里，陆生醒来让小满放下水碗",
    "replayLabel": "重看陆生",
    "advanceOnEnd": true,
    "chapter": "grass"
  },
  {
    "id": "grass-a-return",
    "speaker": "心声",
    "text": "我把水放回他手边。\n\n陆生睡着以后，又醒了两回。第二回，他伸手碰到碗边，我便扶着碗让他喝了几口。\n\n卫生员过来摸了摸他的额头，在旁边蹲了一会儿才走。压在陆生肩头的衣服又滑下来一点。",
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
    "text": "卫生员接住人以后，陈禾才把背上的包卸下来。他的手还撑在膝盖上，我往旁边挪了些，给他留出一块地方。",
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
    "text": "前面的人从泥里拔出鞋，回身指着自己的脚印，让我们照着走。草丛里传来一声应答，随后便只剩咳嗽声。",
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
    "text": "同行的同志接过那位战士的铺盖，替陈禾扶住人。陈禾刚腾出手，脚下便晃了一下，我赶紧扶住他。",
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
    "text": "被接住的战士搭着陈禾的肩，没走几步又停下来换气。他抹掉嘴边沾着的草屑，朝我们看过来。",
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
        "next": "grass-b-home-street"
      }
    ],
    "chapter": "grass"
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
    "text": "营地方向有人喊话，带路的同志应了一声，回头示意我们往那边走。",
    "scene": "grass-path",
    "next": "grass-b-old",
    "mode": "thought",
    "routes": [
      {
        "choice": "xj-choice",
        "equals": "luggage",
        "next": "grass-b-new"
      }
    ],
    "chapter": "grass"
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
        "next": "grass-b-lusheng-name"
      }
    ],
    "chapter": "grass"
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
    "next": "grass-dawn-hand-joke"
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
        "label": "指给他看：你鞋带又松了。",
        "next": "grass-dawn-tie-shoes"
      }
    ],
    "chapter": "grass"
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
    "text": "铺盖的绳头又落在脚边，我刚弯腰，陈禾已经伸手捡了起来。他把绳头塞进背带里，示意我扶一下铺盖。",
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
    ],
    "title": "天亮后的营地，陈禾说起小时候",
    "replayLabel": "重看田埂的回忆",
    "advanceOnEnd": true,
    "chapter": "grass"
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
    "next": "north-arrive",
    "chapter": "grass"
  },
  {
    "id": "north-arrive",
    "speaker": "旁白",
    "text": "走到路边，陆生扶着石沿给肩上的包换了个位置。同行的战士伸手接过去，让他先往前走。",
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
    "text": "院里的地面是干的。陈禾靠着门框坐下，身后的铺盖还没卸，一边肩带已经从肩头滑了下来。",
    "scene": "chenhe-rest",
    "next": "wuqi-rest",
    "mode": "observation",
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-rest",
    "speaker": "心声",
    "text": "（放下自己的行装，在他旁边蹲下。）",
    "scene": "chenhe-rest",
    "next": "wuqi-water",
    "mode": "thought",
    "routes": [
      {
        "choice": "grass-choice",
        "equals": "rescue",
        "next": "wuqi-cloth"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-water",
    "speaker": "陆生",
    "text": "小满，给你留了点水，你先喝。",
    "scene": "lusheng-wuqi",
    "next": "wuqi-water-rim",
    "mode": "dialogue",
    "chapter": "wuqi",
    "plannedFilm": "WQ-02"
  },
  {
    "id": "wuqi-water-rim",
    "text": "（他指了指碗沿的缺口。）",
    "scene": "lusheng-wuqi",
    "speaker": "旁白",
    "mode": "observation",
    "chapter": "wuqi",
    "next": "wuqi-water-warning"
  },
  {
    "id": "wuqi-water-warning",
    "text": "碗这边缺了一块，你换一边喝。",
    "scene": "lusheng-wuqi",
    "speaker": "陆生",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-water-drink"
  },
  {
    "id": "wuqi-water-drink",
    "text": "",
    "scene": "lusheng-wuqi",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "drink",
        "label": "接过水，避开缺口喝两口。",
        "next": "wuqi-snow-route"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-cloth",
    "speaker": "心声",
    "text": "草地上接回来的那位战士也到了，手里拿着一块旧衣上裁下的布。",
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
    "text": "你那天说的，街口那家铺子，后来怎么了？",
    "scene": "spare-cloth",
    "speaker": "小满",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-cloth-answer"
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
        "next": "wuqi-enter-room"
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
    "next": "wuqi-answer-name"
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
        "next": "wuqi-enter-room"
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
    "text": "（缩了一下胳膊）哎，你慢点。",
    "scene": "chenhe-memory-first",
    "next": "wuqi-sew-reply",
    "mode": "dialogue",
    "chapter": "wuqi",
    "plannedFilm": "WQ-03"
  },
  {
    "id": "wuqi-sew-reply",
    "text": "",
    "scene": "chenhe-memory-first",
    "speaker": "心声",
    "mode": "thought",
    "choices": [
      {
        "id": "not-started",
        "label": "我还没下针呢，是你自己先动了。",
        "next": "wuqi-sew-still"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-sew-still",
    "text": "（把胳膊放回桌沿）行，你缝吧，我不动了。",
    "scene": "chenhe-memory-first",
    "speaker": "陈禾",
    "mode": "dialogue",
    "chapter": "wuqi",
    "next": "wuqi-sew-result"
  },
  {
    "id": "wuqi-sew-result",
    "speaker": "心声",
    "text": "剪断线头以后，陈禾伸直胳膊试了试，袖口已经不绷着了。他把那几针歪着的线翻过来看，又把胳膊放回桌上。",
    "scene": "new-cuff",
    "next": "wuqi-sew-old",
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
    "next": "wuqi-sew-confirm",
    "mode": "observation",
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-sew-letter",
    "speaker": "心声",
    "text": "我把旧信摊到膝上，纸还是从前的样子，停在那半句话上。",
    "scene": "old-letter-room",
    "next": "wuqi-sew-confirm",
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
        "next": "wuqi-back-yard"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-write",
    "speaker": "心声",
    "text": "我铺平新纸，用那半截铅笔写下“梁叔”。接着写的，是他在湘江边替我补袖口的事。",
    "scene": "chenhe-memory-first",
    "next": "wuqi-write-home",
    "mode": "thought",
    "chapter": "wuqi"
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
    ],
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
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-write-lusheng",
    "speaker": "心声",
    "text": "最后一行写完，我正要折起纸，陆生从旁边伸手扶住纸角。",
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
    "text": "旧信裹在干布里，放在桌子的另一边。我把江边传来的消息也写在新纸上，注明是转运的同志回来告诉我们的。",
    "scene": "memory-page",
    "next": "wuqi-writing",
    "mode": "thought",
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-writing",
    "speaker": "心声",
    "mode": "thought",
    "scene": "memory-page",
    "text": "纸上已经有了梁叔的名字和那棵枣树。陈禾坐在对面，脚边放着刚收好的行装。",
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
    "text": "陆生坐在门边，正帮端饭的同志叠碗。我挨着陈禾坐下时，门外又有人背着行装进来。",
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
    "text": "新来的战士停在门边，滑下来的铺盖绳扫到我的手背。他伸手去够，另一边的背带又拧住了。",
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
        "next": "wuqi-hear-newcomer"
      }
    ],
    "chapter": "wuqi"
  },
  {
    "id": "wuqi-hear-newcomer",
    "text": "听清名字后，我重复了一遍，往凳子里让了些。他把包放在脚边，在我旁边坐下。",
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
    "text": "陈禾拍掉帽子上的土，重新戴好。陆生把叠好的碗交回去，往身后的门框上靠了靠。",
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
    "text": "1936年10月9日，红一、红四方面军在会宁会师。",
    "scene": "atlas-1936",
    "next": "epilogue-jiangtai",
    "mode": "fact",
    "chapter": "epilogue"
  },
  {
    "id": "epilogue-jiangtai",
    "speaker": "行军纪事",
    "text": "1936年10月22日，红一、红二方面军在将台堡会师。红军三大主力胜利会师。",
    "scene": "atlas-1936",
    "next": "epilogue-remember",
    "mode": "fact",
    "chapter": "epilogue"
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
    "start": "north-arrive",
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
 const data={nodes,images,alts,chapters};if(typeof module==='object'&&module.exports)module.exports=data;else root.LATE_CHAPTERS=data;
})(typeof window==='undefined'?globalThis:window);
