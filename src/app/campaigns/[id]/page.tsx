

// src/app/campaigns/[id]/page.tsx (Final Version)
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // useRouter ကို ထည့်သွင်းပါ
import { useCampaignStore } from '@/store/useCampaignStore';
import { Campaign } from '@/store/useCampaignStore'; // 🔑 Campaign Type ကို Import ပါ
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Clock, Users, DollarSign, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CampaignDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const campaignId = params.id as string; 
    const id = parseInt(campaignId); 

    const { campaigns, isLoading, error, fetchCampaigns } = useCampaignStore();
    const campaign = campaigns.find(c => c.id === id);

    // Donation Input State (Dummy)
    const [donationAmount, setDonationAmount] = useState(50); 
    const handleDonate = () => { 
        console.log(`Donating $${donationAmount} to ${campaign?.title}`); 
        // 💡 Donation Logic ဒီနေရာမှာ ရေးရမှာပါ
    };

    // Loading & Data Fetching Logic 
    useEffect(() => {
        if (campaigns.length === 0 && !isLoading && !error) {
            fetchCampaigns();
        }
    }, [campaigns.length, isLoading, error, fetchCampaigns]);

    // ------------------------------------
    // 🔑 Loading/Error Handling (UI Structure မပေါ်ခင် return လုပ်ခြင်း)
    // ------------------------------------
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] text-center text-xl text-gray-500">
                <Loader2 size={24} className='animate-spin mr-3' />
                Loading campaign details...
            </div>
        );
    }
    
    // 🔑 Campaign Not Found / Error State
    // (isLoading ပြီးသွားပေမယ့် campaign မရှိရင်)
    if (error || !campaign) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center text-red-600 p-8 space-y-4">
                <p className='text-2xl font-bold'>{error || `Campaign with ID ${campaignId} not found.`}</p>
                <p className='text-lg text-gray-500'>The campaign may have ended or the link is incorrect.</p>
                <Button onClick={() => router.push('/')}>
                    Go Back Home
                </Button>
            </div>
        );
    }

    // ------------------------------------
    // 🔑 Data Found! UI ၏ တွက်ချက်မှုများ
    // 💡 ဒီနေရာရောက်ရင် campaign ဟာ undefined မဟုတ်ကြောင်း TypeScript က အလိုအလျောက် သိပါတယ်
    // 💡 Code ကို သန့်ရှင်းစေရန်၊ campaign ကို Campaign Type အဖြစ် c လို့ သတ်မှတ်လိုက်သည်
    const c = campaign as Campaign; // Type Assertion

    const progress = Math.round((c.raised / c.goal) * 100);
    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { 
        style: 'currency', currency: 'USD', minimumFractionDigits: 0 
    }).format(amount);
    
    // ------------------------------------
    // UI Structure (c ကို အသုံးပြုပါ)
    // ------------------------------------
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                
                {/* 1. Page Header & Title */}
                <div className="mb-8">
                    <span className="text-sm text-blue-600 font-medium uppercase tracking-wider">{c.category}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-1">{c.title}</h1>
                </div>

                {/* 2. Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Column: Image and Story (2/3 width) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Featured Image */}
                        <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={c.imageUrl}
                                alt={c.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Story/Details Tabs */}
                        <Tabs defaultValue="story" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 h-12 bg-white border border-gray-200">
                                <TabsTrigger value="story">Full Story</TabsTrigger>
                                <TabsTrigger value="updates">Updates</TabsTrigger>
                                <TabsTrigger value="comments">Comments</TabsTrigger>
                            </TabsList>
                            <TabsContent value="story" className="p-6 bg-white rounded-xl shadow-md mt-4">
                                <h3 className='text-2xl font-bold mb-4 text-gray-800'>The Full Story Behind {c.title}</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {c.description}
                                    {"\n\n"}This campaign aims to fully fund the construction of three new schools in rural areas where access to quality education is severely limited. Your donation helps cover costs for materials, labor, and initial teacher training. With your support, we can change the future for hundreds of children.
                                </p>
                            </TabsContent>
                            <TabsContent value="updates" className="p-6 bg-white rounded-xl shadow-md mt-4">
                                <p className="text-gray-500">Updates will be posted here as the campaign progresses...</p>
                            </TabsContent>
                            <TabsContent value="comments" className="p-6 bg-white rounded-xl shadow-md mt-4">
                                <p className="text-gray-500">Comments section coming soon!</p>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column: Progress and Donation Form (1/3 width) */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Progress Card */}
                        <Card className='p-6'>
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-gray-500 font-medium">Raised:</span>
                                <span className="text-green-600 font-bold text-xl">{formatCurrency(c.raised)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm mb-4">
                                <span className="text-gray-500 font-medium">Goal:</span>
                                <span className="text-gray-800 font-semibold">{formatCurrency(c.goal)}</span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                <div 
                                    className="h-3 bg-green-500 rounded-full transition-all duration-500" 
                                    style={{ width: `${progress}%` }} 
                                ></div>
                            </div>
                            <p className="text-center text-sm font-bold text-gray-700">{progress}% Funded</p>
                            
                            {/* Key Stats */}
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-100 text-center">
                                <div>
                                    <Clock size={18} className="mx-auto text-blue-500 mb-1" />
                                    <p className="text-sm font-semibold">{c.daysLeft} days</p>
                                    <p className="text-xs text-gray-500">Remaining</p>
                                </div>
                                <div>
                                    <Users size={18} className="mx-auto text-blue-500 mb-1" />
                                    <p className="text-sm font-semibold">{c.donors.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">Donors</p>
                                </div>
                                <div>
                                    <DollarSign size={18} className="mx-auto text-blue-500 mb-1" />
                                    <p className="text-sm font-semibold">${(c.raised/c.donors).toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">Avg. Donation</p>
                                </div>
                            </div>
                        </Card>

                        {/* Donation Form Card */}
                        <Card className='p-6 bg-white shadow-xl border-green-400 border-2'>
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Make a Donation</h3>
                            
                            <div className="flex justify-center gap-3 mb-4">
                                {[25, 50, 100].map(amount => (
                                    <Button 
                                        key={amount} 
                                        variant={donationAmount === amount ? "default" : "outline"}
                                        onClick={() => setDonationAmount(amount)}
                                        className={donationAmount === amount ? "bg-green-500 hover:bg-green-600" : "border-gray-300"}
                                    >
                                        ${amount}
                                    </Button>
                                ))}
                            </div>
                            
                            {/* Custom Amount Input */}
                            <div className="relative mb-4">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                <input
                                    type="number"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                                    placeholder="Other Amount"
                                    className="w-full border border-gray-300 rounded-lg py-2 pl-8 pr-3 text-lg font-semibold focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <Button 
                                variant="gradient" 
                                size="lg" 
                                className="w-full bg-blue-600 hover:bg-blue-700 font-bold"
                                onClick={handleDonate}
                            >
                                <DollarSign size={20} className="mr-2" /> Donate Now
                            </Button>
                        </Card>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CampaignDetailsPage;