import React from 'react'
import Navlist from '../Components/Navlist'
import Button from '../Components/Button'

export default function Navbar() {
    return (
        <>
            <div className='w-[20vw] h-screen text-white bg-[rgb(22,57,90)] flex flex-col items-center justify-between py-24'>
                <div className='text-center'>
                    <h1 className='text-lg '>HomeoPathy Case Taking</h1>
                    <p>By Dr.AsfandYar</p>
                </div>
                <div>
                    <Navlist />
                </div>
                <div>
                    <Button name = "Logout"/>
                </div>

            </div>

        </>
    )
}
