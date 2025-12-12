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

      // 1. Terrain Flyover
      if (type === 'moon_terrain') {
        // Move terrain towards camera AND Breathe (Hover)
        // Adding a continuous sine wave to Y makes it feel like we are hovering/bobbing
        child.position.y = -40 + scrollProgress * 10 + Math.sin(time * 0.5) * 2;

        // Tilt shift
        child.rotation.x = -Math.PI / 2 + 0.2 + mouse.y * 0.05 + Math.cos(time * 0.3) * 0.02;
        child.rotation.z = mouse.x * 0.05;
      }

      // 2. Smoke Drift
      if (type === 'smoke_system') {
        const positions = child.geometry.attributes.position;

        // Continuous slow rotation
        child.rotation.y = time * 0.05;
        // Sway side to side
        child.position.x = Math.sin(time * 0.1) * 10;

        // Pulse scale (Breathing atmosphere)
        const scale = 1 + Math.sin(time * 0.5) * 0.05;
        child.scale.set(scale, scale, scale);
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

        // Active light movement
        const offsetX = Math.sin(time * 0.5 + index) * 8;
        const offsetY = Math.cos(time * 0.4 + index) * 5;

        light.position.x = originalPos.x + offsetX;
        light.position.y = originalPos.y + offsetY + scrollProgress * 10;

        // Stronger pulsing
        const baseIntensity = light.userData.baseIntensity || 0.8;
        light.intensity = baseIntensity + Math.sin(time * 1.0 + index) * 0.3;
      }

      // Animate Moonlight (Shifting Shadows)
      if (child.userData && child.userData.type === 'moon_light') {
        // Slow orbit to change shadow angles on the craters
        child.position.x = Math.sin(time * 0.2) * 60;
        child.position.z = Math.cos(time * 0.2) * 60;
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
