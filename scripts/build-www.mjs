// Copies the website into www/, which is the folder Capacitor packs into the iPhone and Android apps.
// The service worker is left out: the app itself already works offline.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';

rmSync('www', { recursive: true, force: true });
mkdirSync('www', { recursive: true });

for (const item of ['index.html', 'content.json', 'manifest.webmanifest', 'privacy.html', 'icons', 'images']) {
    if (existsSync(item)) cpSync(item, `www/${item}`, { recursive: true });
}
console.log('www/ is ready');
