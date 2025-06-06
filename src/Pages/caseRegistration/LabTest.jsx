import React, { useState } from 'react';
import Navbar from '../Navbar';
import Inputs from '../../Components/Inputs';
import Button from '../../Components/Button';
import { useModal } from '../../Hooks/useModal';
import { put } from '../../api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import Popup from '../../Components/Popup';

export default function LabTest() {
    const [labTestData, setLabTestData] = useState({
        labtests: Array(10).fill(''),
    });
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, complainId, setcomplainId } = useModal();
    const nav = useNavigate();
    const navigation = (path) => {
        nav(path);
    };
    const [loading, setLoading] = useState(false)

    const handleInputChange = (index, value) => {
        const newLabtests = [...labTestData.labtests];
        newLabtests[index] = value;
        setLabTestData({ labtests: newLabtests });
    };

    const next = async (event) => {
        event.preventDefault();
        const filteredlabtest = labTestData.labtests.filter(test => test.trim() !== "")
        const labTestObj = {
            complainId,
            tests: filteredlabtest.join(', '),
        };
        try {
            setLoading(true)
            const response = await put('/case/labTests', labTestObj);
            if (response) {
                setcomplainId(response.data.complain._id);
                nav('/case/diagnosed')
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
            <div className='sm:flex h-auto py-20 sm:py-5 bg-gray-200'>
                <Navbar />
                <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10 sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                    <div className='flex items-center'>
                        <img src="/labTests.png" alt="" className='w-20 h-24' />
                        <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Lab Tests</h1>
                    </div>
                    <form action='' onSubmit={next} className='flex flex-col sm:flex-row flex-wrap justify-between w-full sm:px-10 gap-y-5'>
                        {labTestData.labtests.map((test, index) => (
                            <div key={index} className='flex flex-col sm:flex-row gap-x-3 sm:items-center'>
                                <label htmlFor="" className=''>{index + 1}</label>
                                <Inputs
                                    type="text"
                                    name={`labtests${index}`}
                                    value={test}
                                    changeevent={(e) => handleInputChange(index, e.target.value)}
                                    class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none px-2 py-0 w-[80vw] sm:w-[20vw]"
                                />
                            </div>
                        ))}
                        <div className='flex justify-center gap-x-5 m-auto'>
                            <Button name="Skip" class="rounded-lg hover:transform-none mt-5 w-full" click={() => navigation('/case/diagnosed')} />
                            <Button name="Next" isLoading={loading} class="rounded-lg hover:transform-none mt-5 w-full" click={next} />
                        </div>
                    </form>

                </div>
            </div>
            {modal && popupMessage && <Popup text={popupMessage} />}
        </>
    );
}
