const { chromium } = require('playwright');
const fs = require('fs');

const urls = fs.readFileSync('_tool_urls.txt', 'utf8').split('\n').filter(Boolean);
console.log('Headless rendering', urls.length, 'tool pages...\n');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const issues = [];
    let consoleErrors = [];
    let pageErrors = [];

    const onConsole = (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 200));
    };
    const onPageError = (err) => pageErrors.push(String(err).slice(0, 200));

    page.on('console', onConsole);
    page.on('pageerror', onPageError);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(1500);

      // Interactive widget must NOT show unavailable/loading after hydration
      const bodyText = await page.evaluate(() => document.body.innerText);
      const hasWidget = await page.evaluate(() => {
        const forms = document.querySelectorAll('form');
        const buttons = [...document.querySelectorAll('button')].filter((b) => b.textContent.trim().length > 0);
        const inputs = document.querySelectorAll('input, textarea, select');
        return { forms: forms.length, buttons: buttons.length, inputs: inputs.length };
      });

      if (bodyText.includes('Tool unavailable')) issues.push('Tool unavailable text');
      if (bodyText.includes('Loading tool...')) issues.push('Still loading (widget not hydrating)');
      if (hasWidget.forms === 0 && hasWidget.buttons === 0 && hasWidget.inputs === 0) issues.push('NO interactive widget found');
      if (consoleErrors.length) issues.push(`console errors: ${consoleErrors.join(' || ')}`);
      if (pageErrors.length) issues.push(`page errors: ${pageErrors.join(' || ')}`);

      // Check for a heading that matches the tool name to confirm the right page rendered
      const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent.trim() ?? '');
      if (!h1) issues.push('no h1 after render');

      results.push({ url: url.split('.com')[1], ok: issues.length === 0, h1, widget: hasWidget, issues });
      console.log(`${issues.length === 0 ? 'PASS' : 'FAIL'} ${url.split('.com')[1]} ${issues.length ? ':: ' + issues.join(' | ') : `(h1: "${h1.slice(0, 50)}", inputs:${hasWidget.inputs})`}`);
    } catch (err) {
      issues.push('CRASH: ' + String(err).split('\n')[0].slice(0, 150));
      results.push({ url: url.split('.com')[1], ok: false, h1: '', widget: {}, issues });
      console.log(`FAIL ${url.split('.com')[1]} :: ${issues.join(' | ')}`);
    }

    page.removeListener('console', onConsole);
    page.removeListener('pageerror', onPageError);
  }

  await browser.close();

  const pass = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);
  console.log('\n==== HEADLESS RENDER RESULT ====');
  console.log(`Total: ${results.length} | PASS: ${pass.length} | FAIL: ${fail.length}`);
  fail.forEach((f) => {
    console.log(`\n${f.url}`);
    f.issues.forEach((i) => console.log('  -', i));
  });
  fs.writeFileSync('_headless_scan.json', JSON.stringify(fail, null, 2));
})();