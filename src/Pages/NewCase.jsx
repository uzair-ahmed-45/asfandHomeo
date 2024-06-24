import React from 'react'
import Navbar from "./Navbar"
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../Hooks/useModal'

export default function NewCase() {
    const { loader, setloader } = useModal()
    const nav = useNavigate()
    const navigation = (path) => {
        nav(path)
        setloader(true)
    }
    return (
        <>
            <div className='sm:flex h-[100vh] sm:py-5 py-20 ' >
                <Navbar />
                <div className='flex flex-col gap-y-5 justify-center items-center w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] md:ms-96 sm:ms-60 lg:ms-[450px] ms-5 xl:ms-[600px] bg-white mt-10  sm:mt-32 py-10 sm:py-20 rounded-xl shadow-xl sm:px-0 px-5 h-[60vh]'>
                    <Button name="Register a new Patient" class="w-auto rounded-xl hover:transform-none text-sm sm:text-lg" click={() => navigation("/case/patientform")} />
                    <h1 className="text-lg sm:text-xl font-bold text-[rgba(252,165,23,255)]">OR</h1>
                    <Button name="Add a new case to existing patient" class="w-auto rounded-xl hover:transform-none text-sm sm:text-lg " click={() => navigation("/patients")} />
                </div>

            </div>
        </>
    )
}
