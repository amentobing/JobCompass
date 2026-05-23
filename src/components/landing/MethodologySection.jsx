import { UploadCloud, BrainCircuit, Send } from "lucide-react";

const methods = [
    { 
        icon: <UploadCloud className="text-indigo-600" size={28} />,
        title: "Unggah CV Anda", 
        description: "Masukkan dokumen CV dalam format PDF. Sistem kami akan langsung mengekstrak seluruh pengalaman dan keahlian Anda secara otomatis." 
    },
    { 
        icon: <BrainCircuit className="text-indigo-600" size={28} />,
        title: "Analisis AI", 
        description: "Lebih dari sekadar mencocokkan keyword. Algoritma kami mencocokkan makna dari pengalaman Anda dengan kebutuhan spesifik industri." 
    },
    { 
        icon: <Send className="text-indigo-600" size={28} />,
        title: "Temukan Job Impian Anda", 
        description: "Dapatkan daftar lowongan yang paling relevan dengan profil Anda, lengkap dengan persentase kecocokan yang akurat dan transparan." 
    },
];

export default function MethodologySection() {
    return (
        <section className="py-24 px-6 bg-indigo-50"> 
            <div className="max-w-7xl mx-auto">
                
                {/* --- HEADER TENGAH --- */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        Cara Kerja <span className="text-indigo-600">JobCompass.</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                        Tiga langkah cepat menuju karir impian. Tanpa filter kaku, murni berbasis keahlian.
                    </p>
                </div>
``
                {/* --- KARTU HORIZONTAL --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {methods.map((item, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
                            
                            {/* Wadah Ikon (Sesuai Referensi Foto Kedua) */}
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 shadow-sm">
                                {item.icon}
                            </div>
                            
                            <h3 className="text-xl font-black text-slate-900 mb-4">
                                {item.title}
                            </h3>
                            
                            <p className="text-slate-600 leading-relaxed font-medium text-sm">
                                {item.description}
                            </p>
                            
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
}