import * as THREE from 'three';

// Create a new modern geometric background design
export function createBackground() {
  const backgroundGroup = new THREE.Group();

  // Layer 1: Central geometric rings/torus
  const rings = [];
  for (let i = 0; i < 5; i++) {
    const radius = 20 + i * 15;
    const tubeRadius = 1.5 + i * 0.5;
    const geometry = new THREE.TorusGeometry(radius, tubeRadius, 16, 100);
    
    const color = new THREE.Color();
    const hue = (i / 5) * 0.3 + 0.6;
    color.setHSL(hue, 0.8, 0.5);
    
    const material = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      emissive: color,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: i % 2 === 0
    });
    
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2;
    ring.position.z = -80 - i * 10;
    ring.position.y = i * 5;
    
    ring.userData = {
      type: 'ring',
      originalPosition: ring.position.clone(),
      originalRotation: ring.rotation.clone(),
      radius: radius,
      index: i
    };
    
    rings.push(ring);
    backgroundGroup.add(ring);
  }

  // Layer 2: Floating geometric boxes
  const boxes = [];
  for (let i = 0; i < 15; i++) {
    const size = 3 + Math.random() * 4;
    const geometry = new THREE.BoxGeometry(size, size, size);
    
    const color = new THREE.Color();
    const hue = Math.random() * 0.3 + 0.5;
    color.setHSL(hue, 0.7, 0.6);
    
    const material = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.3,
      emissive: color,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1
    });
    
    const box = new THREE.Mesh(geometry, material);
    const angle = (i / 15) * Math.PI * 2;
    const radius = 40 + Math.random() * 60;
    box.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 80,
      -60 - Math.random() * 50
    );
    
    box.userData = {
      type: 'box',
      originalPosition: box.position.clone(),
      originalRotation: box.rotation.clone(),
      radius: radius,
      angle: angle,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      index: i
    };
    
    boxes.push(box);
    backgroundGroup.add(box);
  }

  // Layer 3: Particle network with connections
  const particleCount = 80;
  const particles = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 30 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i3 + 2] = -70 - Math.random() * 40;
    
    const color = new THREE.Color();
    const hue = (i / particleCount) * 0.4 + 0.5;
    color.setHSL(hue, 0.8, 0.7);
    particleColors[i3] = color.r;
    particleColors[i3 + 1] = color.g;
    particleColors[i3 + 2] = color.b;
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  const particleSystem = new THREE.Points(particles, particleMaterial);
  particleSystem.userData = {
    type: 'particles',
    originalPositions: new Float32Array(particlePositions),
    count: particleCount
  };
  backgroundGroup.add(particleSystem);

  // Layer 4: Connection lines between particles
  const connectionsGeometry = new THREE.BufferGeometry();
  const maxConnections = 200;
  const connectionPositions = new Float32Array(maxConnections * 6);
  const connectionColors = new Float32Array(maxConnections * 6);
  
  let connectionIndex = 0;
  for (let i = 0; i < particleCount && connectionIndex < maxConnections; i++) {
    const i3 = i * 3;
    const x1 = particlePositions[i3];
    const y1 = particlePositions[i3 + 1];
    const z1 = particlePositions[i3 + 2];
    
    // Connect to nearby particles
    for (let j = i + 1; j < particleCount && connectionIndex < maxConnections; j++) {
      const j3 = j * 3;
      const x2 = particlePositions[j3];
      const y2 = particlePositions[j3 + 1];
      const z2 = particlePositions[j3 + 2];
      
      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
      
      if (dist < 50) {
        const idx = connectionIndex * 6;
        connectionPositions[idx] = x1;
        connectionPositions[idx + 1] = y1;
        connectionPositions[idx + 2] = z1;
        connectionPositions[idx + 3] = x2;
        connectionPositions[idx + 4] = y2;
        connectionPositions[idx + 5] = z2;
        
        const color = new THREE.Color();
        color.setHSL(0.6, 0.7, 0.6);
        connectionColors[idx] = color.r;
        connectionColors[idx + 1] = color.g;
        connectionColors[idx + 2] = color.b;
        connectionColors[idx + 3] = color.r * 0.5;
        connectionColors[idx + 4] = color.g * 0.5;
        connectionColors[idx + 5] = color.b * 0.5;
        
        connectionIndex++;
      }
    }
  }
  
  connectionsGeometry.setAttribute('position', new THREE.BufferAttribute(connectionPositions.slice(0, connectionIndex * 6), 3));
  connectionsGeometry.setAttribute('color', new THREE.BufferAttribute(connectionColors.slice(0, connectionIndex * 6), 3));
  
  const connectionsMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.3,
    linewidth: 1
  });
  
  const connections = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
  connections.userData = {
    type: 'connections',
    originalPositions: new Float32Array(connectionPositions.slice(0, connectionIndex * 6))
  };
  backgroundGroup.add(connections);

  // Layer 5: Large background plane with shader
  const planeGeometry = new THREE.PlaneGeometry(500, 500, 50, 50);
  let planeMaterial;
  
  try {
    planeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0, 0) },
        color1: { value: new THREE.Color(0x4f46e5) },
        color2: { value: new THREE.Color(0x7c3aed) },
        color3: { value: new THREE.Color(0xdb2777) }
      },
      vertexShader: `
        uniform float time;
        uniform vec2 mousePos;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vMouseDist;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          vec3 pos = position;
          
          // Geometric wave pattern
          float wave = sin(pos.x * 0.02 + time) * cos(pos.y * 0.02 + time * 0.7) * 8.0;
          
          // Mouse influence
          vec2 mouseWorld = mousePos * 300.0;
          float mouseDist = distance(pos.xy, mouseWorld);
          vMouseDist = mouseDist;
          
          float mouseWave = sin(mouseDist * 0.1 - time * 3.0) * 5.0 / (1.0 + mouseDist * 0.01);
          
          pos.z += wave + mouseWave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float time;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vMouseDist;
        
        void main() {
          // Geometric gradient
          vec3 color = mix(color1, color2, (vPosition.x + 250.0) / 500.0);
          color = mix(color, color3, (vPosition.y + 250.0) / 500.0);
          
          // Mouse glow
          float mouseGlow = 1.0 / (1.0 + vMouseDist * 0.008);
          color += color2 * mouseGlow * 0.2;
          
          // Grid pattern
          vec2 grid = abs(fract(vUv * 10.0) - 0.5);
          float gridLine = smoothstep(0.0, 0.1, min(grid.x, grid.y));
          color += color1 * gridLine * 0.1;
          
          float opacity = 0.15 + mouseGlow * 0.1;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  } catch (e) {
    planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
  }
  
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.z = -120;
  plane.userData = { type: 'plane', originalZ: -120, material: planeMaterial };
  backgroundGroup.add(plane);

  // Store references
  backgroundGroup.userData.rings = rings;
  backgroundGroup.userData.boxes = boxes;
  backgroundGroup.userData.particles = particleSystem;

  return backgroundGroup;
}
