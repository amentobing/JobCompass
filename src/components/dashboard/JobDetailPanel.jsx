import { motion } from "framer-motion";
import { X, MapPin, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";

export default function JobDetailPanel({ job, onClose }) {
    if (!job) return null;

    return (
        // flex items-center justify-center untuk menaruh kotak tepat di tengah layar
        // p-4 memberikan jarak aman dari tepi layar di HP
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            
            {/* Latar Belakang Gelap & Blur (Backdrop) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose} // Jika area luar diklik, panel tertutup
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Box (Kotak Melayang di Tengah) */}
            <motion.div
                // Animasi Scale (Zoom-in) khas Modal
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                // max-h-[90vh] agar kotak tidak lebih tinggi dari layar, rounded-3xl untuk estetika
                className="relative w-full max-w-2xl bg-white max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Header Panel */}
                <div className="bg-white border-b border-slate-100 p-5 md:p-6 flex justify-between items-center z-10 shrink-0">
                    <h2 className="text-lg font-bold text-slate-800">Detail Pekerjaan</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Konten Utama (Bisa di-scroll jika konten panjang) */}
                <div className="p-6 md:p-8 flex-grow overflow-y-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-blue-100 text-blue-700 font-black text-xl px-3 py-1 rounded-lg">
                                {job.score}% Match
                            </span>
                            <span className="text-slate-500 font-medium text-sm">{job.company}</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{job.title}</h1>
                        
                        <div className="flex flex-wrap gap-3">
                            <span className="flex items-center gap-1.5 bg-slate-50 text-slate-600 font-medium text-sm px-4 py-2 rounded-xl border border-slate-200">
                                <MapPin size={16} className="text-blue-500" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-50 text-slate-600 font-medium text-sm px-4 py-2 rounded-xl border border-slate-200">
                                <Briefcase size={16} className="text-blue-500" /> {job.type}
                            </span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Estimasi Gaji</h3>
                        <p className="text-2xl font-bold text-slate-800">{job.salary}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Keahlian Relevan (Dari CV Anda)</h3>
                        {/* Grid disesuaikan menjadi 2 kolom agar lebih rapi di kotak yang lebar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {job.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-3 text-slate-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                                    <span className="font-semibold text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deskripsi Statis */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Deskripsi Peran</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Sebagai {job.title} di {job.company}, Anda akan bertanggung jawab untuk merancang, membangun, dan memelihara sistem berbasis data yang memiliki dampak langsung terhadap keputusan strategis perusahaan.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Kami mencari seseorang yang proaktif, mampu bekerja dalam tim lintas fungsi, dan memiliki gairah yang kuat terhadap inovasi teknologi masa kini.
                        </p>
                    </div>
                </div>

                {/* Footer / Call to Action (Tertahan di bawah) */}
                <div className="bg-white border-t border-slate-100 p-5 md:p-6 shrink-0">
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 hover:-translate-y-1">
                        Kirim Lamaran Sekarang <ArrowRight size={20} />
                    </button>
                </div>

            </motion.div>
        </div>
    );
}