import * as THREE from 'three';

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
  window.addEventListener('scroll', handleScroll);

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.01;

    // Update camera based on scroll and mouse
    camera.position.y = scrollY * 0.001 + mouse.y * 0.5;
    camera.rotation.x = scrollY * 0.0001 + mouse.y * 0.05;
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05;
    camera.lookAt(scene.position);

    // Animate particles with wave effect
    if (particles && particles.geometry) {
      const positions = particles.geometry.attributes.position.array;
      const velocities = particles.userData.velocities;
      const originalPositions = particles.userData.originalPositions;

      for (let i = 0; i < positions.length; i += 3) {
        const index = i / 3;
        const waveX = Math.sin(time * 0.5 + index * 0.1) * 0.5;
        const waveY = Math.cos(time * 0.7 + index * 0.15) * 0.5;
        const waveZ = Math.sin(time * 0.6 + index * 0.12) * 0.5;

        positions[i] = originalPositions[i] + waveX + mouse.x * 2;
        positions[i + 1] = originalPositions[i + 1] + waveY + mouse.y * 2;
        positions[i + 2] = originalPositions[i + 2] + waveZ;

        // Update velocities for smooth motion
        velocities[i] += (Math.random() - 0.5) * 0.001;
        velocities[i + 1] += (Math.random() - 0.5) * 0.001;
        velocities[i + 2] += (Math.random() - 0.5) * 0.001;

        // Damping
        velocities[i] *= 0.99;
        velocities[i + 1] *= 0.99;
        velocities[i + 2] *= 0.99;
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

        shape.position.x = x + mouse.x * 1.5;
        shape.position.y = shape.userData.originalPosition[1] + floatY + mouse.y * 1.5;
        shape.position.z = z + scrollY * 0.01 - 10;

        // Pulsing scale
        const scale = 1 + Math.sin(time * 2 + shape.userData.index) * 0.1;
        shape.scale.set(scale, scale, scale);
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
