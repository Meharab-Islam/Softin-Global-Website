import { ThreeScene } from './three-scene.js';

// Initialize Three.js scene
let threeScene;
if (document.getElementById('three-canvas')) {
    threeScene = new ThreeScene();
}

// Load JSON data
async function loadData(url) {
    const response = await fetch(url);
    return await response.json();
}

// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load and display services
async function loadServices() {
    const services = await loadData('data/services.json');
    const servicesGrid = document.getElementById('servicesGrid');
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

// Load and display works
async function loadWorks() {
    const works = await loadData('data/works.json');
    const worksGrid = document.getElementById('worksGrid');
    
    works.forEach(work => {
        const workCard = document.createElement('div');
        workCard.className = 'work-card';
        workCard.addEventListener('click', () => {
            window.location.href = `work-detail.html?id=${work.id}`;
        });
        workCard.innerHTML = `
            <img src="${work.image}" alt="${work.title}" class="work-image">
            <div class="work-content">
                <span class="work-category">${work.category}</span>
                <h3>${work.title}</h3>
                <p>${work.description}</p>
                <div class="work-tech">
                    ${work.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <a href="work-detail.html?id=${work.id}" class="work-link">
                    View Details →
                </a>
            </div>
        `;
        worksGrid.appendChild(workCard);
    });
}

// Load and display products
async function loadProducts() {
    const products = await loadData('data/products.json');
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        });
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    Learn More →
                </a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Load and display blogs
async function loadBlogs() {
    const blogs = await loadData('data/blogs.json');
    const blogsGrid = document.getElementById('blogsGrid');
    
    blogs.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.addEventListener('click', () => {
            window.location.href = `blog-detail.html?id=${blog.id}`;
        });
        blogCard.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}" class="blog-image">
            <div class="blog-content">
                <span class="blog-category">${blog.category}</span>
                <h3>${blog.title}</h3>
                <p>${blog.excerpt}</p>
                <div class="blog-meta">
                    <span>By ${blog.author}</span>
                    <span>${new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <a href="blog-detail.html?id=${blog.id}" class="blog-link">
                    Read More →
                </a>
            </div>
        `;
        blogsGrid.appendChild(blogCard);
    });
}

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .work-card, .product-card, .blog-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadServices(),
        loadWorks(),
        loadProducts(),
        loadBlogs()
    ]);
});

