"use client";

import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import { useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Improved Toggle Button */}
      <button
        className="md:hidden p-3 fixed top-44 left-4 z-50 bg-white bg-opacity-80 rounded-md shadow-md hover:bg-gray-100 transition-colors duration-200"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`md:block ${
          isSidebarOpen ? 'block fixed top-0 left-0 h-screen w-64 bg-gray-50 z-40' : 'hidden'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}