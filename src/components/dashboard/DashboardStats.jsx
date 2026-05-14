const stats = [
    {
        title: "HIGHEST SCORE",
        value: "87%",
        desc: "Top Tier",
    },

    {
        title: "TOTAL JOBS",
        value: "24",
        desc: "Active",
    },

    {
        title: "PLATFORMS",
        value: "3",
        desc: "Aggregated",
    },

    {
        title: "AVG MATCHING SKILLS",
        value: "6.5",
        desc: "Per role",
    },
];

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {stats.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                >

                    <p className="text-xs text-gray-500 tracking-wide">
                        {item.title}
                    </p>

                    <div className="flex items-end gap-2 mt-3">

                        <h2 className="text-3xl font-bold text-gray-900">
                            {item.value}
                        </h2>

                        <span className="text-sm text-gray-500 mb-1">
                            {item.desc}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}