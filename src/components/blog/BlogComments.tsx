import axios from "axios";
import { useState } from "react";

export default function BlogComments({ commentId, username, createdAt, comment, showDeleteButton, updateComments }: {
    commentId: string,
    username: string,
    createdAt: Date,
    comment: string,
    showDeleteButton: boolean,
    updateComments: (commentId: string) => void
}) {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")

    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    async function onClickDelete() {
        setShowDeleteConfirmation(false)
        setSubmitting(true)
        setError("")
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await axios.delete(`${apiUrl}/api/v1/post/comment/${commentId}`, { withCredentials: true })
            const { id } = response.data.comment
            updateComments(id)
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data.message || "Something went wrong. Please try again later.")
            }
            else {
                setError("Something went wrong. Please try again later.")
            }
        }
        finally {
            setSubmitting(false)
        }
        

    }

    return <div>
        <div className="flex flex-col text-sm font-semibold mb-1 md:text-base">
            <span className="text-green-600 mb-0.5 lg:text-lg">{username}</span>
            <span className="text-slate-500 font-semibold text-xs md:text-sm lg:text-base">{formattedDate}</span>
        </div>
        <p className="leading-6 text-slate-700  md:leading-6 mt-2 font-medium text-base lg:text-lg lg:mb-4">{comment}</p>
        <div className="mt-2">
            {(showDeleteButton && !showDeleteConfirmation) && <div>
                <button className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-medium md:text-base cursor-pointer" onClick={() => setShowDeleteConfirmation(true)} disabled={submitting}>
                    {submitting ? "Deleting.." : "Delete"}
                </button>
                {error && <p className="text-red-600 text-sm font-medium mt-1 md:text-base">{error}</p>}
            </div>
            }
            {showDeleteConfirmation && <div className="">
                <p className="text-slate-800 font-semibold lg:text-lg">Are you sure you want to delete this comment?</p>
                <div className="space-x-3 text-sm mt-2.5 px-0.5 md:text-base ">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-0.5 px-4 rounded cursor-pointer"
                        onClick={onClickDelete}
                    >
                        Yes
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-0.5 px-4 rounded cursor-pointer" onClick={() => setShowDeleteConfirmation(false)}>No</button>
                </div>
            </div>
            }
        </div>
        <hr className="border-t border-slate-300/40 mt-4 md:mt-5 lg:mt-5" />
    </div>
}