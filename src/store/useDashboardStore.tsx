import { create } from 'zustand';

// ------------------------------------
// 1. Types / Interfaces များ သတ်မှတ်ခြင်း
// ------------------------------------
export interface Donation {
    title: string;
    date: string;
    amount: number;
    status: 'Completed' | 'Pending';
}

export interface DashboardData {
    totalDonated: number; // $1425
    campaignsSupported: number; // 12
    impactScore: number; // 95
    livesImpacted: number; // 47
    recentDonations: Donation[];
    monthlyGoal: number; // $300
    raisedThisMonth: number; // $225
}

// Global Store State
export interface DashboardStore extends DashboardData {
    isLoading: boolean;
    error: string | null;
    fetchDashboardData: (userId: string) => Promise<void>; // User ID ကို လက်ခံမည့် Function
}

// ------------------------------------
// 2. Dummy Data (ပုံထဲကအတိုင်း)
// ------------------------------------
const DUMMY_DATA: DashboardData = {
    totalDonated: 1425,
    campaignsSupported: 12,
    impactScore: 95,
    livesImpacted: 47,
    monthlyGoal: 300,
    raisedThisMonth: 225,
    recentDonations: [
        { title: "Education for All", date: "2024-01-15", amount: 50, status: 'Completed' },
        { title: "Clean Water Initiative", date: "2024-01-10", amount: 100, status: 'Completed' },
        { title: "Healthcare Access", date: "2024-01-05", amount: 75, status: 'Completed' },
    ],
};

// ------------------------------------
// 3. Zustand Store ကို ဖန်တီးခြင်း
// ------------------------------------
export const useDashboardStore = create<DashboardStore>((set) => ({
    // Initial State များ
    totalDonated: 0,
    campaignsSupported: 0,
    impactScore: 0,
    livesImpacted: 0,
    recentDonations: [],
    monthlyGoal: 0,
    raisedThisMonth: 0,

    isLoading: false,
    error: null,

    // 🔑 Dashboard Data Fetching Logic
    fetchDashboardData: async (userId) => {
        set({ isLoading: true, error: null });

        try {
            // 💡 Real API Call ကို ဒီနေရာမှာ လုပ်ဆောင်ရပါမယ်။ (e.g., /api/user/${userId}/dashboard)
            
            // Dummy Data ကို 1.5 စက္ကန့် စောင့်ပြီး ထည့်သွင်းပါမည်။
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            // Data ရောက်လာပါက State ထဲသို့ ထည့်သွင်းခြင်း
            set({ 
                ...DUMMY_DATA, // Dummy Data အားလုံးကို ထည့်လိုက်သည်
                isLoading: false 
            });

        } catch (err) {
            console.error(`Failed to fetch dashboard data for user ${userId}:`, err);
            set({ 
                error: 'Failed to load user dashboard data. Please check your network.', 
                isLoading: false 
            });
        }
    }
}));