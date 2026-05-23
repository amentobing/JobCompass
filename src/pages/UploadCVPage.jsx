import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import axios from "axios"; // Tambahkan ini
import Navbar from "../components/landing/Navbar";
import UploadBox from "../components/upload/UploadBox";
import Footer from "../components/landing/Footer";

export default function UploadCVPage() {
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    // Inisialisasi navigasi dari react-router-dom
    const navigate = useNavigate(); 

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };

    // Ini adalah logika Axios milikmu yang sudah dipindahkan
    const handleAnalyze = async () => {
        if (!file) {
            alert("Please upload a CV first");
            return;
        }

        setIsAnalyzing(true);
        
        try {
            const formData = new FormData();
            formData.append("cv", file); // Pastikan backend python menerima key "cv" ini

            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Backend Response:", response.data);
            alert("CV berhasil dianalisis!");
            
            // Langsung arahkan ke dashboard jika sukses
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Gagal connect ke backend API. Pastikan server lokal berjalan.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-indigo-50/30 text-slate-800 font-sans selection:bg-cyan-200 selection:text-cyan-900">
            <Navbar />
            
            <main className="flex-grow flex flex-col items-center justify-center p-6 py-12 md:py-20 w-full">
                {/* Komponen UploadBox dipanggil dengan Props */}
                <UploadBox 
                    onFileSelect={handleFileSelect}
                    onAnalyze={handleAnalyze}
                    selectedFile={file}
                    isAnalyzing={isAnalyzing}
                />
            </main>

            <Footer />
        </div>
    );
}