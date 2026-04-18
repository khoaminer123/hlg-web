import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface AdminEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    shareholder: any;
    onSaved: (updatedUser: any) => void;
}

const AdminEditModal: React.FC<AdminEditModalProps> = ({ isOpen, onClose, shareholder, onSaved }) => {
    const [form, setForm] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (shareholder) {
            setForm({
                fullName: shareholder.fullName || '',
                phone: shareholder.phone || '',
                hometown: shareholder.hometown || '',
                residence: shareholder.residence || '',
                gender: shareholder.gender || 'Nam',
                sharesFounder: shareholder.sharesFounder || 0,
                sharesStrategic: shareholder.sharesStrategic || 0,
                sharesCommon: shareholder.sharesCommon || 0,
                strategicCertImage: shareholder.strategicCertImage || '',
            });
            setMessage(null);
        }
    }, [shareholder]);

    const certFileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 800; // Giảm thêm để vượt qua giới hạn 1MB của Nginx
                    const scale = MAX_WIDTH > img.width ? 1 : MAX_WIDTH / img.width;
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6); // Giảm chất lượng hơn nữa để đảm bảo dung lượng thấp
                    setForm((prev: any) => ({ ...prev, strategicCertImage: compressedDataUrl }));
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    // Lock scroll trang nền
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/users/${shareholder._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...form,
                    sharesFounder: Number(form.sharesFounder),
                    sharesStrategic: Number(form.sharesStrategic),
                    sharesCommon: Number(form.sharesCommon),
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Lỗi cập nhật');
            setMessage({ type: 'success', text: 'Cập nhật thành công!' });
            onSaved(data.user);
            setTimeout(() => onClose(), 5000);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !shareholder) return null;

    return createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>

            {/* BACKDROP */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15, 23, 60, 0.65)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
                onClick={onClose}
            />

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                background: '#ffffff',
                borderRadius: '2rem',
                boxShadow: '0 40px 100px -12px rgba(20, 32, 119, 0.40), 0 0 0 1px rgba(20,32,119,0.06)',
                overflow: 'hidden',
                margin: '0 16px',
            }}>

                <div style={{
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, #142077 0%, #2539cc 100%)',
                    padding: '20px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div>
                        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '17px', margin: 0 }}>
                            Chỉnh sửa Cổ đông
                        </h3>
                        <p style={{ color: 'rgba(199,210,254,0.85)', fontSize: '12px', margin: '3px 0 0', fontWeight: 500 }}>
                            {shareholder.fullName}&nbsp;&nbsp;·&nbsp;&nbsp;CCCD: {shareholder.cccd}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* ── BODY (scroll) ────────────────────────── */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 8px' }}>

                    {/* Thông báo */}
                    {message && (
                        <div className={`mb-5 p-4 rounded-2xl text-sm font-semibold flex items-center gap-3 border ${message.type === 'success'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-base`}></i>
                            {message.text}
                        </div>
                    )}

                    {/* HÌNH ẢNH CHỨNG NHẬN */}
                    <div className="flex items-center gap-4 mb-6 mt-2">
                        <div className="relative group/cert shrink-0">
                            <div
                                onClick={() => certFileInputRef.current?.click()}
                                className="w-24 h-24 bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all hover:border-indigo-400 group relative"
                            >
                                {form.strategicCertImage ? (
                                    <img src={form.strategicCertImage} className="w-full h-full object-cover" alt="Cert" />
                                ) : (
                                    <div className="text-center p-2 group-hover:scale-110 transition-transform">
                                        <i className="fas fa-file-contract text-2xl text-indigo-400"></i>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <i className="fas fa-edit text-white"></i>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={certFileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-[#142077] uppercase tracking-wide">
                                Giấy chứng nhận Chiến lược
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">
                                Click vào khung trái để tải lên ảnh mới nhất. (Nên là ảnh tỉ lệ dọc hoặc vuông).
                            </p>
                        </div>
                    </div>

                    {/* THÔNG TIN CÁ NHÂN */}
                    <p className="text-[11px] font-semibold text-[#142077] uppercase tracking-wide mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center">
                            <i className="fas fa-user text-[9px] text-[#142077]"></i>
                        </span>
                        Thông tin cá nhân
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="col-span-2">
                            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">Họ và tên</label>
                            <input
                                type="text"
                                value={form.fullName}
                                onChange={e => setForm({ ...form, fullName: e.target.value.toUpperCase() })}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">Số điện thoại</label>
                            <input
                                type="text"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">Giới tính</label>
                            <select
                                value={form.gender}
                                onChange={e => setForm({ ...form, gender: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                            >
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">Quê quán</label>
                            <input
                                type="text"
                                value={form.hometown}
                                onChange={e => setForm({ ...form, hometown: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">Thường trú</label>
                            <input
                                type="text"
                                value={form.residence}
                                onChange={e => setForm({ ...form, residence: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* PHÂN BỔ CỔ PHẦN */}
                    <p className="text-[11px] font-semibold text-[#142077] uppercase tracking-wide mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center">
                            <i className="fas fa-chart-pie text-[9px] text-[#142077]"></i>
                        </span>
                        Phân bổ Cổ phần
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                            { key: 'sharesFounder', label: 'Sáng lập', bg: 'bg-gradient-to-b from-blue-50 to-indigo-50 border-blue-100' },
                            { key: 'sharesStrategic', label: 'Chiến lược', bg: 'bg-gradient-to-b from-violet-50 to-purple-50 border-violet-100' },
                            { key: 'sharesCommon', label: 'Phổ thông', bg: 'bg-gradient-to-b from-sky-50 to-cyan-50 border-sky-100' },
                        ].map(item => (
                            <div key={item.key} className={`${item.bg} rounded-2xl p-4 border`}>
                                <label className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide mb-2.5 block text-center">{item.label}</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={form[item.key]}
                                    onChange={e => setForm({ ...form, [item.key]: e.target.value })}
                                    className="w-full bg-white border border-slate-200 py-2.5 rounded-xl text-xl font-bold text-[#142077] outline-none focus:border-blue-500 transition-all text-center tabular-nums"
                                />
                                <p className="text-[9px] text-slate-400 text-center mt-1.5 font-medium">cổ phần</p>
                            </div>
                        ))}
                    </div>

                    {/* Tổng live */}
                    <div className="bg-slate-50 rounded-2xl px-5 py-3.5 border border-slate-100 flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-xs text-slate-500 font-semibold">Tổng cổ phần sau khi lưu</span>
                        </div>
                        <span className="text-xl font-bold text-[#142077] tabular-nums">
                            {(Number(form.sharesFounder || 0) + Number(form.sharesStrategic || 0) + Number(form.sharesCommon || 0)).toLocaleString('vi-VN')}
                            <span className="text-sm font-medium text-slate-400 ml-1">CP</span>
                        </span>
                    </div>
                </div>

                {/* ── FOOTER (cố định) ─────────────────────── */}
                <div style={{
                    flexShrink: 0,
                    padding: '16px 28px 20px',
                    borderTop: '1px solid #f1f5f9',
                    background: '#fff',
                    display: 'flex',
                    gap: '12px',
                }}>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all active:scale-95"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleSubmit()}
                        className="flex-[2] py-3.5 bg-gradient-to-r from-[#142077] to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-200/60 hover:shadow-blue-300/80 hover:-translate-y-0.5 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading
                            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Đang lưu...</>
                            : <><i className="fas fa-save text-sm"></i> Lưu thay đổi</>
                        }
                    </button>
                </div>
            </div>
        </div>,
        document.body   // ← Render thoát khỏi mọi stacking context
    );
};

export default AdminEditModal;
