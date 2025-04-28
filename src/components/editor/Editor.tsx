import { useEditor, EditorContent } from '@tiptap/react'
import Menubar from './Menubar';
import { extensions } from "./editorExtensions"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import BlogPublicForm from './PublishFinalForm';

export default function Editor() {

  const navigate = useNavigate()
  const [finalPublishForm, setFinalPublishForm] = useState(false)
  const [content, setContent] = useState("")
  const { isAuthenticated } = useAuth()
  const [blogContentError, setBlogContentError] = useState("")

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/signin',)
    }
  }, [isAuthenticated, navigate])

  const onClickCloseForm = useCallback(() => {
    setFinalPublishForm(false);
  }, []);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "min-h-[200px] border rounded-md bg-slate-50 py-1 px-2 md:min-h-[300px] lg:min-h-[400px]",
      }
    }
  })

  if (!editor) return null


  if (isAuthenticated === null) {
    return <div>
      loading....
    </div>
  }

  if (isAuthenticated === false) {
    return null
  }

  function getOutput() {
    setBlogContentError("")
    if (!editor) return null
    const text = editor.getText()
    if (text.length === 0) {
      setBlogContentError("Blog content shouldn't be empty.")
    }
    else {
      setContent(editor.getHTML())
      setFinalPublishForm(true)
    }

  }

  return (
    <div className=''>
      {finalPublishForm && <BlogPublicForm onClickCloseForm={onClickCloseForm} content={content} />}
      <div className='mt-3 px-2 md:px-4 lg:max-w-11/12 lg:m-auto xl:max-w-10/12'>
        <Menubar editor={editor} />
        <EditorContent editor={editor} />
        <div className='my-4 flex flex-col justify-center items-center gap-y-1.5'>
          <button className='text-white bg-green-700  block px-3 py-1 rounded cursor-pointer md:text-lg w-fit' onClick={getOutput}>Publish</button>
          {blogContentError && <p className='text-red-600 font-semibold text-sm md:text-base'>{blogContentError}</p>}
        </div>
      </div>

    </div>

  )
}
