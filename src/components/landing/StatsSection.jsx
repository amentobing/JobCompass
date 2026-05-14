const stats = [
    {
        value: "94%",
        label: "Matching Accuracy",
    },
    {
        value: "<3s",
        label: "Analysis Time",
    },
    {
        value: "50k+",
        label: "Curated Profiles",
    },
    {
        value: "120+",
        label: "Enterprise Partners",
    },
];

export default function StatsSection() {
    return (
        <section className="bg-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                {stats.map((item, index) => (
                    <div key={index}>

                        <h2 className="text-3xl font-bold text-blue-700">
                            {item.value}
                        </h2>

                        <p className="mt-2 text-gray-600 text-sm">
                            {item.label}
                        </p>

                    </div>
                ))}
            </div>
        </section>
    );
}