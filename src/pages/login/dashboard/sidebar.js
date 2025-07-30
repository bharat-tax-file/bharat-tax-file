import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from 'react-icons/fi';

const Logo = ({ isCollapsed }) => (
  <div className="flex items-center justify-center gap-3 h-16">
    <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
    </svg>
    {!isCollapsed && (
      <span className="text-xl font-bold text-slate-800 tracking-wider">Invoicy</span>
    )}
  </div>
);



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
      {/* Header with close button (mobile only) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Logo isCollapsed={isCollapsed} />
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          )}
          {isMobile && (
            <button
              onClick={closeSidebar}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
              aria-label="Close sidebar"
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4">
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

      {/* Settings Link */}
      <div className="px-2 py-4 border-t border-gray-200">
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