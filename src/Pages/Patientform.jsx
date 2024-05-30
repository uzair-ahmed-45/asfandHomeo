import React from 'react'
import Navbar from "./Navbar"
import Inputs from "../Components/Inputs"
import Button from '../Components/Button'

export default function Patientform() {
    return (
        <>
            <Navbar />
            <div className='h-[120vh] bg-gray-200 ms-0 sm:h-screen sm:ms-44 md:ms-48 lg:ms-80 w-[70vw] m-auto flex justify-between items-center sm:justify-center flex-col sm:flex-row '>
                <form action="" className='px-5 py-5 mt-5 sm:mt-20 bg-white rounded-xl shadow-xl flex flex-col justify-between gap-y-4 w-[90vw] sm:w-[55vw] '>
                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] text-center'>Add a Patient</h1>
                    <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                        <label htmlFor="" className='sm:text-lg text-xs'>Full Name</label>
                        <Inputs type="text" placeholder="Full Name" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw] " />
                    </div>
                    <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                        <label htmlFor="" className='sm:text-lg text-xs'>Age</label>
                        <Inputs type="text" placeholder="Age" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" />
                    </div>
                    <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                        <label htmlFor="" className='sm:text-lg text-xs'>Gender</label>
                        <Inputs type="text" placeholder="Gender" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" />
                    </div>
                    <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                        <label htmlFor="" className='sm:text-lg text-xs'>Contact Number</label>
                        <Inputs type="text" placeholder="Contact Number" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" />
                    </div>
                    <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                        <label htmlFor="" className='sm:text-lg text-[10px]'>Occupation</label>
                        <Inputs type="text" placeholder="Occupation" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" />
                    </div>
                    <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                        <label htmlFor="" className='sm:text-lg text-xs'>Address</label>
                        <Inputs type="text" placeholder="Address" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" />
                    </div>
                    <div>
                        <Button name = "Register" class = "rounded-lg hover:scale-100" />
                    </div>
                </form>
            </div>
        </>
    )
}
