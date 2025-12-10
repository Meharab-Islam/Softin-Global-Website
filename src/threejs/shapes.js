import * as THREE from 'three';

export function createShapes() {
  const shapes = [];
  
  // Create a wave of geometric shapes
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 8 + Math.random() * 4;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 6;

    const shapeTypes = ['box', 'sphere', 'torus', 'octahedron', 'tetrahedron', 'cone', 'cylinder'];
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    
    let geometry;
    const size = 0.5 + Math.random() * 0.5;
    
    switch(shapeType) {
      case 'box':
        geometry = new THREE.BoxGeometry(size, size, size);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(size * 0.7, 32, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(size * 0.5, size * 0.25, 16, 100);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(size * 0.7);
        break;
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(size * 0.7);
        break;
      case 'cone':
        geometry = new THREE.ConeGeometry(size * 0.7, size * 1.2, 32);
        break;
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(size * 0.5, size * 0.5, size * 1.2, 32);
        break;
      default:
        geometry = new THREE.BoxGeometry(size, size, size);
    }

    const hue = (i / 8) * 0.3 + 0.5;
    const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
    
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4,
      emissive: color,
      emissiveIntensity: 0.3,
      wireframe: Math.random() > 0.7
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z - 10);
    mesh.userData = {
      originalPosition: [x, y, z - 10],
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03
      },
      floatSpeed: Math.random() * 0.015 + 0.008,
      floatAmount: Math.random() * 0.8 + 0.4,
      index: i,
      orbitRadius: radius,
      orbitAngle: angle,
      orbitSpeed: (Math.random() - 0.5) * 0.01
    };
    
    shapes.push(mesh);
  }

  return shapes;
}

export function createWavePlane() {
  const geometry = new THREE.PlaneGeometry(50, 50, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.1,
    wireframe: true,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -15;
  plane.position.z = -20;
  
  return plane;
}
