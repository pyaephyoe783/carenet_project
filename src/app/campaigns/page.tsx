import Link from 'next/link';
import { BookOpen, Drill, Droplet, Globe, Heart, Palette, PawPrint, Pill, Ribbon, Shield, ShieldAlert, Tent, TrendingUp, Users, Utensils, Wheat, Zap } from 'lucide-react';

const CATEGORY_DATA = [
    {
        name: 'Education',
        icon: BookOpen,
        description: 'Fund schools, supplies, and learning programs for children.',
        color: 'bg-blue-600',
    },
    {
        name: 'Water',
        icon: Droplet,
        description: 'Support clean water initiatives and well construction projects.',
        color: 'bg-teal-600',
    },
    {
        name: 'Healthcare',
        icon: Heart,
        description: 'Provide essential medical care, vaccines, and mobile clinics.',
        color: 'bg-red-600',
    },
    {
        name: 'Food',
        icon: Utensils,
        description: 'Help fight hunger by funding food distribution and feeding programs.',
        color: 'bg-yellow-600',
    }    
    ,
    { 
        name: 'Elderly Care', 
        icon: Pill, 
        description: 'Funding for senior citizens\' health services, housing support, and companionship programs.', 
        color: 'bg-fuchsia-600'
    },
   {
     name: 'Women Empowerment', 
        icon: Ribbon, 
        description: 'Funding for women\'s education, health, and economic independence programs.', 
        color: 'bg-pink-500'
   },
    { name: 'Disaster Relief', icon: Tent, description: 'Emergency aid, shelter, and recovery efforts for disaster-affected communities.', color: 'bg-orange-600' },
    { name: 'Animal Welfare', icon: PawPrint, description: 'Support for animal rescue, wildlife protection, and sanctuaries.', color: 'bg-pink-600' },
    { name: 'Hunger Relief', icon: Wheat, description: 'Funding food distribution, feeding programs, and hunger relief efforts.', color: 'bg-yellow-600' },
    { name: 'Environment', icon: Globe, description: 'Projects focused on conservation, climate, and sustainability.', color: 'bg-green-600' },
    { name: 'Animals', icon: PawPrint, description: 'Support for animal rescue, wildlife protection, and sanctuaries.', color: 'bg-pink-600' },
    { name: 'Arts & Culture', icon: Palette, description: 'Funding creative projects, historical sites, and cultural preservation.', color: 'bg-purple-600' },
    { name: 'Community', icon: Users, description: 'Local community development, senior care, and youth initiatives.', color: 'bg-indigo-600' },
    { name: 'Human Rights', icon: Shield, description: 'Protecting civil liberties, advocating justice, and legal aid.', color: 'bg-gray-600' },
    { name: 'Technology', icon: Zap, description: 'Donations for tech education, digital access, and innovation.', color: 'bg-cyan-600' },
    { name: 'Sports', icon: TrendingUp, description: 'Funding youth sports programs, equipment, and accessibility.', color: 'bg-lime-600' },
];

const CampaignsHomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
                        Choose a Cause to Support
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our verified categories and find a campaign that moves you.
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {CATEGORY_DATA.map((category) => {
                        const Icon = category.icon;
                        
                        // 🔑 Category ကို နှိပ်လိုက်ရင် Filter Page သို့ ရောက်စေရန်
                        // URL: /campaigns/education (သို့မဟုတ်) /campaigns/water
                        // const linkHref = `/campaigns/${category.name.toLowerCase()}`;
                           const linkHref = `/campaigns/category/${category.name.toLowerCase()}`;
                        
                        return (
                            <Link 
                                key={category.name} 
                                href={linkHref}
                                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 border-t-4 border-transparent hover:border-blue-500 group"
                            >
                                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-4 text-white group-hover:bg-opacity-90`}>
                                    <Icon size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                                    {category.name}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {category.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CampaignsHomePage;