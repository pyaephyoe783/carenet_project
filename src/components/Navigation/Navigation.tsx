"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { icons, LogOut, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { Menu, X, Heart, User, Home, Users, BarChart3 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { authStore } from "@/store/auth-result.store";


const useMockAuthStore  = () => ({
  isAuthenticated: true, // ပြသရန်အတွက် default ကို true ပေးထားသည်။
  logout: () => { console.log("User logged out (Mock)"); },
});



// 💡 Tailwind CSS/Shadcn Button ကို Mock လုပ်ထားသည်။



const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = authStore(); 

  // 🔑 လမ်းကြောင်းများကို URL Path များဖြင့် ပြင်ဆင်ခြင်း
  const vistorLinks = [
    { href: "/", label: "Home", icon: Home }, // Home Page
    { href: "/campaigns", label: "Campaigns", icon: Heart }, // Campaign Index Page
    { href: "/about", label: "About Us", icon: Users },
  ];

  // 🔑 လမ်းကြောင်းများကို URL Path များဖြင့် ပြင်ဆင်ခြင်း
  const userLinks = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/donations", label: "My Donations", icon: Heart }, // /donations ကို ပြင်ဆင်
    { href: "/profile", label: "Profile", icon: User }, // /profile ကို ပြင်ဆင်
    { href: "/about", label: "About Us", icon: Users }
  ];

  const linksToShow = isAuthenticated ? userLinks : vistorLinks;

  /**
   * Mobile Menu ဖွင့်ထားရင် Link နှိပ်ပြီးတာနဲ့ ပိတ်ပေးဖို့
   */
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="container mx-auto p-4 border-b border-gray-100 sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Heart
            size={45}
            className="
              bg-gradient-to-r 
              from-indigo-500 
              to-pink-500 
              text-white 
              p-2 
              rounded-full
              stroke-2"
          />
          <p className="text-3xl font-bold">
            <Link href="/">
              <span
                className="
                  bg-gradient-to-r 
                  from-blue-600 
                  to-teal-500 
                  bg-clip-text 
                  text-transparent
                  cursor-pointer
                "
              >
                CareNet
              </span>
            </Link>
          </p>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {linksToShow.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick} 
              className="hover:text-blue-600 flex items-center gap-2 font-medium text-gray-700 transition duration-150"
            >
              <link.icon size={20} /> {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth/Action Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              {/* Sign In Button */}
              <Link href="/login">
                <Button
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  Sign In
                </Button>
              </Link>
              {/* Sign Up Button */}
              <Link href="/register">
                <Button variant="gradient">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              {/* Start Campaign Button */}
              <Link href="/campaigns/create">
                <Button variant="gradient" className="flex items-center gap-2">
                  <PlusCircle size={18} /> Start Campaign
                </Button>
              </Link>

              {/* Settings/Profile Link (Optional) */}
              <Link href="/profile">
                  <Button variant="outline" className="hover:bg-gray-100">
                    <User size={18} className="mr-2"/> Profile
                  </Button>
              </Link>

              {/* Logout Button */}
              <Button
                variant="ghost"
                className="hover:bg-red-50 text-red-600 flex items-center gap-1"
                onClick={logout}
              >
                <LogOut size={18} /> Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2 bg-white shadow-xl rounded-lg border border-gray-100 absolute w-[92%] left-1/2 transform -translate-x-1/2 p-2">
          {linksToShow.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-150 rounded-lg font-medium"
              >
                <Icon size={20} /> {link.label}
              </Link>
            );
          })}

          <div className="space-y-2 p-4 border-t border-gray-100">
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={handleLinkClick}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-gray-100"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={handleLinkClick}>
                  <Button
                    variant="gradient"
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {/* Profile Link Mobile */}
                <Link href="/profile" onClick={handleLinkClick}>
                    <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-gray-100"
                    >
                        <User size={18} className="mr-2"/> Profile & Settings
                    </Button>
                </Link>

                {/* Start Campaign Mobile */}
                <Link href="/campaigns/create" onClick={handleLinkClick}>
                    <Button
                        variant="gradient"
                        className="w-full justify-center flex items-center gap-2"
                    >
                        <PlusCircle size={18} /> Start New Campaign
                    </Button>
                </Link>
                
                {/* Logout Mobile */}
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-red-50 text-red-600 font-medium"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={18} className="mr-2"/> Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
