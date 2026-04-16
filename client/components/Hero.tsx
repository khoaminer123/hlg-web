import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: "https://i.ibb.co/LX25rbn0/HLG6.jpg",
  },
  {
    image: "https://i.ibb.co/mFF99j2P/HLG-Page8.jpg",
  },
  {
    image: "https://i.ibb.co/CpLgQg0K/image-2026-03-16-151724226.png",
  }
  
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-zinc-900 group pt-[88px]">
      
      {/* Slider Container */}
      <div
        className="flex h-[300px] md:h-[420px] lg:h-[750px] w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full h-full overflow-hidden">
            
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className=" w-full"
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all z-20 backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <i className="fas fa-chevron-left text-3xl"></i>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all z-20 backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <i className="fas fa-chevron-right text-3xl"></i>
      </button>

      {/* Scroll Down Indicator (desktop only) */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex-col items-center">
        <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
          Khám phá tiếp
        </span>
        <div className="relative w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-1.5 bg-white/60 rounded-full animate-scroll-dot"></div>
        </div>
      </div>

      {/* Bottom Dots Navigation */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-3 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? 'w-8 h-1 md:w-12 md:h-1.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                  : 'w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40 hover:bg-white/60'
              }`}
            ></button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-scroll-dot {
          animation: scroll-dot 1.5s infinite;
        }
      `}</style>

    </div>
  );
};

export default Hero;