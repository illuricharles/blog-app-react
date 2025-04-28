import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/loader/Loader";

export default function MainLayout() {
    const { isAuthenticated, logout } = useAuth()

    if (isAuthenticated === null) {
        return <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-[100]">
            <Loader />
        </div>
    }


    return <>
        <div className="px-4 py-3 bg-slate-50 xl:py-4 xl:mb-2">
            <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        </div>
        <Outlet />
    </>
}