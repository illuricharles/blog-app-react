import { IoMdClose } from "react-icons/io";
import { PublishFinalFormSchema, PublishFinalFormSchemaTypes } from "../../validations/ImageUploadSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PublishFinalForm({ onClickCloseForm, content }: {
  onClickCloseForm: () => void,
  content: string
}) {

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, watch } = useForm<PublishFinalFormSchemaTypes>({
    resolver: zodResolver(PublishFinalFormSchema)
  })

  const [imagePreview, setImagePreview] = useState<null | string>(null)
  const navigate = useNavigate()

  const imageFile = watch('image')
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [imageFile]);


  async function uploadFileToCloudinary(file: File) {
    const uploadPresetName = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPresetName)
    try {

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      const imageUrl = res.data.secure_url
      return imageUrl
    }
    catch (e) {
      console.log(e)
      setError('root', {
        type: "manual",
        message: "Something went wrong. Please try again after sometime."
      })
      return null
    }
  }

  async function onSubmitForm(data: PublishFinalFormSchemaTypes) {
    const file = data.image[0]
    const imageUrl = await uploadFileToCloudinary(file)
    if (!imageUrl) return null
    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/post`, {
        title: data.title,
        content,
        description: data.description,
        imageUrl
      }, {
        withCredentials: true
      })

      const { post } = response.data
      navigate(`/blog/${post.id}`)
    }
    catch (e) {
      let message
      if (axios.isAxiosError(e)) {
        message = e.response?.data.message
      }
      setError('root', {
        type: "manual",
        message: message || "Something went wrong. Please try again after sometime."
      })

    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-950/60 flex justify-center items-center z-[999] ">
      <div className="bg-slate-50  w-11/12  max-h-11/12 p-3 rounded overflow-auto md:w-8/12 md:px-5 lg:w-7/12 xl:w-5/12">
        <button onClick={onClickCloseForm} className="block ml-auto cursor-pointer">
          <IoMdClose className="size-5" />
        </button>
        <div className="p-2 text-slate-900 ">
          <h3 className="text-lg font-semibold mb-3 lg:mb-4">Preview</h3>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="mb-6">

              <div className="bg-slate-200 h-40 flex justify-center items-center mb-3 md:h-52  lg:w-11/12 mx-auto lg:mb-4 xl:w-9/12">
                {!imagePreview && <p className="text-gray-800 font-semibold px-10 text-sm text-center">
                  Include a high-quality image to make it more inviting to readers.
                </p>}
                {imagePreview && <img src={imagePreview} className="h-full w-full" />}
              </div>
              <input id="file-upload" type="file" accept="image/*" className="hidden" {...register('image')} />

              <div className="text-center">
                <label htmlFor="file-upload" className="inline-block border bg-gray-700 text-sm text-white px-3 py-1 rounded-lg cursor-pointer">Choose file</label>
                {errors.image?.message && typeof errors.image.message === 'string' && <p className="text-red-600 text-sm font-semibold">{errors.image.message}</p>}
              </div>
            </div>

            <div className="mb-4 space-y-4 lg:space-y-5">
              <div className="space-y-1">
                <input type="text" placeholder="Enter your title here" className="border-b-2 w-full font-semibold text-slate-900 border-slate-300 px-2 outline-none text-lg " {...register('title')} />
                {errors.title?.message && <p className="text-red-600 text-sm font-semibold">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <input type="text" placeholder="Enter your post description" className="border-b-2 w-full  text-slate-900 border-slate-300 px-2 outline-none " {...register('description')} />
                {errors.description?.message && <p className="text-red-600 text-sm font-semibold">{errors.description.message}</p>}
              </div>
              <span className="text-xs text-slate-800 font-semibold px-3 inline-block lg:block lg:text-center lg:text-sm lg:text-slate-700">
                <span className="text-bold text-slate-950">Note:</span> Changes here will affect your post appears in public places like homepage.
              </span>
            </div>

            <div className="my-4 text-center mt-auto">
              <button type="submit" className="text-white bg-green-700 px-3 py-0.5 rounded mb-1 cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "submitting" : "submit"}
              </button>
              {errors.root?.message && <p className="text-red-600 text-sm font-semibold">{errors.root.message}</p>}
            </div>
          </form>


        </div>

      </div>


    </div >
  )
}
