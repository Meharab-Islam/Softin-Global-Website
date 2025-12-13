
import * as THREE from 'three';

// Create Smoke & Moon Land Background
export function createBackground() {
  const backgroundGroup = new THREE.Group();

  // 1. Moon Terrain
  // Large plane to cover the view
  // 1. Moon Terrain - High Resolution
  // 128x128 segments for finer detail
  const planeGeometry = new THREE.PlaneGeometry(300, 300, 128, 128);
  const count = planeGeometry.attributes.position.count;

  // Simple Pseudo-Random Noise Function
  // (We don't have Perlin imported, so we make a simple fractal sum)
  const getNoise = (x, y) => {
    return Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2 +
      Math.sin(x * 0.3 + 10) * Math.cos(y * 0.3 + 10) * 1 +
      Math.sin(x * 0.5 + y * 0.2) * 0.5;
  };

  for (let i = 0; i < count; i++) {
    const x = planeGeometry.attributes.position.getX(i);
    const y = planeGeometry.attributes.position.getY(i);

    // Fractal Noise Generation (Summing Octaves)
    // 1. Major Terrain (Mountains)
    let height = (Math.sin(x * 0.02) * Math.cos(y * 0.02)) * 30;

    // 2. Medium Hills (Rocky overlay)
    height += (Math.sin(x * 0.05 + 5) * Math.cos(y * 0.05 + 5)) * 10;

    // 3. Small Details (Bumps/Rocks) - High frequency
    height += (Math.sin(x * 0.2) * Math.cos(y * 0.2)) * 2;

    // 4. Micro noise for roughness
    height += (Math.random() - 0.5) * 1;

    // "Crater" effect - flattening/dipping random areas?
    // Let's stick to jagged mountains for realism as requested

    // Valley floor check - flatten low areas to look like "seas" (Maria)
    if (height < -10) {
      height = -10 + (height + 10) * 0.2; // Flatten bottom
    }

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
    normalScale: new THREE.Vector2(3, 3), // Stronger normals
    color: 0xaaaaaa, // Lighter base to pick up rim light
    roughness: 0.7, // Slightly smoother for highlights
    metalness: 0.3, // Metallic touch for sci-fi feel
    flatShading: false,
    side: THREE.DoubleSide
  });

  const terrain = new THREE.Mesh(planeGeometry, planeMaterial);
  terrain.rotation.x = -Math.PI / 2 + 0.2;
  terrain.position.y = -40; // Lower further down to accommodate huge hills
  terrain.position.z = -50;
  terrain.userData = { type: 'moon_terrain' };
  backgroundGroup.add(terrain);

  // 2. Starfield (Interactive Sky)
  const starCount = 3000;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const r = 100 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    starPos[i3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i3 + 2] = r * Math.cos(phi);

    starSizes[i] = Math.random() * 1.5;

    const shade = 0.8 + Math.random() * 0.2;
    starColors[i3] = shade;
    starColors[i3 + 1] = shade;
    starColors[i3 + 2] = shade + (Math.random() < 0.3 ? 0.2 : 0);
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true,
    map: getSparkleTexture(),
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });

  const starField = new THREE.Points(starGeo, starMat);
  starField.userData = { type: 'starfield' };
  backgroundGroup.add(starField);

  // 2b. Nebula Clouds (Soft Background)
  const nebulaCount = 15; // Few large particles
  const nebulaGeo = new THREE.BufferGeometry();
  const nebulaPos = new Float32Array(nebulaCount * 3);
  const nebulaColors = new Float32Array(nebulaCount * 3);

  for (let i = 0; i < nebulaCount; i++) {
    const i3 = i * 3;
    // Spread wildly in background
    nebulaPos[i3] = (Math.random() - 0.5) * 300;
    nebulaPos[i3 + 1] = (Math.random() - 0.5) * 200;
    nebulaPos[i3 + 2] = -100 - Math.random() * 100; // Far behind

    // Deep Cosmic Colors (Purple/Blue/Pink)
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.2 + 0.6, 0.8, 0.4); // Blue/Purple Hue
    nebulaColors[i3] = color.r;
    nebulaColors[i3 + 1] = color.g;
    nebulaColors[i3 + 2] = color.b;
  }

  nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
  nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

  const cloudTexture = textureLoader.load('/textures/cloud_texture.png');

  const nebulaMat = new THREE.PointsMaterial({
    size: 100, // Very large
    map: cloudTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.15, // Subtle
    depthWrite: false, // Don't occlude
    blending: THREE.AdditiveBlending
  });

  const nebula = new THREE.Points(nebulaGeo, nebulaMat);
  nebula.userData = { type: 'nebula' };
  backgroundGroup.add(nebula);

  // 2c. Space Dust - REMOVED per user request

  // 3. Progressive Scrolling Path
  // Create a winding curve through the terrain
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-20, 0, 50), // Start close
    new THREE.Vector3(10, 0, 20),
    new THREE.Vector3(-15, 0, -10),
    new THREE.Vector3(20, 0, -40),
    new THREE.Vector3(0, 0, -80), // End far
  ]);

  const pathPoints = curve.getPoints(200); // 200 segments for smoothness
  const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);

  // Snap path to terrain height
  const posAttribute = pathGeo.attributes.position;
  for (let i = 0; i < posAttribute.count; i++) {
    const x = posAttribute.getX(i);
    // Note: In our terrain loop, we used 'y' as the input for noise, which corresponds to Z in 3D space usually, 
    // but the plane was rotated -90 deg X. 
    // Let's trace the terrain transforms:
    // Plane created in XY. Rotated -PI/2 on X -> Y becomes -Z.
    // So terrain(x, y_plane) -> world(x, z_world, -y_plane) roughly.
    // Getting the noise function to match exactly is tricky with manual transforms.
    // Let's just re-use the simple noise function on world X,Z coords to simulate "hugging" the ground,
    // adding a small offset to float slightly above.

    const z = posAttribute.getZ(i);

    // Inverse the rotation logic to estimate the texture space coord
    // Plane Y is World -Z
    const noiseX = x;
    const noiseY = -z;

    // Re-use noise logic
    let height = (Math.sin(noiseX * 0.02) * Math.cos(noiseY * 0.02)) * 30;
    height += (Math.sin(noiseX * 0.05 + 5) * Math.cos(noiseY * 0.05 + 5)) * 10;
    height += (Math.sin(noiseX * 0.2) * Math.cos(noiseY * 0.2)) * 2;
    height += (Math.random() - 0.5) * 1;

    if (height < -10) {
      height = -10 + (height + 10) * 0.2;
    }

    // Apply height to Y (World Up)
    // Terrain is at y = -40 originally. 
    // Wait, the terrain mesh itself is moved to y = -40.
    // The noise `height` was applied to Z in the plane geometry.
    // When rotated -90deg X, Z becomes Y.
    // So World Y = Mesh Position Y + Noise Height.

    posAttribute.setY(i, -38 + height); // -38 to float 2 units above -40
  }

  // Setup for progressive draw
  pathGeo.setDrawRange(0, 0); // Start hidden

  const pathMat = new THREE.LineBasicMaterial({
    color: 0x00ffff, // Cyan Neon
    linewidth: 3, // Note: linewidth only works in WebGL1 usually, will be 1px in most browsers but color makes it pop
    transparent: true,
    opacity: 0.8
  });

  // 4. Floating Asteroids - REMOVED per user request
  // (Code removed to clean up sky)

  // 5. Shooting Stars (Dynamic Lines)
  const shootingStarCount = 20;
  const shootingStarsGroup = new THREE.Group();
  shootingStarsGroup.userData = { type: 'shooting_stars_group' };

  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 10) // Long tail
  ]);
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.8, transparent: true });

  for (let i = 0; i < shootingStarCount; i++) {
    const star = new THREE.Line(lineGeo, lineMat);

    // Initialize far away
    resetShootingStar(star);
    // Stagger start times by placing them far
    star.position.x = 1000;

    shootingStarsGroup.add(star);
  }
  backgroundGroup.add(shootingStarsGroup);

  return backgroundGroup;
}

function resetShootingStar(star) {
  star.position.set(
    (Math.random() - 0.5) * 200, // Random X
    20 + Math.random() * 40,     // High in sky
    -50 - Math.random() * 50     // Behind
  );

  // Random direction (mostly downward/diagonal)
  star.userData = {
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 2,  // Drift X
      -1 - Math.random() * 2,     // Fall Y
      Math.random() * 2           // Toward camera Z
    ).multiplyScalar(2), // Speed
    active: false,
    timer: Math.random() * 200 // Random delay before launch
  };

  star.scale.setScalar(1);
  star.visible = false;
}

// Helper for star texture
function getSparkleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.2, 'rgba(255,255,255,0.8)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}
