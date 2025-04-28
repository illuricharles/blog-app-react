import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";



function DisplayMenuHamburger({ isAuthenticated, logout, updateSetDisplay }: {
    isAuthenticated: boolean,
    logout: () => void,
    updateSetDisplay: () => void
}) {
    const navigate = useNavigate()
    return (
        <ul className=" absolute right-0 top-full  bg-gray-100 px-3.5 py-3 space-y-3 rounded font-semibold text-slate-800 z-[100] flex flex-col w-fit md:hidden justify-center items-center">
            {isAuthenticated ? (
                <>
                    <li className="inline-block hover:text-green-700">
                        <button onClick={() => {
                            navigate('/editor')
                            updateSetDisplay()
                        }}>
                            publish
                        </button>

                    </li>
                    <li className="block mx-auto" onClick={() => {
                        navigate('/my-posts')
                        updateSetDisplay()
                    }}>
                        <button>
                            my-posts
                        </button>
                    </li>
                    <li>
                        <button className="text-red-600 rounded block" onClick={() => {
                            logout()
                            updateSetDisplay()
                            navigate(0)
                        }}>
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <button className="" onClick={() => {
                            navigate('/signin')
                            updateSetDisplay()
                        }}>
                            Signin
                        </button>
                    </li>
                    <li>
                        <button className="text-green-700  w-fit  rounded" onClick={() => navigate('/signup')}>
                            Signup
                        </button>
                    </li>

                </>
            )
            }


        </ul>
    )
}

function DisplayMenu({ isAuthenticated, logout }: {
    isAuthenticated: boolean,
    logout: () => void
}) {
    const navigate = useNavigate()
    return (
        <ul className="hidden md:flex font-semibold text-slate-800 gap-x-5 text-base justify-center items-center md:text-base">
            {isAuthenticated ? (
                <>
                    <li>
                        <button className="inline-block border border-green-700 px-3 py-1 rounded-2xl cursor-pointer hover:text-white hover:bg-green-700"
                            onClick={() => navigate('/editor')}
                        >
                            Publish
                        </button>
                    </li>
                    <li>
                        <button className="inline-block border border-green-700 px-3 py-1 rounded-2xl cursor-pointer hover:text-white hover:bg-green-700"
                            onClick={() => navigate('/my-posts')}
                        >
                            My Posts
                        </button>
                    </li>
                    <li className="">
                        <button className="inline-block bg-red-500 text-white px-2 py-1 rounded cursor-pointer" onClick={() => {
                            logout()
                            navigate('/')
                        }}>
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <button className="inline-block border border-green-700 px-3 py-1 rounded-2xl cursor-pointer hover:text-white hover:bg-green-700"
                            onClick={() => navigate('/signin')}
                        >
                            Signin
                        </button>
                    </li>

                    <li>
                        <button className="inline-block bg-green-700 text-white px-3 py-1 rounded cursor-pointer" onClick={() => navigate('/signup')}>
                            Signup
                        </button>
                    </li>
                </>
            )
            }


        </ul>
    )
}

export default function Navbar({ isAuthenticated, logout }: {
    isAuthenticated: boolean | null,
    logout: () => void
}) {

    const [displayMenu, setDisplayMenu] = useState(false)
    function updateSetDisplay() {
        setDisplayMenu(false)
    }

    if (isAuthenticated === null) {
        return <div>
            loading...
        </div>
    }

    return <div className="flex justify-between items-center text-sm relative mb-1 lg:max-w-11/12 lg:m-auto xl:max-w-10/12 z-[100]">
        <Link to="/" className="text-2xl font-bold cursor-pointer md:text-3xl xl:text-3xl md:hidden" onClick={() => setDisplayMenu(false)}>Blog</Link>
        <Link to="/" className="text-2xl font-bold cursor-pointer md:text-3xl xl:text-3xl hidden md:inline-block">Blog</Link>

        <button onClick={() => setDisplayMenu(!displayMenu)} className="z-[100]">
            <RxHamburgerMenu size={25} className="md:hidden" />
        </button>
        {displayMenu && <DisplayMenuHamburger isAuthenticated={isAuthenticated} logout={logout} updateSetDisplay={updateSetDisplay} />}
        {<DisplayMenu isAuthenticated={isAuthenticated} logout={logout} />}

    </div>
}