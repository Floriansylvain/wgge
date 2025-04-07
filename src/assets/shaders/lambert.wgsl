struct Camera {
  viewProj: mat4x4<f32>,
};

@group(0) @binding(0) var<uniform> camera: Camera;
@group(0) @binding(1) var<uniform> model: mat4x4<f32>;
@group(0) @binding(2) var<uniform> normalMatrix: mat3x3<f32>;

struct Light {
  direction: vec3<f32>,
  color: vec3<f32>,
};
@group(1) @binding(0) var<uniform> light: Light;

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec3<f32>,
  @location(1) normal: vec3<f32>,
};

@vertex
fn vs_main(
  @location(0) pos: vec3<f32>,
  @location(1) color: vec3<f32>,
  @location(2) normal: vec3<f32>
) -> VertexOut {
  var out: VertexOut;
  let worldPos = model * vec4<f32>(pos, 1.0);
  let normalWorld = normalize(normalMatrix * normal);

  out.position = camera.viewProj * worldPos;
  out.color = color;
  out.normal = normalWorld;
  return out;
}

@fragment
fn fs_main(
  @location(0) color: vec3<f32>,
  @location(1) normal: vec3<f32>
) -> @location(0) vec4<f32> {
  let lightDir = normalize(light.direction);
  let lambert = max(dot(normal, -lightDir), 0.0);
  let diffuse = lambert * light.color * color;

  let ambient = 0.1 * color;

  return vec4<f32>(diffuse + ambient, 1.0);
}
