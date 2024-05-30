import React, { useState } from 'react'
import Navbar from "./Navbar"
import Inputs from "../Components/Inputs"
import Button from '../Components/Button'
import axios from 'axios'
import { useModal } from '../Hooks/useModal'
import Popup from '../Components/Popup'
import Spinner from '../Components/Spinner'

export default function Patientform() {
    const [name, setname] = useState('')
    const [age, setage] = useState('')
    const [gender, setgender] = useState('')
    const [contact, setcontact] = useState('')
    const [occupation, setoccupation] = useState('')
    const [address, setaddress] = useState('')
    const { modal, setmodal, loader, setloader } = useModal()
    const [contacterror, setcontacterror] = useState(false)
    const [patientsuccess, setpatientsuccess] = useState(false)
    const [patientexists, setpatientexists] = useState(false)
    const [allfields, setallfields] = useState(false)


    const patientobj = {
        fullname: name,
        age: age,
        gender: gender,
        occupation: occupation,
        contact: contact,
        address: address
    }

    function register(e) {
        e.preventDefault()
        axios.post('/api/patient/register', patientobj).then((res) => {
            if (res.data) {
                setloader(true)
                setmodal(true)
                setpatientsuccess(true)
                setname('')
                setage('')
                setgender('')
                setoccupation('')
                setcontact('')
                setaddress('')
            }
            console.log(res.data);
        }).catch((err) => {
            if (err.response.data.message == "All fields are required") {
                setloader(true)
                setmodal(true)
                setallfields(true)
            } else if (err.response.data.message == "Invalid Contact number") {
                setcontacterror(true)
            } else if (err.response.data.message == "Patient already registered") {
                setloader(true)
                setmodal(true)
                setpatientexists(true)
            }
            setname('')
            setage('')
            setgender('')
            setoccupation('')
            setcontact('')
            setaddress('')
            console.log(err.response.data.message);
        })



    }

    return (
        <>
            {
                loader ? <Spinner /> :
                    <>
                        <Navbar />
                        <div className='h-[100vh]  ms-3 sm:h-[120vh] bg-gray-200 py-5 sm:ms-44 md:ms-48 lg:ms-80 w-[75.5vw] m-auto flex justify-between sm:justify-center flex-col sm:flex-row '>
                            <form action="" className='px-5 py-5 mt-5 sm:mt-12 bg-white rounded-xl shadow-xl flex flex-col justify-between gap-y-3 w-[90vw] sm:w-[55vw] '>
                                <h1 className='text-xl font-bold text-[rgb(22,57,90)] text-center'>Add a Patient</h1>
                                <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                                    <label htmlFor="" className='sm:text-sm md:text-lg text-xs'>Full Name</label>
                                    <Inputs type="text" placeholder="Full Name" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw] " changeevent={(e) => setname(e.target.value)} />
                                </div>
                                <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                                    <label htmlFor="" className='sm:text-sm md:text-lg text-xs'>Age</label>
                                    <Inputs type="text" placeholder="Age" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" changeevent={(e) => setage(e.target.value)} />
                                </div>
                                <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                                    <label htmlFor="" className='sm:text-sm md:text-lg text-xs'>Gender</label>
                                    <Inputs type="text" placeholder="Gender" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" changeevent={(e) => setgender(e.target.value)} />
                                </div>
                                <div className='flex justify-between items-center gap-x-2 sm:gap-x-5 relative'>
                                    <label htmlFor="" className='sm:text-sm md:text-lg text-xs'>Contact Number</label>
                                    <Inputs type="text" placeholder="Contact Number" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" changeevent={(e) => setcontact(e.target.value)} />
                                </div>
                                {
                                    contacterror && <p className='text-lg text-red-700 font-bold '>Invalid Contact</p>
                                }
                                <div className='flex justify-between items-center gap-x-1 md:gap-x-2 sm:gap-x-2'>
                                    <label htmlFor="" className='sm:text-sm md:text-lg text-[10px]'>Occupation</label>
                                    <Inputs type="text" placeholder="Occupation" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" changeevent={(e) => setoccupation(e.target.value)} />
                                </div>
                                <div className='flex justify-between items-center gap-x-2 sm:gap-x-5'>
                                    <label htmlFor="" className='sm:text-sm md:text-lg text-xs'>Address</label>
                                    <Inputs type="text" placeholder="Address" class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]" changeevent={(e) => setaddress(e.target.value)} />
                                </div>
                                <div>
                                    <Button name="Register" class="rounded-lg hover:scale-100" click={register} />
                                </div>
                            </form>
                        </div>
                        <Popup text={`${patientexists && "patient Already exists" || patientsuccess && "Patient Registered Successfully" || allfields && "Please Fillout All fields"}`} />

                    </>
            }


        </>
    )
}
