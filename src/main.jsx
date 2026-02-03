import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import ThemTuggle from "./components/ui/ThemTuggle.jsx";
import Nav from "./components/ui/nav.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <div className="z-1000 absolute top-6 right-6">
      <ThemTuggle />
    </div>
    <Nav />

    <App />
  </HashRouter>
);
