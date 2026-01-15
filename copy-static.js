// Small Node script to copy static assets into dist after tsc builds
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');

if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

// Copy style.css
const styleSrc = path.join(__dirname, 'style.css');
const styleDest = path.join(dist, 'style.css');
if (fs.existsSync(styleSrc)) {
  fs.copyFileSync(styleSrc, styleDest);
  console.log('Copied style.css -> dist/');
}

// Copy and modify index.html to fix paths
const htmlSrc = path.join(__dirname, 'index.html');
const htmlDest = path.join(dist, 'index.html');
if (fs.existsSync(htmlSrc)) {
  let html = fs.readFileSync(htmlSrc, 'utf8');
  // Fix the script path from ./dist/main.js to ./main.js
  html = html.replace('./dist/main.js', './main.js');
  fs.writeFileSync(htmlDest, html);
  console.log('Copied index.html -> dist/ (paths fixed)');
}