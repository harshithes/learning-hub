import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLoginView) {
      try {
        const response = await fetch('http://localhost:8082/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const loggedInUser = await response.json();
        login(loggedInUser); // Update global state
        navigate('/'); // Redirect to dashboard
      } catch (err) {
        setError(err.message || 'Login failed. Please check your credentials.');
        console.error('Login error:', err);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
      try {
        const response = await fetch('http://localhost:8082/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        setSuccess('Registration successful! You can now log in.');
      } catch (err) {
        setError(err.message || 'Registration failed. Please try again.');
        console.error('Registration error:', err);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isLoginView ? 'Login to Learning Hub' : 'Create Your Account'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          {!isLoginView && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">{isLoginView ? 'Login' : 'Register'}</button>
        </form>
        <div className="toggle-form">
          {isLoginView ? (
            <p>Don't have an account? <span onClick={() => { setIsLoginView(false); setError(''); setSuccess(''); }}>Register</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => { setIsLoginView(true); setError(''); setSuccess(''); }}>Login</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;