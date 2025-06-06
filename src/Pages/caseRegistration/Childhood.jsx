import React, { useState } from 'react'
import Navbar from "../Navbar"
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import "./case.css"
import { post, put } from "../../api"
import { useModal } from '../../Hooks/useModal'
import Popup from '../../Components/Popup'
import { useNavigate } from 'react-router-dom'

export default function Childhood() {
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, complainId, setcomplainId } = useModal();
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)

    const navigation = (path) => {
        nav(path)
    }

    const [childHoodData, setchildHoodData] = useState({
        Nature: [],
        NatureOther: "",

    })
    const handleChange = (event, category) => {
        const { type, value, checked } = event.target;

        setchildHoodData(prevState => {
            if (type === "checkbox") {
                const currentValues = prevState[category];
                if (checked) {
                    return { ...prevState, [category]: [...currentValues, value] };
                } else {
                    return {
                        ...prevState,
                        [category]: currentValues.filter(item => item !== value)
                    };
                }
            } else {
                // For text input (Other), directly update the corresponding state
                return { ...prevState, [`${category}Other`]: value };
            }
        });
    };



    const next = async (e) => {
        e.preventDefault()
        const childHoodObject = {
            complainId,
            Nature: childHoodData.Nature.concat(childHoodData.NatureOther ? [childHoodData.NatureOther] : []).join(', '),

        };
        try {
            setLoading(true)
            const response = await put("/case/childHoodHistory", childHoodObject)
            if (response) {
                setcomplainId(response.data.complain._id)
                nav('/case/behavior')
            }
        } catch (error) {
            if (error.response.data.message === "Complain ID is required") {
                setmodal(true)
                setPopupMessage("Complain ID is required")
            } else if (error.response.data.message === "Complain not found") {
                setmodal(true)
                setPopupMessage("Complain not found")
            } else {
                setmodal(true)
                setPopupMessage("Something went wrong")
            }
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className='sm:flex h-screen py-40 sm:py-44 xl:py-24 bg-gray-200'>
                <Navbar />
                <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-5  sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                    <div className='flex items-center sm:gap-x-0 gap-x-3'>
                        <img src="/childhood.png" alt="" className='w-24 h-24' />
                        <h1 className='text-lg sm:text-xl md:text-3xl font-bold text-[rgb(22,57,90)]'>ChildHood History</h1>
                    </div>
                    <form action='' onSubmit={next} className='flex flex-col justify-between w-full sm:px-10 gap-y-5 mt-5'>
                        <div className='border-2 border-solid border-[#16395A] rounded sm:rounded-lg'>
                            <div className='flex border-b-2 border-solid border-[#16395A]'>
                                <div className='flex flex-col justify-center w-1/2 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Talkative with guests" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Talkative with guests</label>
                                    <Inputs type="checkbox" value="talkative with guests" changeevent={(e) => handleChange(e, 'Nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-1/2 items-center'>
                                    <label htmlFor="Less talkative with guests" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Less talkative with guests</label>
                                    <Inputs type="checkbox" value="less talkative with guests" changeevent={(e) => handleChange(e, 'Nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>

                            </div>
                            <div className='flex  '>
                                <div className='flex flex-col justify-center w-1/2 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Mild" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Mild</label>
                                    <Inputs type="checkbox" value="mild" changeevent={(e) => handleChange(e, 'Nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col  items-center'>
                                    <div className='border-b-2 border-solid border-[#16395A] w-full  '>
                                        <label htmlFor="Other" className='sm:text-lg text-xs ms-5'>Other</label>
                                    </div>
                                    <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'Nature')} class="sm:w-[25.5vw] w-[39.5vw] hover:drop-shadow-none  rounded-none hover:shadow-none focus:outline-none px-2 py-0 h-8 sm:h-8 text-[15px]" />
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-center gap-x-5'>
                            <Button name="Skip" class="rounded-lg hover:transform-none mt-5 w-full" click={() => navigation('/case/behavior')} />
                            <Button name="Next" isLoading={loading} class="rounded-lg hover:transform-none mt-5 w-full" click={next} />
                        </div>

                    </form>
                </div>
            </div >
            {modal && popupMessage && <Popup text={popupMessage} />
            }
        </>
    )
}
