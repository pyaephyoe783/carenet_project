import SignInForm from "@/components/auth/SignInForm"; // 🔑 အရင်အဆင့်က Form Component ကို ဒီမှာ ခေါ်လိုက်သည်

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <SignInForm />
    </div>
  )
}

export default LoginPage;