import React, { useState, useEffect } from "react";

const ModelHLG: React.FC = () => {
  const [showPartnerBar, setShowPartnerBar] = useState(false);

  const serviceCards = [
    {
      title: "Đời sống HLG",
      sub: "Hơn 3000 người dùng đã tham gia vào liên minh HLG",
      bgColor: "bg-white",
      textColor: "text-[#142077]",
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Siêu thị HLG",
      sub: "50 siêu thị hợp tác đã ra mắt",
      bgColor: "bg-white",
      textColor: "text-[#142077]",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop",
    },
    {
      title: "Liên minh ngành nghề",
      sub: "2000+ đối tác đã sẵn sàng gia nhập liên minh HLG",
      bgColor: "bg-white",
      textColor: "text-[#142077]",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
    },
    {
      title: "Trung tâm dịch vụ khu vực",
      sub: "2 trung tâm vận hành dịch vụ HLG đã đi vào hoạt động",
      bgColor: "bg-white",
      textColor: "text-[#142077]",
      img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    },
    {
      title: "Xây dựng thương hiệu",
      sub: "Số hóa doanh nghiệp, đa phương cùng thắng",
      bgColor: "bg-white",
      textColor: "text-[#142077]",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    },
    {
      title: "HLG Coffee",
      sub: "Dự kiến mở 50 cửa hàng vào năm 2026",
      bgColor: "bg-white",
      textColor: "text-[#142077]",
      img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop",
    },
    {
      title: "Kho Logistic",
      sub: "Đang mở rộng thần tốc",
      bgColor: "bg-white",
      textColor: "text-[#142077]",
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const honorCards = [
    {
      title: "Doanh nghiệp kiểu mẫu hỗ trợ hồi sinh nông thôn",
      desc: "Tháng 5 năm 2025, vinh dự nhận giải thưởng 'Doanh nghiệp kiểu mẫu hỗ trợ hồi sinh nông thôn 2025' tại các khu vực trọng điểm.",
      img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Doanh nghiệp chứng nhận tín dụng thương mại",
      desc: "Tháng 5 năm 2025, nhận chứng nhận từ Trung tâm Thương mại Điện tử Quốc tế Trung Quốc về 'Doanh nghiệp chứng nhận tín dụng thương mại 2025'.",
      img: "https://images.unsplash.com/photo-1621243804936-775306a8f2e3?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Top doanh nghiệp hài lòng khách hàng",
      desc: "Tháng 3 năm 2025, Công ty TNHH Quản lý Siêu thị Binado vinh dự lọt vào bảng xếp hạng TOP các doanh nghiệp có chỉ số hài lòng cao.",
      img: "https://i.ibb.co/ynQNzh3D/image-2026-03-26-170515068.png",
    },
    {
      title: "Giải thưởng Phát triển bền vững SME Toàn cầu",
      desc: "Tại Hội nghị Phát triển Bền vững Toàn cầu 2025, HLG đã xuất sắc giành được giải thưởng doanh nghiệp vừa và nhỏ tiêu biểu.",
      img: "https://i.ibb.co/qLg5CwG9/HLG3.jpg",
    },
    {
      title: "Giải thưởng Hợp tác doanh nghiệp bền vững toàn cầu",
      desc: "Tại Tiệc tối Phát triển Bền vững Toàn cầu 2025, HLG đã nhận giải thưởng 'Đối tác doanh nghiệp phát triển bền vững toàn cầu'.",
      img: "https://i.ibb.co/tTX6fPrw/HLG4.jpg",
    },
    {
      title: "Doanh nghiệp thí điểm tín dụng tiêu dùng xanh",
      desc: "Tháng 10 năm 2025, được trao tặng bằng khen 'Doanh nghiệp đầu tiên tiên phong mô hình kinh koanh tiêu dùng tích điểm xanh'.",
      img: "https://i.ibb.co/N2fhmk4M/image-2026-03-26-170556107.png",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Ẩn thanh đăng ký khi cách đáy trang (footer) khoảng 500px
      const isNearFooter = scrollY + windowHeight > documentHeight - 500;

      setShowPartnerBar(scrollY > 400 && !isNearFooter);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-[88px] bg-[#fbfbfb] pb-32">
      {/* SECTION HERO */}
      <section className="relative w-full h-full md:h-[800px] flex items-center overflow-hidden justify-center">
        <div>
          <img
            classname="w-full"
            src="https://i.ibb.co/MkCVJfn3/image-2026-03-26-170053839.png"
            alt=""
          />
        </div>
      </section>

      {/* Understand Section Header */}
      <section className="py-12 text-center bg-white">
        <h2 className="text-2xl font-bold text-gray-800">
          {" "}
          <span className="text-[#142077] italic">Mô hình HLG Coffee</span>
        </h2>
      </section>

      {/* MODEL IMAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full flex justify-center items-center">
          <div className="w-full bg-white rounded-[3rem] p-4 md:p-8 border border-gray-50 shadow-sm overflow-hidden flex justify-center items-center">
            <img
              src="https://i.ibb.co/8gsTsdBQ/HLG-Page2.jpg"
              alt="Mô hình kinh doanh My Shop"
              className="max-w-full h-auto object-contain rounded-2xl"
              style={{ minHeight: "400px" }}
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS AND SERVICES SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800">
              Sản phẩm và dịch vụ{" "}
              <span className="text-[#142077]">HLG</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card, idx) => (
              <div
                key={idx}
                className={`${card.bgColor} rounded-2xl p-6 h-40 flex justify-between items-center relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer`}
              >
                {/* Content */}
                <div className="relative z-10 space-y-2 max-w-[50%]">
                  <h4
                    className={`text-xl md:text-2xl font-black ${card.textColor} leading-tight`}
                  >
                    {card.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] md:text-xs font-bold">
                    {card.sub}
                  </p>
                </div>

                {/* Arrow Button */}
                <div className="relative z-10 mr-2">
                  <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-white flex items-center justify-center text-gray-400 group-hover:bg-hlg-blue group-hover:text-white transition-all shadow-sm">
                    <i className="fas fa-chevron-right text-xs"></i>
                  </div>
                </div>

                {/* 3D-Style Faded Image */}
                <div className="absolute top-0 right-0 h-full w-1/2">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONORS SECTION */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800">
              HLG <span className="text-[#142077]">Vinh dự</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {honorCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 flex gap-6 items-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                {/* Certificate Image */}
                <div className="w-48 h-32 md:w-56 md:h-36 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-2">
                  <div className="w-full h-full bg-white border-4 border-[#c5a059]/30 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                    />
                    {/* Decorative Frame Elements */}
                    <div className="absolute inset-0 border-[1px] border-[#c5a059]/20 m-1 pointer-events-none"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h4 className="text-lg font-black text-gray-800 leading-tight group-hover:text-hlg-blue transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3 font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination inspired by the image */}
          {/* <div className="mt-12 flex justify-end items-center space-x-4 text-sm font-bold text-gray-400">
            <span>Tổng cộng 12 mục</span>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:text-[#142077] transition-colors">
                <i className="fas fa-chevron-left text-xs"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#142077] text-white">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:text-[#142077] transition-colors">
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div> */}
        </div>
      </section>

      {/* FIXED PARTNER BAR */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white/90 backdrop-blur-md rounded-full px-8 py-3 shadow-2xl border border-gray-100 z-[110] flex items-center justify-between transition-all duration-500 ${showPartnerBar
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
          }`}
      >
        <span className="text-gray-600 font-bold text-xs md:text-sm">
          Tiết kiệm tiền cho người tiêu dùng và tăng thu nhập cho đối tác
        </span>
        <button className="bg-gradient-to-r from-[#142077] to-[#117BF4] text-white px-6 py-2 rounded-full font-black text-xs md:text-sm hover:scale-105 transition-transform shadow-lg shadow-[#117BF4]">
          Đăng ký trở thành đối tác
        </button>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
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

export default ModelHLG;
