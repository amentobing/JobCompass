import Sidebar from "../components/upload/Sidebar";
import Topbar from "../components/upload/Topbar";
import UploadBox from "../components/upload/UploadBox";
import TextInputSection from "../components/upload/TextInputSection";
import UploadedFileCard from "../components/upload/UploadedFileCard";
import AnalysisCard from "../components/upload/AnalysisCard";
import { useState } from "react";

export default function UploadCVPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    return (
        <div className="min-h-screen bg-[#f5f7fb] flex flex-col lg:flex-row">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8">

                <Topbar />

                {/* Header */}
                <div className="mt-8">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Upload Candidate Profiles
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Initiate the precision matching process.
                    </p>
                </div>

                {/* Steps */}
                <div className="flex items-center gap-4 mt-8 text-sm">

                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center">
                            1
                        </div>

                        <span className="text-blue-700 font-medium">
                            Upload CV
                        </span>
                    </div>

                    <div className="w-10 h-[1px] bg-gray-300"></div>

                    <div className="flex items-center gap-2 opacity-50">
                        <div className="w-7 h-7 rounded-full bg-gray-300 text-white flex items-center justify-center">
                            2
                        </div>

                        <span>AI Analysis</span>
                    </div>

                    <div className="w-10 h-[1px] bg-gray-300"></div>

                    <div className="flex items-center gap-2 opacity-50">
                        <div className="w-7 h-7 rounded-full bg-gray-300 text-white flex items-center justify-center">
                            3
                        </div>

                        <span>Match Results</span>
                    </div>
                </div>

                {/* Upload Box */}
                <div className="mt-10">
                    <UploadBox onFileSelect={setSelectedFile} />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-10">

                    <div className="flex-1 h-[1px] bg-gray-300"></div>

                    <span className="text-gray-500 text-sm">
                        OR
                    </span>

                    <div className="flex-1 h-[1px] bg-gray-300"></div>
                </div>

                {/* Text Input */}
                <TextInputSection />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

                    {/* Left */}
                    <div className="lg:col-span-2">
                        <UploadedFileCard file={selectedFile} />
                    </div>

                    {/* Right */}
                    <AnalysisCard file={selectedFile} />
                </div>
            </div>
        </div>
    );
}