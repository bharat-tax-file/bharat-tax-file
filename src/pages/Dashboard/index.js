import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import admin from '@/utils/firebase-admin';
import { motion } from 'framer-motion';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import KpiCards from './KpiCards';
import InvoicePipeline from './InvoicePipeline';
import UrgentInvoices from './UrgentInvoices';

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

export default function Dashboard({ userName }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar userName={userName} onLogout={handleLogout} />
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <KpiCards />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <InvoicePipeline />
              </div>
              <UrgentInvoices />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
