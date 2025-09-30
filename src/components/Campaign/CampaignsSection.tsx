'use client'

import React from 'react';
import { useCampaignStore } from '@/store/useCampaignStore'; // Zustand Store ကို ခေါ်ယူ
import CampaignCard from './CampaignCard'; // Campaign Card Component ကို ခေါ်ယူ

import { ArrowRight } from 'lucide-react';

const CampaignsSection = () => {
    // 🔑 Global State မှ Campaigns Data ကို ယူသုံးခြင်း
    const campaigns = useCampaignStore((state) => state.campaigns);
    
    // ပုံထဲကအတိုင်း Featured 3 ခုပဲ ပြပါမယ်
    const featuredCampaigns = campaigns.slice(0, 3); 

    return (
        <section id="campaigns" className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
                        Featured Campaigns
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover meaningful causes and join thousands of donors making a real difference
                    </p>
                </div>

                {/* Campaigns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCampaigns.map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <a 
                        href="/campaigns" 
                        className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        View All Campaigns 
                        <ArrowRight size={20} className="ml-2" />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default CampaignsSection;