import { useNavigate } from "react-router-dom";
export default function AnalysisCard() {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border-t-4 border-blue-700">

            {/* Info */}
            <p className="text-sm text-gray-500 text-center">
                1 document ready for processing
            </p>

            {/* Button */}
            <button
                onClick={() => navigate("/dashboard")}
                className="w-full mt-6 bg-blue-700 hover:bg-blue-800 transition text-white py-4 rounded-2xl font-medium"
            >
            </button>

            {/* Footer */}
            <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
                By analyzing, you agree to our Data Processing Terms.
            </p>
        </div>
    );
}