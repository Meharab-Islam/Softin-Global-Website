import * as THREE from 'three';

export function initScene(canvas) {
  const scene = new THREE.Scene();
  
  // Add subtle fog for depth
  scene.fog = new THREE.FogExp2(0x0f172a, 0.0015);
  
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 50);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // Transparent background

  return { scene, camera, renderer };
}

