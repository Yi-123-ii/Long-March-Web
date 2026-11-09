import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";
import { buildPageStyles } from "./tools/build-page-styles.mjs";
const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".ogg": "audio/ogg",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};
const compressible = new Set([".html", ".css", ".js", ".json", ".svg", ".txt"]);
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
      if (target.endsWith('.html')) await buildPageStyles();
      const file = await stat(target);
      if (!file.isFile()) throw new Error("Not a file");
      const { size } = file;
      const extension = path.extname(target);
      const headers = {
        "Content-Type":
          types[extension] || "application/octet-stream",
        "Cache-Control": "no-store",
        "Accept-Ranges": "bytes",
      };
      let start = 0, end = size - 1, status = 200;
      if (req.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!range || (!range[1] && !range[2])) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` });
          res.end(); return;
        }
        start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
        if (range[1] && range[2]) end = Math.min(end, Number(range[2]));
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` });
          res.end(); return;
        }
        status = 206;
        headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
      }
      const canCompress = status === 200 && size >= 1024 && compressible.has(extension);
      if (canCompress) headers.Vary = "Accept-Encoding";
      const gzip = canCompress && (req.headers["accept-encoding"] || "")
        .split(",").some(value => /^gzip(?:\s*;\s*q=(?!0(?:\.0*)?$)[\d.]+)?$/i.test(value.trim()));
      if (gzip) headers["Content-Encoding"] = "gzip";
      else headers["Content-Length"] = Math.max(0, end - start + 1);
      res.writeHead(status, headers);
      if (req.method === "HEAD" || size === 0) {
        res.end();
        return;
      }
      const source = createReadStream(target, { start, end });
      if (gzip) await pipeline(source, createGzip({ level: 4 }), res);
      else await pipeline(source, res);
    } catch {
      if (res.headersSent || res.destroyed) return;
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
