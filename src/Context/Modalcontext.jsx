import React, { createContext, useState } from 'react'

const Modalpopup = createContext()

export default function Modalcontext({ children }) {
  const [modal, setmodal] = useState(false)
  const [verifyUser, setverifyUser] = useState(false)
  return (
    <>
      <Modalpopup.Provider value={{ modal, setmodal , verifyUser , setverifyUser }}>
        {children}
      </Modalpopup.Provider>

    </>
  )
}

export { Modalpopup }