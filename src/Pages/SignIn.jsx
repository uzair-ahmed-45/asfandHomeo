import React, { useEffect, useState } from 'react';
import Inputs from "../Components/Inputs";
import Button from '../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../Hooks/useModal';
import Popup from '../Components/Popup';

export default function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passmsg, setpassmsg] = useState(false);
  const { modal, setmodal , verifyUser , setverifyUser } = useModal()

  const navigate = useNavigate();

  useEffect(() => {
    if (!verifyUser) {
      alert("login first");
      navigate('/');
    }
  }, [verifyUser, navigate]);


  // const apiUrl = process.env.REACT_APP_API_URL;
  // console.log('API URL:', apiUrl);

  function handleSignIn() {
    const doctor = {
      name: name,
      password: password,
    };

    axios.post(`/api/doctor/login`, doctor)
      .then((res) => {
        if (res.data) {
          nav("/home");
          setverifyUser(true)

        }
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.data.message == "Doctor not found") {
          setmodal(true)
        }
        else if (error.response.data.message == "Incorrect Password") {
          setpassmsg(true)

        }
        else if (error.response.data.message == "All fields are required") {
          setmodal(true)

        }

      });
    setName('')
    setPassword('')
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
          <p className='text-red-700 font-bold float-left '>{passmsg && "Incorrect Password"}</p>
          <div className='flex justify-between w-full '>
            <h1 className='text-[rgb(22,57,90)] font-bold text-xs md:text-sm text-center cursor-pointer'>Forget Password?</h1>
            <h1 className='text-[rgb(22,57,90)] font-bold text-xs md:text-sm text-center cursor-pointer' onClick={() => nav('/signup')}>Register a Doctor</h1>
          </div>
          <Button name="Sign In" click={handleSignIn} />
        </div>
      </div>
      <Popup text="Admin not Found" />
      <Popup text="All fields are required" />

    </div>
  );
}
