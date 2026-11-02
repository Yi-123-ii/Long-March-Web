# 小红军鼠标角色 v0.16

用户提供“小红军角色建模参考”图，要求据此更换鼠标角色。使用内置 image_gen，两次调用；未使用外部API或新增付费视频、声音服务。正式文件 `assets/soldier-pointer-v016.png` 为透明RGBA PNG，1024×1536。网页显示44×66 CSS像素，角色在点击位置右下方；边缘自动换侧，避免遮住热点。精细鼠标启用，触屏与键盘导航不隐藏原生指针。移动时只有轻微整体步幅反馈，不宣称已制作参考图中的逐帧跑步动画。

## 首次生成完整提示词

Use case: background-extraction / identity-preserve. Create a single transparent-background game cursor sprite derived from the supplied character reference sheet. Show ONLY ONE full-body front-facing little Red Army soldier, matching the front view on the left of the sheet faithfully: same friendly serious youthful face, black short hair, grey blue eight-corner cap with small red star, grey blue cloth uniform, red collar tabs and red armband, rolled pale cuffs, brown belt, olive crossing shoulder straps, small pack, pale leg wraps and olive cloth shoes. Match the soft hand-drawn cel illustration and muted colors. Full body, cap and both shoes entirely visible, neutral standing pose with both arms relaxed at sides, symmetrical normal anatomy, clean continuous outline, suitable for a 54-pixel tall web cursor. Center single figure at large size with small transparent margin. No text, no labels, no grid, no sheet, no duplicated characters, no background, no shadow rectangle. Preserve the reference identity and costume; this is a cutout character asset.

## 透明边缘修订完整提示词

Edit target: attached single soldier cursor asset. Preserve the soldier exactly, same face, proportions, clothing and full-body stance. Change ONLY the background/alpha: remove ALL the black/grey/brown haze and outer glow surrounding the soldier. Genuine clear transparent background, exact crisp cutout tightly following silhouette from hat to both shoes. Soldier itself must be fully opaque. No surrounding haze or glow, no drop shadow, no background, no text. Keep full cap and both shoes entirely visible with a small margin.
