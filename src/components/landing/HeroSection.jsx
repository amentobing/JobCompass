import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText, CheckCircle, BarChart3 } from "lucide-react";

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[85vh] flex items-center px-6 lg:px-16 py-12 lg:py-0 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                
                {/* --- BAGIAN KIRI: TEKS & CALL TO ACTION --- */}
                <div className="text-left z-10">
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6">
                        Dinilai dari Keahlian, <br />
                        <span className="text-blue-600">Bukan Format CV.</span>
                    </h1>
                    
                    <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
                        JobCompass menggunakan pemrosesan bahasa alami (NLP) untuk menganalisis kedalaman pengalaman Anda, bukan hanya sekadar mencocokkan kata kunci di CV.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => navigate("/upload")} 
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-sm"
                        >
                            Unggah CV Sekarang 
                            <ArrowRight size={20} />
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-lg font-bold transition-all">
                            Lihat Cara Kerja
                        </button>
                    </div>
                </div>

                {/* --- BAGIAN KANAN: ASYMMETRICAL VISUAL MOCKUP --- */}
                <div className="relative hidden lg:block h-full min-h-[550px] w-full">
                    
                    {/* Background Shape */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-slate-50 rounded-l-[100px] -z-10 border border-slate-100"></div>

                    {/* Floating Card 1: CV Processing */}
                    <div className="absolute top-16 left-0 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-10 w-80 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <FileText className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Data_Scientist_CV.pdf</p>
                                <p className="text-xs text-slate-500 font-medium">Memproses semantik...</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[100%]"></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <span>Ekstraksi Entitas</span>
                                <span className="text-blue-600">Selesai</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 2: Match Result */}
                    <div className="absolute bottom-20 right-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 w-[340px] z-20">
                        <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <BarChart3 size={18} className="text-slate-400" />
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
                    </div>
                </div>
            </div>
        </section>
    );
}