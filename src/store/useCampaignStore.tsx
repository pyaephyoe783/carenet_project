
import { create } from 'zustand';

// 1. Data Structure ကို သတ်မှတ်ခြင်း (Campaign Model)
export interface Campaign {
    id: number;
    category: 'Education' | 'Water' | 'Healthcare' | 'Food'; // Categories များကို သတ်မှတ်
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
        description: 'Providing books, supplies, and learning opportunities to...',
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
        description: 'Building wells and water purification systems to bring clean...',
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
        description: 'Establishing mobile clinics and providing essential medical care t...',
        imageUrl: '/images/campaigns/healthcare.jpg',
        goal: 100000,
        raised: 62000,
        donors: 389,
        daysLeft: 42,
    },
    // လိုအပ်ပါက တခြား Campaign များ ထပ်ထည့်နိုင်သည်
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