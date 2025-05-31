import React, { useState } from 'react'
import Navbar from '../Navbar'
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import { useModal } from '../../Hooks/useModal'
import { post, put } from '../../api'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import Popup from '../../Components/Popup'


export default function GyaneHistory() {
    const [gyaneHistoryData, setgyaneHistoryData] = useState({
        menstrual: "",
        Pain: "",
        bleeding: "",
        clotting: "",
        leukorrhea: "",
    })
    // const { patientId, setpatientId } = useStoreId()
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, patientId, setpatientId, complainId, setcomplainId } = useModal();
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const navigation = (path) => {
        nav(path)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setgyaneHistoryData({ ...gyaneHistoryData, [name]: value });
    };



    const next = async (e) => {
        e.preventDefault()
        const gyaneHistoryObject = {
            complainId,
            menstrual: gyaneHistoryData.menstrual,
            Pain: gyaneHistoryData.Pain,
            bleeding: gyaneHistoryData.bleeding,
            clotting: gyaneHistoryData.clotting,
            leukorrhea: gyaneHistoryData.leukorrhea,
        }

        try {
            setLoading(true)
            const response = await put("/case/gyaneHistory", gyaneHistoryObject)
            if (response) {
                setcomplainId(response.data.complain._id)
                nav('/case/childHoodHistory')
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
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='sm:flex sm:h-auto h-auto py-20 sm:py-10 bg-gray-200'>
                <Navbar />
                <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10  sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                    <div className='flex items-center'>
                        <img src="/gyane.png" alt="" className='w-20 h-24' />
                        <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Gyane History</h1>
                    </div>
                    <form action='' onSubmit={next} className='flex flex-col justify-between w-full sm:px-10 gap-y-5 '>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <label htmlFor="Menstrual" className=''>Menstrual</label>
                            <Inputs type="text" name="menstrual" value={gyaneHistoryData.menstrual} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none px-2 py-0 w-[80vw] sm:w-[40vw]" />
                        </div>
                        <div className='flex flex-row justify-between sm:items-center px-0 sm:px-20'>
                            <label htmlFor="Pain" className='text-sm sm:text-md mt-5 sm:'>Pain</label>
                            <Inputs type="text" name="Pain" value={gyaneHistoryData.Pain} changeevent={handleInputChange} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[50vw] sm:w-[30vw]" />
                        </div>
                        <div className='flex flex-row justify-between sm:items-center px-0 sm:px-20'>
                            <label htmlFor="Bleeding" className='text-sm sm:text-md mt-5 sm:'>Bleeding</label>
                            <Inputs type="text" name="bleeding" changeevent={handleInputChange} value={gyaneHistoryData.bleeding} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[50vw] sm:w-[30vw]" />
                        </div>
                        <div className='flex flex-row justify-between sm:items-center px-0 sm:px-20'>
                            <label htmlFor="Clotting" className='text-sm sm:text-md mt-5 sm:'>Clotting</label>
                            <Inputs type="text" name="clotting" changeevent={handleInputChange} value={gyaneHistoryData.clotting} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[50vw] sm:w-[30vw]" />
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <label htmlFor="leukorrhea" className=''>leukorrhea</label>
                            <Inputs type="text" name="leukorrhea" changeevent={handleInputChange} value={gyaneHistoryData.leukorrhea} class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  px-2 py-0 w-[80vw] sm:w-[40vw]" />
                        </div>
                        <div className='flex justify-center gap-x-5'>
                            <Button name="Skip" class="rounded-lg hover:transform-none mt-5 w-full" click={() => navigation('/case/childHoodHistory')} />
                            <Button name="Next" isLoading={loading} class="rounded-lg hover:transform-none mt-5 w-full" click={next} />
                        </div>

                    </form>
                </div>
            </div>
            {modal && popupMessage && <Popup text={popupMessage} />}
        </>
    )
}
