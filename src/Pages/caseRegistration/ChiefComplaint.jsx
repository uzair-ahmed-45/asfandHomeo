import React, { useState } from 'react'
import Navbar from '../Navbar'
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import { useModal } from '../../Hooks/useModal'
import { useStoreId } from '../../Hooks/useStoreId'
import { post } from '../../api'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import Popup from '../../Components/Popup'


export default function ChiefComplaint() {
    const initialFormData = {
        whenStarted: "",
        locationAndSide: "",
        sensationAndDuration: "",
        modalities: "",
        Agravation: "",
        Amelioration: "",
        otherComplaint: ""
    }
    const [formData, setFormData] = useState(initialFormData)
    // const { patientId, setpatientId } = useStoreId()
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, patientId, setpatientId, complainId, setcomplainId } = useModal();
    const nav = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const resetFormData = () => {
        setFormData(initialFormData)
    }


    const next = async (e) => {
        e.preventDefault()
        const chiefComplaint = {
            patientid: patientId,
            StartDate: formData.whenStarted,
            Location: formData.locationAndSide,
            Sensation: formData.sensationAndDuration,
            Modalities: formData.modalities,
            Agravation: formData.Agravation,
            Amelioration: formData.Amelioration,
            OtherComplaints: formData.otherComplaint
        }

        try {
            const response = await post("/case/chiefComplaint", chiefComplaint)
            if (response) {
                console.log(response.data)
                nav('/case/generals')
                resetFormData()
                console.log(response.data.createdchiefComplaint._id);
                setcomplainId(response.data.createdchiefComplaint._id)
                console.log(complainId);
                setmodal(true)
            }
        } catch (error) {
            console.log(error.response.data.message);
            setPopupMessage(error.response.data.message)
            setmodal(true)
        }
    }

    return (
        <>
            {loader ? <Spinner /> :
                <>
                    <div className='sm:flex sm:h-auto h-auto py-20 sm:py-10 bg-gray-200'>
                        <Navbar />
                        <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10  sm:mt-20 py-5 rounded-xl shadow-xl px-5'>
                            <div className='flex flex-col sm:flex-row justify-between w-full gap-y-5 sm:px-10'>
                                <div>
                                    {/* icon */}
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)]'>Chief Complaints</h1>
                                </div>
                                <div className='flex flex-col justify-end sm:items-end gap-y-2'>
                                    <div className='flex gap-x-4 '>
                                        <h1>Patient ID</h1>
                                        <div className='border-b-2 border-solid border-[rgb(22,57,90)] px-1'>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>03b56af4-a57f-48cb-aa77-f7aa8aa8a70a</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-x-4 '>
                                            <h1>Case No</h1>
                                            <div className='border-b-2 border-solid border-[rgb(22,57,90)] px-1'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>18620</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div action="" className='flex flex-col justify-between w-full sm:px-10 gap-y-5'>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="whenStarted" className=''>When Started</label>
                                    <Inputs type="text" name="whenStarted" value={formData.whenStarted} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Location & Side</label>
                                    <Inputs type="text" name="locationAndSide" value={formData.locationAndSide} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Sensation & Duration</label>
                                    <Inputs type="text" name="sensationAndDuration" changeevent={handleInputChange} value={formData.sensationAndDuration} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Modalities</label>
                                    <Inputs type="text" name="modalities" value={formData.modalities} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div className='flex flex-row justify-between sm:items-center px-0 sm:px-20'>
                                    <label htmlFor="" className='text-sm sm:text-md mt-5 sm:'>Agravation</label>
                                    <Inputs type="text" name="Agravation" value={formData.Agravation} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[50vw] sm:w-[30vw]" />
                                </div>
                                <div className='flex flex-row justify-between sm:items-center px-0 sm:px-20'>
                                    <label htmlFor="" className='text-sm sm:text-md mt-5 sm:'>Ameriolation</label>
                                    <Inputs type="text" name="Amelioration" changeevent={handleInputChange} value={formData.Amelioration} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[50vw] sm:w-[30vw]" />
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Also Ask Other Complaints</label>
                                    <Inputs type="text" name="otherComplaint" changeevent={handleInputChange} value={formData.otherComplaint} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div>
                                    <Button name="Next" class="rounded-lg hover:transform-none" click={next} />
                                </div>

                            </div>
                        </div>
                    </div>
                    {modal && popupMessage && <Popup text={popupMessage} />}
                </>
            }


        </>
    )
}
