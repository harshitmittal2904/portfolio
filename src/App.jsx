import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetail";
import FindMyDetail from "./pages/FindMyDetail";
import StoxKartDetail from "./pages/StoxKartDetail";
import LabDecodeDetail from "./pages/LabDecodeDetail";
import SchemeWiseDetail from "./pages/SchemeWiseDetail";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/find-my-teardown" element={<FindMyDetail />} />
        <Route path="/projects/smc-stoxkart" element={<StoxKartDetail />} />
        <Route path="/projects/labdecode" element={<LabDecodeDetail />} />
        <Route path="/projects/schemewise" element={<SchemeWiseDetail />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
