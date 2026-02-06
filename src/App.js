import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MobilPage from "./pages/MobilPage";
import MotorPage from "./pages/MotorPage";

function App() {
  const [membership, setMembership] = useState(false);

  const toggleMembership = () => setMembership((prev) => !prev);

  return (
    <Router>
      <div className="app-root">
        <Navbar title="NewsTomotive 📰" membership={membership} toggleMembership={toggleMembership} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mobil" element={<MobilPage />} />
            <Route path="/motor" element={<MotorPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
