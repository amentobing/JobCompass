const stats = [
    { value: "94%", label: "Akurasi Pencocokan NLP" },
    { value: "< 2s", label: "Kecepatan Pemrosesan File" },
    { value: "150+", label: "Perusahaan Terintegrasi" },
    { value: "850k", label: "Profil Teranalisis" },
];

export default function StatsSection() {
    return (
        <section className="bg-white border-y border-slate-200 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100">
                    {stats.map((item, index) => (
                        <div key={index} className="px-6 text-center md:text-left">
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                                {item.value}
                            </h2>
                            <p className="mt-2 text-slate-500 text-sm font-semibold tracking-wide">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}