import * as THREE from 'three';

export function createParticles() {
  const particleCount = 1500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 30 + Math.random() * 20;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    const color = new THREE.Color();
    const hue = (i / (particleCount * 3)) * 0.3 + 0.5;
    color.setHSL(hue, 0.9, 0.6 + Math.random() * 0.3);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;

    velocities[i] = (Math.random() - 0.5) * 0.02;
    velocities[i + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i + 2] = (Math.random() - 0.5) * 0.02;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, material);
  particles.userData.velocities = velocities;
  particles.userData.originalPositions = new Float32Array(positions);
  
  return particles;
}

export function createParticleConnections(particles, maxDistance = 4) {
  const connections = [];
  const positions = particles.geometry.attributes.position.array;
  const particleCount = positions.length / 3;
  const maxConnections = 2; // Limit connections per particle for performance
  const step = 5; // Check every 5th particle to reduce computation

  for (let i = 0; i < particleCount; i += step) {
    const idx1 = i * 3;
    const x1 = positions[idx1];
    const y1 = positions[idx1 + 1];
    const z1 = positions[idx1 + 2];
    let connectionCount = 0;

    for (let j = i + step; j < particleCount && connectionCount < maxConnections; j += step) {
      const idx2 = j * 3;
      const x2 = positions[idx2];
      const y2 = positions[idx2 + 1];
      const z2 = positions[idx2 + 2];

      const dx = x2 - x1;
      const dy = y2 - y1;
      const dz = z2 - z1;
      const distanceSq = dx * dx + dy * dy + dz * dz;

      if (distanceSq < maxDistance * maxDistance) {
        connections.push(i, j);
        connectionCount++;
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', particles.geometry.attributes.position);
  if (connections.length > 0) {
    lineGeometry.setIndex(connections);
  }

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });

  return new THREE.LineSegments(lineGeometry, lineMaterial);
}
