# Web GPU Game Engine

This project aims to create a game engine using WebGPU + Typescript. It should provide all the necessary abstractions and systems to build a simple 3D game.

## ToDo V1

### 1. Project Setup & Dev Workflow
- ✅ Modular project structure (`src/` is now cleanly organized into `core/`, `render/`, `scene/`, etc.)
- ✅ Build tooling (Vite/Webpack) (`vite` with TypeScript + Prettier)
- ✅ WebGPU adapter check (`initWebGPU.ts` & `WebGPUDeviceManager`)
- ✅ Debug overlay
- 🔲 Scene inspector (dev-only)

### 2. Low-Level WebGPU Abstractions
- ✅ Device and context manager (`WebGPUDeviceManager.ts`)
- ✅ Buffer abstraction (uniform, vertex, index, storage) (`GPUBufferWrapper.ts`)
- ✅ Texture abstraction (2D, depth, shadow) (`GPUTextureWrapper.ts`)
- ✅ Pipeline abstraction (`Material.ts`)
- ✅ Command encoder abstraction (`GPUCommandEncoderWrapper.ts`)

### 3. Rendering System
- ✅ Basic forward renderer (`Renderer.ts` + `SceneObject`)
- ✅ Lighting (directional) (`LightUniform`, WGSL, Lambert shading)
- 🔲 Point lighting
- 🔲 Skybox or procedural background
- ✅ Depth testing and face culling (depth texture + backface culling)

### 4. Camera System
- ✅ Perspective camera (`Camera.ts`)
- 🔲 Orthographic camera
- ✅ First-person camera controller
- 🔲 Frustum culling
- ✅ Camera matrix uniforms (`CameraUniform.ts`)

### 5. Entity-Component System (ECS)
- 🔲 Unique entities
- ✅ Basic components (Transform, Mesh, Light, etc.)
- ✅ Update and render systems (via `Scene.ts`)
- 🔲 Event system or messaging

### 6. Game Loop & Time Management
- ✅ Delta time (`Clock.ts`)
- ✅ Game loop with update/render separation (`Scene.update()` + `Scene.render()`)
- 🔲 Pause/resume logic

### 7. Input Handling
- ✅ Keyboard & mouse input tracking (`Input.ts`)
- 🔲 Bindable input system
- ✅ Mouse lock support
- 🔲 Configurable input mappings

### 8. Asset Management
- 🔲 GLTF/GLB model loader
- 🔲 Texture loading and format support
- 🔲 Material definition system (early stage)
- 🔲 Asset caching and preloading

### 9. Scene & Debug Tools
- 🔲 Scene graph with hierarchy
- 🔲 Scene loader/saver
- ✅ Debug UI tools (custom overlay)
- 🔲 Wireframe mode, bounding boxes

### 10. Extensibility & Architecture
- ✅ Plugin/component-based architecture (emerging via modular design)
- ✅ Shader module reuse (Lambert shading modularized)
- 🔲 Messaging/event bus
- 🔲 Hot-reload support (optional)
