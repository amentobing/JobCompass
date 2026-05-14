import { useNavigate } from "react-router-dom";
export default function HeroSection() {
    const navigate = useNavigate();
    return (
        <section className="bg-[#dfe9fb] min-h-[80vh] flex items-center justify-center px-6">

            <div className="max-w-4xl text-center">

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                    Precision Matching,
                    <br />
                    <span className="text-blue-700">
                        Curated for Excellence.
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                    Elevate your hiring journey. Our editorial AI analyzes nuanced skill
                    topologies to connect high-caliber talent with visionary roles,
                    instantly.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

                    <button
                        onClick={() => navigate("/upload")}
                        className="bg-blue-700 hover:bg-blue-800 transition text-white px-6 py-3 rounded-lg font-medium"
                    >
                        Upload CV
                    </button>

                    <button className="bg-white hover:bg-gray-100 transition text-gray-800 px-6 py-3 rounded-lg font-medium shadow">
                        Explore Platform
                    </button>
                </div>
            </div>
        </section>
    );
}