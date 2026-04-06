
import React, { useState } from 'react';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar Container */}
        <div className="flex justify-center mb-20">
          <div className="relative w-full max-w-3xl">
            <div className="relative flex items-center">
              <div className="absolute left-5 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="Vui lòng nhập nội dung tìm kiếm"
                className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-primary/20 focus:border-pink-primary transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-1.5 px-8 py-2.5 bg-gradient-to-r from-[#142077] to-[#117BF4] text-white rounded-full font-bold text-sm shadow-md hover:scale-105 transition-all">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Empty State Illustration */}
        <div className="flex flex-col items-center justify-center space-y-8 animate-fadeIn">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Background decorative elements (Clouds/Trees simplified) */}
            <div className="absolute top-0 right-0 w-20 h-10 bg-pink-50 rounded-full blur-xl opacity-60"></div>
            <div className="absolute bottom-10 left-0 w-16 h-8 bg-pink-50 rounded-full blur-xl opacity-60"></div>
            
            {/* Main Clipboard Illustration */}
            <div className="relative z-10 w-32 md:w-40 aspect-[4/5] bg-white rounded-xl shadow-2xl border-[6px] border-[#117BF4] flex flex-col items-center p-4">
              <div className="w-12 h-4 bg-[#142077] rounded-t-lg absolute -top-2"></div>
              <div className="w-full space-y-3 mt-4">
                <div className="h-2 w-3/4 bg-pink-50 rounded-full"></div>
                <div className="h-2 w-full bg-pink-50 rounded-full"></div>
                <div className="h-2 w-1/2 bg-pink-50 rounded-full"></div>
                <div className="h-2 w-2/3 bg-pink-50 rounded-full"></div>
              </div>
              {/* Pink Pencil */}
              <div className="absolute -bottom-4 -right-4 w-4 h-20 bg-[#142077] rounded-full rotate-45 border-4 border-white shadow-lg"></div>
            </div>

            {/* Pink Trees */}
            <div className="absolute bottom-4 left-4 w-6 h-10 bg-[#117BF4] rounded-t-full rounded-b-lg opacity-40"></div>
            <div className="absolute bottom-8 right-8 w-5 h-8 bg-[#117BF4] rounded-t-full rounded-b-lg opacity-40"></div>
            
            {/* Base platform */}
            <div className="absolute bottom-0 w-64 h-32 bg-gradient-to-t from-pink-50 to-transparent rounded-[100%] -z-10 opacity-30"></div>
          </div>

          <p className="text-gray-400 font-medium text-lg">Tạm thời không có kết quả</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
