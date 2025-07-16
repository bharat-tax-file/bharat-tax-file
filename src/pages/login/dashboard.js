import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import admin from '@/utils/firebase-admin';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  FiBriefcase, FiFileText, FiUsers, FiSettings, FiBarChart2, FiChevronDown, FiPlus,
  FiLayout, FiUser, FiTrendingUp, FiTrendingDown, FiDollarSign, FiX, FiLogOut
} from 'react-icons/fi';

// =================================================================================
// SERVER-SIDE AUTHENTICATION (Updated for 4-Hour Session Cookies)
// =================================================================================
export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const sessionCookie = cookies.session || '';

    // Verify the session cookie. This is the core of the secure session.
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    
    // If verification is successful, the user is authenticated.
    return {
      props: {
        userName: decodedClaims.name || 'User',
      },
    };
  } catch (err) {
    // Session cookie is invalid, expired, or doesn't exist.
    // Redirect to the login page.
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

// --- SUB-COMPONENTS ---

const Sidebar = () => (
    <aside className="w-64 flex-shrink-0 bg-[#2d3748] text-gray-300 p-4 flex flex-col hidden lg:flex">
      <div className="text-white text-2xl font-bold mb-10 flex items-center gap-2">
          <FiBriefcase className="text-cyan-400" />
          InstaBill
      </div>
      <nav className="flex flex-col gap-2">
        {['Dashboard', 'Profile', 'Auto Invoicing', 'Quotation', 'Expense', 'Customer', 'Reports'].map((item, index) => (
          <a key={item} href="#" className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${item === 'Dashboard' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-gray-700'}`}>
            {React.createElement([FiLayout, FiUser, FiFileText, FiTrendingUp, FiTrendingDown, FiUsers, FiBarChart2][index], { className: 'w-5 h-5' })}
            {item}
          </a>
        ))}
      </nav>
      <div className="mt-auto">
          <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition-colors duration-200"><FiSettings /> Settings</a>
      </div>
    </aside>
  );

const Header = ({ onOpenModal, onLogout }) => (
    <header className="bg-white/60 backdrop-blur-sm border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
        <div></div>
        <div className="flex items-center gap-4">
            <button
                onClick={onOpenModal}
                className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                <FiPlus/> Create New
            </button>
            <a href="#" className="text-gray-600 hover:text-cyan-500 transition-colors">Support</a>
            <button className="flex items-center gap-2 text-gray-600">
                My Account <FiChevronDown/>
            </button>
            <button
                onClick={onLogout}
                title="Logout"
                className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors">
                <FiLogOut size={20} />
            </button>
        </div>
    </header>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 text-white p-3 rounded-lg shadow-xl border border-gray-700">
                <p className="font-bold text-sm mb-2">{label}</p>
                <p className="text-xs text-cyan-400">{`Revenue: AED ${payload[0].value.toLocaleString()}`}</p>
                <p className="text-xs text-orange-400">{`Expenses: AED ${payload[1].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const CreateNewModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={onClose} >
            <motion.div
                initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8"
                onClick={(e) => e.stopPropagation()} >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Create New Invoice</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><FiX size={24} /></button>
                </div>
                <form>
                    <div className="space-y-4">
                        <input type="text" placeholder="Customer Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none transition" />
                        <input type="email" placeholder="Customer Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none transition" />
                        <input type="number" placeholder="Amount (AED)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none transition" />
                        <input type="date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none transition text-gray-500" />
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="py-2 px-5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
                        <button type="submit" className="py-2 px-5 rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg">Save Invoice</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};


// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = ({ userName }) => {
    const router = useRouter();
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('YTD');
    const [filteredData, setFilteredData] = useState([]);

    const fullChartData = [
        { date: '2025-01-15', revenue: 120000, expenses: 80000 },
        { date: '2025-02-10', revenue: 135000, expenses: 85000 },
        { date: '2025-03-20', revenue: 180000, expenses: 100000 },
        { date: '2025-04-18', revenue: 150000, expenses: 95000 },
        { date: '2025-05-22', revenue: 210000, expenses: 120000 },
        { date: '2025-06-12', revenue: 160456.80, expenses: 90000 },
        { date: '2025-07-05', revenue: 220000, expenses: 130000 },
        { date: '2024-11-15', revenue: 195000, expenses: 110000 },
        { date: '2024-12-20', revenue: 250000, expenses: 150000 },
    ];

    useEffect(() => {
        const now = new Date('2025-07-16T21:01:14'); // Using fixed date for consistent filtering
        let data = [];
        if (activeFilter === 'YTD') {
            data = fullChartData.filter(d => new Date(d.date).getFullYear() === now.getFullYear());
        } else if (activeFilter === '30D') {
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30);
            data = fullChartData.filter(d => new Date(d.date) >= thirtyDaysAgo);
        } else if (activeFilter === '6M') {
            const sixMonthsAgo = new Date(now);
            sixMonthsAgo.setMonth(now.getMonth() - 6);
            data = fullChartData.filter(d => new Date(d.date) >= sixMonthsAgo);
        }
        
        const formattedData = data.map(item => ({
            name: new Date(item.date).toLocaleString('default', { month: 'short' }),
            revenue: item.revenue,
            expenses: item.expenses
        }));
        setFilteredData(formattedData);
    }, [activeFilter]);
    
    const financialSummary = filteredData.reduce((acc, curr) => {
        acc.revenue += curr.revenue;
        acc.expenses += curr.expenses;
        return acc;
    }, { revenue: 0, expenses: 0 });

    financialSummary.profit = financialSummary.revenue - financialSummary.expenses;
    
    const handleLogout = async () => {
        try {
          const response = await fetch('/api/logout', { method: 'POST' });
          if (response.ok) {
            router.push('/login');
          } else { throw new Error('Failed to logout'); }
        } catch (error) {
          console.error('Logout failed:', error);
          alert('Could not log out. Please try again.');
        }
    };
    
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onOpenModal={() => setModalOpen(true)} onLogout={handleLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-6">
                            Welcome Back, {userName}!
                        </motion.h1>

                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Automate Razorpay Payments into Invoicing</h2>
                                <p className="text-gray-500 mt-1">Accept payments via the Razorpay Payment Gateway in InstaBill automatically.</p>
                            </div>
                            <div className='flex items-center gap-8'>
                                <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">Start Now</button>
                                <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay Logo" className="h-8"/>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-2 mb-4">
                            {['YTD', '6M', '30D'].map(filter => (
                                <button key={filter} onClick={() => setActiveFilter(filter)}
                                    className={`py-1.5 px-4 rounded-full text-sm font-semibold transition-colors ${activeFilter === filter ? 'bg-cyan-500 text-white shadow' : 'bg-white text-gray-600 hover:bg-gray-200'}`} >
                                    {filter === 'YTD' ? 'Year to Date' : `Last ${filter === '6M' ? '6 Months' : '30 Days'}`}
                                </button>
                            ))}
                        </div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={filteredData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                        <YAxis tickFormatter={(value) => `AED ${value / 1000}k`} tick={{ fontSize: 12 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 191, 255, 0.1)' }} />
                                        <Bar dataKey="revenue" fill="url(#colorRevenue)" name="Revenue" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="expenses" fill="url(#colorExpenses)" name="Expenses" radius={[4, 4, 0, 0]} />
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4fd1c5" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#4fd1c5" stopOpacity={0.4}/>
                                            </linearGradient>
                                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f6ad55" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#f6ad55" stopOpacity={0.4}/>
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-gradient-to-br from-orange-400 to-red-400 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                                <h3 className="font-bold text-lg mb-4 opacity-90">Financial Summary ({activeFilter})</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Revenue', value: financialSummary.revenue },
                                        { label: 'Expenses', value: financialSummary.expenses },
                                        { label: 'Profit & Loss', value: financialSummary.profit }
                                    ].map(item => (
                                        <div key={item.label} className="flex justify-between items-center bg-white/20 p-3 rounded-lg">
                                            <span className="opacity-90">{item.label}</span>
                                            <span className="font-bold text-lg">AED {item.value.toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </main>
            </div>
            <CreateNewModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
};

export default Dashboard;