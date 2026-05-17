import { UploadCloud } from "lucide-react";

export default function UploadBox({ onFileSelect }) {

    const handleFileChange = (e) => {
        const file = e.target .files[0];

        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-8 md:p-16 flex flex-col items-center justify-center text-center">

            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <UploadCloud size={36} className="text-blue-700" />
            </div>

            {/* Title */}
            <h2 className="mt-8 text-xl md:text-2xl font-semibold text-gray-900">
                Drag & Drop CV Files Here
            </h2>

            {/* Description */}
            <p className="mt-4 text-gray-600 max-w-md">
                Upload PDF files. Ensure text is selectable for best AI extraction.
            </p>

            {/* Hidden File Input */}
            <input
                type="file"
                id="cv-upload"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
            />

            {/* Button */}
            <label htmlFor="cv-upload"
            className="mt-8 bg-gray-100 hover:bg-gray-200 transition px-6 py-3 rounded-xl font-medium cursor-pointer">
                Browse Files
            </label>
        </div>
    );
}