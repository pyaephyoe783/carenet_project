'use client'; 
import { useAuthStore } from "@/store/useAuthStore";
import CampaignsSection from "@/components/Campaign/CampaignsSection";
import DashboardPage from "@/components/dashboard/DashboardPage";
import HeroSection from "@/components/HeroSection/HeroSection";
import Image from "next/image";
import AboutPage from "@/components/AboutUs/AboutPage";
import AboutUsPage from "@/components/AboutUs/AboutPage";
// import CategorySelector from "@/components/Campaign/CategorySelector";

export default function Home() {
    const { isAuthenticated } = useAuthStore(); 
    
    return (
        <div>

            {isAuthenticated ? (
                <DashboardPage />
            ) : (
                <HeroSection />
            )}
            {/* <CategorySelector /> */}
            <AboutUsPage />
        </div>
    );
}
