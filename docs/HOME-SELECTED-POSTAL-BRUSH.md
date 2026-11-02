# 首页选图与邮局副标题

日期：2026-11-02。

## 首页

用户选定去除左侧红色泛色的原构图修正版。源图：`../design-options/home-realistic-20261102/home-long-march-left-corrected-v1.png`。网页资源：`assets/images/home-long-march-selected-v1.webp`，1672×941，未放大。仅转为 WebP。`home-hero-selected.css` 让所有屏幕使用同一张选定图，覆盖旧的超宽屏替图；文字对比使用中性灰透明遮罩，避免重新覆盖红色泛色。原首页文字及按钮保留。

## 邮局副标题

文字仍为“寄一纸心语，念万里征途”。上一版系统行楷字形替换为内置 image_gen 以 `brand-tagline-v2.webp` 为参照重新绘制的书法字形，匹配纪事页的粗细、连笔和飞白。文件：`assets/images/titles/postal-tagline-brush-v2.webp`，2163×383，透明背景。绿色由现有 CSS 遮罩统一着色。辅助文本与显示文字一致，纪事页原句不改。

生成工具：内置 image_gen。原 PNG 保留于 Codex generated_images，不分发字体文件。

### 完整提示词

Use case: logo-brand. Create a replacement Chinese calligraphic tagline for the SAME website as the supplied reference. The supplied image is the existing chronicle tagline, and is the mandatory LETTERING STYLE reference: match its bold, energetic flowing brush calligraphy, broad weighty strokes, strong thick-thin contrast, linked sweeping terminals, slightly slanted lively character rhythm and delicate natural flying-white texture. The new text should visibly look lettered by the SAME calligrapher. Do not use a regular typed Xingkai/Kaiti font or tiny thin handwriting.

Replace the words with EXACT simplified Chinese text, ONE horizontal line:「寄一纸心语，念万里征途」. Eleven characters total including the comma. All characters complete, legible and in order, generous but compact horizontal rhythm. Avoid overlapping strokes that make words unreadable. This will be a small website brand subtitle, so keep thick clearly readable ink strokes and restrained dry-brush gaps. One solid BLACK ink lettering only, real TRANSPARENT background with fine antialiased alpha edges. No paper, no background color, no green or red color, no shadows, no gradient, no seals, no illustrations, no frame, no English or extra characters. Crop fairly close while leaving every sweeping stroke fully inside the image. Wide approximately 6 to 7:1 layout; output the full phrase only. Match the reference's broad expressive brushwork rather than copying its original words.

