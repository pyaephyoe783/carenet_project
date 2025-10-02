import React from 'react';
import { Target, Lightbulb, Handshake, Users, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import ComitmentSection from './ComitmentSection';
import HistorySection from './HistorySection';
import PartnerSection from './PatrnerShip';
import ImpactStats from './ImpactState';
import FaqSection from './FaqSection';
import AboutHeader from './AboutHeader';

// 🔑 Utility Components (ဒီဖိုင်ထဲမှာပဲ အလွယ်တကူ ထည့်ထားလိုက်ပါမယ်)
const MissionCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-start h-full hover:shadow-xl transition-shadow duration-300">
        <Icon size={36} className="text-blue-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);



// 🔑 Sample Data
const missions = [
    { icon: Target, title: "Mission", description: "To connect donors with verified, high-impact campaigns globally, ensuring maximum reach." },
    { icon: Handshake, title: "Transparency", description: "Utilizing open data and clear financial reports so every donor knows where their money goes." },
    { icon: Lightbulb, title: "Innovation", description: "Leveraging modern technology to streamline the donation process and secure funds." },
];



const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        
        {/* 1. Hero / Header Section */}

           <AboutHeader />
   

        <main className="container mx-auto px-4 py-16">

            {/* 2. Mission & Values Cards Section */}
            <section className="mb-16">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {missions.map((m, index) => (
                        <MissionCard key={index} {...m} />
                    ))}
                </div>
            </section>

            <section>
              <ComitmentSection />
            </section>
            <HistorySection />
            <PartnerSection />
            <ImpactStats />
            <FaqSection />
            {/* 4. Contact/CTA Section (ပိုပြီး Real World ဆန်စေရန်) */}
            <section className="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Get In Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Contact Info */}
                    <div className="space-y-4">
                        <p className="flex items-center gap-3 text-lg text-gray-600">
                            <Mail size={24} className="text-blue-500" />
                            <span>Email: support@carenet.org</span>
                        </p>
                        <p className="flex items-center gap-3 text-lg text-gray-600">
                            <Phone size={24} className="text-blue-500" />
                            <span>Phone: +95 9 123 456 789</span>
                        </p>
                        <p className="text-gray-500 mt-4">
                           Office: No. 123, Main Road, Yangon, Myanmar
                        </p>
                    </div>

                    <div className="space-y-4">
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                        />
                        <textarea 
                            placeholder="Your Message" 
                            rows={4} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                        />
                        {/* 🔑 Button Component သုံးနိုင်ပါတယ် */}
                        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200">
                            Send Message
                        </button>
                    </div>
                    
                   
                </div>
            </section>
            
        </main>
    </div>
  );
};

export default AboutUsPage;