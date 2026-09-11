const https = require('https');
const fs = require('fs');

const urls = fs.readFileSync('_tool_urls.txt', 'utf8').split('\n').filter(Boolean);
console.log('Scanning', urls.length, 'tool URLs\n');

const get = (url) =>
  new Promise((resolve) => {
    const req = https.get(url, { timeout: 50000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ ok: res.statusCode === 200, status: res.statusCode, data }));
      res.resume();
    });
    req.on('error', () => resolve({ ok: false, status: 'ERR', data: '' }));
    req.setTimeout(50000, () => { req.destroy(); resolve({ ok: false, status: 'TIMEOUT', data: '' }); });
  });

const ERROR_MARKERS = [
  /Application error/i, /Internal Server Error/i, /__next_error__/i, /Error: /i,
  /TypeError/i, /ReferenceError/i, /Unhandled/i, /"errno"/i, /Tool unavailable/,
  /Missing [A-Za-z ]/,
];

(async () => {
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const { ok, status, data } = await get(url);
    const issues = [];
    if (!ok) { issues.push(`HTTP ${status}`); results.push({ url, issues, ok: false }); await delay(150); continue; }

    // Error markers in HTML
    for (const m of ERROR_MARKERS) if (m.test(data)) issues.push(`marker ${m}`);

    // Next.js error overlay marker
    if (data.includes('next-error') || data.includes('digest:')) issues.push('next-error overlay');

    // H1 present and unique
    const h1 = [...data.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (h1.length !== 1) issues.push(`H1 count=${h1.length}`);

    // Text word count (no scripts/styles)
    const text = data.replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').filter(Boolean).length;
    if (words < 300) issues.push(`THIN ${words} words`);

    // Content sections (AdSense content)
    const about = /About\s/i.test(text);
    const whenUse = /When to Use/i.test(data) || /When to use/i.test(data);
    const tip = /Pro Tip/i.test(data) || /Pro tip/i.test(data);
    const features = /Key Features/i.test(data);
    const benefits = /Benefits/i.test(data);
    if (!about) issues.push('no About section');
    if (!whenUse) issues.push('no When-to-Use');
    if (!tip) issues.push('no Pro Tip');
    if (!features) issues.push('no Key Features');
    if (!benefits) issues.push('no Benefits');

    // FAQ
    if (!/FAQ/i.test(data)) issues.push('no FAQ');

    // Widget SRP present ? (client-rendered; check chunk + shell)
    // The tool widget is client-side; ensure a client chunk loads by checking next data or widget container.
    // We can't see post-hydration HTML via curl, so check the widget shell marker.
    if (!data.includes('Loading tool')) issues.push('widget shell missing');

    // Meta
    const md = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i.exec(data);
    if (!md) issues.push('no meta description');
    else if (md[1].length < 50 || md[1].length > 165) issues.push(`meta desc ${md[1].length}`);

    const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(data);
    if (!title) issues.push('no <title>');
    else if (title[1].length > 70) issues.push(`title ${title[1].length} chars`);

    if (!/<link[^>]+rel=["']canonical["']/i.test(data)) issues.push('no canonical');
    if (!data.includes('application/ld+json')) issues.push('no JSON-LD');
    if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*index[^"']*follow/i.test(data)) issues.push('robots meta not index,follow');

    // Breadcrumb / internal links
    const links = (data.match(/<a /g) || []).length;
    if (links < 5) issues.push(`few links (${links})`);

    results.push({ url, issues, ok: issues.length === 0, words });

    if (issues.length) {
      console.log(issues.length === 0 ? 'PASS' : 'FAIL', url.split('.com')[1], issues.length ? `-> ${issues.join(' | ')}` : '');
    }
    await delay(120);
  }

  const pass = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);
  const thin = results.filter((r) => r.words < 300);
  console.log('\n==== LIVE SCAN RESULT ====');
  console.log(`Total: ${results.length} | PASS: ${pass.length} | FAIL: ${fail.length}`);
  console.log('\nAll URLs under 300 words:');
  thin.forEach((t) => console.log(`  ${t.url} (${t.words})`));

  console.log('\nFAILED URLs detail:');
  fail.forEach((f) => {
    console.log(`  ${f.url.split('.com')[1]} [${f.words}w]`);
    f.issues.forEach((i) => console.log(`      - ${i}`));
  });

  fs.writeFileSync('_live_scan.json', JSON.stringify(results.filter((r) => !r.ok), null, 2));
})();

function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }