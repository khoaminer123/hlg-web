import React from 'react';

interface ProfileCardProps {
    profile: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    return (
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#142077] to-indigo-600 p-[2px] shadow-2xl shadow-indigo-200">
            <div className="bg-white/95 backdrop-blur-md px-10 py-12 rounded-[2.4rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="relative flex flex-col md:flex-row gap-8">
                    {/* Photo */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-44 h-56 rounded-3xl overflow-hidden shadow-inner bg-slate-100 border-4 border-white ring-1 ring-slate-100 p-0.5">
                            {profile?.avatar ? (
                                <img src={profile.avatar} className="w-full h-full object-cover" alt="CCCD Photo" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <i className="fas fa-user text-6xl"></i>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-grow space-y-5">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <div className="col-span-2">
                                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wide">Số định danh cá nhân / ID No.</span>
                                <p className="text-2xl font-bold text-hlg-blue leading-tight tracking-tight mt-0.5">{profile?.cccd}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wide">Họ và tên / Full name</span>
                                <p className="text-xl font-bold text-hlg-blue uppercase leading-tight mt-0.5">{profile?.fullName}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wide">Ngày sinh / Date of birth</span>
                                <p className="text-sm font-medium text-slate-700 mt-0.5">{profile?.dob ? new Date(profile.dob).toLocaleDateString('vi-VN') : '—'}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wide">Giới tính / Sex</span>
                                <p className="text-sm font-medium text-slate-700 mt-0.5">{profile?.gender}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wide">Quê quán / Place of origin</span>
                                <p className="text-sm font-medium text-slate-700 mt-0.5">{profile?.hometown}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wide">Thường trú / Place of residence</span>
                                <p className="text-sm font-medium text-slate-700 mt-0.5 leading-relaxed">{profile?.residence}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
