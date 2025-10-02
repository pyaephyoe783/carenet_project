'use client'; // 🔑 useState သုံးမှာမို့ Client Component ဖြစ်ရပါမယ်

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

// 🔑 မေးခွန်း/အဖြေ Data
const faqData = [
    {
        q: "How quickly are donations transferred to the campaigns?",
        a: "All donations are processed and transferred to the respective project organizations within **48 hours** of receiving the funds. Donors can track the progress using their transaction ID on the Dashboard."
    },
    {
        q: "What administrative fees does CareNet charge?",
        a: "CareNet charges **zero** administrative fees. 100% of your donation amount goes directly to the intended project. (Note: Standard third-party payment processing fees, like bank or card fees, may apply.)"
    },
    {
        q: "Is my personal information secure?",
        a: "Yes. We utilize industry-leading SSL encryption and adhere to strict data protection standards to safeguard your information. We never sell or share your personal details with third parties."
    },
    {
        q: "What types of campaigns does CareNet support?",
        a: "We primarily support five critical humanitarian sectors: Education, Healthcare, Environmental Sustainability, Clean Water access, and Emergency Disaster Relief efforts globally."
    }
];


// 🔑 FAQ Item အတွက် Component
const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg text-gray-800 hover:text-blue-600 transition duration-150"
                onClick={onClick}
            >
                {question}
                {isOpen ? <ChevronUp size={20} className="text-blue-600" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-600 animate-fadeIn">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const FaqSection = () => {
    // 🔑 လက်ရှိဖွင့်ထားသော မေးခွန်း၏ Index ကို မှတ်ထားသည်
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        // အကယ်၍ နှိပ်လိုက်တဲ့ မေးခွန်းက လက်ရှိဖွင့်ထားတဲ့ မေးခွန်းဆိုရင် ပိတ်မယ် (null ပြန်ပေး)
        // မဟုတ်ရင်တော့ နှိပ်လိုက်တဲ့ မေးခွန်းကို ဖွင့်မယ်
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-4 flex justify-center items-center gap-3">
                    <HelpCircle size={36} className="text-blue-600" />
                    Frequently Asked Questions (FAQ)
                </h2>
                <p className="text-lg text-gray-500 text-center mb-10">
                    Before you donate, find answers to your most common questions here.
                </p>

                <div className="shadow-xl rounded-xl overflow-hidden bg-white border border-gray-100 p-4 md:p-8">
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            question={item.q}
                            answer={item.a}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;