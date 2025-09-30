import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

// Props Interface
interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    icon: LucideIcon;
    iconColor: string; // Tailwind class string, e.g., 'text-blue-500'
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, icon: Icon, iconColor }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    {title}
                </CardTitle>
                <Icon size={18} className={`${iconColor}`} />
            </CardHeader>
            <CardContent>
                {/* ကိန်းဂဏန်း Value */}
                <div className="text-3xl font-bold text-gray-800">{value}</div>
                
                {/* Subtext/Change Rate */}
                <p className="text-xs text-green-500 pt-1 flex items-center">
                    {/* Subtext မှာ '+' ပါမှ Arrow Icon ကို ပြပါမည် */}
                    {subtext && subtext.includes('+') && <ArrowUpRight size={12} className="mr-1" />} 
                    {subtext}
                </p>
            </CardContent>
        </Card>
    );
};

export default StatCard;