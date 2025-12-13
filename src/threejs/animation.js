import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { updateScrollEffects, setMousePosition } from './scrollEffects';

let scrollY = 0;
let animationId = null;
let time = 0;
let composer = null;

export function animateScene(scene, camera, renderer, background) {
  // Initialize Bloom
  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.1, // strength (Very subtle bloom for softness)
    0.1, // radius
    0.95 // threshold 
  );

  composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  const handleScroll = () => {
    scrollY = window.scrollY;
  };

  const handleMouseMove = (event) => {
    // Normalize mouse position from -1 to 1
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition(x, y);
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    composer.setSize(width, height);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.015;

    const windowHeight = window.innerHeight;

    // Scroll-based effects
    updateScrollEffects(scene, camera, scrollY, windowHeight, background, time);

    // Camera looks at center
    camera.lookAt(0, 0, -50);

    // Use composer instead of renderer
    composer.render();
  }

  animate();

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    if (composer) {
      composer.dispose();
    }
  };
}
