import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const ProfilePage = () => {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:4000/api/user/${id}`)
            const json = await response.json()

            if (response.ok) {
                setData(json)
            }
        }
        fetchUser()
    }, [id])


    return (
        data &&
        <div className="m-10 flex-1">
            <div className="flex gap-2  items-center bg-white rounded-lg p-5">
                <div className="relative w-20 h-20 overflow-hidden bg-gray-200 rounded-full ">
                    <svg className="absolute w-22 h-22 text-gray-400 " fill="currentColor" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <p>{data.name}</p>
                <p>{data.last_name}</p>
            </div>


        </div>


    )
}

export default ProfilePage