import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {UseFriendsContext} from '../hooks/UseFriendContext'



const FriendsCard = () => {
    const {friends, dispatch} = UseFriendsContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await fetch('http://localhost:4000/api/friends/all-friends', {
                credentials: 'include'
            })
            const json = await response.json()


            if (response.ok) {
                setLoading(false)
                dispatch({type: 'SET_FRIENDS' , payload:json})
            }
        }
        fetchFriends()
    }, [dispatch])

    return (
        <div className="hidden lg:flex bg-white rounded-3xl h-fit mr-10 w-3/12 flex-col p-5">
            <p className="text-2xl  font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">Friends</p>
            <hr className="my-2"></hr>
            {loading ?
                <p>Loading Friends ...</p>
                 :
        friends && friends.map((friend) => (
                    <Link to={`/user/${friend.user_id}`} className="flex gap-2 items-center hover:bg-gray-200 rounded-3xl transition-all ease-in-out p-2 " key={friend.user_id}>
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-200 rounded-full ">
                            <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                        <p>{friend.name}</p>
                        <p>{friend.last_name}</p>
                    </Link>
                ))
            }

        </div>
    )
}

export default FriendsCard