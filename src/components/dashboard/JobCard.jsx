import { CheckCircle2 } from "lucide-react";

export default function JobCard({
    title,
    company,
    score,
    location,
    type,
    salary,
    skills,
    primary,
}) {
    return (
        <div
            className={`bg-white rounded-3xl p-8 shadow-sm border-l-4 ${primary ? "border-blue-700" : "border-gray-200"
                }`}
        >

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-start">

                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        {company}
                    </p>
                </div>

                {/* Score */}
                <div
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${primary
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {score} Match
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-6">

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                    {location}
                </span>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                    {type}
                </span>
            </div>

            {/* Salary */}
            <div className="mt-5 text-gray-700 font-medium">
                {salary}
            </div>

            {/* Skills */}
            <div className="mt-8">

                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    KEY MATCHING SKILLS
                </h3>

                <div className="space-y-3">

                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 text-gray-700"
                        >
                            <CheckCircle2
                                size={18}
                                className="text-blue-700"
                            />

                            <span>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Button */}
            <button
                className={`w-full mt-10 py-4 rounded-2xl font-medium transition ${primary
                    ? "bg-blue-700 hover:bg-blue-800 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                    }`}
            >
                {primary ? "Review & Apply" : "Review Details"}
            </button>
        </div>
    );
}