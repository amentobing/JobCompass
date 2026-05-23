import { CheckCircle2 } from "lucide-react";

export default function JobCard({ job }) {
    if (!job) return null; // Safety check

    return (
        <div className={`bg-white p-8 rounded-[32px] border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${
            job.isPrimary ? "border-indigo-600 ring-4 ring-indigo-50" : "border-indigo-50"
        }`}>
            
            {/* --- HEADER: Judul & Skor --- */}
            <div className="flex justify-between items-start mb-2 gap-4">
                <div>
                    <h3 className="text-2xl font-black text-indigo-950 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                    </h3>
                    <p className="text-slate-500 font-bold mt-1">{job.company}</p>
                </div>
                
                <div className={`px-4 py-2 rounded-2xl font-black text-sm shadow-sm whitespace-nowrap ${
                    job.isPrimary ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                    {job.score} Match
                </div>
            </div>

            {/* --- BADGE LOKASI & TIPE --- */}
            <div className="flex flex-wrap gap-3 mt-4 mb-6">
                <span className="bg-indigo-50 text-indigo-600 font-bold text-xs px-4 py-2 rounded-xl">
                    {job.location}
                </span>
                <span className="bg-indigo-50 text-indigo-600 font-bold text-xs px-4 py-2 rounded-xl">
                    {job.type}
                </span>
            </div>

            <div className="text-indigo-950 font-black text-sm mb-8">
                {job.salary}
            </div>

            {/* --- SKILLS --- */}
            <div className="flex-grow">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Key Matching Skills</h4>
                <div className="space-y-3">
                    {job.skills && job.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <CheckCircle2 size={18} className="text-indigo-600" />
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- TOMBOL AKSI BAWAH --- */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                <button className={`w-full font-black py-4 rounded-2xl transition-all shadow-md ${
                    job.isPrimary 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:-translate-y-1" 
                    : "bg-slate-100 hover:bg-slate-200 text-indigo-700"
                }`}>
                    Review & Apply
                </button>
            </div>
            
        </div>
    );
}