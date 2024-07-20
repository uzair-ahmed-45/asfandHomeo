import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Inputs from '../../Components/Inputs';
import Button from '../../Components/Button';
import { useModal } from '../../Hooks/useModal';
import { put } from '../../api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import Popup from '../../Components/Popup';

export default function Remedies() {
    const [popupMessage, setPopupMessage] = useState('');
    const [remediesModal, setremediesModal] = useState(false);
    const [remediesdone, setremediesdone] = useState(false)
    const [remediesData, setremediesData] = useState({
        remedies: Array(10).fill(''),
    });
    const { modal, setmodal, loader, setloader, patientId, setpatientId, complainId, setcomplainId, complain, setcomplain } = useModal();
    const nav = useNavigate();
    const navigation = (path) => {
        nav(path);
        setloader(true);
    };
    const handleInputChange = (index, value) => {
        const newremedies = [...remediesData.remedies];
        newremedies[index] = value;
        setremediesData({ remedies: newremedies });
    };
    const submit = async (e) => {
        e.preventDefault()
        const filteredremedies = remediesData.remedies.filter(remedies => remedies.trim() !== "")
        const remediesObj = {
            complainId,
            remedies: filteredremedies.join(', ')
        };
        try {
            const response = await put('/case/remedies', remediesObj);
            setloader(true);
            if (response) {
                setcomplain(response.data)
                console.log(response.data);
                setremediesdone(true)
                setremediesModal(false)
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
        }
    };
    return (
        <>
            {loader ? <Spinner /> :
                <>
                    <div className='sm:flex h-auto py-20 sm:py-10 bg-gray-200'>
                        <Navbar />
                        <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10 sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                            <div className='flex flex-col sm:flex-row justify-between items-center w-full gap-y-5 sm:px-10'>
                                <div className='flex items-center'>
                                    <img src="/caseReport.png" alt="" className='w-20 h-24' />
                                    <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Case Report</h1>
                                </div>
                                <div className='flex flex-col justify-end sm:items-end gap-y-2'>
                                    <div className='flex gap-x-4'>
                                        <h1>Case No</h1>
                                        <div className='border-b-2 border-solid border-[rgb(22,57,90)] px-1'>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>{complain.complain.caseNo.caseNumber}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* case report */}
                            <div className='flex flex-col justify-between gap-y-5 w-[70vw] sm:w-full '>
                                {/* Basic Info */}<h1 className='text-xl sm:px-10 font-bold text-[rgb(22,57,90)]'>Basic Info</h1>
                                <div className='block'>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        <div className='flex gap-x-5 items-center'>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Full Name:</h1>
                                            <h1 className='ms-14'>{complain?.complain?.chiefComplaint?.patient?.fullname || null}</h1>
                                        </div>
                                        <div className='flex gap-x-5 items-center'>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Age:</h1>
                                            <h1 className='ms-[100px]'>{complain?.complain?.chiefComplaint?.patient?.age || null}</h1>
                                        </div>
                                        <div className='flex gap-x-5 items-center'>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Gender:</h1>
                                            <h1 className='ms-[75px]'>{complain?.complain?.chiefComplaint?.patient?.gender || null}</h1>
                                        </div>
                                        <div className='flex gap-x-5 items-center'>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Contact:</h1>
                                            <h1 className='ms-[72px]'>{complain?.complain?.chiefComplaint?.patient?.contact || null}</h1>
                                        </div>
                                        <div className='flex gap-x-5 items-center '>
                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Address:</h1>
                                            <h1 className='ms-[72px]'>{complain?.complain?.chiefComplaint?.patient?.address || null}</h1>
                                        </div>
                                    </div>
                                </div>
                                {/* mobile basic info */}
                                {/* <div className='hidden'>
                                    <div className='flex justify-between  w-[70vw] text-xs  gap-5'>
                                        <div className='flex flex-col gap-y-5'>
                                            <h1 className=' text-[rgb(22,57,90)]'>Full Name:</h1>
                                            <h1 className=' text-[rgb(22,57,90)]'>Age:</h1>
                                            <h1 className=' text-[rgb(22,57,90)]'>Gender:</h1>
                                            <h1 className=' text-[rgb(22,57,90)]'>Contact:</h1>
                                            <h1 className=' text-[rgb(22,57,90)]'>Address:</h1>
                                        </div>
                                        <div className='flex flex-col gap-y-5'>
                                            <h1 className=''>{complain?.complain?.chiefComplaint?.patient?.fullname || null}</h1>
                                            <h1 className=''>{complain?.complain?.chiefComplaint?.patient?.age || null}</h1>
                                            <h1 className=''>{complain?.complain?.chiefComplaint?.patient?.gender || null}</h1>
                                            <h1 className=''>{complain?.complain?.chiefComplaint?.patient?.contact || null}</h1>
                                            <h1 className=''>{complain?.complain?.chiefComplaint?.patient?.address || null}</h1>
                                        </div>
                                    </div>
                                </div> */}
                                {/* chiefComplaint */}
                                {complain?.complain?.chiefComplaint ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Chief Complaint</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.chiefComplaint?.StartDate ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>When Started:</h1>
                                                <h1 className='ms-8'>{complain?.complain?.chiefComplaint?.StartDate || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.chiefComplaint?.Location ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Location & Side:</h1>
                                                <h1 className='ms-5'>{complain?.complain?.chiefComplaint?.Location || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.chiefComplaint?.Sensation ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sensation:</h1>
                                                <h1 className='ms-14'>{complain?.complain?.chiefComplaint?.Sensation || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.chiefComplaint?.Duration ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Duration:</h1>
                                                <h1 className='ms-[67px]'>{complain?.complain?.chiefComplaint?.Duration || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.chiefComplaint?.Modalities ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Modalities:</h1>
                                                <h1 className='ms-14'>{complain?.complain?.chiefComplaint?.Modalities || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.chiefComplaint?.Agravation ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Agravation:</h1>
                                                <h1 className='ms-12'>{complain?.complain?.chiefComplaint?.Agravation || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.chiefComplaint?.Amelioration ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Amelioration:</h1>
                                                <h1 className='ms-10'>{complain?.complain?.chiefComplaint?.Amelioration || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.chiefComplaint?.OtherComplaints ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>OtherComplaints:</h1>
                                                <h1 className='ms-2'>{complain?.complain?.chiefComplaint?.OtherComplaints || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {/* generals */}
                                {complain?.complain?.generals ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Generals</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.generals?.thermal ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Thermal:</h1>
                                                <h1 className='ms-16'>{complain?.complain?.generals?.thermal || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.hungerTolerance ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Hunger Tolerance:</h1>
                                                <h1 className=''>{complain?.complain?.generals?.hungerTolerance || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.eatingSpeed ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Eating Speed:</h1>
                                                <h1 className='ms-8'>{complain?.complain?.generals?.eatingSpeed || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.appetite ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Appetite:</h1>
                                                <h1 className='ms-16'>{complain?.complain?.generals?.appetite || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.badHabits ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Bad Habits:</h1>
                                                <h1 className='ms-12'>{complain?.complain?.generals?.badHabits || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.perspiration ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Perspiration:</h1>
                                                <h1 className='ms-10'>{complain?.complain?.generals?.perspiration || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.thirst ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Thirst:</h1>
                                                <h1 className='ms-[85px]'>{complain?.complain?.generals?.thirst || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.dream ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Dream:</h1>
                                                <h1 className='ms-[75px]'>{complain?.complain?.generals?.dream || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.urine ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Urine:</h1>
                                                <h1 className='ms-[85px]'>{complain?.complain?.generals?.urine || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.sleep ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sleep:</h1>
                                                <h1 className='ms-[85px]'>{complain?.complain?.generals?.sleep || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.foodDesires ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Food Desires:</h1>
                                                <h1 className='ms-8'>{complain?.complain?.generals?.foodDesires || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.sleepPosition ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sleep Position:</h1>
                                                <h1 className='ms-6'>{complain?.complain?.generals?.sleepPosition || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.stool ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Stool:</h1>
                                                <h1 className='ms-20'>{complain?.complain?.generals?.stool || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.generals?.sensitivity ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sensitivity:</h1>
                                                <h1 className='ms-[50px]'>{complain?.complain?.generals?.sensitivity || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.mind ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Mind</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.mind?.familyRelation ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Family Relation:</h1>
                                                <h1 className='ms-3'>{complain?.complain?.mind?.familyRelation || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.mind?.friendsRelation ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Friends Relation:</h1>
                                                <h1 className='ms-2'>{complain?.complain?.mind?.friendsRelation || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.mind?.gathering ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Gathering:</h1>
                                                <h1 className='ms-12'>{complain?.complain?.mind?.gathering || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.mind?.memory ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Memory:</h1>
                                                <h1 className='ms-14'>{complain?.complain?.mind?.memory || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.mind?.willPower ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Will Powers:</h1>
                                                <h1 className='ms-10'>{complain?.complain?.mind?.willPower || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.mind?.personality ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>personality:</h1>
                                                <h1 className='ms-10'>{complain?.complain?.mind?.personality || null}</h1>
                                            </div> : null
                                        }

                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.nature ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Nature</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.nature?.nature ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Nature:</h1>
                                                <h1 className='ms-[75px]'>{complain?.complain?.nature?.nature || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.nature?.anxiety ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Anxiety:</h1>
                                                <h1 className='ms-[72px]'>{complain?.complain?.nature?.anxiety || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.pastHistory ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Past History</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.pastHistory?.patientHistory ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Patient History:</h1>
                                                <h1 className='ms-12'>{complain?.complain?.pastHistory?.patientHistory || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.pastHistory?.patientFamilyHistory ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Patient Family History:</h1>
                                                <h1 className=''>{complain?.complain?.pastHistory?.patientFamilyHistory || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.pastHistory?.patientDrugHistory ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Patient Drug History:</h1>
                                                <h1 className='ms-3'>{complain?.complain?.pastHistory?.patientDrugHistory || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.gyaneHistory ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Gyane History</h1>
                                    <div className='grid  justify-between sm:grid-cols-2 grid-cols-1 sm:text-base text-xs grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.gyaneHistory?.menstrual ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Menstrual:</h1>
                                                <h1 className='ms-16'>{complain?.complain?.gyaneHistory?.menstrual || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.gyaneHistory?.Pain ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Pain:</h1>
                                                <h1 className='ms-[105px]'>{complain?.complain?.gyaneHistory?.Pain || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.gyaneHistory?.bleeding ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Bleeding:</h1>
                                                <h1 className='ms-[75px]'>{complain?.complain?.gyaneHistory?.bleeding || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.gyaneHistory?.clotting ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Clotting:</h1>
                                                <h1 className='ms-20'>{complain?.complain?.gyaneHistory?.clotting || null}</h1>
                                            </div> : null
                                        }
                                        {
                                            complain?.complain?.gyaneHistory?.leukorrhea ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Leukorrhea:</h1>
                                                <h1 className='ms-14'>{complain?.complain?.gyaneHistory?.leukorrhea || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.childhoodHistory ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>ChildHood History</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.childhoodHistory?.Nature ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Nature:</h1>
                                                <h1 className='ms-20'>{complain?.complain?.childhoodHistory?.Nature || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.behavoir ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Behavior</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.behavoir?.Behavior ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Behavior:</h1>
                                                <h1 className='ms-16'>{complain?.complain?.behavoir?.Behavior || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.labTests ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Lab Tests</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.labTests?.tests ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Lab Tests:</h1>
                                                <h1 className='ms-16'>{complain?.complain?.labTests?.tests || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {complain?.complain?.diagnosed ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Diagnosed</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.diagnosed?.diagnosed ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Diagnosed:</h1>
                                                <h1 className='ms-14'>{complain?.complain?.diagnosed?.diagnosed || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                {remediesdone ? null : <div className='flex justify-center'>
                                    <Button class="hover:transform-none sm:px-10 px-6 sm:text-base text-xs" name="Suggest Remedies" click={() => setremediesModal(true)} />
                                </div>

                                }
                                {complain?.complain?.remedies ? <>
                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Remedies</h1>
                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                        {
                                            complain?.complain?.remedies?.remedies ? <div className='flex gap-x-5 items-center'>
                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Remedies:</h1>
                                                <h1 className='ms-14'>{complain?.complain?.remedies?.remedies || null}</h1>
                                            </div> : null
                                        }
                                    </div>
                                </>
                                    : null
                                }
                                <div className='flex justify-center gap-x-5 mt-5'>
                                    <Button name="Back to home" class="sm:px-10 px-6 hover:transform-none sm:text-base text-xs" click={() => navigation('/home')} />
                                    <Button name="Generate Report" class="sm:px-10 px-6 hover:transform-none sm:text-base text-xs" click={() => navigation('/case/report')} />
                                </div>
                                {
                                    remediesModal &&
                                    <>
                                        <div className="scale-125 fixed top-0 left-0 right-0 bottom-0 " style={{ background: "rgb(189, 189, 189, 0.9)" }} onClick={() => setremediesModal(false)}></div>
                                        <form action='' onSubmit={submit} className="flex flex-col justify-center items-center gap-3 sm:gap-y-5 fixed left-[50%] top-[50%] w-[90vw] sm:w-[60vw] sm:h-auto h-[60vh]  bg-[white] rounded-lg shadow-lg sm:py-4 px-4" style={{ transform: "translate(-50% , -50%)" }}>
                                            <h1 className='text-xl font-bold text-[rgb(22,57,90)]'>Suggest Remedies</h1>
                                            <div className='grid grid-cols-2 justify-between sm:gap-5 gap-3'>
                                                {remediesData.remedies.map((remedies, index) => (
                                                    <div key={index} className='flex justify-between gap-x-3 items-center'>
                                                        <label htmlFor="" className=''>{index + 1}</label>
                                                        <Inputs
                                                            type="text"
                                                            name={`remedies${index}`}
                                                            value={remedies}
                                                            changeevent={(e) => handleInputChange(index, e.target.value)}
                                                            class="border-b-2 border-solid border-[rgb(22,57,90)] hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none px-2 py-0 w-[30vw] sm:w-[20vw]"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <button className='py-1 px-4 text-xl rounded-xl font-medium border-1 border-solid border-[rgb(95,141,184)] text-[rgb(95,141,184)]  hover:border-none hover:bg-[rgb(95,141,184)] hover:text-white hover:transition-all hover:duration-300 hover:scale-110' onClick={submit} >Submit</button>
                                        </form>
                                    </>

                                }

                            </div>
                        </div>
                    </div>
                    {modal && popupMessage && <Popup text={popupMessage} />}
                </>
            }
        </>
    )
}
