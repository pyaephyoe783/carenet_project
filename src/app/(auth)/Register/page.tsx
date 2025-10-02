'use client' // 🔑 State တွေကို သုံးမှာမို့ Client Component ဖြစ်ရပါမယ်

import { useState } from "react"
import { signUp } from "@/lib/api/signup" // 🔑 အဆင့် ၁ မှ function ကို Import လုပ်ပါ
import Link from "next/link"

export default function SignUpForm() {
  // 🔑 Form State များကို သတ်မှတ်ခြင်း
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("") // 💡 phone အတွက် state ထပ်ထည့်ပေးထားသည်။
  const [address, setAddress] = useState("")
  const [township, setTownship] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Loading State
  const [error, setError] = useState<string | null>(null) // Error State
  const [success, setSuccess] = useState<boolean>(false) // Success State

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)
    
    // 💡 Backend က phone ကို optional ပေးထားတာကြောင့် phone မထည့်လဲ အဆင်ပြေပါသည်။

    try {
      const result = await signUp({
        email, name, password, address, township, phone, // phone ကိုပါ ထည့်ပေးလိုက်ပါ
        profileImage
      })
      
      console.log("Signup success:", result)
      setSuccess(true)
      
      // 💡 အောင်မြင်ပြီးနောက် Form ကို ရှင်းလင်းနိုင်ပါသည်
      // setEmail(''); setPassword(''); ...
      
    } catch (err) {
      // 💡 Error ကို UI တွင် ပြသရန် စီမံခြင်း
      console.error("Signup Error:", err)
      setError((err as Error).message || "An unknown error occurred during signup.")
      setSuccess(false)
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Your Account</h2>
        
        {error && <p className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</p>}
        {success && <p className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">Signup successful! You can now log in.</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (Optional)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" value={township} onChange={e => setTownship(e.target.value)} placeholder="Township / City" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            
            {/* File Input for Profile Image */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (Optional)</label>
                <input type="file" onChange={e => setProfileImage(e.target.files?.[0] ?? null)} className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 disabled:bg-blue-400"
            >
                {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Log In</Link>
        </p>
    </div>
  )
}