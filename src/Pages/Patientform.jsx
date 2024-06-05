import React, { useState } from 'react';
import Navbar from './Navbar';
import Inputs from '../Components/Inputs';
import Button from '../Components/Button';
import axios from 'axios';
import { useModal } from '../Hooks/useModal';
import Popup from '../Components/Popup';
import Spinner from '../Components/Spinner';
import { post } from '../api';

export default function PatientForm() {
    const [fullname, setfullname] = useState();
    const [age, setage] = useState();
    const [gender, setgender] = useState();
    const [contact, setcontact] = useState();
    const [occupation, setoccupation] = useState();
    const [address, setaddress] = useState();
    const [errors, setErrors] = useState({});
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader } = useModal();
    const [patientsuccess, setPatientSuccess] = useState(false);

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
        e.preventDefault();
        if (validatePatient(patientobj)) {
            try {
                const response = await post('/patient/register', patientobj)
                if (response.data) {
                    console.log(response.data);
                    setmodal(true);
                    setPatientSuccess(true);
                    setPopupMessage('Patient registered successfully');
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
                    <div className="h-[100vh] ms-3 sm:h-[110vh] bg-gray-200 py-5 sm:ms-44 md:ms-48 lg:ms-80 w-[75.5vw] m-auto flex justify-between sm:justify-center flex-col sm:flex-row">
                        <form
                            onSubmit={register}
                            className="px-5 py-5 mt-5 sm:mt-12 bg-white rounded-xl shadow-xl flex flex-col justify-between gap-y-3 w-[90vw] sm:w-[55vw]"
                        >
                            <h1 className="text-xl font-bold text-[rgb(22,57,90)] text-center">Add a Patient</h1>
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
                        </form>
                    </div>
                    {popupMessage && modal && <Popup text={popupMessage} />}
                </>
            )}
        </>
    );
}
