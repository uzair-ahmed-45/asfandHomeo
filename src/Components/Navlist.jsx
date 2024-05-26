import React from 'react'

export default function Navlist() {
    return (
        <>
            <div>
                <ul className='flex flex-col gap-y-10  '>
                    <div className='flex gap-x-4 cursor-pointer'>
                        <i class="fa-solid fa-house hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className=' hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Home</li>
                    </div>
                    <div className='flex gap-x-4 cursor-pointer '>
                        <i class="fa-solid fa-users-viewfinder hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className=' hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>My Patients</li>
                    </div>
                    <div className='flex gap-x-4 cursor-pointer '>
                        <i class="fa-solid fa-hospital-user hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className=' hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Add a new Patient</li>
                    </div>
                    <div className='flex gap-x-4 cursor-pointer '>
                        <i class="fa-solid fa-calendar-plus hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className=' hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Add a new Case</li>
                    </div>
                </ul>


            </div>
        </>
    )
}
