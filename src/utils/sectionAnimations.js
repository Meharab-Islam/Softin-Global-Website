// Section-specific animation utilities

export function initSectionAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const sectionId = section.id || section.className.split(' ')[0];
        
        // Add section-specific animation class
        section.classList.add('section-visible');
        
        // Apply different animations based on section
        applySectionAnimation(section, sectionId);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

function applySectionAnimation(section, sectionId) {
  // Remove any existing animation classes
  section.classList.remove('hero-animate', 'services-animate', 'works-animate', 
                          'products-animate', 'blogs-animate', 'contact-animate');

  switch(sectionId) {
    case 'home':
    case 'hero-section':
      section.classList.add('hero-animate');
      animateHeroSection(section);
      break;
    case 'services':
    case 'services-section':
      section.classList.add('services-animate');
      animateServicesSection(section);
      break;
    case 'works':
    case 'works-section':
      section.classList.add('works-animate');
      animateWorksSection(section);
      break;
    case 'products':
    case 'products-section':
      section.classList.add('products-animate');
      animateProductsSection(section);
      break;
    case 'blogs':
    case 'blogs-section':
      section.classList.add('blogs-animate');
      animateBlogsSection(section);
      break;
    case 'contact':
    case 'contact-section':
      section.classList.add('contact-animate');
      animateContactSection(section);
      break;
  }
}

function animateHeroSection(section) {
  const titleLines = section.querySelectorAll('.title-line');
  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.animation = 'slideInLeft 1s ease forwards';
    }, index * 200);
  });
}

function animateServicesSection(section) {
  const cards = section.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotateX(20deg)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) rotateX(0deg)';
    }, index * 150);
  });
}

function animateWorksSection(section) {
  const cards = section.querySelectorAll('.work-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8) translateX(-100px)';
    setTimeout(() => {
      card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'scale(1) translateX(0)';
    }, index * 200);
  });
}

function animateProductsSection(section) {
  const cards = section.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8) translateX(100px) rotateY(-20deg)';
    setTimeout(() => {
      card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'scale(1) translateX(0) rotateY(0deg)';
    }, index * 200);
  });
}

function animateBlogsSection(section) {
  const cards = section.querySelectorAll('.blog-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(100px) rotateZ(5deg)';
    setTimeout(() => {
      card.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) rotateZ(0deg)';
    }, index * 150);
  });
}

function animateContactSection(section) {
  const items = section.querySelectorAll('.contact-item, .contact-form input, .contact-form textarea');
  items.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    setTimeout(() => {
      item.style.transition = 'all 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, index * 100);
  });
}

