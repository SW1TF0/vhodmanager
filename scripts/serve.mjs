// Minimal static file server for local preview and browser tests. No dependencies.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  let file = join(dist, clean);
  if (!file.startsWith(dist)) return null;
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

export function serve(port = 0) {
  const server = createServer(async (req, res) => {
    const file = await resolve(req.url);
    const status = file ? 200 : 404;
    const path = file || join(dist, '404.html');
    res.writeHead(status, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' });
    res.end(await readFile(path));
  });
  return new Promise((ok) => server.listen(port, '127.0.0.1', () => ok(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await serve(Number(process.env.PORT) || 8080);
  console.log(`Serving dist/ at http://127.0.0.1:${server.address().port}/`);
}
