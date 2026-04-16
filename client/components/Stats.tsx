
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: '30 Triệu+', label: 'Thành viên đăng ký', icon: 'fa-users' },
    { value: '490.000+', label: 'Đối tác liên kết', icon: 'fa-store-alt' },
    { value: '1.000+', label: 'Trung tâm dịch vụ', icon: 'fa-globe-asia' },
    { value: '1.800+', label: 'Siêu thị hợp tác', icon: 'fa-shopping-basket' },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center px-4 py-8 group transition-all duration-300 ${idx !== stats.length - 1 ? 'lg:border-r border-gray-100' : ''
                }`}
            >
              <div className="mb-6 text-gray-300 group-hover:text-hlg-blue transition-colors duration-500">
                <i className={`fas ${stat.icon} text-5xl font-light opacity-60 group-hover:opacity-100`}></i>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-black text-hlg-blue tracking-tight">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
