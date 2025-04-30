import { useForm } from "react-hook-form"
import Input from "../forms/Input";
import Label from "../forms/Label";
import { UserSchema, type UserSchemaTypes } from "@charles_ben/zod-validation-blog-app"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrorMessage } from "../forms/FormErrorMessage";
import { ErrorMessage } from "../forms/ErrorMessage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import Loader from "../loader/Loader";

export default function Signup() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserSchemaTypes>({ resolver: zodResolver(UserSchema) })
    const { isAuthenticated, signin } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    async function onSubmit(data: UserSchemaTypes) {
        const apiUrl = import.meta.env.VITE_API_URL
        try {
            await axios.post(`${apiUrl}/api/v1/user/signin`, data, {
                withCredentials: true
            })
            signin()
            navigate('/')
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.data.message) {
                    setError('root', {
                        type: "manual",
                        message: e.response.data.message || "Something went wrong. Please try again later."
                    })

                }
                else {
                    setError('root', {
                        type: "manual",
                        message: "Something went wrong. Please try again later."
                    })
                }
            }
            else {
                setError('root', {
                    type: "manual",
                    message: "Something went wrong. Please try again later."
                })
            }

        }

    }

    if (isAuthenticated === null) {
        return <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-[100]">
            <Loader />
        </div>
    }


    if (isAuthenticated) {
        return null
    }

    return <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-7 rounded-md bg-white  md:min-w-[350px] ">
            <div className="mb-3 md:text-center">
                <h1 className="text-center mb-2 text-2xl font-semibold">Welcome back</h1>
                <span className="text-gray-800">Please enter your details to signin</span>
            </div>
            <hr className="mb-3 text-slate-300" />

            <form className="space-y-3 mb-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-1.5">
                    <Label htmlFor="username" >Username</Label>
                    <Input type="text" id="username" placeholder="Enter your username" {...register('username')} />
                    {errors.username?.message && <ErrorMessage message={errors.username.message} />}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Enter your password" {...register('password')} />
                    {errors.password?.message && <ErrorMessage message={errors.password.message} />}
                </div>

                <button className="bg-black text-white w-full border-0 py-1.5 rounded inline-block mt-2 cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "submitting" : "Sign in"}
                </button>

            </form>
            {errors.root?.message && <FormErrorMessage message={errors.root.message} />}
            <div className="md:text-center flex justify-center mt-2">
                <span className="text-sm text-slate-900">
                    Don’t have an account?  <Link to="/signup" className="font-semibold hover:underline text-black underline"> Sign up</Link>
                </span>

            </div>
        </div>

    </div>
}