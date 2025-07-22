import React from 'react';
import {
  FiFileText,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiLogOut,
  FiX,
  FiMenu,
  FiSun,
  FiMoon,
  FiPlus,
  FiBell,
  FiChevronRight
} from 'react-icons/fi';

// --- Reusable Sub-components for a Cleaner Structure ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg className="h-7 w-7 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
    </svg>
    <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-wider">Invoicy</span>
  </div>
);

const DrawerLink = ({ icon: Icon, text, href = "#", onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="flex items-center gap-4 text-lg text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 p-3 rounded-lg transition-colors duration-200"
  >
    <Icon className="h-6 w-6" />
    <span>{text}</span>
  </a>
);

// --- Main Component ---

const CoolMobileNavbar = ({ userName, userEmail, onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // ...existing code...

  // Prevent background scroll when drawer is open
  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* TOP BAR */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <Logo />
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200"
              aria-label="Open menu"
              onClick={() => setIsDrawerOpen(true)}
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER & OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsDrawerOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-slate-50 dark:bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Aurora Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/30 dark:bg-indigo-500/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col h-full p-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
              <Logo />
              <button
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label="Close menu"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 mt-8 space-y-2">
              <DrawerLink icon={FiFileText} text="Invoices" />
              <DrawerLink icon={FiUsers} text="Clients" />
              <DrawerLink icon={FiDollarSign} text="Payments" />
            </nav>

            {/* User Profile & Actions */}
            <div className="mt-auto">
                <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={`https://api.dicebear.com/8.x/initials/svg?seed=${userName}`}
                                alt="User avatar"
                            />
                            <div>
                                <p className="font-semibold text-slate-800 dark:text-slate-100">{userName}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
                            </div>
                        </div>
                        <a href="#profile" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400">
                            <FiChevronRight size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-4 space-y-1">
                    <DrawerLink icon={FiSettings} text="Settings" />
                    <a
                        href="#"
                        onClick={onLogout}
                        className="flex items-center gap-4 text-lg text-red-500 hover:text-red-600 dark:hover:text-red-400 p-3 rounded-lg transition-colors duration-200"
                    >
                        <FiLogOut className="h-6 w-6" />
                        <span>Logout</span>
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// You would use this component in your main App file
// function App() {
//   return (
//     <div>
//       <CoolMobileNavbar 
//         userName="Alex"
//         userEmail="alex.doe@example.com"
//         onLogout={() => alert('Logged out!')}
//       />
//       <main className="p-4">
//         {/* Your page content here */}
//       </main>
//     </div>
//   )
// }

export default CoolMobileNavbar;
