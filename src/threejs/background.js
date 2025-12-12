
import * as THREE from 'three';

// Create Smoke & Moon Land Background
export function createBackground() {
  const backgroundGroup = new THREE.Group();

  // 1. Moon Terrain
  // Large plane to cover the view
  const planeGeometry = new THREE.PlaneGeometry(300, 300, 64, 64);
  const count = planeGeometry.attributes.position.count;

  // Apply height noise to create craters/dunes/hills
  for (let i = 0; i < count; i++) {
    const x = planeGeometry.attributes.position.getX(i);
    const y = planeGeometry.attributes.position.getY(i);

    // Enhanced noise for "Hills"
    // Combine multiple frequencies for detail + large shapes
    const largeShape = Math.sin(x * 0.02) * 20 + Math.cos(y * 0.02) * 20; // Big hills
    const detail = Math.sin(x * 0.1) * 2 + Math.cos(y * 0.1) * 2; // Small bumps
    const roughness = Math.random() * 3;

    const height = largeShape + detail + roughness;

    planeGeometry.attributes.position.setZ(i, height);
  }

  planeGeometry.computeVertexNormals();

  // Load Moon Texture & Normal Map
  const textureLoader = new THREE.TextureLoader();

  const moonTexture = textureLoader.load('/textures/moon_surface.png');
  moonTexture.wrapS = THREE.RepeatWrapping;
  moonTexture.wrapT = THREE.RepeatWrapping;
  moonTexture.repeat.set(8, 8); // Increase repeat for larger terrain

  const moonNormal = textureLoader.load('/textures/moon_normal.png');
  moonNormal.wrapS = THREE.RepeatWrapping;
  moonNormal.wrapT = THREE.RepeatWrapping;
  moonNormal.repeat.set(8, 8);

  const planeMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal,
    normalScale: new THREE.Vector2(2, 2), // Stronger bumps for hills
    color: 0x888888,
    roughness: 0.9,
    metalness: 0.1,
    flatShading: false,
    side: THREE.DoubleSide
  });

  const terrain = new THREE.Mesh(planeGeometry, planeMaterial);
  terrain.rotation.x = -Math.PI / 2 + 0.2;
  terrain.position.y = -40; // Lower further down to accommodate huge hills
  terrain.position.z = -50;
  terrain.userData = { type: 'moon_terrain' };
  backgroundGroup.add(terrain);

  // 2. Volumetric Smoke/Fog Particles (Enhanced)
  const smokeCount = 500; // 5x more particles
  const smokeGeo = new THREE.BufferGeometry();
  const smokePos = new Float32Array(smokeCount * 3);
  const smokeSizes = new Float32Array(smokeCount);

  for (let i = 0; i < smokeCount; i++) {
    const i3 = i * 3;
    smokePos[i3] = (Math.random() - 0.5) * 400; // Wider area
    // Layers of smoke: Some low (valley fog), some higher
    const layer = Math.random();
    if (layer > 0.7) {
      smokePos[i3 + 1] = 10 + Math.random() * 20; // High drifting clouds
    } else {
      smokePos[i3 + 1] = -20 + Math.random() * 30; // Ground fog
    }

    smokePos[i3 + 2] = 20 - Math.random() * 150; // Deep Z range
    smokeSizes[i] = 20 + Math.random() * 30; // Very large puffs
  }

  smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3));
  smokeGeo.setAttribute('size', new THREE.BufferAttribute(smokeSizes, 1));

  // Soft Smoke Texture Generator
  const getSmokeTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(200,200,220,0.15)'); // Slightly brighter/blueish tint
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  };

  const smokeMat = new THREE.PointsMaterial({
    size: 25,
    map: getSmokeTexture(),
    transparent: true,
    opacity: 0.6, // Denser
    depthWrite: false,
    blending: THREE.NormalBlending,
    sizeAttenuation: true
  });

  const smokeSystem = new THREE.Points(smokeGeo, smokeMat);
  smokeSystem.userData = { type: 'smoke_system' };
  backgroundGroup.add(smokeSystem);

  return backgroundGroup;
}
