const { createCanvas } = require('canvas');
const fs = require('fs');

const size = 512;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// rounded-rect clip
const r = size * 0.22;
const roundRect = (x, y, w, h, rad) => {
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
};

roundRect(0, 0, size, size, r);
ctx.clip();

// gradient bg (#4338ca -> #a21caf)
const g = ctx.createLinearGradient(0, 0, size, size);
g.addColorStop(0, '#4338ca');
g.addColorStop(1, '#a21caf');
ctx.fillStyle = g;
ctx.fillRect(0, 0, size, size);

// U letter
ctx.fillStyle = '#ffffff';
ctx.font = '700 ' + Math.round(size * 0.60) + 'px Arial, Helvetica, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('U', size / 2, size / 2 + size * 0.04);

const out = fs.createWriteStream('public/logo.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('WROTE public/logo.png'));
