import React from 'react';

export default function Inputs(props) {
  const className = ` ${props.class}  px-12 py-3 rounded-full hover:shadow-md  active:outline-none hover:shadow-[rgb(95,141,184)]  `

  return (
    <div>
      <input type={props.type} className={className} placeholder={props.placeholder} onChange={props.changeevent} />
    </div>
  );
}
