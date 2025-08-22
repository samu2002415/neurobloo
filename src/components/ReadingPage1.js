import React from "react";
import { useLocation } from "react-router-dom";
import LetterAnimator from "./LetterAnimator";
import TracingCanvas from "./TracingCanvas";
import "./ReadingPage1.css";

function ReadingPage1() {
    const location = useLocation();
  const username = location.state?.username || "User";
  return (
    <div className="writing-container">
      <h1>Writing: Letter A</h1>
        <p style={{opacity:.7}}>Hello, {username}</p>
        
      <div className="writing-content">
        <div className="left-panel">
          <LetterAnimator letter="A" />
        </div>
        <div className="right-panel">
          <TracingCanvas letter="A" />
        </div>
      </div>
      <div className="footer">
        <button>Previous</button>
        <p>⭐ Well done! ⭐</p>
        <button>Next</button>
      </div>
    </div>
  );
}

export default ReadingPage1;
