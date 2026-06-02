import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UploadCVPage from "./pages/UploadCVPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Upload CV */}
      <Route path="/upload" element={<UploadCVPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Register */}
      <Route path="/register" element={<RegisterPage />} />

    </Routes>
  );
}

export default App;