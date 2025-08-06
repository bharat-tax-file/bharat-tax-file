import React, { useState, useEffect } from 'react';
import Sidebar from '../pages/login/dashboard/sidebar';
import Navbar from '../pages/login/dashboard/navbar';
import MobileNavbar from '../pages/login/dashboard/MobileNavbar'; // your mobile drawer

const DashboardLayout = ({ children, userName, userEmail, onLogout }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarCollapsed(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsSidebarCollapsed(prev => !prev);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={`fixed top-0 left-0 h-screen bg-white border-r z-40 transition-all duration-300
            ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
            isMobile={false}
          />
        </div>
      )}
      


      {/* Mobile Drawer Navbar */}
      {isMobile && (
        <div className="fixed top-0 w-full z-50">
          <MobileNavbar
            userName={userName}
            userEmail={userEmail}
            onLogout={onLogout}
          />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col w-full transition-all duration-300 
          ${!isMobile ? (isSidebarCollapsed ? 'ml-20' : 'ml-64') : ''}`}
      >
        {/* Desktop Topbar */}
        {!isMobile && (
          <div className="fixed top-0 w-full h-16 bg-white border-b z-20 shadow-sm">
            <Navbar
              userName={userName}
              onLogout={onLogout}
              toggleSidebar={toggleSidebar}
              isMobile={false}
            />
          </div>
        )}

        {/* Page content */}
        <div className={`flex-1 overflow-y-auto pt-16 p-4`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
