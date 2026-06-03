import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText, CheckCircle, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

// --- VARIANTS ANIMASI ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const floatingCard1 = {
    animate: {
        y: [0, -10, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
};

const floatingCard2 = {
    animate: {
        y: [0, -15, 0],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
    }
};

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        // Ditambahkan pt-28 untuk mengakali Navbar yang fixed agar tidak menabrak teks di HP
        <section className="relative min-h-[85vh] flex items-center px-6 lg:px-16 pt-28 pb-12 lg:py-0 overflow-hidden bg-white">
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >

                {/* --- BAGIAN KIRI: TEKS & CALL TO ACTION --- */}
                {/* Diubah dari text-left menjadi: text-center di layar kecil/medium, lg:text-left di layar besar */}
                <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                    <motion.h1 variants={slideUp} className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6">
                        Dinilai dari Keahlian, <br className="hidden sm:block lg:hidden" /> {/* Br trick agar di tablet lebih rapi */}
                        <span className="text-blue-600">Bukan Format CV.</span>
                    </motion.h1>

                    <motion.p variants={slideUp} className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
                        JobCompass menggunakan pemrosesan bahasa alami (NLP) untuk menganalisis kedalaman pengalaman Anda, bukan hanya sekadar mencocokkan kata kunci di CV.
                    </motion.p>

                    {/* Diubah untuk rata tengah di HP/Tablet, dan rata kiri di Desktop */}
                    <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
                        <motion.button
                            onClick={() => navigate("/upload")}
                            whileHover={{ scale: 1.05, y: -2, transition: { ease: "linear", duration: 0.1 } }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-colors shadow-md shadow-blue-200 w-full sm:w-auto"
                        >
                            Unggah CV Sekarang
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                </div>

                {/* --- BAGIAN KANAN: ASYMMETRICAL VISUAL MOCKUP --- */}
                {/* Bagian ini tetap disembunyikan (hidden) di layar kecil/medium, dan muncul (lg:block) di layar besar */}
                <motion.div variants={slideUp} className="relative hidden lg:block h-full min-h-[550px] w-full">
                    
                    {/* Floating Card 1: CV Processing */}
                    <motion.div
                        variants={floatingCard1}
                        animate="animate"
                        whileHover={{ scale: 1.05, transition: { ease: "linear", duration: 0.1 } }}
                        className="absolute top-16 left-0 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-10 w-80 group cursor-pointer"
                    >
                        <style>{`.group:hover .icon-target { color: #2563eb !important; transition: color 0.15s ease-in-out; }`}</style>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <FileText className="text-blue-600 icon-target" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Data_Scientist_CV.pdf</p>
                                <p className="text-xs text-slate-500 font-medium">Memproses semantik...</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
                                    className="h-full bg-blue-500"
                                ></motion.div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <span>Ekstraksi Entitas</span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 3.5 }}
                                    className="text-blue-600"
                                >
                                    Selesai
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Card 2: Match Result */}
                    <motion.div
                        variants={floatingCard2}
                        animate="animate"
                        whileHover={{ scale: 1.05, transition: { ease: "linear", duration: 0.1 } }}
                        className="absolute bottom-20 right-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 w-[340px] z-20 group cursor-pointer"
                    >
                        <style>{`.group:hover .icon-target { color: #2563eb !important; transition: color 0.15s ease-in-out; }`}</style>

                        <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <BarChart3 size={18} className="text-slate-400 icon-target" />
                                <p className="text-xs font-bold text-slate-500">ANALISIS KECOCOKAN</p>
                            </div>
                            <CheckCircle size={18} className="text-green-500" />
                        </div>

                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-lg font-extrabold text-slate-900">Machine Learning Eng.</p>
                                <p className="text-sm text-slate-500 font-medium">TechCorp Global</p>
                            </div>
                            <div className="bg-blue-50 text-blue-700 font-black text-xl px-3 py-1 rounded-lg">
                                96%
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-bold">Python</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-bold">TensorFlow</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-md text-xs font-bold">Highly Relevant</span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}