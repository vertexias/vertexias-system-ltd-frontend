// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // React Router for navigation

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#020617] to-[#0f172a] border-r border-white/10 p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-10">
        Vertexias Admin
      </h2>

      <nav className="space-y-4 text-sm">
        <Link to="/admin/job" className="block hover:text-purple-400">
          Job
        </Link>
        <Link to="/admin/contact" className="block hover:text-purple-400">
          Contact
        </Link>
        <Link to="/admin/project" className="block hover:text-purple-400">
          Project
        </Link>
        <button className="block w-full text-sm text-left py-2 px-4 mt-4 bg-red-600 hover:bg-red-700 text-white rounded">
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
