import React, { useState } from 'react'
import Inputs from "../Components/Inputs"
import Button from '../Components/Button'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [name, setname] = useState()
  const [password, setpassword] = useState()
  const [Error, setError] = useState('')
  const nav = useNavigate()

  const apiUrl = process.env.REACT_APP_API_URL

  function SignIn() {
    const doctor = {
      name: name,
      password: password
    }
    axios.post(`${apiUrl}/doctor/login`, doctor)
      .then((res) => {
        if (res.data) {
          nav("/home")
        }
        console.log(res.data);
      })
      .catch((error) => {
        // Error
        console.log(error.response.data.message);
        // if (error.response.data.body == "Doctor not found") {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   // console.log(error.response.data);
        //   alert("doctor not found")
        //   // console.log(error.response.status);
        //   // console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the 
        //   // browser and an instance of
        //   // http.ClientRequest in node.js
        //   // console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   // console.log('Error', error.message); 
        // }
        // // console.log(error.config);
      });


  }


  return (
    <>
      <div className='bg-[rgba(22,57,90,0.26)] h-screen  flex '>
        <div className='w-[80vw] lg:w-1/2  flex flex-col items-center m-auto justify-center gap-y-10 py-10'>
          <i class="fa-solid fa-users hover:text-[rgb(95,141,184)] text-[rgb(22,57,90)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "80px" }}></i>
          <div className='flex flex-col gap-y-6 items-center'>
            <div className='relative w-full'>
              <i class="fa-solid fa-user absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
              <Inputs class="w-full" type="text" placeholder="Name" changeevent={(e) => setname(e.target.value)} />
            </div>
            <div className='relative w-full'>
              <i class="fa-solid fa-lock absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
              <Inputs class="w-full" type="password" placeholder="Password" changeevent={(e) => setpassword(e.target.value)} />
            </div>
            <div>
              <h1 className='text-[rgb(22,57,90)] font-bold text-sm text-center'>Forget Password?</h1>
              <h1 className='text-[rgb(22,57,90)] font-bold text-sm text-center' onClick={() => nav('/signup')}>Create an account Signup</h1>
            </div>
            <Button name="Sign In" click={SignIn} />
          </div>

        </div>

      </div>
    </>
  )
}
