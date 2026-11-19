// Click-tests the /sponsors discovery wizard end to end with real CDP mouse and key events.
import { spawn } from "node:child_process";
const [origin = "http://localhost:3421"] = process.argv.slice(2);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9233 + Math.floor(Math.random() * 90);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--remote-debugging-port=${port}`, "--window-size=1440,900", `--user-data-dir=/tmp/wg-sp-${port}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map(); const errors = [];
const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
const evalJs = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }))?.result?.value;
const waitFor = async (expr, ms = 8000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await evalJs(expr)) return true; await sleep(150); } return false; };
const find = (sel, text) => text ? `[...document.querySelectorAll(${JSON.stringify(sel)})].find(e => e.textContent.trim() === ${JSON.stringify(text)})` : `document.querySelector(${JSON.stringify(sel)})`;
const click = async (sel, text) => {
  if (!(await waitFor(`!!(${find(sel, text)})`))) throw new Error(`missing ${sel} ${text ?? ""}`);
  await evalJs(`(${find(sel, text)}).scrollIntoView({block:'center',behavior:'instant'})`); await sleep(500);
  const [x, y] = await evalJs(`(() => { const b = (${find(sel, text)}).getBoundingClientRect(); return [b.left + b.width/2, b.top + b.height/2]; })()`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
};
const type = async (sel, text) => { await click(sel); for (const ch of text) await send("Input.dispatchKeyEvent", { type: "char", text: ch }); };
const log = (ok, what) => console.log(ok ? "ok  " : "FAIL", what);
try {
  let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
  ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result ?? {}); pending.delete(msg.id); } else if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails?.exception?.description?.split("\n")[0] ?? "exception"); };
  await send("Page.enable"); await send("Runtime.enable");
  await send("Page.navigate", { url: origin + "/sponsors" });
  await waitFor("document.documentElement.classList.contains('gsap-ready')"); await sleep(1500);
  const B = "#discovery button";
  await click("#discovery button.btn-gold");
  log(await waitFor("/pick at least one/i.test(document.querySelector('#discovery').innerText)"), "step 1 blocks an empty answer");
  await click(B, "Reach working professionals"); await click(B, "Recruit talent");
  await click("#discovery button.btn-gold");
  log(await waitFor(`!!(${find(B, "League season")})`), "step 2 shown");
  await click(B, "League season"); await click(B, "This quarter");
  await click("#discovery button.btn-gold");
  log(await waitFor("!!document.querySelector('#f-company')"), "step 3 shown");
  await type("#f-company", "Test Brand Co"); await type("#f-industry", "Food and beverage");
  await click("#discovery button.btn-gold");
  log(await waitFor("!!document.querySelector('#f-name')"), "step 4 shown");
  await type("#f-name", "Test Sponsor"); await type("#f-email", "sponsor@example.com");
  await click("#discovery button.btn-gold");
  const done = await waitFor("/discovery started\\./i.test(document.querySelector('#discovery').innerText)", 10000);
  log(done, "wizard submitted " + (done ? await evalJs("/preview mode/i.test(document.body.innerText) ? '(demo mode)' : '(delivered)'") : ""));
  log(await evalJs(`!!(${find("#discovery a", "Meet our partners")})`), "success button points to partners");
  console.log(errors.length ? `EXCEPTIONS: ${errors.join(" | ")}` : "no runtime exceptions");
} catch (e) { console.log("FAIL", e.message); } finally { chrome.kill(); }
