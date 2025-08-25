import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StaticLetterA from "./StaticLetterA"; // ⬅ static 3D
import TracingCanvas from "./TracingCanvas";           // ⬅ your drawing canvas
import "./ReadingPage1.css";

export default function ReadingPage1() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "User";

  return (
    <div className="writing-container">
      {/* Top nav */}
      <header className="reading-header">
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/progress-tracker">Progress Tracker</Link>
          <Link to="/setting">Setting</Link>
        </nav>
      </header>

      
      <header className="header">
        <h1>Writing Practice</h1>
        <p>
          let’s learn the letter <strong>A</strong>.
        </p>
      </header>

      
      <div className="writing-content">
        {/* LEFT: static 3D letter only */}
        <div className="left-panel">
          <StaticLetterA />
        </div>

        {/* RIGHT: tracing canvas */}
        <div className="right-panel">
          <TracingCanvas letter="A" />
        </div>
      </div>

      
      <footer className="footer">
        <button className="btn" onClick={() => navigate(-1)}> Previous</button>
        <p><strong> Keep Going!</strong> </p>
        <button className="btn" onClick={() => navigate("/reading/tracing", { state: { username } })}>
          Next 
        </button>
      </footer>
    </div>
  );
}
