struct Camera {
  viewProj: mat4x4<f32>,
};

@group(0) @binding(0) var<uniform> camera: Camera;
@group(0) @binding(1) var<uniform> model: mat4x4<f32>;

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec3<f32>,
};

@vertex
fn vs_main(
  @location(0) pos: vec3<f32>,
  @location(1) color: vec3<f32>
) -> VertexOut {
  var out: VertexOut;
  out.position = camera.viewProj * model * vec4<f32>(pos, 1.0);
  out.color = color;
  return out;
}

@fragment
fn fs_main(@location(0) color: vec3<f32>) -> @location(0) vec4<f32> {
  return vec4<f32>(color, 1.0);
}
