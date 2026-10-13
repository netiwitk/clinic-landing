// Browser check over the Chrome DevTools Protocol (Node 22+ built-in WebSocket, no npm packages).
// Fails on console errors, exceptions, 4xx/5xx responses, a wrong language redirect, horizontal
// overflow on a phone, or a booking message that is missing what the visitor entered.
//
// usage:  node scripts/check.mjs <siteUrl> [screenshotDir]
// e.g.    node scripts/check.mjs http://127.0.0.1:4321/clinic-landing/ shots
//         node scripts/check.mjs https://netiwitk.github.io/clinic-landing/
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const site = new URL(process.argv[2] ?? 'http://127.0.0.1:4321/');
const shots = process.argv[3];
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9455;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), 'clinic-check-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

let ws;
for (let i = 0; i < 50 && !ws; i++) {
  try {
    const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
    ws = new WebSocket(target.webSocketDebuggerUrl);
  } catch { await sleep(200); }
}
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let nextId = 0;
const pending = new Map();
const waiters = [];
const problems = [];
ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id) return pending.get(msg.id)?.(msg);
  waiters.filter((w) => w.method === msg.method).forEach((w) => w.resolve(msg));
  if (msg.method === 'Runtime.exceptionThrown') problems.push(`exception: ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`);
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') problems.push(`console.error: ${msg.params.args.map((a) => a.value).join(' ')}`);
  if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) problems.push(`HTTP ${msg.params.response.status} ${msg.params.response.url}`);
  if (msg.method === 'Network.loadingFailed' && !msg.params.canceled) problems.push(`failed: ${msg.params.errorText}`);
});
const send = (method, params = {}) => new Promise((resolve) => { const id = ++nextId; pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params })); });
const next = (method) => new Promise((resolve) => waiters.push({ method, resolve }));
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;
const go = async (url) => { const loaded = next('Page.loadEventFired'); await send('Page.navigate', { url }); await loaded; };
const settle = async () => { for (let i = 0; i < 50 && (await evaluate('document.readyState')) !== 'complete'; i++) await sleep(100); await sleep(300); };

await Promise.all(['Page.enable', 'Runtime.enable', 'Network.enable'].map((m) => send(m)));

let failures = 0;
const check = (ok, label) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`); if (!ok) failures++; };
const page = (lang) => new URL(`${lang}/`, site).href;

for (const [device, lang] of [['th-TH', 'th'], ['en-US', 'en'], ['fr-FR', 'en']]) {
  await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 Chrome', acceptLanguage: device });
  await go(site.href);
  await settle();
  check((await evaluate('location.href')) === page(lang), `${device} device lands on /${lang}/`);
}

for (const [lang, other] of [['th', 'en'], ['en', 'th']]) {
  await go(page(lang));
  await settle();
  await evaluate(`document.querySelector('a.lang').click()`);
  await settle();
  check((await evaluate('location.href')) === page(other), `language switch ${lang} → ${other}`);
}

// Fill the booking form as a visitor would, then read the message the clinic would receive.
const day = new Date(Date.now() + 30 * 864e5);
const iso = day.toISOString().slice(0, 10);
const [year, date] = [day.getUTCFullYear(), day.getUTCDate()];
const expected = {
  th: ['ขอจองคิว Mellow Dental', 'บริการ: ฟอกสีฟัน', `วันที่: `, ` ${date} `, ` ${year + 543}`, 'ช่วงเวลา: บ่าย 13:00–17:00', 'ชื่อ: สมใจ', 'เบอร์โทร: 0812345678'],
  en: ['Booking request, Mellow Dental', 'Service: Whitening', 'Date: ', ` ${date} `, ` ${year}`, 'Time: Afternoon 13:00–17:00', 'Name: Somjai', 'Phone: 0812345678'],
};
const book = (lang) => evaluate(`(() => {
  const f = document.querySelector('#booking');
  f.service.selectedIndex = 3;
  f.date.value = '${iso}';
  f.time.selectedIndex = 2;
  f.name.value = '${lang === 'th' ? 'สมใจ' : 'Somjai'}';
  f.phone.value = '0812345678';
  f.requestSubmit();
  return document.querySelector('#preview').open && document.querySelector('#preview-text').textContent;
})()`);
for (const lang of ['th', 'en']) {
  await go(page(lang));
  await settle();
  const text = await book(lang);
  check(typeof text === 'string' && expected[lang].every((s) => text.includes(s)), `${lang} booking preview: ${JSON.stringify(text)}`);
  const empty = await evaluate(`(() => { document.querySelector('#preview').close(); const f = document.querySelector('#booking'); f.reset(); f.requestSubmit(); return document.querySelector('#preview').open; })()`);
  check(empty === false, `${lang} empty form does not submit`);
}

await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
if (shots) mkdirSync(shots, { recursive: true });
for (const [name, width, height, mobile] of [['390', 390, 844, true], ['768', 768, 1024, true], ['1366', 1366, 900, false]]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  for (const lang of ['th', 'en']) {
    await go(page(lang));
    await settle();
    await evaluate(`Promise.all([...document.images].map((i) => (i.loading = 'eager', i.decode().catch(() => {}))))`);
    const overflow = await evaluate('document.documentElement.scrollWidth - innerWidth');
    check(overflow <= 0, `${lang} @${name}px has no horizontal scroll (${overflow}px)`);
    if (shots) {
      const { result } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80, captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: await evaluate('document.documentElement.scrollHeight'), scale: 1 } });
      writeFileSync(join(shots, `${lang}-${name}.jpg`), Buffer.from(result.data, 'base64'));
    }
  }
}

if (shots) {
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  for (const lang of ['th', 'en']) {
    await go(page(lang));
    await settle();
    await book(lang);
    const { result } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    writeFileSync(join(shots, `${lang}-booking.jpg`), Buffer.from(result.data, 'base64'));
  }
}

check(problems.length === 0, `no console errors or failed requests${problems.length ? `:\n  ${problems.join('\n  ')}` : ''}`);
chrome.kill();
await sleep(300);
rmSync(profile, { recursive: true, force: true });
console.log(failures ? `${failures} check(s) failed` : 'all checks passed');
process.exit(failures ? 1 : 0);
