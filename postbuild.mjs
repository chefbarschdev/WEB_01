import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'public', '_redirects');
const destDir = path.join(__dirname, 'dist', 'client');
const dest = path.join(destDir, '_redirects');

if (fs.existsSync(src)) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('Copied _redirects to dist/client');
} else {
  console.warn('_redirects file not found in public/');
}
