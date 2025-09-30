'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { DashboardStore, useDashboardStore } from '@/store/useDashboardStore';
import { useRouter } from 'next/navigation';
import { Heart, TrendingUp, Zap, Users, Loader2 } from 'lucide-react'; 

// 🔑 Components များ Import လုပ်ခြင်း
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentDonationsList from './RecentDonationsList';
import MonthlyGoalCard from '@/components/dashboard/MonthlyGoalCard';

// ... (dynamicStatCards data array ကို ဒီမှာ သတ်မှတ်ပါ)
// (Dashboard Store က data ကို ယူပြီး StatCard အတွက် အောက်မှာ ပြင်ဆင်ထားသော Array)
const getStatCardsData = (store: DashboardStore) => ([
    { title: "Total Donated", value: `$${store.totalDonated.toLocaleString()}`, subtext: "+15% from last month", icon: Heart, iconColor: "text-blue-500" },
    { title: "Campaigns Supported", value: store.campaignsSupported.toLocaleString(), subtext: "3 new this month", icon: TrendingUp, iconColor: "text-green-500" },
    { title: "Impact Score", value: store.impactScore.toString(), subtext: "Top 10% of donors", icon: Zap, iconColor: "text-yellow-500" },
    { title: "Lives Impacted", value: store.livesImpacted.toLocaleString(), subtext: "Direct beneficiaries", icon: Users, iconColor: "text-teal-500" },
]);


const DashboardPage = () => {
    const { isAuthenticated, userId } = useAuthStore();
    const router = useRouter();
    const store = useDashboardStore(); // Store တစ်ခုလုံးကို ယူသုံးခြင်း
    const statCardsData = getStatCardsData(store);

    // 🔑 Data Fetching Logic (Authentication/Loading/Error)
    useEffect(() => {
        if (isAuthenticated && userId && store.totalDonated === 0 && !store.isLoading && !store.error) {
            store.fetchDashboardData(userId);
        }
    }, [isAuthenticated, userId, store]);

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
        return null;
    }
    
    if (store.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] text-center text-xl text-gray-500">
                <Loader2 size={24} className='animate-spin mr-3' /> Loading your impact dashboard...
            </div>
        );
    }
    
    if (store.error) {
        return <div className="text-center text-red-600 p-8">Error: {store.error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                
                {/* 1. Header */}
                <DashboardHeader />

                {/* 2. Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCardsData.map((card, index) => (
                        <StatCard key={index} {...card} />
                    ))}
                </div>

                {/* 3 & 4. Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 3. Recent Donations List */}
                    <div className="lg:col-span-2">
                        <RecentDonationsList />
                    </div>

                    {/* 4. Monthly Goal Card */}
                    <div className="lg:col-span-1">
                        <MonthlyGoalCard />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;