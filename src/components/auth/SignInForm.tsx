"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/auth-result.store";
import { signInRequest } from "@/app/anonymous/client";
import { SignInForm } from "@/app/anonymous/common";

export default function SignInPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>();
  const { setAuth } = authStore();

  async function signIn(form: SignInForm) {
    try {
      const result = await signInRequest(form);
      if (result) {
        setAuth(result);
        router.push(`/${String(result.role).toLowerCase()}`);
      }
    } catch (err) {
      console.error("Sign-in failed:", err);
      alert("Invalid email or password.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Log In to CareNet</h2>

      <form onSubmit={handleSubmit(signIn)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            {...register("email", { required: "Please enter your email." })}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            {...register("password", { required: "Please enter your password." })}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
