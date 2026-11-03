# 山河印记 V4.3

解压进入工程目录，使用 Node.js 18 或更新版本运行 `npm run dev`。浏览器打开 http://127.0.0.1:5173 。

首页从保留的全景与云雾过渡进入史实序章，三个时间节点接四种体验和原四个大型入口。精神传承使用现有整幅背景与题字，正文为三位人物、三组集体实践和三条青年行动。照片说明、报道来源和策展解读均使用页面内可读的纯文本。六张案例照片来自各自报道，文件只做网页编码，保留原生像素和原图媒体标识。

案例数据集中在 `data/v43-stories.json`。编辑后运行 `node tools/build-v43-stories.mjs` 更新页面的标记区，使用 `node tools/build-v43-stories.mjs --check` 核对数据、图片与生成内容同步。页面本地自带完整正文，无 JavaScript 时可通过原生展开阅读。支持原生对话框时，六个入口使用同一弹层，返回与前进可关闭或恢复故事，刷新保持当前故事。图片失败有图示占位，内容缺失有状态提示。

来源记录见 [首页史料](docs/v43/HOME-SOURCES.md)、[人物报道和照片](docs/v43/PEOPLE-SOURCES.md) 与 [集体实践报道和照片](docs/v43/PRACTICE-SOURCES.md)。资料日期与报道日期分别记录，页面中的策展解读是本站编辑文字。

原项目回归命令：

```sh
npm run check
node --test tools/letters.test.mjs tools/legacy-chronicle.test.mjs
npm --prefix modules/c run check
```
