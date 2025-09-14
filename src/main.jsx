// import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Scanner from "./pages/Scanner.jsx";
import Manual from "./pages/Manual.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/manual" element={<Manual />} />
    </Routes>
  </HashRouter>
);

