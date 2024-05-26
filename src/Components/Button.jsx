import React from 'react'

export default function Button(props) {
  return (
    <>
      <div>
        <button className='px-10 py-2 rounded-full w-full  text-white bg-[rgba(252,165,23,255)] font-medium hover:transition-all hover:duration-500  hover:scale-125 hover:bg-[rgb(241,211,110)] hover:text-[rgba(252,165,23,255)]' onClick={props.click}>{props.name}</button>
      </div>
    </>
  )
}
