import { useContext } from "react"
import { FriendsContext } from "../context/friendsContext"



export const UseFriendsContext = () => {  
    const context = useContext(FriendsContext)

    if(!context){
        throw Error('useFriendsxontext must be used inside friends context provider')
    }
    return context
}