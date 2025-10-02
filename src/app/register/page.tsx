import SignUpForm from "@/app/(auth)/Register/page" ; // 🔑 အရင်အဆင့်က Form Component ကို ဒီမှာ ခေါ်လိုက်သည်

const RegisterPage = () => {
  return (
    // 💡 ဒီ Div က Form ကို Screen ရဲ့ အလယ်တည့်တည့်မှာ လှလှပပ ပေါ်စေဖို့ Design ပေးထားတာပါ။
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        {/* 🔑 User တွေ မြင်ရမယ့် တကယ့် Form ပါ */}
        <SignUpForm />
    </div>
  )
}

export default RegisterPage;