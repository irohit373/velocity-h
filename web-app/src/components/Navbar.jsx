"use client";

import Link from "next/link";
import { useUser } from "@/providers/UserProvider";
import UserDropdown from "./UserDropdown";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/signin';
  };

  return (
    <>
      <nav className="navbar bg-base-100 border-b px-4 lg:px-8 sticky top-0 z-40 shadow-sm backdrop-blur-sm bg-base-100/95">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost gap-2 text-lg font-bold">
            <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
            <span className="hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VELOCITY H
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex-none hidden lg:flex gap-2">
          <Link href="/jobs" className="btn btn-ghost">
            Jobs
          </Link>

          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-square"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
            
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <div className="flex gap-2">
              <Link href="/signup" className="btn btn-ghost">
                Sign Up
              </Link>
              <Link href="/signin" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex-none lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-sm btn-square"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
              <span className="text-lg font-bold text-gray-900">VELOCITY H</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="p-6 bg-white">
            <Link
              href="/jobs"
              className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg font-medium mb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg font-medium mb-2"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            {user ? (
              <>
                <div className="pt-6 pb-2">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Account</p>
                </div>
                
                <div className="p-4 bg-gray-100 rounded-lg mb-3">
                  <div className="font-semibold text-gray-900">{user.name || 'User'}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
                
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg font-medium mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                
                <Link
                  href="/dashboard/recruitment"
                  className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg font-medium mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Recruitment
                </Link>
                
                <Link
                  href="/dashboard/scheduling"
                  className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg font-medium mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Scheduling
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg font-medium mb-2 mt-6"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
                
                <Link
                  href="/signin"
                  className="block px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
