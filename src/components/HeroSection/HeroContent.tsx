// src/components/hero/HeroContent.tsx
'use client'

import React from 'react';
import { Button } from '@/components/ui/button'; // Button Component ကို သေချာ import လုပ်ပါ
import { Heart, BookOpen } from 'lucide-react'; // Icon များ ထည့်သွင်းရန်

const HeroContent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      
      {/* 1. Main Title (ခေါင်းစဉ်) */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 max-w-4xl leading-tight">
        Together, We Can
        {/* Change Lives ကို Gradient ပေးခြင်း */}
        <span className="
            block // စာကြောင်း အသစ်ချဖို့ (မချချင်ရင် block ကို ဖယ်နိုင်သည်)
            bg-gradient-to-r 
            from-yellow-400 via-yellow-300 to-amber-200 // ပုံထဲကလို ရွှေရောင်ဆန်တဲ့ Gradient
            bg-clip-text 
            text-transparent 
            ml-2
        ">
          Change Lives
        </span>
      </h1>
      
      {/* 2. Sub-text (အောက်ခံစာသား) */}
      <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-10 mt-4">
        Join millions of compassionate donors making a real difference in communities 
        worldwide. Every donation, no matter the size, creates ripples of positive change.
      </p>

      {/* 3. CTA Buttons (Call to Action) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        
        {/* Start Donating Button (Gradient) */}
        <Button 
          variant="gradient" 
          size="lg"
          onClick={() => console.log("Navigate to /donate")} 
          className="shadow-xl"
        >
          <Heart size={20} className="mr-2 fill-white text-white" /> Start Donating
        </Button>

        {/* Learn More Button (Outline) */}
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => console.log("Navigate to /about")}
          className="
            bg-white/10 text-white border-white/40 
            hover:bg-white/20 transition-colors backdrop-blur-sm
          "
        >
          <BookOpen size={20} className="mr-2" /> Learn More
        </Button>
      </div>

    </div>
  );
};

export default HeroContent;