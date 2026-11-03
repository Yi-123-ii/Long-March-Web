# V4.4 首页历史导览画卷

## 三个史实节点

- 1934年10月为中央红军的战略转移。中央机关、中央军委和中央红军主力在于都一带集结出发，各路红军的起止时间各有不同。[共产党员网《于都：伟大长征从此起程》](https://www.12371.cn/2021/08/12/ARTI1628761763661764.shtml)
- 1935年1月15日至17日为遵义会议召开时间。会议着重处理军事与组织问题，是危急关头的历史转折。[工业和信息化部转载《中国共产党的九十年》节选](https://www.miit.gov.cn/ztzl/rdzt/dsxxjyzl/xxzl/art/2021/art_a43d76bc5e694806889c07fc36ec6adc.html)
- 1936年10月，红一方面军分别在会宁与红四方面军、在将台堡与红二方面军会师。三大主力先后会师标志着长征胜利结束。[中央网信办转载新华网《三军大会师——红军长征三大主力会师全纪录》](https://www.cac.gov.cn/2016-08/22/c_1119432029.htm)

页面文案依据以上史料改写。三个节点分别链接本项目长征纪事中的于都、遵义和三军会师篇，沿用既有深链接机制。

## 美术与网页处理

- V4.3 的首页画卷为 1280 × 288 WebP，画面自带路线，浏览器另施加 `saturate(.8) contrast(.91)`。V4.4 画卷为本项目通过 OpenAI ImageGen 新绘的概念插画，原生 2172 × 724 PNG。使用赣南河谷、贵州岩峰和北方开阔台地的意象从左到右串起历史阶段。三段地貌采用连续手卷构图。
- 网页端使用 2172 × 724、1440 × 480 和 840 × 280 三档 WebP，分别为 485,096、225,154 和 74,276 字节。制作阶段只做等比下采样和编码，浏览器按版面裁切显示。最大展示宽度为 1440 CSS 像素，桌面 2 倍像素密度下的原生采样覆盖率约为 75%，余量由浏览器插值。
- 路线、节点和标注独立于插画。赤线以 SVG 串起编号，右端的两条细分线表示先后会师的叙事收束。页面注明“历史叙事示意”。画面不包含档案照片、史料图件或精确地理轨迹。
- 页面使用现有网站排版资源和系统字体 Georgia。未增加第三方图片或新字体。

## 生成提示

> Generate a wide continuous panoramic Chinese landscape painting for a museum website history guide. This is a Chinese handscroll original artwork, ink linework and mineral color on light warm xuan paper, in a high-resolution 3:1 horizontal panorama, richly resolved actual brushwork in the foreground without any artificial sharpening. The terrain changes in a single flowing composition from LEFT to RIGHT: at left, the Red Army’s southern Jiangxi starting region as a relatively intimate river valley with a tiny wooden ferry by the shore, riparian pines and angular but modest slopes; in the middle, tall folded Guizhou karst ridges, steep escarpments with rock strata, a thin earth path and a deeply cut bend of the river; to the right, rocky heights descend into an open warm ochre plateau with understated trails converging in the distance. The valley river and layers of ridges lead the eye all the way from one end of the composition to the other. Distinct detailed inked foreground, olive-gray middle ground and pale receding distant ridges. Central ridges must remain crisp and unclouded. Refined restrained palette of warm parchment, faded pine, warm gray, ochre and sparse deep ink. Avoid visual repetition, exaggerated fog, digitally uniform patterns, dramatic sunsets, castles, fantasy, giant figures or flags. Lightly atmospheric far distance only, ample depth and real high-frequency hand-painted detail on foreground rock faces and trees. Spread terrain landmarks evenly across full width and keep most useful terrain within central 65% of height for a panoramic crop. Leave relatively open pale patches roughly near x16% y62%, x51% y48%, x85% y55% as editing room for later website markers. The art itself should have absolutely NO text, numbers, typography, signage, glyphs, lines or red marks, borders, legend, arrows, stamps, compass or map labels. Single seamless composition without panels.
