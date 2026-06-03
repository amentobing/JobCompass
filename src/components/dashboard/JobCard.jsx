import { MapPin } from "lucide-react";
import { motion } from "framer-motion"; // <-- Import framer-motion

export default function JobCard({ job, onViewDetails }) {
    if (!job) return null;

    return (
        // Gunakan motion.div untuk efek hover yang canggih
        <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-blue-100 hover:border-blue-200 transition-colors flex flex-col h-full group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 antialiased">
                        {job.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 antialiased">{job.company}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <span className="flex items-center gap-1 bg-slate-50 text-slate-600 font-medium text-xs px-3 py-1.5 rounded-lg border border-slate-100">
                    <MapPin size={12} /> {job.location}
                </span>
            </div>

            <div className="mt-auto flex gap-9">
                <button
                    onClick={() => onViewDetails(job)}
                    className="flex-1 font-bold py-3 rounded-xl transition-colors text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white text-sm">
                    Review Details
                </button>
                    <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-bold py-3 rounded-xl transition-colors text-white bg-blue-600 hover:bg-blue-700 text-sm">
                        Apply Now
                    </a>
            </div>
        </motion.div>
    );
}