export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo */}
                <div className="text-xl font-extrabold text-blue-700 tracking-tight">
                    JobCompass.
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500">
                    <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
                    <a href="#" className="hover:text-blue-600 transition">Enterprise</a>
                    <a href="#" className="hover:text-blue-600 transition">Support</a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-slate-400 font-semibold">
                    © 2024 JobCompass Technology.
                </p>
            </div>
        </footer>
    );
}