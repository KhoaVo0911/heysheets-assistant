import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeySheetsChat from "./HeySheet.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeySheetsChat />
  </StrictMode>
);
