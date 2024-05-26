import { useContext } from "react";
import Modalcontext, { Modalpopup } from "../Context/Modalcontext";

const useModal = () => {
    return useContext(Modalpopup)
}

export { useModal }