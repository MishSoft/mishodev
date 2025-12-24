'use client'
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group w-full aspect-video md:aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      {/* მთავარი სურათი */}
      <img
        src={images[currentIndex]}
        alt="Project screenshot"
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* ნავიგაციის ღილაკები - ჩნდება ჰოვერზე */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-500"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-500"
          >
            <ChevronRight size={20} />
          </button>

          {/* ინდიკატორები (წერტილები) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 transition-all rounded-full ${i === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
