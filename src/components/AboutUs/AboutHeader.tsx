'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 🔑 Image Data (အစ်ကို့ရဲ့ public/images/about/ ထဲမှာ ပုံတွေ ထည့်ပေးဖို့ လိုပါတယ်)
const slides = [
    { 
        src: "/images/about/education-children.jpg", 
        alt: "Volunteers teaching children in a rural area.", 
        caption: "Delivering clean water solutions to remote villages.",
    },
    { 
        src: "/images/about/flood.png", 
        alt: "Children in a classroom supported by CareNet.", 
        caption: "Educating the next generation through sustainable funding.",
    },
    { 
        src: "/images/about/war.jpg", 
        alt: "Medical volunteers attending to a patient.", 
        caption: "Providing essential healthcare services in disaster zones.",
    },
     { 
        src: "/images/about/medical-children.jpg", 
        alt: "Medical volunteers attending to a patient.", 
        caption: "Providing essential healthcare services in disaster zones.",
    }
];

const AboutHeader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 💡 ၃ စက္ကန့်တိုင်းမှာ Auto Slide ဖြစ်စေဖို့ Logic
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // 5 စက္ကန့်တိုင်း ပြောင်းပါ
        
        return () => clearInterval(intervalId); // Component Unmount လုပ်ရင် Interval ကို ရှင်းပစ်ပါ
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const currentSlide = slides[currentIndex];

    return (
        // 📌 Slider Container
        <header className="relative w-full h-[70vh] overflow-hidden">
            
            {/* 1. Image Slider Content */}
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Image 
                        src={slide.src} 
                        alt={slide.alt} 
                        fill 
                        className="object-cover" 
                        priority={index === 0} // ပထမဆုံးပုံကို မြန်မြန် Load ဖို့
                    />
                    
                    {/* Caption Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-16">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 drop-shadow-lg">
                            Making a Difference, Together
                        </h1>
                        <p className="text-xl text-white max-w-2xl drop-shadow-md">
                            {slide.caption}
                        </p>
                    </div>
                </div>
            ))}
            
            {/* 2. Navigation Buttons */}
            <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/60 text-white rounded-full transition"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/60 text-white rounded-full transition"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>
            
            {/* 3. Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-gray-400 opacity-60'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

        </header>
    );
};

export default AboutHeader;