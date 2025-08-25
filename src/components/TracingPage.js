
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TracingPage.css';

export default function TracingPage() {
  const { state } = useLocation();
  const username = state?.username || 'User';
  const navigate = useNavigate();

  const [playing, setPlaying] = useState(true);
  const [slow, setSlow] = useState(false);

  // optional: autoplay animation on mount
  useEffect(() => setPlaying(true), []);

  return (
    <div className="tracing-wrap">
      <header className="tracing-header">
        <button className="btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>Writing: Letter A</h2>
        <div className="spacer" />
      </header>

      <main className="tracing-main">
        <div className="trace-board">
          {/* Dotted A */}
          <svg viewBox="0 0 320 360" className="trace-svg">
            <path
              id="aPath"
              d="M160 30 L60 310 M160 30 L260 310 M95 220 L225 220"
              fill="none"
              stroke="#cfcfd4"
              strokeWidth="16"
              strokeDasharray="16 18"
              strokeLinecap="round"
            />
          </svg>

          {/* Pencil element that we move with CSS animation */}
          <div
            className={`pencil ${playing ? (slow ? 'run-slow' : 'run') : ''}`}
            style={{
              offsetPath:
                'path("M160 30 L60 310 160 30 260 310 225 220 95 220")',
            }}
            aria-label="pencil"
          >
            ✏️
          </div>
        </div>

        <div className="controls">
          <button className={`btn ${playing ? 'active' : ''}`} onClick={() => setPlaying(p => !p)}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button className="btn" onClick={() => { setPlaying(false); setTimeout(()=>setPlaying(true), 30); }}>
            Restart
          </button>
          <label className="toggle">
            <input
              type="checkbox"
              checked={slow}
              onChange={(e) => setSlow(e.target.checked)}
            />
            <span>Slow Motion</span>
          </label>
        </div>
      </main>

      <footer className="tracing-footer">
        <button className="btn">Previous</button>
        <div className="result"><span>⭐ ⭐</span> Well done!</div>
        <button className="btn">Next</button>
      </footer>
    </div>
  );
}
