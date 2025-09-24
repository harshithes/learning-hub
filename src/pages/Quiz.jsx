import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Quiz.css';

const Quiz = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');

  const quizQuestions = [
      { question: "What is JSX in React?", options: ["A JavaScript syntax extension", "A templating engine", "A CSS preprocessor", "A database query language"] },
      { question: "Which hook is used to manage state in a functional component?", options: ["useEffect", "useState", "useContext", "useReducer"] }
  ];

  const handleOptionChange = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [`question-${questionIndex}`]: option
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== quizQuestions.length) {
      setMessage('Please answer all questions.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, answers: answers })
      });

      if (!response.ok) throw new Error('Failed to submit quiz.');

      const updatedUser = await response.json();
      updateUser(updatedUser); // Update the user in the global context
      setMessage('Quiz submitted successfully! Redirecting to dashboard...');
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container quiz-container">
      <h1>Skills Quiz</h1>
      <form onSubmit={handleSubmit} className="quiz-form">
        {quizQuestions.map((q, index) => (
          <div key={index} className="question-block">
            <h3>{index + 1}. {q.question}</h3>
            <div className="options-block">
              {q.options.map((option, i) => (
                <div key={i} className="option">
                  <input type="radio" id={`q${index}-option${i}`} name={`question-${index}`} value={option} required onChange={() => handleOptionChange(index, option)} />
                  <label htmlFor={`q${index}-option${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-quiz-btn">Submit Answers</button>
        {message && <p className="quiz-message">{message}</p>}
      </form>
    </div>
  );
};

export default Quiz;