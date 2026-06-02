import { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import StatsGrid from "../components/dashboard/StatsGrid";
import JobCard from "../components/dashboard/JobCard";
import TopMatchCard from "../components/dashboard/TopMatchCard";
import JobDetailPanel from "../components/dashboard/JobDetailPanel"; 
import { motion, AnimatePresence } from "framer-motion"; 

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function DashboardPage() {
    const [selectedJob, setSelectedJob] = useState(null);
    
    const [dashboardData] = useState(() => {
        const savedData = localStorage.getItem("cvData");
        
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            const prediction = parsedData.prediction;
            const jobsList = parsedData.jobs || []; 
            
            const baseScore = Math.round(prediction.confidence * 100); 

            // MAPPING DATA ASLI DARI API BACKEND
            const mappedJobs = jobsList.map((job, index) => {
                
                // Ekstrak spesialisasi perusahaan untuk dijadikan label Skills
                let jobSkills = [prediction.category_name];
                if (job.organizationData && job.organizationData.spesialities && job.organizationData.spesialities.length > 0) {
                    // Ambil maksimal 2 spesialisasi yang tidak kosong
                    const specs = job.organizationData.spesialities.filter(s => s.trim() !== "").slice(0, 2);
                    jobSkills = [...jobSkills, ...specs];
                } else {
                    jobSkills.push("Sesuai Profil AI");
                }

                return {
                    id: index,
                    title: job.title || "Posisi Tidak Diketahui",
                    company: job.organization || "Perusahaan Mitra",
                    score: index === 0 ? baseScore : Math.max(70, baseScore - (index * 2)), 
                    location: job.location || "Lokasi Tidak Ditentukan", // Data lokasi asli
                    type: "Full-time",     // Fallback (Belum ada di API)
                    salary: "Negotiable",  // Fallback (Belum ada di API)
                    skills: jobSkills,     // Kombinasi prediksi AI & spesialisasi perusahaan
                    description: job.description || "Tidak ada deskripsi.", 
                    link: job.link || "#",
                    organizationData: job.organizationData || null, // Simpan sisa data perusahaan
                    isPrimary: index === 0 
                };
            });

            return {
                category: prediction.category_name,
                jobs: mappedJobs
            };
        }
        
        return {
            category: "Belum ada CV yang diunggah",
            jobs: []
        };
    });

    const topMatch = dashboardData.jobs.find(job => job.isPrimary);
    const otherMatches = dashboardData.jobs.filter(job => !job.isPrimary);

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F5F9] font-sans">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full p-6 pt-36 md:pt-40 pb-12">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    
                    <motion.div variants={itemVariants} className="mb-12">
                        <h1 className="text-4xl font-black text-slate-900 mb-3">Hasil Analisis CV</h1>
                        <p className="text-slate-600 font-medium">
                            Algoritma AI mendeteksi spesialisasi Anda di bidang: <strong className="text-blue-600">{dashboardData.category}</strong>
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <StatsGrid 
                            topScore={topMatch ? topMatch.score : 0} 
                            totalJobs={dashboardData.jobs.length} 
                        />
                    </motion.div>

                    {dashboardData.jobs.length > 0 ? (
                        <div className="mt-16 space-y-12">
                            {topMatch && (
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm">Rekomendasi Utama</h2>
                                    <TopMatchCard job={topMatch} onViewDetails={setSelectedJob} />
                                </motion.section>
                            )}

                            {otherMatches.length > 0 && (
                                <motion.section variants={itemVariants}>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider text-sm">Peluang Relevan Lainnya</h2>
                                        <span className="text-blue-600 font-semibold text-sm">{otherMatches.length} Pekerjaan Ditemukan</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {otherMatches.map((job) => (
                                            <JobCard key={job.id} job={job} onViewDetails={setSelectedJob} />
                                        ))}
                                    </div>
                                </motion.section>
                            )}
                        </div>
                    ) : (
                        <div className="mt-16 text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Belum Ada Lowongan</h3>
                            <p className="text-slate-500">Sistem belum menemukan pekerjaan yang sesuai dengan CV Anda di database kami saat ini.</p>
                        </div>
                    )}
                </motion.div>
            </main>

            <Footer />

            <AnimatePresence>
                {selectedJob && <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
            </AnimatePresence>
        </div>
    );
}