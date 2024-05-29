import {createContext, useReducer } from "react";



export const PostContext = createContext()

export const PostReducer = (state, action) => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                posts: action.payload
            }
        case "SET_POST":
            return {
                post: action.payload
            }
    }
}

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PostReducer, {
        posts: null, post: null
    })

console.log(state)
    return(
        <PostContext.Provider value={{...state , dispatch}}>
            {children}
        </PostContext.Provider>
    )
}

