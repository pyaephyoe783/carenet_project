'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/store/useDashboardStore'; // Dashboard Store မှ Data ယူမည်

const RecentDonationsList: React.FC = () => {
    // 🔑 Dashboard Store မှ Data ယူခြင်း
    const { recentDonations } = useDashboardStore();

    return (
        <Card>
            <CardHeader className='pb-3'>
                <div className='flex justify-between items-center'>
                    <CardTitle className="text-xl font-bold">Recent Donations</CardTitle>
                    <Button variant="outline" size="sm" className="flex items-center">
                        + New Donation
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='space-y-4'>
                {/* Donation List Items */}
                {recentDonations.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
                        <div>
                            <p className="font-semibold text-gray-700">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-green-600">${item.amount}</p>
                            <span className="text-xs text-gray-400">{item.status}</span>
                        </div>
                    </div>
                ))}
                {/* Data မရှိရင် ပြရန် */}
                {recentDonations.length === 0 && <p className='text-center text-gray-500 py-4'>No recent donations found.</p>}
            </CardContent>
        </Card>
    );
};

export default RecentDonationsList;