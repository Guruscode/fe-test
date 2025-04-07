import React from 'react';

const Sidebar = () => {
  return (
    <div className="fixed h-screen flex items-center">
      <div className="bg-white rounded-full py-8 flex flex-col items-center space-y-10 shadow-sm">
        {/* Link icon */}
        <button className="w-12 h-12 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 11.5C8 9.84315 9.34315 8.5 11 8.5H13C14.6569 8.5 16 9.84315 16 11.5C16 13.1569 14.6569 14.5 13 14.5H11C9.34315 14.5 8 13.1569 8 11.5Z" stroke="#6B7280" strokeWidth="2"/>
            <path d="M18 8C18 6.34315 16.6569 5 15 5H13C11.3431 5 10 6.34315 10 8C10 9.65685 11.3431 11 13 11H15C16.6569 11 18 9.65685 18 8Z" stroke="#6B7280" strokeWidth="2"/>
            <path d="M6 16C6 14.3431 7.34315 13 9 13H11C12.6569 13 14 14.3431 14 16C14 17.6569 12.6569 19 11 19H9C7.34315 19 6 17.6569 6 16Z" stroke="#6B7280" strokeWidth="2"/>
          </svg>
        </button>

        {/* File/Document icon */}
        <button className="w-12 h-12 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V9L14 3Z" fill="#9CA3AF"/>
            <path d="M14 3V9H20" fill="#6B7280"/>
          </svg>
        </button>

        {/* Folder icon */}
        <button className="w-12 h-12 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H9L11 6H19C19.5304 6 20.0391 6.21071 20.4142 6.58579C20.7893 6.96086 21 7.46957 21 8V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V6Z" fill="#9CA3AF"/>
            <path d="M19 16H17V14H19V16Z" fill="#6B7280"/>
          </svg>
        </button>

        {/* Document with window icon */}
        <button className="w-12 h-12 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H14L20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4Z" fill="#9CA3AF"/>
            <path d="M14 2V8H20" fill="#6B7280"/>
            <rect x="8" y="12" width="8" height="6" fill="#6B7280"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;