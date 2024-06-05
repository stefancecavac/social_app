import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import UserInfo from "../components/UserInfo"
import FriendsCard from "../components/FriendsCard"


const MainLayout = () => {


    return (
        <div className="flex">
            <Navbar></Navbar>

            <div className="flex-1">
                <UserInfo></UserInfo>


                <div className="flex">
                    <Outlet></Outlet>
                    <FriendsCard></FriendsCard>
                </div>




            </div>


        </div>
    )
}

export default MainLayout