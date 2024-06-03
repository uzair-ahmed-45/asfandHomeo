import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../Hooks/useModal'

export default function Navlist() {
    const nav = useNavigate()
    const { loader, setloader } = useModal()

    const navigation = (path) => {
        nav(path)
        setloader(true)


    }

    return (
        <>
            <div>
                <ul className='flex flex-col gap-y-10  '>
                    <div className='flex sm:gap-x-2 md:gap-x-4 cursor-pointer' onClick={() => navigation('/home')}>
                        <i class="fa-solid fa-house hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125 text-[20px]" ></i>
                        <li className='sm:text-xs md:text-md lg:text-lg hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Home</li>
                    </div>
                    <div className='flex sm:gap-x-2 md:gap-x-4 cursor-pointer ' onClick={() => navigation('/patients')}>
                        <i class="fa-solid fa-users-viewfinder hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='sm:text-xs md:text-md lg:text-lg hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>My Patients</li>
                    </div>
                    <div className='flex sm:gap-x-2 md:gap-x-4 cursor-pointer ' onClick={() => navigation('/patientform')}>
                        <i class="fa-solid fa-user hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='sm:text-xs md:text-md lg:text-lg hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Add a new Patients</li>
                    </div>
                    <div className='flex sm:gap-x-2 md:gap-x-4 cursor-pointer '>
                        <i class="fa-solid fa-calendar-plus hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='sm:text-xs md:text-md lg:text-lg hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Add a new Case</li>
                    </div>
                </ul>


            </div>
        </>
    )
}
