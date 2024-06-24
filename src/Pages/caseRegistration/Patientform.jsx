import React, { useState } from 'react';
import Navbar from '../Navbar';
import Inputs from '../../Components/Inputs';
import Button from '../../Components/Button';
import axios from 'axios';
import { useModal } from '../../Hooks/useModal';
import Popup from '../../Components/Popup';
import Spinner from '../../Components/Spinner';
import { post } from '../../api';
import { useStoreId } from '../../Hooks/useStoreId'
import { useNavigate } from 'react-router-dom';

export default function PatientForm() {
    const [fullname, setfullname] = useState();
    const [age, setage] = useState();
    const [gender, setgender] = useState();
    const [contact, setcontact] = useState();
    const [occupation, setoccupation] = useState();
    const [address, setaddress] = useState();
    const [errors, setErrors] = useState({});
    // const { patientId, setpatientId } = useStoreId()
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, patientId, setpatientId } = useModal();
    const [patientsuccess, setPatientSuccess] = useState(false);
    const nav = useNavigate()

    const validatePatient = (data) => {
        const newErrors = {};
        let isValid = true;

        if (!data.fullname) {
            newErrors.fullname = 'Full name is required';
            setPopupMessage(newErrors.fullname);
        } else if (!data.age) {
            newErrors.age = 'Age is required';
            setPopupMessage(newErrors.age);
        } else if (!data.gender) {
            newErrors.gender = 'Gender is required';
            setPopupMessage(newErrors.gender);
        } else if (!data.contact) {
            newErrors.contact = 'Contact number is required';
            setPopupMessage(newErrors.contact);
        } else if (!/^\d{11}$/.test(data.contact)) {
            newErrors.contact = 'Invalid contact number';
            setPopupMessage(newErrors.contact);
        } else if (!data.occupation) {
            newErrors.occupation = 'Occupation is required';
            setPopupMessage(newErrors.occupation);
        } else if (!data.address) {
            newErrors.address = 'Address is required';
            setPopupMessage(newErrors.address);
        }

        if (Object.keys(newErrors).length > 0) {
            isValid = false;
            setmodal(true);
        }

        setErrors(newErrors);
        return isValid;
    };

    const patientobj = {
        fullname: fullname,
        age: age,
        gender: gender,
        contact: contact,
        occupation: occupation,
        address: address,
    };

    const register = async (e) => {
        // e.preventDefault();
        if (validatePatient(patientobj)) {
            try {
                const response = await post('/patient/register', patientobj)
                if (response.data) {
                    console.log(response.data);
                    setPatientSuccess(true);
                    setpatientId(response.data._id);
                    console.log(patientId);
                    nav("/case/chiefComplaint")
                    setmodal(true);
                    setfullname('');
                    setage('');
                    setgender('');
                    setcontact('');
                    setoccupation('');
                    setaddress('');

                }
            } catch (err) {
                console.log(err.response.data.message);
                if (err.response.data.message == 'Patient already registered') {
                    setPopupMessage("Patient already registered")
                    setmodal(true)

                }
            }
        }

    };

    return (
        <>
            {loader ? (
                <Spinner />
            ) : (
                <>
                    <Navbar />
                    <div className="h-auto ms-3 py-20  bg-gray-200 sm:py-10 sm:ms-44 md:ms-48 lg:ms-80 w-[75.5vw] m-auto flex justify-between sm:justify-center flex-col sm:flex-row">
                        <div className="px-5 py-5 mt-5 sm:mt-12 bg-white rounded-xl shadow-xl flex flex-col justify-center gap-y-5 w-[90vw] sm:w-[55vw] ">
                            <div className='flex items-center m-auto'>
                                <img src="/patient.png" alt="" className='w-16 h-24' />
                                <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Register Patient</h1>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 sm:gap-x-5">

                                <label htmlFor="fullname" className="sm:text-sm md:text-lg text-xs">
                                    Full Name
                                </label>
                                <div>
                                    <Inputs
                                        type="text"
                                        placeholder="Full Name"
                                        name="fullname"
                                        value={fullname}
                                        class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]"
                                        changeevent={(e) => setfullname(e.target.value)}
                                    />
                                    {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname}</p>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 sm:gap-x-5">
                                <label htmlFor="age" className="sm:text-sm md:text-lg text-xs">
                                    Age
                                </label>
                                <div>
                                    <Inputs
                                        type="text"
                                        placeholder="Age"
                                        name="age"
                                        value={age}
                                        class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]"
                                        changeevent={(e) => setage(e.target.value)}
                                    />
                                    {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 sm:gap-x-5">
                                <label htmlFor="gender" className="sm:text-sm md:text-lg text-xs">
                                    Gender
                                </label>
                                <div>
                                    <Inputs
                                        type="text"
                                        placeholder="Gender"
                                        name="gender"
                                        value={gender}
                                        class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]"
                                        changeevent={(e) => setgender(e.target.value)}
                                    />
                                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 sm:gap-x-5 relative">
                                <label htmlFor="contact" className="sm:text-sm md:text-lg text-xs">
                                    Contact Number
                                </label>
                                <div>
                                    <Inputs
                                        type="text"
                                        placeholder="Contact Number"
                                        name="contact"
                                        value={contact}
                                        class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]"
                                        changeevent={(e) => setcontact(e.target.value)}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-x-1 md:gap-x-2 sm:gap-x-2">
                                <label htmlFor="occupation" className="sm:text-sm md:text-lg text-[10px]">
                                    Occupation
                                </label>
                                <div>
                                    <Inputs
                                        type="text"
                                        placeholder="Occupation"
                                        name="occupation"
                                        value={occupation}
                                        class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]"
                                        changeevent={(e) => setoccupation(e.target.value)}
                                    />
                                    {errors.occupation && <p className="text-red-500 text-xs">{errors.occupation}</p>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-x-2 sm:gap-x-5">
                                <label htmlFor="address" className="sm:text-sm md:text-lg text-xs">
                                    Address
                                </label>
                                <div>
                                    <Inputs
                                        type="text"
                                        placeholder="Address"
                                        name="address"
                                        value={address}
                                        class="px-4 py-2 bg-gray-200 rounded-lg w-[60vw] sm:w-[40vw]"
                                        changeevent={(e) => setaddress(e.target.value)}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                                </div>
                            </div>
                            <div>
                                <Button name="Register" class="rounded-lg hover:scale-100" click={register} />
                            </div>
                        </div>
                    </div>
                    {popupMessage && modal && <Popup text={popupMessage} />}
                </>
            )}
        </>
    );
}
