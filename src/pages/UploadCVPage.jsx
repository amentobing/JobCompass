import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import UploadBox from "../components/upload/UploadBox";
import Footer from "../components/landing/Footer";

export default function UploadCVPage() {
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const navigate = useNavigate();

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };

    const handleAnalyze = async () => {
        if (!file) {
            alert("Silakan unggah CV terlebih dahulu");
            return;
        }

        // 🛡️ PENGECEKAN TOKEN DAN ALUR PROTEKSI LOGIN DIHAPUS TOTAL

        setIsAnalyzing(true);

        try {
            const formData = new FormData();

            // Solusi Sapu Jagat tetap dipertahankan agar backend tidak mengembalikan error "Field name missing"
            formData.append("file", file);       
            formData.append("name", file.name);  

            const response = await axios.post(
                "https://9dnnv6l4-3001.asse.devtunnels.ms/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        // 🛡️ HEADER AUTHORIZATION DIHAPUS TOTAL AGAR BEBAS AKSES
                    },
                }
            );

            if (response.data.status === "success") {
                // Simpan data AI asli ke Local Storage
                localStorage.setItem("cvData", JSON.stringify(response.data.data));
                localStorage.setItem("uploadedFileName", file.name);

                alert("CV berhasil dianalisis!");
                navigate("/dashboard");
            } else {
                alert(response.data.message || "Gagal memproses unggahan file.");
            }

        } catch (error) {
            console.error(error);
            alert("Gagal terhubung ke backend API. Pastikan server dev tunnel Anda berjalan aktif.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-50/30 text-slate-800 font-sans selection:bg-cyan-200 selection:text-cyan-900 overflow-x-hidden">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center p-6 pt-32 pb-12 md:pt-40 md:pb-20 w-full">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] }} className="w-full max-w-2xl">
                    <UploadBox
                        onFileSelect={handleFileSelect}
                        onAnalyze={handleAnalyze}
                        selectedFile={file}
                        isAnalyzing={isAnalyzing}
                    />
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}