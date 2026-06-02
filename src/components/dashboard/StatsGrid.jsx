import { Target, Briefcase, Cpu } from "lucide-react";

// Sekarang komponen ini menerima properti topScore dan totalJobs
export default function StatsGrid({ topScore = 0, totalJobs = 0 }) {
    
    const stats = [
        {
            id: 1,
            label: "SKOR TERTINGGI",
            value: `${topScore}%`, // Menggunakan data asli
            subtext: "Top Match",
            icon: Target,
        },
        {
            id: 2,
            label: "TOTAL LOWONGAN",
            value: totalJobs, // Menggunakan data asli
            subtext: "Ditemukan",
            icon: Briefcase,
        },
        {
            id: 3,
            label: "ANALISIS AI",
            value: "NLP", 
            subtext: "Semantic",
            icon: Cpu,
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
                <div 
                    key={stat.id} 
                    className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                        <stat.icon className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">
                            {stat.label}
                        </h4>
                        <div className="flex items-baseline gap-1.5 md:gap-2">
                            <span className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-xs md:text-sm font-semibold text-slate-500">
                                {stat.subtext}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}