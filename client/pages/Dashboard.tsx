import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'shareholders' | 'logs'>('overview');
  const [shareholders, setShareholders] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'shareholders') fetchShareholders();
    if (activeTab === 'logs') fetchAuditLogs();
  }, [activeTab]);

  const fetchShareholders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      if (res.ok) setShareholders(await res.json());
    } finally { setLoading(false); }
  };

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/audit-logs', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      if (res.ok) setAuditLogs(await res.json());
    } finally { setLoading(false); }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans pt-20">
      {/* Sidebar */}
      <aside className="w-72 bg-[#111863] text-white flex flex-col shadow-2xl relative z-20">
        <div className="p-8 border-b border-indigo-500/30">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-[#142077] to-indigo-400 text-white font-black text-xl mb-4 shadow-lg shadow-indigo-500/40">
            A
          </div>
          <h2 className="text-xl font-black tracking-tight">Admin System</h2>
          <p className="text-indigo-200 text-sm mt-1">Quản lý tập trung HLG</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', icon: 'fa-chart-pie', label: 'Tổng quan' },
            { id: 'shareholders', icon: 'fa-users', label: 'Quản lý Cổ đông' },
            { id: 'logs', icon: 'fa-clipboard-list', label: 'Nhật ký hệ thống' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#142077] to-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
                  : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                }`}
            >
              <i className={`fas ${tab.icon} w-5`}></i>
              {tab.label}
            </button>
          ))}
        </nav>

       
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50/50">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        {/* Top Header */}
        <header className="h-24 px-10 flex items-center justify-between border-b border-slate-200/50 bg-white/50 backdrop-blur-md z-10 sticky top-0">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Xin chào, {user?.fullName || user?.username}!</h1>
            <p className="text-sm font-medium text-slate-400 mt-1">Chúc bạn một ngày làm việc hiệu quả.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#142077] hover:border-indigo-200 transition-all">
              <i className="fas fa-bell"></i>
            </button>
            <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#111863] to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-800 leading-none">{user?.fullName || 'Quản trị viên'}</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-10 z-10">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">

            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                      <i className="fas fa-users text-8xl text-indigo-500"></i>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl mb-6 shadow-inner">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <h3 className="text-slate-500 font-bold mb-1">Tổng Cổ Đông</h3>
                    <p className="text-4xl font-black text-slate-800">1,248</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-500 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                      <i className="fas fa-arrow-up"></i> +12 tháng này
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                      <i className="fas fa-chart-line text-8xl text-blue-500"></i>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-inner">
                      <i className="fas fa-coins"></i>
                    </div>
                    <h3 className="text-slate-500 font-bold mb-1">Tổng Khối Lượng CP</h3>
                    <p className="text-4xl font-black text-slate-800">4M+</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-500 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                      <i className="fas fa-arrow-up"></i> Phát hành vững mạnh
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#111863] to-[#2539cc] p-6 rounded-[2rem] shadow-xl shadow-blue-900/30 relative overflow-hidden text-white group hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                      <i className="fas fa-server text-8xl"></i>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-xl mb-6 backdrop-blur-sm border border-white/20">
                      <i className="fas fa-shield-check text-blue-200"></i>
                    </div>
                    <h3 className="text-blue-200 font-bold mb-1">Trạng thái hệ thống</h3>
                    <p className="text-4xl font-black">Online</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-100 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> Hoạt động ổn định
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20">
                  <h3 className="text-xl font-black text-slate-800 mb-6">Truy cập nhanh</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/shareholder" className="p-6 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-100 transition-all font-bold text-slate-600 flex flex-col items-center justify-center gap-3 group">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform"><i className="fas fa-user-plus"></i></div>
                      <span className="text-sm">Tạo Cổ Đông</span>
                    </a>
                    <button onClick={() => setActiveTab('shareholders')} className="p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-100 transition-all font-bold text-slate-600 flex flex-col items-center justify-center gap-3 group">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform"><i className="fas fa-search"></i></div>
                      <span className="text-sm">Tra cứu</span>
                    </button>
                    {/* Add more shortcuts if needed */}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shareholders' && (
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Danh sách Cổ đông</h3>
                    <p className="text-slate-500 mt-1 font-medium">Toàn bộ hồ sơ cổ đông được lưu trữ trong hệ thống</p>
                  </div>
                  <button onClick={fetchShareholders} className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center font-bold shadow-sm border border-slate-100">
                    <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500">Thông tin Cổ đông</th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500">CCCD / Phone</th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500">Sở hữu</th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {shareholders.length === 0 && (
                        <tr><td colSpan={4} className="p-8 text-center text-slate-400 font-bold">Chưa có dữ liệu.</td></tr>
                      )}
                      {shareholders.map(sh => (
                        <tr key={sh._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 border border-white shadow-sm flex items-center justify-center overflow-hidden">
                                {sh.avatar ? <img src={sh.avatar} className="w-full h-full object-cover" /> : <i className="fas fa-user text-indigo-300"></i>}
                              </div>
                              <div>
                                <p className="text-sm font-black text-slate-800">{sh.fullName || 'Chưa cập nhật'}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase">{sh.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-600 font-mono">{sh.cccd}</p>
                            <p className="text-xs font-medium text-slate-400">{sh.phone || 'N/A'}</p>
                          </td>
                          <td className="px-6 py-4 text-sm font-black text-emerald-600">
                            {sh.sharesCount?.toLocaleString()} cp
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                              {sh.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Nhật ký hệ thống</h3>
                    <p className="text-slate-500 mt-1 font-medium">Theo dõi các thay đổi quan trọng trên hệ thống</p>
                  </div>
                  <button onClick={fetchAuditLogs} className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center font-bold shadow-sm border border-slate-100">
                    <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
                  </button>
                </div>

                <div className="space-y-4">
                  {auditLogs.length === 0 && (
                    <div className="p-8 text-center text-slate-400 font-bold border-2 border-dashed border-slate-100 rounded-2xl">Nhật ký trống.</div>
                  )}
                  {auditLogs.map((log) => (
                    <div key={log._id} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all bg-slate-50/50">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-shrink-0 items-center justify-center text-blue-500">
                        <i className={`fas ${log.action === 'CREATE_SHAREHOLDER' ? 'fa-user-plus text-emerald-500' :
                            log.action.includes('PASSWORD') ? 'fa-key text-amber-500' : 'fa-clipboard-check'
                          }`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-black text-slate-800">{log.action.replace(/_/g, ' ')}</h4>
                          <span className="text-xs font-bold text-slate-400">{new Date(log.createdAt).toLocaleString('vi-VN')}</span>
                        </div>
                        <p className="text-sm text-slate-600 font-medium my-1">
                          Thực hiện bởi: <span className="font-bold text-[#111863]">{log.adminId?.fullName || log.adminId?.username}</span>
                        </p>
                        <div className="bg-slate-100/50 p-3 rounded-xl border border-slate-100 text-xs font-mono text-slate-500 mt-2">
                          {JSON.stringify(log.details)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
