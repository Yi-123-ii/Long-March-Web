# 山河印记

V3.8 首页与原有长征纪事、山河邮局的整合版本。

## 页面入口

- index.html：首页、序章、四个栏目入口和尾声。
- chronicle.html：九段长征纪事、搜索、时间线与史料来源。
- journey.html：六站地图式剧情体验；相册入站、原声影片、选择回响和会师尾声，源码位于 modules/c/。
- inheritance.html：当代传承案例。
- post-office.html：写信、选择邮票与信纸、投递动画、留言查看及备份。

原首页的 #chronicle 和 #event=事件编号 链接会转到新的纪事页，保留查询参数和定位。

## 本地查看

使用 Node.js 18 或更新版本，在项目目录运行 npm run dev，浏览器打开 http://127.0.0.1:5173/ 。无需安装第三方运行依赖。

Windows 也可以双击「开始预览.cmd」。如果端口被占用，在 PowerShell 中先设置 $env:PORT='5190'，再运行 npm run dev。

## 留言与历史兼容

留言仍保存在用户浏览器中，使用原有 longmarch-b: 存储键。此次整合保留原来的保存、恢复、导入与导出逻辑，包含十二枚邮票、四款信纸及独立的写信区插画。

同一浏览器访问原线上域名时，已有留言继续可读。不同浏览器、域名或本地端口之间不会自动同步，可通过邮局的备份和导入功能转移。

## 验证

运行 npm run check，以及 node --test tools/letters.test.mjs tools/legacy-chronicle.test.mjs。C模块另运行 npm --prefix modules/c run check。

## 整合来源与边界

首页、导航、题字和字体来自队友提供的「山河印记-V3.8-定制题字-完整可运行项目.zip」。在主分支 2f94801 的基础上整合，保留其纪事数据、留言脚本和写信区插画。

整合记录见 [docs/INTEGRATION-V3.8.md](docs/INTEGRATION-V3.8.md)。队友包的原始说明存档于 [docs/README-V3.8-package.md](docs/README-V3.8-package.md)；其中提到的历史验收截图和原始比赛材料未加入网站仓库。

字体许可位于 assets/fonts/，题字和插画来源见 docs/V3.8-ART-DIRECTION.md、docs/A-ART-TYPE-ATTRIBUTION.md 等原始说明。原有文档保留各自版本范围，不代表本次已重做全部历史验收。

C模块整合边界与接口见 [docs/C-INTEGRATION.md](docs/C-INTEGRATION.md)。
