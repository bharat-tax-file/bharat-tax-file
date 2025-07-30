// pages/dashboard/report.js
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

const ReportPage = ({ userName }) => {
  return (
    <DashboardLayout userName={userName}>
      <h1 className="text-3xl font-bold mb-6">Report</h1>
      <p className="text-gray-600">
        This is the Report page. Here you can view and generate reports.
      </p>
      {/* Add report generation features here */}
    </DashboardLayout>
  );
};

export default ReportPage;
