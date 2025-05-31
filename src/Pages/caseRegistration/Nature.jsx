import React, { useState } from 'react'
import Navbar from "../Navbar"
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import "./case.css"
import { post, put } from "../../api"
import { useModal } from '../../Hooks/useModal'
import Popup from '../../Components/Popup'
import { useNavigate } from 'react-router-dom'

export default function Nature() {
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, complainId, setcomplainId } = useModal();
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)

    const navigation = (path) => {
        nav(path)
    }

    const [mindData, setmindData] = useState({
        nature: [],
        natureOther: "",
        anxiety: [],
        anxietyOther: "",

    })
    const handleChange = (event, category) => {
        const { type, value, checked } = event.target;

        setmindData(prevState => {
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
        const natureObject = {
            complainId,
            nature: mindData.nature.concat(mindData.natureOther ? [mindData.natureOther] : []).join(', '),
            anxiety: mindData.anxiety.concat(mindData.anxietyOther ? [mindData.anxietyOther] : []).join(', '),

        };
        try {
            setLoading(true)
            const response = await put("/case/nature", natureObject)
            if (response) {
                setcomplainId(response.data.complain._id)
                navigation('/case/pastHistory')
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
            <div className='sm:flex sm:h-auto h-auto py-20 sm:py-10 bg-gray-200'>
                <Navbar />
                <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-5  sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                    <div className='flex items-center sm:gap-x-0 gap-x-3'>
                        <img src="/nature.png" alt="" className='w-24 h-20' />
                        <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Nature</h1>
                    </div>

                    <form action='' onSubmit={next} className='flex flex-col justify-between w-full items-center sm:px-10 gap-y-5 mt-5'>
                        <div className='border-2 border-solid border-[#16395A] rounded sm:rounded-lg'>
                            <div className='flex border-b-2 border-solid border-[#16395A]'>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Mild" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Mild</label>
                                    <Inputs type="checkbox" value="Mild" changeevent={(e) => handleChange(e, 'nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Angry" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Angry</label>
                                    <Inputs type="checkbox" value="Angry" changeevent={(e) => handleChange(e, 'nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-1/3 items-center '>
                                    <label htmlFor="Weeping Disposition" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Weeping Disposition</label>
                                    <Inputs type="checkbox" value="Weeping Disposition" changeevent={(e) => handleChange(e, 'nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                            </div>
                            <div className='flex border-b-2 border-solid border-[#16395A]'>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Obstinate" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Obstinate</label>
                                    <Inputs type="checkbox" value="Obstinate" changeevent={(e) => handleChange(e, 'nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Manipulate" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Manipulate</label>
                                    <Inputs type="checkbox" value="Manipulate" changeevent={(e) => handleChange(e, 'nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-1/3 items-center'>
                                    <label htmlFor="Fastedious" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Fastedious</label>
                                    <Inputs type="checkbox" value="Fastedious" changeevent={(e) => handleChange(e, 'nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Fear" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Fear</label>
                                    <Inputs type="checkbox" value="Fear" changeevent={(e) => handleChange(e, 'nature')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-[60vw] sm:w-[34vw] '>
                                    <div className='border-b-2 border-solid border-[#16395A] w-full'>
                                        <label htmlFor="Others" className='  sm:text-lg text-xs ms-2'>Others</label>
                                    </div>
                                    <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'nature')} class="w-[50vw] sm:w-[30vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px] sm:text-[15px]" />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center sm:gap-x-0 gap-x-3'>
                            <img src="/anxiety.png" alt="" className='w-20 h-20' />
                            <h1 className='text-xl font-bold text-[rgb(22,57,90)]'>Anxiety</h1>
                        </div>
                        <div className='border-2 border-solid border-[#16395A] rounded sm:rounded-lg'>
                            <div className='flex border-b-2 border-solid border-[#16395A]'>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Health" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Health</label>
                                    <Inputs type="checkbox" value="Health" changeevent={(e) => handleChange(e, 'anxiety')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Money" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Money</label>
                                    <Inputs type="checkbox" value="Money" changeevent={(e) => handleChange(e, 'anxiety')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-1/3 items-center '>
                                    <label htmlFor="Family" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Family</label>
                                    <Inputs type="checkbox" value="Family" changeevent={(e) => handleChange(e, 'anxiety')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]  '>
                                    <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                    <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'anxiety')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                </div>
                                <div className='flex flex-col justify-center w-[60vw] sm:w-[34vw] '>
                                    <div className='border-b-2 border-solid border-[#16395A] w-full'>
                                        <label htmlFor="Others" className='  sm:text-lg text-xs ms-2'>Others</label>
                                    </div>
                                    <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'anxiety')} class="w-[50vw] sm:w-[30vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px] sm:text-[15px]" />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center gap-x-5'>
                            <Button name="Skip" class="rounded-lg hover:transform-none mt-5 w-full" click={() => navigation('/case/pastHistory')} />
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
