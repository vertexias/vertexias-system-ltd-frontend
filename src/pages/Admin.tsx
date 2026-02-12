// pages/Admin.tsx
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Admin page loaded');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('Current path:', window.location.pathname);
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin panel!</p>
      <p>Authentication status: {isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
      <div className="mt-4 p-4 bg-white rounded shadow">
        This is the admin page content. It should only be visible when authenticated.
      </div>
    </div>
  );
};

export default Admin;