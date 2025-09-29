'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, Heart, User, Home, Users, BarChart3 } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"visitor" | "user">("visitor");

  const visitorLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#campaigns", label: "Campaigns", icon: Heart },
    { href: "#about", label: "About", icon: Users },
  ];

  const userLinks = [
    { href: "#dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "#my-donations", label: "My Donations", icon: Heart },
    { href: "#profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DonateHope
            </span>
          </div>

          {/* Section Toggle */}
          <div className="hidden md:flex items-center space-x-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveSection("visitor")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeSection === "visitor"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Visitor
            </button>
            <button
              onClick={() => setActiveSection("user")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeSection === "user"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              User
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {(activeSection === "visitor" ? visitorLinks : userLinks).map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {activeSection === "visitor" ? (
              <>
                <Button variant="ghost">Sign In</Button>
                <Button variant="hero">Donate Now</Button>
              </>
            ) : (
              <>
                <Button variant="outline">Settings</Button>
                <Button variant="donate">New Donation</Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setActiveSection("visitor")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === "visitor"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Visitor
                </button>
                <button
                  onClick={() => setActiveSection("user")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === "user"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  User
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {(activeSection === "visitor" ? visitorLinks : userLinks).map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-2"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
              
              <div className="pt-4 space-y-2 px-4">
                {activeSection === "visitor" ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                    <Button variant="hero" className="w-full">
                      Donate Now
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      Settings
                    </Button>
                    <Button variant="donate" className="w-full">
                      New Donation
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;