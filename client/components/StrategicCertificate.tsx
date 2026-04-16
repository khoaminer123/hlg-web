import React from "react";
import { formatDate } from "../utils/formatters";

interface ProfileData {
    fullName?: string;
    dob?: string;
    cccd?: string;
    expiryDate?: string;
    hometown?: string;
    residence?: string;
    gender?: string;
    sharesCount?: number;
    sharesFounder?: number;
    sharesStrategic?: number;
    sharesCommon?: number;
    createdAt?: string;
    _id?: string;
}

interface StrategicCertificateProps {
    profile?: ProfileData;
}

const StrategicCertificate: React.FC<StrategicCertificateProps> = ({ profile }) => {
    // Dynamic values
    const certNumber = profile?.cccd ? `HLG/035${profile.cccd.slice(-3)}` : "HLG/035063000647-102";
    const name = profile?.fullName || "Bùi Văn Trường";
    
    // Tỷ lệ cổ phần
    const sharesCount = profile?.sharesCount || 0;
    const ratio = sharesCount > 0 ? ((sharesCount / 10000000) * 100).toFixed(2) : "0.01";

    const certDate = profile?.createdAt ? new Date(profile.createdAt) : new Date("2026-04-02");
    const effectiveDateStr = `${String(certDate.getDate()).padStart(2, '0')}/${String(certDate.getMonth() + 1).padStart(2, '0')}/${certDate.getFullYear()}`;
    const signDateStr = `Ngày ${String(certDate.getDate()).padStart(2, '0')} tháng ${String(certDate.getMonth() + 1).padStart(2, '0')} năm ${certDate.getFullYear()}`;

    return (
        <div
            className="flex justify-center mx-auto bg-white rounded-lg p-2"
            style={{ maxWidth: "680px", userSelect: "none" }}
        >
            <div className="relative w-full shadow-md rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100 min-h-[400px] flex flex-col items-center justify-center">
                {profile?.strategicCertImage ? (
                    <img
                        src={profile.strategicCertImage}
                        alt="Strategic Certificate"
                        className="w-full h-auto object-contain block"
                        draggable={false}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4">
                            <i className="fas fa-file-contract text-3xl text-indigo-200"></i>
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 mb-2 tracking-tight">Chưa có Chứng nhận Chiến lược</h3>
                        <p className="text-[13px] font-medium text-slate-500 max-w-sm">Giấy chứng nhận Cổ đông Chiến lược của bạn hiện tại chưa được tải lên hệ thống. Vui lòng liên hệ Admin để được cấp phát.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StrategicCertificate;
