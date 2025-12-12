import * as THREE from 'three';

export function initScene(canvas) {
  const scene = new THREE.Scene();

  // Dark fog for colorful dark theme
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 50);

  // Moonlight (Directional)
  const moonLight = new THREE.DirectionalLight(0xaaccff, 0.8);
  moonLight.position.set(-50, 50, 50);
  moonLight.userData = { type: 'moon_light' };
  scene.add(moonLight);

  // General Ambient
  const ambientLight = new THREE.AmbientLight(0x222222); // Darker ambient
  scene.add(ambientLight);

  // Fog for depth (Moon atmosphere)
  scene.fog = new THREE.FogExp2(0x050510, 0.015); // Dark blue-ish grey fog

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  // Renderer settings
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x050510, 1); // Match fog color match background
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.0;

  return { scene, camera, renderer };
}

