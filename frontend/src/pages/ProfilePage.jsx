import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UseUserContext } from "../hooks/UseUserContext"
import { UseFriendsContext } from "../hooks/UseFriendContext"


const ProfilePage = () => {
    const {dispatch , pending , friends} = UseFriendsContext()
    const { id } = useParams()
    const [data, setData] = useState()
    const { user } = UseUserContext()
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:4000/api/user/${id}`)
            const json = await response.json()

            if (response.ok) {
                setLoading(false)
                setData(json)
            }
        }
        fetchUser()
    }, [id , dispatch ])

    


    const includesId = friends && friends.some(friend => friend.user_id === Number(id));
    const sentRequest = pending && pending.some(p => p.friend_id === 4 )

    console.log(sentRequest)


    const SendFriendRequest = async () => {
        const response = await fetch(`http://localhost:4000/api/friends/send-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({friend_id : id}),
            credentials: 'include'
        })
            const json = await response.json()
    
            if(response.ok){
                dispatch({type:"SET_PENDING" , payload:json})
          
            }
    }

    useEffect(() => {
        const fetchPending = async () => {
            const response = await fetch(`http://localhost:4000/api/friends/pending`,{
                credentials:'include'
            })
            const json = await response.json()

            if (response.ok) {
                setLoading(false)
                dispatch({type: "SET_PENDING" , payload:json})
            }
        }
        fetchPending()
    }, [dispatch ,])

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await fetch(`http://localhost:4000/api/friends/all-friends`,{
                credentials:'include'
            })
            const json = await response.json()

            if (response.ok) {
                setLoading(false)
                dispatch({type: "SET_FRIENDS" , payload:json})
            }
        }
        fetchFriends()
    }, [dispatch ,])

    return (
        loading ?
            <p>loading...</p>
            
            :

            <div className="m-10 flex-1 flex flex-col rounded-3xl overflow-hidden relative">
                <img className="object-cover w-full h-2/4  blur-xl" src="../images.jpg "></img>


                <div className="absolute flex flex-col  top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex gap-10 items-center  p-5">
                        <div className="relative w-52 h-52 overflow-hidden bg-gray-200 rounded-full shadow-lg ">
                            <svg className="absolute  text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                        <div className="flex flex-col gap-2 text-white font-bold ">
                            <div className="flex gap-2 text-4xl ">
                                <p>{data.name}</p>
                                <p>{data.last_name}</p>
                            </div>
                            <div className="flex gap-2">
                                <p>Posts: 34</p>
                                <p>Friends: 312</p>
                            </div>

                            {includesId ?
                                <p>friend</p>
                                :
                                sentRequest && user.id !== data.user_id  ?
                                <p>Friend Request Sent</p>
                                :
                                user && user.id !== data.user_id && <button onClick={() =>SendFriendRequest() } className="btn-primary">Add Friend</button>
                            }

                        </div>
                    </div>
                </div>

                <div className="bg-white mt-10 rounded-3xl shadow-lg w-full flex flex-col overflow-hidden">
                    <div className="flex ">
                        <button className=" w-2/6 p-5">posts</button>
                        <button className=" w-2/6 p-5">friends</button>
                        <button className=" w-2/6 p-5">about</button>
                    </div>
                    <div>
                        hello
                    </div>
                </div>

            </div>


    )
}

export default ProfilePage


