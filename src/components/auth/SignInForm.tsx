'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { signIn } from "@/lib/api/signIn" // 🔑 အဆင့် ၁ မှ API Logic

export default function SignInForm() {
  const router = useRouter(); 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false) 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)
    
    try {
      const result = await signIn({ email, password }) 
      
      // ===============================================
      // ✅ CORE LOGIN LOGIC (Authentication & Redirection)
      // ===============================================
      
      // 🔑 accessToken ပါမပါ စစ်ဆေးပါ
      if (result.accessToken) { 
        
        // ၁။ Access Token ကို သိမ်းဆည်းခြင်း (API ခေါ်ဖို့)
        localStorage.setItem('accessToken', result.accessToken); 
        
        // ၂။ Refresh Token ကို သိမ်းဆည်းခြင်း (Access Token သက်တမ်းကုန်ရင် ပြန်တောင်းဖို့)
        localStorage.setItem('refreshToken', result.refreshToken); 
        
        // ၃။ User Data (Name, Role) တွေကို သိမ်းဆည်းခြင်း
        localStorage.setItem('user', JSON.stringify({
            email: result.email, 
            name: result.name, 
            role: result.role 
        }));
        
        setSuccess(true);
        
        // ၄။ Dashboard ကို ရွှေ့ပြောင်းခြင်း
        setTimeout(() => {
            router.push('/dashboard'); 
        }, 2000); 

      } else {
         // 🔑 Backend က code ရဲ့ ပုံစံကြောင့် ဒီ Error မဖြစ်သင့်တော့ပါ
         throw new Error("Login failed. Tokens missing from server response.");
      }
      
    } catch (err) {
      console.error("Login Error:", err)
      setError((err as Error).message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Log In to CareNet</h2>
        
        {error && <p className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</p>}
        {success && <p className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">Login successful! Redirecting to Dashboard...</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
            
            <button type="submit" disabled={isLoading} className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 disabled:bg-green-400">
                {isLoading ? "Logging In..." : "Log In"}
            </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link>
        </p>
    </div>
  )
}