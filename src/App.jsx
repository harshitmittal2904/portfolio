import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}
