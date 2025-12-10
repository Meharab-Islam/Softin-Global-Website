import * as THREE from 'three';
import { updateScrollEffects } from './scrollEffects';

let mouse = { x: 0, y: 0 };
let scrollY = 0;
let animationId = null;
let time = 0;

export function animateScene(scene, camera, renderer, particles, shapes, connections, wavePlane) {
  const handleMouseMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  const handleScroll = () => {
    scrollY = window.scrollY;
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll, { passive: true });

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.015;

    const windowHeight = window.innerHeight;
    
    // Enhanced scroll-based effects
    updateScrollEffects(scene, camera, particles, shapes, wavePlane, scrollY, windowHeight);

    // Update camera based on mouse (smooth follow)
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05;
    camera.lookAt(scene.position);

    // Animate particles with wave effect (adds to scroll effects)
    if (particles && particles.geometry) {
      const positions = particles.geometry.attributes.position.array;
      const originalPositions = particles.userData.originalPositions;

      for (let i = 0; i < positions.length; i += 3) {
        const index = i / 3;
        // Add time-based wave on top of scroll effects
        const waveX = Math.sin(time * 0.5 + index * 0.1) * 0.3;
        const waveY = Math.cos(time * 0.7 + index * 0.15) * 0.3;
        
        // Mouse interaction
        positions[i] += mouse.x * 1.5;
        positions[i + 1] += mouse.y * 1.5;
        positions[i] += waveX;
        positions[i + 1] += waveY;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    // Update connections
    if (connections && connections.geometry) {
      connections.geometry.attributes.position.needsUpdate = true;
    }

    // Animate shapes with orbital motion
    shapes.forEach((shape) => {
      if (shape.userData) {
        // Rotation
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Orbital motion
        shape.userData.orbitAngle += shape.userData.orbitSpeed;
        const x = Math.cos(shape.userData.orbitAngle) * shape.userData.orbitRadius;
        const z = Math.sin(shape.userData.orbitAngle) * shape.userData.orbitRadius;

        // Float animation
        const floatY = Math.sin(time * shape.userData.floatSpeed + shape.userData.index) * 
                      shape.userData.floatAmount;

        // Base orbital position
        shape.position.x = x + mouse.x * 1.5;
        shape.position.y = shape.userData.originalPosition[1] + floatY + mouse.y * 1.5;
        // Z is handled by scroll effects, preserve scroll offset
        if (shape.userData.scrollZ !== undefined) {
          shape.position.z = z + shape.userData.scrollZ;
        } else {
          shape.position.z = z - 10;
        }

        // Combined scale: time-based pulse + scroll-based scale
        const timeScale = 1 + Math.sin(time * 2 + shape.userData.index) * 0.05;
        const scrollScale = shape.userData.scrollScale || 1;
        const finalScale = timeScale * scrollScale;
        shape.scale.set(finalScale, finalScale, finalScale);
      }
    });

    // Animate wave plane
    if (wavePlane && wavePlane.geometry) {
      const positions = wavePlane.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin((x + time * 2) * 0.3) * Math.cos((y + time * 1.5) * 0.3) * 2;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
      wavePlane.rotation.z += 0.001;
    }

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
  };
}
