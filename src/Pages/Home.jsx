import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useModal } from '../Hooks/useModal'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { get, post } from "../api"

export default function () {
  const { loader, setloader, totalCases, settotalCases, patients, setpatients } = useModal()
  const [totalpatients, settotalpatients] = useState([])


  useEffect(() => {
    const fetchtotalPatient = async () => {
      try {
        const response = await get('/patient/list');
        const patients = response.data;
        setpatients(patients);
        const res = await get('/case/countTotalCases')
        const countTotalCases = res.data
        settotalCases(countTotalCases)
        console.log(totalCases);
      } catch (error) {
        console.log(error);
      }
    }
    fetchtotalPatient()
  }, [])

  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = `${Math.ceil(count + increment)}`;
        setTimeout(updateCounter, 50);
      } else counter.innerText = target;
    };
    updateCounter();
  });


  return (
    <>
      {loader ? <Spinner /> :
        <>
          <Navbar />
          <div className=''>
            <div className='flex md:flex-row flex-col justify-evenly gap-y-5 md:justify-between sm:w-[75vw] m-auto sm:px-40 md:px-20 gap-x-4 lg:px-32 px-16 sm:py-40 py-20 bg-gray-200  h-screen items-center sm:ms-40  lg:ms-60 xl:ms-80 text-center z-0'>
              <div className='text-white w-[80vw] sm:py-20 py-10 rounded-xl  bg-gradient-to-r from-[rgb(22,57,90)] to-[rgb(40,84,126)] drop-shadow-[2px_2px_10px_rgb(22,57,90)]'>
                <h1 className='text-2xl sm:text-3xl font-medium'>Total Patients</h1>
                <div className='text-2xl sm:text-3xl  font-medium counter' data-target={patients.length}></div>

              </div>
              <div className='bg-white w-[80vw] sm:py-20 py-10 rounded-xl  drop-shadow-[2px_2px_10px_rgb(22,57,90)]'>
                <h1 className='text-2xl sm:text-3xl font-medium'>Total Cases</h1>
                <div className='text-2xl sm:text-3xl  font-medium counter' data-target={totalCases}></div>
              </div>
            </div>
          </div>

        </>
      }


    </>
  )
}
