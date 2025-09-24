import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.imageUrl} alt={course.title} className="course-image" />
      <div className="course-info">
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        {/* --- THIS IS THE NEW LOGIC --- */}
        {/* If the course object has a 'url', render an external link. */}
        {/* Otherwise, render a normal internal React Router <Link>. */}
        {course.url ? (
          <a href={course.url} target="_blank" rel="noopener noreferrer">
            <button>View Course</button>
          </a>
        ) : (
          <Link to={`/course/${course.id}`}>
            <button>View Course</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;