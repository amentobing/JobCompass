import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

// Komponen Cerdas untuk Angka Berjalan
function AnimatedCounter({ from = 0, to, duration = 2, prefix = "", suffix = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 }); // Trigger saat 50% terlihat
    const count = useMotionValue(from);
    
    // Menggabungkan prefix, angka yang dibulatkan, dan suffix
    const rounded = useTransform(count, (latest) => prefix + Math.round(latest) + suffix);

    useEffect(() => {
        if (inView) {
            animate(count, to, { duration: duration, ease: "easeOut" });
        }
    }, [count, inView, to, duration]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

// Data stat kita pisah num, prefix, dan suffix agar bisa dianimasikan angkanya
const stats = [
    { num: 94, prefix: "", suffix: "%", label: "Akurasi Pencocokan NLP" },
    { num: 2, prefix: "< ", suffix: "s", label: "Kecepatan Pemrosesan File" },
    { num: 150, prefix: "", suffix: "+", label: "Perusahaan Terintegrasi" },
    { num: 850, prefix: "", suffix: "k", label: "Profil Teranalisis" },
];

export default function StatsSection() {
    return (
        <section className="bg-white border-y border-slate-200 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100">
                    {stats.map((item, index) => (
                        <div key={index} className="px-6 text-center md:text-left">
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
                                {/* Panggil komponen animasi di sini */}
                                <AnimatedCounter to={item.num} prefix={item.prefix} suffix={item.suffix} />
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