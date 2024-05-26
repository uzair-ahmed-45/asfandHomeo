import React from 'react'

export default function MobNavlist() {
    return (
        <>
            <div>
                <ul className='flex justify-between w-full text-white'>
                    <li className='flex flex-col justify-center items-center gap-y-2'>
                        <i class="fa-solid fa-house hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125 text-[20px]" ></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Home</li>
                    </li>
                    <li className='flex flex-col justify-center items-center gap-y-2'>
                        <i class="fa-solid fa-users-viewfinder hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>Patients</li>
                    </li>
                    <li className='flex flex-col justify-center items-center gap-y-2'>
                        <i class="fa-solid fa-user hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>New Patient</li>
                    </li>
                    <li className='flex flex-col justify-center items-center gap-y-2'>
                        <i class="fa-solid fa-calendar-plus hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "20px" }}></i>
                        <li className='text-xs hover:text-[rgb(95,141,184)] hover:transition-all hover:duration-500'>New Case</li>
                    </li>

                </ul>
            </div>
        </>
    )
}
