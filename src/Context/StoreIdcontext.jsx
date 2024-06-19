import React, { createContext, useState } from 'react'

const StoreId = createContext()
export default function StoreIdcontext({ children }) {
    const [patientId, setpatientId] = useState("")

    return (
        <>
            <StoreId.Provider value={{ patientId, setpatientId }}>
                {children}
            </StoreId.Provider>
        </>
    )
}

export { StoreId }