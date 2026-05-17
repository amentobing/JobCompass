import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AnalysisCard({ file }) {

    const navigate = useNavigate();

    const handleAnalyze = async () => {

        if (!file) {
            alert("Please upload a CV first");
            return;
        }

        try {

            const formData = new FormData();
            formData.append("cv", file);

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

            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Gagal connect ke backend API");
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border-t-4 border-blue-700">

            <p className="text-sm text-gray-500 text-center">
                {file ? "1 document ready for processing" : "No document uploaded"}
            </p>

            <button
                onClick={handleAnalyze}
                className="w-full mt-6 bg-blue-700 hover:bg-blue-800 transition text-white py-4 rounded-2xl font-medium"
            >
                Cari Lowongan yang Cocok →
            </button>

            <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
                By analyzing, you agree to our Data Processing Terms.
            </p>
        </div>
    );
}