import { useState } from "react";

export default function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-[900px] bg-white shadow-2xl rounded-xl flex overflow-hidden">

        {/* LEFT SIDE */}

        <div className="w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 text-white p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-4">
            EXCEDO Shareholder Portal
          </h1>

          <p className="text-sm leading-relaxed opacity-90">
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


        {/* RIGHT SIDE */}

        <div className="w-1/2 p-10">

          <div className="flex justify-center mb-8">

            <div className="bg-gray-200 rounded-full p-1 flex">

              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  isLogin
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Đăng nhập
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  !isLogin
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Đăng ký
              </button>

            </div>

          </div>


          {/* LOGIN FORM */}

          {isLogin && (

            <form className="space-y-5">

              <h2 className="text-2xl font-bold text-center mb-4">
                Đăng nhập cổ đông
              </h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Đăng nhập
              </button>

              <p className="text-sm text-center text-gray-500">
                Quên mật khẩu?
              </p>

            </form>

          )}


          {/* REGISTER FORM */}

          {!isLogin && (

            <form className="space-y-4">

              <h2 className="text-2xl font-bold text-center mb-4">
                Đăng ký cổ đông
              </h2>

              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="text"
                placeholder="CCCD / CMND"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                Tạo tài khoản cổ đông
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}