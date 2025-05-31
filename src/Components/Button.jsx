import React from 'react'
import ButtonLoader from "./ButtonLoader"

export default function Button({ classname, name, click, isLoading }) {  const className = `${classname} px-10 py-2 rounded-full w-full text-white bg-[rgba(252,165,23,255)] font-medium hover:transition-all hover:duration-500 hover:scale-110 hover:bg-[rgb(241,211,110)] hover:text-[rgba(252,165,23,255)] flex items-center justify-center ${isLoading
    ? "bg-[#ffb466] text-gray-200 cursor-not-allowed"
    : "hover:bg-[#ffa533] hover:text-white"
    }]`
  return (
    <>
      <div>
        <button className={className} onClick={click} disabled={isLoading}>
          {isLoading ? <ButtonLoader /> : name}
        </button>
      </div>
    </>
  )
}
