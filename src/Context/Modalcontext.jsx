import React, { createContext, useEffect, useState } from 'react';

const Modalpopup = createContext();

export default function Modalcontext({ children }) {
  const [modal, setmodal] = useState(false);
  const [verifyUser, setverifyUser] = useState(false);
  const [loader, setloader] = useState(false);
  const [patientId, setpatientId] = useState(localStorage.getItem('patientId') || "");
  const [complainId, setcomplainId] = useState(localStorage.getItem('complainId') || "");
  const [complain, setcomplain] = useState(JSON.parse(localStorage.getItem('complain')) || {});
  const [loggedInDoctor, setLoggedInDoctor] = useState(JSON.parse(localStorage.getItem('loggedInDoctor')) || {});


  useEffect(() => {
    localStorage.setItem('patientId', patientId);
  }, [patientId]);

  useEffect(() => {
    localStorage.setItem('complainId', complainId);
  }, [complainId]);

  useEffect(() => {
    localStorage.setItem('complain', JSON.stringify(complain));
  }, [complain]);

  useEffect(() => {
    localStorage.setItem('loggedInDoctor', JSON.stringify(loggedInDoctor));
  }, [loggedInDoctor]);

  useEffect(() => {
    const storedPatientId = localStorage.getItem('patientId');
    const storedComplainId = localStorage.getItem('complainId');
    const storedComplain = localStorage.getItem('complain');
    const storedLoggedInDoctor = localStorage.getItem('loggedInDoctor');

    if (storedPatientId) setpatientId(storedPatientId);
    if (storedComplainId) setcomplainId(storedComplainId);
    if (storedComplain) setcomplain(JSON.parse(storedComplain));
    if (storedLoggedInDoctor) setLoggedInDoctor(JSON.parse(storedLoggedInDoctor));
  }, []);

  return (
    <Modalpopup.Provider value={{
      modal, setmodal, verifyUser, setverifyUser, loader, setloader,
      patientId, setpatientId, complainId, setcomplainId, loggedInDoctor, setLoggedInDoctor, complain, setcomplain
    }}>
      {children}
    </Modalpopup.Provider>
  );
}

export { Modalpopup };
