import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../Hooks/useModal'

export default function MobNavlist() {
    const { loader, setloader } = useModal()

    const nav = useNavigate()

    const navigation = (path) => {
        nav(path)
        setloader(true)
    }
    return (
        <>
            <div>
                <ul className='flex justify-between w-full text-white' >
                    <li className='flex flex-col justify-center items-center gap-y-2' onClick={() => navigation('/home')}>
                        <i class="fa-solid fa-house hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125 text-[20px]" ></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Home</li>
                    </li>
                    <li className='flex flex-col justify-center items-center gap-y-2' onClick={() => navigation('/patients')}>
                        <i class="fa-solid fa-users-viewfinder hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Patients</li>
                    </li>
                    <li className='flex flex-col justify-center items-center gap-y-2' onClick={() => navigation("/newcase")}>
                        <i class="fa-solid fa-calendar-plus hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>New Case</li>
                    </li>
                    <li className='flex flex-col justify-center items-center gap-y-2' onClick={() => navigation("/profile")}>
                        <i class="fa-solid fa-user-doctor hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Profile</li>
                    </li>

                </ul>
            </div>
        </>
    )
}
