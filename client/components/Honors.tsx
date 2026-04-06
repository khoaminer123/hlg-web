
import React, { useState, useEffect, useRef } from 'react';

const Honors: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const honorList = [
    {
      title: "Nền tảng liên minh liên ngành đầu tiên tại Việt Nam",
      description: "Đây là nền tảng tiên phong trong lĩnh vực liên minh liên ngành liên kết tất cả các ngành nghề truyền thống ở mặt đất lên nền tảng mang lại nhiều lợi ích, giá trị cho khách hàng và doanh nghiệp."
    },
    {
      title: "Doanh nghiệp kiểu mẫu về liên minh hệ sinh thái",
      description: "Chúng tôi không ngừng nỗ lực cải tiến nhằm mang lại những giá trị tốt nhất cho khách hàng và khối liên mình các ngành nghề tại Việt Nam."
    },
    {
      title: "Doanh nghiệp kết hợp thương mại điện tử cùng liên minh ngành nghề",
      description: "THLG là đơn vị tiên phong tại Việt Nam trong việc kết nối các ngành nghề trên một nền tảng cùng sự kết hợp giữa thương mại điện tử và liên minh ngành nghề."
    },
    {
      title: "Top Doanh nghiệp Hài lòng Khách hàng",
      description: "Tháng 12 năm 2025, HLG Technology vinh dự lọt vào bảng xếp hạng TOP các doanh nghiệp có chỉ số hài lòng khách hàng cao nhất."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % honorList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [honorList.length]);

  // Xử lý cuộn mượt mà khi index thay đổi
  useEffect(() => {
    if (scrollContainerRef.current) {
      const containerHeight = scrollContainerRef.current.clientHeight;
      const itemHeight = 90; // Chiều cao ước tính trung bình của mỗi mục
      scrollContainerRef.current.scrollTo({
        top: activeIndex * itemHeight,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-[#142077]">HLG</span> <span className="text-gray-900">Vinh dự</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Ba năm qua, trong lĩnh vực tiêu dùng xanh, chúng tôi không ngừng nỗ lực, vượt qua chính mình.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Video/Image Preview */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-full">
            <img 
              src="https://i.ibb.co/QvQb62M7/image-2026-03-26-165123774.png" 
              alt="HLG Honors Video" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: List of Honors - Simple Auto-Scroll */}
          <div className="relative h-[350px] flex flex-col justify-center">
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto no-scrollbar space-y-8 py-4"
            >
              {honorList.map((item, index) => (
                <div 
                  key={index} 
                  className="transition-opacity duration-1000"
                >
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Subtle Gradient Fades for Scrolling Effect */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Honors;
