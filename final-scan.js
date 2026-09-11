const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');

const urls = fs.readFileSync('_tool_urls.txt', 'utf8').split('\n').filter(Boolean);

function checkHeader(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve(res.headers['content-security-policy'] || '(none)');
      res.resume();
    }).on('error', () => resolve('(error)'));
  });
}

(async () => {
  // 1. Verify CSP header deployed
  const csp = await checkHeader('https://yourutilityhub.com/text/word-counter');
  console.log('CSP header:', csp.slice(0, 400), '\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const issues = [];
    const errors = [];

    const onConsole = (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    };
    page.on('console', onConsole);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(1200);

      // AdSense & GA must have loaded
      const loaded = await page.evaluate(() => {
        const scripts = [...document.scripts].map((s) => s.src);
        return {
          adsbygoogleLoaded: scripts.some((s) => s.includes('adsbygoogle.js')),
          gtagLoaded: scripts.some((s) => s.includes('googletagmanager.com/gtag/js')),
          dataLayer: typeof window.dataLayer !== 'undefined',
          adsbygoogleGlobal: typeof window.adsbygoogle !== 'undefined',
        };
      });

      if (!loaded.adsbygoogleLoaded) issues.push('adsbygoogle.js script NOT in DOM');
      // adsbygoogle global may only appear after push; not necessarily required on load
      if (!loaded.gtagLoaded) issues.push('gtag.js script NOT in DOM');
      if (!loaded.dataLayer) issues.push('dataLayer missing');

      // Any residual CSP violations or real errors (filter out nothing - expect zero)
      const real = errors.filter((e) => !/(favicon|manifest)/i.test(e));
      if (real.length) issues.push('console errors: ' + real[0].slice(0, 160));

      results.push({ url: url.split('.com')[1], ok: issues.length === 0, loaded, issues });
      console.log(`${issues.length === 0 ? 'PASS' : 'FAIL'} ${url.split('.com')[1]}${issues.length ? ' :: ' + issues.join(' | ') : ' :: adsbygoogle:' + loaded.adsbygoogleLoaded + ' gtag:' + loaded.gtagLoaded + ' dataLayer:' + loaded.dataLayer}`);
    } catch (err) {
      issues.push('CRASH: ' + String(err).split('\n')[0].slice(0, 150));
      results.push({ url: url.split('.com')[1], ok: false, loaded: {}, issues });
      console.log(`FAIL ${url.split('.com')[1]} :: ${issues.join(' | ')}`);
    }
    page.removeListener('console', onConsole);
  }

  await browser.close();

  const pass = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);
  console.log('\n==== FINAL HEADLESS RESULT ====');
  console.log(`Total: ${results.length} | PASS: ${pass.length} | FAIL: ${fail.length}`);
  fail.slice(0, 30).forEach((f) => {
    console.log(`\n${f.url}`);
    f.issues.forEach((i) => console.log('  -', i));
  });
  if (fail.length) fs.writeFileSync('_headless_final.json', JSON.stringify(fail, null, 2));
})();