import { useEffect } from "react"
import {UsePostContext} from '../hooks/UsePostContext'
import PostCard from "../components/PostCard"

const Home = () => {
    const {posts , dispatch} = UsePostContext()

    useEffect(() => {
        const fetchData = async() =>{
            const response = await fetch(`http://localhost:4000/api/posts/`)
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_POSTS' , payload:json})
            }
        }
        fetchData()
    }, [dispatch])


    return(
        <div className="flex-1 m-10 flex flex-col gap-10 items-center  ">
            {posts && posts.map((post) => (
                <PostCard key={post.post_id} post={post}></PostCard>
            ))}
        </div>
    )
}

export default Home