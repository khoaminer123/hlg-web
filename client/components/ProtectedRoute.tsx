
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/shareholder" state={{ from: location }} replace />;
  }

  // Bắt buộc đổi mật khẩu lần đầu trước khi vào các trang bảo mật khác
  if (user?.isFirstLogin) {
    return <Navigate to="/shareholder" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
