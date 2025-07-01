// postbuild.js
const fs = require('fs');
const path = require('path');

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
