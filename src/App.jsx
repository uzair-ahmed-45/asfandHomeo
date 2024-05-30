import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import SignIn from './Pages/SignIn';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import { useModal } from './Hooks/useModal';
import Patientform from './Pages/Patientform';

function App() {


  return (
    <Router>
      <div className='bg-gray-200 h-screen'>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/patientform" element={<Patientform />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
