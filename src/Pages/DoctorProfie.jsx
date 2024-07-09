import React, { useEffect } from 'react'
import Spinner from '../Components/Spinner';
import Navbar from '../Pages/Navbar';
import { useModal } from '../Hooks/useModal';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

export default function DoctorProfie() {
    const { modal, setmodal, verifyUser, setverifyUser, loader, setloader, loggedInDoctor, setLoggedInDoctor } = useModal()
    const nav = useNavigate()
    const navigation = (path) => {
        nav(path)
        setloader(true)
    }
    useEffect(() => {
        console.log(loggedInDoctor);
    }, [loggedInDoctor])

    return (
        <>
            {loader ? <Spinner /> :
                <div className='sm:flex h-screen py-20 sm:py-12 lg:py-10 bg-gray-200'>
                    <Navbar />
                    {
                        loggedInDoctor ?
                            <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-20 sm:mt-10 py-10 rounded-xl shadow-xl px-5'>
                                <div className='flex flex-col justify-center items-center gap-y-5'>
                                    <div className='bg-[rgb(95,141,184)] rounded-full w-[120px] px-6 py-6 hover:transition-all hover:duration-500 hover:scale-125 cursor-pointer'>
                                        <i className="fa-solid fa-user text-[rgb(22,57,90)] " style={{ fontSize: "80px" }}></i>
                                    </div>
                                    <div className=''>
                                        <h1 className='text-center text-xl font-bold'>{loggedInDoctor?.adminFound?.name}</h1>
                                        <h1 className=''>HomeoPathic Doctor</h1>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between w-full gap-y-5 sm:px-20 lg:px-24 xl:px-40'>
                                    <div className='flex justify-between w-full '>
                                        <h1 className='text-lg font-bold'>Email</h1>
                                        <h1 className='text-lg font-medium'>{loggedInDoctor?.adminFound?.email}</h1>
                                    </div>
                                    <div className='flex justify-between w-full  items-center'>
                                        <h1 className='text-lg font-bold'>Password</h1>
                                        <h1 className='font-bold text-xl tracking-widest'>........</h1>
                                    </div>
                                </div>
                                <div>
                                    <Button name="Change Password" class="hover:transform-none " click={() => navigation('/profile/changePassword')} />
                                </div>
                            </div> :
                            <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-20 sm:mt-10 py-10 rounded-xl shadow-xl px-5'>
                                No Admin Found
                            </div>
                    }

                </div>

            }
        </>
    )
}
