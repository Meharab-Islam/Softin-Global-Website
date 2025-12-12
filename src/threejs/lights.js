import * as THREE from 'three';

// Create colorful lighting for dark theme
export function createLights() {
  const lights = [];

  // Dim ambient light (dark theme)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  lights.push(ambientLight);

  // Main directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 10, 5);
  lights.push(directionalLight);

  // Colorful accent lights with animation data
  const light1 = new THREE.PointLight(0xff6b9d, 1.2, 200); // Pink
  light1.position.set(20, 15, 10);
  light1.userData = { type: 'point', originalPos: light1.position.clone(), baseIntensity: 1.2, index: 0 };
  lights.push(light1);

  const light2 = new THREE.PointLight(0x4ecdc4, 1.0, 200); // Teal
  light2.position.set(-20, -15, 10);
  light2.userData = { type: 'point', originalPos: light2.position.clone(), baseIntensity: 1.0, index: 1 };
  lights.push(light2);

  const light3 = new THREE.PointLight(0xffe66d, 0.8, 200); // Yellow
  light3.position.set(0, 0, 15);
  light3.userData = { type: 'point', originalPos: light3.position.clone(), baseIntensity: 0.8, index: 2 };
  lights.push(light3);

  const light4 = new THREE.PointLight(0xa8e6cf, 0.7, 150); // Green
  light4.position.set(15, -10, 8);
  light4.userData = { type: 'point', originalPos: light4.position.clone(), baseIntensity: 0.7, index: 3 };
  lights.push(light4);

  const light5 = new THREE.PointLight(0xff8b94, 0.6, 150); // Coral
  light5.position.set(-15, 10, 8);
  light5.userData = { type: 'point', originalPos: light5.position.clone(), baseIntensity: 0.6, index: 4 };
  lights.push(light5);

  return lights;
}
