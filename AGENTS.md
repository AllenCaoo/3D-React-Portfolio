# 3D-React-Portfolio

This project is a 3D portfolio built with React, Three.js, and Vite. It features a navigable 3D environment (a room) populated with various models.

## Project Overview

*   **Type:** 3D React Application (Portfolio)
*   **Main Technologies:**
    *   **React:** UI framework.
    *   **Three.js:** 3D engine.
    *   **@react-three/fiber:** React reconciler for Three.js.
    *   **@react-three/drei:** Useful helpers for @react-three/fiber (loaders, controls, etc.).
    *   **Vite:** Build tool and dev server.
    *   **TypeScript:** Type safety.

## Building and Running

*   **Install Dependencies:** `npm install`
*   **Run Development Server:** `npm run dev` (Runs at `http://localhost:5173`)
*   **Run LAN/Mobile Dev Server:** `npm run dev:mobile`
*   **Expose Local Dev via ngrok:** `npm run tunnel`
*   **Build for Production:** `npm run build` (Outputs to `dist/`)
*   **Deploy:** `npm run deploy` (Deploys to GitHub Pages via `gh-pages`)
*   **Linting:** `npm run lint`

**Deployment Note:** `vite.config.ts` uses `/` for local dev and `/3D-React-Portfolio/` for production builds. Local development should use `http://localhost:5173/`, not `http://localhost:5173/3D-React-Portfolio/`. GitHub Pages still deploys to `https://allencaoo.github.io/3D-React-Portfolio/`.

## Architecture & Conventions

### Directory Structure
*   `src/components/`: Contains all React components.
    *   `Scene/`: Main 3D scene setup (lighting, controls).
    *   `Room/`: Logic for the 3D room layout and walls.
    *   `Interface/`: Wrapper containing the `<Canvas />` and HUD/UI elements.
    *   Furniture Components (e.g., `Bookshelf`, `CoffeeTable`, `Guitar`): Individual 3D elements, usually loading GLB/GLTF models.
*   `public/models/`: Contains 3D models (`.glb`, `.fbx`).
*   `public/textures/`: Contains textures used in the scene.

### Scene Management
*   The `<Canvas />` component is located in `src/components/Interface/Interface.tsx`.
*   Camera movement is handled by `src/components/Interface/CameraRig.tsx`, which uses `useFrame` for smooth transitions between views (e.g., "Library View").
*   Interactive controls (like `OrbitControls` and `ScrollControls`) are defined in `src/components/Scene/Scene.tsx`.
*   Viewport-specific behavior is centralized in `src/config/viewports.ts`. Desktop, tablet, and mobile differences should be added there first rather than scattered across components.
*   Viewport detection is handled by `src/hooks/useViewportMode.ts`.
*   The dev-only viewport overlay is rendered from `src/components/Interface/ViewportDebug.tsx`. Keep it outside the Three scene as normal DOM; avoid using `Html fullscreen` for fixed debug badges because the positioning becomes difficult to reason about.

### Viewport Rules
*   Treat desktop behavior as the baseline. Mobile and tablet adjustments should be additive and data-driven through the viewport profile config.
*   Keep camera positions, FOV, DPR, shadow toggles, control limits, and HUD placement in `src/config/viewports.ts`.
*   Prefer profile-driven HUD placement over CSS media queries when the placement is conceptually part of the viewport mode.
*   Avoid broad global `button` styling in `src/index.css`; scope UI styles to specific classes like `.hudButton`, `.viewShelf`, and `.bookshelf-actionButton`.
*   If mobile needs a bottom-pinned HUD button, explicitly unset conflicting desktop properties such as `top` in the mobile style object.

### Adding Models
1.  Place the `.glb` or `.gltf` file in `public/models/`.
2.  Create a new component in `src/components/` for the model.
3.  Use `useGLTF` from `@react-three/drei` to load the model.
4.  Render the model using `<primitive object={scene} />`.

### Styling
*   Global styles are in `src/App.css` and `src/index.css`.
*   Standard CSS is used for UI elements.
*   `src/index.css` should own only truly global layout and shared UI primitives. Device-specific HUD positioning belongs in the viewport profile config when possible.

## TODOs & Missing Features
*   Restrict vertical angling in `OrbitControls`.
*   More interactive elements (clicking on objects).
*   Refine the mobile view and responsiveness of the 3D canvas.

## React Design Principles

Adhere to KISS and SOLID principles, adapted for React component architecture:

### KISS (Keep It Simple, Stupid)
*   **Small Components:** Break down UI into small, focused components. If a component does too much, split it.
*   **Simple State:** Avoid complex state management unless necessary. Prefer local state (`useState`) or context over heavy external libraries for simple apps.
*   **Readable Props:** Keep prop interfaces simple and intuitive. Avoid passing excessive props ("prop drilling"); use Composition or Context instead.

### SOLID in React

*   **Single Responsibility Principle (SRP):** A component should have one primary job (e.g., displaying a user profile, managing a form, fetching data). Separate logic (hooks) from UI (JSX).
*   **Open/Closed Principle (OCP):** Components should be open for extension but closed for modification. Use props (like `children`, `render props`, or variant flags) to extend behavior without altering the source code.
*   **Liskov Substitution Principle (LSP):** In React, this translates to interchangeable components. If a component expects a `Button` prop, any component acting like a button should work without breaking the app.
*   **Interface Segregation Principle (ISP):** Components should not depend on props they don't use. Pass only what is needed. If a component needs a `user` object but only uses `user.name`, consider passing just `name`.
*   **Dependency Inversion Principle (DIP):** High-level components (layouts, pages) should not depend on low-level details (specific data fetching implementations). Use Custom Hooks or Context to abstract data sources.
