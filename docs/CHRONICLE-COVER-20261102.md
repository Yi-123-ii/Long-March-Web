# 长征纪事赤红封面

2026-11-02。按用户要求，将长征纪事的大幅封面与首页的赤红、暖金视觉衔接。

## 文件与范围

- 网页资源：`assets/images/hero-chronicle-crimson-v1.webp`，1672 × 941，约 375 KiB。
- 仅长征纪事引用新图。保留原 `hero-mountains.webp`，不替换其他页面使用的资源。
- 原有「山河为卷，脚步为证」题字图片保持不变。
- 封面的左右遮罩改用暖象牙色，保证深色题字可读；顶部、底部继续渐变衔接页面底色。小屏幕将画面焦点略向右移，以保留行军队伍所在山岭。
- 未改变纪事数据、导航、留言功能、C 模块及首页。

## 图像生成

使用内置 imagegen 工具重绘，未使用 API/CLI 备用方式。第一张参考图是原纪事封面，作为构图和题材参考；第二张是首页山川图，作为配色与绘画光线参考。图中不生成文字，网页继续叠加原有题字。

最终提示词：

```text
Redraw the landscape artwork in reference image 1 into a new premium historical illustrated WEBSITE HERO BACKGROUND for a Chinese Long March chronicle, with the warm crimson-and-gold art direction of reference image 2. Reference 1 is the COMPOSITION / SUBJECT reference: sweeping mountain ranges, winding river valley, a tiny Red Army marching column on a narrow ridge on the RIGHT. Reference 2 is ONLY a PALETTE / PAINTERLY LIGHTING reference, not a layout to duplicate. A genuinely newly painted scene, not a green image under a red color filter. Wide landscape 16:9 composition, ideally 2400x1350. IMPORTANT WEBSITE LAYOUT: keep the LEFT 50-55% and especially the upper left two-thirds quiet, luminous pale ivory / apricot mist and faint distant silhouettes with low local contrast, so dark existing Chinese brush lettering can be overlaid later. No text should be drawn into this artwork. Let the right 40-45% carry beautifully detailed cinnabar-red and wine-brown rocky cliffs, red ochre / burnt-sienna layered ridges, atmospheric peach-gold mist, a warm gilded sky and a long river catching soft golden light. A modest line of SMALL human figures in 1930s Chinese Red Army grey uniforms, cloth caps and modest packs, walking single-file around a physically plausible right-side ridge; a single small RED flag, not the modern five-star national flag. Figures should have believable simple anatomy and scale, no oversized foreground portraits. Emotive, solemn, hopeful; richly painted matte gouache / oil-brush mountain illustration with subtle paper grain and cinematic depth, coherent with reference 2 but softer and quieter around the typography area. Use luminous rose-copper distance, maroon / crimson mountain planes and warm gold highlights. Avoid dominant forest green / blue-green, muddy sepia, flames, explosions, weapons closeups, giant floating flag fabric. The extreme top and bottom should dissolve into subtle pale mist rather than hard colored bands, to support a smooth transition to a light paper webpage. NO writing, NO Chinese characters, NO logos, NO seals, NO watermarks, NO UI, NO borders. Output ONLY the landscape illustration.
```

这是主题创作插画，不是1930年代现场影像；它不用于替代各篇纪事中的史实与来源。
