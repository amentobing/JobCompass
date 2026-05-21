import {
    LayoutDashboard,
    FileUp,
    Briefcase,
    Menu,
    X,
} from "lucide-react";

import {
    useNavigate,
    useLocation,
} from "react-router-dom";

import { useState } from "react";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            label: "Dashboard",
            icon: <LayoutDashboard size={18} />,
            path: "/",
        },

        {
            label: "CV Upload",
            icon: <FileUp size={18} />,
            path: "/upload",
        },

        {
            label: "All Jobs",
            icon: <Briefcase size={18} />,
            path: "/dashboard",
        },
    ];

    return (
        <>
            {/* MOBILE TOPBAR */}
            <div className="lg:hidden flex items-center justify-between bg-white px-6 py-5 border-b">

                <h1 className="text-2xl font-bold text-blue-700">
                    Job Compass
                </h1>

                <button onClick={() => setIsOpen(true)}>
                    <Menu size={32} />
                </button>
            </div>

            {/* MOBILE OVERLAY */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden">

                    {/* Sidebar */}
                    <div className="w-[280px] h-full bg-white p-6">

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-blue-700">
                                    Job Compass
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Precision Job
                                </p>
                            </div>

                            <button onClick={() => setIsOpen(false)}>
                                <X size={28} />
                            </button>
                        </div>

                        {/* Menu */}
                        <div className="mt-12 flex flex-col gap-4">

                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition ${location.pathname === item.path
                                            ? "bg-blue-50 text-blue-700 font-medium"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* DESKTOP SIDEBAR */}
            <div className="hidden lg:flex fixed left-0 top-0 w-[260px] h-screen bg-white border-r p-6 flex-col justify-between">

                {/* Top */}
                <div>

                    {/* Logo */}
                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white font-bold">
                            ✦
                        </div>

                        <div>
                            <h2 className="font-bold text-blue-700">
                                Job Compass
                            </h2>

                            <p className="text-sm text-gray-500">
                                Precision Job
                            </p>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="mt-14 flex flex-col gap-3">

                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === item.path
                                        ? "bg-blue-50 text-blue-700 font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Button */}
                <button
                    onClick={() => navigate("/upload")}
                    className="bg-blue-700 hover:bg-blue-800 transition text-white py-4 rounded-2xl font-medium"
                >
                    Upload CV
                </button>
            </div>
        </>
    );
}