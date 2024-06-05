import { useEffect, useState } from "react"
import { UsePostContext } from '../hooks/UsePostContext'
import PostCard from "../components/PostCard"
import CreatePost from "../components/CreatePost"
import { UseFriendsContext } from "../hooks/UseFriendContext"

const Home = () => {
    const {posts, dispatch } = UsePostContext()
    const {dispatch:pendingDispatch} = UseFriendsContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/api/posts/`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
                
            }
            setLoading(false)
        }
        fetchData()
    }, [dispatch ])


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/api/friends/pending`,{
                credentials: 'include'
            })
            const json = await response.json()

            if (response.ok) {
                pendingDispatch({ type: 'SET_PENDING', payload: json })
           
            }
           
        }
        fetchData()
    }, [pendingDispatch ])

    return (
        <div className="flex-1 flex flex-col gap-5 md:mx-20 lg:mx-24">
            <CreatePost></CreatePost>
            {loading ?
                <p>Loading Posts ...</p>
                :
                posts && posts.map((post) => (
                    <PostCard key={post.post_id} post={post}></PostCard>
                ))
            }

        </div>
    )
}

export default Home