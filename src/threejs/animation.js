import * as THREE from 'three';

let mouse = { x: 0, y: 0 };
let scrollY = 0;
let animationId = null;

export function animateScene(scene, camera, renderer, particles, shapes) {
  // Mouse movement handler
  const handleMouseMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  // Scroll handler
  const handleScroll = () => {
    scrollY = window.scrollY;
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll);

  function animate() {
    animationId = requestAnimationFrame(animate);

    // Update camera based on scroll
    camera.position.y = scrollY * 0.001;
    camera.rotation.x = scrollY * 0.0001;
    
    // Update camera based on mouse
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animate particles
    if (particles && particles.geometry) {
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.0001;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate shapes
    shapes.forEach((shape) => {
      if (shape.userData) {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        const time = Date.now() * 0.001;
        shape.position.y = shape.userData.originalPosition[1] + 
          Math.sin(time * shape.userData.floatSpeed + shape.userData.index) * 
          shape.userData.floatAmount;
        
        shape.position.z = shape.userData.originalPosition[2] + scrollY * 0.01;
      }
    });

    renderer.render(scene, camera);
  }

  animate();

  // Cleanup function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
  };
}

