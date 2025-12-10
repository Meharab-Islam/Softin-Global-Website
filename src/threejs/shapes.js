import * as THREE from 'three';

export function createShapes() {
  const shapes = [
    { type: 'box', color: 0x6366f1, position: [3, 2, -5] },
    { type: 'sphere', color: 0x8b5cf6, position: [-3, -2, -8] },
    { type: 'torus', color: 0xec4899, position: [0, 3, -10] },
    { type: 'octahedron', color: 0x6366f1, position: [-4, 1, -6] },
    { type: 'tetrahedron', color: 0x8b5cf6, position: [4, -3, -7] }
  ];

  return shapes.map((shape, index) => {
    let geometry;
    
    switch(shape.type) {
      case 'box':
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(0.8, 32, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(0.6, 0.3, 16, 100);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(0.7);
        break;
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(0.7);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    const material = new THREE.MeshStandardMaterial({
      color: shape.color,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.3,
      emissive: shape.color,
      emissiveIntensity: 0.2
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...shape.position);
    mesh.userData = {
      originalPosition: [...shape.position],
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      floatSpeed: Math.random() * 0.01 + 0.005,
      floatAmount: Math.random() * 0.5 + 0.3,
      index: index
    };
    
    return mesh;
  });
}

