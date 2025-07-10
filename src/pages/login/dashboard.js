import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import admin from '@/utils/firebase-admin';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  FiHome, FiPieChart, FiUsers, FiSettings, FiCalendar, FiMail,
  FiBell, FiSearch, FiChevronDown, FiSun, FiMoon, FiMenu, FiX,
  FiDollarSign, FiShoppingCart, FiUser, FiBarChart2, FiDownload,
  FiUpload, FiPlus, FiRefreshCw, FiFilter, FiTrendingUp, FiTrendingDown
} from 'react-icons/fi';

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies.token);

    return {
      props: {
        user: token,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

const Dashboard = ({ user }) => {
  const router = useRouter();

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('week');
  const [dataRange, setDataRange] = useState('2023');

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening');

    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
      setMobileMenuOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => setLoading(false), 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const darkPref =
      typeof window !== 'undefined' &&
      (localStorage.getItem('darkMode') === 'true' ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches));
    setDarkMode(darkPref);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Sidebar (You can add sidebar menu here) */}

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Good {timeOfDay}, {user.email}</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">Earnings</p>
            <h2 className="text-xl font-semibold mt-2">₹1,23,000</h2>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">Invoices</p>
            <h2 className="text-xl font-semibold mt-2">58</h2>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">Users</p>
            <h2 className="text-xl font-semibold mt-2">1,024</h2>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">Profit</p>
            <h2 className="text-xl font-semibold mt-2">₹45,000</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { name: 'Jan', uv: 400 },
              { name: 'Feb', uv: 300 },
              { name: 'Mar', uv: 500 },
              { name: 'Apr', uv: 200 },
              { name: 'May', uv: 600 },
              { name: 'Jun', uv: 700 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#4f46e5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
