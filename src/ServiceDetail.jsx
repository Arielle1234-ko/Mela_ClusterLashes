import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from './servicesData.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  useEffect(() => {
    const lucide = window?.lucide;
    if (lucide?.createIcons) {
      lucide.createIcons();
    }
  }, []);
  const service = services.find((s) => s.slug === slug);

  const mainImage = service?.images && service.images.length > 0 ? service.images[0] : null;
  const otherImages =
    service?.images && service.images.length > 1 ? service.images.slice(1, 3) : [];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-pale/20 px-6 lg:px-12">
        <div className="max-w-xl text-center bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-3xl font-bold text-burgundy mb-4">Service introuvable</h1>
          <p className="text-gray-600 mb-8">
            Le service que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 bg-burgundy text-white rounded-full font-medium hover:bg-rose-gold transition-all"
          >
            <i data-lucide="arrow-left" className="w-4 h-4" />
            <span>Retour aux services</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-pale/30 pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-burgundy hover:text-rose-gold transition-colors"
          >
            <i data-lucide="arrow-left" className="w-4 h-4" />
            <span>Retour aux services</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-burgundy to-rose-gold flex items-center justify-center text-white mb-6">
                <i data-lucide={service.icon} className="w-10 h-10" />
              </div>
              <p className="inline-flex px-4 py-1 rounded-full bg-rose-pale/60 text-burgundy text-sm font-medium">
                {service.price}
              </p>
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-burgundy mb-4">
                {service.title}
              </h1>
              <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
            </div>
          </div>

          {mainImage && (
            <div className="mb-6">
              <img
                src={mainImage}
                alt={service.title}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          {otherImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {otherImages.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`${service.title} ${index + 2}`}
                  className="w-full h-48 object-cover rounded-2xl shadow-md"
                />
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-burgundy text-white rounded-full font-medium hover:bg-rose-gold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Réserver ce service</span>
              <i data-lucide="calendar" className="w-4 h-4" />
            </Link>
            <a
              href="tel:+225 0505466378"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-burgundy text-burgundy rounded-full font-medium hover:bg-burgundy hover:text-white transition-all"
            >
              <i data-lucide="phone" className="w-4 h-4" />
              <span>Nous appeler</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

