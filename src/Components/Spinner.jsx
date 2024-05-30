import { useState, useEffect } from "react";
import { MoonLoader } from 'react-spinners';
import "./spinner.css";
import { useModal } from "../Hooks/useModal";



export default function Spinner() {
  const { loader , setloader } = useModal();
  const [color, setColor] = useState("rgb(22,57,90)");

  useEffect(() => {
    setloader(true);
    if (loader) {
      setTimeout(() => {
        setloader(false);
      }, 1000);
    }
  }, [loader, setloader]);

  return (
    <div className="spinner-container">
      {loader ? (
        <div className="spinner-wrapper">
          <MoonLoader
            color={color}
            loading={loader}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
     
          />
        </div>
      ) : null}
    </div>
  );
}
