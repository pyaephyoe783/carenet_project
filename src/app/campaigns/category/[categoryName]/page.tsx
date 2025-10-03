'use client'

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCampaignStore } from '@/store/useCampaignStore';
import CampaignCard from '@/components/Campaign/CampaignCard'; // 🔑 Card Component
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FilteredCampaignsPage = () => {
    const params = useParams();
    const router = useRouter();
    
    // 🔑 URL ကနေ Category Name (e.g., 'education', 'water') ကို ဖမ်းယူပါ
    const rawCategoryName = params.categoryName as string; 
    
    // Store မှ Data ယူခြင်း
    const { campaigns, isLoading, error, fetchCampaigns } = useCampaignStore();

    // 💡 Category Filter လုပ်ခြင်း
    const filteredCampaigns = campaigns.filter(c => 
        // 🔑 Store ထဲက Campaign ရဲ့ Category နဲ့ URL က Category ကိုက်ညီမှု စစ်ပါ
        c.category.toLowerCase() === rawCategoryName.toLowerCase()
    );

    useEffect(() => {
        if (campaigns.length === 0 && !isLoading && !error) {
            fetchCampaigns();
        }
    }, [campaigns.length, isLoading, error, fetchCampaigns]);

    const titleCaseCategory = rawCategoryName.charAt(0).toUpperCase() + rawCategoryName.slice(1);
    
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                
                {/* Back Button */}
                <Button variant="outline" onClick={() => router.push('/campaigns')} className="mb-6 flex items-center text-blue-600">
                    <ArrowLeft size={16} className="mr-2" /> Back to All Categories
                </Button>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        {titleCaseCategory} Campaign Posts
                    </h1>
                    <p className="text-lg text-gray-600 mt-1">
                        Here are all the active donation posts under the {titleCaseCategory} category.
                    </p>
                </div>

                {/* Filtered Campaigns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                         <div className="col-span-full text-center p-10 text-gray-500">
                            <Loader2 size={32} className='animate-spin mx-auto' />
                            Loading campaign posts...
                         </div>
                    ) : filteredCampaigns.length === 0 ? (
                        <div className="col-span-full text-center p-10 text-gray-500">
                            <p className="text-xl">No donation posts found in this category yet.</p>
                        </div>
                    ) : (
                        filteredCampaigns.map((campaign) => (
                            // 🔑 Campaign Card ကို ပြသပြီး၊ Card ကို Click ရင် Detail Page ကို သွားမည်
                            <CampaignCard key={campaign.id} campaign={campaign} />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default FilteredCampaignsPage;