import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import ConfirmationModal from '../components/ConfirmationModal';
import { GoSidebarCollapse } from "react-icons/go";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <span className="text-lg font-semibold animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="mt-12 flex h-[calc(100vh-3.5rem)] text-white relative">
      {/* Sidebar */}
      <div className={`absolute md:relative inset-y-0 left-0 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-10`}>
        <Sidebar setConfirmationModal={setConfirmationModal} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden rounded-tl-xl">
        <button
          className="md:hidden p-4 flex justify-center mt-3 font-serif text-lg"
          onClick={toggleSidebar}
        >
           Open
          <GoSidebarCollapse className='mt-1 ml-2' />
        </button>
        <div className="flex-1 overflow-y-auto py-8">
          <div className="md:p-6 rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <ConfirmationModal modalData={confirmationModal} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;