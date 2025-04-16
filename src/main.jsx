import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GeminiProvider } from "./context/geminiContext.jsx";

createRoot(document.getElementById("root")).render(
  <GeminiProvider>
    <App />
  </GeminiProvider>
);
