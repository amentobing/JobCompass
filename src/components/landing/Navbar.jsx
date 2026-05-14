import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white px-6 md:px-10 py-4 shadow-sm sticky top-0 z-50">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <div className="text-2xl font-bold text-blue-700">
                    Job Compass
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-10 text-sm font-medium text-gray-700">

                    <a
                        href="#"
                        className="text-blue-700 border-b-2 border-blue-700 pb-1"
                    >
                        Dashboard
                    </a>

                    <a href="#" className="hover:text-blue-700 transition">
                        Upload CV
                    </a>

                    <a href="#" className="hover:text-blue-700 transition">
                        All Jobs
                    </a>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">

                    <button className="text-sm text-blue-700 font-medium hover:opacity-70 transition">
                        Sign In
                    </button>

                    <button className="bg-blue-700 hover:bg-blue-800 transition text-white px-5 py-2 rounded-lg text-sm font-medium">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 px-2 pb-4 text-gray-700 font-medium">

                    <a href="#">Dashboard</a>
                    <a href="#">Upload CV</a>
                    <a href="#">All Jobs</a>

                    <button className="text-left text-blue-700">
                        Sign In
                    </button>

                    <button className="bg-blue-700 text-white px-5 py-3 rounded-lg">
                        Get Started
                    </button>
                </div>
            )}
        </nav>
    );
}