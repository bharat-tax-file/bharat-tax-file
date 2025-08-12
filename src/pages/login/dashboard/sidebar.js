import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiDollarSign,
  FiSettings,
} from 'react-icons/fi';

const navLinks = [
  { id: 'dashboard', name: 'Dashboard', icon: FiHome, path: '/login/dashboard' },
  { id: 'invoices', name: 'Invoices', icon: FiFileText, path: '/login/dashboard/invoices' },
  { id: 'clients', name: 'Clients', icon: FiUsers, path: '/login/dashboard/clients' },
  { id: 'payments', name: 'Payments', icon: FiDollarSign, path: '/login/dashboard/payments' },
  { id: 'service', name: 'Service', icon: FiFileText, path: '/login/dashboard/service' },
  { id: 'party', name: 'Party', icon: FiUsers, path: '/login/dashboard/party' },
  { id: 'report', name: 'Report', icon: FiFileText, path: '/login/dashboard/report' },
];

const Sidebar = ({ isCollapsed, isMobile, toggleSidebar, closeSidebar }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <aside className="h-full flex flex-col">
      {/* Nav Links - Removed all top padding/spacing */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <li key={link.id} className="relative group">
                <Link href={link.path} legacyBehavior>
                  <a
                    onClick={isMobile ? closeSidebar : undefined}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
                  >
                    <link.icon
                      size={20}
                      className={`flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}
                    />
                    {(!isCollapsed || isMobile) && <span className="ml-3">{link.name}</span>}
                    {isCollapsed && !isMobile && (
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">
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

      {/* Settings Link - Only bottom padding kept */}
      <div className="px-2 pb-4 border-t border-gray-200">
        <Link href="/login/dashboard/settings" legacyBehavior>
          <a
            onClick={isMobile ? closeSidebar : undefined}
            className={`flex items-center p-3 rounded-lg transition-all ${
              currentPath === '/login/dashboard/settings'
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
          >
            <FiSettings
              size={20}
              className={`flex-shrink-0 ${
                currentPath === '/login/dashboard/settings' ? 'text-indigo-600' : 'text-gray-500'
              }`}
            />
            {(!isCollapsed || isMobile) && <span className="ml-3">Settings</span>}
            {isCollapsed && !isMobile && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">
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