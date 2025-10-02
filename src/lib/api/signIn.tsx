export interface AuthResult {
    email : string
    name : string
    role : 'Admin' | 'Member'
    accessToken : string
    refreshToken : string
}

// 📌 ဤ function သည် Email နှင့် Password ကို Backend သို့ POST ပို့ရန် တာဝန်ယူသည်။
export async function signIn(formData: {
  email: string
  password: string
}): Promise<AuthResult> { 
  
  // 🔑 Backend က တောင်းဆိုသည့် URL ကို အသုံးပြုပါမည်။
  const res = await fetch("http://10.10.1.84:8080/token/generate", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), 
  });

  if (!res.ok) {
    // ❌ Login မအောင်မြင်ပါက Error Message ကို ပြန်ဖမ်းပါ
    const errorData = await res.json(); 
    throw new Error(errorData.message || "Email or Password is incorrect.");
  }

  // ✅ AuthResult (accessToken, refreshToken, user data) ကို ပြန်ပေးပါ
  return res.json();
}