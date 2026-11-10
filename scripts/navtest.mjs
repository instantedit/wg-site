// Click-tests client navigation and the contact wizard with real CDP mouse/keyboard events.
// usage: node scripts/navtest.mjs <origin>
import { spawn } from "node:child_process";

const [origin = "http://localhost:3421"] = process.argv.slice(2);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9533 + Math.floor(Math.random() * 200);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--remote-debugging-port=${port}`, "--window-size=1440,900", `--user-data-dir=/tmp/wg-nav-${port}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map(); const errors = [];
const send = (method, params = {}) => new Promise((res, rej) => { const mid = ++id; pending.set(mid, { res, rej }); ws.send(JSON.stringify({ id: mid, method, params })); });
const evalJs = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.value;
const waitFor = async (expr, ms = 8000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await evalJs(expr)) return true; await sleep(150); } return false; };
const click = async (selector) => {
  const ok = await waitFor(`!!document.querySelector(${JSON.stringify(selector)})`);
  if (!ok) throw new Error(`missing ${selector}`);
  if (selector.startsWith('header')) await evalJs("window.scrollTo({top:0,behavior:'instant'})"); else await evalJs(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`);
  await sleep(700);
  const r = await evalJs(`(() => { const b = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return [b.left + b.width/2, b.top + b.height/2]; })()`);
  const [x, y] = r;
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
};
const type = async (selector, text) => { await click(selector); for (const ch of text) await send("Input.dispatchKeyEvent", { type: "char", text: ch }); };

try {
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
  ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { if (msg.error) console.log('cdp error', JSON.stringify(msg.error)); pending.get(msg.id).res(msg.result ?? {}); pending.delete(msg.id); } else if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails?.exception?.description?.split("\n")[0] ?? "exception"); };
  await send("Page.enable"); await send("Runtime.enable");
  await send("Page.navigate", { url: origin + "/" });
  await waitFor("document.documentElement.classList.contains('gsap-ready')");
  await sleep(1500);

  // 1. Client-side navigation through every header link and back home via the logo
  const links = ["/leagues", "/tournaments", "/events", "/get-involved", "/about"];
  for (const href of links) {
    await click(`header nav ul a[href="${href}"]`);
    const ok = await waitFor(`location.pathname === ${JSON.stringify(href)} && !!document.querySelector('h1')`);
    console.log(ok ? "ok  " : "FAIL", "nav", href, ok ? (await evalJs("document.querySelector('h1').innerText.replace(/\\n/g,' ')")) : "");
    await sleep(900);
  }
  await click('header a[aria-label="Workin Gamerz home"]');
  console.log((await waitFor("location.pathname === '/'")) ? "ok  " : "FAIL", "nav / (logo)");
  // footer links to partners and contact
  await click('footer a[href="/partners"]');
  console.log((await waitFor("location.pathname === '/partners'")) ? "ok  " : "FAIL", "nav /partners (footer)");
  await click('footer a[href="/contact"]');
  console.log((await waitFor("location.pathname === '/contact'")) ? "ok  " : "FAIL", "nav /contact (footer)");

  // 2. Contact wizard end to end (demo mode)
  await sleep(800);
  await click('#contact [role="radio"]');
  await type("#f-message", "Testing the wizard from the nav test.");
  await click('#contact button.btn-gold');
  console.log((await waitFor("!!document.querySelector('#f-name')")) ? "ok  " : "FAIL", "wizard step 2 shown");
  await type("#f-name", "Test Player");
  await type("#f-email", "test@example.com");
  await click('#contact button.btn-gold');
  const done = await waitFor("/message sent\./i.test(document.body.innerText)", 10000);
  if (!done) console.log("wizard state:", JSON.stringify(await evalJs("({name: document.querySelector('#f-name')?.value, email: document.querySelector('#f-email')?.value, text: document.querySelector('#contact').innerText.replace(/\\s+/g,' ').slice(0,500)})")));
  console.log(done ? "ok  " : "FAIL", "wizard submitted", done ? await evalJs("document.body.innerText.includes('Preview mode') ? '(demo mode)' : '(delivered)'") : "");

  // 3. Theme toggle via click
  await click('header button[aria-label^="Switch to"]');
  await sleep(900);
  console.log("ok  ", "theme now", await evalJs("document.documentElement.getAttribute('data-theme')"));

  console.log(errors.length ? `EXCEPTIONS: ${errors.join(" | ")}` : "no runtime exceptions");
} catch (e) {
  console.log("FAIL", e.message);
} finally {
  chrome.kill();
}
