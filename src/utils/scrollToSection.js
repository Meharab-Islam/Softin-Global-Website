export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

export function handleHashLink(e, sectionId) {
  e.preventDefault();
  if (window.location.pathname !== '/') {
    window.location.href = `/#${sectionId}`;
  } else {
    scrollToSection(sectionId);
  }
}

