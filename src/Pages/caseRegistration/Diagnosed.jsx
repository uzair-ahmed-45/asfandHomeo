import React, { useState } from 'react';
import Navbar from '../Navbar';
import Inputs from '../../Components/Inputs';
import Button from '../../Components/Button';
import { useModal } from '../../Hooks/useModal';
import { get, post, put } from '../../api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import Popup from '../../Components/Popup';

export default function Diagnosed() {
    const [dignosisData, setdignosisData] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [casenumber, setcasenumber] = useState(null)
    const { modal, setmodal, loader, setloader, patientId, setpatientId, complainId, setcomplainId, complain, setcomplain } = useModal();
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false)
    const nav = useNavigate();
    const navigation = (path) => {
        nav(path);
    };

    const next = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await get('/case/getCaseNo')
        const newCase = res.data.caseNo
        setcasenumber(newCase)

        const caseNoObj = {
            complainId,
            caseNo: newCase
        }
        try {
            const rs = await put('/case/caseNo', caseNoObj)
        } catch (error) {
            console.log(error);
        }
        const diagnosedObj = {
            complainId,
            diagnosed: dignosisData
        };
        try {
            if (dignosisData) {
                const response = await put('/case/diagnosed', diagnosedObj);
                if (response) {
                    setcomplain(response.data)
                    setcomplainId(response.data.complain._id);
                    nav('/case/remedies')
                }
            } else {
                setErrors("Diagnosed is Required")
            }

        } catch (error) {
            if (error.response.data.message === 'Complain ID is required') {
                setmodal(true);
                setPopupMessage('Complain ID is required');
            } else if (error.response.data.message === 'Complain not found') {
                setmodal(true);
                setPopupMessage('Complain not found');
            } else {
                setmodal(true);
                setPopupMessage('Something went wrong');
            }
        }finally{
            setLoading(false)
        }
    };

    return (
        <>
            <div className='sm:flex h-auto py-20 sm:py-24 bg-gray-200'>
                <Navbar />
                <form action='' onSubmit={next} className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10 sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                    <div className='flex items-center'>
                        <img src="/diagnosed.png" alt="" className='w-24 h-20' />
                        <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Diagnosed</h1>
                    </div>
                    <div className='flex flex-col justify-between w-full sm:px-10 gap-y-5'>
                        <textarea name="" id="" cols={50} rows={5} className='rounded-xl border-2 border-solid border-[rgb(22,57,90)] focus:border-[rgb(22,57,90)] px-5 py-5' value={dignosisData} onChange={(e) => setdignosisData(e.target.value
                        )}></textarea>
                        {errors && <p className="text-red-500 text-base">{errors}</p>}

                    </div>
                    <div className=''>
                        <Button name="Next" isLoading={loading} class="rounded-lg hover:transform-none mt-5 w-full" click={next} />
                    </div>
                </form>
            </div>
            {modal && popupMessage && <Popup text={popupMessage} />}
        </>
    );
}
