import CampaignsSection from "@/components/Campaign/CampaignsSection";
import DashboardPage from "@/components/dashboard/DashboardPage";
import HeroSection from "@/components/HeroSection/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
   <div>
      <HeroSection />
      <CampaignsSection />
      <DashboardPage />
   </div>
  );
}
