import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HeySheetsChat from "./pages/HeySheet.jsx";
import ComponentShowcase from "./components/component-showcase.jsx";
import LandingPage from "./pages/LandingPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="/heysheets" element={<HeySheetsChat />} />
      </Routes>
    </Router>
  </StrictMode>
);
