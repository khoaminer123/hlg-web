
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-[88px] bg-white min-h-screen">
      {/* HERO SECTION - SINGLE IMAGE BANNER */}
      <section className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" 
          alt="HLG Contact Banner" 
          className="w-full h-full object-cover"
        />
        {/* Transparent text overlay to match the original design's vibe but using the single image hero */}
        <div className="absolute inset-0 bg-black/10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl space-y-4">
              <p className="text-white font-bold tracking-[0.3em] text-sm md:text-base uppercase opacity-90">Contact Us</p>
              <h1 className="text-4xl md:text-7xl font-black text-white drop-shadow-lg">
                Liên hệ chúng tôi
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION SECTION */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Large decorative background text */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-8xl md:text-[180px] font-black tracking-tighter text-gray-900 uppercase">CONTACT INFORMATION</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-3xl font-black text-gray-800 flex items-center justify-center gap-2">
              Phương thức <span className="text-[#142077]">liên hệ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Hotline Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-100/50 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-colors">
                <i className="fas fa-phone-volume text-[#142077] text-4xl"></i>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-4">Hotline dịch vụ toàn quốc</h3>
              <p className="text-2xl font-black text-[#142077] mb-2">400-889-1722</p>
            </div>

            {/* Business Cooperation Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-100/50 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-colors">
                <i className="fas fa-user-tie text-[#142077] text-4xl"></i>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-10">Hợp tác kinh doanh</h3>
              <button className="bg-gradient-to-r from-[#142077] to-[#117BF4] text-white px-10 py-4 rounded-full font-bold text-sm shadow-lg shadow-indigo-100 hover:scale-105 transition-all flex items-center gap-2">
                Liên hệ ngay <i className="fas fa-arrow-right text-[10px]"></i>
              </button>
            </div>

            {/* Feedback Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-100/50 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-colors">
                <i className="fas fa-comment-dots text-[#142077] text-4xl"></i>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-10">Để lại lời nhắn</h3>
              <button className="bg-gradient-to-r from-[#142077] to-[#117BF4] text-white px-10 py-4 rounded-full font-bold text-sm shadow-lg shadow-indigo-100 hover:scale-105 transition-all flex items-center gap-2">
                Nhắn tin trực tuyến <i className="fas fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY ADDRESS SECTION - UPDATED TO HANOI ADDRESS & MAP */}
      <section className="py-24 relative overflow-hidden bg-gray-50/50">
        {/* Large decorative background text */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-8xl md:text-[180px] font-black tracking-tighter text-gray-900 uppercase">COMPANY ADDRESS</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-xl md:text-3xl font-black text-gray-800 flex items-center justify-center gap-3">
              <i className="fas fa-map-marker-alt text-[#142077]"></i> Địa chỉ <span className="text-[#142077]">công ty</span>
            </h2>
            <div className="space-y-1">
              <p className="text-gray-900 font-extrabold text-xl md:text-2xl">HLG Building</p>
              <p className="text-gray-500 font-bold text-base md:text-lg">208 Đường Vạn Phúc, Hà Đông, Hà Nội</p>
            </div>
          </div>

          <div className="w-full h-[400px] md:h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white relative bg-white">
            {/* Google Maps Iframe for 208 Vạn Phúc, Hà Đông, Hà Nội */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.267389178129!2d105.7741348759556!3d20.98231588938363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acce653f5383%3A0xc399583495d03a95!2zMjA4IFAuIFbhuqFuIFBow7pjLCBW4bqbiBQaMO6YywgSMOgIMSQw7RuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí HLG Building"
            ></iframe>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;
