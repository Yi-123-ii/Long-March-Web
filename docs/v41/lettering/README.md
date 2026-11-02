# 山河印记 V4.1 题字素材

所有最终 SVG 为纯色真实 `path`，填充深松绿 `#203c32`；没有字体、内嵌位图、外部引用、背景矩形、滤镜或发光。

| 可接入文件 | 准确文字 | 设计尺寸 | 墨迹尺寸 | 墨迹宽高比 |
|---|---|---|---|---|
| `legacy-title.svg` | 山河不止，／薪火有继（两行） | 1600 × 916 | 1488 × 804 | 1.851（双行整体） |
| `learning-title.svg` | 走近历史 | 1226 × 408 | 1114 × 296 | 3.764 |
| `service-title.svg` | 践行责任 | 1199 × 397 | 1087 × 285 | 3.814 |
| `archives-title.svg` | 保存记忆 | 1237 × 381 | 1125 × 269 | 4.182 |

## 来源与使用说明

传承主标题来自一次独立内置 `image_gen.imagegen` 生成；三组短章来自另一次三行题字 sheet 生成，再按连通域分离成三份独立素材。V4 旧题字仅用于目视理解家族特征，没有复用其字形或旧轮廓，没有调用普通字体转曲。提示词、独立透明母版、sheet、分离母版、清理 Alpha、黑白描摹输入、原始 trace、最终 SVG 与渲染结果均已保存。

这些是 **AI 辅助题字和算法轮廓**，不应称为人工手写。图像来源与使用受内置图像生成服务条款约束；没有第三方字体许可依赖。轮廓重建使用 vtracer 0.6.15，MIT 许可副本见 `VTRACER-LICENSE`。

## 处理参数

- Alpha 阈值 128，3px 中值滤波，删除面积小于 16px 的离散连通域。
- 原生字形比例保持不变，没有 `scaleY` 或任何字形拉伸。
- 主标题第二行下移 72px；为保持两行自然平衡，第二行四字依次横移 16/36/56/76px。
- “保存记忆”后三字依次左移 3/6/9px，仅微调字距，使四字总墨迹比落在 3.5–4.2 内。
- 最终四边设计透明余量 56px，路径渲染实测最小 55px。
- vtracer: binary / spline，filter_speckle=4，corner_threshold=60，length_threshold=6，splice_threshold=45，path_precision=3。

`provenance.json` 包含完整提示词、工具标识、母版及 sheet/crop 来源、SHA-256、坐标调整、描摹参数与许可来源信息；每个 SVG 的 metadata 也内嵌同一来源说明。`trace_lettering.py` 可以复现从母版到路径的处理。

## 已完成检查

- 逐字目视核对双行主标题与三组短章。
- 主标题以 500px 宽、短章以 400px 宽渲染检查，文件为 `*-display-inspection.png`。
- 四边至少 55px 完全透明余量；所有四角 Alpha=0。
- SVG 只含 `svg/title/desc/metadata/path`，没有 scale 变换。
- `verification.json` 保存最终 SVG 哈希、实际渲染 Alpha 边界、透明余量与路径检查结果。

本次只在此目录制作素材；没有改动 HTML/CSS，没有推送或部署。
