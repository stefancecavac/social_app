import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import UserInfo from "../components/UserInfo"


const MainLayout = () => {


    return(
        <div className="flex">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <UserInfo></UserInfo>
        </div>
    )
}

export default MainLayout