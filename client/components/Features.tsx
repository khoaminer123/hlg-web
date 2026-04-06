import React, { useState } from "react";

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Đời sống HLG", id: 0 },
    { title: "Siêu thị Bibiduo", id: 1 },
    { title: "Liên minh doanh nghiệp", id: 2 },
    { title: "Trung tâm dịch vụ", id: 3 },
  ];

  const content = [
    {
      title: "Nền tảng tiêu dùng tích hợp liên minh liên ngành",
      description:
        'Nền tảng "HLG liên kết tất cả các ngành nghề truyền thống, các doanh nghiệp, các cửa hàng kinh doanh. Nơi mọi người có thể sử dụng tìm kiếm khách hàng chéo của nhau. Chúng tôi tạo ra một liên minh liên ngành giúp doanh nghiệp tăng khách hàng, đồng thời giữu chân khách hàng quen ở lại với doanh nghiệp."',
      tags: [
        "Triệu SKU",
        "Trợ giá chính xác",
        "Dịch vụ một trạm",
        "Hợp tác thương hiệu",
        "Thanh toán di động",
        "Giao đồ ăn nhanh",
      ],
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", // Mockup placeholder
    },
    // Other tabs would have similar structure
  ];

  const currentContent = content[0]; // For demo, using same content structure for all tabs

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#142077] text-white shadow-lg shadow-[#142077]"
                  : "text-gray-800 hover:text-pink-primary"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Main Content Box */}
        <div className="bg-[#f9f9f9] rounded-[3rem] overflow-hidden p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div>
            <img
              src="https://i.ibb.co/FL0V99zd/image-2026-03-26-162219224.png"
              alt=""
            />
          </div>

          {/* Right Side: Text & Tags */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {currentContent.title}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              {currentContent.description}
            </p>

            {/* Tags Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentContent.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 text-gray-500 text-sm py-2 px-4 rounded-md text-center hover:border-[#142077] hover:text-pink-primary transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="bg-gradient-to-r from-[#142077] to-[#117BF4] text-white px-10 py-3.5 rounded-full font-bold flex items-center shadow-lg hover:shadow-orange-100 hover:scale-105 transition-all">
                Tìm hiểu thêm{" "}
                <i className="fas fa-arrow-right ml-3 text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-[#142077] to-[#117BF4] text-white px-12 py-4 rounded-full text-lg font-bold shadow-xl shadow-pink-100 hover:scale-105 transition-all">
            Xem thêm dịch vụ <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
