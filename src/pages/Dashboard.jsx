import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  // The enrolledCourses array has been removed

  if (!user) {
    return (
      <div className="container dashboard">
        <img src="/learning logo.png" alt="Learning Hub Logo" className="dashboard-logo" />
        <h1>Welcome to the Learning Hub!</h1>
        <p>Please log in to see your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container dashboard">
      <img src="/learning logo.png" alt="Learning Hub Logo" className="dashboard-logo" />
      <h1>Welcome back, {user.fullName}!</h1>
      
      <div className="progress-overview">
        <h2>Quiz Progress</h2>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${user.quizPercentage || 0}%` }}>
            {user.quizPercentage || 0}%
          </div>
        </div>
        {!user.quizPercentage && <p className="quiz-prompt">Take a quiz to calculate your progress!</p>}
      </div>

      <div className="quiz-section">
        <h2>Update Your Profile</h2>
        <p>Take a short quiz to update your skills and progress.</p>
        <Link to="/quiz">
          <button>Start Quiz</button>
        </Link>
      </div>
      
      {/* The "enrolled-courses" section has been deleted from here */}

    </div>
  );
};

export default Dashboard;