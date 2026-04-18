import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import AdminEditModal from "./shareholder/AdminEditModal";

const ShareholderAuth: React.FC = () => {
  const { login, logout, user } = useAuth();
  // Nếu !user -> hiển thị form Login. Nếu user (tương đương Admin) -> hiển thị tab Admin
  const [isLogin, setIsLogin] = useState(!user);
  const [showForgotPass, setShowForgotPass] = useState(false);

  useEffect(() => {
    setIsLogin(!user);
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form State for Admin
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    dob: "",
    gender: "Nam, Nữ",
    hometown: "",
    residence: "",
    expiryDate: "",
    phone: "",
    sharesFounder: 0,
    sharesStrategic: 0,
    sharesCommon: 0,
    avatar: "",
    strategicCertImage: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const certFileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fullName' ? value.toUpperCase() : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'avatar' | 'strategicCertImage' = 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Canvas compression
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = fieldName === 'strategicCertImage' ? 1200 : 300;
          const scale = MAX_WIDTH > img.width ? 1 : MAX_WIDTH / img.width;
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const quality = fieldName === 'strategicCertImage' ? 0.85 : 0.7;
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          setFormData(prev => ({ ...prev, [fieldName]: compressedDataUrl }));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const [adminTab, setAdminTab] = useState<'register' | 'logs' | 'management'>('register');
  const [shareholders, setShareholders] = useState<any[]>([]);
  const [shPagination, setShPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [shSearch, setShSearch] = useState("");
  const [shStatusFilter, setShStatusFilter] = useState("");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [logPagination, setLogPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [logActionFilter, setLogActionFilter] = useState("");
  const [logDateFrom, setLogDateFrom] = useState("");
  const [logDateTo, setLogDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Admin edit modal state
  const [editingShareholderId, setEditingShareholderId] = useState<any>(null);

  const fetchAuditLogs = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (logActionFilter) params.append('action', logActionFilter);
      if (logDateFrom) params.append('dateFrom', logDateFrom);
      if (logDateTo) params.append('dateTo', logDateTo);
      const response = await fetch(`/api/auth/audit-logs?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setAuditLogs(data.logs || []);
        setLogPagination(data.pagination || { total: 0, page: 1, totalPages: 1 });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Không thể tải nhật ký' });
    } finally {
      setLoading(false);
    }
  };

  const fetchShareholders = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (shSearch) params.append('search', shSearch);
      if (shStatusFilter) params.append('status', shStatusFilter);
      const response = await fetch(`/api/users?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setShareholders(data.users || []);
        setShPagination(data.pagination || { total: 0, page: 1, totalPages: 1 });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Không thể tải danh sách cổ đông' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (sh: any) => {
    const action = sh.status === 'active' ? 'Khóa' : 'Mở khóa';
    if (!window.confirm(`Bạn có chắc chắn muốn ${action} tài khoản "${sh.fullName}"?`)) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/users/${sh._id}/status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ type: 'success', text: data.message });
      fetchShareholders(shPagination.page);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (shareholders.length === 0) {
      setMessage({ type: 'error', text: 'Không có dữ liệu để xuất' });
      return;
    }
    const headers = ['STT', 'Họ và tên', 'CCCD', 'Số điện thoại', 'Giới tính', 'Ngày sinh', 'CP Sáng lập', 'CP Chiến lược', 'CP Phổ thông', 'Tổng CP', 'Trạng thái'];
    const rows = shareholders.map((sh, i) => [
      i + 1,
      sh.fullName || '',
      sh.cccd || '',
      sh.phone || '',
      sh.gender || '',
      sh.dob ? new Date(sh.dob).toLocaleDateString('vi-VN') : '',
      sh.sharesFounder || 0,
      sh.sharesStrategic || 0,
      sh.sharesCommon || 0,
      sh.sharesCount || 0,
      sh.status === 'active' ? 'Hoạt động' : 'Bị khóa'
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `danh_sach_co_dong_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ type: 'success', text: 'Xuất file Excel thành công!' });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    if (adminTab === 'logs') fetchAuditLogs(1);
    if (adminTab === 'management') fetchShareholders(1);
  }, [adminTab]);

  // Re-fetch khi filter thay đổi
  useEffect(() => {
    if (adminTab === 'management') fetchShareholders(1);
  }, [shStatusFilter]);

  useEffect(() => {
    if (adminTab === 'logs') fetchAuditLogs(1);
  }, [logActionFilter, logDateFrom, logDateTo]);

  const handleResetPassword = async (targetUserId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn reset mật khẩu tài khoản này về?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ targetUserId })
      });
      const result = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Đã reset mật khẩu thành công!' });
        fetchAuditLogs(); // Cập nhật nhật ký
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Logic validation: 12 digits for CCCD
      if (formData.username.length !== 12 || !/^\d+$/.test(formData.username)) {
        throw new Error("Số định danh cá nhân phải đủ 12 chữ số.");
      }

      // API call thực tế
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          cccd: formData.username, // Số CCCD chính là username để login
          fullName: formData.fullName,
          dob: formData.dob,
          gender: formData.gender,
          hometown: formData.hometown,
          residence: formData.residence,
          expiryDate: formData.expiryDate,
          avatar: formData.avatar,
          strategicCertImage: formData.strategicCertImage,
          email: `${formData.username}@shareholder.local`, // Tự sinh email tạm vì CSDL bắt buộc
          phone: formData.phone,
          sharesFounder: formData.sharesFounder || 0,
          sharesStrategic: formData.sharesStrategic || 0,
          sharesCommon: formData.sharesCommon || 0
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Không thể tạo tài khoản');
      }

      setMessage({
        type: 'success',
        text: `Tài khoản ${formData.fullName} (CCCD: ${formData.username}) đã được tạo thành công!`
      });

      // Xóa form sau khi đăng ký thành công?
      setFormData({
        username: "", fullName: "", dob: "", gender: "Nam",
        hometown: "", residence: "", expiryDate: "", avatar: "",
        sharesFounder: 0, sharesStrategic: 0, sharesCommon: 0
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginId = (e.target as any)[0].value;
    const password = (e.target as any)[1].value;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cccd: loginId, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      login(data); // Cập nhật AuthContext với user và token

      // Nếu là lần đầu đăng nhập, UI sẽ tự động trigger Modal đổi mật khẩu qua trạng thái user.isFirstLogin
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '123456', new: '', confirm: '' });

  // Sync state with user context if logged in but needs change
  React.useEffect(() => {
    // user is available from the hook above
  }, [user]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (passwords.new.length < 8) {
        throw new Error("Mật khẩu mới phải có ít nhất 8 ký tự.");
      }
      if (passwords.new === '123456') {
        throw new Error("Mật khẩu mới không được trùng với mật khẩu mặc định.");
      }
      if (passwords.new !== passwords.confirm) {
        throw new Error("Mật khẩu xác nhận không khớp.");
      }

      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword: passwords.new })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Không thể đổi mật khẩu");

      setMessage({ type: 'success', text: "Đổi mật khẩu thành công! Đang chuyển hướng..." });

      // Cập nhật lại user state cục bộ
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      currentUser.isFirstLogin = false;
      localStorage.setItem('user', JSON.stringify(currentUser));

      setTimeout(() => {
        window.location.href = '/dashboard'; // Force reload to update context or use context update
      }, 5000);

    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const isFirstTime = user?.isFirstLogin && !isLogin; // Logic to switch to change pass view

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 sm:p-6 font-sans overflow-x-hidden">
      {/* Modern Professional Blue Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-cyan-100 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className={`w-full ${isLogin ? 'max-w-5xl' : 'max-w-6xl'} bg-white/70 backdrop-blur-3xl shadow-[0_32px_80px_-16px_rgba(30,58,138,0.15)] rounded-[3rem] overflow-hidden transition-all duration-700 border border-white relative z-10 mt-20 mb-10`}>

        {message && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md">
            <div className={`p-4 rounded-xl text-sm font-medium flex items-center shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
              {message.type === 'success' ? '✓ ' : '⚠ '} {message.text}
            </div>
          </div>
        )}

        <div className={isLogin ? "flex flex-col md:flex-row w-full min-h-[400px]" : "p-15 relative w-full max-w-8xl mx-auto"}>
          {!isLogin && (
            <button
              onClick={() => logout()}
              className="absolute top-8 right-8 bg-white/80 text-indigo-900 font-semibold px-5 py-2 rounded-2xl backdrop-blur-md border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all duration-300 text-[10px] uppercase tracking-[0.15em] z-50 flex items-center gap-2 group/logout shadow-sm"
            >
              <i className="fas fa-sign-out-alt group-hover:translate-x-1 transition-transform"></i> Đăng xuất
            </button>
          )}

          {!isLogin && user?.role === 'admin' && (
            <div className="flex bg-slate-100/50 backdrop-blur-2xl p-1.5 rounded-[1.5rem] mb-6 w-fit mx-auto border border-white shadow-sm">
              <button
                onClick={() => setAdminTab('register')}
                className={`px-10 py-3.5 rounded-xl font-semibold text-[11px] uppercase tracking-[0.15em] transition-all duration-500 flex items-center gap-2 ${adminTab === 'register' ? 'bg-white text-indigo-600 shadow-md scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/50'}`}
              >
                <i className="fas fa-user-plus text-[10px]"></i> Đăng ký
              </button>
              <button
                onClick={() => setAdminTab('management')}
                className={`px-10 py-3.5 rounded-xl font-semibold text-[11px] uppercase tracking-[0.15em] transition-all duration-500 flex items-center gap-2 ${adminTab === 'management' ? 'bg-white text-indigo-600 shadow-md scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/50'}`}
              >
                <i className="fas fa-users-cog text-[10px]"></i> Quản lý
              </button>
              <button
                onClick={() => setAdminTab('logs')}
                className={`px-10 py-3.5 rounded-xl font-semibold text-[11px] uppercase tracking-[0.15em] transition-all duration-500 flex items-center gap-2 ${adminTab === 'logs' ? 'bg-white text-indigo-600 shadow-md scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/50'}`}
              >
                <i className="fas fa-history text-[10px]"></i> Nhật ký
              </button>
            </div>
          )}

          {user?.isFirstLogin ? (
            <form onSubmit={handleChangePassword} className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-lg mx-auto w-full bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white shadow-xl">
              <div className="text-center mb-10">
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-6 mx-auto"></div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Cập nhật Bảo mật</h2>
                <p className="text-slate-500 mt-2 text-sm text-balance px-4 font-medium opacity-80">Vì lý do bảo mật, bạn cần thay đổi mật khẩu mặc định trước khi truy cập hệ thống.</p>
              </div>

              <div className="space-y-5">
                <div className="relative group">
                  <label className="text-[10px] font-semibold uppercase text-slate-400 ml-2 mb-2 block tracking-widest">Mật khẩu mới / New Password</label>
                  <div className="relative">
                    <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"></i>
                    <input
                      type="password"
                      placeholder="Tối thiểu 8 ký tự"
                      value={passwords.new}
                      onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
                      className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 font-semibold"
                      required
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-semibold uppercase text-slate-400 ml-2 mb-2 block tracking-widest">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <i className="fas fa-check-circle absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                      className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 font-semibold"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3 shadow-inner">
                <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-shield-alt"></i> Tiêu chuẩn bảo mật:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1.5 rounded-xl text-[9px] font-semibold tracking-tighter uppercase transition-colors ${passwords.new.length >= 8 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>Độ dài ≥ 8</span>
                  <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black tracking-tighter uppercase transition-colors ${passwords.new !== '123456' && passwords.new !== '' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>Khác mặc định</span>
                  <span className={`px-3 py-1.5 rounded-xl text-[9px] font-semibold tracking-tighter uppercase transition-colors ${passwords.new === passwords.confirm && passwords.new !== '' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>Trùng khớp</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4.5 rounded-2xl font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_12px_24px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_16px_32px_-6px_rgba(37,99,235,0.5)] hover:translate-y-[-2px] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Kích hoạt tài khoản"}
              </button>

              <button
                type="button"
                onClick={() => logout()}
                className="w-full text-blue-600 text-[10px] font-semibold hover:text-indigo-800 transition-colors uppercase tracking-[0.2em]"
              >
                Đăng xuất & Thoát
              </button>
            </form>
          ) : !isLogin && adminTab === 'management' ? (
            <div className="mt-5 space-y-4 animate-in fade-in zoom-in-95 duration-700 bg-white/80 backdrop-blur-3xl p-5 sm:p-8 rounded-[2.5rem] border border-white shadow-xl">

              {/* AdminEditModal */}
              <AdminEditModal
                isOpen={!!editingShareholderId}
                onClose={() => setEditingShareholderId(null)}
                shareholder={editingShareholderId}
                onSaved={(updatedUser) => {
                  setShareholders(prev => prev.map(sh => sh._id === updatedUser._id ? updatedUser : sh));
                  setEditingShareholderId(null);
                  setMessage({ type: 'success', text: `Cập nhật thông tin ${updatedUser.fullName} thành công!` });
                }}
              />

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 mb-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Cơ sở dữ liệu Cổ đông</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">
                      {shPagination.total} cổ đông · Trang {shPagination.page}/{shPagination.totalPages}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {/* Tìm kiếm */}
                  <div className="relative group/search flex-1 sm:flex-initial">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      placeholder="Tìm theo tên, CCCD..."
                      value={shSearch}
                      onChange={(e) => setShSearch(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && fetchShareholders(1)}
                      className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] text-slate-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all w-full sm:w-56 outline-none shadow-sm placeholder:text-slate-300 font-medium"
                    />
                  </div>
                  {/* Filter trạng thái */}
                  <select
                    value={shStatusFilter}
                    onChange={e => setShStatusFilter(e.target.value)}
                    className="py-3 px-4 bg-white border border-slate-200 rounded-2xl text-[12px] font-semibold text-slate-700 outline-none focus:border-blue-500 shadow-sm"
                  >
                    <option value="">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="locked">Bị khóa</option>
                  </select>
                  {/* Export Excel */}
                  <button
                    onClick={handleExportExcel}
                    className="px-5 py-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95 flex items-center gap-2"
                  >
                    <i className="fas fa-file-excel text-sm"></i> Excel
                  </button>
                  {/* Refresh */}
                  <button onClick={() => fetchShareholders(1)} className="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-blue-600 hover:text-white hover:bg-blue-600 hover:rotate-180 transition-all duration-700 flex items-center justify-center shadow-sm active:scale-90">
                    <i className="fas fa-sync-alt text-sm"></i>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-inner">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/80 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Định danh Cổ đông</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">CCCD</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Tổng Cổ phần</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Trạng thái</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {shareholders.map((sh) => (
                        <tr key={sh._id} className="hover:bg-blue-50/20 transition-all duration-300 group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              {sh.avatar
                                ? <img src={sh.avatar} className="w-11 h-11 rounded-2xl object-cover border border-slate-100 shadow-sm" alt="avatar" />
                                : <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">{sh.fullName?.charAt(0)}</div>
                              }
                              <div>
                                <p className="text-[14px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{sh.fullName}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{sh.phone || 'Chưa có SĐT'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium text-slate-500 font-mono tracking-[0.1em] bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">{sh.cccd}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-black text-blue-700">{(sh.sharesCount || 0).toLocaleString('vi-VN')}</span>
                            <span className="text-[10px] text-slate-400 ml-1">CP</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${sh.status === 'active'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : 'bg-rose-50 text-rose-600 border-rose-100'
                              }`}>
                              <i className={`fas ${sh.status === 'active' ? 'fa-check-circle' : 'fa-ban'} mr-1`}></i>
                              {sh.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {/* Nút Sửa */}
                              <button
                                onClick={() => setEditingShareholderId(sh)}
                                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100 active:scale-95"
                              >
                                <i className="fas fa-edit mr-1"></i> Sửa
                              </button>
                              {/* Nút Khóa/Mở khóa */}
                              <button
                                onClick={() => handleToggleStatus(sh)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border active:scale-95 ${sh.status === 'active'
                                  ? 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-500 hover:text-white'
                                  : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white'
                                  }`}
                              >
                                <i className={`fas ${sh.status === 'active' ? 'fa-lock' : 'fa-unlock'} mr-1`}></i>
                                {sh.status === 'active' ? 'Khóa' : 'Mở'}
                              </button>
                              {/* Nút Reset Pass */}
                              <button
                                onClick={() => handleResetPassword(sh._id)}
                                className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-100 active:scale-95"
                              >
                                <i className="fas fa-key mr-1"></i> Reset
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {shareholders.length === 0 && (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-users text-2xl text-slate-200"></i>
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Chưa có dữ liệu cổ đông</p>
                  </div>
                )}
              </div>

              {/* Phân trang */}
              {shPagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <button
                    disabled={shPagination.page <= 1}
                    onClick={() => fetchShareholders(shPagination.page - 1)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  {Array.from({ length: shPagination.totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => fetchShareholders(p)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${p === shPagination.page
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                    >{p}</button>
                  ))}
                  <button
                    disabled={shPagination.page >= shPagination.totalPages}
                    onClick={() => fetchShareholders(shPagination.page + 1)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          ) : !isLogin && adminTab === 'logs' ? (
            <div className="mt-5 space-y-4 animate-in fade-in zoom-in-95 duration-700 bg-white/80 backdrop-blur-3xl p-5 sm:p-8 rounded-[2.5rem] border border-white shadow-xl">
              {/* Header + Filter */}
              <div className="flex flex-col gap-4 px-2 mb-2 border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Nhật ký Hệ thống</h3>
                    <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-[0.2em] mt-1">
                      Audit Trail · {logPagination.total} bản ghi
                    </p>
                  </div>
                  <button onClick={() => fetchAuditLogs(1)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 hover:text-white hover:bg-blue-600 hover:rotate-180 transition-all duration-700 flex items-center justify-center shadow-sm active:scale-90">
                    <i className="fas fa-sync-alt"></i>
                  </button>
                </div>
                {/* Bộ lọc */}
                <div className="flex flex-wrap gap-3">
                  <select
                    value={logActionFilter}
                    onChange={e => setLogActionFilter(e.target.value)}
                    className="py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 outline-none focus:border-blue-500 shadow-sm"
                  >
                    <option value="">Tất cả hành động</option>
                    <option value="Tạo cổ đông">Tạo cổ đông</option>
                    <option value="Sửa Cổ Đông">Sửa cổ đông</option>
                    <option value="Đặt lại mật khẩu">Reset mật khẩu</option>
                    <option value="Khóa tài khoản">Khóa tài khoản</option>
                    <option value="Mở khóa">Mở khóa tài khoản</option>
                    <option value="Cổ đông đổi mật khẩu">Cổ đông đổi mật khẩu</option>
                    <option value="Đổi mật khẩu lần đầu">Đổi mật khẩu lần đầu</option>
                  </select>
                  <input
                    type="date"
                    value={logDateFrom}
                    onChange={e => setLogDateFrom(e.target.value)}
                    className="py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 outline-none focus:border-blue-500 shadow-sm"
                    placeholder="Từ ngày"
                  />
                  <input
                    type="date"
                    value={logDateTo}
                    onChange={e => setLogDateTo(e.target.value)}
                    className="py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 outline-none focus:border-blue-500 shadow-sm"
                    placeholder="Đến ngày"
                  />
                  {(logActionFilter || logDateFrom || logDateTo) && (
                    <button
                      onClick={() => { setLogActionFilter(''); setLogDateFrom(''); setLogDateTo(''); }}
                      className="py-2.5 px-4 bg-slate-100 text-slate-500 rounded-xl text-[11px] font-black uppercase hover:bg-slate-200 transition-all"
                    >
                      <i className="fas fa-times mr-1"></i> Xóa bộ lọc
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-inner">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Thời gian</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Hành động</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Thực hiện bởi</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Đối tượng</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {auditLogs.map((log) => (
                        <tr key={log._id} className="hover:bg-blue-50/20 transition-all duration-300 group">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900 tracking-tight">{new Date(log.createdAt).toLocaleTimeString('vi-VN')}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{new Date(log.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase border ${log.action === 'CREATE_SHAREHOLDER' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              log.action === 'Làm mới mật khẩu' || log.action === 'CHANGE_PASSWORD_FIRST_LOGIN' || log.action === 'CHANGE_PASSWORD_SELF' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                log.action === 'Khóa tài khoản' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                  log.action === 'Mở khóa tài khoản' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    log.action === 'Cập nhật thông tin cổ đông' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                      'bg-slate-50 text-slate-600 border-slate-100'
                              }`}>{log.action}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-black text-slate-700">{log.adminId?.fullName || log.adminId?.username || '—'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold text-slate-600">{log.targetUserId?.fullName || log.targetUserId?.username || 'Hệ thống'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-w-[180px] truncate text-[10px] text-slate-400 font-mono bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                              {JSON.stringify(log.details)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {auditLogs.length === 0 && (
                  <div className="py-16 text-center">
                    <i className="fas fa-history text-3xl text-slate-200 mb-4 block"></i>
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Không có nhật ký phù hợp</p>
                  </div>
                )}
              </div>

              {/* Phân trang */}
              {logPagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <button disabled={logPagination.page <= 1} onClick={() => fetchAuditLogs(logPagination.page - 1)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all disabled:opacity-30">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  {Array.from({ length: logPagination.totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => fetchAuditLogs(p)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${p === logPagination.page ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}>{p}</button>
                  ))}
                  <button disabled={logPagination.page >= logPagination.totalPages} onClick={() => fetchAuditLogs(logPagination.page + 1)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all disabled:opacity-30">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          ) : isLogin ? (
            <>
              {/* Cột trái: Professional Blue Sidebar */}
              <div className="hidden md:flex flex-col justify-center w-[45%] lg:w-[48%] p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                <div className="relative z-10">
                  <div className="w-16 h-1 bg-white/30 rounded-full mb-8"></div>
                  <h1 className="text-5xl font-black mb-6 leading-[1.1] tracking-tight">
                    EXCEDO <br />
                    <span className="text-3xl font-semibold opacity-80 italic">Shareholder Portal</span>
                  </h1>
                  <p className="text-base text-blue-50/80 mb-12 leading-relaxed font-medium max-w-sm">
                    Hệ thống quản lý cổ phần hiện đại, bảo mật và minh bạch dành cho cổ đông chiến lược của EXCEDO Group.
                  </p>

                  <div className="space-y-4 text-[14px]">
                    {[
                      { icon: 'fa-certificate', text: 'Chứng nhận cổ phần điện tử' },
                      { icon: 'fa-chart-pie', text: 'Báo cáo biến động sở hữu' },
                      { icon: 'fa-shield-alt', text: 'Bảo mật dữ liệu tối đa' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 group/item">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover/item:bg-white/20 transition-all">
                          <i className={`fas ${item.icon} text-white text-xs`}></i>
                        </div>
                        <span className="text-white/80 font-medium group-hover/item:text-white transition-colors">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Bottom Shape */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              {/* Cột phải: Pure White Glass Login Form */}
              <div className="w-full md:w-[55%] lg:w-[52%] p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-[10%] right-[-5%] w-32 h-32 bg-blue-400/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-32 h-32 bg-indigo-400/5 rounded-full blur-2xl"></div>
                <div className="w-full max-w-sm flex flex-col items-center relative z-10">
                  {/* Badge */}
                  <div className="bg-blue-50 px-6 py-2 rounded-full mb-10 border border-blue-100 shadow-sm">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-[10px] font-semibold uppercase tracking-[0.2em]">Cổng định danh Cổ đông</span>
                  </div>

                  <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Chào mừng trở lại</h2>
                  <p className="text-slate-500 text-xs font-semibold mb-10 text-center uppercase tracking-widest opacity-60">Vui lòng xác thực tài khoản</p>

                  <form onSubmit={handleDemoLogin} className="w-full space-y-5">
                    <div className="relative group">
                      <i className="fas fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
                      <input
                        type="text"
                        placeholder="Số CCCD / Định danh (12 số)"
                        className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-sm text-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-semibold"
                        required
                        maxLength={12}
                      />
                    </div>
                    <div className="relative group">
                      <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
                      <input
                        type="password"
                        placeholder="Mật khẩu truy cập"
                        className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-sm text-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-semibold"
                        required
                      />
                    </div>
                    {showForgotPass ? (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 w-full bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                            <i className="fas fa-key text-2xl text-blue-600"></i>
                          </div>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight">Khôi phục mật khẩu</h3>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase mt-2 tracking-widest">Xác minh danh tính cổ đông</p>
                        </div>
                        <div className="space-y-4">
                          <div className="relative group">
                            <i className="fas fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
                            <input
                              type="text"
                              placeholder="Số CCCD / CMND (12 số)"
                              className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-sm text-slate-900 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-300 font-semibold"
                              required
                            />
                          </div>
                          <div className="relative group">
                            <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
                            <input
                              type="text"
                              placeholder="Số điện thoại đã đăng ký"
                              className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-sm text-slate-900 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-300 font-semibold"
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setMessage({ type: 'success', text: 'Yêu cầu đã được gửi! Vui lòng liên hệ Hotline: 400-889-1721 để được hỗ trợ nhanh nhất.' });
                            setShowForgotPass(false);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-semibold text-xs uppercase tracking-widest shadow-md hover:translate-y-[-2px] active:scale-95 transition-all"
                        >
                          Gửi yêu cầu khôi phục
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForgotPass(false)}
                          className="w-full text-blue-600 text-[10px] font-semibold uppercase tracking-widest hover:text-indigo-800 transition-colors mt-2"
                        >
                          Quay lại đăng nhập
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_12px_24px_-6px_rgba(37,99,235,0.3)] hover:shadow-[0_16px_32px_-6px_rgba(37,99,235,0.4)] hover:translate-y-[-2px] active:scale-[0.98] transition-all duration-300 flex justify-center items-center h-[56px] group"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <>
                              Đăng nhập Hệ thống
                              <i className="fas fa-chevron-right ml-3 text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </form>

                  <p
                    onClick={() => setShowForgotPass(true)}
                    className="text-[11px] text-blue-600 font-semibold mt-8 cursor-pointer hover:text-indigo-800 transition-colors tracking-widest uppercase"
                  >
                    Quên mật khẩu truy cập?
                  </p>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleAdminRegister} className="mt-5 space-y-3 animate-in fade-in zoom-in-95 duration-700 bg-white/80 backdrop-blur-3xl p-5 sm:p-8 rounded-[2.5rem] border border-white shadow-xl">

              {/* Header: Thu nhỏ cỡ chữ tiêu đề */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Khởi tạo Cổ đông</h2>
                  <p className="text-slate-500 text-[11px] font-medium italic">Nhập dữ liệu định danh hệ thống</p>
                </div>
                <div className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 text-[9px] font-bold uppercase">
                  Admin Access
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Cột trái: Ảnh chân dung thu nhỏ lại */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="relative group/avatar">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full aspect-square max-w-[120px] mx-auto bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all shadow-inner hover:border-blue-400 group relative"
                    >
                      {formData.avatar ? (
                        <img src={formData.avatar} className="w-full h-full object-cover" alt="Avatar" />
                      ) : (
                        <div className="text-center p-2 group-hover:scale-110 transition-transform">
                          <i className="fas fa-camera text-2xl text-blue-400"></i>
                          <p className="text-[9px] font-semibold text-slate-400 uppercase mt-1">Ảnh 3x4</p>
                        </div>
                      )}
                      {formData.avatar && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="fas fa-edit text-white text-xl"></i>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleImageChange(e, 'avatar')}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>

                  <div className="relative group/cert">
                    <div
                      onClick={() => certFileInputRef.current?.click()}
                      className="w-full aspect-square max-w-[120px] mx-auto bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all shadow-inner hover:border-indigo-400 group relative"
                    >
                      {formData.strategicCertImage ? (
                        <img src={formData.strategicCertImage} className="w-full h-full object-cover" alt="Cert" />
                      ) : (
                        <div className="text-center p-2 group-hover:scale-110 transition-transform">
                          <i className="fas fa-file-contract text-2xl text-indigo-400"></i>
                          <p className="text-[8px] font-semibold text-indigo-400 uppercase mt-1">Ảnh GCN CĐ Chiến lược</p>
                        </div>
                      )}
                      {formData.strategicCertImage && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="fas fa-edit text-white text-xl"></i>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={certFileInputRef}
                      onChange={(e) => handleImageChange(e, 'strategicCertImage')}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>

                  {/* Số điện thoại gọn hơn */}
                  <div className="relative">
                    <label className="text-[9px] font-semibold text-slate-400 uppercase ml-1 mb-1 block">Số điện thoại</label>
                    <input
                      type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 p-2.5 pl-10 rounded-xl text-xs font-semibold outline-none focus:border-blue-500"
                      placeholder="0xxxxxxxxx"
                    />
                    <i className="fas fa-phone-alt absolute left-3 top-[28px] text-slate-400 text-[10px]"></i>
                  </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-[9px] font-semibold text-blue-500 uppercase ml-1 mb-1 block">Số định danh cá nhân / CCCD</label>
                    <input
                      type="text" name="username" value={formData.username} onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-base font-semibold tracking-widest focus:ring-2 focus:ring-blue-500/10 outline-none"
                      maxLength={12}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[9px] font-semibold text-slate-400 uppercase ml-1 mb-1 block">Họ và tên</label>
                    <input
                      type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-semibold text-slate-400 uppercase ml-1 mb-1 block">Ngày sinh</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-xs font-semibold outline-none" />
                  </div>

                  <div>
                    <label className="text-[9px] font-semibold text-slate-400 uppercase ml-1 mb-1 block">Giới tính</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-xs font-semibold outline-none">
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[9px] font-semibold text-blue-500 uppercase ml-1 mb-1 block">Cổ phần Sáng lập</label>
                      <input
                        type="number" name="sharesFounder" value={formData.sharesFounder} onChange={handleInputChange}
                        className="w-full bg-blue-50/30 border border-blue-100 p-2.5 rounded-xl text-sm font-bold text-blue-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-semibold text-indigo-500 uppercase ml-1 mb-1 block">Cổ phần Chiến lược</label>
                      <input
                        type="number" name="sharesStrategic" value={formData.sharesStrategic} onChange={handleInputChange}
                        className="w-full bg-indigo-50/30 border border-indigo-100 p-2.5 rounded-xl text-sm font-bold text-indigo-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-semibold text-slate-500 uppercase ml-1 mb-1 block">Cổ phần Phổ thông</label>
                      <input
                        type="number" name="sharesCommon" value={formData.sharesCommon} onChange={handleInputChange}
                        className="w-full bg-slate-50/30 border border-slate-100 p-2.5 rounded-xl text-sm font-bold text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-[9px] font-semibold text-slate-400 uppercase ml-1 mb-1 block">Ngày cấp CCCD</label>
                    <input
                      type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange}
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-[9px] font-semibold text-slate-400 uppercase ml-1 mb-1 block">Quê quán</label>
                    <input
                      type="text" name="hometown" value={formData.hometown} onChange={handleInputChange}
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-xs font-semibold outline-none"
                      placeholder="Tỉnh/Thành phố"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[9px] font-semibold text-slate-400 uppercase ml-1 mb-1 block">Thường trú</label>
                    <input
                      type="text" name="residence" value={formData.residence} onChange={handleInputChange}
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-xs font-semibold outline-none"
                      placeholder="Địa chỉ cụ thể"
                    />
                  </div>
                </div>
              </div>

              {/* Nút bấm gọn hơn */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <button type="button" className="px-4 py-3 rounded-xl text-[10px] font-semibold uppercase border border-slate-200 text-slate-400">Làm mới</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-lg hover:bg-blue-700 transition-all">
                  Khởi tạo tài khoản
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareholderAuth;
