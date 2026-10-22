import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};
const previewUrl = `http://127.0.0.1:${port}`;
const server = http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      const target = path.resolve(
        root,
        "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname),
      );
      if (
        !target.startsWith(root + path.sep) ||
        target.includes(path.sep + ".")
      ) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const body = await readFile(target);
      res.writeHead(200, {
        "Content-Type":
          types[path.extname(target)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("页面不存在");
    }
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`本地预览：${previewUrl}`);
    if (process.argv.includes("--open") && process.platform === "win32") {
      execFile("rundll32.exe", ["url.dll,FileProtocolHandler", previewUrl], { windowsHide: true }, () => {});
    }
  });
server.on("error", error => {
  if (error.code === "EADDRINUSE") {
    console.error(`端口 ${port} 已在使用。如果已启动本项目，请直接访问 ${previewUrl}。`);
  } else console.error("预览服务未能启动：", error.message);
  process.exitCode = 1;
});
