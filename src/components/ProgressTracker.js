import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './ProgressTracker.css';
import { useLocation } from 'react-router-dom';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function ProgressTracker() {
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  const [progressData, setProgressData] = useState([]);
  const [score, setScore] = useState(0);
  const [activities, setActivities] = useState(0);
  const handleDownload = () => {
  const link = document.createElement('a');
  link.href = `http://localhost:5000/api/progress/download-pdf/${username}`;
  link.setAttribute('download', `${username}_progress_report.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  useEffect(() => {
    fetch(`http://localhost:5000/api/progress?username=${username}`)
      .then(res => res.json())
      .then(data => {
        const scores = data.map(entry => entry.score);
        const labels = data.map((_, index) => `Day ${index + 1}`);
        setProgressData({ labels, scores });
        setScore(scores[scores.length - 1]);
        setActivities(data.length);
      })
      .catch(err => console.error('Error fetching progress data:', err));
  }, [username]);

  const chartData = {
    labels: progressData.labels || [],
    datasets: [{
      label: 'Progress',
      data: progressData.scores || [],
      fill: false,
      borderColor: '#4fc3f7',
      tension: 0.4,
    }],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true, suggestedMax: 100 }
    },
  };

  return (
    <div className="progress-page">
      <header className="progress-header">
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
              <p>{score}</p>
            </div>
            <div className="metric-box">
              <h3>Activities Completed</h3>
              <p>{activities}</p>
            </div>
          </div>
        </div>

        <button className="download-btn" onClick={handleDownload}>Download Report</button>

      </div>
    </div>
  );
}

export default ProgressTracker;
