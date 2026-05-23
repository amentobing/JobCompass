import { Target, Briefcase, Globe, Cpu } from "lucide-react";

const stats = [
    { title: "HIGHEST SCORE", value: "87%", desc: "Top Tier", icon: <Target className="text-indigo-600" size={24} /> },
    { title: "TOTAL JOBS", value: "24", desc: "Active", icon: <Briefcase className="text-indigo-600" size={24} /> },
    { title: "PLATFORMS", value: "3", icon: <Globe className="text-indigo-600" size={24} />, desc: "Aggregated" },
    { title: "AVG SKILLS", value: "6.5", icon: <Cpu className="text-indigo-600" size={24} />, desc: "Per role" },
];

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-50 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 border border-indigo-100">
                        {item.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                        {item.title}
                    </p>
                    <div className="flex items-end gap-2 mt-2">
                        <h2 className="text-3xl font-black text-indigo-950 leading-none">
                            {item.value}
                        </h2>
                        <span className="text-xs text-slate-500 font-bold mb-1">
                            {item.desc}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}