import { useContext } from "react"
import { StoreId } from "../Context/StoreIdcontext"


export const useStoreId = () => {
    return useContext(StoreId)
} 