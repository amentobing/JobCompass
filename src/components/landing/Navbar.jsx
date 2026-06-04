import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const getDesktopLinkStyle = (path) => {
        return location.pathname === path
            ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold"
            : "text-slate-600 border-b-2 border-transparent hover:text-blue-600 pb-1 font-medium transition";
    };

    const getMobileLinkStyle = (path) => {
        return location.pathname === path
            ? "text-blue-600 font-semibold"
            : "text-slate-600 hover:text-blue-600 font-medium";
    };

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
                isScrolled
                    ? "bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm py-3"
                    : "bg-white border-slate-200 px-6 md:px-10 py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto flex md:grid md:grid-cols-3 items-center justify-between px-6 md:px-10">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600 tracking-tight text-left"
                >
                    Job Compass
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-center gap-10 text-sm">
                    <Link
                        to="/"
                        className={getDesktopLinkStyle("/")}
                    >
                        Beranda
                    </Link>

                    <Link
                        to="/upload"
                        className={getDesktopLinkStyle("/upload")}
                    >
                        Upload CV
                    </Link>

                    <Link
                        to="/dashboard"
                        className={getDesktopLinkStyle("/dashboard")}
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Spacer */}
                <div className="hidden md:block"></div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 p-4 bg-white rounded-xl shadow-lg border border-slate-100 mx-6">

                    <Link
                        to="/"
                        className={getMobileLinkStyle("/")}
                        onClick={() => setIsOpen(false)}
                    >
                        Beranda
                    </Link>

                    <Link
                        to="/upload"
                        className={getMobileLinkStyle("/upload")}
                        onClick={() => setIsOpen(false)}
                    >
                        Upload CV
                    </Link>

                    <Link
                        to="/dashboard"
                        className={getMobileLinkStyle("/dashboard")}
                        onClick={() => setIsOpen(false)}
                    >
                        Dashboard
                    </Link>

                </div>
            )}
        </motion.nav>
    );
}