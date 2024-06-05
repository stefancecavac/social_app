import { createContext, useReducer } from "react";



export const FriendsContext = createContext()

export const FriendsReducer = (state, action) => {
    switch (action.type) {
        case "SET_FRIENDS":
            return {
                ...state,
                friends: action.payload
            }
        case "SET_PENDING":
            return {
                    ...state,
                pending: action.payload
            }

    }
}

export const FriendsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FriendsReducer, {
        friends: null,
        pending: null
    })

    console.log(state)
    return (
        <FriendsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FriendsContext.Provider>
    )
}

