# Softin Global - Company Website

A modern, fully animated React-based multipage website for Softin Global software company featuring Three.js 3D scrolling effects and advanced animations.

## Features

- **React-based**: Built with React 18 and React Router for multipage navigation
- **3D Scrolling Effects**: Interactive Three.js scene with particles and geometric shapes that respond to scroll and mouse movement
- **Fully Animated**: Smooth animations and transitions throughout the site
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dynamic Content**: Content loaded from JSON data files
- **Detail Pages**: Individual pages for works, products, and blogs
- **Modular Architecture**: Code organized into separate files (max 200 lines per file)

## Sections

1. **Hero Section**: Eye-catching introduction with animated title and call-to-action buttons
2. **Services**: App Development, Web Development, Management Software, Business Management Software
3. **Our Works**: Showcase of completed projects with details
4. **Products**: Software products with pricing and features
5. **Blogs**: Latest articles and insights
6. **Contact**: Contact form and information

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
├── public/
│   └── data/
│       ├── services.json
│       ├── works.json
│       ├── products.json
│       └── blogs.json
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── WorksSection.jsx
│   │   │   ├── ProductsSection.jsx
│   │   │   ├── BlogsSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── WorkCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── BlogCard.jsx
│   │   └── *.css (component styles)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── WorkDetail.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── BlogDetail.jsx
│   │   └── *.css (page styles)
│   ├── threejs/
│   │   ├── ThreeScene.jsx
│   │   ├── sceneSetup.js
│   │   ├── particles.js
│   │   ├── shapes.js
│   │   ├── lights.js
│   │   └── animation.js
│   ├── utils/
│   │   └── dataLoader.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 18**: UI library
- **React Router**: Multipage navigation
- **Three.js**: 3D graphics and animations
- **Vite**: Build tool and dev server
- **CSS3**: Modern styling with gradients and animations

## Code Organization

- Each file is kept under 200 lines for maintainability
- Components are separated by functionality
- Three.js code is split into separate modules (scene setup, particles, shapes, lights, animation)
- Page components are separate from reusable components
- Styles are co-located with components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Softin Global. All rights reserved.
# Softin-Global-Website
