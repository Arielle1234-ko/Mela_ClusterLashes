import React from 'react';

export function TestimonialCard({ testimonial }) {
  return (
    <div
      className="bg-white p-8 rounded-3xl shadow-lg fade-in"
      style={{ animationDelay: testimonial.delay }}>
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

