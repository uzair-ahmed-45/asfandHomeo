import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import SignIn from './Pages/SignIn';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import { useModal } from './Hooks/useModal';
import Patientform from './Pages/Patientform';
import Spinner from './Components/Spinner';
import PatientList from './Pages/PatientList';

function App() {
  const { modal, setmodal, verifyUser, setverifyUser, loader, setloader } = useModal()
  useEffect(()=>{
    setloader(true)
  },[])

  return (
    <>
      {loader ? <Spinner /> : <>
        <Router>
          <div className='bg-gray-200 h-screen'>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/patientform" element={<Patientform />} />
              <Route path="/patients" element={<PatientList />} />
            </Routes>
          </div>
        </Router>

      </>
      }

    </>
  );
}

export default App;
