import { useEffect, useState } from "react";
import BlogLayout from "../../layouts/BlogLayout";
import axios from "axios";
import BlogCard from "../blog/BlogCard";
import Loader from "../loader/Loader";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useAuth } from "../../hooks/useAuth";
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


export default function MyPosts() {
    const { isAuthenticated } = useAuth()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const rawPage = Number(searchParams.get('page'));
    const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

    useEffect(() => {
        async function getPosts() {
            if (!isAuthenticated) return; // Don't fetch if not authenticated

            setLoading(true);
            setError(false);
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiUrl}/api/v1/post/user/posts?page=${currentPage}`, { withCredentials: true });
                const { posts, totalPages } = response.data
                setPosts(posts);
                setTotalPages(totalPages)

            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getPosts();
    }, [isAuthenticated, currentPage]);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);



    if (loading) {
        return <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-0">
            <Loader />
        </div>
    }

    if (error) {
        return <div className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center shadow-md bg-red-100 py-5 rounded">
                <BsExclamationTriangleFill size={30} className="text-red-600 mb-2" />
                <p className="w-9/12 text-center md:font-semibold">{'Failed to load blogs. Please try again later.'}</p>
            </div>
        </div>
    }

    function prevPage() {
        const prevPageNumber = String(currentPage - 1)
        console.log(prevPageNumber)
        setSearchParams({ page: prevPageNumber })
    }

    function nextPage() {
        const nextPageNumber = String(currentPage + 1)
        console.log(nextPageNumber)
        setSearchParams({ page: nextPageNumber })
    }

    return <BlogLayout title="My Posts" currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} showSearchBar={false} onClickSearch={() => { }} searchQuery="">
        {
            posts.map(eachPost => {
                return <BlogCard key={eachPost.id}
                    id={eachPost.id}
                    title={eachPost.title}
                    description={eachPost.description}
                    imageUrl={eachPost.imageUrl}
                    author={eachPost.author.username}
                    createdAt={eachPost.createdAt}
                    showDeleteButton={true}
                />
            })
        }
    </BlogLayout>
}