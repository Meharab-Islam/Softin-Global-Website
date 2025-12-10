export async function loadData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }
  return await response.json();
}

export async function loadServices() {
  return await loadData('/data/services.json');
}

export async function loadWorks() {
  return await loadData('/data/works.json');
}

export async function loadProducts() {
  return await loadData('/data/products.json');
}

export async function loadBlogs() {
  return await loadData('/data/blogs.json');
}

export async function getWorkById(id) {
  const works = await loadWorks();
  return works.find(w => w.id === parseInt(id));
}

export async function getProductById(id) {
  const products = await loadProducts();
  return products.find(p => p.id === parseInt(id));
}

export async function getBlogById(id) {
  const blogs = await loadBlogs();
  return blogs.find(b => b.id === parseInt(id));
}

