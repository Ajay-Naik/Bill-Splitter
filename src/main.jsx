import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Scanner from "./pages/Scanner.jsx";
import Manual from "./pages/Manual.jsx";
import Person from "./pages/Person.jsx";
import Summary from "./pages/Summary.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/manual" element={<Manual />} />
      <Route path="/person" element={<Person />} />
      <Route path="/summary" element={<Summary />} />

    </Routes>
  </HashRouter>
);

