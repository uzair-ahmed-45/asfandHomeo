import React from 'react'
import Navlist from '../Components/Navlist'
import Button from '../Components/Button'
import MobNavlist from '../Components/MobNavlist'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../Hooks/useModal'
import { useCookies } from 'react-cookie'


export default function Navbar() {
    const nav = useNavigate()
    const { modal, setmodal, verifyUser, setverifyUser, loader, setloader, loggedInDoctor, setLoggedInDoctor } = useModal()
    const [, , removeCookie] = useCookies(['access_token', 'refresh_token']);

    const navigation = (path) => {
        nav(path)
    }
    function logout() {
        // Remove tokens from cookies
        removeCookie('access_token', { path: '/' });
        removeCookie('refresh_token', { path: '/' });

        // Clear any additional state or local storage
        localStorage.removeItem('loggedInDoctor');
        setLoggedInDoctor(null);

        // Navigate to the login page
        nav('/');
        setloader(true);
    }
    return (
        <>
            <div className='w-[25vw] hidden sm:block bg-[rgb(22,57,90)] h-full fixed top-0 left-0 right-0 '>
                <div className=' text-white flex flex-col items-center justify-between gap-y-10 py-16'>
                    <div className='flex flex-col items-center text-center'>
                        <img src="/logo.png" className='w-20' alt="" />
                        <h1 className='sm:text-sm md:text-md lg:text-lg text-[#fca517] font-bold'>HOMEOPPATHY CASE TAKING</h1>
                        <p className='text-xs'>BY DR.ASFANDYAR</p>
                    </div>
                    <div>
                        <Navlist />
                    </div>
                    <div>
                        <Button name="Logout" click={logout} />
                    </div>

                </div>
            </div>
            <div className='block sm:hidden fixed top-0 left-0 right-0 bg-gray-200 z-10'>
                <div className='flex justify-between px-6 py-5'>
                    <div className=''>
                        <h1 className='text-md'>HOMEOPPATHY CASE TAKING</h1>
                        <p className='text-xs'>BY DR.ASFANDYAR</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-right-from-bracket text-[30px] text-[rgb(22,57,90)] hover:text-[rgb(95,141,184)] hover:scale-125 hover:transition-all hover:duration-300" onClick={logout}></i>
                    </div>

                </div>
            </div>
            {/* mobile navbar */}
            <div className='block sm:hidden fixed bottom-[-10px] left-0 right-0 bg-[rgb(22,57,90)] w-full py-5 rounded-xl px-4 z-10'>
                <MobNavlist />
            </div>

        </>
    )
}
