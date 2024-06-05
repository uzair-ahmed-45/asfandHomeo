import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Modalpopup = createContext()

export default function Modalcontext({ children }) {
  const [modal, setmodal] = useState(false)
  const [verifyUser, setverifyUser] = useState(false)
  const [loader, setloader] = useState(false)




  return (
    <>
  
      <Modalpopup.Provider value={{ modal, setmodal, verifyUser, setverifyUser, loader, setloader }}>
        {children}
      </Modalpopup.Provider>

    </>
  )
}

export { Modalpopup }