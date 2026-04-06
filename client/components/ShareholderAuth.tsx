import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ShareholderAuth: React.FC = () => {

  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleDemoLogin = (e: any) => {

    e.preventDefault();

    login({
      name: "TRẦN THỊ DUY LY",
      shares: 1000,
      percent: 0.01
    });

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-[900px] bg-white shadow-2xl rounded-xl flex overflow-hidden">

        {/* LEFT PANEL */}

        <div className="w-1/2 bg-gradient-to-br from-[#142077] to-[#3a4ed0] text-white p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-4">
            EXCEDO Shareholder Portal
          </h1>

          <p className="text-sm opacity-90">
            Hệ thống quản lý cổ phần dành cho cổ đông của
            Công ty CP Tập đoàn Công Nghệ EXCEDO.
          </p>

          <div className="mt-10 space-y-3 text-sm">

            <div>✔ Xem chứng nhận cổ phần</div>
            <div>✔ Theo dõi giá trị đầu tư</div>
            <div>✔ Quản lý chuyển nhượng</div>
            <div>✔ Cập nhật thông tin cổ đông</div>

          </div>

        </div>


        {/* RIGHT PANEL */}

        <div className="w-1/2 p-10">

          {/* SWITCH LOGIN / REGISTER */}

          <div className="flex justify-center mb-8">

            <div className="bg-gray-200 rounded-full p-1 flex">

              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  isLogin
                    ? "bg-[#142077] text-white"
                    : "text-gray-600"
                }`}
              >
                Đăng nhập
              </button>

            </div>

          </div>


          {/* LOGIN */}

          {isLogin && (

            <form onSubmit={handleDemoLogin} className="space-y-5">

              <h2 className="text-2xl font-bold text-center mb-4">
                Đăng nhập cổ đông
              </h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#142077] outline-none"
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#142077] outline-none"
              />

              <button
                type="submit"
                className="w-full bg-[#142077] text-white py-3 rounded-lg hover:bg-[#0f185a] transition"
              >
                Đăng nhập
              </button>

              <p className="text-sm text-center text-gray-500">
                Quên mật khẩu?
              </p>

            </form>

          )}


          {/* REGISTER */}

          {!isLogin && (

            <form className="space-y-4">

              <h2 className="text-2xl font-bold text-center mb-4">
                Đăng ký cổ đông
              </h2>

              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#142077] outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#142077] outline-none"
              />

              <input
                type="text"
                placeholder="CCCD / CMND"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#142077] outline-none"
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#142077] outline-none"
              />

              <button
                type="button"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Tạo tài khoản cổ đông
              </button>

            </form>

          )}

        </div>

      </div>

    </div>

  );

};

export default ShareholderAuth;