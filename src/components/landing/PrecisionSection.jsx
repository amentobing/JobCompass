export default function PrecisionSection() {
    return (
        <section className="py-24 px-6 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Kiri: Teks Penjelasan */}
                <div>
                    <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                        Lebih dari Kata Kunci. <br />
                        <span className="text-blue-600">
                            Presisi Semantik.
                        </span>
                    </h2>
                    <p className="mt-6 text-slate-600 leading-relaxed text-lg mb-8">
                        Platform tradisional mengandalkan pencarian boolean yang kaku. JobCompass menerapkan analisis kontekstual mendalam untuk memahami bobot dari setiap pengalaman Anda.
                    </p>
                    
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-1.5 h-auto bg-blue-600 rounded-full"></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">Topologi Keahlian</h4>
                                <p className="text-slate-500 mt-1">Sistem memetakan keluasan dan kedalaman tumpukan teknologi Anda.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1.5 h-auto bg-slate-300 rounded-full"></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">Resonansi Pengalaman</h4>
                                <p className="text-slate-500 mt-1">Mengevaluasi rekam jejak Anda terhadap kebutuhan spesifik industri.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kanan: Dashboard Card UI */}
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-xs font-bold text-slate-400 tracking-wider mb-2">TOP MATCH</p>
                            <h3 className="text-2xl font-black text-slate-900">Senior UX Architect</h3>
                            <p className="text-slate-500 font-medium mt-1">Fintech Innovations Ltd.</p>
                        </div>
                        <div className="bg-white border border-slate-200 text-blue-700 font-black text-2xl px-4 py-2 rounded-xl shadow-sm">
                            94%
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2 font-bold text-slate-700">
                                <span>Penyesuaian Teknis</span>
                                <span className="text-slate-900">Tinggi</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full w-[90%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2 font-bold text-slate-700">
                                <span>Domain Industri</span>
                                <span className="text-slate-900">Sangat Relevan</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-slate-700 h-2 rounded-full w-[85%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
                        <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">Interaction Design</span>
                        <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">Design Systems</span>
                        <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold">+12 Skills</span>
                    </div>
                </div>

            </div>
        </section>
    );
}