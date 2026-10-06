/** Original shaders: graphite develops by ink density, then opens into the real photograph. */
export const sketchVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
export const sketchFragment = /* glsl */ `
  uniform sampler2D uSketch;
  uniform sampler2D uPhoto;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uSketchAspect;
  uniform float uPhotoAspect;
  uniform float uDraw;
  uniform float uHover;
  uniform float uExpand;
  varying vec2 vUv;
  float random(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float grain(vec2 p) {
    vec2 cell = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(cell), random(cell + vec2(1., 0.)), f.x),
               mix(random(cell + vec2(0., 1.)), random(cell + vec2(1.)), f.x), f.y);
  }
  vec2 cover(vec2 p, float imageAspect) {
    float frameAspect = uResolution.x / uResolution.y;
    vec2 crop = vec2(min(1.0, frameAspect / imageAspect), min(1.0, imageAspect / frameAspect));
    return (p - 0.5) * crop + 0.5;
  }
  void main() {
    vec3 pencil = texture2D(uSketch, cover(vUv, uSketchAspect)).rgb;
    vec3 photo = texture2D(uPhoto, cover(vUv, uPhotoAspect)).rgb;
    float density = 1.0 - dot(pencil, vec3(0.2126, 0.7152, 0.0722));
    float flecks = grain(vUv * uResolution * 0.21);
    float threshold = (1.0 - uDraw) * 1.7 - 0.35
                    + (1.0 - vUv.y) * 0.28 + (flecks - 0.5) * 0.32;
    float ink = smoothstep(threshold, threshold + 0.065, density);
    vec3 drawing = mix(vec3(1.0), pencil, ink);
    vec2 offset = (vUv - uPointer) * vec2(uResolution.x / uResolution.y, 1.0);
    float distanceToPointer = length(offset);
    float roughEdge = (grain(vUv * 130.0) - 0.5) * 0.012;
    float peek = 1.0 - smoothstep(0.11 + roughEdge, 0.16 + roughEdge, distanceToPointer);
    float expanded = 1.0 - smoothstep(uExpand - 0.08 + roughEdge,
                                      uExpand + 0.015 + roughEdge, distanceToPointer);
    expanded *= step(0.001, uExpand);
    float settled = smoothstep(0.96, 1.0, expanded) + (1.0 - smoothstep(0.0, 0.04, expanded));
    float lens = peek * uHover * min(1.0, settled);
    vec3 base = mix(drawing, photo, expanded);
    vec3 inverse = mix(photo, drawing, expanded);
    gl_FragColor = vec4(mix(base, inverse, lens), 1.0);
    #include <colorspace_fragment>
  }
`;
