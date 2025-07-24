// pages/dashboard/clients.js
import React from 'react';
import DashboardLayout from '@/containers/DashboardLayout';
import { requireAuth } from '@/utils/requireAuth';

export async function getServerSideProps(context) {
  const auth = await requireAuth(context);

  if (!auth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userName: auth.user.name || 'User',
    },
  };
}

const ClientsPage = ({ userName }) => {
  return (
    <DashboardLayout userName={userName}>
      <h1 className="text-3xl font-bold mb-6">Clients</h1>
      <p className="text-gray-600">
        This is the Clients page. Here you can view, add, and manage your clients.
      </p>
      {/* Add client table or form here */}
    </DashboardLayout>
  );
};

export default ClientsPage;
