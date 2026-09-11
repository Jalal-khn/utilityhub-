const https = require('https');
const fs = require('fs');

const urls = fs.readFileSync('_sitemap_urls.txt', 'utf8').split('\n').filter(Boolean);

const get = (url) => new Promise((resolve) => {
  https.get(url, { timeout: 60000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', (c) => (data += c));
    res.on('end', () => resolve({ status: res.statusCode, data }));
  }).on('error', (e) => resolve({ status: 'ERR', data: '' }));
});

const issues = [];

(async () => {
  for (const url of urls) {
    const { status, data } = await get(url);
    if (status !== 200) { issues.push({ url, issue: `HTTP ${status}` }); continue; }
    if (!data.includes('</html>')) { issues.push({ url, issue: 'Incomplete HTML' }); continue; }

    // Content words (strip scripts/styles/tags)
    const text = data.replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').filter(Boolean).length;
    if (words < 300) issues.push({ url, issue: `THIN content (${words} words)` });

    // Title
    const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(data);
    if (!title) issues.push({ url, issue: 'Missing <title>' });
    else if (title[1].trim().length > 70) issues.push({ url, issue: `Title too long (${title[1].trim().length})` });

    // Meta description
    const md = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i.exec(data);
    if (!md) issues.push({ url, issue: 'Missing meta description' });
    else if (md[1].length < 50) issues.push({ url, issue: `Meta desc too short (${md[1].length})` });
    else if (md[1].length > 165) issues.push({ url, issue: `Meta desc too long (${md[1].length})` });

    // Canonical
    const can = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i.test(data);
    if (!can) issues.push({ url, issue: 'Missing canonical' });

    // H1
    const h1s = [...data.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (h1s.length === 0) issues.push({ url, issue: 'Missing H1' });
    else if (h1s.length > 1) issues.push({ url, issue: `Multiple H1s (${h1s.length})` });

    // Heading hierarchy: no h2 before h1 is allowed; check h3 without h2 etc.
    const headings = [...data.matchAll(/<h([1-6])[^>]*>/gi)].map((m) => Number(m[1]));
    let prev = 0;
    let badHierarchy = false;
    for (const h of headings) {
      if (h > prev + 1) { badHierarchy = true; break; }
      prev = h;
    }
    if (badHierarchy) issues.push({ url, issue: 'Heading hierarchy skip (H1>H3 without H2)' });

    // JSON-LD
    const jsonld = data.includes('application/ld+json');
    if (!jsonld) issues.push({ url, issue: 'Missing JSON-LD schema' });

    // Slug / URL cleanliness
    if (/[A-Z]/i.test(url) && /[A-Z]/.test(url)) { /* fine */ }
    if (/[?&=]/.test(url)) issues.push({ url, issue: 'Query params in canonical URL' });

    // Internal links
    const links = (data.match(/<a /g) || []).length;
    if (links < 3) issues.push({ url, issue: `Too few internal links (${links})` });

    // robots meta
    const robots = /<meta[^>]+name=["']robots["']/i.test(data);
    if (robots) issues.push({ url, issue: 'Has robots meta (check coindex)' });

    await new Promise((r) => setTimeout(r, 150));
  }

  // Group and print
  const grouped = {};
  for (const it of issues) {
    if (!grouped[it.issue]) grouped[it.issue] = [];
    grouped[it.issue].push(it.url);
  }
  console.log('TOTAL ISSUES:', issues.length);
  for (const [issue, refs] of Object.entries(grouped)) {
    console.log(`\n${issue} (${refs.length}):`);
    refs.slice(0, 12).forEach((u) => console.log('  ' + u));
    if (refs.length > 12) console.log(`  ... and ${refs.length - 12} more`);
  }
  // Write full list
  fs.writeFileSync('_audit_results.json', JSON.stringify(issues, null, 2));
})();