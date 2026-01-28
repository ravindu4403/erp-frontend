import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Minimal static server for Railway (serves Vite dist/ as SPA)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "dist");
const indexHtml = path.join(distDir, "index.html");
const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(res);
}

function safeJoin(base, target) {
  const targetPath = path.normalize(path.join(base, target));
  return targetPath.startsWith(base) ? targetPath : null;
}

const server = http.createServer((req, res) => {
  try {
    if (!req.url) {
      res.statusCode = 400;
      return res.end("Bad Request");
    }

    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    let pathname = decodeURIComponent(url.pathname);

    // Basic security: block dotfiles
    if (pathname.includes("..")) {
      res.statusCode = 400;
      return res.end("Bad Request");
    }

    if (pathname === "/") pathname = "/index.html";

    const candidate = safeJoin(distDir, pathname);
    if (candidate && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return sendFile(res, candidate);
    }

    // SPA fallback (React Router)
    if (fs.existsSync(indexHtml)) {
      return sendFile(res, indexHtml);
    }

    res.statusCode = 404;
    return res.end("Not Found (dist not built)");
  } catch (err) {
    res.statusCode = 500;
    return res.end("Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`✅ Frontend running on http://${host}:${port}`);
});
