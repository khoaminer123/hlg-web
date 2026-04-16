
import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2d2d2d] text-gray-400 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-6">Tìm hiểu HLG</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Giới thiệu HLG</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lịch sử phát triển</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Văn hóa doanh nghiệp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diện mạo doanh nghiệp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hệ thống tài khoản</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Khu vực sự kiện</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-6">Dịch vụ HLG</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Mô hình HLG</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đời sống HLG</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Siêu thị HLG</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên minh doanh nghiệp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trung tâm dịch vụ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dịch vụ khác</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-6">Thông tin tin tức</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tin tức công ty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hoạt động HLG</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tin tức ngành</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Thông báo công ty</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-6">Dịch vụ người dùng</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Cẩm nang thương hiệu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Video quảng bá</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tuyên bố pháp lý</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Khiếu nại tố giác</a></li>
            </ul>
          </div>

          {/* Column 5: Social & Contact */}
          <div className="col-span-2 md:col-span-1 border-l border-zinc-700 pl-0 md:pl-8 space-y-8">
            <div className="space-y-6">
              <h4 className="text-white font-bold text-base mb-4">Theo dõi chúng tôi</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-800 hover:bg-hlg-blue hover:text-white transition-all shadow-sm">
                  <i className="fab fa-weixin text-xl"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-800 hover:bg-hlg-blue hover:text-white transition-all shadow-sm">
                  <i className="fas fa-infinity text-xl"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-800 hover:bg-hlg-blue hover:text-white transition-all shadow-sm">
                  <i className="fab fa-tiktok text-xl"></i>
                </a>
              </div>
            </div>

            <div className="space-y-2 text-[13px] text-gray-500">
              <p>Hotline CSKH: 0984 775 356</p>
              <p>Địa chỉ: 208 Vạn Phúc, Hà Đông, Hà Nội</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-700 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-500">
          <p>Bản quyền thuộc về Công ty Cổ phần Công nghệ HLG Việt Nam | MST: 2500733665</p>
        </div>
      </div>

      {/* Floating Side Action Buttons (Right) */}
      <div className="fixed right-6 bottom-12 z-[100] flex flex-col space-y-4">
        {/* Support Button with QR Popover */}
        <div className="relative group">
          <div className="absolute right-0 bottom-full mb-4 w-64 bg-[#142077] rounded-3xl p-6 shadow-2xl border-[3px] border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="text-center space-y-4">
              <p className="text-white text-xs font-bold tracking-wider opacity-90">DỊCH VỤ TRỰC TUYẾN</p>

              <div className="bg-white p-2 rounded-2xl inline-block mx-auto">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hlg.vn/support"
                  alt="QR Code Support"
                  className="w-32 h-32"
                />
              </div>

              <div className="space-y-1">
                <p className="text-white text-[11px] font-bold">Thứ 2 - Chủ nhật</p>
                <p className="text-white text-lg font-black tracking-tight">9:00 - 23:00</p>
              </div>

              <p className="text-gray-400 text-[10px] leading-tight pt-2 border-t border-white/10">
                Quét mã QR WeChat để kết nối với bộ phận CSKH của chúng tôi
              </p>
            </div>
            {/* Arrow Pointer */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#142077] rotate-45 border-r-[3px] border-b-[3px] border-white/10"></div>
          </div>

          <button className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-[#444] hover:text-white hover:bg-[#142077] transition-all border border-gray-100">
            <i className="fas fa-headset text-2xl"></i>
          </button>
        </div>

        {/* Charity/Philanthropy Button */}
        <button className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-[#444] hover:text-white hover:bg-[#142077] transition-all border border-gray-100 group relative">
          <i className="fas fa-handshake-angle text-2xl"></i>
          <span className="absolute right-16 bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-gray-700">Công ích HLG</span>
        </button>

        {/* Scroll to Top Button - Conditionally visible */}
        <button
          onClick={scrollToTop}
          className={`w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-[#444] hover:text-white hover:bg-[#142077] border border-gray-100 group relative transform transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
            }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-4 h-[2px] bg-current mb-[-2px] hover:bg-white"></div>
            <i className="fas fa-arrow-up text-xl"></i>
          </div>
          <span className="absolute right-16 bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-gray-700">Về đầu trang</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
