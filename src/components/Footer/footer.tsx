import React from 'react';
import Link from 'next/link';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        // 📌 Footer ကို အနက်ရောင်နီးပါး (သို့မဟုတ်) နောက်ခံအရောင်နဲ့ ကွဲပြားအောင် သတ်မှတ်ခြင်း
        <footer className="bg-gray-800 text-white mt-16 pt-12">
            <div className="container mx-auto px-4">
                
                {/* 1. Main Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">

                    {/* 1.1. Logo & Mission Statement (Grid 2 နေရာ ယူပါ) */}
                    <div className="col-span-2 pr-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart size={30} className="text-pink-500" />
                            <span className="text-2xl font-bold tracking-wider text-teal-300">CareNet</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Connecting compassion with action. We ensure every donation creates a measurable, positive change in the world.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition"><Facebook size={20} /></Link>
                            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition"><Twitter size={20} /></Link>
                            <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition"><Instagram size={20} /></Link>
                        </div>
                    </div>

                    {/* 1.2. Quick Links (General Nav) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition text-sm">Home</Link></li>
                            <li><Link href="/campaigns" className="text-gray-400 hover:text-white transition text-sm">All Campaigns</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition text-sm">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* 1.3. Legal & Resources */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
                        <ul className="space-y-3">
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition text-sm">FAQs</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</Link></li>
                            <li><Link href="/careers" className="text-gray-400 hover:text-white transition text-sm">Careers</Link></li>
                        </ul>
                    </div>

                    {/* 1.4. Contact Info (Mobile အတွက် Grid နေရာယူပါ) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-400 text-sm flex items-center gap-2">
                                <Mail size={16} className="text-pink-500" />
                                support@carenet.org
                            </li>
                            <li className="text-gray-400 text-sm flex items-center gap-2">
                                <Facebook size={16} className="text-pink-500" />
                                www.facebook.com/carenet
                            </li>
                            <li className="text-gray-400 text-sm flex items-center gap-2">
                                <Instagram size={16} className="text-pink-500" />
                                @carenet_official
                            </li>

                            <li className="text-gray-400 text-sm flex items-center gap-2">
                                <Phone size={16} className="text-pink-500" />
                                +95 9 123 456 789
                            </li>
                            <li className="text-gray-400 text-sm">
                                Yangon, Myanmar
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. Copyright & Bottom Bar */}
                <div className="pt-6 pb-6 text-center text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} CareNet. All rights reserved. Built with ❤️ for Humanity.
                </div>
            </div>
        </footer>
    );
};

export default Footer;