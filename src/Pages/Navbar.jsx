import React from 'react'
import Navlist from '../Components/Navlist'
import Button from '../Components/Button'
import MobNavlist from '../Components/MobNavlist'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const nav = useNavigate()
    const navigation = (path) => {
        nav(path)
    }
    return (
        <>
            <div className='w-[25vw] hidden sm:block bg-[rgb(22,57,90)] h-full fixed top-0 left-0 right-0 '>
                <div className=' text-white flex flex-col items-center justify-between gap-y-10 py-24'>
                    <div className='text-center'>
                        <h1 className='sm:text-sm md:text-md lg:text-lg '>HomeoPathy Case Taking</h1>
                        <p className='text-xs'>By Dr.AsfandYar</p>
                    </div>
                    <div>
                        <Navlist />
                    </div>
                    <div>
                        <Button name="Logout"  click = {()=> navigation('/')}/>
                    </div>

                </div>
            </div>
            <div className='block sm:hidden'>
                <div className='flex justify-between px-6 py-5'>
                    <div className=''>
                        <h1 className='text-md'>HomeoPathy Case Taking</h1>
                        <p className='text-xs'>By Dr.AsfandYar</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-right-from-bracket text-[30px] text-[rgb(22,57,90)] hover:text-[rgb(95,141,184)] hover:scale-125 hover:transition-all hover:duration-300" onClick = {()=> navigation('/')}></i>
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
