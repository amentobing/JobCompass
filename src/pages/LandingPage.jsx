import { motion } from "framer-motion"; // <-- Import framer-motion
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import MethodologySection from "../components/landing/MethodologySection";
import PrecisionSection from "../components/landing/PrecisionSection";
import Footer from "../components/landing/Footer";

// --- VARIANT ANIMASI GLOBAL UNTUK SCROLL (Seksi Masuk) ---
// Kita buat efek Slide-Up yang halus
const sectionVariants = {
    hidden: { opacity: 0, y: 70 }, // Mulai lebih rendah dan tidak terlihat
    visible: {
        opacity: 1,
        y: 0, // Berakhir di posisi asli
        transition: {
            duration: 0.8, // Kecepatan gerak (detik)
            ease: [0.6, 0.05, -0.01, 0.9], // Cubic-bezier untuk gerakan premium
        },
    },
};

// Konfigurasi viewport (kapan animasi trigger saat scroll)
const viewportConfig = {
    once: false, // Animasi hanya berjalan sekali (saat scroll down, tidak reset saat scroll up)
    amount: 0.3 // Mulai jalan ketika 30% bagian seksi sudah masuk layar
};

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased overflow-x-hidden">
            <Navbar />

            {/* Beri jarak antar seksi (space-y) agar animasi trigger terlihat jelas dan tidak bertumpuk.*/}
            <main className="flex-grow space-y-24 pb-24">
                {/* 1. HeroSection sudah memiliki animasi internal, jadi tidak perlu dibungkus lagi.*/}
                <HeroSection />

                {/* --- SEKSI BAWAH: MENGGUNAKAN SCROLL ANIMATION --- */}

                {/* 2. StatsSection (Membungkus Komponen) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible" // <-- Pemicu scroll
                    viewport={viewportConfig} // <-- Konfigurasi
                    variants={sectionVariants} // <-- Resep gerakan
                >
                    <StatsSection />
                </motion.div>

                {/* 3. MethodologySection */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={sectionVariants}
                >
                    <MethodologySection />
                </motion.div>

                {/* 4. PrecisionSection */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={sectionVariants}
                >
                    <PrecisionSection />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}