import React, { useEffect, useRef } from 'react';
import { initScene } from './sceneSetup';
import { createBackground } from './background';
import { createLights } from './lights';
import { animateScene } from './animation';
import { setMousePosition } from './scrollEffects';

export default function ThreeScene() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error('Canvas ref is null');
      return;
    }

    try {
      const { scene, camera, renderer } = initScene(canvasRef.current);
      sceneRef.current = { scene, camera, renderer };

      // Clear any existing objects from scene
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      // Add professional background
      const background = createBackground();
      scene.add(background);

      // Add enhanced lighting
      const lights = createLights();
      lights.forEach(light => scene.add(light));

      // Start animation
      const cleanup = animateScene(scene, camera, renderer, background);

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      // Handle mouse move
      const handleMouseMove = (event) => {
        // Normalize mouse position from -1 to 1
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition(x, y);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        cleanup();
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        // Clean up scene
        while (scene.children.length > 0) {
          const child = scene.children[0];
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material.dispose();
            }
          }
          scene.remove(child);
        }
        renderer.dispose();
      };
    } catch (error) {
      console.error('Error initializing Three.js scene:', error);
    }
  }, []);

  return <canvas ref={canvasRef} id="three-canvas" />;
}
