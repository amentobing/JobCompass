import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Fungsi warna untuk Desktop: Biru terang jika aktif, Abu-abu jika tidak
    const getDesktopLinkStyle = (path) => {
        return location.pathname === path
            ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
            : "text-slate-600 border-b-2 border-transparent hover:text-blue-600 pb-1 font-medium transition";
    };

    // Fungsi warna untuk Mobile
    const getMobileLinkStyle = (path) => {
        return location.pathname === path
            ? "text-blue-600 font-semibold"
            : "text-slate-600 hover:text-blue-600 font-medium";
    };

    return (
        <nav className="w-full bg-white border-b border-slate-200 px-6 md:px-10 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600 tracking-tight">
                    Job Compass
                </div>

                {/* --- DESKTOP MENU --- */}
                <div className="hidden md:flex items-center gap-10 text-sm">
                    <Link to="/" className={getDesktopLinkStyle("/")}>
                        Dashboard
                    </Link>
                    <Link to="/upload" className={getDesktopLinkStyle("/upload")}>
                        Upload CV
                    </Link>
                    <Link to="/dashboard" className={getDesktopLinkStyle("/dashboard")}>
                        All Jobs
                    </Link>
                </div>

                {/* --- TOMBOL AUTHENTIKASI --- */}
                <div className="hidden md:flex items-center gap-6">
                    <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition">
                        Sign In
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* --- MOBILE MENU --- */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 p-4 bg-white rounded-xl shadow-lg border border-slate-100">
                    <Link to="/" className={getMobileLinkStyle("/")} onClick={() => setIsOpen(false)}>
                        Dashboard
                    </Link>
                    <Link to="/upload" className={getMobileLinkStyle("/upload")} onClick={() => setIsOpen(false)}>
                        Upload CV
                    </Link>
                    <Link to="/dashboard" className={getMobileLinkStyle("/dashboard")} onClick={() => setIsOpen(false)}>
                        All Jobs
                    </Link>
                    <div className="h-px w-full bg-slate-100 my-2"></div>
                    <button className="text-left text-blue-600 font-semibold">Sign In</button>
                    <button className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-2 font-semibold">Get Started</button>
                </div>
            )}
        </nav>
    );
}