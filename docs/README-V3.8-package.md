# 山河印记 V3.8 · 定制题字版

这是基于 V3.7 完整工程的本地可运行开发交付包，无需覆盖旧项目，不部署。赛事正式提交所需队伍信息、匿名双包与演示材料仍需团队补齐，见 docs/V3.8-COMPLIANCE-AUDIT.md。

## 启动

安装 Node.js 18 或更新版本。解压后在本目录打开终端：

```sh
npm run dev
```

浏览器打开 http://127.0.0.1:5173 。无第三方运行依赖，不需要 npm install，不需要外网字体服务。若端口已被旧版本占用，关闭旧预览再运行；也可 `PORT=5175 npm run dev`（macOS/Linux）选择其他端口。留言按浏览器地址/端口分别保存，迁移前请用邮局备份/导入功能。

## 本版内容

- 序章与尾声采用分别定制的透明笔墨题字；内置 image_gen 辅助生成、逐字人工校对，不是现成字库轮廓增重，不称书法家手写墨宝或通用字体。
- 原赤色电影首屏、四个独立纵向栏目主体结构完全保留。B 的所有浏览器脚本/数据与独立样式、C 当前接入边界保留。
- 正文和信件使用本地 Shanhe Reading；界面和元信息使用本地 Shanhe UI。补齐原源码57个缺失汉字，包含基本汉字、扩展A、GB2312与完整上游映射的按需分片。
- 首页 1440/2048/1024/761/760/390/360px 已真实 IAB Chromium 校正。桌面/手机前后对照、截图JSON、B交互证据位于 docs/qa。

## 检查

```sh
npm run check
node --test tools/letters.test.mjs
```

字体专项核验（开发工具，访问网页无需安装）：

```sh
python3 -m pip install 'fonttools[woff]'
python3 tools/check-font-coverage.py
```

**不要运行历史 tools/prepare-fonts.mjs 重新生成当前字库。**

## 说明与资源

- docs/V3.8-ART-DIRECTION.md：逐字艺术选择、版式、透明资源与来源。
- docs/V3.8-QA-AND-REMAINING.md：实际验证、版本保留与遗留问题。
- docs/V3.8-FONT-AUDIT.md：字体层级、OFL、cmap、动态输入与回退边界。
- docs/V3.8-COMPLIANCE-AUDIT.md：手册/PPT限制、旧字形授权与正式提交缺项。
- docs/V3.8-IMAGEGEN-PROMPTS.md：两组题字完整提示词与最终修订记录。
- assets/images/typography/v38/：1536×1024 RGBA PNG母版及无损透明WebP网页资源。
- assets/fonts/：本地字库、逐文件清单与许可原文。历史资源保留原出处，不把第三方字体描述成原创字体。

V3.7 README 归档到 docs/README-V3.7-ARCHIVE.md，历史文档所写版本范围与未完成事项以各文件日期为准。V3.8 当前状态以本README和V3.8文档为准。
