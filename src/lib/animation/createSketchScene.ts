import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sketchVertex, sketchFragment } from "./sketchShaders";
export type SketchController = { toggle: () => void; dispose: () => void };

/** Lazily mounted by FarmSketch. Owns every GPU resource, animation, and listener. */
export function createSketchScene(
  host: HTMLElement,
  options: {
    sketchUrl: string;
    photoUrl: string;
    onExpanded: (value: boolean) => void;
  },
): SketchController {
  gsap.registerPlugin(ScrollTrigger);
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0xffffff);
  renderer.domElement.className = "kg-sketch-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;
  const geometry = new THREE.PlaneGeometry(2, 2);
  const pointer = new THREE.Vector2(0.5, 0.5),
    target = pointer.clone();
  let material: THREE.ShaderMaterial | undefined;
  let textures: THREE.Texture[] = [];
  let trigger: ScrollTrigger | undefined;
  let disposed = false,
    visible = false,
    dirty = true,
    expanded = false,
    lastTime = 0;
  const uniforms = {
    uSketch: { value: null as THREE.Texture | null },
    uPhoto: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: pointer },
    uSketchAspect: { value: 2 },
    uPhotoAspect: { value: 2 },
    uDraw: { value: 0 },
    uHover: { value: 0 },
    uExpand: { value: 0 },
  };
  const markDirty = () => {
    dirty = true;
  };
  const tween = (uniform: { value: number }, value: number, duration: number, ease: string) =>
    gsap.to(uniform, { value, duration, ease, overwrite: true, onUpdate: markDirty });
  const move = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    target.set(
      (event.clientX - rect.left) / rect.width,
      1 - (event.clientY - rect.top) / rect.height,
    );
    dirty = true;
  };
  const enter = (event: PointerEvent) => {
    move(event);
    host.classList.add("is-hovered");
    tween(uniforms.uHover, 1, 0.3, "power2.out");
  };
  const leave = () => {
    host.classList.remove("is-hovered");
    tween(uniforms.uHover, 0, 0.3, "power2.out");
  };
  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratio = Math.min(devicePixelRatio, 2, Math.sqrt(8_000_000 / (rect.width * rect.height)));
    renderer.setPixelRatio(ratio);
    renderer.setSize(rect.width, rect.height, false);
    uniforms.uResolution.value.set(rect.width, rect.height);
    dirty = true;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const visibility = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    },
    { rootMargin: "150px" },
  );
  visibility.observe(host);
  const tick = (time: number) => {
    const dt = Math.min(time - lastTime, 0.05);
    lastTime = time;
    if (!visible || !material || document.hidden) return;
    if (pointer.distanceToSquared(target) > 0.0000001) {
      pointer.lerp(target, 1 - Math.exp(-8 * dt));
      dirty = true;
    }
    if (dirty) {
      renderer.render(scene, camera);
      dirty = false;
    }
  };
  const loseContext = (event: Event) => {
    event.preventDefault();
    host.classList.remove("is-webgl-ready");
    host.dataset.renderer = "fallback";
  };
  const restoreContext = () => {
    dirty = true;
    host.classList.add("is-webgl-ready");
    host.dataset.renderer = "webgl";
  };
  renderer.domElement.addEventListener("webglcontextlost", loseContext);
  renderer.domElement.addEventListener("webglcontextrestored", restoreContext);
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerenter", enter);
  host.addEventListener("pointerleave", leave);
  gsap.ticker.add(tick);
  const loader = new THREE.TextureLoader();
  Promise.allSettled([
    loader.loadAsync(options.sketchUrl),
    loader.loadAsync(options.photoUrl),
  ]).then((results) => {
    textures = results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
    if (disposed || results.some((result) => result.status === "rejected")) {
      textures.forEach((texture) => texture.dispose());
      if (!disposed) host.dataset.renderer = "fallback";
      return;
    }
    const [sketch, photo] = textures;
    for (const texture of textures) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
    }
    uniforms.uSketch.value = sketch;
    uniforms.uPhoto.value = photo;
    const sketchImage = sketch.image as HTMLImageElement;
    const photoImage = photo.image as HTMLImageElement;
    uniforms.uSketchAspect.value = sketchImage.width / sketchImage.height;
    uniforms.uPhotoAspect.value = photoImage.width / photoImage.height;
    material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: sketchVertex,
      fragmentShader: sketchFragment,
      depthTest: false,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));
    host.appendChild(renderer.domElement);
    resize();
    trigger = ScrollTrigger.create({
      trigger: host,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(uniforms.uDraw, {
        value: 1,
        duration: 1,
        ease: "none",
        onUpdate: markDirty,
      }),
    });
    renderer.render(scene, camera);
    host.classList.add("is-webgl-ready");
    host.dataset.renderer = "webgl";
  });
  return {
    toggle: () => {
      expanded = !expanded;
      options.onExpanded(expanded);
      host.classList.toggle("is-expanded", expanded);
      const aspect = uniforms.uResolution.value.x / uniforms.uResolution.value.y;
      tween(
        uniforms.uExpand,
        expanded ? Math.hypot(aspect, 1) + 0.2 : 0,
        expanded ? 0.6 : 0.5,
        expanded ? "power2.out" : "power3.out",
      );
    },
    dispose: () => {
      disposed = true;
      trigger?.animation?.kill();
      trigger?.kill();
      gsap.killTweensOf([uniforms.uDraw, uniforms.uHover, uniforms.uExpand]);
      gsap.ticker.remove(tick);
      observer.disconnect();
      visibility.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", loseContext);
      renderer.domElement.removeEventListener("webglcontextrestored", restoreContext);
      textures.forEach((texture) => texture.dispose());
      material?.dispose();
      geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      host.classList.remove("is-webgl-ready", "is-hovered", "is-expanded");
    },
  };
}
