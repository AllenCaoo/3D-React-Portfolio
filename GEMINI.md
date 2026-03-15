# Gemini Instructions - 3D-React-Portfolio

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
*   **Build for Production:** `npm run build` (Outputs to `dist/`)
*   **Deploy:** `npm run deploy` (Deploys to GitHub Pages via `gh-pages`)
*   **Linting:** `npm run lint`

**Deployment Note:** The project is configured with a base URL of `/3D-React-Portfolio/` in `vite.config.ts` for GitHub Pages.

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
*   Camera movement is handled by a `CameraRig` component inside `Interface.tsx`, which uses `useFrame` for smooth transitions between views (e.g., "Library View").
*   Interactive controls (like `OrbitControls` and `ScrollControls`) are defined in `src/components/Scene/Scene.tsx`.

### Adding Models
1.  Place the `.glb` or `.gltf` file in `public/models/`.
2.  Create a new component in `src/components/` for the model.
3.  Use `useGLTF` from `@react-three/drei` to load the model.
4.  Render the model using `<primitive object={scene} />`.

### Styling
*   Global styles are in `src/App.css` and `src/index.css`.
*   Standard CSS is used for UI elements.

## TODOs & Missing Features
*   Restrict vertical angling in `OrbitControls`.
*   More interactive elements (clicking on objects).
*   Refine the mobile view and responsiveness of the 3D canvas.
