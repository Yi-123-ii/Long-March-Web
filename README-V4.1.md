# 山河印记 V4.1

完整可运行工程，基于团队main 5c916ac，保留B最新纪事/邮局和C v0.16.1实际地图。

Node.js18+，解压进入工程目录运行：

```sh
npm run dev
```

打开 http://127.0.0.1:5173 ，无需npm install、无需覆盖旧工程。端口占用时macOS/Linux使用 `PORT=5221 npm run dev`，Windows PowerShell使用 `$env:PORT=5221; npm run dev`。

浏览器存储按地址/端口隔离；不要清空旧站点存储。邮局原备份/导入保留，可用于信件迁移。C原存档键和业务逻辑未动。

本轮：精神传承五幕页面、案例只读加载与回退；首页按用户确认整合V4排版及main新全景图，只删除指定英文；C只统一顶部导航。原main邮局/纪事新题签、C游戏/素材不覆盖，未引入C未合入的v0.17媒体。来源和未验证事项见 docs/v41/V41-QA-SOURCES.md。

校验：`npm run check`；`node --test tools/letters.test.mjs tools/legacy-chronicle.test.mjs`；`npm --prefix modules/c run check`。
