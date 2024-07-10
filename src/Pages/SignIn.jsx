import React, { useEffect, useState } from 'react';
import Inputs from "../Components/Inputs";
import Button from '../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../Hooks/useModal';
import Popup from '../Components/Popup';
import Spinner from '../Components/Spinner';
import { get, post } from '../api';
import { useCookies } from 'react-cookie'
import { jwtDecode } from "jwt-decode"

export default function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState({})
  const [popupMessage, setPopupMessage] = useState('');
  const { modal, setmodal, verifyUser, setverifyUser, loader, setloader, loggedInDoctor, setLoggedInDoctor } = useModal()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

  useEffect(() => {
    if (cookies.access_token && cookies.refresh_token) {
      navigate('/home');
    }
  }, [cookies, navigate]);
  function show() {
    setShowPassword(!showPassword);
    sethidePassword(!hidePassword)
  }

  const validateDoctor = (data) => {
    const newErrors = {}
    let isValid = true

    if (!data.name) {
      newErrors.name = "Name is required"
    }
    if (!data.password) {
      newErrors.password = "Password is required"
    }
    if (Object.keys(newErrors).length > 0) {
      isValid = false
      setmodal(true)
    }
    seterror(newErrors)
    return isValid
  }

  const handleSignIn = async () => {
    const doctor = {
      name: name,
      password: password,
    };
    if (validateDoctor(doctor)) {
      try {
        const response = await post('/doctor/login', doctor)
        if (response) {
          setloader(true)
          const doctor = response.data
          console.log(doctor);
          setLoggedInDoctor(doctor)
          console.log(loggedInDoctor)
          navigate("/home");
          setverifyUser(true)
          console.log(response.data.accessToken);
          console.log(response.data.refreshToken);
          // Decode tokens to get expiration time
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;

          const decodedAccessToken = jwtDecode(accessToken);
          const decodedRefreshToken = jwtDecode(refreshToken);

          const accessTokenExpires = new Date(decodedAccessToken.exp * 1000);
          const refreshTokenExpires = new Date(decodedRefreshToken.exp * 1000);

          setCookie('access_token', accessToken, { path: '/', expires: accessTokenExpires });
          setCookie('refresh_token', refreshToken, { path: '/', expires: refreshTokenExpires });

          setName('')
          setPassword('')
        }
      } catch (error) {
        console.log(error.response.data.message);
        setPopupMessage(error.response.data.message)
        setmodal(true)
        setName('')
        setPassword('')
      }
    }



  }

  return (
    <>
      {
        loader ? <Spinner /> :
          <>
            <div className='bg-[rgba(22,57,90,0.26)] h-screen  flex '>
              <div className='w-[80vw] lg:w-1/2  flex flex-col items-center m-auto justify-center gap-y-10 py-10'>
                <i className="fa-solid fa-users hover:text-[rgb(95,141,184)] text-[rgb(22,57,90)] hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "80px" }}></i>
                <div className='flex flex-col gap-y-6 items-center'>
                  <div className='relative w-full'>
                    <i className="fa-solid fa-user absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
                    <Inputs class="w-full" type="text" placeholder="Name" changeevent={(e) => setName(e.target.value)} />
                    {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
                  </div>
                  <div className='relative w-full'>
                    <i className="fa-solid fa-lock absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
                    <Inputs class="w-full" type={showPassword ? 'text' : 'password'} placeholder="Password" changeevent={(e) => setPassword(e.target.value)} />
                    {showPassword ? (
                      <i className="fa-solid fa-eye-slash absolute right-[5%] top-[50%] transform -translate-y-1/2 cursor-pointer hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" onClick={show}></i>
                    ) : (
                      <i className="fa-solid fa-eye absolute right-[5%] top-[50%] transform -translate-y-1/2 cursor-pointer hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" onClick={show}></i>
                    )}
                    {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
                  </div>

                  <div className='flex justify-center w-full '>
                    <h1 className='text-[rgb(22,57,90)] font-bold text-xs md:text-sm text-center cursor-pointer'>Forget Password?</h1>
                  </div>
                  <Button name="Sign In" click={handleSignIn} />
                </div>
              </div>
              {popupMessage && modal && <Popup text={popupMessage} />}

            </div>
          </>
      }

    </>
  );
}
