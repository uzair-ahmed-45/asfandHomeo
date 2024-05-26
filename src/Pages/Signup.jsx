import React, { useState } from 'react'
import Inputs from "../Components/Inputs"
import Button from '../Components/Button'
import axios from 'axios'

export default function SignIn() {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [Error, setError] = useState('')

    function SignUp() {
        const dobj = {
            name: name,
            email : email,
            password: password
        }
        axios.post('http://localhost:5000/api/doctor/register', dobj)
            .then((res) => {
                if (res.data) {
                    alert("User registered successfully");
                }
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
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
                            <i class="fa-solid fa-user absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
                            <Inputs class="w-full" type="email" placeholder="email" changeevent={(e) => setemail(e.target.value)} />
                        </div>
                        <div className='relative w-full'>
                            <i class="fa-solid fa-lock absolute left-4 top-3 hover:text-[rgb(95,141,184)] text-gray-500 hover:transition-all hover:duration-500 hover:scale-125" style={{ fontSize: "25px" }}></i>
                            <Inputs class="w-full" type="password" placeholder="Password" changeevent={(e) => setpassword(e.target.value)} />
                        </div>
                        <div>
                            <h1 className='text-[rgb(22,57,90)] font-bold text-sm text-center'>Forget Password?</h1>
                        </div>
                        <Button name="Sign Up" click={SignUp} />
                    </div>

                </div>

            </div>
        </>
    )
}
