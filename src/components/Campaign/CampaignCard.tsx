import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 🔑 Link Component ကို Import လုပ်ပါ
import { Heart, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
// Campaign Model ကို ခေါ်ယူ
import { Campaign } from '@/store/useCampaignStore';

type CampaignCardProps = {
    campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
    // Percentage တွက်ချက်ခြင်း
    const progress = Math.round((campaign.raised / campaign.goal) * 100);
    // Currency ကို လှပအောင် ဖော်ပြခြင်း
    const formatCurrency = (amount : number) => `$${(amount / 1000).toFixed(0)}K`;

    // Category ပေါ်မူတည်ပြီး အရောင်ရွေးချယ်ခြင်း
    const categoryColor = {
        'Education': 'bg-blue-600',
        'Water': 'bg-teal-600',
        'Healthcare': 'bg-red-600',
        'Food': 'bg-yellow-600',
    }[campaign.category] || 'bg-gray-600';

    return (
        // 🔑 Card တစ်ခုလုံးကို Next.js Link Component ဖြင့် ခြုံလိုက်ပါ
        // Dynamic Path ကို /campaigns/[id] ပုံစံဖြင့် ချိတ်ဆက်ခြင်း
        <Link 
            href={`/campaigns/${campaign.id}`} 
            passHref // Next.js version အသစ်တွေမှာ passHref မလိုအပ်တော့ပေမယ့် လုံခြုံစေရန် ထည့်သွင်းပါ
            className="block h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
            <div className="bg-white rounded-xl shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                
                {/* 1. Image & Category Tag */}
                <div className="relative h-48 w-full flex-shrink-0">
                    <Image
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        fill
                        className="object-cover"
                    />
                    {/* Category Tag */}
                    <span className={`absolute top-4 left-4 ${categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-full z-10`}>
                        {campaign.category}
                    </span>
                </div>
                
                {/* 2. Content Body */}
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{campaign.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{campaign.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-2 bg-green-500 transition-all duration-500" 
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Progress Stats */}
                    <div className="flex justify-between items-center text-sm mb-4">
                        <p className="text-blue-600 font-bold">{formatCurrency(campaign.raised)} <span className="text-gray-500 font-normal">of {formatCurrency(campaign.goal)}</span></p>
                    </div>

                    {/* Donors and Days Left */}
                    <div className="flex justify-between items-center text-gray-500 text-xs mt-auto pb-4 border-b border-gray-100">
                        <p className="flex items-center gap-1">
                            <Users size={14} /> {campaign.donors} donors
                        </p>
                        <p className="flex items-center gap-1">
                            <Clock size={14} /> {campaign.daysLeft} days left
                        </p>
                    </div>
                    
                    {/* 🔑 Donate Button ကို Link ထဲမှာ Button ကို သုံးတဲ့အခါ click event တွေ မရောစေဖို့ အခြား Link သုံးတာကို ရှောင်ပါမယ်။ */}
                    {/* ဒီ Button ကို တိုက်ရိုက် Click လုပ်ချင်ရင်တော့ preventDefault လုပ်ဖို့လိုပေမယ့်၊ ဒီနေရာမှာ ဒီအတိုင်းထားပြီး Link ရဲ့ Area ကိုသာ အဓိကထားပါမယ်။ */}
                    <Button 
                        variant="default" 
                        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold pointer-events-none" // 💡 Link တစ်ခုလုံးကို Click ရစေရန်
                        onClick={(e) => {
                            e.preventDefault(); // Button Click ကနေ Navigate လုပ်တာကို တားဆီးထားလို့ ရပါတယ် (သို့) ဒီ Button ကို လုံးဝ ဖြုတ်ပြီး Card ကိုပဲ Click ရအောင် ထားပါ
                            // 💡 အကယ်၍ ဒီ Button ကနေပဲ Donate Form ကို တိုက်ရိုက်ဖွင့်ချင်ရင်တော့ ဒီနေရာမှာ Logic ထည့်လို့ရပါတယ်
                        }}
                    >
                        <Heart size={18} className="mr-2 fill-white text-white" /> Donate Now
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default CampaignCard;