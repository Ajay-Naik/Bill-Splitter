// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css";
import App from "./App.jsx";
import Scanner from "./components/Scanner.jsx"
import Manual from "./components/Manual.jsx"

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />}></Route>
        <Route path="/scanner" element={<Scanner />}></Route>
        <Route path="/manual" element={<Manual />}></Route>
      </Routes>
    </BrowserRouter>
    
);
