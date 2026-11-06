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
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".ogg": "audio/ogg",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};
const previewUrl = `http://127.0.0.1:${port}`;
const server = http
  .createServer(async (req, res) => {
    try {
      if (!["GET", "HEAD"].includes(req.method)) {
        res.writeHead(405, { Allow: "GET, HEAD" });
        res.end();
        return;
      }
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
      const headers = {
        "Content-Type":
          types[path.extname(target)] || "application/octet-stream",
        "Cache-Control": "no-store",
        "Accept-Ranges": "bytes",
      };
      let start = 0, end = body.length - 1, status = 200;
      if (req.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!range || (!range[1] && !range[2])) {
          res.writeHead(416, { "Content-Range": `bytes */${body.length}` });
          res.end(); return;
        }
        start = range[1] ? Number(range[1]) : Math.max(0, body.length - Number(range[2]));
        if (range[1] && range[2]) end = Math.min(end, Number(range[2]));
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= body.length) {
          res.writeHead(416, { "Content-Range": `bytes */${body.length}` });
          res.end(); return;
        }
        status = 206;
        headers["Content-Range"] = `bytes ${start}-${end}/${body.length}`;
      }
      headers["Content-Length"] = Math.max(0, end - start + 1);
      res.writeHead(status, headers);
      res.end(req.method === "HEAD" ? undefined : body.subarray(start, end + 1));
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
