import React from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css';

const CourseDetail = () => {
  // The useParams hook gets the 'courseId' from the URL
  const { courseId } = useParams();

  // In a real app, you'd use the courseId to fetch course details from an API
  const course = {
    title: 'React for Beginners',
    instructor: 'John Doe',
    content: 'Welcome to React for Beginners! In this course, we will cover hooks, components, state, and props...',
  };

  return (
    <div className="container course-detail">
      <h1>{course.title}</h1>
      <h3>Instructor: {course.instructor}</h3>
      <div className="course-content">
        <p>{course.content}</p>
        {/* You would map over course lessons or videos here */}
      </div>
    </div>
  );
};

export default CourseDetail;