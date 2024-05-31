import { useContext } from "react"
import { UserContext } from "../context/userContext"



export const UseUserContext = () => {
    const context = useContext(UserContext)

    if(!context){
        throw Error('useUSerConext must be used inside provider')
    }

    return context
}