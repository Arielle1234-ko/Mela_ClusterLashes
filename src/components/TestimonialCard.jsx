import React from 'react';

export function TestimonialCard({ testimonial }) {
  return (
    <div
      className="bg-white p-8 rounded-3xl shadow-lg fade-in"
      style={{ animationDelay: testimonial.delay }}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <i key={index} data-lucide="star" className="w-5 h-5 text-or fill-or"></i>
        ))}
      </div>
      <p className="text-gray-600 mb-6 italic">&quot;{testimonial.text}&quot;</p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt="Client"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-burgundy">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

