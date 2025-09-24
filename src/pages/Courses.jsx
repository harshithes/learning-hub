import React from 'react';
import CourseCard from '../components/CourseCard';
import './Courses.css';

const coursesData = [
  {
    // --- CHANGE IS HERE ---
    title: 'React for Beginners',
    description: 'Learn the fundamentals of React and build modern web apps.',
    imageUrl: '/react-course.png',
    url: 'https://www.geeksforgeeks.org/reactjs/react/',
  },
  {
    title: 'Advanced CSS',
    description: 'Master Flexbox, Grid, and animations to create stunning layouts.',
    imageUrl: '/css-course.png',
    url: 'https://www.geeksforgeeks.org/css/what-is-advanced-css-and-what-do-you-need-to-learn/',
  },
  {
    title: 'Node.js Express API',
    description: 'Build robust and scalable backend APIs with Node.js and Express.',
    imageUrl: '/node-course.png',
    url: 'https://www.geeksforgeeks.org/node-js/node-js-building-simple-rest-api-in-express/',
  },
];

const Courses = () => {
  return (
    <div className="container">
      <h1>Explore Courses</h1>
      <div className="courses-grid">
        {coursesData.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;