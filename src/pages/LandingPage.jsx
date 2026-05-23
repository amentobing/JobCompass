import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import MethodologySection from "../components/landing/MethodologySection";
import PrecisionSection from "../components/landing/PrecisionSection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />
            <HeroSection />
            <StatsSection />
            <MethodologySection />
            <PrecisionSection />
            <Footer />
        </div>
    );
}