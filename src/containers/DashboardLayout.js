import React from 'react';
import Sidebar from '../pages/login/dashboard/sidebar';
import Navbar from '../pages/login/dashboard/navbar';

const DashboardLayout = ({ children, userName, onLogout }) => {
  // Responsive sidebar logic: only render sidebar on desktop
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Tailwind 'lg' breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      {/* Sidebar only on desktop */}
      {!isMobile && <Sidebar />}
      <div className="flex-1">
        <Navbar userName={userName} onLogout={onLogout} />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
