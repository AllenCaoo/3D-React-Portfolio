---
name: test-3-js
description: Use when verifying or testing a React Three.js (R3F) app with Playwright — especially when the app uses @react-three/drei Html components that render DOM inside the 3D scene. Covers the "element is not stable" workaround, WebGL load timing, animation wait times, camera angles for 3D verification, video recording, and screenshot capture.
---

# Testing React Three.js Apps with Playwright

## Overview

React Three Fiber apps render DOM elements inside a WebGL canvas via drei's `<Html transform>`. Playwright's stability checks fight these continuously-transformed elements. This skill covers the workarounds and patterns for reliable browser-driven verification of R3F apps.

## When to Use

- Verifying UI changes in a React Three.js / R3F application
- Taking screenshots of 3D scenes with HTML overlays
- Clicking buttons rendered via `<Html transform>` from @react-three/drei
- Automated visual regression of Three.js scenes
- Recording animations (open/close, transitions, camera moves)

## Key Problems and Solutions

### 1. Page Load: Use `domcontentloaded`, Not `networkidle`

WebGL apps stream textures and models after initial load. `networkidle` may timeout or fire too early.

```js
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(5000); // allow scene + assets to render
```

Adjust the timeout based on asset count — 3-6 seconds covers most local dev scenes.

### 2. Clicking `<Html transform>` Elements: Use `dispatchEvent`

drei's `<Html transform>` applies a CSS `transform` matrix every frame to track 3D position. Playwright sees the element moving and reports `element is not stable`, timing out on `.click()`.

```js
// ❌ Fails — Playwright waits for stability that never comes
await page.locator('.bookshelf-actionButton', { hasText: 'Read' }).click();

// ✅ Works — bypass stability check with dispatchEvent
await page.evaluate(() => {
  const btns = document.querySelectorAll('.bookshelf-actionButton');
  for (const btn of btns) {
    if (btn.textContent.trim() === 'Read') {
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }
});
```

### 3. Clicking 3D Objects (Canvas Raycasting)

To click on Three.js meshes (not HTML overlays), click the canvas at pixel coordinates. R3F handles raycasting internally.

```js
const canvas = await page.$('canvas');
const box = await canvas.boundingBox();
await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.3);
```

If you don't know where an object is, try several positions and check for the expected DOM change after each click.

### 4. HUD / Overlay Buttons

Buttons rendered as normal DOM outside the canvas (HUD buttons, overlays) work with standard Playwright clicks — no workaround needed.

```js
const hudBtn = await page.$('button.hudButton');
await hudBtn.click();
```

### 5. Wait for Animations to Complete

R3F animations using `useFrame` run over multiple frames. After triggering an animation (e.g. clicking a button that opens/closes something), wait **6-8 seconds** before taking a screenshot. Capturing too early produces mid-animation or pre-animation frames.

```js
// ❌ Too short — captures mid-animation state
await page.evaluate(() => btn.dispatchEvent(new MouseEvent('click', { bubbles: true })));
await page.waitForTimeout(2000);
await page.screenshot({ path: `${dir}/result.png` });

// ✅ Wait for animation to fully complete
await page.evaluate(() => btn.dispatchEvent(new MouseEvent('click', { bubbles: true })));
await page.waitForTimeout(8000);
await page.screenshot({ path: `${dir}/result.png` });
```

### 6. Camera Angles for 3D Verification

3D objects can be invisible from certain camera angles. A book open at 180° is edge-on (invisible) from the front. Always orbit the camera to get a meaningful angle after taking a front-on screenshot.

```js
const canvas = await page.$('canvas');
const box = await canvas.boundingBox();
const cx = box.x + box.width / 2;
const cy = box.y + box.height / 2;

// Orbit right and slightly up for a 3/4 view
await page.mouse.move(cx - 100, cy);
await page.mouse.down();
await page.mouse.move(cx + 100, cy - 40, { steps: 30 });
await page.mouse.up();
await page.waitForTimeout(2000);
await page.screenshot({ path: `${dir}/angled-view.png` });
```

