// Enhanced scroll-based effects for Three.js scene

let sectionProgress = {
  hero: 0,
  services: 0,
  works: 0,
  products: 0,
  blogs: 0,
  contact: 0
};

export function updateScrollEffects(scene, camera, particles, shapes, wavePlane, scrollY, windowHeight) {
  const totalHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollProgress = scrollY / totalHeight;
  
  // Update section progress
  updateSectionProgress(scrollY, windowHeight);
  
  // Enhanced camera movement based on scroll
  const cameraY = scrollProgress * 10;
  const cameraRotation = scrollProgress * 0.5;
  camera.position.y = cameraY;
  camera.rotation.x = cameraRotation * 0.1;
  
  // Particle effects based on scroll (adds to base positions)
  if (particles && particles.geometry) {
    const positions = particles.geometry.attributes.position.array;
    const originalPositions = particles.userData.originalPositions;
    
    if (originalPositions) {
      for (let i = 0; i < positions.length; i += 3) {
        const index = i / 3;
        const scrollWave = Math.sin(scrollProgress * Math.PI * 2 + index * 0.1) * 2;
        
        // Add scroll-based offset to current position
        const baseX = originalPositions[i] || positions[i];
        const baseY = originalPositions[i + 1] || positions[i + 1];
        const baseZ = originalPositions[i + 2] || positions[i + 2];
        
        positions[i] = baseX + scrollWave * (1 + scrollProgress * 0.5);
        positions[i + 1] = baseY + scrollWave * 0.3;
        positions[i + 2] = baseZ + scrollProgress * 3;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }
  }
  
  // Shape effects based on scroll
  shapes.forEach((shape, index) => {
    if (shape.userData) {
      const sectionScroll = getSectionScrollProgress(index, scrollY, windowHeight);
      
      // Store original scale if not set
      if (!shape.userData.baseScale) {
        shape.userData.baseScale = 1;
      }
      
      // Scale based on scroll position
      const scrollScale = 1 + Math.sin(sectionScroll * Math.PI) * 0.2;
      shape.userData.scrollScale = scrollScale;
      
      // Color intensity based on scroll
      if (shape.material) {
        const intensity = 0.3 + Math.sin(sectionScroll * Math.PI) * 0.15;
        shape.material.emissiveIntensity = intensity;
        shape.material.opacity = 0.3 + Math.sin(sectionScroll * Math.PI) * 0.15;
      }
      
      // Z position based on scroll (preserves orbital z)
      const baseZ = shape.userData.originalPosition[2] || -10;
      shape.userData.scrollZ = scrollProgress * 8;
    }
  });
  
  // Wave plane effects
  if (wavePlane && wavePlane.geometry) {
    const positions = wavePlane.geometry.attributes.position;
    const waveIntensity = 2 + scrollProgress * 3;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = Math.sin((x + scrollProgress * 10) * 0.3) * 
                Math.cos((y + scrollProgress * 8) * 0.3) * waveIntensity;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
    
    // Rotate wave plane based on scroll
    wavePlane.rotation.z = scrollProgress * Math.PI;
  }
}

function updateSectionProgress(scrollY, windowHeight) {
  const sections = ['hero', 'services', 'works', 'products', 'blogs', 'contact'];
  
  sections.forEach((sectionName, index) => {
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

function getSectionScrollProgress(shapeIndex, scrollY, windowHeight) {
  const sectionNames = ['hero', 'services', 'works', 'products', 'blogs', 'contact'];
  const sectionName = sectionNames[Math.min(shapeIndex, sectionNames.length - 1)];
  return sectionProgress[sectionName] || 0;
}

export function getSectionProgress() {
  return sectionProgress;
}

