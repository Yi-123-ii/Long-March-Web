# 给 A / C 的整合说明

## 页面边界

- **B：长征纪事**——讲历史经过；不画完整路线地图，不设独立人物/家书栏目。
- **C：重走长征**——提供地图与小游戏体验，史实解释可链接至 B。
- **A：精神传承**——讲当代实践；资料在 `data/contemporary-cases.js`。
- **B：山河邮局**——现代访客给长征路上人们留言；不是历史家书阅读，不是真实邮件服务。

总站可按“首页 → 长征纪事 → 重走长征 → 精神传承 → 山河邮局”组织导航，各栏目可独立进入。

## 推荐整合方法

保留两个 HTML 页的主内容和各自脚本，将顶部导航替换为 A 的总站导航。当前使用相对路径，可部署在 GitHub Pages 的仓库子目录中。

保留样式加载顺序：`fonts.css` → `base.css` → 栏目 CSS。`fonts.css` 只定义本地字体；请连同 `assets/fonts/` 的字体和许可文件一起保留。主要类名使用 `lm-` 前缀；`base.css` 含基础元素样式，A 合入时应与总站的基础样式统一，避免两套全局样式叠加。字体和色值集中在 `base.css` 的 `:root`。

若更改目录位置，请同步修改 HTML 的资源路径，以及 `chronicle.js` 中生成邮局链接的位置。纪事页加载顺序为 `data/events.js` → `data/stage-title-art.js` → `storage.js` / `site.js` → `chronicle.js`，使用 `defer` 保证顺序。阶段题字路径和尺寸在 `data/stage-title-art.js`，真实标题仍来自事件资料；图片失败时显示文字。

邮局额外保留 `postbox.css`、`#postbox-template` 和 `assets/images/mailbox-cabinet-v2.webp`。模板由 `post-office.js` 分别装入侧栏和投递弹窗；箱体及投信口保持静止，只让信封经过遮挡层进入投信口。已移除额外翻板和铰链叠层。不要只复制侧栏外观而遗漏模板或动画样式。当前不再使用旧版箱门与旗帜 SVG 图层。

新增两处标题插画：`assets/images/titles/post-heading-v2.webp`、`assets/images/titles/mail-invite-v1.webp`，需连同保留。标题真实文本保留在各自标题元素中，勿删除可访问文本。

品牌副标题另使用 `assets/images/titles/brand-tagline-v2.webp` 的重绘书法字形，`base.css` 通过透明遮罩显示；复制导航时保留 `.lm-brand-tagline-art` 及其辅助文字。首页邮局入口使用 `.lm-postal-link` 与内嵌信封 SVG，样式位于 `chronicle.css`；无需外部组件或图标库。该区域可直接链接 `index.html#post-office-invite`。

当前紧凑绿色品牌的品牌主标题使用 `assets/images/titles/brand-name-v3.webp`，左侧插画为 `assets/images/brand-landscape-v2.webp`，同时保留 `.lm-brand-name-art` / `.lm-brand-landscape` 样式。主标题图片的替代文字为“山河印记”，左侧插画是装饰图像。副标题为实色绿色，整体尺寸已缩小；这一版先供本地查看。

## 给 C 的链接

| 游戏阶段 | 可打开的史实              |
| -------- | ------------------------- |
| 出发     | `index.html#event=yudu`   |
| 雪山     | `index.html#event=jiajin` |
| 抵达     | `index.html#event=wuqi`   |
| 会师     | `index.html#event=huishi` |

整体时间为1934年10月至1936年10月，共九个纪事节点。`wuqi` 是1935年10月19日中央红军抵达吴起；`huishi` 是1936年10月三大主力会师，两者不得混写。新增1936年份筛选；已阅总数由事件数组长度计算。

其他稳定事件 ID：`xiangjiang`、`zunyi`、`chishui`、`luding`、`grassland`。深链接会自动打开对应史实弹窗；它不要求玩家通关。

若总站首页也叫 `index.html`，可将本模块纪事页重命名为 `chronicle.html`，并全局替换本模块 HTML 中的 `index.html` 链接，同时更新 C 的链接。

## 邮局入口

- 直接写留言：`post-office.html`。
- 从事件过来：`post-office.html?event=jiajin`。仅提示“读过哪段纪事”，收信对象仍是长征路上的人们，不会生成或改写用户留言。
- 不与游戏成绩绑定；不自动添加历史人物收信选项；不展示虚构“他人留言”。

## 存储约定

| 键                        | 用途                                                   |
| ------------------------- | ------------------------------------------------------ |
| `longmarch-b:read:v1`     | 已阅事件 ID 数组                                       |
| `longmarch-b:draft:v1`    | 草稿正文、署名、可选事件 ID                            |
| `longmarch-b:messages:v1` | 留言数组：`id, body, nickname, createdAt, eventId`，新留言可带 `stampId` |
| `longmarch-b:messages-backup:v1` | 最近一次成功写入的备用留言数组 |
| `longmarch-b:messages-recovery:v1` | 写入前首次保留的异常原文，避免覆盖后失去恢复依据 |

禁止对总站使用 `localStorage.clear()`，应只操作自己模块的键。部署地址改变后，浏览器不会自动搬迁旧地址的数据。

邮票 ID 为 `yudu / luding / snow / city`，分别对应于都启程、铁索长桥、雪山草地及今日山河。旧留言无需补填邮票。`letter-backup.js` 必须在 `storage.js` 之后、`post-office.js` 之前加载；JSON 备份保留邮票 ID、正文、署名、时间和事件关联。支持旧版文本导入，先整体校验，再去重合并；失败不覆盖原记录。

邮局流程为：填写 → 选择插画邮票 → 完整信纸预览 → 确认后保存 → 折叠 → 装封 → 原绿色信箱投递。选择与预览可返回，尚不新增留言；确认保存失败时不清空输入。减少动态效果或跳过时只结束演出，不重复保存。邮差为固定场景插画，不是选择项。

## 发布前合并检查

1. A 替换总站导航，确认五个栏目均可跳转，避免保留不存在的页面入口。
2. C 检查三个游戏节点的史实深链接。
3. 三人共同复核史实、文字与图片来源；全站使用同一版字体、按钮和配色。
4. 用比赛指定的 Chrome 129 在 1920 / 1440 / 720 宽度检查最终整站；本模块另提供手机窄屏布局。
5. 更新总 README、成员信息和完整/匿名两份提交包。本目录尚不是最终参赛整站。


## 邮票与信纸扩充

`data/postal-designs.js` 在邮局脚本前加载，统一维护12枚邮票及4款信纸。旧邮票 yudu/luding/snow/city 编号保持兼容，新编号为 xiangjiang/zunyi/chishui/reunion/rail/harvest/stars/energy。新增可选纸张字段 `paperId` 为 mountain/river/snow/spark，保留在草稿、留言和JSON备份中。旧留言没有 paperId 时保持原有素纸，禁止迁移时强制重写。

新流程：写信→选邮票→选信纸→完整预览→确认保存→同一信纸连续折叠装封→原信箱投递。弹窗有投递章，侧栏实例初始化时移除投递章，侧栏不接收动画或成功状态。
