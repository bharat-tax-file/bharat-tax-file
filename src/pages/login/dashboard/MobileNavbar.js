import React from 'react';
import {
  FiSearch,
  FiBell,
  FiPlus,
  FiUser,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

const MobileNavbar = ({ userName, userEmail, onLogout, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end">
    <div className="bg-white w-72 h-full shadow-xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
          </svg>
          <span className="text-xl font-bold text-slate-800 tracking-wider">Invoicy</span>
        </div>
        <button
          className="p-2 rounded-full text-slate-500 hover:bg-slate-200"
          aria-label="Close mobile menu"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          &times;
        </button>
      </div>
      <div className="mb-4">
        <input
          id="mobile-search"
          className="block w-full bg-slate-100/70 border border-transparent rounded-full py-2 pl-4 pr-3 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search invoices, clients..."
          type="search"
          name="search"
        />
      </div>
      <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-200 shadow-sm mb-4">
        <FiPlus className="text-md" />
        New Invoice
      </button>
      <button
        className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors mb-4"
        aria-label="Notifications"
      >
        <FiBell className="h-6 w-6" />
      </button>
      <div className="border-t border-slate-200 my-2"></div>
      <div className="flex items-center gap-2 mt-4">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${userName}`}
          alt="User avatar"
        />
        <div>
          <p className="text-sm font-semibold text-slate-800">{userName}</p>
          <p className="text-xs text-slate-500 truncate">{userEmail}</p>
        </div>
      </div>
      <a href="#profile" className="flex items-center gap-3 px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 mt-2">
        <FiUser className="h-5 w-5 text-slate-500" />
        <span>My Profile</span>
      </a>
      <a href="#settings" className="flex items-center gap-3 px-2 py-2 text-sm text-slate-700 hover:bg-slate-100">
        <FiSettings className="h-5 w-5 text-slate-500" />
        <span>Settings</span>
      </a>
      <button
        onClick={onLogout}
        className="w-full text-left flex items-center gap-3 px-2 py-2 text-sm text-red-600 hover:bg-red-50 mt-2"
      >
        <FiLogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  </div>
);

export default MobileNavbar;
