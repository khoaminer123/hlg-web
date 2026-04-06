
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      login(username);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pink-primary text-white text-3xl font-bold mb-6">HLG</div>
          <h2 className="text-3xl font-extrabold text-gray-900">Chào mừng trở lại</h2>
          <p className="mt-2 text-gray-600">Đăng nhập vào hệ thống HLG Cloud</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
              <input
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-primary focus:border-pink-primary sm:text-sm"
                placeholder="Nhập username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-primary focus:border-pink-primary sm:text-sm"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-pink-primary focus:ring-pink-primary border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">Ghi nhớ</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-pink-primary hover:text-pink-600">Quên mật khẩu?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white gradient-pink hover:scale-[1.02] transition-all shadow-lg shadow-pink-200"
            >
              ĐĂNG NHẬP NGAY
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">Chưa có tài khoản? <a href="#" className="text-pink-primary font-bold">Đăng ký tham gia liên minh</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
