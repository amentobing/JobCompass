import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TopMatchCard({ job, onViewDetails }) {
    return (
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-blue-100/50 border border-blue-50 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-200/50 transition-shadow duration-500">

            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>

            <div className="relative z-10 flex flex-col items-center text-center">

                {/* Header */}
                <div className="w-full">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider antialiased">
                            Top Match
                        </span>

                        <span className="text-slate-500 text-sm font-medium antialiased">
                            {job.location}
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                    </h3>

                    <p className="text-base md:text-lg text-slate-600 font-medium mt-2">
                        {job.company}
                    </p>
                </div>

                {/* Skills */}
                <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100 w-full max-w-4xl mt-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 antialiased text-center">
                        Keahlian yang Sesuai
                    </h4>

                    <div className="flex flex-wrap justify-center gap-4">
                        {job.skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700 antialiased"
                            >
                                <CheckCircle2
                                    size={16}
                                    className="text-blue-500"
                                />
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center pt-6 border-t border-slate-100 mt-6 w-full">
                    <motion.button
                        onClick={() => onViewDetails(job)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-blue-200"
                    >
                        Lihat Detail & Lamar
                        <ArrowRight size={18} />
                    </motion.button>
                </div>

            </div>
        </div>
    );
}