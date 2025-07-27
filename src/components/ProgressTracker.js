import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './ProgressTracker.css';
import { useLocation } from 'react-router-dom';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function ProgressTracker() {
  const location = useLocation();
const username = location.state?.username || 'Guest';

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: 'Progress',
      data: [20, 35, 30, 45, 40, 50, 60],
      fill: false,
      borderColor: '#4fc3f7',
      tension: 0.4,
    }],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="progress-page">
      <header className="progress-header">
        {  /* <div className="user-info">
          <span className="greeting">Hello, <strong className="username">{username}</strong></span>
       {  /* <img src="/assets/user-avatar.png" alt="User" className="avatar" />
        </div>*/}
        <nav className="nav-links">
           <a href="/home">Home</a>
          <a href="/profile">Profile</a>
           <a href="/progress-tracker">Progress Tracker</a>
          <a href="/Setting">Setting</a>
        </nav>
      </header>

      <div className="progress-content">
        <div className="title-bar">
          <h1 className="app-name">NeuroBloom</h1>
          <h2 className="section-title">Progress Tracker</h2>
        </div>

        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
          <div className="metrics">
            <div className="metric-box">
              <h3>Score</h3>
              <p>85</p>
            </div>
            <div className="metric-box">
              <h3>Activities Completed</h3>
              <p>15</p>
            </div>
          </div>
        </div>

        <button className="download-btn">Download Report</button>
      </div>
    </div>
  );
}

export default ProgressTracker;
