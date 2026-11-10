// Zero-dependency CDP screenshot driver for headless Chrome.
// usage: node scripts/screenshot.mjs <url> <out.png> <width> <height> [mobile]
// Writes <out>-00.png, <out>-01.png ... one per viewport.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [url, outfile, w = "1440", h = "900", mobile = "0"] = process.argv.slice(2);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9333 + Math.floor(Math.random() * 200);
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  `--remote-debugging-port=${port}`, `--window-size=${w},${h}`,
  `--user-data-dir=/tmp/wg-shot-${port}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map(); const listeners = [];
const send = (method, params = {}) => new Promise((res, rej) => {
  const mid = ++id; pending.set(mid, { res, rej });
  ws.send(JSON.stringify({ id: mid, method, params }));
});
const waitEvent = (name) => new Promise((res) => listeners.push({ name, res }));

try {
  let targets;
  for (let i = 0; i < 50; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; }
    catch { await sleep(200); }
  }
  const page = targets.find((t) => t.type === "page");
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id).res(msg.result); pending.delete(msg.id); }
    else if (msg.method) listeners.filter((l) => l.name === msg.method).forEach((l) => l.res(msg.params));
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.addScriptToEvaluateOnNewDocument", { source: `window.__errs=[];addEventListener('error',e=>__errs.push(String(e.message)));${process.env.THEME ? `try{localStorage.setItem('wg-theme','${process.env.THEME}')}catch(e){}` : ""}` });
  await send("Emulation.setDeviceMetricsOverride", {
    width: +w, height: +h, deviceScaleFactor: 1, mobile: mobile === "1",
  });
  const loaded = waitEvent("Page.loadEventFired");
  await send("Page.navigate", { url });
  await loaded;
  await sleep(3500); // hero timeline
  const evalJs = (expression) => send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  const { result } = await evalJs("document.documentElement.scrollHeight");
  const full = result.value;
  // scroll through to fire every ScrollTrigger
  for (let y = 0; y < full; y += Math.round(+h * 0.6)) {
    await evalJs(`window.scrollTo({top:${y},behavior:'instant'})`);
    await sleep(350);
  }
  await sleep(1500);
  // capture viewport by viewport (expanding the viewport would stretch svh heroes)
  const prefix = outfile.replace(/\.png$/, "");
  const errs = await evalJs("JSON.stringify(window.__errs||[])");
  let n = 0;
  for (let y = 0; y < full; y += +h) {
    await evalJs(`window.scrollTo({top:${y},behavior:'instant'})`);
    await sleep(900);
    const shot = await send("Page.captureScreenshot", { format: "png" });
    writeFileSync(`${prefix}-${String(n).padStart(2, "0")}.png`, Buffer.from(shot.data, "base64"));
    n++;
  }
  await evalJs("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'})");
  await sleep(1200);
  const end = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${prefix}-end.png`, Buffer.from(end.data, "base64"));
  console.log(`saved ${n} frames ${prefix}-NN.png (${w}x${h}, page ${full}px)`, errs.result?.value ?? "");
} finally {
  chrome.kill();
}
