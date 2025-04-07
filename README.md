# Web GPU Game Engine

This project aims to create a game engine using WebGPU + Typescript. It should provide all the necessary abstractions and systems to build a simple 3D game.

## ToDo V1

### 1. Project Setup & Dev Workflow
- [x] Modular project structure (`src/` is now cleanly organized into `core/`, `render/`, `scene/`, etc.)
- [x] Build tooling (Vite/Webpack) (`vite` with TypeScript + Prettier)
- [x] WebGPU adapter check (`initWebGPU.ts` & `WebGPUDeviceManager`)
- [ ] Debug overlay
- [ ] Scene inspector (dev-only)

### 2. Low-Level WebGPU Abstractions
- [x] Device and context manager (`WebGPUDeviceManager.ts`)
- [x] Buffer abstraction (uniform, vertex, index, storage) (`GPUBufferWrapper.ts`)
- [x] Texture abstraction (2D, depth, shadow) (`GPUTextureWrapper.ts`)
- [x] Pipeline abstraction (`Material.ts`)
- [ ] Command encoder abstraction (currently used directly in `Renderer`)

### 3. Rendering System
- [x] Basic forward renderer (`Renderer.ts` + `SceneObject`)
- [x] Lighting (directional) (`LightUniform`, WGSL, Lambert shading)
- [ ] Point lighting
- [ ] Skybox or procedural background
- [x] Depth testing and face culling (depth texture + backface culling)

### 4. Camera System
- [x] Perspective camera (`Camera.ts`)
- [ ] Orthographic camera
- [ ] First-person camera controller
- [ ] Frustum culling
- [x] Camera matrix uniforms (`CameraUniform.ts`)

### 5. Entity-Component System (ECS)
- [ ] Unique entities
- [x] Basic components (Transform, Mesh, Light, etc.)
- [x] Update and render systems (via `Scene.ts`)
- [ ] Event system or messaging

### 6. Game Loop & Time Management
- [x] Delta time (`Clock.ts`)
- [x] Game loop with update/render separation (`Scene.update()` + `Scene.render()`)
- [ ] Pause/resume logic

### 7. Input Handling
- [ ] Keyboard & mouse input tracking
- [ ] Bindable input system
- [ ] Mouse lock support
- [ ] Configurable input mappings

### 8. Asset Management
- [ ] GLTF/GLB model loader
- [ ] Texture loading and format support
- [ ] Material definition system (early stage)
- [ ] Asset caching and preloading

### 9. Scene & Debug Tools
- [ ] Scene graph with hierarchy
- [ ] Scene loader/saver
- [ ] Debug UI tools (dat.GUI or custom)
- [ ] Wireframe mode, bounding boxes

### 10. Extensibility & Architecture
- [x] Plugin/component-based architecture (emerging via modular design)
- [x] Shader module reuse (Lambert shading modularized)
- [ ] Messaging/event bus
- [ ] Hot-reload support (optional)
