import { useState, useEffect } from "react";
import { MoonLoader } from 'react-spinners';
import "./spinner.css";
import { useModal } from "../Hooks/useModal";

export default function Spinner() {
  const { loader, setloader } = useModal();
  const [color, setColor] = useState("rgb(22,57,90)");

  // useEffect(() => {
  //   setloader(true);
  //   if (loader) {
  //     setTimeout(() => {
  //       setloader(false);
  //     }, 1000);
  //   }
  // }, [loader, setloader]);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <div className="spinner-container">
      {loader ? (
        <MoonLoader
          color={color}
          loading={loader}
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : null}
    </div>
  );
}
