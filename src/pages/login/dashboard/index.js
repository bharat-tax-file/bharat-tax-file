import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import admin from '@/utils/firebase-admin';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { FiFileText, FiLogIn, FiTrendingUp, FiPlusCircle } from 'react-icons/fi';

import Sidebar from './sidebar';
import Navbar from './navbar';

// --- SERVER-SIDE AUTH ---
export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const sessionCookie = cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    return {
      props: {
        userName: decodedClaims.name || 'Nishant',
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

// --- DUMMY DATA ---
const pieData = [
  { name: 'GST Filings', value: 45 },
  { name: 'ITR Filed', value: 25 },
  { name: 'TDS Paid', value: 15 },
  { name: 'Other', value: 10 },
];
const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#6366F1'];
const recentActivity = [
  { id: 1, type: 'ITR', description: 'GSTR-3B for June 2025 filed successfully.', time: '2h ago' },
  { id: 2, type: 'TDS', description: 'TDS payment for Q1 has been processed.', time: '1d ago' },
  { id: 3, type: 'GST', description: 'New GST registration for "Creative Inc." is complete.', time: '3d ago' }
];

// --- COMPONENTS ---
const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 transition-transform hover:scale-105"
    whileHover={{ y: -5 }}
  >
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </motion.div>
);

const QuickAction = ({ icon, title, onClick }) => (
  <motion.button
    className="flex flex-col items-center justify-center p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {icon}
    <span className="mt-2 text-sm font-semibold text-slate-700">{title}</span>
  </motion.button>
);

const ActivityItem = ({ type, description, time }) => {
  const typeStyles = {
    GST: "bg-emerald-100 text-emerald-700",
    ITR: "bg-blue-100 text-blue-700",
    TDS: "bg-yellow-100 text-yellow-700",
  };
  return (
    <div className="flex items-center space-x-4 py-3 border-b border-slate-100 last:border-b-0">
      <div className={`text-xs font-bold px-2 py-1 rounded-full ${typeStyles[type]}`}>
        {type}
      </div>
      <p className="text-sm text-slate-600 flex-1">{description}</p>
      <p className="text-xs text-slate-400">{time}</p>
    </div>
  );
};

// --- MAIN PAGE ---
export default function Dashboard({ userName }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      {!isMobile && (
        <div className="w-64 fixed h-full z-30 bg-white shadow-md">
          <Sidebar />
        </div>
      )}

      {/* Main Content with margin for sidebar */}
      <div className={`flex-1 flex flex-col ${!isMobile ? 'ml-64' : ''}`}>
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-20 bg-white shadow">
          <Navbar userName={userName} onLogout={handleLogout} />
        </div>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2 text-slate-800">
              Welcome back, {userName}! 👋
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-500 mb-8">
  Here&rsquo;s your financial overview for the month.
</motion.p>


            {/* Main Dashboard Grid */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6" variants={containerVariants}>

              {/* Stats */}
              <motion.div variants={itemVariants} className="lg:col-span-3 xl:col-span-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard icon={<FiTrendingUp size={22} className="text-emerald-800" />} title="Total GST Filings" value="45" color="bg-emerald-200" />
                  <StatCard icon={<FiFileText size={22} className="text-blue-800" />} title="ITR Submitted" value="25" color="bg-blue-200" />
                  <StatCard icon={<FiLogIn size={22} className="text-yellow-800" />} title="TDS Paid" value="15" color="bg-yellow-200" />
                </div>
              </motion.div>

              {/* Pie Chart */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2 xl:col-span-2">
                <h2 className="text-lg font-semibold mb-4 text-slate-800">Filing Overview</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(5px)",
                        borderRadius: "10px",
                        borderColor: "#E2E8F0"
                      }}
                    />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-md lg:col-span-1 xl:col-span-2">
                <h2 className="text-lg font-semibold mb-4 text-slate-800">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4 h-[250px]">
                  <QuickAction icon={<FiPlusCircle size={28} className="text-indigo-500" />} title="File New Return" />
                  <QuickAction icon={<FiFileText size={28} className="text-indigo-500" />} title="View Statements" />
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-md lg:col-span-3 xl:col-span-4">
                <h2 className="text-lg font-semibold mb-2 text-slate-800">Recent Activity</h2>
                <div className="flow-root">
                  {recentActivity.map(activity => (
                    <ActivityItem key={activity.id} {...activity} />
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
