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

  // 1. Main Moonlight (Directional - Cool Blue/White)
  const moonLight = new THREE.DirectionalLight(0xaaccff, 1.2); // Increased intensity
  moonLight.position.set(-50, 50, 50);
  moonLight.castShadow = true;
  moonLight.userData = { type: 'moon_light' };
  scene.add(moonLight);

  // 2. Rim Light (Spotlight - Backlighting for drama)
  const rimLight = new THREE.SpotLight(0x4455ff, 5); // Intense Blue/Purple Rim
  rimLight.position.set(0, 10, -100); // Behind the terrain
  rimLight.target.position.set(0, -40, -50);
  rimLight.angle = Math.PI / 3;
  rimLight.penumbra = 1;
  rimLight.userData = { type: 'rim_light' };
  scene.add(rimLight);
  scene.add(rimLight.target);

  // 3. Ambient Light (Subtle Fill)
  // Darker blueish ambient to contrast with bright highlights
  const ambientLight = new THREE.AmbientLight(0x050510, 0.5);
  scene.add(ambientLight);

  // Fog for depth (Moon atmosphere)
  // Reduced density to see the stars clearly
  scene.fog = new THREE.FogExp2(0x050510, 0.002);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  // Renderer settings
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x050510, 1); // Match fog color match background
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // More cinematic contrast
  renderer.toneMappingExposure = 1.2;

  return { scene, camera, renderer };
}

