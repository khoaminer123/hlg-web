import React, { useRef } from 'react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: any;
    setProfile: (profile: any) => void;
    onSave: (e: React.FormEvent) => void;
    editStatus: any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
    isOpen, onClose, profile, setProfile, onSave, editStatus
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 300;
                    const scale = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scale;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
                    setProfile({ ...profile, avatar: compressedDataUrl });
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-4 space-y-2 animate-in zoom-in-95 duration-300">
                <div className="text-center">
                    <h3 className="text-2xl font-black text-hlg-blue">Chỉnh sửa thông tin</h3>
                    <p className="text-slate-400 text-sm mt-1">Cập nhật thông liên lạc và nơi cư trú</p>
                </div>
                <form onSubmit={onSave} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                        <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Ảnh chân dung (3x4)</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-24 h-30 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all hover:border-hlg-blue group relative"
                        >
                            {profile?.avatar ? (
                                <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
                            ) : (
                                <div className="text-center p-4">
                                    <i className="fas fa-camera text-2xl text-slate-300 group-hover:text-hlg-blue transition-colors"></i>
                                    <p className="text-[9px] font-black text-slate-400 uppercase mt-2">Tải ảnh lên</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <i className="fas fa-edit text-white text-xl"></i>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 mb-2 block">Số điện thoại</label>
                            <input
                                type="text"
                                value={profile?.phone || ''}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                placeholder="Nhập số điện thoại"
                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-2 focus:ring-hlg-blue outline-none font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 mb-2 block">Quê quán</label>
                            <input
                                type="text"
                                value={profile?.hometown || ''}
                                onChange={(e) => setProfile({ ...profile, hometown: e.target.value })}
                                placeholder="Tỉnh/Thành phố"
                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-2 focus:ring-hlg-blue outline-none font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 mb-2 block">Thường trú</label>
                            <textarea
                                rows={3}
                                value={profile?.residence || ''}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile({ ...profile, residence: e.target.value })}
                                placeholder="Địa chỉ chi tiết"
                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-2 focus:ring-hlg-blue outline-none font-bold resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={editStatus?.loading}
                            className="flex-1 px-6 py-4 bg-hlg-blue text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#1a2a9b] transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {editStatus?.loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
