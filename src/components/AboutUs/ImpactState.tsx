import { DollarSign, Globe, CheckCircle, Users } from 'lucide-react';

const ImpactStats = () => (
    <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
                Our Impact So Far
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <Stat icon={DollarSign} value="10.5M+" label="Total Funds Raised" />
                <Stat icon={Users} value="50K+" label="Lives Impacted" />
                <Stat icon={CheckCircle} value="120+" label="Campaigns Completed" />
                <Stat icon={Globe} value="5" label="Years of Service" />
            </div>
        </div>
    </section>
);

// 📌 Stat Card ကို ထပ်ထည့်ပေးဖို့ လိုအပ်ပါတယ်။
const Stat = ({ icon: Icon, value, label }: any) => (
    <div className="p-4">
        <Icon size={48} className="text-blue-600 mx-auto mb-3" />
        <p className="text-4xl font-extrabold text-gray-900">{value}</p>
        <p className="text-md text-gray-600 font-medium mt-1">{label}</p>
    </div>
);

export default ImpactStats;