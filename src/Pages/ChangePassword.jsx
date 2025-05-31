import React, { useEffect, useState } from 'react'
import Spinner from '../Components/Spinner';
import Navbar from '../Pages/Navbar';
import { useModal } from '../Hooks/useModal';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';
import Inputs from '../Components/Inputs';
import { post } from '../api';
import Popup from '../Components/Popup';

export default function ChangePassword() {
    const { modal, setmodal, verifyUser, setverifyUser, loader, setloader, loggedInDoctor, setLoggedInDoctor } = useModal()
    const nav = useNavigate()
    const [showOldPassword, setshowOldPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [popupMessage, setpopupMessage] = useState('')
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmNewPassword, setconfirmNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const changePassword = async (e) => {
        e.preventDefault()
        const changePasswordObj = {
            doctorId: loggedInDoctor.adminFound._id,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmNewPassword
        }
        try {
            setLoading(true)
            const response = await post('/doctor/changePassword', changePasswordObj)
            setmodal(true)
            setpopupMessage("Password Changed Successfully")
            setoldPassword('')
            setnewPassword('')
            setconfirmNewPassword('')
        } catch (error) {
            console.log(error.response.data.message);
            if (error.response.data.message === "Invalid Old Password") {
                setmodal(true)
                setpopupMessage("Invalid Old Password")
            } else if (error.response.data.message === "Password Doesnot Matched") {
                setmodal(true)
                setpopupMessage("Password Doesnot Matched")
            }
        } finally {
            setLoading(false)
        }
    }

    function show() {
        setshowOldPassword(!showOldPassword);
    }
    function shownew() {
        setshowNewPassword(!showNewPassword)
    }
    function showconfirm() {
        setshowConfirmPassword(!showConfirmPassword)
    }

    const navigation = (path) => {
        nav(path)
        setloader(true)
    }


    return (
        <>
            <div className='sm:flex h-screen py-16 sm:py-20 lg:py-24 bg-gray-200'>
                <Navbar />
                {
                    loggedInDoctor ?
                        <form action='' onSubmit={ChangePassword} className='flex flex-col gap-y-5 justify-between w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-20 sm:mt-10 py-10 rounded-xl shadow-xl px-10'>
                            <div className='flex items-center gap-x-3'>
                                <i class="fa-solid fa-arrow-left text-[20px] cursor-pointer text-[rgb(22,57,90)] hover:bg-[rgb(95,141,184)] px-2 py-2 rounded-full hover:transition-all hover:duration-500 hover:scale-110" onClick={() => navigation('/profile')}></i>
                                <h1 className='text-lg font-bold text-[rgb(22,57,90)]'>Change Password</h1>
                            </div>
                            <div className='flex flex-col justify-between items-center w-full gap-y-5 '>
                                <div className='flex sm:flex-row flex-col justify-between w-full sm:items-center gap-y-2 '>
                                    <h1 className='text-lg '>Old Password</h1>
                                    <div className='relative '>
                                        <Inputs class="hover:drop-shadow-none hover:shadow-none rounded-lg border-2 border-solid border-[rgb(22,57,90)] px-4 py-2 w-full" type={showOldPassword ? `text` : `Password`} changeevent={(e) => setoldPassword(e.target.value)} value={oldPassword} />
                                        {showOldPassword ? (
                                            <i className="fa-solid fa-eye-slash absolute right-[5%] top-[50%] transform -translate-y-1/2 cursor-pointer hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" onClick={show}></i>
                                        ) : (
                                            <i className="fa-solid fa-eye absolute right-[5%] top-[50%] transform -translate-y-1/2 cursor-pointer hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" onClick={show}></i>
                                        )}
                                    </div>

                                </div>
                                <div className='flex flex-col sm:flex-row justify-between w-full  sm:items-center gap-y-2'>
                                    <h1 className='text-lg '>New Password</h1>
                                    <div className='relative'>
                                        <Inputs class="hover:drop-shadow-none hover:shadow-none rounded-lg border-2 border-solid border-[rgb(22,57,90)] px-4 py-2 w-full" type={showNewPassword ? `text` : `Password`} changeevent={(e) => setnewPassword(e.target.value)} value={newPassword} />
                                        {showNewPassword ? (
                                            <i className="fa-solid fa-eye-slash absolute right-[5%] top-[50%] transform -translate-y-1/2 cursor-pointer hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" onClick={shownew}></i>
                                        ) : (
                                            <i className="fa-solid fa-eye absolute right-[5%] top-[50%] transform -translate-y-1/2 cursor-pointer hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" onClick={shownew}></i>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center '>
                                <Button name="Done" isLoading={loading} class="rounded-lg hover:transform-none" click={changePassword} />
                            </div>
                        </form> :
                        <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-20 sm:mt-10 py-10 rounded-xl shadow-xl px-5'>
                            No Admin Found
                        </div>
                }

            </div>

            {modal && popupMessage && <Popup text={popupMessage} />}
        </>
    )
}
