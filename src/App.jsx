import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import SignIn from './Pages/SignIn';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';

function App() {
  return (
    <Router>
      <div className='bg-gray-300 h-screen'>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
