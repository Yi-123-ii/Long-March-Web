# v0.22 山河地图与第一站导入

## 交互与接口

- 只修改 C 模块。总站导航地址、纪事事件 ID、邮局入口、返回游戏与存储接口沿用既有约定。
- 地图采用1180×620的故事示意坐标；六个主站点、沿途转场及1936历史尾声保留。会宁与将台堡分别标记。
- 山河底图只包含风景，所有路线、站名、日期与状态为可访问的真实页面元素。
- 主路线使用连续三次曲线。红旗由同一组曲线采样行进，返回旧站不会重置后续解锁。
- 选中站点显示双页相册；进入时沿用翻开、白光与光点的过渡，材料改为暖纸页和暗红布面。
- 用户新提供的5018导入片在第一站合法起点、相册打开后播放；继续第一站中途存档时跳过导入，重玩第一站时再次播放。原故事节点不增删。
- 独立导入层负责原声、人物名、字幕、暂停、跳过和失焦暂停。完成后柔和淡出，回到既有于都故事。导入不写新的全站存储键。

## 素材

- `assets/atlas/terrain-v022.webp`：1672×941、519174字节，内置image_gen生成后仅做WebP格式优化，背景显示时裁去原设计图的顶部空白。
- `assets/atlas/title-v022.webp`：从确认稿单独提取生成的透明朱红书法标题，内置image_gen编辑后优化为1000像素宽的WebP，不带纸底或山景。中文标题仍保留在可访问的H1中。
- `assets/prologue/yudu-arrival-v022.mp4`：用户即梦5018原片的网页压缩版本，1280×720、60fps、15.103991秒，AAC原声直接保留；5505781字节。
- `assets/prologue/yudu-arrival-v022.webm`：同一片段的VP9/Opus备用格式，仅MP4读取失败时使用，无新配音。
- `assets/prologue/yudu-arrival-poster-v022.webp`、`yudu-arrival-hold-v022.webp`：从该网页影片提取的首末静帧。
- 用户确认对白：“小满，该出发了”；说话人为画面中的陈禾。字幕按影片时钟流式显示，不宣称逐词自动转录。
- 未充值、购买、提交新视频生成或改变既有发布状态。

## 底图生成提示词

模式：内置image_gen，编辑用户确认的山河地图设计图；参考图只作为获准的视觉来源。

> Edit this provided approved game-map UI concept into a CLEAN BACKGROUND ART PLATE for implementing the exact same interface in real HTML. Preserve the same landscape panorama, spatial arrangement, visual style, warm beige aged-paper texture, realistic photographic-historical mountain/river montage with soft mist transitions. Essential landmarks must remain in their same positions: snow peaks upper-left, grassland upper-middle, ochre northern villages upper-right, river gorge with iron bridge middle-left, Guizhou traditional building center, dusk southeastern river/wooden boats lower-right. Remove ALL interface elements and replace them seamlessly with matching adjacent terrain/paper: all text and calligraphy, ALL labels and circular pins, all red route lines, red flag, chibi soldier and pointer, complete lower-left open album/card/photo/button, lower-right controls, and entire top header/logo/nav. The whole canvas should be ONLY clean landscape/paper imagery, no text whatsoever, no red trail. In the upper-left reserve a naturally pale quiet parchment-and-mist area for a later heading. Lower-left where album was should become quiet parchment with some subtle mountain vegetation, suitable for overlaying a real album. The red route and station labels will be added programmatically later; do not paint any route or labels. Maintain exact original wide 16:9 framing, no border, no cropping of landscape, no new central buildings, no obvious empty rectangular holes. This is a production UI background asset, not a redesigned UI screenshot.

透明标题提示词：

> Extract ONLY the dark cinnabar-red Chinese brush calligraphy title “重走长征” from the upper-left of this approved game map design. Output the four exact characters in one horizontal row on a genuinely transparent background, tightly composed with a little clear margin. Preserve the source title's beautiful bold flowing hand-brushed stroke shapes, dark red pigment texture and ordering exactly. Remove every other element: all paper, mountains, scenery, UI, lines, labels, shadows and smaller text. No pale paper rectangle, no extra words, no watermark, no border. This is a transparent production heading cutout to overlay on the same illustrated map, not a new map or new typographic design.

## 验证

模块52项检查通过，包含32种剧情选择组合、独立章节进度保留、站点路线首末坐标、导入播放/跳过/暂停/故障与重播；总站资源与脚本检查通过。

浏览器实际验收：1280×720桌面地图；390×844手机地图与相册，标题与地图分开且页面无横向溢出。原MP4已从首帧播放至15.103991秒，自动接回“1934年10月，江西于都……”原剧情；确认导入的陈禾名字、流式字幕、暂停、恢复及跳过。WebM备用编码已用ffprobe读取，尚未在实际故障状态下验收其自动切换。

实际截图保存在本地评审目录 `work/map-ui-v022/`：`map-desktop.jpg`、`map-mobile.jpg`、`intro-caption.jpg`，不计入游戏发布素材。
