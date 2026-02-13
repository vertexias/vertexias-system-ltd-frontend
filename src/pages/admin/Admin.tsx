// src/pages/Admin.tsx
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/admin/Sidebar';  // Import Sidebar

const Admin = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Admin page loaded');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('Current path:', window.location.pathname);
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen bg-black-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Admin Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin panel!</p>
        <p>Authentication status: {isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
      </div>
    </div>
  );
};

export default Admin;
