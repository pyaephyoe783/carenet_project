'use client'

import { cn } from "@/lib/utils"; // class names တွေကို ပေါင်းစည်းပေးမယ့် utility
import React from "react";

// Button ရဲ့ Properties (Props) တွေကို သတ်မှတ်ခြင်း
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // variant မှာ ခုနက ဆွေးနွေးထားတဲ့ gradient ကိုပါ ထပ်ထည့်လိုက်ပါတယ်
  variant?: "default" | "ghost" | "outline" | "hero" | "donate" | "gradient"; 
  size?: "default" | "sm" | "lg";
  className?: string; // အပြင်ကနေ class ထပ်ပေးဖို့
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  // 1. အခြေခံ Style များ (Component အားလုံးအတွက်)
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // 2. Variant (အရောင်၊ ပုံစံ) များ
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 rounded-lg focus:ring-blue-500",

      donate:
        "text-white font-bold rounded-md focus:ring-red-500 \
        bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))]",
    
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 rounded-lg",
    
    outline:
      "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg focus:ring-gray-500",
      
    // Gradient Button (ပုံထဲက အရောင်ကို ခန့်မှန်းပြီး ထည့်သွင်း)
    gradient: 
      "text-white font-bold rounded-xl shadow-lg transform transition-transform hover:scale-[1.02] active:scale-[0.98] \
       bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:ring-blue-500",
    
    hero: "bg-green-600 text-white font-bold hover:bg-green-700 rounded-lg focus:ring-green-500",
    
  
  };

  // 3. Size (အရွယ်အစား) များ
  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1 text-xs",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      // base, variant, size, ပြီးနောက် အပြင်က လာတဲ့ className ကို ပေါင်းစည်းခြင်း
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};