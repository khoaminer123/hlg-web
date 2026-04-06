
import React from 'react';

const Gallery: React.FC = () => {
  // Sample image sets for top and bottom rows
  const topRowImages = [
    "https://i.ibb.co/mFF99j2P/HLG-Page8.jpg",
    "https://i.ibb.co/LDQCKMJg/image-2026-02-02-145559117.png",
    "https://i.ibb.co/s9jVTxCh/image-2026-02-02-145615359.png",
    "https://i.ibb.co/zWGznRFZ/image.png",
    "https://i.ibb.co/ycmLr00p/HLG-Page1.jpg",
    "https://i.ibb.co/Y7bgNThP/HLG-Page9.jpg"
  ];

  const bottomRowImages = [
    "https://i.ibb.co/mFF99j2P/HLG-Page8.jpg",
    "https://i.ibb.co/LDQCKMJg/image-2026-02-02-145559117.png",
    "https://i.ibb.co/s9jVTxCh/image-2026-02-02-145615359.png",
    "https://i.ibb.co/zWGznRFZ/image.png",
    "https://i.ibb.co/ycmLr00p/HLG-Page1.jpg",
    "https://i.ibb.co/Y7bgNThP/HLG-Page9.jpg"
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black">
          Gia nhập <span className="text-gray-900">HLG</span> <span className="text-[#142077]">Cùng kiến tạo cuộc sống đẹp</span>
        </h2>
      </div>

      <div className="space-y-6">
        {/* Top Row - Scrolls Left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap py-2">
            {[...topRowImages, ...topRowImages].map((src, idx) => (
              <div key={idx} className="inline-block mx-3 w-[260px] md:w-[380px] aspect-video rounded-2xl overflow-hidden shadow-sm group">
                <img 
                  src={src} 
                  alt={`HLG Activity ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolls Right */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap py-2">
            {[...bottomRowImages, ...bottomRowImages].map((src, idx) => (
              <div key={idx} className="inline-block mx-3 w-[260px] md:w-[380px] aspect-video rounded-2xl overflow-hidden shadow-sm group">
                <img 
                  src={src} 
                  alt={`HLG Event ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
