import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetail";
import FindMyDetail from "./pages/FindMyDetail";
import StoxKartDetail from "./pages/StoxKartDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/find-my-teardown" element={<FindMyDetail />} />
        <Route path="/projects/smc-stoxkart" element={<StoxKartDetail />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
