export default function Footer() {
    return (
        // Mengurangi padding vertikal (py-6) dan menggunakan border yang lebih halus
        <footer className="bg-white py-6 px-6 border-t border-slate-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* --- KIRI: Logo & Copyright --- */}
                {/* Di HP akan menumpuk rapat, di Desktop akan berjejer sebaris */}
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center md:text-left">
                    <h2 className="text-xl font-black text-blue-600 tracking-tight">
                        JobCompass.
                    </h2>
                    {/* Pemisah visual (Hanya muncul di desktop) */}
                    <span className="hidden md:inline-block text-slate-300">|</span>
                    <p className="text-sm font-medium text-slate-500 mt-1 md:mt-0">
                        © 2026 JobCompass.
                    </p>
                </div>

                {/* --- KANAN: Links --- */}
                {/* <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-slate-500 mt-2 md:mt-0">
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
                </div> */}

            </div>
        </footer>
    );
}