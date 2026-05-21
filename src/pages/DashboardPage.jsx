import Sidebar from "../components/upload/Sidebar";
import Topbar from "../components/upload/Topbar";

import DashboardStats from "../components/dashboard/DashboardStats";
import JobCard from "../components/dashboard/JobCard";
import UploadButton from "../components/dashboard/UploadButton";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#f5f7fb] flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="w-full lg:ml-[260px] flex-1 p-4 md:p-8 h-screen overflow-y-auto">

                {/* <Topbar /> */}

                {/* Header */}
                <div className="mt-8">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Matches Dashboard
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Curated opportunities based on your latest profile scan.
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-8">
                    <DashboardStats />
                </div>

                {/* Job Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

                    <JobCard
                        title="Senior Data Scientist"
                        company="TechNova Systems"
                        score="87%"
                        location="Jakarta (Hybrid)"
                        type="Full-time"
                        salary="IDR 25M - 35M"
                        skills={[
                            "Python / R",
                            "Machine Learning",
                            "SQL & Data Warehousing",
                        ]}
                        primary
                    />

                    <JobCard
                        title="ML Engineer"
                        company="Global Finance Corp"
                        score="72%"
                        location="Remote"
                        type="Contract"
                        salary="USD 4k - 6k/mo"
                        skills={[
                            "TensorFlow / PyTorch",
                            "Model Deployment",
                            "NLP Experience",
                        ]}
                    />
                </div>

                {/* Bottom Upload Button */}
                <div className="mt-16">
                    <UploadButton />
                </div>
            </div>
        </div>
    );
}