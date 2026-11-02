# 五板块统一页眉

日期：2026-11-02。用户确认五幅插画后插入；当前基于 main `8a8d29b`，保留队友刚合入的 C v0.17.1 进度修复。此次没有合入 A 分支的整页重构。

## 视觉与布局

- 以长征纪事既有页眉为基准：纸绿 #eef1ed、松墨 #263d36、短句 #385d43，当前栏目 #973e39。
- 左侧为小插画、原“山河印记”题字、与页面对应的书法短句；右侧五个栏目同一顺序、字形、字号、字重和间距。
- 桌面高度88px，导航13px/500；手机高度76px，44px菜单按钮，展开项高度48px。
- 长征纪事原插画 `assets/images/brand-landscape-v2.webp`、原书法短句和大封面保持原文件。原插画 SHA256：73DBD9FBF66BD89162EDF67E9FC214CFAB47989A4DBFF056CDE1F571863FB0EB。
- 新插画仅清理透明边距、缩至最大320×259并转为透明WebP；审批稿PNG保留在 `../design-options/header-illustrations-20261102/`。
- 首页不再单独使用白色透明导航，保持已选定的全景封面；新增独立浅绿页眉在封面之前。

| 板块 | 插画 | 短句 |
| --- | --- | --- |
| 首页 | assets/images/headers/home-v1.webp | 以山河为卷，以青春为答 |
| 长征纪事 | assets/images/brand-landscape-v2.webp（原图） | 循着来路，读懂远方（原字形） |
| 重走长征 | assets/images/headers/journey-v1.webp | 重走征途，感知不易 |
| 精神传承 | assets/images/headers/inheritance-v1.webp | 接过薪火，续写山河 |
| 山河邮局 | assets/images/headers/post-v1.webp | 寄一纸心语，念万里征途（沿用已批准字形） |

## 维护与兼容

`node tools/build-headers.mjs` 重建五页页眉。共用样式为 `assets/css/header-unified.css`，共用手机菜单为 `assets/js/site-nav.js`，去掉首页重复绑定的菜单处理。Esc关闭菜单并恢复按钮焦点，点击页面外部或导航项关闭菜单。

C模块使用相对站点路径，保留史实链接的返回游戏参数和原存档逻辑。原“关于这一程”按钮移至地图页脚，按钮ID和原对话框继续保留。C的剧情工具栏保持独立。

## 验证

- 资源、语法与史实日期检查：26份浏览器脚本、9篇纪事通过。
- 留言存储和旧链接回归：13/13通过。
- C模块现有测试：41/41通过。
- 实际浏览器1280px：五页页眉高度88px，五个导航项的x坐标、字号、字重一致；无横向溢出。
- 实际浏览器390px：五页高度76px，菜单展开/关闭和Esc焦点返回通过；无横向溢出。
- 截图和测量结果保存在忽略目录 `output/unified-headers/`。

## 新增短句字形生成

采用内置 image_gen，以纪事原字形 `brand-tagline-v2.webp` 作风格参考。仅转换格式、裁去透明空白，未改变字形。成品透明WebP：

- assets/images/titles/header-home-tagline-v1.webp
- assets/images/titles/header-journey-tagline-v1.webp
- assets/images/titles/header-inheritance-tagline-v1.webp

### 完整提示词

#### 以山河为卷，以青春为答

Use case: logo-brand. Create a small Chinese header tagline for the SAME website as the supplied reference. Match the reference lettering's bold flowing hand-painted brush calligraphy, broad heavy strokes, decisive thick-thin contrast, subtle connected terminals and natural flying-white texture. The reference is a style sample, not the words to copy. The result must look written by the same calligrapher, NOT a typed regular Kaiti/Xingkai font. One horizontal line, all simplified Chinese characters complete and immediately legible, strong clear strokes for small-screen display, restrained dry-brush gaps, no overlapping characters. Solid BLACK lettering with genuine TRANSPARENT background and clean antialiased edges. No paper, no background colors, no border, no shadows, no seal, no illustrations, no other words, no pinyin, no watermark. Keep all strokes inside frame, crop fairly close around the phrase with minimal transparent margins.
Exact text:「以山河为卷，以青春为答」. Output the full phrase only.

#### 重走征途，感知不易

Use case: logo-brand. Create a small Chinese header tagline for the SAME website as the supplied reference. Match the reference lettering's bold flowing hand-painted brush calligraphy, broad heavy strokes, decisive thick-thin contrast, subtle connected terminals and natural flying-white texture. The reference is a style sample, not the words to copy. The result must look written by the same calligrapher, NOT a typed regular Kaiti/Xingkai font. One horizontal line, all simplified Chinese characters complete and immediately legible, strong clear strokes for small-screen display, restrained dry-brush gaps, no overlapping characters. Solid BLACK lettering with genuine TRANSPARENT background and clean antialiased edges. No paper, no background colors, no border, no shadows, no seal, no illustrations, no other words, no pinyin, no watermark. Keep all strokes inside frame, crop fairly close around the phrase with minimal transparent margins.
Exact text:「重走征途，感知不易」. Output the full phrase only.

#### 接过薪火，续写山河

Use case: logo-brand. Create a small Chinese header tagline for the SAME website as the supplied reference. Match the reference lettering's bold flowing hand-painted brush calligraphy, broad heavy strokes, decisive thick-thin contrast, subtle connected terminals and natural flying-white texture. The reference is a style sample, not the words to copy. The result must look written by the same calligrapher, NOT a typed regular Kaiti/Xingkai font. One horizontal line, all simplified Chinese characters complete and immediately legible, strong clear strokes for small-screen display, restrained dry-brush gaps, no overlapping characters. Solid BLACK lettering with genuine TRANSPARENT background and clean antialiased edges. No paper, no background colors, no border, no shadows, no seal, no illustrations, no other words, no pinyin, no watermark. Keep all strokes inside frame, crop fairly close around the phrase with minimal transparent margins.
Exact text:「接过薪火，续写山河」. Output the full phrase only.

