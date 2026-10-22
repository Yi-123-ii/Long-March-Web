# 网页在线访问

当前仓库已公开，并启用 `main` 分支根目录的 GitHub Pages。公开访问地址：

- 长征纪事：<https://yi-123-ii.github.io/Long-March-Web/>
- 山河邮局：<https://yi-123-ii.github.io/Long-March-Web/post-office.html>

GitHub 仓库用于保存和协作修改代码。让访客直接打开网页，还需要启用 GitHub Pages 等静态网页托管服务。`127.0.0.1` 仅代表访问者自己的电脑，不能作为给队友或评委的在线地址。

## GitHub Pages 配置

本项目已将 `index.html` 放在仓库根目录，使用相对资源路径，并添加 `.nojekyll`，可按分支部署：

1. 打开仓库 **Settings → Pages**。
2. 在 **Build and deployment** 中将 **Source** 设为 **Deploy from a branch**。
3. 分支选择 **main**，目录选择 **/ (root)**，保存。
4. 等待部署成功，以 Pages 页面显示的地址为准。默认项目地址为 `https://yi-123-ii.github.io/Long-March-Web/`。
5. 发布后用未登录 GitHub 的浏览器或另一台设备访问首页和 `post-office.html`，确认页面及图片正常加载。

后续推送到 main 的更新会触发重新部署。发布需要时间，刚推送时可能仍显示旧版。

## 私有仓库说明

GitHub Free 的 Pages 适用于公开仓库；从个人私有仓库部署需要 GitHub Pro 等支持的套餐。若 Pages 页面提示升级，需选择保留私有仓库并使用支持的套餐/其他托管服务，或者由仓库所有者确认后将仓库公开。公开网页和公开源码是两个不同决定，不应在未确认时直接更改仓库可见性。

依据：[GitHub 官方 Pages 发布来源说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 留言数据

公开访问页面后，每位访客仍只看到保存在自己浏览器中的留言。网页托管不会自动将本机留言上传或改成公共留言墙；不同设备之间也不会同步。
