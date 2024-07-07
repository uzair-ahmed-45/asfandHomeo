import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import SignIn from './Pages/SignIn';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import { useModal } from './Hooks/useModal';
import Patientform from './Pages/caseRegistration/Patientform';
import Spinner from './Components/Spinner';
import PatientList from './Pages/PatientList';
import ChiefComplaint from './Pages/caseRegistration/ChiefComplaint';
import NewCase from './Pages/NewCase';
import Generals from './Pages/caseRegistration/Generals';
import Mind from './Pages/caseRegistration/Mind';
import Nature from './Pages/caseRegistration/Nature';
import Pasthistory from './Pages/caseRegistration/Pasthistory';
import GyaneHistory from './Pages/caseRegistration/GyaneHistory';
import Childhood from './Pages/caseRegistration/Childhood';
import Behavior from './Pages/caseRegistration/Behavior';
import LabTest from './Pages/caseRegistration/LabTest';
import Diagnosed from './Pages/caseRegistration/Diagnosed';
import Remedies from './Pages/caseRegistration/Remedies';


function App() {
  const { modal, setmodal, verifyUser, setverifyUser, loader, setloader } = useModal()
  useEffect(() => {
    setloader(true)
  }, [])

  return (
    <>
      {loader ? <Spinner /> : <>
        <Router>
          <div className='bg-gray-200 h-auto'>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/Signup" element={<Signup />} /> */}
              <Route path="/case/patientform" element={<Patientform />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/newcase" element={<NewCase />} />
              <Route path="/case/chiefComplaint" element={<ChiefComplaint />} />
              <Route path="/case/generals" element={<Generals />} />
              <Route path="/case/mind" element={<Mind />} />
              <Route path="/case/nature" element={<Nature />} />
              <Route path="/case/pastHistory" element={<Pasthistory />} />
              <Route path="/case/gyaneHistory" element={<GyaneHistory />} />
              <Route path="/case/childHoodHistory" element={<Childhood />} />
              <Route path="/case/behavior" element={<Behavior />} />
              <Route path="/case/labTests" element={<LabTest />} />
              <Route path="/case/diagnosed" element={<Diagnosed />} />
              <Route path="/case/remedies" element={<Remedies />} />
            </Routes>
          </div>
        </Router>

      </>
      }

    </>
  );
}

export default App;
