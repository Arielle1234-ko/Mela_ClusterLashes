import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ServiceDetail from './ServiceDetail.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App section="home" />} />
        <Route path="/services" element={<App section="services" />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/produits" element={<App section="produits" />} />
        <Route path="/galerie" element={<App section="galerie" />} />
        <Route path="/contact" element={<App section="contact" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

