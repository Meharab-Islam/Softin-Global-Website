import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import ProductDetail from './pages/ProductDetail';
import BlogDetail from './pages/BlogDetail';
import AllWorks from './pages/AllWorks';
import AllProducts from './pages/AllProducts';
import AllBlogs from './pages/AllBlogs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<WorkDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/works" element={<AllWorks />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

