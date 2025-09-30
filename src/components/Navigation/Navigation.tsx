"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { icons } from "lucide-react";
import React, { useState } from "react";
import { Menu, X, Heart, User, Home, Users, BarChart3 } from "lucide-react";
import { Button } from "../ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuthStore();

  const vistorLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#campaigns", label: "Campaigns", icon: Heart },
    { href: "#about", label: "About Us", icon: Users },
  ];

  const userLinks = [
    { href: "#dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "#my-donations", label: "My Donations", icon: Heart },
    { href: "#profile", label: "Profile", icon: User },
  ];

  const linksToShow = isAuthenticated ? userLinks : vistorLinks;

  const handleLinkClick = () => {
    // Link ကို နှိပ်ပြီးတာနဲ့ Mobile Menu ကို ပြန်ပိတ်ဖို့
    // Next.js မှာ router.push သုံးရင်တော့ ဒီလို မလိုပါဘူး
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="container mx-auto p-4">
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
            <span
              className="
                    bg-gradient-to-r 
                    from-blue-600 
                    to-teal-500 
                    bg-clip-text 
                    text-transparent
                "
            >
              CareNet
            </span>
          </p>
        </div>

        <div className="hidden md:flex gap-6">
          {linksToShow.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-blue-500 flex items-center gap-2"
            >
              <link.icon size={20} /> {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          {!isAuthenticated ? (
            <>
              <Button
                variant="outline"
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => login("user")}
              >
                Sign In
              </Button>
              <Button variant="gradient">Donate Now</Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="hover:bg-gray-200">
                Settings
              </Button>
              {/* <Button
                className="bg-blue-800 text-white font-bold px-4 py-2 rounded-md hover:bg-[hsl(var(--secondary))]"
                onClick={logout}
              >
                Logout
              </Button>  Logout ကို setting ထဲ ထည့် မယ် */}

              <Button variant="gradient">New Donation</Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2 bg-white shadow-lg rounded-lg border border-gray-100">
          {linksToShow.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-150"
              >
                <Icon size={20} /> {link.label}
              </a>
            );
          })}

          <div className="space-y-2 p-4 border-t border-gray-100">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    login("user");
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start hover:bg-gray-100"
                >
                  Sign In
                </Button>
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate Now
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-start hover:bg-gray-100"
                >
                  Settings
                </Button>
                <Button
                  className="w-full bg-[hsl(var(--primary))] text-white font-bold py-2 rounded-md hover:bg-[hsl(var(--secondary))]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Donation
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100 text-red-500"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
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
