import React from 'react';
import { Link } from 'react-router-dom';

export function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.slug}`} className="block">
      <div
        className="group p-8 rounded-3xl bg-rose-pale/30 hover:bg-white hover:shadow-xl transition-all duration-300 hover-lift border border-transparent hover:border-rose-gold/20 fade-in cursor-pointer"
        style={{ animationDelay: service.delay }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-burgundy to-rose-gold flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
          <i data-lucide={service.icon} className="w-8 h-8"></i>
        </div>
        <h3 className="text-xl font-serif font-bold text-burgundy mb-3">{service.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
        <div className="flex items-center text-burgundy font-medium text-sm">
          <span>{service.price}</span>
          <i data-lucide="arrow-right" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </Link>
  );
}

