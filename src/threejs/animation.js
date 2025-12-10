import * as THREE from 'three';
import { updateScrollEffects, setMousePosition } from './scrollEffects';

let mouse = { x: 0, y: 0 };
let scrollY = 0;
let animationId = null;
let time = 0;

export function animateScene(scene, camera, renderer, background) {
  const handleMouseMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition(mouse.x, mouse.y);
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
    
    // Enhanced scroll and mouse-based effects
    updateScrollEffects(scene, camera, scrollY, windowHeight, background, time, mouse.x, mouse.y);

    // Smooth camera look at center with mouse influence
    const lookAtX = mouse.x * 0.5;
    const lookAtY = mouse.y * 0.5;
    camera.lookAt(lookAtX, lookAtY, -50);

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
