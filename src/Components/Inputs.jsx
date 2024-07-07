import React from 'react';

export default function Inputs(props) {
  // Extracting props for better readability
  const { type, name, class: className, placeholder, changeevent, value } = props;

  // Adding additional classes to the existing className
  const inputClassName = `${className} px-12 py-3 rounded-full hover:shadow-md active:outline-none hover:shadow-[rgb(95,141,184)]`;

  return (
    <div>
      <input
        required
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        name={name}
        onChange={changeevent}
        value={value}
      />
    </div>
  );
}
