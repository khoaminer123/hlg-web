import React from 'react';

interface StatItem {
    label: string;
    value: string;
    unit: string;
    color: string;
    text: string;
}

interface StatsOverviewProps {
    stats: StatItem[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`${stat.color} p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col justify-between group hover:translate-y-[-4px] transition-all duration-300`}>
                        <p className={`${stat.text === 'text-white' ? 'text-white/60' : 'text-slate-400'} text-[11px] font-semibold uppercase tracking-wide`}>{stat.label}</p>
                        <div className="flex items-baseline gap-2 mt-4">
                            <h2 className={`${stat.text} text-4xl font-bold leading-none tabular-nums`}>{stat.value}</h2>
                            <span className={`${stat.text === 'text-white' ? 'text-white/40' : 'text-slate-300'} text-xs font-medium uppercase`}>{stat.unit}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsOverview;
