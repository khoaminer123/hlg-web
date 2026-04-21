
import React, { useState, useRef } from 'react';

const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = ['Thông tin', 'Hoạt động', 'Tin tức'];

  const newsItems = [
    {
      id: 1,
      image: "https://i.ibb.co/hRb7zppk/image-2026-03-26-164535487.png",
      title: "Đời sống HLG",
      // date: "Tết Trung Thu",
      summary: "Tết Trung Thu không chỉ là ngày trăng tròn, mà còn là biểu tượng của đoàn viên, yêu thương và chia sẻ. Với HLG mùa trăng không chỉ là dịp để gắn kết mà còn là cơ hội để thắp sáng tinh thần đồng hành phát triển thịnh vượng cùng nhau. Tại đây chúng tôi không chỉ làm việc cùng nhau mà còn chung tay xây dựng một cộng đồng liên minh ngành nghề bền vững giúp cho mọi người có nền tảng tài chính ổn định và tương lai thịnh vượng.",
      category: 0
    },
    {
      id: 2,
      image: "https://i.ibb.co/Swc6sPDM/z7745240586567-49a9354714ff70e50b31143a8be6635a.jpg",
      title: "HLG 2.0 liên minh liên ngành hợp tác phát triến nâng tầm tương lai ",
      // date: "28 tháng 10 năm 2025",
      summary: "Ngày 28/10/2025, HLG chính thức góp mặt tại hội chợ mùa thu 2025 tại trung tâm triển lãm Việt Nam (VEC) sự kiện thương mại quy mô hàng đầu Việt Nam với hơn 3000 gian hàng quy tụ những thương hiệu tiêu trong nước và quốc tế. Đây là cột mốc đánh dấu hành trình HLG chính thức bước sang giai đoạn 2.0 liên minh liên ngành nơi hàng trăm doanh nghiệp Việt cùng nhau kiến tạo hệ sinh thái tiêu dùng kinh doanh tuần hoàn phát triển bền vững .",
      category: 1
    },
    {
      id: 3,
      image: "https://i.ibb.co/j9HVC9ff/image-2026-03-26-162943919.png",
      title: "HLG vinh dự tham dự hội nghị thượng đỉnh hợp tác hệ sinh thái toàn cầu tại Hà Nội",
      summary: 'Ngày 22/6/2025, CEO của HLG vinh dự tham dự buổi tọa đàm cấp quốc gia về chủ đề mang tính thời sự sâu sắc "Hộ Kinh doanh trước vấn nạn hàng giả và tuân thủ thuế". Đây là sự kiện đặc biệt quy tụ các chuyên gia hàng đầu đại diện các doanh nghiệp lớn các cơ quan ban ngành quản lý nhà nước nhằm tìm ra giải pháp cho hai vấn đề cấp thiết hiện nay.',
      category: 0
    },
    {
      id: 4,
      image: "https://i.ibb.co/cc2zKVgx/z7745240741908-3b060a9b65b5f405da55363692a3ccf7.jpg",
      title: "CEO HLG tham ra buổi tọa đàm quốc gia 'hộ kinh doanh trước vấn nạn hàng giả và tuân thủ thuế'",
      summary: "Sáng ngày 22/6 vừa qua CEO Tuấn Tú người đứng đầu công ty cổ phần công nghệ HLG Việt Nam đã vinh dự tham dự buổi tọa đàm cấp quốc gia về chủ đề mang tính thời sự sâu sắc 'Hộ kinh doanh trước vấn nạn hàng giả và tuân thủ thuế'. Đây là sự kiện đặc biệt quy tụ các chuyên gia hàng đầu đại diện các doanh nghiệp lớn và cơ quan quản lý nhà nước nhằm thảo luận tìm ra giải pháp cho hai vấn đề cấp thiết hiện nay   ",
      category: 1
    },
    {
      id: 5,
      image: "https://i.ibb.co/KjH8WNZw/HLG1.jpg",
      title: "Liên minh khởi hành, chung tay kiến tạo: HLG Tech đồng hành cùng các doanh nghiệp vừa và nhỏ",
      // date: "22 tháng 10 năm 2025",
      summary: "Chuỗi hội thảo hỗ trợ doanh nghiệp SME chuyển đổi số đã được HLG triển khai rộng khắp các tỉnh thành, mang lại giải pháp tối ưu cho hàng vạn cửa hàng truyền thống trong kỷ nguyên kinh tế số.",
      category: 2
    },
    {
      id: 6,
      image: "https://i.ibb.co/x86bdkRk/image-2026-03-26-163434966.png",
      title: "HLG vinh dự tham gia hội nghị thượng đỉnh hợp tác hệ sinh chuỗi cung ứng toàn cầu 2025",
      // date: "09 tháng 09 năm 2025",
      summary: "Vào ngày 09/09/2025 vừa qua, HLG vinh dự được mời tham dự hội nghị thượng đỉnh hợp tác hệ sinh thái chuỗi cung ứng toàn cầu nằm 2025 do Yugeeks tổ chức tại Vin Palace. Đây là sự kiện quy tụ những doanh nghiệp hàng đầu các nhà sáng lập các chuyên gia quốc tế trong lĩnh vực chuỗi cung ứng với mục tiêu thúc đẩy hợp tác chia sẻ kiến thức và khám phá những cơ hội phát triển toàn cầu. Sự hiện diện của HLG khẳng định vị thế tiên phong trong hệ sinh thái kinh doanh mở ra cơ hội hợp tác chiến lược với các đối tác quốc tế. Chúng tôi tự hào khi được đống góp tầm nhìn và giải pháp của mình đồng thời học hỏi những kinh nghiệm quý giá từ các chuyên gia hàng đầu góp phần nâng cao giá trị cho đối tác và khách hàng.",
      category: 0
    },
    {
      id: 7,
      image: "https://i.ibb.co/wr613rj8/HLG2.jpg",
      title: "Mở rộng hệ sinh thái: Ra mắt tính năng mua sắm online trên nền tảng HLG ",
      // date: "15 tháng 07 năm 2025",
      summary: "Tính năng mới cho phép người dùng đặt mua mọi mặt hàng online trên nền tảng app HLG.",
      category: 2
    },
    {
      id: 8,
      image: "https://i.ibb.co/LDQCKMJg/image-2026-02-02-145559117.png",
      title: "HLG đã tổ chức đại hội cổ đông lần 1 thành công tại trụ sở công ty",
      // date: "05 tháng 07 năm 2025",
      summary: 'Đại hội cổ đông lần thứ 1 là cột mốc đầu tiên đánh dấu chiến lược phát triển của HLG Việt Nam, không chỉ tổng kết lại những bước đi đã qua mà là dấu ấn cho sự đồng hành quyết tâm của toàn thể ban lãnh đạo và cổ đông trong việc thực hiện hóa tầm nhìn xấy dựng nền tảng "Liên minh liên ngành bền vững mang giá trị cho doanh nghiệp, khách hàng và cả cộng đồng"',
      category: 0
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filteredNews = newsItems.filter(item => item.category === activeTab || activeTab === -1);

  return (
    <section className="py-24 bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Thông tin <span className="text-[#142077]">HLG</span>
          </h2>

          <div className="w-full flex flex-col md:flex-row justify-center items-center border-b border-gray-200 pb-2 relative">
            {/* Centered Tabs */}
            <div className="flex space-x-6 md:space-x-12">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`text-lg font-bold pb-2 transition-all relative ${activeTab === idx ? 'text-[#142077]' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {cat}
                  {activeTab === idx && (
                    <div className="absolute bottom-[-10px] left-0 right-0 h-[3px] bg-[#142077] rounded-full shadow-lg shadow-indigo-200"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="md:absolute md:right-0 flex space-x-3 mt-4 md:mt-0 mb-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-400 hover:bg-[#142077] hover:text-white hover:shadow-md transition-all"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-400 hover:bg-[#142077] hover:text-white hover:shadow-md transition-all"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* News Slider Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="group min-w-[280px] md:min-w-[310px] max-w-[310px] bg-white rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col snap-start border border-transparent relative h-[480px] cursor-pointer"
            >
              {/* Base Content (White background layer) */}
              <div className="h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <h4 className="text-[17px] font-bold text-gray-800 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="space-y-2">
                    {/* <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{item.date}</p> */}
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-auto">
                    <div className="text-[#142077] text-sm font-bold flex items-center">
                      Tìm hiểu thêm
                      <div className="ml-2 w-6 h-6 rounded-full bg-[#142077] flex items-center justify-center text-white text-[10px]">
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reveal Overlay Container (Slides up from bottom) */}
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-[#142077] transition-all duration-500 ease-in-out z-20 overflow-hidden flex flex-col">
                {/* Content inside reveal overlay - Content remains static at top relative to card */}
                <div className="h-[480px] w-full p-8 flex flex-col absolute top-0 left-0">
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-xl md:text-2xl font-bold text-white leading-tight mb-6">
                      {item.title}
                    </h4>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-[10]">
                    </p>
                  </div>

                  {/* Button anchored within the 480px content area */}
                  <div className="mt-auto">
                    <button className="bg-white rounded-full py-3 px-6 flex items-center justify-between w-[180px] shadow-xl hover:scale-105 transition-transform group/btn">
                      <span className="text-[#142077] font-bold text-sm">Tìm hiểu thêm</span>
                      <div className="w-8 h-8 rounded-full bg-[#142077] flex items-center justify-center text-white transition-transform group-hover/btn:translate-x-1">
                        <i className="fas fa-chevron-right text-xs"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-[#142077] to-[#117BF4] text-white px-12 py-3.5 rounded-full font-bold shadow-lg shadow-indigo-200 hover:scale-105 transition-all flex items-center mx-auto">
            Xem thêm thông tin <i className="fas fa-arrow-right ml-3 text-sm"></i>
          </button>
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

export default News;
