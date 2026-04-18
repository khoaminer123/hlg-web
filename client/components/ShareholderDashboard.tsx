import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useShareholder } from "../hooks/useShareholder";
import ShareCertificate from "./ShareCertificate";
import StrategicCertificate from "./StrategicCertificate";

import ProfileCard from "./shareholder/ProfileCard";
import StatsOverview from "./shareholder/StatsOverview";
import OperationalCenter from "./shareholder/OperationalCenter";
import EditProfileModal from "./shareholder/EditProfileModal";
import ChangePasswordModal from "./shareholder/ChangePasswordModal";

const TOTAL_SHARES = 10000000;

type DashboardTab = 'overview' | 'certificate';
type CertSubTab = 'ownership' | 'strategic';

const ShareholderDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { profile, stockPrice, loading, updateProfile, refresh } = useShareholder();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [editStatus, setEditStatus] = useState<any>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [certSubTab, setCertSubTab] = useState<CertSubTab>('ownership');

  useEffect(() => {
    if (profile) {
      setEditForm({ ...profile });
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditStatus({ loading: true });
    try {
      await updateProfile({
        phone: editForm.phone,
        hometown: editForm.hometown,
        residence: editForm.residence,
        avatar: editForm.avatar
      });
      setIsEditing(false);
      setEditStatus({ success: true });
      setTimeout(() => setEditStatus(null), 5000);
    } catch (err: any) {
      setEditStatus({ error: err.message });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-[150px]">
      <div className="w-12 h-12 border-4 border-hlg-blue/20 border-t-hlg-blue rounded-full animate-spin"></div>
    </div>
  );

  const sharesCount = profile?.sharesCount || 0;
  const ownershipRatio = TOTAL_SHARES > 0 ? ((sharesCount / TOTAL_SHARES) * 100) : 0;
  const totalValue = sharesCount * stockPrice;

  const shareCategories = [
    {
      label: "Cổ phần sáng lập trung tâm vận hành",
      sub: `Số cổ phần: ${(profile?.sharesFounder || 0).toLocaleString("vi-VN")}`,
      count: profile?.sharesFounder || 0,
      ratio: TOTAL_SHARES > 0 ? ((profile?.sharesFounder || 0) / TOTAL_SHARES) * 100 : 0
    },
    {
      label: "Cổ phần cổ đông chiến lược",
      sub: `Số cổ phần: ${(profile?.sharesStrategic || 0).toLocaleString("vi-VN")}`,
      count: profile?.sharesStrategic || 0,
      ratio: TOTAL_SHARES > 0 ? ((profile?.sharesStrategic || 0) / TOTAL_SHARES) * 100 : 0
    },
    {
      label: "Cổ phần phổ thông",
      sub: `Số cổ phần: ${(profile?.sharesCommon || 0).toLocaleString("vi-VN")}`,
      count: profile?.sharesCommon || 0,
      ratio: TOTAL_SHARES > 0 ? ((profile?.sharesCommon || 0) / TOTAL_SHARES) * 100 : 0
    }
  ];

  const mainStats = [
    { label: 'Tổng số cổ phần', value: sharesCount.toLocaleString("vi-VN"), unit: 'CP', color: 'bg-white', text: 'text-hlg-blue' },
    { label: 'Giá trị ước tính', value: totalValue.toLocaleString("vi-VN"), unit: 'VNĐ', color: 'bg-hlg-blue', text: 'text-white' },
  ];

  const tabs: { key: DashboardTab; label: string; icon: string }[] = [
    { key: 'overview', label: 'Tổng quan', icon: 'fa-home' },
    { key: 'certificate', label: 'Giấy chứng nhận', icon: 'fa-certificate' },
  ];

  const certSubTabs: { key: CertSubTab; label: string; icon: string; desc: string }[] = [
    { key: 'ownership', label: 'Giấy CN Sở Hữu Cổ Phần', icon: 'fa-file-alt', desc: 'Giấy chứng nhận sở hữu cổ phần chính thức' },
    { key: 'strategic', label: 'Giấy CN Cổ Đông Chiến Lược', icon: 'fa-award', desc: 'Giấy chứng nhận cổ đông chiến lược HLG' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 pt-[150px] animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-hlg-blue tracking-tight">Hồ sơ Cổ đông</h1>
          <p className="text-slate-500 font-medium mt-1 text-xs tracking-wide">Trung tâm quản lý quyền sở hữu cổ phần HLG</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {editStatus?.success && (
            <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 animate-in fade-in duration-300">
              <i className="fas fa-check-circle"></i> Cập nhật thành công
            </span>
          )}
          <button
            onClick={() => setIsChangingPassword(true)}
            className="bg-white border border-slate-200 text-slate-700 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95 flex items-center gap-2"
          >
            <i className="fas fa-lock text-[8px]"></i> Đổi mật khẩu
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-hlg-blue text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1a2a9b] transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center gap-2"
          >
            <i className="fas fa-edit text-[8px]"></i> Cập nhật thông tin
          </button>
          <button
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
                logout();
                window.location.href = "/shareholder";
              }
            }}
            className="bg-white text-rose-600 border border-rose-100 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all shadow-sm active:scale-95 flex items-center gap-2"
          >
            <i className="fas fa-sign-out-alt text-[8px]"></i> Đăng xuất
          </button>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      <ChangePasswordModal
        isOpen={isChangingPassword}
        onClose={() => setIsChangingPassword(false)}
      />

      {/* EDIT MODAL */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        profile={editForm}
        setProfile={setEditForm}
        onSave={handleUpdateProfile}
        editStatus={editStatus}
      />

      {/* MAIN TAB NAVIGATION */}
      <div className="flex bg-slate-100/70 backdrop-blur-sm p-1.5 rounded-2xl mb-8 w-fit border border-white shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-8 py-3 rounded-xl font-semibold text-[11px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2.5 ${activeTab === tab.key
              ? 'bg-white text-hlg-blue shadow-md scale-[1.02]'
              : 'text-slate-500 hover:text-hlg-blue hover:bg-white/60'
              }`}
          >
            <i className={`fas ${tab.icon} text-[10px]`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'overview' && (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">
          {/* CCCD + STATS SECTION */}
          <div className="grid lg:grid-cols-5 gap-8 mb-10">
            <div className="lg:col-span-3">
              <ProfileCard profile={profile} />
            </div>
            <StatsOverview stats={mainStats} />
          </div>

          {/* OPERATIONAL CENTER */}
          <OperationalCenter
            sharesCount={sharesCount}
            ownershipRatio={ownershipRatio}
            totalValue={totalValue}
            shareCategories={shareCategories}
          />
        </div>
      )}

      {activeTab === 'certificate' && (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">

          {/* CERTIFICATE SUB-TAB SELECTOR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {certSubTabs.map((sub) => (
              <button
                key={sub.key}
                onClick={() => setCertSubTab(sub.key)}
                className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${certSubTab === sub.key
                  ? 'border-hlg-blue bg-hlg-blue text-white shadow-lg shadow-blue-200 scale-[1.01]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-hlg-blue/40 hover:bg-blue-50/30'
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${certSubTab === sub.key ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-blue-100'
                    }`}
                >
                  <i
                    className={`fas ${sub.icon} text-lg transition-all ${certSubTab === sub.key ? 'text-white' : 'text-hlg-blue'
                      }`}
                  ></i>
                </div>
                <div>
                  <p
                    className={`font-black text-[12px] uppercase tracking-wider mb-1 ${certSubTab === sub.key ? 'text-white' : 'text-slate-800'
                      }`}
                  >
                    {sub.label}
                  </p>
                  <p
                    className={`text-[11px] font-medium ${certSubTab === sub.key ? 'text-white/70' : 'text-slate-400'
                      }`}
                  >
                    {sub.desc}
                  </p>
                </div>
                {certSubTab === sub.key && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-[9px]"></i>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* CERTIFICATE CONTENT */}
          <div className="animate-in fade-in duration-300">
            {certSubTab === 'ownership' && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="w-1 h-6 bg-hlg-blue rounded-full"></div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Giấy Chứng Nhận Sở Hữu Cổ Phần</h2>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">Tự động cập nhật từ thông tin tài khoản</p>
                  </div>
                </div>
                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                  <ShareCertificate profile={profile} faceValue={stockPrice} />
                </div>
              </div>
            )}

            {certSubTab === 'strategic' && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full" style={{ background: "#8B1A1A" }}></div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Giấy Chứng Nhận Cổ Đông Chiến Lược</h2>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">Cổ đông chiến lược Công ty Công nghệ HLG Việt Nam</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden p-6">
                  <StrategicCertificate profile={profile} />
                </div>
              </div>
            )}
          </div>

          {/* Print hint */}
          <div className="mt-4 flex items-center gap-2 text-slate-400 text-[11px]">
            <i className="fas fa-info-circle text-blue-400"></i>
            <span>Để in giấy chứng nhận, nhấn <kbd className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[10px]">Ctrl+P</kbd> hoặc sử dụng tính năng in của trình duyệt.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareholderDashboard;