
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Xin chào, {user?.username}! 👋</h1>
              <p className="text-gray-500">Đây là bảng điều khiển quản trị hệ thống HLG của bạn.</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-all">Cài đặt</button>
              <button className="gradient-pink text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-pink-100">Báo cáo mới</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: 'Doanh thu tháng', value: '450.000.000đ', icon: 'fa-chart-line', color: 'text-blue-500' },
              { label: 'Thành viên mới', value: '+1.250', icon: 'fa-user-plus', color: 'text-pink-500' },
              { label: 'Cửa hàng liên kết', value: '18', icon: 'fa-store', color: 'text-orange-500' }
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${card.color} shadow-sm`}>
                    <i className={`fas ${card.icon} text-xl`}></i>
                  </div>
                  <span className="text-green-500 text-xs font-bold">+12% vs tháng trước</span>
                </div>
                <h4 className="text-gray-500 text-sm font-medium">{card.label}</h4>
                <div className="text-2xl font-black text-gray-900 mt-1">{card.value}</div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hoạt động</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Thời gian</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">Đối tác {row} vừa nâng cấp gói Liên Minh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row} giờ trước</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">Hoàn thành</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
