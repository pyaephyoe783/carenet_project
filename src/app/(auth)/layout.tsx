// app/(auth)/layout.tsx

import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // 📌 min-h-screen ပေးထားသောကြောင့် Form ကို Screen အပြည့် ယူထားပါမည်။
    <div className="min-h-screen bg-gray-50"> 
      {children}
    </div>
  );
};

export default AuthLayout;