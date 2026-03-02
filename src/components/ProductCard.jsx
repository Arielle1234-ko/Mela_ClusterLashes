import React from 'react';

export function ProductCard({ product }) {
  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 product-card fade-in"
      style={{ animationDelay: product.delay }}
    >
      <div className="relative h-64 overflow-hidden bg-rose-pale/20">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge && (
          <div
            className={`absolute top-4 right-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}
          >
            {product.badge}
          </div>
        )}
        <div className="product-overlay absolute inset-0 bg-burgundy/80 opacity-0 transition-opacity duration-300 flex items-center justify-center">
          <button
            type="button"
            className="px-6 py-3 bg-white text-burgundy rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-burgundy mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-burgundy">{product.price}</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <i
                key={index}
                data-lucide="star"
                className={`w-4 h-4 ${index < product.rating ? 'text-or fill-or' : 'text-or'}`}
              ></i>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

