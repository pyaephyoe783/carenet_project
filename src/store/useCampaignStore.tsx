
import { create } from 'zustand';

// 1. Data Structure ကို သတ်မှတ်ခြင်း (Campaign Model)
export interface Campaign {
    id: number;
    category :'Education' 
    | 'Water' 
    | 'Healthcare' 
    | 'Food'
    // 🔑 အလယ်အလတ် ၉ ခု
    | 'Refugee Support' 
    | 'Environment' 
    | 'Animals' 
    | 'Arts & Culture' 
    | 'Community' 
    | 'Human Rights' 
    | 'Technology' 
    | 'Sports'
    | 'Women Empowerment'
    // 🔑 နောက်ဆုံးထပ်တိုး ၄ ခု
    | 'Elderly Care'
    | 'Conflict Displaced' 
    | 'Infrastructure' 
    | 'Agriculture'; // Categories များကို သတ်မှတ်
    title: string;
    description: string;
    imageUrl: string;
    goal: number;
    raised: number;
    donors: number;
    daysLeft: number;
}

// 2. Store ၏ State နှင့် Actions များကို သတ်မှတ်ခြင်း
interface CampaignStore {
    campaigns: Campaign[];
    isLoading: boolean; // 🔑 အသစ်ထည့်သွင်း
    error: string | null; // 🔑 အသစ်ထည့်သွင်း
    
    // 🔑 fetchCampaigns function ကို ထည့်သွင်းပါ
    fetchCampaigns: () => Promise<void>; 
    // လိုအပ်ပါက အနာဂတ်တွင် Fetching Functions များ ထပ်ထည့်နိုင်သည်
   
}

