import React from 'react';

interface ShareCategory {
    label: string;
    sub: string;
    count: number;
    ratio: number;
}

interface OperationalCenterProps {
    sharesCount: number;
    ownershipRatio: number;
    totalValue: number;
    shareCategories: ShareCategory[];
}

const OperationalCenter: React.FC<OperationalCenterProps> = ({
    sharesCount, ownershipRatio, totalValue, shareCategories
}) => {
    return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 mb-10">
            <h2 className="text-2xl font-black text-hlg-blue tracking-tight mb-6">Trung tâm vận hành cổ phần</h2>

            {/* 3 khung tóm tắt */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    {
                        label: "Tổng cổ phần sở hữu",
                        value: sharesCount.toLocaleString("vi-VN"),
                        unit: "cổ phần",
                        icon: "fa-layer-group",
                        color: "text-hlg-blue"
                    },
                    {
                        label: "Tỷ lệ sở hữu",
                        value: parseFloat(ownershipRatio.toFixed(4)).toString(),
                        unit: "%",
                        icon: "fa-chart-pie",
                        color: "text-hlg-blue"
                    },
                    {
                        label: "Tổng giá trị cổ phần",
                        value: totalValue.toLocaleString("vi-VN"),
                        unit: "VNĐ",
                        icon: "fa-coins",
                        color: "text-hlg-blue"
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all">
                        <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wide mb-3">{item.label}</p>
                        <div className="flex items-baseline gap-2">
                            <span className={`${item.color} text-3xl font-bold tabular-nums`}>{item.value}</span>
                            {item.unit && <span className="text-slate-400 text-xs font-medium">{item.unit}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Danh sách cổ phần sở hữu */}
            <div className="bg-slate-50/60 rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="text-base font-black text-hlg-blue">Danh sách cổ phần sở hữu</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {shareCategories.map((cat, i) => (
                        <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white transition-all">
                            <div>
                                <p className="font-semibold text-slate-800 text-sm">{cat.label}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{cat.sub}</p>
                            </div>
                            <span className={`text-lg font-bold tabular-nums ${cat.ratio > 0 ? 'text-hlg-blue' : 'text-slate-300'}`}>
                                {parseFloat(cat.ratio.toFixed(4))} %
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OperationalCenter;
