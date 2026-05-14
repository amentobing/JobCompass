import { Bell, Search } from "lucide-react";

export default function Topbar() {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-center">

            {/* Search */}
            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-4 top-3 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search candidates..."
                    className="bg-white rounded-full pl-11 pr-5 py-3w-full md:w-[320px] outline-none border"
                />
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">

                <Bell className="text-gray-600" />

                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            </div>
        </div>
    );
}