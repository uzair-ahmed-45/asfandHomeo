import React from 'react'
import { useModal } from '../Hooks/useModal'

export default function Popup(props) {
    const { modal, setmodal } = useModal()
    const classname = `scale-125 fixed top-0 left-0 right-0 bottom-0 `
    const Class = `flex flex-col justify-center items-center gap-y-2 fixed left-[50%] top-0 w-[40vw] ${modal && 'top-[50%] transition duration-300 '}  sm:w-[20vw]  bg-[white] rounded-lg shadow-lg py-4 px-4`

    return (
        <>
            {
                modal && (
                    <>
                        <div className= {classname} onClick={()=>setmodal(false)} style={{background : "rgb(189, 189, 189, 0.9)"}}></div>
                        <div className={Class} style={{transform : "translate(-50% , -50%)"}}>
                            <h1 className='text-xl'>{props.text}</h1>
                            <button className='py-1 px-4 text-xl rounded-xl font-medium border-1 border-solid border-[rgb(95,141,184)] text-[rgb(95,141,184)]  hover:border-none hover:bg-[rgb(95,141,184)] hover:text-white hover:transition-all hover:duration-300 hover:scale-110' onClick={()=>setmodal(false)} >Ok</button>
                        </div>
                    </>
                )
            }

        </>
    )   
}
