
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiChevronsLeft,
  FiChevronsRight
} from 'react-icons/fi';

// A simple Logo component to be used in the sidebar
const Logo = ({ isCollapsed }) => (
  <div className="flex items-center gap-3">
    <svg className="h-8 w-8 flex-shrink-0 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
    </svg>
    <span 
      className={`text-xl font-bold text-slate-800 tracking-wider transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}
    >
      Invoicy
    </span>
  </div>
);

// Define navigation links as an array of objects for easy management
const navLinks = [
  { id: 'dashboard', name: 'Dashboard', icon: FiHome, path: '/login/dashboard' },
  { id: 'invoices', name: 'Invoices', icon: FiFileText, path: '/login/dashboard/invoices' },
  { id: 'clients', name: 'Clients', icon: FiUsers, path: '/login/dashboard/clients' },
  { id: 'payments', name: 'Payments', icon: FiDollarSign, path: '/login/dashboard/payments' },
];


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <aside
      className={`bg-white h-screen flex flex-col border-r border-slate-200 transition-all duration-300 ease-in-out hidden lg:flex ${isCollapsed ? 'w-20' : 'w-64'}`}
      aria-label="Sidebar navigation"
    >
      {/* Top section: Logo and Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className={`overflow-hidden ${!isCollapsed && 'w-full'}`}> 
          <Logo isCollapsed={isCollapsed} />
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <FiChevronsRight size={20} /> : <FiChevronsLeft size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4" aria-label="Main">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <li key={link.id} className="relative">
                <Link href={link.path} legacyBehavior>
                  <a
                    className={`flex items-center p-3 rounded-lg transition-colors group focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <link.icon size={22} className="flex-shrink-0" />
                    <span className={`ml-4 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>
                      {link.name}
                    </span>
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <span className="absolute left-full ml-4 w-auto p-2 min-w-max rounded-md shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left">
                        {link.name}
                      </span>
                    )}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section: Settings */}
      <div className="px-3 py-4 border-t border-slate-200">
        <Link href="/login/dashboard/settings" legacyBehavior>
          <a
            className={`flex items-center p-3 rounded-lg transition-colors group focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              currentPath === '/login/dashboard/settings'
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
            aria-current={currentPath === '/login/dashboard/settings' ? 'page' : undefined}
          >
            <FiSettings size={22} />
            <span className={`ml-4 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'}`}>
              Settings
            </span>
            {isCollapsed && (
              <span className="absolute left-full ml-4 w-auto p-2 min-w-max rounded-md shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left">
                Settings
              </span>
            )}
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;  