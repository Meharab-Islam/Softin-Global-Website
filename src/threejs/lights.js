import * as THREE from 'three';

export function createLights() {
  const lights = [];

  // Ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  lights.push(ambientLight);

  // Main directional light with enhanced intensity
  const directionalLight = new THREE.DirectionalLight(0x6366f1, 0.8);
  directionalLight.position.set(10, 10, 5);
  lights.push(directionalLight);

  // Enhanced accent point lights with colors and userData for animation
  const light1 = new THREE.PointLight(0x6366f1, 1.5, 200);
  light1.position.set(15, 15, 15);
  light1.userData = { type: 'point', originalPos: light1.position.clone(), baseIntensity: 1.5, index: 0 };
  lights.push(light1);

  const light2 = new THREE.PointLight(0x8b5cf6, 1.3, 200);
  light2.position.set(-15, -15, 15);
  light2.userData = { type: 'point', originalPos: light2.position.clone(), baseIntensity: 1.3, index: 1 };
  lights.push(light2);

  const light3 = new THREE.PointLight(0xec4899, 1.1, 200);
  light3.position.set(0, 0, 20);
  light3.userData = { type: 'point', originalPos: light3.position.clone(), baseIntensity: 1.1, index: 2 };
  lights.push(light3);

  // Additional accent lights with animation data
  const light4 = new THREE.PointLight(0x6366f1, 0.8, 150);
  light4.position.set(20, -8, 12);
  light4.userData = { type: 'point', originalPos: light4.position.clone(), baseIntensity: 0.8, index: 3 };
  lights.push(light4);

  const light5 = new THREE.PointLight(0x8b5cf6, 0.8, 150);
  light5.position.set(-20, 8, 12);
  light5.userData = { type: 'point', originalPos: light5.position.clone(), baseIntensity: 0.8, index: 4 };
  lights.push(light5);

  const light6 = new THREE.PointLight(0xec4899, 0.7, 150);
  light6.position.set(0, 20, 10);
  light6.userData = { type: 'point', originalPos: light6.position.clone(), baseIntensity: 0.7, index: 5 };
  lights.push(light6);

  return lights;
}
