import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <span className="text-lg font-semibold animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden rounded-tl-xl">
        <div className="flex-1 overflow-y-auto py-8 px-6">
          <div className="p-6 rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
