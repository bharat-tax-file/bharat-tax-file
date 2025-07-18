import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import admin from '@/utils/firebase-admin';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import {
  FiFileText, FiUser, FiSettings, FiLogOut, FiTrendingUp, FiDollarSign,
  FiPlus, FiAlertOctagon, FiClock, FiCheckCircle, FiSend
} from 'react-icons/fi';

// SERVER-SIDE AUTHENTICATION
export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const sessionCookie = cookies.session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return { props: { userName: decodedClaims.name || 'User' } };
  } catch (err) {
    return { redirect: { destination: '/login', permanent: false } };
  }
}

// --- MOCK DATA FOR INVOICE SOFTWARE ---
const kpiData = [
  { title: "Overdue", amount: "1,27,000", count: 2, icon: FiAlertOctagon, color: "red" },
  { title: "Outstanding", amount: "65,000", count: 3, icon: FiClock, color: "orange" },
  { title: "Paid (Last 30d)", amount: "4,52,310", count: 12, icon: FiCheckCircle, color: "green" },
  { title: "Drafts", amount: "5", count: 5, icon: FiFileText, color: "gray" },
];
const invoiceStatusData = [
  { name: 'Paid', value: 452310, color: '#10B981' },
  { name: 'Outstanding', value: 65000, color: '#F59E0B' },
  { name: 'Overdue', value: 127000, color: '#EF4444' },
];
const urgentInvoices = [
  { id: 'INV-070', client: 'Amit Desai', dueDate: 'Due 2 days ago', dueRaw: -2, amount: 82000, status: 'Overdue' },
  { id: 'INV-067', client: 'Tech Solutions', dueDate: 'Due yesterday', dueRaw: -1, amount: 45000, status: 'Overdue' },
  { id: 'INV-071', client: 'Priya Mehta', dueDate: 'Due in 9 days', dueRaw: 9, amount: 20000, status: 'Pending' },
];
const activityFeed = [
    { text: "Payment of ₹75,000 received for INV-072.", time: "1h ago" },
    { text: "You sent a reminder for INV-067.", time: "4h ago" },
    { text: "Client &apos;Priya Mehta&apos; viewed INV-071.", time: "1d ago" },
    { text: "A new invoice (INV-073) was created.", time: "2d ago" },
];

// --- INVOICE-FOCUSED SUB-COMPONENTS ---

const KpiCard = ({ title, amount, count, icon: Icon, color }) => {
    const colors = { red: 'border-red-500', orange: 'border-orange-500', green: 'border-green-500', gray: 'border-slate-300' };
    const textColors = { red: 'text-red-500', orange: 'text-orange-500', green: 'text-green-500', gray: 'text-slate-500' };
    return(
        <div className={`bg-white border-l-4 ${colors[color]} rounded-r-lg p-5 shadow-sm`}>
            <div className="flex items-center gap-4">
                <Icon className={`w-8 h-8 ${textColors[color]}`}/>
                <div>
                    <p className="text-sm text-slate-500 font-medium">{title}</p>
                    <p className="text-2xl font-bold text-slate-800">{title.includes('Draft') ? amount : `₹${amount}`}</p>
                    <p className="text-xs text-slate-500">{count} Invoices</p>
                </div>
            </div>
        </div>
    );
};

const UrgentInvoicesList = () => (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Needs Attention</h3>
        <div className="space-y-4">
            {urgentInvoices.map(invoice => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-md bg-slate-50 hover:bg-slate-100">
                    <div>
                        <p className="font-semibold text-slate-700">{invoice.client}</p>
                        <p className="text-sm text-slate-500">{invoice.id} &bull; <span className={invoice.status === 'Overdue' ? 'text-red-500 font-medium' : ''}>{invoice.dueDate}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-slate-800">₹{invoice.amount.toLocaleString('en-IN')}</p>
                        <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                           <FiSend size={12}/> Send Reminder
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = ({ userName }) => {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
            <nav className="w-20 bg-white border-r border-slate-200 p-4 flex-col items-center justify-between hidden lg:flex">
                <div>
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-lg block mb-10"><FiFileText size={20}/></a>
                    <div className="space-y-6">
                        <a href="#" className="text-slate-500 hover:text-blue-600"><FiUser size={20}/></a>
                        <a href="#" className="text-slate-500 hover:text-blue-600"><FiDollarSign size={20}/></a>
                    </div>
                </div>
                <a href="#" className="text-slate-500 hover:text-blue-600"><FiSettings size={20}/></a>
            </nav>

            <div className="flex-1">
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Hello, {userName}</h1>
                        <p className="text-sm text-slate-500">Here's the summary of your invoicing activity.</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 text-sm transition-colors">
                            <FiPlus/> New Invoice
                        </button>
                        <button onClick={handleLogout} className="p-2 text-slate-500 rounded-full hover:bg-slate-200"><FiLogOut/></button>
                    </div>
                </header>

                <main className="p-4 sm:p-6 lg:p-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {kpiData.map(item => <KpiCard key={item.title} {...item} />)}
                        </div>

                        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Invoice Pipeline</h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={invoiceStatusData} layout="vertical" margin={{ top: 0, right: 20, left: -10, bottom: 0 }}>
                                            <XAxis type="number" hide />
                                            <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 14, fill: '#475569' }} width={80}/>
                                            <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}/>
                                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                                {invoiceStatusData.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <UrgentInvoicesList />
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;