import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()
    return <div className="flex justify-center items-center  fixed w-screen h-screen top-0 left-0">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold text-slate-900 mb-2 md:text-4xl md:mb-3">
                oops! Page not found
            </h1>
            <p className="text-slate-600 font-medium md:text-lg ">
                The page your looking for doesn't exists.
            </p>
            <div className="mt-3 md:mt-5">
                <button className="bg-blue-600 text-white  rounded hover:bg-blue-700 block px-3 py-0.5 md:text-lg cursor-pointer"
                onClick={() => navigate('/')}
                >
                    Home
                </button>
            </div>
        </div>
    </div>
}
