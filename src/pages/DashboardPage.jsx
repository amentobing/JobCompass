import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import StatsGrid from "../components/dashboard/StatsGrid";
import JobCard from "../components/dashboard/JobCard";

const jobsData = [
    {
        id: 1,
        title: "Senior Data Scientist",
        company: "TechNova Systems",
        score: "87%",
        location: "Jakarta (Hybrid)",
        type: "Full-time",
        salary: "IDR 25M - 35M",
        skills: ["Python / R", "Machine Learning", "SQL & Data Warehousing"],
        isPrimary: true
    },
    {
        id: 2,
        title: "ML Engineer",
        company: "Global Finance Corp",
        score: "72%",
        location: "Remote",
        type: "Contract",
        salary: "USD 4k - 6k/mo",
        skills: ["TensorFlow / PyTorch", "Model Deployment", "NLP Experience"],
        isPrimary: false
    }
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen flex flex-col bg-indigo-50/30 font-sans selection:bg-cyan-200 selection:text-cyan-900">
            <Navbar />
            
            <main className="flex-grow max-w-7xl mx-auto w-full p-6 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-indigo-950 mb-3">Matches Dashboard</h1>
                    <p className="text-slate-600 font-medium">
                        Rekomendasi peluang kerja terbaik berdasarkan hasil scan NLP terakhir Anda.
                    </p>
                </div>

                <StatsGrid />

                <div className="mt-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-indigo-950">Lowongan Terpilih</h2>
                        <span className="bg-white border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                            {jobsData.length} Pekerjaan Ditemukan
                        </span>
                    </div>

                    {/* PERUBAHAN DI SINI: Menjadi 2 Kolom (lg:grid-cols-2) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {jobsData.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}