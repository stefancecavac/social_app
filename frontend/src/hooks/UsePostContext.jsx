import { useContext } from "react"
import { PostContext } from "../context/postContext"



export const UsePostContext = () => {  
    const context = useContext(PostContext)

    if(!context){
        throw Error('usePostContext must be used inside post context provider')
    }
    return context
}