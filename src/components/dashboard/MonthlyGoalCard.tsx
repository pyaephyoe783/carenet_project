'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/store/useDashboardStore'; // Dashboard Store မှ Data ယူမည်

const MonthlyGoalCard: React.FC = () => {
    // 🔑 Dashboard Store မှ Data ယူခြင်း
    const { monthlyGoal, raisedThisMonth } = useDashboardStore();

    const monthlyGoalProgress = monthlyGoal > 0 ? Math.round((raisedThisMonth / monthlyGoal) * 100) : 0;
    const remainingToGoal = monthlyGoal - raisedThisMonth;

    return (
        <Card className='h-full flex flex-col'>
            <CardHeader>
                <CardTitle className="text-xl font-bold">Monthly Donation Goal</CardTitle>
            </CardHeader>
            <CardContent className='flex-grow flex flex-col justify-between'>
                <div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                            className="h-3 bg-blue-600 rounded-full transition-all duration-500" 
                            style={{ width: `${monthlyGoalProgress}%` }} 
                        ></div>
                    </div>
                    {/* Progress Text */}
                    <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>${raisedThisMonth} / ${monthlyGoal}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        You're {monthlyGoalProgress}% towards your monthly goal! Just ${remainingToGoal > 0 ? remainingToGoal : 0} more to reach your target.
                    </p>
                </div>
                
                {/* CTA Button */}
                <Button variant="gradient" className="w-full bg-green-500 hover:bg-green-600 font-bold">
                    Continue Giving
                </Button>
            </CardContent>
        </Card>
    );
};

export default MonthlyGoalCard;