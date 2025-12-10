import * as THREE from 'three';

export function createLights() {
  const lights = [];

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  lights.push(ambientLight);

  // Point lights
  const light1 = new THREE.PointLight(0x6366f1, 1, 100);
  light1.position.set(5, 5, 5);
  lights.push(light1);

  const light2 = new THREE.PointLight(0x8b5cf6, 1, 100);
  light2.position.set(-5, -5, 5);
  lights.push(light2);

  const light3 = new THREE.PointLight(0xec4899, 1, 100);
  light3.position.set(0, 0, 10);
  lights.push(light3);

  return lights;
}

