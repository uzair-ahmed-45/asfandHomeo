import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import { useModal } from '../../Hooks/useModal'
import { get, post } from '../../api'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import Popup from '../../Components/Popup'



export default function ChiefComplaint() {
    const [formData, setFormData] = useState({
        chiefComplain: "",
        whenStarted: "",
        locationAndSide: "",
        sensation: "",
        duration: "",
        modalities: "",
        Agravation: "",
        Amelioration: "",
        otherComplaint: ""
    })
    const [errors, setErrors] = useState({});

    const validatePatient = (data) => {
        const newErrors = {};
        let isValid = true;
        if (!data.chiefComplain) {
            newErrors.chiefComplain = 'chief Complain is required';
        }
        if (!data.whenStarted) {
            newErrors.whenStarted = 'When started is required';
        }
        if (!data.locationAndSide) {
            newErrors.locationAndSide = 'Location and side are required';
        }
        if (!data.sensation) {
            newErrors.sensation = 'Sensation is required';
        }
        if (!data.duration) {
            newErrors.duration = 'duration is required';
        }
        if (!data.modalities) {
            newErrors.modalities = 'Modalities are required';
        }

        if (Object.keys(newErrors).length > 0) {
            isValid = false;
            setErrors(newErrors);
        }

        return isValid;
    };
    // const { patientId, setpatientId } = useStoreId()
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, patientId, setpatientId, complainId, setcomplainId } = useModal();
    const nav = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const next = async (e) => {
        e.preventDefault()
        const chiefComplaint = {
            patientid: patientId,
            chiefComplain: formData.chiefComplain,
            StartDate: formData.whenStarted,
            Location: formData.locationAndSide,
            Sensation: formData.sensation,
            Duration: formData.duration,
            Modalities: formData.modalities,
            Agravation: formData.Agravation,
            Amelioration: formData.Amelioration,
            OtherComplaints: formData.otherComplaint
        }
        if (!validatePatient(formData)) {
            return;
        }
        try {
            const response = await post("/case/chiefComplaint", chiefComplaint)
            setloader(true)
            if (response) {
                console.log(response.data)
                nav('/case/generals')
                setcomplainId(response.data.createdchiefComplaint._id)
            }
        } catch (error) {
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
                        <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10  sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                            <div className='flex items-center'>
                                <img src="/chiefComplaint.png" alt="" className='w-24 h-24' />
                                <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Chief Complaint</h1>
                            </div>
                            <form action='' onSubmit={next} className='flex flex-col justify-between w-full sm:px-10 gap-y-5 mt-5'>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="chiefComplain" className=''>Chief Complain</label>
                                    <Inputs type="text" name="chiefComplain" value={formData.chiefComplain} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                {errors.chiefComplain && <p className="text-red-500 text-xs">{errors.chiefComplain}</p>}
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="whenStarted" className=''>When Started</label>
                                    <Inputs type="text" name="whenStarted" value={formData.whenStarted} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                {errors.whenStarted && <p className="text-red-500 text-xs">{errors.whenStarted}</p>}
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Location & Side</label>
                                    <Inputs type="text" name="locationAndSide" value={formData.locationAndSide} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                {errors.locationAndSide && <p className="text-red-500 text-xs">{errors.locationAndSide}</p>}

                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Sensation</label>
                                    <Inputs type="text" name="sensation" changeevent={handleInputChange} value={formData.sensation} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                {errors.sensation && <p className="text-red-500 text-xs">{errors.sensation}</p>}
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Duration</label>
                                    <Inputs type="text" name="duration" changeevent={handleInputChange} value={formData.duration} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}

                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="" className=''>Modalities</label>
                                    <Inputs type="text" name="modalities" value={formData.modalities} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                {errors.modalities && <p className="text-red-500 text-xs">{errors.modalities}</p>}

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
                                    <Button name="Next" class="rounded-lg hover:transform-none mt-5" click={next} />
                                </div>

                            </form>
                        </div>
                    </div>
                    {modal && popupMessage && <Popup text={popupMessage} />}
                </>
            }


        </>
    )
}
