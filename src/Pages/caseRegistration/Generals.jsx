import React, { useState } from 'react'
import Navbar from "../Navbar"
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import "./case.css"
import { post, put } from "../../api"
import { useModal } from '../../Hooks/useModal'

export default function Generals() {

    const { modal, setmodal, loader, setloader, complainId, setcomplainId } = useModal();

    const [generalData, setgeneralData] = useState({
        thermal: [],
        thermalOther: "",
        hungerTolerance: [],
        hungerToleranceOther: "",
        eatingSpeed: [],
        eatingSpeedOther: "",
        appetite: [],
        appetiteOther: "",
        perspiration: [],
        perspirationOther: "",
        badHabits: [],
        badHabitsOther: "",
        thirst: [],
        thirstOther: "",
        dream: [],
        dreamOther: "",
        urine: [],
        urineOther: "",
        sleep: [],
        sleepOther: "",
        sleepPosition: [],
        sleepPositionOther: "",
        foodDesires: [],
        foodDesiresOther: "",
        stool: [],
        stoolOther: "",
        sensitivity: [],
        sensitivityOther: ""
    })
    const handleChange = (event, category) => {
        const { type, value, checked } = event.target;

        setgeneralData(prevState => {
            if (type === "checkbox") {
                const currentValues = prevState[category];
                if (checked) {
                    return { ...prevState, [category]: [...currentValues, value] };
                } else {
                    return {
                        ...prevState,
                        [category]: currentValues.filter(item => item !== value)
                    };
                }
            } else {
                // For text input (Other), directly update the corresponding state
                return { ...prevState, [`${category}Other`]: value };
            }
        });
    };



    const next = async () => {
        const generalObject = {
            complainId,
            thermal: generalData.thermal.concat(generalData.thermalOther ? [generalData.thermalOther] : []).join(', '),
            hungerTolerance: generalData.hungerTolerance.concat(generalData.hungerToleranceOther ? [generalData.hungerToleranceOther] : []).join(', '),
            eatingSpeed: generalData.eatingSpeed.concat(generalData.eatingSpeedOther ? [generalData.eatingSpeedOther] : []).join(', '),
            appetite: generalData.appetite.concat(generalData.appetiteOther ? [generalData.appetiteOther] : []).join(', '),
            perspiration: generalData.perspiration.concat(generalData.perspirationOther ? [generalData.perspirationOther] : []).join(', '),
            badHabits: generalData.badHabits.concat(generalData.badHabitsOther ? [generalData.badHabitsOther] : []).join(', '),
            thirst: generalData.thirst.concat(generalData.thirstOther ? [generalData.thirstOther] : []).join(', '),
            urine: generalData.urine.concat(generalData.urineOther ? [generalData.urineOther] : []).join(', '),
            dream: generalData.dream.concat(generalData.dreamOther ? [generalData.dreamOther] : []).join(', '),
            sleep: generalData.sleep.concat(generalData.sleepPosition ? [generalData.sleepPosition] : []).join(', '),
            sleepPosition: generalData.sleepPosition.concat(generalData.sleepPositionOther ? [generalData.sleepPositionOther] : []).join(', '),
            foodDesires: generalData.foodDesires.concat(generalData.foodDesiresOther ? [generalData.foodDesiresOther] : []).join(', '),
            stool: generalData.stool.concat(generalData.stoolOther ? [generalData.stoolOther] : []).join(', '),
            sensitivity: generalData.sensitivity.concat(generalData.sensitivityOther ? [generalData.sensitivityOther] : []).join(', '),


        };
        try {
            const response = await put("/case/generals", generalObject)
            if (response) {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <>
            <div className='sm:flex sm:h-auto h-auto py-20 sm:py-10 bg-gray-200'>
                <Navbar />
                <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-5  sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                    <div className='flex flex-col sm:flex-row justify-between w-full gap-y-5 sm:px-10'>
                        <div>
                            {/* icon */}
                            <h1 className='text-xl font-bold text-[rgb(22,57,90)]'>Generals</h1>
                        </div>
                        <div className='flex flex-col justify-end sm:items-end gap-y-2'>
                            <div className='flex gap-x-4 '>
                                <h1>Patient ID</h1>
                                <div className='border-b-2 border-solid border-[rgb(22,57,90)] px-1'>
                                    <h1 className='text-sm text-[rgb(22,57,90)]'>03b56af4-a57f-48cb-aa77-f7aa8aa8a70a</h1>
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-x-4 '>
                                    <h1>Case No</h1>
                                    <div className='border-b-2 border-solid border-[rgb(22,57,90)] px-1'>
                                        <h1 className='text-sm text-[rgb(22,57,90)]'>18620</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between w-full sm:px-10 gap-y-5'>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Thermal</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Hot" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Hot</label>
                                        <Inputs type="checkbox" value="hot" changeevent={(e) => handleChange(e, 'thermal')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/3 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="cold" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>cold</label>
                                        <Inputs type="checkbox" value="cold" changeevent={(e) => handleChange(e, 'thermal')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/3 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'thermal')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Hunger Tolerance</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Good" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Good</label>
                                        <Inputs type="checkbox" value="Good" changeevent={(e) => handleChange(e, 'hungerTolerance')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Bad" className='border-b-2 border-solid border-[#16395A] w-full text-center  sm:text-lg text-xs'>Bad</label>
                                        <Inputs type="checkbox" value="Bad" changeevent={(e) => handleChange(e, 'hungerTolerance')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center   sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'hungerTolerance')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'hungerTolerance')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Eating Speed</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Slow" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Slow</label>
                                        <Inputs type="checkbox" value="Slow" changeevent={(e) => handleChange(e, 'eatingSpeed')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Fast" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Fast</label>
                                        <Inputs type="checkbox" value="Fast" changeevent={(e) => handleChange(e, 'eatingSpeed')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'eatingSpeed')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'eatingSpeed')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Appetite</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Good" className='border-b-2 border-solid border-[#16395A] w-full text-center  sm:text-lg text-xs'>Good</label>
                                        <Inputs type="checkbox" value="Good" changeevent={(e) => handleChange(e, 'appetite')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Bad" className='border-b-2 border-solid border-[#16395A] w-full text-center  sm:text-lg text-xs'>Bad</label>
                                        <Inputs type="checkbox" value="Bad" changeevent={(e) => handleChange(e, 'appetite')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center  sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'appetite')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'appetite')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Perspiration</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Offensive" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Offensive</label>
                                        <Inputs type="checkbox" value="Offensive" changeevent={(e) => handleChange(e, 'perspiration')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Profuse" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Profuse</label>
                                        <Inputs type="checkbox" value="Profuse" changeevent={(e) => handleChange(e, 'perspiration')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'perspiration')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'perspiration')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Bad Habits</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Smoking" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Smoking</label>
                                        <Inputs type="checkbox" value="Smoking" changeevent={(e) => handleChange(e, 'badHabits')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/3 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Drinking" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Drinking</label>
                                        <Inputs type="checkbox" value="Drinking" changeevent={(e) => handleChange(e, 'badHabits')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/3 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'badHabits')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Thirst</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Thirsty" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Thirsty</label>
                                        <Inputs type="checkbox" value="Thirsty" changeevent={(e) => handleChange(e, 'thirst')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Thirstless" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Thirstless</label>
                                        <Inputs type="checkbox" value="Thirstless" changeevchangeevent={(e) => handleChange(e, 'thirst')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'thirst')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'thirst')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Dream</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Snakes" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Snakes</label>
                                        <Inputs type="checkbox" value="Snakes" changeevent={(e) => handleChange(e, 'dream')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Death" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Death</label>
                                        <Inputs type="checkbox" value="Death" changeevent={(e) => handleChange(e, 'dream')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Gaints" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Gaints</label>
                                        <Inputs type="checkbox" value="Gaints" changeevent={(e) => handleChange(e, 'dream')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'dream')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                    <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'dream')} class="w-[39vw] hover:drop-shadow-none  rounded-none hover:shadow-none focus:outline-none px-2 py-0 h-10 text-[15px]" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Urine</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'urine')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Profuse" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Profuse</label>
                                        <Inputs type="checkbox" value="Profuse" cchangeevent={(e) => handleChange(e, 'urine')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Offensive" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Offensive</label>
                                        <Inputs type="checkbox" value="Offensive" changeevent={(e) => handleChange(e, 'urine')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Burning" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Burning</label>
                                        <Inputs type="checkbox" value="Burning" cchangeevent={(e) => handleChange(e, 'urine')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                    <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'urine')} class="w-[39vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-10 text-[15px]" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Sleep</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'sleep')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Alert" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Alert</label>
                                        <Inputs type="checkbox" value="Alert" changeevent={(e) => handleChange(e, 'sleep')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Deep" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Deep</label>
                                        <Inputs type="checkbox" value="Deep" changeevent={(e) => handleChange(e, 'sleep')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Hours" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Hours</label>
                                        <Inputs type="text" placeholder="hours" changeevent={(e) => handleChange(e, 'sleep')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[15px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Sleep Position</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Back" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Back</label>
                                        <Inputs type="checkbox" value="Back" changeevent={(e) => handleChange(e, 'sleepPosition')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Stomach" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Stomach</label>
                                        <Inputs type="checkbox" value="Stomach" changeevent={(e) => handleChange(e, 'sleepPosition')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="L. Side" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>L. Side</label>
                                        <Inputs type="checkbox" value="L. Side" changeevent={(e) => handleChange(e, 'sleepPosition')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-solid border-[#16395A] '>
                                        <label htmlFor="R. Side" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>R. Side</label>
                                        <Inputs type="checkbox" value="R. Side" changeevent={(e) => handleChange(e, 'sleepPosition')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                    <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'sleepPosition')} class="w-[39vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-10 text-[15px]" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Food Desires</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Sweet" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Sweet</label>
                                        <Inputs type="checkbox" value="Sweet" changeevent={(e) => handleChange(e, 'foodDesires')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Salt" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Salt</label>
                                        <Inputs type="checkbox" value="Salt" cchangeevent={(e) => handleChange(e, 'foodDesires')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Chocolate" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Chocolate</label>
                                        <Inputs type="checkbox" value="Chocolate" changeevent={(e) => handleChange(e, 'foodDesires')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Fruits" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Fruits</label>
                                        <Inputs type="checkbox" value="Fruits" changeevent={(e) => handleChange(e, 'foodDesires')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Fruits" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Fruits</label>
                                        <Inputs type="checkbox" value="Fruits" changeevent={(e) => handleChange(e, 'foodDesires')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'foodDesires')} class="w-[59.5vw] sm:w-[30vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-8 text-[15px]" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Stool</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Loose" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Loose</label>
                                        <Inputs type="checkbox" value="Loose" changeevent={(e) => handleChange(e, 'stool')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Tight" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Tight</label>
                                        <Inputs type="checkbox" value="Tight" changeevent={(e) => handleChange(e, 'stool')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Profuse" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Profuse</label>
                                        <Inputs type="checkbox" value="Profuse" cchangeevent={(e) => handleChange(e, 'stool')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Offensive" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Offensive</label>
                                        <Inputs type="checkbox" value="Offensive" changeevent={(e) => handleChange(e, 'stool')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Bleeding" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Bleeding</label>
                                        <Inputs type="checkbox" value="Bleeding" changeevent={(e) => handleChange(e, 'stool')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Burning" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Burning</label>
                                        <Inputs type="checkbox" value="Burning" cchangeevent={(e) => handleChange(e, 'stool')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'stool')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'stool')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Sensitivity</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A]'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Sunlight" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Sunlight</label>
                                        <Inputs type="checkbox" value="Sunlight" changeevent={(e) => handleChange(e, 'sensitivity')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Noise" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Noise</label>
                                        <Inputs type="checkbox" value="Noise" changeevent={(e) => handleChange(e, 'sensitivity')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Room Light" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Room Light</label>
                                        <Inputs type="checkbox" value="Room Light" changeevent={(e) => handleChange(e, 'sensitivity')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Vision" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Vision</label>
                                        <Inputs type="checkbox" value="Vision" changeevent={(e) => handleChange(e, 'sensitivity')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Smell" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Smell</label>
                                        <Inputs type="checkbox" value="Smell" changeevent={(e) => handleChange(e, 'sensitivity')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/3 items-center border-r-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Taste" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Taste</label>
                                        <Inputs type="checkbox" value="Taste" changeevent={(e) => handleChange(e, 'sensitivity')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/3 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'sensitivity')} class="w-[19vw] sm:w-[10vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <Button name="Next" class="rounded-lg hover:transform-none" click={next} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
