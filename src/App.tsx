import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./components/siginin/Signin"
import Signup from "./components/signup/Signup"
import Editor from "./components/editor/Editor"
import Blog from "./components/blog/Blog"
import MainLayout from "./layouts/MainLayout"
import BlogContent from "./components/blog/BlogContent"
import { AuthProvider } from "./context/AuthProvider"
import MyPosts from "./components/myPosts/MyPosts"
import NotFound from "./components/NotFound"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Blog/>}/>
            <Route path="/my-posts" element={<MyPosts/>}/>
            <Route path="/editor" element={<Editor/>}/>
            <Route path="/blog/:id" element={<BlogContent/>}/>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}


export default App
