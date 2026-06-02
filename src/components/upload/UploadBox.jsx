import { UploadCloud, FileText, ShieldCheck, CheckCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // <-- Import Framer & AnimatePresence

export default function UploadBox({ onFileSelect, onAnalyze, selectedFile, isAnalyzing }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        // Warna bayangan dan border diselaraskan ke biru (blue)
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-blue-100/50 border border-blue-50 w-full text-center">

            <h2 className="text-3xl md:text-4xl font-black text-blue-950 mb-4">
                Unggah CV Anda
            </h2>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                Sistem berbasis AI kami akan mengekstrak keterampilan dan pengalaman Anda untuk menemukan kecocokan yang tepat.
            </p>

            <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {/* Area Dropzone dengan Animasi Interaktif */}
            <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                whileHover={!selectedFile ? { scale: 1.02 } : {}}
                whileTap={!selectedFile ? { scale: 0.98 } : {}}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer min-h-[280px] overflow-hidden relative ${isDragging
                        ? "border-blue-500 bg-blue-100/50"
                        : selectedFile
                            ? "border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50"
                            : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400"
                    }`}
            >
                {/* AnimatePresence memungkinkan animasi keluar/masuk saat state berubah */}
                <AnimatePresence mode="wait">
                    {selectedFile ? (
                        <motion.div
                            key="file-selected"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="flex flex-col items-center justify-center w-full"
                        >
                            <motion.div
                                initial={{ y: -20 }} animate={{ y: 0 }}
                                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-5"
                            >
                                <CheckCircle className="text-emerald-500" size={32} />
                            </motion.div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 truncate max-w-xs w-full px-4">
                                {selectedFile.name}
                            </h3>
                            <p className="text-sm text-emerald-600 font-bold mb-4">
                                Siap untuk dianalisis
                            </p>
                            <p className="text-xs text-slate-400 font-medium hover:text-slate-600 underline">
                                Klik untuk mengganti file
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file-empty"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center justify-center w-full"
                        >
                            <motion.div
                                animate={isDragging ? { y: [0, -10, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-5"
                            >
                                <UploadCloud className={`size-8 transition-colors ${isDragging ? "text-blue-700" : "text-blue-600"}`} />
                            </motion.div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 transition-colors">
                                {isDragging ? "Lepaskan file di sini..." : "Tarik & Lepas file Anda di sini"}
                            </h3>
                            <p className="text-sm text-slate-500 mb-6 font-medium">
                                atau klik untuk menelusuri dari perangkat Anda
                            </p>
                            <div className="flex gap-3 mb-6">
                                <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                                    <FileText size={14} className="text-slate-400" /> PDF
                                </span>
                            </div>
                            <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">
                                Ukuran file maksimal: 10MB
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Tombol Analisis dengan Animasi Framer */}
            <motion.button
                onClick={onAnalyze}
                disabled={!selectedFile || isAnalyzing}
                whileHover={(!selectedFile || isAnalyzing) ? {} : { scale: 1.02, y: -2 }}
                whileTap={(!selectedFile || isAnalyzing) ? {} : { scale: 0.98 }}
                className={`w-full mt-8 font-black py-4 rounded-xl shadow-lg transition-colors text-lg flex justify-center items-center gap-2 ${!selectedFile
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                        : isAnalyzing
                            ? "bg-blue-400 text-white cursor-wait"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
                    }`}
            >
                {isAnalyzing ? (
                    <>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                            <Loader2 size={24} />
                        </motion.div>
                        Menganalisis CV...
                    </>
                ) : (
                    "Analisis CV Saya"
                )}
            </motion.button>

            <div className="mt-6 bg-slate-50 rounded-xl p-4 flex items-start text-left gap-3 border border-slate-100">
                <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    <strong className="text-slate-700 font-bold">Privacy Assurance:</strong> Dokumen Anda dienkripsi secara aman dan tidak pernah dibagikan tanpa persetujuan.
                </p>
            </div>
        </div>
    );
}