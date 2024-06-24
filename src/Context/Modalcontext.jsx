import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Modalpopup = createContext()

export default function Modalcontext({ children }) {
  const [modal, setmodal] = useState(false)
  const [verifyUser, setverifyUser] = useState(false)
  const [loader, setloader] = useState(false)
  const [patientId, setpatientId] = useState("")
  const [complainId, setcomplainId] = useState("")
  const [loggedInDoctor, setLoggedInDoctor] = useState({})




  return (
    <>

      <Modalpopup.Provider value={{ modal, setmodal, verifyUser, setverifyUser, loader, setloader, patientId, setpatientId, complainId, setcomplainId, loggedInDoctor, setLoggedInDoctor }}>
        {children}
      </Modalpopup.Provider>

    </>
  )
}

export { Modalpopup }