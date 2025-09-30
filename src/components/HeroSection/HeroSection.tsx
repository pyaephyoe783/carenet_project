"use client";
import React from "react";
import Image from "next/image";
import heroImage from "./hero-donation.jpg";
import { HeroStats } from "./HeroStatus";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  return (
     <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-white overflow-hidden">
            
          
            <Image
                src={heroImage} 
                alt="Donation background"
                fill 
                className="object-cover"
                priority 
            />

            <div
                className="absolute inset-0 
                            bg-gradient-to-t 
                            from-blue-700/80   // အောက်ခြေ (Start)
                            via-green-400/50    // အလယ် (Middle)
                            to-blue-500/50     // အပေါ် (End) 
                "
            ></div>
            <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
                <HeroContent />
              <HeroStats />
            </div>
        </section>
  );
};

export default HeroSection;
