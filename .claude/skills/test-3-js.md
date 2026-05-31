---
name: test-3-js
description: Use when verifying or testing a React Three.js (R3F) app with Playwright — especially when the app uses @react-three/drei Html components that render DOM inside the 3D scene. Covers the "element is not stable" workaround, WebGL load timing, and screenshot capture for visual verification.
---

# Testing React Three.js Apps with Playwright

## Overview

React Three Fiber apps render DOM elements inside a WebGL canvas via drei's `<Html transform>`. Playwright's stability checks fight these continuously-transformed elements. This skill covers the workarounds and patterns for reliable browser-driven verification of R3F apps.

## When to Use

- Verifying UI changes in a React Three.js / R3F application
- Taking screenshots of 3D scenes with HTML overlays
- Clicking buttons rendered via `<Html transform>` from @react-three/drei
- Automated visual regression of Three.js scenes

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

## Verification Pattern

### Setup

Install Playwright in a temp directory to avoid polluting the project:

```js
const tmpDir = execSync('mktemp -d').toString().trim();
execSync(`cd ${tmpDir} && npm init -y --silent && npm install playwright --silent`);
```

### Script Template

```js
const { chromium } = require('playwright');

(async () => {
  const dir = process.env.SCREENSHOT_DIR;
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
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${dir}/02-after-action.png` });

  // 4. Assert DOM state
  const count = (await page.$$('.my-3d-button')).length;
  console.log(`Buttons visible: ${count} (expected: 0)`);

  await browser.close();
})();
```

Run with:
```bash
SCREENSHOT_DIR="/path/to/screenshots" node /path/to/verify.cjs
```

## Quick Reference

| Scenario | Approach |
|---|---|
| Click HUD/overlay button | `await page.$('button.cls').click()` |
| Click `<Html transform>` button | `page.evaluate(() => el.dispatchEvent(...))` |
| Click 3D mesh | `page.mouse.click(canvasX, canvasY)` |
| Wait for scene load | `waitForTimeout(5000)` after `domcontentloaded` |
| Check DOM state | `page.$$('.selector')` to count elements |
| Screenshot | `page.screenshot({ path })` |

## Common Mistakes

- **Using `networkidle`** — WebGL asset streaming causes timeouts or premature firing. Use `domcontentloaded` + explicit wait.
- **Using Playwright `.click()` on `<Html transform>`** — will timeout with "element is not stable". Always use `dispatchEvent` for drei Html elements.
- **Insufficient wait after scene load** — 3D models, textures, and animations need time. Under-waiting produces blank or partial screenshots.
- **Forgetting `{ bubbles: true }`** — React's event delegation requires events to bubble. Without it, React handlers won't fire.
