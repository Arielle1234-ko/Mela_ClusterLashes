import React from 'react';

export function GalleryItem({ item, index }) {
  return (
    <div
      className="gallery-item relative group overflow-hidden rounded-2xl fade-in"
      style={{ animationDelay: item.delay }}
    >
      <img
        src={item.image}
        alt={`Nail Art ${index + 1}`}
        className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div className="text-white">
          <p className="font-serif text-lg">{item.title}</p>
          <p className="text-sm opacity-90">{item.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

