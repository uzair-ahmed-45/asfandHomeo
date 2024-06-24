import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Button from '../Components/Button';
import Inputs from '../Components/Inputs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../Hooks/useModal';
import { get, post, put } from '../api';
import Spinner from '../Components/Spinner';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const { loader, setloader, modal, setmodal, patientId, setpatientId } = useModal()
    const [searchPatient, setSearchPatient] = useState('')
    const [popupMessage, setPopupMessage] = useState("")
    const nav = useNavigate()
    const [totalCases, setTotalCases] = useState({})
    const [filteredPatient, setFilteredPatient] = useState([])

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await get('/patient/list');
                const patients = response.data;
                setPatients(patients);
                console.log(patients);
                // Fetch total cases for each patient
                const casesPromises = patients.map(patient => post('/case/totalCases', { patientid: patient._id }));
                const casesResponses = await Promise.all(casesPromises)
                // Map responses to the corresponding patient ID
                const casesCount = casesResponses.reduce((acc, response, index) => {
                    acc[patients[index]._id] = response.data;
                    return acc;
                }, {});
                setTotalCases(casesCount);
                console.log(totalCases);
            } catch (error) {
                console.error(error);
                setmodal(true)
                setPopupMessage(error.response?.data?.message || "An error occurred");
            }
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        if (searchPatient) {
            const filter = patients.filter(patient =>
                patient.fullname.toLowerCase().includes(searchPatient.toLowerCase())
            )
            setFilteredPatient(filter)
        }
        else {
            setFilteredPatient(patients)
        }
    }, [searchPatient, patients])

    const newcase = (index) => {
        const patientid = patients[index]._id
        setpatientId(patientid)
        nav('/case/chiefComplaint')
        console.log(patientId);
    }

    const deletePatient = async (index) => {
        const patienttoDelete = {
            patientid: filteredPatient[index]._id
        }
        try {
            const res = await put('/patient/delete', patienttoDelete)
            if (res) {
                setmodal(true)
                setPopupMessage("Patient Deleted Successfully")
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
            setmodal(true)
            setPopupMessage(error.response?.data?.message || "An error occurred");
        }
    }

    const navigation = (path) => {
        nav(path)
        setloader(true)
    }

    return (
        <>
            <div className='sm:flex justify-center items-center  bg-gray-200'>
                <div>
                    <Navbar />
                </div>
                <div className=''>
                    <div className='md:w-[70vw] w-[95vw] ms-[10px] sm:w-[70vw] xl:w-[60vw] sm:ms-[180px] md:ms-[220px] lg:ms-[330px] flex flex-col gap-y-5 h-auto py-32 sm:py-36 sm:mt-0 bg-gray-200'>
                        <div className='mt-[-32px]'>
                            <h1 className='text-2xl font-bold text-[rgb(22,57,90)] mt-2 text-center'>My Patients</h1>
                        </div>
                        <div className='bg-white rounded-xl shadow-xl  py-10 flex flex-col'>
                            <div className='px-5 flex sm:flex-row flex-col gap-y-4 justify-between items-center'>
                                <Inputs value={searchPatient} class="border-2 border-solid border-gray-400 rounded-lg hover:shadow-none sm:px-4 px-2 sm:w-full w-[300px] sm:text-md text-sm" placeholder="Search Patient" type="search" changeevent={(e) => setSearchPatient(e.target.value)} />
                                <Button name="Register a new Patient" class="hover:scale-none rounded-lg hover:transform-none hover:border-2 hover:border-solid px-2 sm:px-4 hover:border-[rgba(252,165,23,255)]" click={() => navigation('/case/patientform')} />
                            </div>
                            <div>
                                <div className=' flex justify-between w-full relative bg-[rgb(22,57,90)] text-white px-5 sm:px-10 py-5 mt-5'>
                                    <h1 className=' text-sm xl:text-md'>Name</h1>
                                    <h1 className='absolute hidden md:block md:left-36 lg:left-48 text-sm xl:text-md'>Age</h1>
                                    <h1 className=' absolute hidden md:block md:left-52 lg:left-[295px] text-sm xl:text-md'>Gender</h1>
                                    <h1 className='absolute md:left-72  left-32 sm:left-48 lg:left-[450px] text-sm xl:text-md'>Contact</h1>
                                    <h1 className='absolute md:left-[400px] sm:left-72 left-56 lg:left-[600px] text-sm xl:text-md'>Total Cases</h1>
                                </div>
                            </div>
                            <div className=' flex flex-col '>
                                {
                                    filteredPatient && filteredPatient.map((items, index) => (
                                        <div key={index} className='flex justify-between items-center odd:bg-gray-300 px-5 sm:px-10 py-3 relative'>
                                            <div className='flex flex-col sm:w-[7vw] w-[10vw]'>
                                                <h1 className='font-medium text-sm xl:text-md'>{items.fullname}</h1>
                                            </div>
                                            <h1 className='absolute md:left-36 hidden md:block lg:left-48 text-sm xl:text-md'>{items.age}</h1>
                                            <h1 className='md:block hidden absolute md:left-52 lg:left-[300px] text-sm xl:text-md'>{items.gender}</h1>
                                            <h1 className=' absolute md:left-72 left-28 sm:left-44 lg:left-[450px] text-sm xl:text-md'>{`${items.contact}`}</h1>
                                            <h1 className='absolute md:left-[440px] left-64 sm:left-80 lg:left-[650px] md:text-sm xl:text-md text-sm'>{totalCases[items._id] || 0}</h1>
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <MenuButton className=" w-full justify-center gap-x-1.5 rounded-md bg-white px-2 sm:px-3 py-1 sm:py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                        <ChevronDownIcon className=" sm:h-5 h-3 w-3 sm:w-5 text-gray-400" aria-hidden="true" />
                                                    </MenuButton>
                                                </div>

                                                <Transition
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <MenuItem>
                                                                {({ focus }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            focus ? 'bg-gray-100 text-[rgba(252,165,23,255)]' : 'text-[rgba(252,165,23,255)]',
                                                                            'block px-4 py-2 text-sm',
                                                                        )}
                                                                        onClick={() => newcase(index)}>
                                                                        Add a new Case
                                                                    </a>
                                                                )}
                                                            </MenuItem>
                                                            <MenuItem>
                                                                {({ focus }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            focus ? 'bg-gray-100 text-red-700' : 'text-red-700',
                                                                            'block px-4 py-2 text-sm',
                                                                        )}
                                                                        onClick={() => deletePatient(index)} >
                                                                        Delete Patient
                                                                    </a>
                                                                )}
                                                            </MenuItem>
                                                        </div>
                                                    </MenuItems>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modal && popupMessage && <Spinner text={popupMessage} />}
        </>
    );
}
