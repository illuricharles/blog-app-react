
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import { BsExclamationTriangleFill } from "react-icons/bs";
import Loader from "../loader/Loader";
import BlogLayout from "../../layouts/BlogLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Author {
    username: string
}

interface Post {
    author: Author
    id: string,
    authorId: string,
    title: string,
    content: string,
    description: string,
    createdAt: Date,
    imageUrl: string | null
}

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [totalPages, setTotalPages] = useState<number>(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const searchQuery = searchParams.get('search') || ""
    const navigate = useNavigate()

    useEffect(() => {
        async function getBlogs() {
            setError("")
            setLoading(true)
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                const response = await axios.get(`${apiUrl}/api/v1/post?page=${currentPage}&search=${searchQuery}`)
                const { posts, totalPages } = response.data
                setPosts(posts)
                setTotalPages(totalPages)
            }
            catch (e) {
                console.log(e)
                setError('Failed to load blogs. Please try again later.')
            }
            finally {
                setLoading(false)
            }
        }
        if (currentPage) {
            getBlogs()
        }

    }, [currentPage, searchQuery])

    if (loading) {
        return <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-0">
            <Loader />
        </div>
    }

    if (error || totalPages === null) {
        return <div className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center shadow-md bg-red-100 py-5 rounded">
                <BsExclamationTriangleFill size={30} className="text-red-600 mb-2" />
                <p className="w-9/12 text-center md:font-semibold">{error}</p>
            </div>
        </div>
    }

    function nextPage() {
        const search = searchParams.get('search') || ""
        setSearchParams({ page: String(currentPage + 1), search })
    }
    function prevPage() {
        const search = searchParams.get('search') || ""
        setSearchParams({ page: String(currentPage - 1), search })
    }

    function onClickSearch(value: string) {
        setSearchParams({ search: value, })
    }


    if (posts.length === 0) {
        return <div className="fixed top-0 left-0 h-screen flex justify-center items-center w-screen">
            <div>
                <h1 className="text-lg font-semibold mb-3 md:mb-4 md:text-xl lg:text-3xl lg:mb-6 ">No posts found. Please check back later!</h1>
                <div className="flex justify-center items-center gap-x-6 lg:gap-x-10 ">
                    <button className="bg-slate-700 text-white px-3 py-1 rounded text-sm block hover:bg-slate-800 lg:text-lg md:text-base cursor-pointer"
                        onClick={() => navigate('/')}>
                        Home
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm block hover:bg-blue-600  lg:text-lg md:text-base cursor-pointer"
                        onClick={() => navigate('/editor')}
                    >Publish
                    </button>
                </div>
            </div>
        </div>
    }

    return (
        <>
            <BlogLayout title="Latest Blog Posts" onClickSearch={onClickSearch} nextPage={nextPage} prevPage={prevPage} totalPages={totalPages} currentPage={currentPage} showSearchBar={true} searchQuery={searchQuery}>
                {
                    posts.map(eachPost => {
                        return <BlogCard key={eachPost.id}
                            id={eachPost.id}
                            title={eachPost.title}
                            description={eachPost.description}
                            imageUrl={eachPost.imageUrl}
                            author={eachPost.author.username}
                            createdAt={eachPost.createdAt}
                        />
                    })
                }
            </BlogLayout>
        </>
    )
}