import React, { useEffect, useState } from 'react';
import ThreeScene from '../threejs/ThreeScene';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import WorksSection from '../components/sections/WorksSection';
import ProductsSection from '../components/sections/ProductsSection';
import BlogsSection from '../components/sections/BlogsSection';
import ContactSection from '../components/sections/ContactSection';
import { loadServices, loadWorks, loadProducts, loadBlogs } from '../utils/dataLoader';
import './Home.css';

export default function Home() {
  const [services, setServices] = useState([]);
  const [works, setWorks] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, worksData, productsData, blogsData] = await Promise.all([
          loadServices(),
          loadWorks(),
          loadProducts(),
          loadBlogs()
        ]);
        setServices(servicesData);
        setWorks(worksData);
        setProducts(productsData);
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <ThreeScene />
      <main className="main-content">
        <HeroSection />
        <ServicesSection services={services} />
        <WorksSection works={works} />
        <ProductsSection products={products} />
        <BlogsSection blogs={blogs} />
        <ContactSection onSubmit={handleContactSubmit} />
      </main>
    </div>
  );
}

