struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec3<f32>,
};

@vertex
fn vs_main(
	@location(0) pos: vec2<f32>,
	@location(1) color: vec3<f32>,
	@location(2) z: f32
) -> VertexOut {
	var out: VertexOut;
	out.position = vec4<f32>(pos.x, pos.y, z, 1.0);
	out.color = color;
	return out;
}

@fragment
fn fs_main(@location(0) color: vec3<f32>) -> @location(0) vec4<f32> {
  return vec4<f32>(color, 1.0);
}
