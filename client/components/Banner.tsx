
import React from 'react';

const Banner: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with blur and abstract shapes to mimic the image */}
      <div className="absolute inset-0 bg-[#f8f0ff] -z-10"></div>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 flex justify-around opacity-40 blur-2xl">
        <div className="w-48 h-48 bg-[#117BF4] rounded-2xl transform rotate-12 mt-20"></div>
        <div className="w-48 h-48 bg-blue-200 rounded-2xl transform -rotate-12 mt-10"></div>
        <div className="w-48 h-48 bg-[#117BF4] rounded-2xl transform rotate-45 mt-32"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-10">
          {/* Keywords Section */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <span className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">Thu hút khách</span>
            <div className="h-6 w-[2px] bg-orange-400 hidden md:block"></div>
            <span className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">Trợ giá chính xác</span>
            <div className="h-6 w-[2px] bg-orange-400 hidden md:block"></div>
            <span className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">Trao quyền thực thể</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button className="bg-gradient-to-r from-[#142077] to-[#117BF4] text-white px-10 py-3.5 rounded-full font-bold text-lg shadow-xl shadow-[#117BF4] hover:scale-105 transition-all flex items-center group">
              Xem chi tiết <i className="fas fa-arrow-right ml-3 text-sm group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative blocks inspired by the image */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-4 px-4 overflow-hidden pointer-events-none opacity-50">
        <div className="w-32 h-20 bg-[#142077]/40 rounded-t-xl transform -rotate-3 translate-y-8"></div>
        <div className="w-32 h-24 bg-blue-400/40 rounded-t-xl transform rotate-2 translate-y-12"></div>
        <div className="w-32 h-20 bg-blue-400/40 rounded-t-xl transform -rotate-1 translate-y-10"></div>
        <div className="w-32 h-28 bg-[#142077]/40 rounded-t-xl transform rotate-6 translate-y-14"></div>
      </div>
    </section>
  );
};

export default Banner;
