import { Link } from "react-router-dom"
import { UseUserContext } from '../hooks/UseUserContext'
import UserModalMenu from "./userModalMenu"
import { useState } from "react"
import { UseFriendsContext } from "../hooks/UseFriendContext"

const UserInfo = () => {
    const { user } = UseUserContext()
    const [modalOpen, setModalOpen] = useState(false)
    const { pending } = UseFriendsContext()



    pending && console.log(pending.length)

    return (
        user ?
            <div className="flex-1 flex justify-end mb-5  text-gray-500 mx-10">
                <div className=" flex items-center   gap-3  py-5  text-textColor">
                    <div className="flex items-center gap-5 text-xl justify-between">
                        <div className="flex items-center gap-5 relative">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                                {pending && pending.length > 0 && (
                                    <span className="absolute bottom-4 left-3 flex w-5 h-5 bg-red-500 rounded-full items-center justify-center text-white text-xs">
                                        {pending.length}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <p className="">{user.name}</p>
                                <p className="">{user.last_name}</p>
                            </div>


                            <div onClick={() => setModalOpen(prev => !prev)} className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full hover:cursor-pointer hover:border-2 hover:border-blue-500  ">
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            </div>

                            <UserModalMenu modalOpen={modalOpen} setModalOpen={setModalOpen} ></UserModalMenu>
                        </div>
                    </div>

                </div>
            </div>
            :

            <div className=" mx-10 mb-10 py-5 flex justify-end">
                <Link to='/user/register' className="btn-primary">Sign Up</Link>
            </div>

    )
}

export default UserInfo