// 3. Dummy Data ကို ဖန်တီးခြင်း (ပုံထဲက အတိုင်း)
const DUMMY_CAMPAIGNS: Campaign[] = [
    {
        id: 1,
        category: 'Education',
        title: 'Education for All Children',
        description: 'Providing books, supplies, and learning opportunities to children in need.',
        imageUrl: '/images/campaigns/education.jpg',
        goal: 75000,
        raised: 45000,
        donors: 234,
        daysLeft: 25,
    },
    {
        id: 2,
        category: 'Water',
        title: 'Clean Water Initiative',
        description: 'Building wells and water purification systems to bring clean drinking water to communities.',
        imageUrl: '/images/campaigns/water.jpg',
        goal: 50000,
        raised: 28500,
        donors: 156,
        daysLeft: 18,
    },
    {
        id: 3,
        category: 'Healthcare',
        title: 'Healthcare Access Program',
        description: 'Establishing mobile clinics and providing essential medical care to underserved populations.',
        imageUrl: '/images/campaigns/healthcare.jpg',
        goal: 100000,
        raised: 62000,
        donors: 389,
        daysLeft: 42,
    },
    {
        id: 4,
        category: 'Education',
        title: 'Laptop Drive for Underprivileged Students',
        description: 'Collecting funds to purchase 50 laptops for students in remote villages for their online learning.',
        imageUrl: '/images/campaigns/laptops.jpg',
        goal: 30000,
        raised: 15000,
        donors: 85,
        daysLeft: 10,
    },
    {
        id: 5,
        category: 'Education',
        title: 'Build a Library for Community School',
        description: 'Funding needed to construct a small public library and stock it with books for 500 local students.',
        imageUrl: '/images/campaigns/library.jpg',
        goal: 45000,
        raised: 5000,
        donors: 12,
        daysLeft: 60,
    },
    {
        id: 6,
        category: 'Refugee Support',
        title: 'Immediate Aid for Displaced Families',
        imageUrl: '/images/campaigns/aid.jpg',
        goal: 90000,
        raised: 12000,
        donors: 50,
        daysLeft: 15,
        description: 'Providing emergency shelter and blankets for families recently displaced.'
    },
    {
        id: 7,
        category: 'Animals',
        title: 'Save the Wild Dogs Sanctuary',
        imageUrl: '/images/campaigns/animals.jpg',
        goal: 40000,
        raised: 35000,
        donors: 110,
        daysLeft: 30,
        description: 'Support for animal rescue, wildlife protection, and sanctuaries.'
    },
    {
        id: 8,
        category: 'Environment',
        title: 'Reforestation Project 2025',
        imageUrl: '/images/campaigns/trees.jpg',
        goal: 120000,
        raised: 10000,
        donors: 40,
        daysLeft: 90,
        description: 'Projects focused on conservation, climate, and sustainability.'
    },
    {
        id: 9,
        category: 'Women Empowerment',
        title: 'Digital Skills Training for Women',
        imageUrl: '/images/campaigns/women.jpg',
        goal: 60000,
        raised: 5000,
        donors: 10,
        daysLeft: 45,
        description: 'Supporting training programs to equip disadvantaged women with marketable digital skills for better employment.'
    },
    {
        id: 10,
        category: 'Elderly Care',
        title: 'Warm Meals for Homebound Seniors',
        imageUrl: '/images/campaigns/seniors.jpg',
        goal: 55000,
        raised: 15000,
        donors: 35,
        daysLeft: 50,
        description: 'Providing weekly delivery of hot, nutritious meals to elderly citizens who are unable to leave their homes.'
    },
    {
        id: 11,
        category: 'Conflict Displaced', 
        title: 'Emergency Shelter and Supplies for IDPs',
        imageUrl: '/images/campaigns/conflict.jpg',
        goal: 150000,
        raised: 80000,
        donors: 250,
        daysLeft: 20,
        description: 'Provide immediate shelter, food, and water for families fleeing conflict zones.'
    },
    {
        id: 12,
        category: 'Infrastructure', 
        title: 'Rebuilding Key Access Bridge',
        imageUrl: '/images/campaigns/bridge.jpg',
        goal: 250000,
        raised: 50000,
        donors: 100,
        daysLeft: 90,
        description: 'Fund the construction of a small bridge essential for local farming communities to transport goods.'
    },
    {
        id: 13,
        category: 'Agriculture', 
        title: 'Seed and Fertilizer Drive for Farmers',
        imageUrl: '/images/campaigns/farm.jpg',
        goal: 40000,
        raised: 15000,
        donors: 45,
        daysLeft: 30,
        description: 'Supply high-quality seeds and essential fertilizer to small-scale farmers affected by drought.'
    },
    {
        id: 14,
        category: 'Arts & Culture', 
        title: 'Support Traditional Music School',
        imageUrl: '/images/campaigns/music.jpg',
        goal: 30000,
        raised: 10000,
        donors: 55,
        daysLeft: 40,
        description: 'Help preserve cultural heritage by funding a local music and dance academy.'
    },
    {
        id: 15,
        category: 'Water', 
        title: 'New Borehole for Village Access',
        imageUrl: '/images/campaigns/borehole.jpg',
        goal: 85000,
        raised: 5000,
        donors: 20,
        daysLeft: 70,
        description: 'Drill a new borehole to provide reliable, clean drinking water to over 500 residents.'
    },
    {
        id: 16,
        category: 'Healthcare', 
        title: 'Vaccination Drive for Rural Areas',
        imageUrl: '/images/campaigns/vaccine.jpg',
        goal: 120000,
        raised: 95000,
        donors: 400,
        daysLeft: 15,
        description: 'Provide essential vaccines and medical checkups to remote villages with limited clinic access.'
    },
    {
        id: 17,
        category: 'Community', 
        title: 'Youth Skills and Training Center',
        imageUrl: '/images/campaigns/youth.jpg',
        goal: 70000,
        raised: 20000,
        donors: 75,
        daysLeft: 60,
        description: 'Establish a community center offering free vocational training and after-school programs for young adults.'
    },
    {
        id: 18,
        category: 'Women Empowerment', 
        title: 'Micro-Loan Fund for Female Entrepreneurs',
        imageUrl: '/images/campaigns/microloan.jpg',
        goal: 50000,
        raised: 35000,
        donors: 120,
        daysLeft: 25,
        description: 'Provide small business loans and mentorship to help women start and grow their own enterprises.'
    },
    {
        id: 19,
        category: 'Elderly Care', 
        title: 'Companionship and Home Care Visits',
        imageUrl: '/images/campaigns/care.jpg',
        goal: 35000,
        raised: 5000,
        donors: 15,
        daysLeft: 45,
        description: 'Fund volunteers to conduct regular home visits, assisting elderly people with chores and providing companionship.'
    },
    {
        id: 20,
        category: 'Human Rights', 
        title: 'Legal Aid for Disadvantaged Families',
        imageUrl: '/images/campaigns/legal.jpg',
        goal: 95000,
        raised: 40000,
        donors: 110,
        daysLeft: 30,
        description: 'Provide pro bono legal representation and counseling to families facing eviction or civil injustice.'
    },
    {
        id: 21,
        category: 'Environment', 
        title: 'Coastal Cleanup and Protection Project',
        imageUrl: '/images/campaigns/cleanup.jpg',
        goal: 60000,
        raised: 25000,
        donors: 90,
        daysLeft: 55,
        description: 'Organize regular beach cleanups and fund equipment to protect delicate coastal ecosystems.'
    },
    {
        id: 22,
        category: 'Technology', 
        title: 'Code Camp for Rural Students',
        imageUrl: '/images/campaigns/coding.jpg',
        goal: 45000,
        raised: 15000,
        donors: 50,
        daysLeft: 40,
        description: 'Establish temporary coding bootcamps to introduce programming skills to high school students in remote areas.'
    },
];

// 4. Zustand Store ကို ဖန်တီးခြင်း
export const useCampaignStore = create<CampaignStore>((set) => ({
     campaigns: DUMMY_CAMPAIGNS, // 💡 ဒီနေရာမှာ campaigns ကို DUMMY_CAMPAIGNS အနေနဲ့ အရင် သတ်မှတ်နိုင်သည်
                                  // (သို့မဟုတ်) အပေါ်က Final Code အတိုင်း [] ထားပြီး fetch လုပ်နိုင်သည်
    isLoading: false,           // 🔑 ထည့်သွင်းရမည့် property
    error: null,                // 🔑 ထည့်သွင်းရမည့် property

    // fetchCampaigns function ကို အကောင်အထည်ဖော်ခြင်း (Action)
    fetchCampaigns: async () => {
        set({ isLoading: true, error: null }); 

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            
            set({ campaigns: DUMMY_CAMPAIGNS, isLoading: false });
        } catch (err) {
            console.error("Failed to fetch campaigns:", err);
            set({ 
                error: 'Failed to load campaigns data. Please try again.', 
                isLoading: false 
            });
        }
}}));