Tips:
- Take screenshots from **multiple angles** — don't rely on the default camera
- Horizontal drag = orbit left/right; vertical drag = orbit up/down
- Use `{ steps: 30 }` for smooth orbit moves
- Small drags (50-100px) for subtle angle changes; large drags (200-400px) for dramatic orbit

### 7. Video Recording for Animations

For animated interactions (open/close, transitions), use Playwright's `recordVideo` instead of static screenshots. Video captures the full animation flow.

```js
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  recordVideo: { dir: outputDir, size: { width: 1280, height: 900 } },
});
const page = await context.newPage();

// ... perform interactions ...

// IMPORTANT: close context (not just browser) to finalize the video file
await context.close();
await browser.close();
```

## Verification Pattern

### Setup

Install Playwright in a temp directory to avoid polluting the project:

```js
const tmpDir = execSync('mktemp -d').toString().trim();
execSync(`cd ${tmpDir} && npm init -y --silent && npm install playwright --silent`);
```

### Output Directory

Store screenshots and recordings in `/tmp/` so macOS auto-cleans them on reboot:

```js
const dir = '/tmp/3d-portfolio-test-results';
```

### Script Template

```js
const { chromium } = require('playwright');

(async () => {
  const dir = '/tmp/3d-portfolio-test-results';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // 1. Capture baseline state
  await page.screenshot({ path: `${dir}/01-initial.png` });

  // 2. Interact via HUD or canvas clicks
  const hudBtn = await page.$('button.hudButton');
  if (hudBtn) await hudBtn.click();
  await page.waitForTimeout(2000);

  // 3. Interact with <Html transform> elements via dispatchEvent
  await page.evaluate(() => {
    const btn = document.querySelector('.my-3d-button');
    if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  // 4. Wait for animation to complete
  await page.waitForTimeout(8000);
  await page.screenshot({ path: `${dir}/02-after-action.png` });

  // 5. Orbit camera for angled verification shot
  const canvas = await page.$('canvas');
  const box = await canvas.boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx - 100, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 100, cy - 40, { steps: 30 });
  await page.mouse.up();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${dir}/03-angled-view.png` });

  await browser.close();
})();
```

Run with:
```bash
node /path/to/verify.cjs
```

## Quick Reference

| Scenario | Approach |
|---|---|
| Click HUD/overlay button | `await page.$('button.cls').click()` |
| Click `<Html transform>` button | `page.evaluate(() => el.dispatchEvent(...))` |
| Click 3D mesh | `page.mouse.click(canvasX, canvasY)` |
| Wait for scene load | `waitForTimeout(5000)` after `domcontentloaded` |
| Wait for animation | `waitForTimeout(8000)` after triggering animation |
| Orbit camera | `mouse.move` + `mouse.down` + `mouse.move(steps)` + `mouse.up` |
| Check DOM state | `page.$$('.selector')` to count elements |
| Screenshot | `page.screenshot({ path })` |
| Video recording | `browser.newContext({ recordVideo: { dir, size } })` |
| Output directory | `/tmp/3d-portfolio-test-results/` |

## Common Mistakes

- **Using `networkidle`** — WebGL asset streaming causes timeouts or premature firing. Use `domcontentloaded` + explicit wait.
- **Using Playwright `.click()` on `<Html transform>`** — will timeout with "element is not stable". Always use `dispatchEvent` for drei Html elements.
- **Insufficient wait after scene load** — 3D models, textures, and animations need time. Under-waiting produces blank or partial screenshots.
- **Forgetting `{ bubbles: true }`** — React's event delegation requires events to bubble. Without it, React handlers won't fire.
- **Screenshotting before animation completes** — `useFrame` animations need 6-8 seconds. Capturing too early shows mid-animation or pre-animation state.
- **Only taking front-on screenshots** — 3D geometry can be edge-on (invisible) from certain angles. Always orbit the camera and take multiple angles for geometry changes.
- **Using static screenshots for animations** — Use `recordVideo` for open/close, transitions, and any multi-state interactions. Video is far more useful than a single frame.
- **Storing test artifacts in the project directory** — Screenshots and recordings are temp files. Use `/tmp/` so they're auto-cleaned on reboot.
