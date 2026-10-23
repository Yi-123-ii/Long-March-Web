# 本次视觉素材与提示词

使用 OpenAI ImageGen 内置工具生成；用户图片仅作风格参考，未复制原图文字或构图。标题保留页面真实文本，插画不是史料照片。

| 用途 | 项目内文件 |
| --- | --- |
| 邮局红金艺术字与当代中国剪影 | `assets/images/titles/post-heading-v2.webp` |
| 首页绿色艺术字、信封与纸飞机 | `assets/images/titles/mail-invite-v1.webp` |
| 立式邮筒箱体 | `assets/images/mailbox-cabinet-v2.webp` |
| 三军会师主题背景插画 | `assets/images/illustrations/huishi-v1.webp` |
| 三军会师阶段题字 | `assets/images/titles/stages/huishi-v1.webp` |
| 品牌副标题的重绘书法字形 | `assets/images/titles/brand-tagline-v2.webp` |

邮筒箱体图在网页中保持静止，投信口的小翻板、信封及投递反馈由原生 CSS 实现；箱体底部取信门不参与动画。会师插画只用于解释性背景，不表示特定会师现场；正文采用原创史实时序图。

## brand-tagline-v2

以本站 `post-heading-v2.webp` 为笔势参考，使用 ImageGen 内置工具重新生成“循着来路，读懂远方”的独立书法字形。没有继续用普通字库文字变色。原始字形保留透明通道，页面以 CSS 遮罩显示：纪事页为松墨色，邮局页为深红金渐变。真实文字保留在品牌链接中，供辅助技术读取。网页保存路径见上表。

Use case: logo-brand. Create an ORIGINAL small Chinese brand tagline calligraphy wordmark. The attached reference is the EXISTING large heading of the SAME website: match its broad confident flowing brush style, strong thick-thin stroke contrast, connected sweeping terminals and natural flying-white texture, so this subtitle looks like it was lettered by the same calligrapher. Do not copy the reference's words, illustrations or composition. Exact simplified Chinese text in ONE horizontal line:「循着来路，读懂远方」. Nine characters including the comma, all complete and immediately legible. It must be visibly designed brush lettering, NOT a typed regular font, NOT delicate thin handwriting, NOT upright printed Kai/Song. Slightly compact but airy horizontal arrangement, disciplined stroke joins; no flourishes through other characters. This will appear as a small subtitle, so keep bold clear character shapes and use only subtle dry-brush gaps. Single solid BLACK ink with fine alpha edges, genuine transparent background. No other text, no seals, no pinyin, no illustrations, no borders, no paper, no shadows, no metallic background. Keep all strokes within the frame, approximately 6:1 wide. The webpage will color these letter shapes itself to match its heading.

## post-heading（提示词）

Use case: logo-brand. One original illustrated Chinese calligraphy title for a modern visitors' letter page on a Long March remembrance website. Reference only the sweeping brush energy and restrained red-gold treatment of the attached lettering; do not copy its words, shapes or composition. Exact simplified Chinese text in TWO lines: first line「隔着岁月，」 second line「说给你们听。」. No quote marks, no other text, no pinyin, no seals, no logos. Every character must be complete and legible. Warm gold and copper-red calligraphy with subtle mineral-pigment texture, bold flowing elegant strokes with natural flying white. Integrate a small refined panorama of present-day China beneath / between lower brush terminals: a high-speed train, a modest contemporary city skyline, green fields and two distant wind turbines, all secondary and harmoniously tiny. Original illustrative forms, no particular famous building or political symbol required. Mature, hopeful, dignified, not a cluttered poster. Landscape composition about 2:1. Genuine transparent background, no white/paper block, no border, no shadow.

## mail-invite

Use case: logo-brand. Create one original illustrated Chinese lettering title for a website invitation to write a message across time. The attached reference ONLY inspires hand-painted organic green strokes, expressive thick-thin contrast and tiny meaningful illustrations; don't copy its original words, outlines or arrangement. Exact simplified Chinese text TWO lines:「如果能寄去一句话，」on first line,「你想对他们说什么？」on second. No quote marks, no other text, no labels or seals. All 18 characters/punctuation complete and highly readable. Main lettering deep forest green, a few fresh leaf-green brush accents and warm ochre details. Broad artistic brush lettering, round lively strokes, elegant mature human warmth rather than children's typography. Small cream envelopes with wax seal, one tiny paper airplane and a flowing fine route line naturally integrated into brush terminals and empty space; a few subtle leaf/small blossom details. These objects must remain secondary to the words. Landscape approximately 2:1. Truly transparent background, no paper/background block, no border, no glow, no logo.

## postal-cabinet

Use case: product-mockup. A photorealistic high-quality 3D rendered cutout of a realistic freestanding public postal collection box, full object on a genuinely transparent background. Chinese urban public postbox inspired proportions, generic original unbranded design: tall upright RECTANGULAR enamelled dark forest-green metal cabinet, gently sloping overhanging rain hood, a front mail slot in the UPPER THIRD, a separately outlined locked collection door in the lower half, sturdy broad integrated rectangular plinth sitting directly on the ground. NO thin pole, NO cylindrical body, NO American rural curved barrel mailbox, NO red side flag. Near straight-on front view with only a small amount of right side visible, clear manufactured seams, restrained realistic weathering, subtle screws, enamel highlights, brass accent trim. Front posting slot must be a clean dark horizontal rectangular opening, no door or flap drawn over it: the interactive hinged flap will be added in website code. Collection door is closed. Small embossed outline of an envelope centered below slot. No text, no branding, no China Post logo, no letters/envelopes floating outside. Entire cabinet and base visible with comfortable transparent margins, isolated soft ground-contact shadow only. Product lighting soft upper left, realistic depth and materials, not a cartoon or flat vector. Portrait approximately 3:4.

## huishi-art

Use case: illustration-story. Original small landscape painting for a Long March history website, 3:2. Hand-painted gouache with dark ink contours and subtle grain, clear opaque silhouettes, forest green, muted slate blue, ivory and restrained red. A symbolic meeting of three small groups of anonymous 1930s grey-uniformed Red Army marchers on an ochre highland path near simple northwestern Chinese village buildings; three small red flags draw together. Dignified, collective, no portraits, no modern objects. This is an interpretive thematic painting about the October 1936 reunion, NOT a documentary reconstruction and NOT a precise depiction of a particular historical site. No text, letters, dates, seals, borders, watermark or photorealism.

## huishi-title

Use case: logo-brand. Original Chinese stage title artwork matching an existing series of forceful angular chunky brush lettering, chisel-like cuts, flying-white dry-brush gaps and strong terminals. Exact simplified Chinese text in one horizontal line:「三军会师」. Four characters only, no quote marks or punctuation. Fresh original complete legible character forms, dark forest green #203c32 solid ink, no gradients, no symbols or illustrations. High contrast, compact expressive mature display calligraphy, not a regular Song typeface or thin handwriting. Genuinely transparent background, no paper, no frame, no glow, no shadows, no seal.

