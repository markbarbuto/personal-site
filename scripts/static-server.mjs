import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { pathToFileURL } from "node:url";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

export async function serveStatic(directory, port = 0) {
  const root = resolve(directory);
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      let file = resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + sep)) {
        response.writeHead(403).end();
        return;
      }
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
      const body = await readFile(file);
      response.writeHead(200, { "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream" });
      response.end(body);
    } catch {
      const body = await readFile(resolve(root, "404.html")).catch(() => Buffer.from("Not found"));
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end(body);
    }
  });
  await new Promise((ready) => server.listen(port, "127.0.0.1", ready));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { url } = await serveStatic(process.argv[2] ?? "dist", Number(process.argv[3] ?? 4174));
  console.log(`Static preview at ${url}`);
}
