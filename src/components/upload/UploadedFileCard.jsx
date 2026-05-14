import { FileText, CheckCircle2 } from "lucide-react";

export default function UploadedFileCard() {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-xl font-semibold text-gray-900">
                Ready for Analysis
            </h2>

            {/* File Card */}
            <div className="mt-6 border-l-4 border-blue-700 bg-[#f5f7fb] rounded-2xl p-5 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                        <FileText className="text-red-500" />
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            CV_Alex_Rivers_SeniorDev.pdf
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            2.4 MB • 100% Uploaded
                        </p>
                    </div>
                </div>

                {/* Status */}
                <CheckCircle2 className="text-blue-700" />
            </div>
        </div>
    );
}