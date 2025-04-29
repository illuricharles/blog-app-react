// https://cdn-images-1.medium.com/v2/resize:fit:2000/1*VfWGMKnqe7GLm7YCyF_Lyg.jpeg
import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
export default function BlogCard({ title, description, imageUrl, author, createdAt, showDeleteButton, id }: {
    title: string,
    description: string,
    imageUrl: string | null,
    author: string,
    createdAt: Date,
    showDeleteButton?: boolean,
    id: string
}) {
    const [showConfirmationBox, setShowConfirmationBox] = useState(false)
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })


    async function handleDeleteBlog() {
        setError("")
        setSubmitting(true)
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            await axios.delete(`${apiUrl}/api/v1/post/${id}`, { withCredentials: true })
            setShowConfirmationBox(false)
            navigate(0)
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.data.message) {
                    setError(e.response.data.message)
                }
                else {
                    setError('Something went wrong. Please try again after sometime.')
                }
            }
            else {
                setError('Something went wrong. Please try again after sometime.')
            }
        }
        finally{
            setSubmitting(false)
        }
    }


    function ConfirmationBox() {
        return <div className="fixed top-0 left-0 w-screen h-screen bg-gray-950/60 flex justify-center items-center z-[999] ">
            <div className="bg-slate-50  w-11/12  h-fit p-3 rounded overflow-auto md:w-7/12 md:px-5 lg:w-5/12 xl:w-4/12 ">
                <button onClick={() => setShowConfirmationBox(false)} className="block ml-auto cursor-pointer">
                    <IoMdClose className="size-5" />
                </button>
                <div className="p-2 text-slate-900 ">
                    <h3 className="text-lg font-semibold mb-3 lg:mb-4">Confirmation</h3>
                </div>
                <p className=" font-semibold text-center lg:text-lg">Are you sure you want to delete this post?</p>
                <div className="flex flex-col justify-center items-center mt-5 gap-y-3 text-center mb-3">
                    <button className="cursor-pointer text-white bg-red-600 font-semibold px-5 py-1 block rounded w-fit" disabled={submitting}
                        onClick={() => handleDeleteBlog()}
                    >
                        {submitting ? "Deleting..." : "Yes"}
                    </button>
                    {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
                </div>
            </div>
        </div>
    }

    return (
        <>
            {showConfirmationBox && <ConfirmationBox />}
            <div className="p-3 mb-3 w-full">
                <Link to={`/blog/${id}`}>
                    <div className="h-40  w-full  mb-5 md:mb-4 lg:h-44">
                        {imageUrl !== null && <img src={imageUrl} alt="Blog Image" className="h-full w-full bg-cover" />}
                        {imageUrl === null && <div className="bg-slate-100 h-full w-full flex justify-center items-center">
                            <p className="font-semibold text-slate-900 lg:text-lg">Blog Image</p>
                        </div>}
                    </div>
                </Link>
                <div className="px-1 ">
                    <Link to={`/blog/${id}`}>
                        <div>
                            <p className="text-slate-900 font-bold text-lg leading-5 mb-1 md:leading-5.5 md:mb-2 line-clamp-3">{title}</p>
                            <p className="line-clamp-3 mb-3 text-slate-800 md:leading-6">{description}</p>
                        </div>
                    </Link>
                    <div className="flex flex-col">
                        <div className="flex gap-x-3 text-sm font-semibold">
                            <p className="text-emerald-700 font-semibold hover:underline">{author}</p>
                            <span className="text-slate-600 ">{formattedDate}</span>
                        </div>
                        {showDeleteButton && (
                            <button
                                onClick={() => setShowConfirmationBox(true)}
                                className="mt-3 bg-red-500/90 text-white px-3 py-1 rounded hover:bg-red-600 flex justify-center items-center cursor-pointer gap-x-1 text-sm md:text-base"
                            >
                                <MdDelete className="size-4 lg:size-5" />Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
