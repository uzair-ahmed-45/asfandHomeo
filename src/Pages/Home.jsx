import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useModal } from '../Hooks/useModal'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Components/Spinner'
import axios from 'axios'

export default function () {
  const { verifyUser, setverifyUser, loader, setloader } = useModal()
  const [totalpatients , settotalpatients] = useState([])
  useEffect(()=>{
    axios.get('/api/patient/list').then((res)=>{
      // console.log(res.data.data);
      settotalpatients(res.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])



  return (
    <>
      {loader ? <Spinner /> :
        <>
          <Navbar />
          <div className=''>
            <div className='flex md:flex-row flex-col sm:mt-0 mt-2 justify-center gap-y-5 md:justify-between sm:w-[75vw] m-auto sm:px-40 md:px-20 gap-x-4 lg:px-32 sm:py-40 items-center sm:ms-40  lg:ms-60 xl:ms-80 text-center'>
              <div className='bg-white px-20 py-20 rounded-xl shadow-xl '>
                <h1>Total Patients</h1>
                <p>{totalpatients.length}</p>
              </div>
              <div className='bg-white px-20 py-20 rounded-xl shadow-xl '>
                <h1>Total Cases</h1>
                <p>1800</p>
              </div>
            </div>
          </div>

        </>
      }


    </>
  )
}
