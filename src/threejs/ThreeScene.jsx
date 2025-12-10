import React, { useEffect, useRef } from 'react';
import { initScene } from './sceneSetup';
import { createParticles } from './particles';
import { createShapes } from './shapes';
import { createLights } from './lights';
import { animateScene } from './animation';

export default function ThreeScene() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { scene, camera, renderer } = initScene(canvasRef.current);
    sceneRef.current = { scene, camera, renderer };

    // Create scene elements
    const particles = createParticles();
    scene.add(particles);

    const shapes = createShapes();
    shapes.forEach(shape => scene.add(shape));

    const lights = createLights();
    lights.forEach(light => scene.add(light));

    // Start animation
    const cleanup = animateScene(scene, camera, renderer, particles, shapes);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="three-canvas" />;
}

