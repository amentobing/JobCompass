const methods = [
    {
        number: "1",
        title: "Upload Context",
        description:
            "Submit your CV in any format. Our parser extracts not just keywords, but the narrative arc of your experience.",
    },

    {
        number: "2",
        title: "Curated Matching",
        description:
            "Our proprietary algorithm evaluates semantic intent, mapping your unique capabilities against verified role requirements.",
    },

    {
        number: "3",
        title: "Seamless Apply",
        description:
            "Receive your top matches with complete transparency. One-click application routes your profile directly to decision-makers.",
    },
];

export default function MethodologySection() {
    return (
        <section className="bg-[#f8f8f8] py-24 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        The Methodology
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
                        A refined process designed for clarity and depth. We strip away the
                        noise to focus on what truly matters: capability and cultural
                        alignment.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {methods.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300"
                        >

                            {/* Number */}
                            <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold">
                                {item.number}
                            </div>

                            {/* Title */}
                            <h3 className="mt-6 text-xl font-semibold text-gray-900">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-4 text-gray-600 leading-relaxed text-sm">
                                {item.description}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}