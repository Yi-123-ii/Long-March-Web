# C 模块 v0.15 接入

2026-11-01。公开入口为仓库根目录 `journey.html`，转入独立的 `modules/c/journey.html`。保留此根入口，A 的首页/导航直接链接它即可。当前首页、纪事、邮局、精神传承页及共享导航均保留最新V3.8原件，不再带入旧版公共页面。

## 共享接口

- 纪事固定 `chronicle.html#event=ID`，首页 `index.html`，邮局 `post-office.html`。C品牌链接返回总站首页，地图卡片打开相应纪事。
- C → B 事件映射：于都 yudu、湘江 xiangjiang、遵义 zunyi、赤水/金沙江 chishui、泸定 luding、夹金山 jiajin、草地 grassland、北上/吴起 wuqi、会师 huishi。地图卡片可直接读对应史实，未通关不影响 B 阅读。
- 存储只使用 `longmarch-c:companion:v1`，revision9兼容合法7/8路径。不会写 B 的已阅、草稿、留言与备份键，不使用 `localStorage.clear()`。
- C 的样式和脚本均放在自己目录，不加载共享 base.css。仅复用全站 fonts.css 的Shanhe Reading/Shanhe UI字体定义，避免全局样式叠加；B 的字体和许可证未修改。
- 地图、相册、白光点和小战士光标在 C 页面内；页面间用普通链接，不注入 A/B 的 DOM 或播放器。
- 根开发服务补充PNG/MP4/OGG类型与Range/HEAD，供7条原声影片重播定位；不改变默认端口、启动方式或原有页面路由。GitHub Pages 按普通静态文件托管，无需付费后端或外部API。

## 当前内容

六站、四段历史过场及会师尾声，141节点，5处双选。7条用户提供的原声电影，V05/V06字幕获确认；V07及后续无对白画面使用静图。静态心声和旁白无配音。雪山、草地低音量底声为原创合成。人物及具体经历虚构，不能当史实照片。

只发布当前运行资源和维护所需的代码、测试、来源与提示词；旧演员视频、废弃TTS、生成候选、个人电脑绝对路径、ZIP和51MB单文件评审版均未上传。完整本地制作档案继续由作者保留。

## 检查

根目录 `npm run check` 保持 B 原检查；`npm --prefix modules/c run check` 执行 C 逻辑和跨模块接口检查。`npm run dev` 后由根首页/邮局导航进入重走长征。提交前检查普通与Range视频播放、纪事深链接、邮局往返、手机地图和 B 的原有功能。

本次从最新main `5a7b885` 新建 `c/journey-v0.15` 整合，向main提出合并请求，不直接更新main。保留组员PR与V3.8内容，不代为合并、改写或关闭。
