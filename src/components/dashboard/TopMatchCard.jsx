import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TopMatchCard({ job, onViewDetails }) {
    const radius = 85;
    const totalCircumference = 2 * Math.PI * radius;
    const pathCoverageRatio = 0.96;
    const usableCircumference = totalCircumference * pathCoverageRatio;
    const strokeDashoffset = usableCircumference - (usableCircumference * job.score) / 100;

    return (
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-blue-100/50 border border-blue-50 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-200/50 transition-shadow duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">

                <div className="relative flex items-center justify-center w-48 h-48 flex-shrink-0">
                    <svg className="absolute inset-0 w-full h-full transform rotate-[-82.8deg]" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r={radius} fill="transparent" stroke="currentColor" strokeWidth="10" className="text-blue-50" strokeDasharray={`${usableCircumference} ${totalCircumference}`} strokeLinecap="round" />
                        <motion.circle
                            cx="100" cy="100" r={radius} fill="transparent" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${usableCircumference} ${totalCircumference}`}
                            initial={{ strokeDashoffset: usableCircumference }}
                            animate={{ strokeDashoffset: strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                            className="text-blue-600 drop-shadow-md"
                        />
                    </svg>

                    <div className="flex flex-col items-center justify-center bg-white rounded-full w-[136px] h-[136px] shadow-[inset_0px_0px_20px_rgba(37,99,235,0.15)] z-10">
                        <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="text-5xl font-black text-slate-900 tracking-tighter">
                            {job.score}<span className="text-3xl text-blue-600">%</span>
                        </motion.span>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1 antialiased">Akurasi</span>
                    </div>
                </div>

                <div className="flex-grow space-y-6 w-full mt-2 lg:mt-0">

                    {/* Teks diratakan ke tengah pada HP (text-center lg:text-left) */}
                    <div className="text-center lg:text-left">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3">
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider antialiased">Top Match</span>
                            <span className="text-slate-500 text-sm font-medium antialiased">{job.location} • {job.type}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-base md:text-lg text-slate-600 font-medium mt-1">{job.company}</p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 antialiased text-center lg:text-left">Keahlian yang Sesuai</h4>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                            {job.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm font-semibold text-slate-700 antialiased">
                                    <CheckCircle2 size={16} className="text-blue-500" />
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- PERBAIKAN RESPONSIVE LAYOUT UNTUK MOBILE --- */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 md:pt-6 border-t border-slate-100 gap-4">

                        <span className="text-2xl font-bold text-slate-900 tracking-tight text-center sm:text-left">
                            {job.salary}
                        </span>

                        {/* Tombol akan memenuhi lebar layar di HP (w-full) dan menyesuaikan isi di Desktop (sm:w-auto) */}
                        <motion.button
                            onClick={() => onViewDetails(job)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-blue-200"
                        >
                            Lihat Detail & Lamar <ArrowRight size={18} />
                        </motion.button>

                    </div>
                </div>
            </div>
        </div>
    );
}