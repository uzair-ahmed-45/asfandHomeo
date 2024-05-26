import React, { useState } from 'react';
import Inputs from "../Components/Inputs";
import Button from '../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('API URL:', apiUrl);

  function handleSignIn() {
    const doctor = {
      name: name,
      password: password,
    };

    axios.post(`${apiUrl}/doctor/login`, doctor)
      .then((res) => {
        if (res.data) {
          nav("/home");
        }
        console.log(res.data);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'An error occurred');
        console.log(error.response?.data?.message || 'An error occurred');
      });
  }

  return (
    <div className='bg-[rgba(22,57,90,0.26)] h-screen  flex '>
      <div className='w-[80vw] lg:w-1/2  flex flex-col items-center m-auto justify-center gap-y-10 py-10'>
        <i className="fa-solid fa-users hover:text-[rgb(95,141,184)] text-[rgb(22,57,90)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "80px" }}></i>
        <div className='flex flex-col gap-y-6 items-center'>
          <div className='relative w-full'>
            <i className="fa-solid fa-user absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
            <Inputs class="w-full" type="text" placeholder="Name" changeevent={(e) => setName(e.target.value)} />
          </div>
          <div className='relative w-full'>
            <i className="fa-solid fa-lock absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
            <Inputs class="w-full" type="password" placeholder="Password" changeevent={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <h1 className='text-[rgb(22,57,90)] font-bold text-sm text-center'>Forget Password?</h1>
            <h1 className='text-[rgb(22,57,90)] font-bold text-sm text-center' onClick={() => nav('/signup')}>Create an account Signup</h1>
          </div>
          <Button name="Sign In" click={handleSignIn} />
        </div>
      </div>
    </div>
  );
}
