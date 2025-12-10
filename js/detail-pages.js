// Common functionality for detail pages

async function loadData(url) {
    const response = await fetch(url);
    return await response.json();
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load work detail
export async function loadWorkDetail() {
    const workId = parseInt(getUrlParameter('id'));
    if (!workId) {
        window.location.href = 'index.html';
        return;
    }

    const works = await loadData('data/works.json');
    const work = works.find(w => w.id === workId);

    if (!work) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${work.title} - Softin Global`;
    
    const detailContent = document.querySelector('.detail-content');
    if (detailContent) {
        detailContent.innerHTML = `
            <div class="detail-header">
                <h1>${work.title}</h1>
                <div class="meta">
                    <span>${work.category}</span> • 
                    <span>${work.client}</span> • 
                    <span>${work.year}</span> • 
                    <span>${work.duration}</span>
                </div>
            </div>
            <img src="${work.image}" alt="${work.title}" class="detail-image">
            <div class="detail-content">
                <p>${work.description}</p>
                <h2>Technologies Used</h2>
                <div class="work-tech" style="margin: 2rem 0;">
                    ${work.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <h2>Results</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 2rem 0;">
                    ${Object.entries(work.results).map(([key, value]) => `
                        <div style="background: var(--dark-surface); padding: 2rem; border-radius: 15px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">${value}</div>
                            <div style="color: var(--text-secondary); text-transform: capitalize;">${key.replace('_', ' ')}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Load product detail
export async function loadProductDetail() {
    const productId = parseInt(getUrlParameter('id'));
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    const products = await loadData('data/products.json');
    const product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${product.name} - Softin Global`;
    
    const detailContent = document.querySelector('.detail-content');
    if (detailContent) {
        detailContent.innerHTML = `
            <div class="detail-header">
                <h1>${product.name}</h1>
                <div class="meta">
                    <span>${product.category}</span> • 
                    <span>${product.price}</span> • 
                    <span>Launched: ${new Date(product.launch_date).toLocaleDateString()}</span>
                </div>
            </div>
            <img src="${product.image}" alt="${product.name}" class="detail-image">
            <div class="detail-content">
                <p>${product.description}</p>
                <div class="product-rating" style="margin: 2rem 0;">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>${product.rating} out of 5 (${product.reviews} reviews)</span>
                </div>
                <h2>Key Features</h2>
                <ul style="list-style: none; margin: 2rem 0;">
                    ${product.features.map(feature => `
                        <li style="padding: 1rem; background: var(--dark-surface); margin-bottom: 1rem; border-radius: 10px; border-left: 4px solid var(--primary-color);">
                            <span style="color: var(--primary-color); margin-right: 1rem;">✓</span>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
                <div style="text-align: center; margin: 3rem 0;">
                    <a href="#contact" class="btn btn-primary" style="text-decoration: none; display: inline-block;">
                        Get Started
                    </a>
                </div>
            </div>
        `;
    }
}

// Load blog detail
export async function loadBlogDetail() {
    const blogId = parseInt(getUrlParameter('id'));
    if (!blogId) {
        window.location.href = 'index.html';
        return;
    }

    const blogs = await loadData('data/blogs.json');
    const blog = blogs.find(b => b.id === blogId);

    if (!blog) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${blog.title} - Softin Global`;
    
    const detailContent = document.querySelector('.detail-content');
    if (detailContent) {
        detailContent.innerHTML = `
            <div class="detail-header">
                <span class="blog-category">${blog.category}</span>
                <h1>${blog.title}</h1>
                <div class="meta">
                    <span>By ${blog.author}</span> • 
                    <span>${new Date(blog.date).toLocaleDateString()}</span>
                </div>
            </div>
            <img src="${blog.image}" alt="${blog.title}" class="detail-image">
            <div class="detail-content">
                <p>${blog.content}</p>
                <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(99, 102, 241, 0.2);">
                    <h3>Tags</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                        ${blog.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

