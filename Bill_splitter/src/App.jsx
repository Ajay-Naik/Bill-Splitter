
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Scanner";
import Split from "./pages/Manual";
import Person from "./pages/Person";
import Summary from "./pages/Summary";
// import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<Upload />} />
          <Route path="/person" element={<Person />} />
          <Route path="/manual" element={<Split />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </main>
    </div>
  );
}



