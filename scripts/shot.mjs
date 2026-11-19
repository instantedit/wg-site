// One screenshot after optional scroll + script. usage: node scripts/shot.mjs <url> <out.png> <w> <h> <mobile 0|1> <theme> [scrollSelector] [js]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const [url, out, w = "1440", h = "900", mobile = "0", theme = "", sel = "", js = ""] = process.argv.slice(2);
const port = 9140 + Math.floor(Math.random() * 90);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/wg-one-${port}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
try {
  let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
  ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result ?? {}); pending.delete(msg.id); } };
  await send("Page.enable"); await send("Runtime.enable");
  if (theme) await send("Page.addScriptToEvaluateOnNewDocument", { source: `try{localStorage.setItem('wg-theme','${theme}')}catch(e){}` });
  await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: mobile === "1" ? 2 : 1, mobile: mobile === "1" });
  await send("Page.navigate", { url }); await sleep(4500);
  if (sel) { await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(sel)})?.scrollIntoView({block:'center',behavior:'instant'})` }); await sleep(2500); }
  if (js) { await send("Runtime.evaluate", { expression: js }); await sleep(1400); }
  writeFileSync(out, Buffer.from((await send("Page.captureScreenshot", { format: "png" })).data, "base64")); console.log("saved", out);
} finally { chrome.kill(); }
