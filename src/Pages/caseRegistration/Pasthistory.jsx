import React, { useState } from 'react'
import Navbar from '../Navbar'
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import { useModal } from '../../Hooks/useModal'
import { post, put } from '../../api'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import Popup from '../../Components/Popup'


export default function Pasthistory() {
    const [PasthistoryData, setPasthistoryData] = useState({
        patientHistory: "",
        patientFamilyHistory: "",
        patientDrugHistory: "",
    })
    // const { patientId, setpatientId } = useStoreId()
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, patientId, setpatientId, complainId, setcomplainId } = useModal();
    const nav = useNavigate()
    const navigation = (path) => {
        nav(path)
        setloader(true)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPasthistoryData({ ...PasthistoryData, [name]: value });
    };



    const next = async () => {
        const pastHistoryObject = {
            complainId,
            patientHistory: PasthistoryData.patientHistory,
            patientFamilyHistory: PasthistoryData.patientFamilyHistory,
            patientDrugHistory: PasthistoryData.patientDrugHistory,
        }

        try {
            const response = await put("/case/pastHistory", pastHistoryObject)
            if (response) {
                console.log(response.data)
                setcomplainId(response.data.complain._id)
                console.log(complainId);
                setloader(true)
                nav('/case/gyaneHistory')
            }
        } catch (error) {
            console.log(error);
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
        }
    }

    return (
        <>
            {loader ? <Spinner /> :
                <>
                    <div className='sm:flex sm:h-screen h-auto py-20 sm:py-14 bg-gray-200'>
                        <Navbar />
                        <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10  sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                            <div className='flex flex-col sm:flex-row justify-between items-center w-full gap-y-5 sm:px-10'>
                                <div className='flex items-center'>
                                    <img src="/history.png" alt="" className='w-24 h-24' />
                                    <h1 className='text-3xl font-bold text-[rgb(22,57,90)] text-center'>Past History</h1>
                                </div>
                                <div className='flex flex-col justify-end sm:items-end gap-y-2'>
                                    <div className='flex gap-x-4 '>
                                        <h1>Case No</h1>
                                        <div className='border-b-2 border-solid border-[rgb(22,57,90)] px-1'>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>18620</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between w-full sm:px-10 gap-y-5 '>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="Patient History" className=''>Patient History</label>
                                    <Inputs type="text" name="patientHistory" value={PasthistoryData.patientHistory} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="Patient Family History" className=''>Patient Family History</label>
                                    <Inputs type="text" name="patientFamilyHistory" value={PasthistoryData.patientFamilyHistory} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                                    <label htmlFor="Patient Drugs History" className=''>Patient Drugs History</label>
                                    <Inputs type="text" name="patientDrugHistory" changeevent={handleInputChange} value={PasthistoryData.patientDrugHistory} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                                </div>
                                <div className='flex justify-center gap-x-5'>
                                    <Button name="Skip" class="rounded-lg hover:transform-none mt-5 w-full" click={() => navigation('/case/gyaneHistory')} />
                                    <Button name="Next" class="rounded-lg hover:transform-none mt-5 w-full" click={next} />
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
