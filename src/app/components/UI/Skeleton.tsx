import React from 'react';

interface SkeletonProps {
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-lg p-6 mb-6 animate-pulse"
          style={{ height: '150px' }}
        ></div>
      ))}
    </>
  );
};

export default Skeleton;