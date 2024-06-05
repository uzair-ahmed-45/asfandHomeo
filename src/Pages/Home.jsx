import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useModal } from '../Hooks/useModal'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { get } from "../api"

export default function () {
  const { verifyUser, setverifyUser, loader, setloader } = useModal()
  const [totalpatients, settotalpatients] = useState([])
  useEffect(() => {
    const fetchtotalPatient = async () => {
      try {
        const res = await get('/patient/list')
        console.log(res.data);
        settotalpatients(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchtotalPatient()
  }, [])



  return (
    <>
      {loader ? <Spinner /> :
        <>
          <Navbar />
          <div className=''>
            <div className='flex md:flex-row flex-col justify-evenly gap-y-5 md:justify-between sm:w-[75vw] m-auto sm:px-40 md:px-20 gap-x-4 lg:px-32 sm:py-40 h-[120vh] bg-gray-200  sm:h-screen items-center sm:ms-40  lg:ms-60 xl:ms-80 text-center'>
              <div className='text-white px-20 py-20 rounded-xl  bg-gradient-to-r from-[rgb(22,57,90)] to-[rgb(40,84,126)] drop-shadow-[2px_2px_10px_rgb(22,57,90)]'>
                <h1 className='text-3xl font-medium'>Total Patients</h1>
                <p className='text-3xl font-medium'>{totalpatients.length}</p>
              </div>
              <div className='bg-white px-20 py-20 rounded-xl  drop-shadow-[2px_2px_10px_rgb(22,57,90)]'>
                <h1 className='text-3xl font-medium'>Total Cases</h1>
                <p className='text-3xl font-medium'>1800</p>
              </div>
            </div>
          </div>

        </>
      }


    </>
  )
}
