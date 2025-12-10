// Professional scroll and mouse-based effects

let sectionProgress = {
  hero: 0,
  services: 0,
  works: 0,
  products: 0,
  blogs: 0,
  contact: 0
};

let mouse = { x: 0, y: 0 };

export function setMousePosition(x, y) {
  mouse.x = x;
  mouse.y = y;
}

export function updateScrollEffects(scene, camera, scrollY, windowHeight, background, time, mouseX, mouseY) {
  const totalHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollProgress = Math.min(scrollY / totalHeight, 1);
  
  // Update section progress
  updateSectionProgress(scrollY, windowHeight);
  
  // Enhanced camera movement with smooth easing and scroll parallax
  const cameraY = scrollProgress * 15;
  const cameraZ = 50 - scrollProgress * 20; // Move closer as we scroll
  camera.position.y += (cameraY - camera.position.y) * 0.08;
  camera.position.z += (cameraZ - camera.position.z) * 0.08;
  camera.rotation.x += (scrollProgress * 0.15 - camera.rotation.x) * 0.08;
  camera.rotation.z += (scrollProgress * 0.05 - camera.rotation.z) * 0.08;
  
  // Strong mouse influence on camera with smooth interpolation
  const targetX = mouseX * 5;
  const targetY = mouseY * 4;
  camera.position.x += (targetX - camera.position.x) * 0.06;
  camera.position.y += (targetY + cameraY - camera.position.y) * 0.06;
  
  // Mouse-based camera rotation for immersive effect
  camera.rotation.y += (mouseX * 0.1 - camera.rotation.y) * 0.05;
  camera.rotation.x += (mouseY * 0.05 - camera.rotation.x) * 0.05;
  
  // Animate new geometric background design
  if (background && background.userData) {
    const { rings, boxes, particles, plane } = background.userData;
    
    // Animate rings
    if (rings) {
      rings.forEach((ring, i) => {
        const { originalPosition, originalRotation, index } = ring.userData;
        
        // Rotation with scroll and mouse
        ring.rotation.y += 0.005 * (1 + scrollProgress * 0.5) + mouseX * 0.01;
        ring.rotation.z += 0.003 * (1 + scrollProgress * 0.3) + mouseY * 0.008;
        
        // Position with scroll parallax
        ring.position.z = originalPosition.z + scrollProgress * 15;
        ring.position.y = originalPosition.y + scrollProgress * 8 + mouseY * 2;
        ring.position.x = mouseX * 3;
        
        // Scale with mouse proximity
        const mouseDist = Math.sqrt(mouseX ** 2 + mouseY ** 2);
        const scale = 1 + Math.sin(time + index) * 0.1 + (1 - mouseDist) * 0.15;
        ring.scale.set(scale, scale, scale);
        
        // Opacity and intensity
        if (ring.material) {
          ring.material.opacity = 0.3 + Math.sin(time * 0.5 + index) * 0.15 + scrollProgress * 0.1;
          ring.material.emissiveIntensity = 0.4 + Math.sin(time + index) * 0.2;
        }
      });
    }
    
    // Animate boxes
    if (boxes) {
      boxes.forEach((box, i) => {
        const { originalPosition, originalRotation, angle, radius, rotationSpeed, index } = box.userData;
        
        // Orbital motion
        box.userData.angle += rotationSpeed * (1 + scrollProgress * 0.3);
        const x = Math.cos(box.userData.angle) * radius;
        const z = Math.sin(box.userData.angle) * radius;
        
        // Mouse attraction
        const mouseDist = Math.sqrt((x - mouseX * 40) ** 2 + (box.position.y - mouseY * 30) ** 2);
        const mousePull = 1 / (1 + mouseDist * 0.02);
        
        box.position.x = x + mouseX * 2 + (mouseX * 40 - x) * mousePull * 0.2;
        box.position.y = originalPosition.y + Math.sin(time * 0.5 + index) * 5 + scrollProgress * 10 + mouseY * 2;
        box.position.z = z + scrollProgress * 20;
        
        // Rotation
        box.rotation.x += rotationSpeed * 2;
        box.rotation.y += rotationSpeed * 1.5;
        box.rotation.z += rotationSpeed * 0.5;
        
        // Scale with mouse
        const scale = 1 + Math.sin(time * 2 + index) * 0.2 + mousePull * 0.3;
        box.scale.set(scale, scale, scale);
        
        // Material effects
        if (box.material) {
          box.material.opacity = 0.25 + Math.sin(time + index) * 0.15 + mousePull * 0.1;
          box.material.emissiveIntensity = 0.3 + Math.sin(time * 1.5 + index) * 0.2 + mousePull * 0.2;
        }
      });
    }
    
    // Animate particles
    if (particles && particles.geometry) {
      const positions = particles.geometry.attributes.position;
      const originalPositions = particles.userData.originalPositions;
      
      for (let i = 0; i < particles.userData.count; i++) {
        const i3 = i * 3;
        const x = originalPositions[i3];
        const y = originalPositions[i3 + 1];
        const z = originalPositions[i3 + 2];
        
        // Float animation
        const floatY = Math.sin(time * 0.3 + i * 0.1) * 3;
        const floatX = Math.cos(time * 0.2 + i * 0.15) * 2;
        
        // Mouse influence
        const mouseDist = Math.sqrt((x - mouseX * 80) ** 2 + (y - mouseY * 60) ** 2);
        const mousePull = 1 / (1 + mouseDist * 0.01);
        const mouseOffsetX = (mouseX * 80 - x) * mousePull * 0.3;
        const mouseOffsetY = (mouseY * 60 - y) * mousePull * 0.3;
        
        positions.setX(i, x + floatX + mouseOffsetX);
        positions.setY(i, y + floatY + mouseOffsetY + scrollProgress * 5);
        positions.setZ(i, z + scrollProgress * 10);
      }
      positions.needsUpdate = true;
      
      // Particle size with mouse
      const mouseDist = Math.sqrt(mouseX ** 2 + mouseY ** 2);
      particles.material.size = 2 + (1 - mouseDist) * 1.5;
    }
    
    // Animate background plane
    if (plane && plane.userData) {
      const { originalZ, material } = plane.userData;
      
      // Update shader uniforms
      if (material && material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.mousePos.value.set(mouseX * 1.5, mouseY * 1.5);
      }
      
      // Position and rotation
      plane.position.z = originalZ + scrollProgress * 20;
      plane.rotation.z = scrollProgress * 0.3 + mouseX * 0.1;
      plane.rotation.x = -Math.PI / 2 + scrollProgress * 0.05;
    }
  }
  
  // Animate connection lines
  if (background && background.children) {
    background.children.forEach((child) => {
      if (child.userData && child.userData.type === 'connections') {
        // Fade connections based on scroll
        if (child.material) {
          child.material.opacity = 0.2 + Math.sin(scrollProgress * Math.PI) * 0.15;
        }
      }
    });
  }
  
  // Animate lights based on scroll and mouse
  if (scene && scene.children) {
    scene.children.forEach((child) => {
      if (child.userData && child.userData.type === 'point' && child.userData.originalPos) {
        const light = child;
        const originalPos = light.userData.originalPos;
        const index = light.userData.index || 0;
        
        // Animate light position with scroll and mouse
        const scrollOffset = scrollProgress * 10;
        const mouseOffsetX = mouseX * 8;
        const mouseOffsetY = mouseY * 6;
        const timeOffset = Math.sin(time * 0.5 + index) * 3;
        
        light.position.x = originalPos.x + scrollOffset * 0.5 + mouseOffsetX + timeOffset;
        light.position.y = originalPos.y + scrollProgress * 8 + mouseOffsetY + Math.cos(time * 0.6 + index) * 3;
        light.position.z = originalPos.z + scrollProgress * 5;
        
        // Animate light intensity
        const baseIntensity = light.userData.baseIntensity || 1.0;
        const scrollIntensity = 1 + Math.sin(scrollProgress * Math.PI) * 0.3;
        const mouseIntensity = 1 + (1 - Math.min(Math.abs(mouseX) + Math.abs(mouseY), 1)) * 0.2;
        light.intensity = baseIntensity * scrollIntensity * mouseIntensity;
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
