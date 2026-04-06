import React from "react";

const Intro: React.FC = () => {
  const stats = [
    { value: "4000", label: "Thành viên", icon: "fa-users" },
    { value: "1500", label: "Doanh nghiệp", icon: "fa-store-alt" },
    { value: "6", label: "Trung tâm vận hành", icon: "fa-globe-asia" },
    { value: "150", label: "Siêu thị hợp tác", icon: "fa-shopping-basket" },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Intro Part */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-[#142077] tracking-tight">
                Khám phá HLG
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                Công ty công nghệ cam kết số hóa và trao quyền cho nền kinh tế 

              </h3>
            </div>

            <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
              <p>
                HLG kết nối các ngành nghề, các thương gia và doanh nghiệp cùng nhau xây dựng
                một hệ sinh thái mở, phát triển phối hợp đa lĩnh vực đặt được sự đồng hành
                cùng tiến và tăng trưởng bền vững. 
              </p>
              <p>
                HLG là nền tảng thương mại số toàn diện, nơi mỗi giao dịch mỗi khoản 
                chi tiêu đều mang lại giá trị kép. Vừa thoải mãn nhu cầu thuyết yêu
                của người tiêu dùng với mức giá cạnh tranh vừa gia tăng khách hàng cho 
                doanh nghiệp.  
              </p>
              <p>
                Thông qua hệ thống tích điểm xanh thông minh, HLG hỗ trợ các doanh nghiệp 
                truyền thống nâng cấp toàn diện thành mô hình kinh doanh hiện đại, minh bạch 
                và hiệu quả đáp ứng đầy đủ nhu cầu của thị trường đang không ngừng thay đổi.              
              </p>
            </div>

            <div className="pt-2">
              <button className="bg-[#142077]  text-white px-8 py-3 rounded-full font-bold flex items-center shadow-lg shadow-[#142077] hover:scale-105 transition-all text-sm">
                Xem chi tiết <i className="fas fa-arrow-right ml-3 text-xs"></i>
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "0px",
                paddingBottom: "177.917%",
              }}
            >
              <iframe
                src="https://streamable.com/e/ppnegc?autoplay=1&nocontrols=1"
                allow="fullscreen; autoplay"
                allowFullScreen
                style={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  overflow: "hidden",
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats Part - Integrated inside the same container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-gray-50/50 rounded-[2.5rem] p-4 md:p-8 border border-gray-100">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center px-2 py-6 group transition-all duration-300 ${
                idx !== stats.length - 1 ? "lg:border-r border-gray-100" : ""
              }`}
            >
              <div className="mb-4 text-gray-300 group-hover:text-pink-primary transition-colors duration-500">
                <i
                  className={`fas ${stat.icon} text-4xl font-light opacity-50 group-hover:opacity-100`}
                ></i>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-black text-[#142077] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs font-bold tracking-wide uppercase">
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

export default Intro;
