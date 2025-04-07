# Web GPU Game Engine

This project aims to create a game engine using WebGPU + Typescript. It should provide all the necessary abstractions and systems to build a simple 3D game.

## ToDo V1

### 1. Project Setup & Dev Workflow
- [ ] Modular project structure
- [ ] Build tooling (Vite/Webpack)
- [ ] WebGPU adapter check
- [ ] Debug overlay
- [ ] Scene inspector (dev-only)

### 2. Low-Level WebGPU Abstractions
- [ ] Device and context manager
- [ ] Buffer abstraction (uniform, vertex, index, storage)
- [ ] Texture abstraction (2D, depth, shadow)
- [ ] Pipeline abstraction
- [ ] Command encoder abstraction

### 3. Rendering System
- [ ] Basic forward renderer
- [ ] Lighting (directional, point)
- [ ] Skybox or procedural background
- [ ] Depth testing and face culling

### 4. Camera System
- [ ] Perspective & orthographic camera classes
- [ ] First-person camera controller
- [ ] Frustum culling
- [ ] Camera matrix uniforms

### 5. Entity-Component System (ECS)
- [ ] Unique entities
- [ ] Basic components (Transform, Mesh, Light, etc.)
- [ ] Update and render systems
- [ ] Event system or messaging

### 6. Game Loop & Time Management
- [ ] Delta time and fixed update
- [ ] Game loop with update/render separation
- [ ] Pause/resume logic

### 7. Input Handling
- [ ] Keyboard & mouse input tracking
- [ ] Bindable input system
- [ ] Mouse lock support
- [ ] Configurable input mappings

### 8. Asset Management
- [ ] GLTF/GLB model loader
- [ ] Texture loading and format support
- [ ] Material definition system
- [ ] Asset caching and preloading

### 9. Scene & Debug Tools
- [ ] Scene graph with hierarchy
- [ ] Scene loader/saver
- [ ] Debug UI tools (dat.GUI or custom)
- [ ] Wireframe mode, bounding boxes

### 10. Extensibility & Architecture
- [ ] Plugin/component-based architecture
- [ ] Shader module reuse
- [ ] Messaging/event bus
- [ ] Hot-reload support (optional)
