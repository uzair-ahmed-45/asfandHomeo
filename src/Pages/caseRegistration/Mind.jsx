import React, { useState } from 'react'
import Navbar from "../Navbar"
import Inputs from '../../Components/Inputs'
import Button from '../../Components/Button'
import "./case.css"
import { post, put } from "../../api"
import { useModal } from '../../Hooks/useModal'
import Popup from '../../Components/Popup'
import { useNavigate } from 'react-router-dom'

export default function Mind() {
    const [popupMessage, setPopupMessage] = useState('');
    const { modal, setmodal, loader, setloader, complainId, setcomplainId } = useModal();
    const nav = useNavigate()

    const [mindData, setmindData] = useState({
        familyRelation: [],
        familyRelationOther: "",
        friendsRelation: [],
        friendsRelationOther: "",
        gathering: [],
        gatheringOther: "",
        memory: [],
        memoryOther: "",
        willPower: [],
        willPowerOther: "",
        personality: [],
        personalityOther: "",
    })
    const handleChange = (event, category) => {
        const { type, value, checked } = event.target;

        setmindData(prevState => {
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

    const navigation = (path) => {
        nav(path)
        setloader(true)
    }

    const next = async (e) => {
        e.preventDefault()
        const mindObject = {
            complainId,
            familyRelation: mindData.familyRelation.concat(mindData.familyRelationOther ? [mindData.familyRelationOther] : []).join(', '),
            friendsRelation: mindData.friendsRelation.concat(mindData.friendsRelationOther ? [mindData.friendsRelationOther] : []).join(', '),
            gathering: mindData.gathering.concat(mindData.gatheringOther ? [mindData.gatheringOther] : []).join(', '),
            memory: mindData.memory.concat(mindData.memoryOther ? [mindData.memoryOther] : []).join(', '),
            willPower: mindData.willPower.concat(mindData.willPowerOther ? [mindData.willPowerOther] : []).join(', '),
            personality: mindData.personality.concat(mindData.personalityOther ? [mindData.personalityOther] : []).join(', '),
        };
        try {
            const response = await put("/case/mind", mindObject)
            setloader(true)
            if (response) {
                setcomplainId(response.data.complain._id)
                nav('/case/nature')
            }
        } catch (error) {
            if (error.response.data.message === "Complain ID is required") {
                setmodal(true)
                setPopupMessage("Complain ID is required")
            } else if (error.response.data.message === "Complain not found") {
                setmodal(true)
                setPopupMessage("Complain not found")
            } else {
                setmodal(true)
                setPopupMessage("Something went wrong")
            }
        }
    }

    return (
        <>
            <div className='sm:flex sm:h-auto h-auto py-20 sm:py-10 bg-gray-200'>
                <Navbar />
                <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-5  sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                    <div className='flex items-center sm:gap-x-0 gap-x-3'>
                        <img src="/mind.png" alt="" className='w-16 h-20' />
                        <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Mind</h1>
                    </div>

                    <form action='' onSubmit={next} className='flex flex-col justify-between w-full sm:px-10 gap-y-5 mt-5'>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Family Relation</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A] rounded sm:rounded-xl'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Good" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Good</label>
                                        <Inputs type="checkbox" value="Good" changeevent={(e) => handleChange(e, 'familyRelation')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Bad" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Bad</label>
                                        <Inputs type="checkbox" value="cold" changeevent={(e) => handleChange(e, 'familyRelation')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="cold" changeevent={(e) => handleChange(e, 'familyRelation')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'familyRelation')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Friends Relation</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A] rounded sm:rounded-xl'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Good" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Good</label>
                                        <Inputs type="checkbox" value="Good" changeevent={(e) => handleChange(e, 'friendsRelation')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Bad" className='border-b-2 border-solid border-[#16395A] w-full text-center  sm:text-lg text-xs'>Bad</label>
                                        <Inputs type="checkbox" value="Bad" changeevent={(e) => handleChange(e, 'friendsRelation')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center   sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'friendsRelation')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'friendsRelation')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Gathering</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A] rounded sm:rounded-xl'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Like" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Like</label>
                                        <Inputs type="checkbox" value="Like" changeevent={(e) => handleChange(e, 'gathering')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Dislike" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Dislike</label>
                                        <Inputs type="checkbox" value="Dislike" changeevent={(e) => handleChange(e, 'gathering')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'gathering')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'gathering')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Mind</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A] rounded sm:rounded-xl'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Good" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Good</label>
                                        <Inputs type="checkbox" value="Good" changeevent={(e) => handleChange(e, 'memory')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Bad" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Bad</label>
                                        <Inputs type="checkbox" value="Bad" changeevent={(e) => handleChange(e, 'memory')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Normal" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Normal</label>
                                        <Inputs type="checkbox" value="Normal" changeevent={(e) => handleChange(e, 'memory')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'memory')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center '>
                            <h1>Will Power</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A] rounded sm:rounded-xl'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Good" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Good</label>
                                        <Inputs type="checkbox" value="Like" changeevent={(e) => handleChange(e, 'willPower')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Average" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Average</label>
                                        <Inputs type="checkbox" value="Average" changeevent={(e) => handleChange(e, 'willPower')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Weak" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Weak</label>
                                        <Inputs type="checkbox" value="Weak" changeevent={(e) => handleChange(e, 'willPower')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center'>
                                        <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                        <Inputs type="text" placeholder="Others" changeevent={(e) => handleChange(e, 'willPower')} class="w-[19vw] sm:w-[6vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-2 mt-[7px] text-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                            <h1>Personality</h1>
                            <div className='flex flex-col justify-between w-[80vw] sm:w-[40vw] border-2 border-solid border-[#16395A] rounded sm:rounded-xl'>
                                <div className='flex '>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Talkative" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Talkative</label>
                                        <Inputs type="checkbox" value="Talkative" changeevent={(e) => handleChange(e, 'personality')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:drop-shadow-none hover:shadow-none rounded-none focus:outline-none  py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2  border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Lesstalkative" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Lesstalkative</label>
                                        <Inputs type="checkbox" value="Lesstalkative" cchangeevent={(e) => handleChange(e, 'personality')} class="w-[15vw] sm:w-[6vw] custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-r-2 border-solid border-[#16395A]'>
                                        <label htmlFor="Extrovert" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Extrovert</label>
                                        <Inputs type="checkbox" value="Extrovert" changeevent={(e) => handleChange(e, 'personality')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4 items-center border-b-2 border-solid border-[#16395A] '>
                                        <label htmlFor="Introvert" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Introvert</label>
                                        <Inputs type="checkbox" value="Introvert" cchangeevent={(e) => handleChange(e, 'personality')} class="w-[19vw] sm:w-[6vw]  custom-checkbox hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0" />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <label htmlFor="Other" className='border-b-2 border-solid border-[#16395A] w-full text-center sm:text-lg text-xs'>Other</label>
                                    <Inputs type="text" placeholder="Type Others here" changeevent={(e) => handleChange(e, 'personality')} class="w-[39vw] hover:shadow-none hover:drop-shadow-none  rounded-none focus:outline-none px-2 py-0 h-10 text-[15px]" />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center gap-x-5'>
                            <Button name="Skip" class="rounded-lg hover:transform-none mt-5 w-full" click={() => navigation('/case/nature')} />
                            <Button name="Next" class="rounded-lg hover:transform-none mt-5 w-full" click={next} />
                        </div>


                    </form>
                </div>
            </div >
            {modal && popupMessage && <Popup text={popupMessage} />
            }
        </>
    )
}
