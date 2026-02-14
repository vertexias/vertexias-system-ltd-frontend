// src/components/admin/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout, adminPath } = useAuth();

  // Build the admin base path (handles /vertexia-web/admin or just /admin)
  const basePath = location.pathname.split(adminPath)[0];
  const adminBasePath = `${basePath}${adminPath}`;

  const isActive = (path: string) => location.pathname === `${adminBasePath}${path}`;

  return (
    <aside className="w-64 bg-gradient-to-b from-[#020617] to-[#0f172a] border-r border-white/10 p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-10">
        Vertexias Admin
      </h2>

      <nav className="space-y-2">
        {/* Dashboard Link */}
        <Link 
          to={adminBasePath}
          className={`block py-2 px-4 rounded transition-colors ${
            location.pathname === adminBasePath
              ? 'bg-purple-500/20 text-purple-400' 
              : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
          }`}
        >
          Dashboard
        </Link>

        {/* Jobs Link */}
        <Link 
          to={`${adminBasePath}/jobs`}
          className={`block py-2 px-4 rounded transition-colors ${
            isActive('/jobs')
              ? 'bg-purple-500/20 text-purple-400' 
              : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
          }`}
        >
          Jobs
        </Link>

        {/* Contact Link */}
        <Link 
          to={`${adminBasePath}/contacts`}
          className={`block py-2 px-4 rounded transition-colors ${
            isActive('/contact')
              ? 'bg-purple-500/20 text-purple-400' 
              : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
          }`}
        >
          Contact
        </Link>

        {/* Project Link */}
        <Link 
          to={`${adminBasePath}/project`}
          className={`block py-2 px-4 rounded transition-colors ${
            isActive('/project')
              ? 'bg-purple-500/20 text-purple-400' 
              : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
          }`}
        >
          Project
        </Link>

        {/* Logout Button */}
        <button 
          onClick={logout}
          className="block w-full text-left py-2 px-4 mt-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;