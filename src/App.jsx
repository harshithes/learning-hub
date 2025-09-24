import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Contest from './pages/Contest'; // Import the new Contest page

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contest" element={<Contest />} /> {/* <-- ADD THIS ROUTE --> */}
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;