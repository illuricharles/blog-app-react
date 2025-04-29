import { useEffect, useRef, useState } from "react"
import { extensions } from "../editor/editorExtensions"
import { useEditor, EditorContent } from '@tiptap/react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../loader/Loader"
import { BsExclamationTriangleFill } from "react-icons/bs"
import BlogComments from "./BlogComments"
import { useAuth } from "../../hooks/useAuth"

interface Comment {
  comment: string,
  createdAt: Date,
  id: string,
  userId: string,
  user: {
    username: string
  }
}

export default function BlogContent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const commentRef = useRef<HTMLInputElement>(null)
  const [commentError, setCommentError] = useState("")
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const content = null
  const { userId } = useAuth()

  const editor = useEditor({
    extensions,
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: " mt-4 ",
      }
    }
  })

  useEffect(() => {
    async function getBlog() {
      setLoading(true)
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/api/v1/post/${id}`, { withCredentials: true })
        const { post } = response.data
        const { comments } = post
        setComments(comments)
        if (editor) {
          editor.commands.setContent(post.content);
        }
      }
      catch (e) {
        if (axios.isAxiosError(e)) {
          if(e.response?.status === 404) {
            setError('The post you are trying to access could not be found. It might have been deleted or the link is incorrect.')
          }
          else if (e.response?.data.message) {
            setError(e.response.data.message)
          }
          else {
            setError("Something went wrong. Please try again after sometime.")
          }
        }
        else {
          setError("Something went wrong. Please try again after sometime.")
        }
      }
      finally {
        setLoading(false)
      }
    }
    if (id) {
      getBlog()
    }
  }, [id, editor])

  if (loading) {
    return <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-0">
      <Loader />
    </div>
  }

  if (error) {
    return <div className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center shadow-md bg-red-100 py-5 rounded max-w-9/12 md:max-w-7/12 md:px-3 lg:max-w-5/12">
        <BsExclamationTriangleFill size={30} className="text-red-600 mb-2" />
        <p className="w-9/12 text-center md:font-semibold font-medium md:w-fit">{error}</p>
      </div>
    </div>
  }


  if (!editor) {
    return null
  }

  async function onSubmitComment() {
    const apiUrl = import.meta.env.VITE_API_URL
    setIsCommentSubmitting(true)
    setCommentError("")
    try {
      const response = await axios.post(`${apiUrl}/api/v1/post/comment`, {
        comment: commentRef.current?.value,
        postId: id
      }, { withCredentials: true })
      const newComment: Comment = response.data.comment
      setComments(prev => {
        return [newComment, ...prev]
      })
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          navigate('/signin')
        }
        else {
          setCommentError(e.response?.data.message || 'Unable to send comment. Please try again later.')
        }
      }
      else {
        setCommentError('Unable to send comment. Please try again later.')
      }

    }
    finally {
      if (commentRef.current) {
        commentRef.current.value = ""
      }
      setIsCommentSubmitting(false)
    }
  }

  function updateComments(commentId: string) {
    const newComments = comments.filter(eachComment => eachComment.id !== commentId)
    setComments(newComments)
  }



  return (
    <div className="mb-15">
      <div className="lg:max-w-11/12 lg:m-auto xl:max-w-10/12 py-1 px-5 md:p-3 md:px-5 lg:px-6">
        {editor.getText().length === 0 ?
          <div className="w-full mt-6 flex justify-center items-center min-h-[200px]">
            <Loader />
          </div> :
          <EditorContent editor={editor} />}
        <div className="mt-5 lg:mt-3">
          <h3 className="text-xl font-semibold mb-4 lg:text-2xl">Response</h3>
          <div className="flex  justify-center items-center bg-gray-100 rounded p-2 xl:mx-auto">
            <input ref={commentRef} type="text" placeholder="What are your thoughts?" className=" text-gray-950  font-medium rounded w-full outline-none px-1 lg:text-lg" />
            <button className=" border px-3 py-1 text-white bg-green-700 rounded cursor-pointer lg:text-lg" onClick={onSubmitComment} disabled={isCommentSubmitting}>
              {isCommentSubmitting ? "submitting" : "comment"}
            </button>
          </div>
          {commentError && <p className="text-center text-sm mt-1.5 text-red-600 md:text-base md:font-medium">{commentError}</p>}
          <hr className="border-t border-slate-300/40 mt-4 mb-3" />
          <div className="px-1 space-y-3">
            {comments.map(eachComment => {
              return <BlogComments updateComments={updateComments} showDeleteButton={userId === eachComment.userId} key={eachComment.id} commentId={eachComment.id} username={eachComment.user.username} createdAt={eachComment.createdAt} comment={eachComment.comment} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
