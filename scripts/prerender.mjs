import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

process.env.NODE_ENV = 'production';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const entry = ['dist-ssr/prerender-entry.mjs', 'dist-ssr/prerender-entry.js']
  .map(path => resolve(root, path))
  .find(existsSync);

if (!entry) {
  throw new Error('SSR bundle not found, run vite build --ssr first');
}

const { render } = await import(pathToFileURL(entry).href);

let appHtml = render();

appHtml = appHtml.replace(/href="\//g, 'href="#/');

const indexPath = resolve(root, 'dist/index.html');
const html = readFileSync(indexPath, 'utf8');

if (!html.includes('<!--app-html-->')) {
  throw new Error('Placeholder <!--app-html--> not found in dist/index.html');
}

writeFileSync(indexPath, html.replace('<!--app-html-->', appHtml));
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });

console.log('Home page prerendered into dist/index.html');
