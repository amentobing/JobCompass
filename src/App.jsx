import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import UploadCVPage from "./pages/UploadCVPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Upload CV */}
      <Route path="/upload" element={<UploadCVPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />

    </Routes>
  );
}

export default App;