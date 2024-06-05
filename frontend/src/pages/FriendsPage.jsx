import { useEffect } from "react"
import { UseFriendsContext } from "../hooks/UseFriendContext"



const FriendsPage = () => {
    const { pending, dispatch } = UseFriendsContext()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/api/friends/pending`, {
                credentials: 'include'
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PENDING', payload: json })

            }

        }
        fetchData()
    }, [dispatch])

    const acceptRequest = async(id) => {
        const response = await fetch(`http://localhost:4000/api/friends/accept-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({friendRequestId: id}),
            credentials: 'include'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SEND_REQUEST', payload: json })
    
        }
    }


    return (
        <div className="flex-1">
            {pending && pending.map((p) => (
                <div className="flex gap-5" key={p.sender_id}>
                    <p>{p.sender_name}</p>
                    <button onClick={() => acceptRequest(p.id)}>accept</button>
                </div>
            ))}
        </div>
    )
}

export default FriendsPage