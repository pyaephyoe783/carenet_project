"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authStore, userRole } from "@/store/auth-result.store";
import { Heart, User, Home, Users, BarChart3, Menu, X, LogOut, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Zustand state
  const { auth, clearAuth } = authStore();

  const isAuthenticated = !!auth;

  // Desktop & mobile links
  const visitorLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/campaigns", label: "Campaigns", icon: Heart },
    { href: "/about", label: "About Us", icon: Users },
  ];

  const userLinks = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/donations", label: "My Donations", icon: Heart },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/about", label: "About Us", icon: Users },
  ];

  const linksToShow = isAuthenticated ? userLinks : visitorLinks;

  const handleLogout = () => {
    clearAuth(); // clear Zustand auth state
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className="container mx-auto p-4 border-b border-gray-100 sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Heart
            size={45}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-2 rounded-full stroke-2"
          />
          <p className="text-3xl font-bold">
            <Link href="/">
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent cursor-pointer">
                CareNet
              </span>
            </Link>
          </p>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {linksToShow.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="hover:text-blue-600 flex items-center gap-2 font-medium text-gray-700 transition duration-150"
              >
                <Icon size={20} /> {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <Button variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="gradient">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/campaigns/create">
                <Button variant="gradient" className="flex items-center gap-2">
                  <PlusCircle size={18} /> Start Campaign
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="hover:bg-gray-100 flex items-center gap-2">
                  <User size={18} /> Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="hover:bg-red-50 text-red-600 flex items-center gap-1"
                onClick={handleLogout}
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

      {/* Mobile Menu */}
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
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={handleLinkClick}>
                  <Button variant="gradient" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" onClick={handleLinkClick}>
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-100 flex items-center gap-2">
                    <User size={18} /> Profile & Settings
                  </Button>
                </Link>
                <Link href="/campaigns/create" onClick={handleLinkClick}>
                  <Button variant="gradient" className="w-full justify-center flex items-center gap-2">
                    <PlusCircle size={18} /> Start New Campaign
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-red-50 text-red-600 font-medium flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={18} /> Logout
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
