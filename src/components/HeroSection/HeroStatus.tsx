// src/components/hero/HeroStats.tsx
import React from 'react';

// စာသားတွေကို Gradient ပေးဖို့အတွက် လိုအပ်ပါက အပြင်ကနေ className ကို လက်ခံနိုင်ပါတယ်
interface HeroStatsProps {
    className?: string;
}

const statsData = [
    { value: "$2.5M+", label: "Total Donated" },
    { value: "50K+", label: "Lives Impacted" },
    { value: "200+", label: "Active Campaigns" },
];

export const HeroStats: React.FC<HeroStatsProps> = ({ className }) => {
    return (
        // Grid Layout ကို Mobile/Desktop နှစ်မျိုးလုံးအတွက် သုံးထားပါတယ်
        <div className={`
            mt-12 md:mt-16 
            grid grid-cols-1 sm:grid-cols-3 
            gap-8 sm:gap-4 
            pt-8 
            border-t border-white/20 // အပေါ်ဘက်မှာ အဖြူရောင်မျဉ်းပါအောင်
            ${className}
        `}>
            {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                    {/* ကိန်းဂဏန်းကို Gradient Color ပေးခြင်း (ပိုပြီး Highlight ဖြစ်အောင်) */}
                    <p className="text-4xl md:text-5xl font-extrabold mb-1 tracking-wider">
                        <span className="
                            bg-gradient-to-r 
                            from-yellow-400 to-green-300 // ပုံထဲကလို ရွှေရောင်/အစိမ်းဖျော့ Gradient ပေးခြင်း
                            bg-clip-text 
                            text-transparent 
                        ">
                            {stat.value}
                        </span>
                    </p>
                    
                    {/* ဖော်ပြချက် (Label) */}
                    <p className="text-sm uppercase tracking-widest text-white/80 font-medium">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
};