import React, { createContext, useEffect, useState } from 'react';

const Modalpopup = createContext();

export default function Modalcontext({ children }) {
  const [modal, setmodal] = useState(false);
  const [verifyUser, setverifyUser] = useState(false);
  const [loader, setloader] = useState(false);
  const [patientId, setpatientId] = useState(localStorage.getItem('patientId') || "");
  const [patientidForCase, setpatientidForCase] = useState(localStorage.getItem('patientidForCase') || "");
  const [patientCases, setpatientCases] = useState(JSON.parse(localStorage.getItem('patientCases')) || [])
  const [complainId, setcomplainId] = useState(localStorage.getItem('complainId') || "");
  const [complain, setcomplain] = useState(JSON.parse(localStorage.getItem('complain')) || {});
  const [loggedInDoctor, setLoggedInDoctor] = useState(JSON.parse(localStorage.getItem('loggedInDoctor')) || {});
  const [totalCases, settotalCases] = useState()
  const [patients, setpatients] = useState([])


  useEffect(() => {
    localStorage.setItem('patientId', patientId);
  }, [patientId]);

  useEffect(() => {
    localStorage.setItem('complainId', complainId);
  }, [complainId]);

  useEffect(() => {
    localStorage.setItem('patientidForCase', patientidForCase);
  }, [patientidForCase]);

  useEffect(() => {
    localStorage.setItem('complain', JSON.stringify(complain));
  }, [complain]);

  useEffect(() => {
    localStorage.setItem('patientCases', JSON.stringify(patientCases));
  }, [patientCases]);

  useEffect(() => {
    localStorage.setItem('loggedInDoctor', JSON.stringify(loggedInDoctor));
  }, [loggedInDoctor]);

  useEffect(() => {
    const storedPatientId = localStorage.getItem('patientId');
    const storedComplainId = localStorage.getItem('complainId');
    const storedPatientIdForCase = localStorage.getItem('patientidForCase');
    const storedPatientCases = localStorage.getItem('patientCases');
    const storedComplain = localStorage.getItem('complain');
    const storedLoggedInDoctor = localStorage.getItem('loggedInDoctor');

    if (storedPatientId) setpatientId(storedPatientId);
    if (storedComplainId) setcomplainId(storedComplainId);
    if (storedPatientIdForCase) setpatientidForCase(storedPatientIdForCase);
    if (storedComplain) setcomplain(JSON.parse(storedComplain));
    if (storedPatientCases) setpatientCases(JSON.parse(storedPatientCases));
    if (storedLoggedInDoctor) setLoggedInDoctor(JSON.parse(storedLoggedInDoctor));
  }, []);

  return (
    <Modalpopup.Provider value={{
      modal, setmodal, verifyUser, setverifyUser, loader, setloader,
      patientId, setpatientId, complainId, setcomplainId, loggedInDoctor, setLoggedInDoctor, complain, setcomplain, patientidForCase, setpatientidForCase, patientCases, setpatientCases, totalCases, settotalCases, patients, setpatients
    }}>
      {children}
    </Modalpopup.Provider>
  );
}

export { Modalpopup };
