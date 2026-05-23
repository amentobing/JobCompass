import { UploadCloud, FileText, ShieldCheck, CheckCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

export default function UploadBox({ onFileSelect, onAnalyze, selectedFile, isAnalyzing }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Event handlers untuk Drag & Drop
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
            onFileSelect(e.dataTransfer.files);
        }
    };

    // Event handler untuk klik manual
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-indigo-100/50 border border-indigo-50 max-w-2xl w-full text-center animate-fade-in-up">
            
            <h2 className="text-3xl md:text-4xl font-black text-indigo-950 mb-4">
                Unggah CV Anda
            </h2>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                Sistem berbasis AI kami akan mengekstrak keterampilan dan pengalaman Anda untuk menemukan kecocokan yang tepat.
            </p>

            {/* Input file asli disembunyikan */}
            <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {/* Area Dropzone Interaktif */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer group ${
                    isDragging
                        ? "border-indigo-500 bg-indigo-100/50 scale-[1.02]" // Saat file diseret di atasnya
                        : selectedFile
                        ? "border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50" // Saat file sudah terpilih
                        : "border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-400" // Kondisi normal
                }`}
            >
                {/* Tampilan berubah secara dinamis berdasarkan state selectedFile */}
                {selectedFile ? (
                    <>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-5">
                            <CheckCircle className="text-emerald-500" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 truncate max-w-xs">
                            {selectedFile.name}
                        </h3>
                        <p className="text-sm text-emerald-600 font-bold">
                            Siap untuk dianalisis
                        </p>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-5 group-hover:scale-110 group-hover:shadow-md transition-transform">
                            <UploadCloud className={`size-8 ${isDragging ? "text-indigo-700" : "text-indigo-600"}`} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                            {isDragging ? "Lepaskan file di sini..." : "Tarik & Lepas file Anda di sini"}
                        </h3>
                        <p className="text-sm text-slate-500 mb-6 font-medium">
                            atau klik untuk menelusuri dari perangkat Anda
                        </p>
                        <div className="flex gap-3 mb-6">
                            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                                <FileText size={14} className="text-slate-400" /> PDF
                            </span>
                            {/* <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                                <FileText size={14} className="text-slate-400" /> DOCX
                            </span> */}
                        </div>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                            Ukuran file maksimal: 10MB
                        </p>
                    </>
                )}
            </div>

            {/* Tombol Analisis Dinamis */}
            <button
                onClick={onAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className={`w-full mt-8 font-black py-4 rounded-xl shadow-lg transition-all text-lg flex justify-center items-center gap-2 ${
                    !selectedFile
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                        : isAnalyzing
                        ? "bg-indigo-400 text-white cursor-wait"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:-translate-y-1"
                }`}
            >
                {isAnalyzing ? (
                    <>
                        <Loader2 className="animate-spin" size={24} />
                        Menganalisis CV...
                    </>
                ) : (
                    "Analisis CV Saya"
                )}
            </button>

            <div className="mt-6 bg-slate-50 rounded-xl p-4 flex items-start text-left gap-3 border border-slate-100">
                <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    <strong className="text-slate-700 font-bold">Privacy Assurance:</strong> Dokumen Anda dienkripsi secara aman dan tidak pernah dibagikan tanpa persetujuan.
                </p>
            </div>
            
        </div>
    );
}