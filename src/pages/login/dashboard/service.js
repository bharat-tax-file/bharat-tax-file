// pages/dashboard/service.js
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

const ServicePage = ({ userName }) => {
  return (
    <DashboardLayout userName={userName}>
      <h1 className="text-3xl font-bold mb-6">Service</h1>
      <p className="text-gray-600">
        This is the Service page. Here you can manage your services.
      </p>
      {/* Add service management features here */}
    </DashboardLayout>
  );
};

export default ServicePage;
