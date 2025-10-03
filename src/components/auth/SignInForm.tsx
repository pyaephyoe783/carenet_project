// 'use client'

import Link from "next/link"
import { useForm } from "react-hook-form";
import { authStore } from "@/store/auth-result.store";
import { useRouter } from "next/navigation";
import { signInRequest, signUpRequest } from "@/app/anonymous/client";
import { SignInForm } from "@/app/anonymous/common";

export default function SignInPage() {

  const navigate = useRouter()
    const {register, handleSubmit, formState : {errors}} = useForm<SignInForm>()
    const {setAuth} = authStore()

    async function signIn(form : SignInForm) {
        const result = await signInRequest(form)
        setAuth(result)
        console.log("Result "+result);
        if(result) {
            navigate.push(`/${result.role.toLocaleLowerCase()}`)
        }
    }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Log In to CareNet</h2>
        
        <form onSubmit={handleSubmit(signIn)} className="space-y-4">
            <input type="text" className="form-control" placeholder="Please enter name" {
                        ...register('email', {required : "Please enter your name."})
                    } />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
           <input type="password" className="form-control" placeholder="Enter password."
                        {...register('password', {required : "Please enter password."})}/>
                    {errors.password && <span className="text-sm text-danger">{errors.password?.message}</span>}
            
            <button type="submit" className="btn btn-secondary">
                        <i className="bi-unlock"></i> Sign In
                    </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link>
        </p>
    </div>
  )
}