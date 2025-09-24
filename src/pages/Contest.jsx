import React from 'react';
import './Contest.css';

const Contest = () => {
  return (
    <div className="container contest-container">
      <h1>Upcoming Contests</h1>
      <div className="contest-list">
        <div className="contest-item">
          <h2>Weekly React Challenge</h2>
          <p>Test your React skills against others. Prizes for top performers!</p>
          <span>Starts: October 1, 2025</span>
        </div>
        <div className="contest-item">
          <h2>Java Algorithms Marathon</h2>
          <p>A 3-hour marathon to solve complex algorithmic problems in Java.</p>
          <span>Starts: October 5, 2025</span>
        </div>
      </div>
    </div>
  );
};

export default Contest;