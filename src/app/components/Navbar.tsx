"use client";
import { useState } from "react";
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
<header className="flex justify-between items-center h-16 bg-white px-6 py-2 mt-4 shadow-md border border-gray-200 rounded-4xl mx-4 relative">

  <div className="flex items-center">
  <a href="#" className="text-2xl font-bold">
    <Image 
      src="/icons/mainstack-logo.png" 
      alt="Logo" 
      width={32} 
      height={32} 
      className="object-contain"
    />
  </a>
</div>


      {/* Navigation Links - centered in desktop */}
      <nav className="hidden md:flex md:items-center md:justify-center md:flex-1">
        <div className="flex items-center space-x-2">
          <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm">
          <Image 
            src="/icons/home.png"  
            alt="Logo" 
            width={22} 
            height={22} 
            className="object-contain mr-1 mb-1"
          />
            Home
          </a>
          <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm">
          <Image 
            src="/icons/insert_chart.png"  
            alt="Logo" 
            width={22} 
            height={22} 
            className="object-contain mr-1 mb-1"
          />
            Analytics
          </a>
          <a href="#" className="flex items-center text-white bg-black rounded-full px-4 py-2 text-sm mx-2">
          <Image 
            src="/icons/payments.png"  
            alt="Logo" 
            width={22} 
            height={22} 
            className="object-contain mr-1 mb-1"
          />
            Revenue
          </a>
          <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm">
          <Image 
            src="/icons/group.png"  // Path relative to the public folder
            alt="Logo" 
            width={22} 
            height={22} 
            className="object-contain mr-1 mb-1"
          />
            CRM
          </a>
          <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm">
          <Image 
              src="/icons/widgets.png"  // Path relative to the public folder
              alt="Logo" 
              width={22} 
              height={22} 
              className="object-contain mr-1 mb-1"
            />
            Apps
          </a>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-600 hover:text-gray-900"
        onClick={() => setIsOpen(true)}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Action Buttons - Right (Desktop Only) */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
        <Image 
          src="/icons/notification.png"  // Path relative to the public folder
          alt="Logo" 
          width={40} 
          height={40} 
          className="object-contain"
        />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
        <Image 
          src="/icons/message.png"  // Path relative to the public folder
          alt="Logo" 
          width={40} 
          height={40} 
          className="object-contain"
        />
        </button>
        <div className="flex items-center justify-between bg-gray-100 rounded-full py-2 px-4">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-medium">
            OJ
          </div>
          <div className="ml-6">
            <div className="flex flex-col gap-1">
            <button className="text-gray-600 hover:text-gray-900 md:hidden lg:flex">
              <Image 
                  src="/icons/menu.png"  // Path relative to the public folder
                  alt="Logo" 
                  width={22} 
                  height={22} 
                  className="object-contain"
                />
        </button>
            </div>
          </div>
        </div>
     
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      {isOpen && (
      <div className="fixed top-10 left-16 inset-x-0  flex justify-center items-center z-50">
          <div className="bg-white w-4/5 max-w-md rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center space-y-4">
              <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 text-lg" onClick={() => setIsOpen(false)}>
              <Image 
            src="/icons/home.png"  // Path relative to the public folder
            alt="Logo" 
            width={22} 
            height={22} 
            className="object-contain mr-1 mb-1"
          />
                Home
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 text-lg" onClick={() => setIsOpen(false)}>
              <Image 
              src="/icons/insert_chart.png"  // Path relative to the public folder
              alt="Logo" 
              width={22} 
              height={22} 
              className="object-contain mr-1 mb-1"
            />
                Analytics
              </a>
              <a href="#" className="flex items-center text-white bg-black rounded-full px-6 py-2 text-lg" onClick={() => setIsOpen(false)}>
              <Image 
                src="/icons/payments.png"  // Path relative to the public folder
                alt="Logo" 
                width={22} 
                height={22} 
                className="object-contain mr-1 mb-1"
              />
                Revenue
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 text-lg" onClick={() => setIsOpen(false)}>
              <Image 
                src="/icons/group.png"  // Path relative to the public folder
                alt="Logo" 
                width={22} 
                height={22} 
                className="object-contain mr-1 mb-1"
              />
                CRM
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 text-lg" onClick={() => setIsOpen(false)}>
              <Image 
                src="/icons/widgets.png"  // Path relative to the public folder
                alt="Logo" 
                width={22} 
                height={22} 
                className="object-contain mr-1 mb-1"
              />
                Apps
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;