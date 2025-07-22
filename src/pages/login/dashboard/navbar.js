import React, { useState, useEffect, useRef } from 'react';
import MobileNavbar from './MobileNavbar';
import {
  FiSearch,
  FiBell,
  FiPlus,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiMenu
} from 'react-icons/fi';

// A simple Logo component (can be replaced with an SVG or <img> tag)
const Logo = () => (
  <div className="flex items-center gap-2">
    <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
    </svg>
    <span className="text-xl font-bold text-slate-800 tracking-wider">Invoicy</span>
  </div>
);

const BetterNavbar = ({ userName, userEmail, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo & Page Title */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Logo />
            <div className="hidden md:block">
              <h1 className="text-lg font-medium text-slate-700">Dashboard</h1>
              <p className="text-xs text-slate-500">Welcome back, {userName}!</p>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              aria-label="Open mobile menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>

          {/* Center Section: Search Bar (hidden on mobile) */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center hidden sm:flex">
            <div className="max-w-md w-full">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative text-slate-400 focus-within:text-slate-600">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5" />
                </div>
                <input
                  id="search"
                  className="block w-full bg-slate-100/70 border border-transparent rounded-full py-2 pl-10 pr-3 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search invoices, clients..."
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>

          {/* Right Section: Actions & User Menu (hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-4">
            <button className="items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-200 shadow-sm">
              <FiPlus className="text-md" />
              New Invoice
            </button>
            <button
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <FiBell className="h-6 w-6" />
            </button>

            {/* User Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-200 transition-colors"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={`https://api.dicebear.com/8.x/initials/svg?seed=${userName}`}
                  alt="User avatar"
                />
                <FiChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-2 transition-all duration-300 ease-in-out transform opacity-100 scale-100">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-800">{userName}</p>
                    <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                  </div>
                  <a href="#profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    <FiUser className="h-5 w-5 text-slate-500" />
                    <span>My Profile</span>
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    <FiSettings className="h-5 w-5 text-slate-500" />
                    <span>Settings</span>
                  </a>
                  <div className="border-t border-slate-200 my-1"></div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer/Menu */}
      {isMobileMenuOpen && (
        <MobileNavbar
          userName={userName}
          userEmail={userEmail}
          onLogout={onLogout}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
  
};

export default BetterNavbar;