import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const ProfileLayout = () => {


    return (
        <div className="flex">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    )
}

export default ProfileLayout