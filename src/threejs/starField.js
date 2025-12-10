import * as THREE from 'three';

// Create star field
export function createStarField() {
  const starCount = 3000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount * 3; i += 3) {
    const radius = 100 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    // Star colors (white, blue, yellow - normal stars)
    const starType = Math.random();
    const color = new THREE.Color();
    if (starType < 0.7) {
      color.setRGB(1, 1, 1); // White stars
    } else if (starType < 0.9) {
      color.setRGB(0.8, 0.85, 1); // Light blue stars
    } else {
      color.setRGB(1, 0.95, 0.8); // Warm yellow stars
    }
    
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
    
    sizes[i / 3] = Math.random() * 2 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  let material;
  
  try {
    material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(time * 2.0 + position.x * 0.1) * 0.3);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
  } catch (e) {
    // Fallback to PointsMaterial if shader fails
    material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
  }

  const stars = new THREE.Points(geometry, material);
  stars.userData.isStarField = true;
  stars.userData.originalPositions = new Float32Array(positions);
  
  return stars;
}

