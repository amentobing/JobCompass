import { UploadCloud, BrainCircuit, Send } from "lucide-react";
import { motion } from "framer-motion";

const methods = [
    {
        icon: <UploadCloud size={28} />,
        title: "Unggah CV Anda",
        description: "Masukkan dokumen CV dalam format PDF. Sistem kami akan langsung mengekstrak seluruh pengalaman dan keahlian Anda secara otomatis."
    },
    {
        icon: <BrainCircuit size={28} />,
        title: "Analisis AI",
        description: "Lebih dari sekadar mencocokkan keyword. Algoritma kami mencocokkan makna dari pengalaman Anda dengan kebutuhan spesifik industri."
    },
    {
        icon: <Send size={28} />,
        title: "Temukan Job Impian Anda",
        description: "Dapatkan daftar lowongan yang paling relevan dengan profil Anda, lengkap dengan persentase kecocokan yang akurat dan transparan."
    },
];

// Resep Wadah (Container)
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

// Resep Anak (Item)
const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function MethodologySection() {
    return (
        // Latar belakang diubah ke bg-blue-50
        <section className="py-24 px-6 bg-blue-50">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER TENGAH --- */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        Cara Kerja <span className="text-blue-600">JobCompass.</span> {/* Teks diubah ke text-blue-600 */}
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                        Tiga langkah cepat menuju karir impian. Tanpa filter kaku, murni berbasis keahlian.
                    </p>
                </div>

                {/* --- KARTU HORIZONTAL DENGAN ANIMASI --- */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {methods.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                // Warna bayangan glow disesuaikan dengan tone biru (blue-600 rgba)
                                boxShadow: "0px 20px 40px rgba(37, 99, 235, 0.15)"
                            }}
                            // Border diubah ke border-blue-100
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-blue-100 transition-colors duration-300 flex flex-col items-center text-center cursor-pointer group"
                        >

                            {/* KOTAK IKON FULL BIRU:
                                bg-blue-50 (latar default), text-blue-600 (ikon default), 
                                border-blue-100 (garis tepi), group-hover:bg-blue-600 (latar saat disorot)
                            */}
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed font-medium text-sm">
                                {item.description}
                            </p>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}