import React, { useEffect, useRef, useState } from 'react';
import { post } from '../api';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useModal } from '../Hooks/useModal';
import Spinner from '../Components/Spinner';
import Navbar from './Navbar';
import Button from '../Components/Button';
import jspdf from "jspdf"
import html2canvas from "html2canvas"
import { useNavigate } from 'react-router-dom';

export default function PatientCases() {
    const pdfref = useRef()
    const { loader, setloader, modal, setmodal, patientId, setpatientId, patientidForCase, setpatientidForCase, patientCases, setpatientCases } = useModal();
    const nav = useNavigate()

    const navigation = (path) => {
        nav(path)
        setloader(true)
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
    };
    const pdfDownload = () => {
        const input = pdfref.current;
        const pdf = new jspdf('p', 'mm', 'a4', true);

        // Set the desired width and height for the PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        html2canvas(input, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            let imgY = 0; // Initial Y position for the image

            // Calculate the ratio for resizing the image to fit the page
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, imgY, imgWidth * ratio, imgHeight * ratio);

            pdf.save('CaseReport.pdf');
        });
    };
    useEffect(() => {
        console.log(patientCases);
    }, [patientCases]);

    return (
        <>
            {loader ? <Spinner /> :
                <>
                    <div className='sm:flex h-auto py-20 sm:py-10 bg-gray-200'>
                        <Navbar />
                        {/* <Slider {...settings}> */}
                        <div className='flex flex-col'>
                            {patientCases.length > 0 ?
                                patientCases && patientCases.map((item, index) => (
                                    <div className='flex flex-col justify-center ' key={index}>
                                        <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10 sm:mt-10 py-5 rounded-xl shadow-xl px-5 snap-start' ref={pdfref}>
                                            <div className='flex flex-col sm:flex-row justify-between items-center w-full gap-y-5 sm:px-10'>
                                                <div className='flex items-center'>
                                                    <img src="/caseReport.png" alt="" className='w-20 h-24' />
                                                    <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Case Report</h1>
                                                </div>
                                                <div className='flex flex-col justify-end sm:items-end gap-y-2'>
                                                    <div className='flex gap-x-4'>
                                                        <h1>Case No</h1>
                                                        <div className='border-b-2 border-solid border-[rgb(22,57,90)] px-1'>
                                                            <h1 className='text-sm text-[rgb(22,57,90)]'>{item?.caseNo?.caseNumber}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* case report */}
                                            <div className='flex flex-col justify-between gap-y-5 w-[70vw] sm:w-full '>
                                                {/* Basic Info */}<h1 className='text-xl sm:px-10 font-bold text-[rgb(22,57,90)]'>Basic Info</h1>
                                                <div className='block'>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        <div className='flex gap-x-5 items-center'>
                                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Full Name:</h1>
                                                            <h1 className='ms-14'>{item?.chiefComplaint?.patient?.fullname || null}</h1>
                                                        </div>
                                                        <div className='flex gap-x-5 items-center'>
                                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Age:</h1>
                                                            <h1 className='ms-[100px]'>{item?.chiefComplaint?.patient?.age || null}</h1>
                                                        </div>
                                                        <div className='flex gap-x-5 items-center'>
                                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Gender:</h1>
                                                            <h1 className='ms-[75px]'>{item?.chiefComplaint?.patient?.gender || null}</h1>
                                                        </div>
                                                        <div className='flex gap-x-5 items-center'>
                                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Contact:</h1>
                                                            <h1 className='ms-[72px]'>{item?.chiefComplaint?.patient?.contact || null}</h1>
                                                        </div>
                                                        <div className='flex gap-x-5 items-center '>
                                                            <h1 className='text-sm text-[rgb(22,57,90)]'>Address:</h1>
                                                            <h1 className='ms-[72px]'>{item?.chiefComplaint?.patient?.address || null}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item?.chiefComplaint ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Chief Complaint</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.chiefComplaint?.StartDate ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>When Started:</h1>
                                                                <h1 className='ms-8'>{item?.chiefComplaint?.StartDate || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.chiefComplaint?.Location ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Location & Side:</h1>
                                                                <h1 className='ms-5'>{item?.chiefComplaint?.Location || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.chiefComplaint?.Sensation ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sensation:</h1>
                                                                <h1 className='ms-14'>{item?.chiefComplaint?.Sensation || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.chiefComplaint?.Duration ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Duration:</h1>
                                                                <h1 className='ms-[67px]'>{item?.chiefComplaint?.Duration || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.chiefComplaint?.Modalities ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Modalities:</h1>
                                                                <h1 className='ms-14'>{item?.chiefComplaint?.Modalities || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.chiefComplaint?.Agravation ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Agravation:</h1>
                                                                <h1 className='ms-12'>{item?.chiefComplaint?.Agravation || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.chiefComplaint?.Amelioration ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Amelioration:</h1>
                                                                <h1 className='ms-10'>{item?.chiefComplaint?.Amelioration || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.chiefComplaint?.OtherComplaints ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>OtherComplaints:</h1>
                                                                <h1 className='ms-2'>{item?.chiefComplaint?.OtherComplaints || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {/* generals */}
                                                {item?.generals ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Generals</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.generals?.thermal ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Thermal:</h1>
                                                                <h1 className='ms-16'>{item?.generals?.thermal || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.hungerTolerance ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Hunger Tolerance:</h1>
                                                                <h1 className=''>{item?.generals?.hungerTolerance || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.eatingSpeed ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Eating Speed:</h1>
                                                                <h1 className='ms-8'>{item?.generals?.eatingSpeed || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.appetite ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Appetite:</h1>
                                                                <h1 className='ms-16'>{item?.generals?.appetite || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.badHabits ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Bad Habits:</h1>
                                                                <h1 className='ms-12'>{item?.generals?.badHabits || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.perspiration ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Perspiration:</h1>
                                                                <h1 className='ms-10'>{item?.generals?.perspiration || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.thirst ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Thirst:</h1>
                                                                <h1 className='ms-[85px]'>{item?.generals?.thirst || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.dream ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Dream:</h1>
                                                                <h1 className='ms-[75px]'>{item?.generals?.dream || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.urine ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Urine:</h1>
                                                                <h1 className='ms-[85px]'>{item?.generals?.urine || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.sleep ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sleep:</h1>
                                                                <h1 className='ms-[85px]'>{item?.generals?.sleep || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.foodDesires ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Food Desires:</h1>
                                                                <h1 className='ms-8'>{item?.generals?.foodDesires || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.sleepPosition ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sleep Position:</h1>
                                                                <h1 className='ms-6'>{item?.generals?.sleepPosition || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.stool ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Stool:</h1>
                                                                <h1 className='ms-20'>{item?.generals?.stool || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.generals?.sensitivity ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Sensitivity:</h1>
                                                                <h1 className='ms-[50px]'>{item?.generals?.sensitivity || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.mind ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Mind</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs sm:grid-cols-2 grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.mind?.familyRelation ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Family Relation:</h1>
                                                                <h1 className='ms-3'>{item?.mind?.familyRelation || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.mind?.friendsRelation ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Friends Relation:</h1>
                                                                <h1 className='ms-2'>{item?.mind?.friendsRelation || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.mind?.gathering ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Gathering:</h1>
                                                                <h1 className='ms-12'>{item?.mind?.gathering || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.mind?.memory ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Memory:</h1>
                                                                <h1 className='ms-14'>{item?.mind?.memory || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.mind?.willPower ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Will Powers:</h1>
                                                                <h1 className='ms-10'>{item?.mind?.willPower || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.mind?.personality ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>personality:</h1>
                                                                <h1 className='ms-10'>{item?.mind?.personality || null}</h1>
                                                            </div> : null
                                                        }

                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.nature ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Nature</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.nature?.nature ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Nature:</h1>
                                                                <h1 className='ms-[75px]'>{item?.nature?.nature || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.nature?.anxiety ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Anxiety:</h1>
                                                                <h1 className='ms-[72px]'>{item?.nature?.anxiety || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.pastHistory ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Past History</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.pastHistory?.patientHistory ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Patient History:</h1>
                                                                <h1 className='ms-12'>{item?.pastHistory?.patientHistory || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.pastHistory?.patientFamilyHistory ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Patient Family History:</h1>
                                                                <h1 className=''>{item?.pastHistory?.patientFamilyHistory || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.pastHistory?.patientDrugHistory ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Patient Drug History:</h1>
                                                                <h1 className='ms-3'>{item?.pastHistory?.patientDrugHistory || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.gyaneHistory ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Gyane History</h1>
                                                    <div className='grid  justify-between sm:grid-cols-2 grid-cols-1 sm:text-base text-xs grid-rows-2  sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.gyaneHistory?.menstrual ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Menstrual:</h1>
                                                                <h1 className='ms-16'>{item?.gyaneHistory?.menstrual || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.gyaneHistory?.Pain ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Pain:</h1>
                                                                <h1 className='ms-[105px]'>{item?.gyaneHistory?.Pain || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.gyaneHistory?.bleeding ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Bleeding:</h1>
                                                                <h1 className='ms-[75px]'>{item?.gyaneHistory?.bleeding || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.gyaneHistory?.clotting ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Clotting:</h1>
                                                                <h1 className='ms-20'>{item?.gyaneHistory?.clotting || null}</h1>
                                                            </div> : null
                                                        }
                                                        {
                                                            item?.gyaneHistory?.leukorrhea ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Leukorrhea:</h1>
                                                                <h1 className='ms-14'>{item?.gyaneHistory?.leukorrhea || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.childhoodHistory ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>ChildHood History</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.childhoodHistory?.Nature ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Nature:</h1>
                                                                <h1 className='ms-20'>{item?.childhoodHistory?.Nature || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.behavoir ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Behavior</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.behavoir?.Behavior ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Behavior:</h1>
                                                                <h1 className='ms-16'>{item?.behavoir?.Behavior || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.labTests ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Lab Tests</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.labTests?.tests ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Lab Tests:</h1>
                                                                <h1 className='ms-16'>{item?.labTests?.tests || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.diagnosed ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Diagnosed</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.diagnosed?.diagnosed ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Diagnosed:</h1>
                                                                <h1 className='ms-14'>{item?.diagnosed?.diagnosed || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                {item?.remedies ? <>
                                                    <h1 className='text-xl font-bold text-[rgb(22,57,90)] sm:px-10'>Remedies</h1>
                                                    <div className='grid  justify-between grid-cols-1 sm:text-base text-xs grid-rows-1 sm:justify-center sm:w-full w-[80vw] sm:px-10  gap-5'>
                                                        {
                                                            item?.remedies?.remedies ? <div className='flex gap-x-5 items-center'>
                                                                <h1 className='text-sm text-[rgb(22,57,90)]'>Remedies:</h1>
                                                                <h1 className='ms-14'>{item?.remedies?.remedies || null}</h1>
                                                            </div> : null
                                                        }
                                                    </div>
                                                </>
                                                    : null
                                                }
                                                <div className='flex justify-center gap-x-5 mt-5'>
                                                    <Button name="Back to home" class="sm:px-10 px-6 hover:transform-none sm:text-base text-xs" click={() => navigation('/home')} />
                                                    <Button name="Generate pdf" class="sm:px-10 px-6 hover:transform-none sm:text-base text-xs" click={pdfDownload} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-40 sm:mt-40 py-5 rounded-xl shadow-xl px-5 snap-start text-xl font-bold '>404 Not found Any Case for this Patient</div>
                            }
                            {/* </Slider> */}

                        </div>

                    </div>
                </>
            }
        </>
    );
}
