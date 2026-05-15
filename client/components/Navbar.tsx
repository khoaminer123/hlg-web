
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Mô hình HLG', path: '/model' },
    {
      label: 'Đối tác',
      path: '/center',
      dropdown: {
        title: 'Đối tác',
        items: [
          { label: 'Đời sống HLG', path: '/center/life' },
          { label: 'Siêu thị HLG', path: '/center/supermarket' },
          { label: 'Liên minh liên ngành', path: '/center/alliance' },
          { label: 'Trung tâm dịch vụ khu vực', path: '/center/service' },
          { label: 'Nghiệp vụ khác', path: '/center/other' },
        ]
      }
    },
    {
      label: 'Thông tin',
      path: '/info',
      dropdown: {
        title: 'Thông tin',
        items: [
          { label: 'Thông tin công ty', path: '/info/company' },
          { label: 'Hoạt động HLG', path: '/info/activities' },
          { label: 'Tin tức ngành', path: '/info/industry' },
          { label: 'Thông báo công ty', path: '/info/announcements' },
        ]
      }
    },
    {
      label: 'Tìm hiểu',
      path: '/about',
      dropdown: {
        title: 'Tìm hiểu',
        items: [
          { label: 'Giới thiệu HLG', path: '/about/intro' },
          { label: 'Lịch sử phát triển', path: '/about/history' },
          { label: 'Diện mạo doanh nghiệp', path: '/about/profile' },
          { label: 'Khu vực sự kiện', path: '/about/events' },
          { label: 'Tuyên bố pháp lý', path: '/about/legal' },
        ]
      }
    },
    { label: 'Liên hệ', path: '/contact' },
    {
      label: 'Cổ phần',
      path: '/shareholder'
    }
  ];

  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${isScrolled
            ? 'bg-[#142077] shadow-lg py-2'
            : 'bg-[#142077]/60 backdrop-blur-md py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center group">
                <img
                  src="https://i.postimg.cc/CK5nDccF/xoa-phong-va-202603181733-Photoroom.png"
                  alt="HLG Logo"
                  className="h-10 md:h-12 w-auto "
                  onError={(e) => {
                    e.currentTarget.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HLG";
                    e.currentTarget.style.borderRadius = "8px";
                  }}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div key={item.label} className="relative group px-1">
                  <Link
                    to={item.path}
                    className={`px-3 py-1 text-[12px] font-bold uppercase tracking-wider transition-all duration-300 rounded-lg flex items-center gap-1.5 ${isActive(item.path)
                        ? 'text-white bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <i className="fas fa-chevron-down text-[8px] opacity-50 group-hover:rotate-180 transition-transform"></i>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-[110]">
                      <div className="bg-[#f0f2ff] rounded-2xl p-5 shadow-2xl border border-[#142077]/10 min-w-[240px]">
                        <div className="mb-4 pb-3 border-b border-[#142077]/5">
                          <h4 className="text-sm font-black text-[#142077]/40 uppercase tracking-widest">
                            {item.dropdown.title}
                          </h4>
                        </div>
                        <div className="flex flex-col space-y-1">
                          {item.dropdown.items.map((sub, idx) => (
                            <Link
                              key={idx}
                              to={sub.path}
                              className={`px-3 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-200 ${location.pathname === sub.path
                                  ? 'bg-[#142077] text-white'
                                  : 'text-[#142077]/80 hover:text-[#142077] hover:bg-[#142077]/10'
                                }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions Section (Desktop) */}
            <div className="hidden lg:flex items-center space-x-5">
              <button
                onClick={() => navigate('/search')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10"
              >
                <i className="fas fa-search text-lg"></i>
              </button>

              <div className="h-5 w-[1.5px] bg-white/20"></div>

              {/* Support Button */}
              <div className="relative group flex items-center">
                {/* QR Code Popover */}
                <div className="absolute right-0 top-full mt-4 w-64 bg-[#142077] rounded-3xl p-6 shadow-2xl border-[3px] border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-[120]">
                  <div className="text-center space-y-4">
                    <p className="text-white text-xs font-bold tracking-wider opacity-90 uppercase">Dịch vụ trực tuyến</p>
                    <div className="bg-white p-2 rounded-2xl inline-block mx-auto">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hlg.vn/support&color=142077`}
                        alt="QR Code Support"
                        className="w-32 h-32"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-white text-[11px] font-bold">Thứ 2 - Chủ nhật</p>
                      <p className="text-white text-lg font-black tracking-tight">9:00 - 23:00</p>
                    </div>
                  </div>
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-[#142077] rotate-45 border-l-[3px] border-t-[3px] border-white/5"></div>
                </div>

                <button
                  className={`px-6 h-10 rounded-full font-black text-[12px] uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border leading-none ${isScrolled
                      ? 'bg-white text-[#142077] border-white hover:bg-[#f0f2ff]'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                >
                  <i className="fas fa-headset text-base"></i>
                  HỖ TRỢ
                </button>
              </div>

              
            </div>

            {/* Mobile Actions Section */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => navigate('/search')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-white/80 hover:bg-white/10"
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 flex items-center justify-center transition-colors rounded-xl text-white hover:bg-white/10"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between border-b border-gray-50">
            <img src="https://i.postimg.cc/HnVwwFmX/Screenshot-2026-02-01-222735.png" alt="HLG Logo" className="h-8 w-auto" />
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#142077] hover:bg-[#f0f2ff] rounded-full transition-all">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto px-6 py-8 space-y-6">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-gray-50 pb-4">
                <Link to={item.path} className={`text-lg font-black uppercase tracking-tight transition-colors ${isActive(item.path) ? 'text-[#142077]' : 'text-gray-900 hover:text-[#142077]'}`}>
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="mt-4 pl-4 border-l-2 border-[#142077]/10 flex flex-col space-y-3">
                    {item.dropdown.items.map((sub, idx) => (
                      <Link key={idx} to={sub.path} className="text-gray-500 font-bold text-[15px] hover:text-[#142077] transition-colors">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
