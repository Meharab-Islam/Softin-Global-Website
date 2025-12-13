import * as THREE from 'three';

// Professional scroll and mouse-based effects

let sectionProgress = {
  hero: 0,
  services: 0,
  works: 0,
  products: 0,
  blogs: 0,
  contact: 0
};

// Export mouse object so it can be used if needed
export let mouse = { x: 0, y: 0 };

export function setMousePosition(x, y) {
  mouse.x = x;
  mouse.y = y;
}

export function updateScrollEffects(scene, camera, scrollY, windowHeight, background, time) {
  const totalHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollProgress = Math.min(scrollY / totalHeight, 1);

  // Update section progress
  updateSectionProgress(scrollY, windowHeight);

  // Enhanced camera movement with more scroll effects + Mouse Parallax
  const cameraY = scrollProgress * 20;
  const cameraZ = 50 - scrollProgress * 30; // Move closer as we scroll
  const cameraX = Math.sin(scrollProgress * Math.PI * 2) * 5; // Side movement

  // Mouse parallax influence on camera
  const targetCameraX = cameraX + mouse.x * 2;
  const targetCameraY = cameraY + mouse.y * 2;

  camera.position.y += (targetCameraY - camera.position.y) * 0.05;
  camera.position.z += (cameraZ - camera.position.z) * 0.08;
  camera.position.x += (targetCameraX - camera.position.x) * 0.05;

  camera.rotation.x += (scrollProgress * 0.2 + mouse.y * 0.05 - camera.rotation.x) * 0.05;
  camera.rotation.z += (scrollProgress * 0.1 - mouse.x * 0.05 - camera.rotation.z) * 0.05;
  camera.rotation.y += (Math.sin(scrollProgress * Math.PI) * 0.1 - camera.rotation.y + mouse.x * 0.05) * 0.05;

  // Animate Smoke & Moon Land
  if (background && background.children) {
    background.children.forEach((child) => {
      const type = child.userData.type;

      // 1. Terrain Flyover -> Circular Turntable
      if (type === 'moon_terrain') {
        // "Circle Type": Spin the terrain like a massive turntable
        child.rotation.z = time * 0.1; // Slow constant rotation

        // Keep the breathing/hover effect but smoother
        child.position.y = -40 + Math.sin(time * 0.5) * 5;

        // Interactive Mouse Tilt
        // We blend the automatic wobble with user input
        const targetTiltX = mouse.y * 0.1; // Up/Down tilt
        const targetTiltY = mouse.x * 0.1; // Left/Right tilt

        // Add a spiral tilt wobble + Mouse Influence
        child.rotation.x = -Math.PI / 2 + 0.2 + Math.sin(time * 0.5) * 0.05 + targetTiltX;
        child.rotation.y = Math.cos(time * 0.5) * 0.05 + targetTiltY;
      }

      // 2. Starfield (Interactive Sky)
      if (type === 'starfield') {
        // Slow universe rotation
        child.rotation.y = time * 0.05;

        // Interactive Mouse Parallax
        // Stars move slightly opposite to mouse to create depth
        const targetRotX = mouse.y * 0.05;
        const targetRotY = time * 0.05 + mouse.x * 0.05;

        child.rotation.x += (targetRotX - child.rotation.x) * 0.1;
        child.rotation.y += (targetRotY - child.rotation.y) * 0.1;
      }

      // 3. Progressive Path
      if (type === 'scroll_path') {
        const count = child.geometry.attributes.position.count;
        const drawCount = Math.floor(scrollProgress * count);
        child.geometry.setDrawRange(0, drawCount);
        child.rotation.z = time * 0.1;
      }

      // 4. Asteroids - REMOVED

      // 5. Shooting Stars
      if (type === 'shooting_stars_group') {
        child.children.forEach(star => {
          const data = star.userData;

          if (data.active) {
            star.position.add(data.velocity);
            star.lookAt(star.position.clone().add(data.velocity));

            // Reset if out of bounds
            if (star.position.y < -50 || star.position.z > 50) {
              data.active = false;
              data.timer = Math.random() * 200 + 100; // Delay next launch
              star.visible = false;
            }
          } else {
            data.timer--;
            if (data.timer <= 0) {
              // Launch!
              star.position.set(
                (Math.random() - 0.5) * 200,
                40 + Math.random() * 30,
                -100
              );
              data.velocity.set(
                (Math.random() - 0.5) * 3, // X
                -2 - Math.random() * 3,    // Y (Fast down)
                2 + Math.random() * 3      // Z (Fast forward)
              );
              data.active = true;
              star.visible = true;
            }
          }
        });
      }
    });
  }

  // Animate colorful lights (Active Atmosphere)
  if (scene && scene.children) {
    scene.children.forEach((child) => {
      if (child.userData && child.userData.type === 'point' && child.userData.originalPos) {
        const light = child;
        const originalPos = light.userData.originalPos;
        const index = light.userData.index || 0;

        // Faster active light movement
        const offsetX = Math.sin(time * 1.5 + index) * 8;
        const offsetY = Math.cos(time * 1.2 + index) * 5;

        light.position.x = originalPos.x + offsetX;
        light.position.y = originalPos.y + offsetY + scrollProgress * 10;

        // Rapid pulsing
        const baseIntensity = light.userData.baseIntensity || 0.8;
        light.intensity = baseIntensity + Math.sin(time * 3.0 + index) * 0.3;
      }

      // Animate Moonlight (Faster Shifting Shadows)
      if (child.userData && child.userData.type === 'moon_light') {
        // Faster orbit
        child.position.x = Math.sin(time * 0.8) * 60;
        child.position.z = Math.cos(time * 0.8) * 60;
      }
    });
  }
}

function updateSectionProgress(scrollY, windowHeight) {
  const sections = ['hero', 'services', 'works', 'products', 'blogs', 'contact'];

  sections.forEach((sectionName) => {
    const section = document.getElementById(sectionName) ||
      document.querySelector(`.${sectionName}-section`);

    if (section) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionHeight = rect.height;
      const viewportCenter = scrollY + windowHeight / 2;

      let progress = 0;
      if (viewportCenter >= sectionTop && viewportCenter <= sectionTop + sectionHeight) {
        progress = (viewportCenter - sectionTop) / sectionHeight;
      } else if (viewportCenter < sectionTop) {
        progress = 0;
      } else {
        progress = 1;
      }

      sectionProgress[sectionName] = progress;
    }
  });
}

export function getSectionProgress() {
  return sectionProgress;
}
