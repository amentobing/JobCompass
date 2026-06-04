import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import UploadCVPage from "./pages/UploadCVPage";

export default function App() {
    return (
        // Pembungkus <Router> dihapus karena sudah ada di main.jsx
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upload" element={<UploadCVPage />} />
        </Routes>
    );
}