import React, { useState } from 'react';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu mới và xác nhận không khớp.' });
            return;
        }
        if (form.newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 8 ký tự.' });
            return;
        }
        setLoading(true);
        setMessage(null);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/change-password-self', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Lỗi đổi mật khẩu');
            setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => onClose(), 1500);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const checks = [
        { label: 'Độ dài ≥ 8', ok: form.newPassword.length >= 8 },
        { label: 'Khác mật khẩu cũ', ok: form.newPassword !== form.currentPassword && form.newPassword !== '' },
        { label: 'Khác mặc định', ok: form.newPassword !== '123456' && form.newPassword !== '' },
        { label: 'Trùng khớp', ok: form.newPassword === form.confirmPassword && form.newPassword !== '' },
    ];

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-white">Đổi mật khẩu</h3>
                        <p className="text-blue-200 text-xs mt-1 uppercase tracking-widest">Cập nhật bảo mật tài khoản</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                        <i className="fas fa-times text-sm"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {message && (
                        <div className={`p-4 rounded-2xl text-sm font-semibold flex items-center gap-2 animate-in fade-in ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                            {message.text}
                        </div>
                    )}

                    {[
                        { key: 'currentPassword', label: 'Mật khẩu hiện tại', icon: 'fa-lock', placeholder: 'Nhập mật khẩu đang dùng' },
                        { key: 'newPassword', label: 'Mật khẩu mới', icon: 'fa-key', placeholder: 'Tối thiểu 8 ký tự' },
                        { key: 'confirmPassword', label: 'Xác nhận mật khẩu mới', icon: 'fa-check-circle', placeholder: 'Nhập lại mật khẩu mới' },
                    ].map(field => (
                        <div key={field.key} className="relative group">
                            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">{field.label}</label>
                            <div className="relative">
                                <i className={`fas ${field.icon} absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors`}></i>
                                <input
                                    type="password"
                                    placeholder={field.placeholder}
                                    value={(form as any)[field.key]}
                                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Kiểm tra điều kiện */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <i className="fas fa-shield-alt"></i> Tiêu chuẩn bảo mật
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {checks.map(c => (
                                <span key={c.label} className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all ${c.ok ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                    {c.ok ? '✓ ' : ''}{c.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !checks.every(c => c.ok)}
                            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-200 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><i className="fas fa-lock"></i> Cập nhật</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
