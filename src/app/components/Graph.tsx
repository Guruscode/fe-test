import React, { useState, useEffect } from 'react';

export const AnimatedLineGraph = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Sample path for animated line
  const pathD = "M0,150 C100,30 200,270 300,120 C400,30 500,150 600,90 C700,10 800,120 800,150";

  const style = {
    strokeDasharray: 1000,
    strokeDashoffset: progress ? 0 : 1000,
    transition: 'stroke-dashoffset 1.5s ease-in-out'
  };

  return (
    <div className="h-[400px] relative my-6">
      <svg viewBox="0 0 800 300" className="w-full h-full">
        {/* Animated Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#FF5533"
          strokeWidth="3"
          style={style}
        />

        {/* Highlight Dot */}
        <circle 
          cx="300" 
          cy="120" 
          r="5" 
          fill="#4A7DFF" 
          opacity={progress ? 1 : 0}
          style={{ transition: 'opacity 0.5s ease-in-out', transitionDelay: '1.2s' }}
        />

        {/* Horizontal Baseline */}
        <line 
          x1="0" 
          y1="280" 
          x2="800" 
          y2="280" 
          stroke="#E5E7EB" 
          strokeWidth="1.5"
        />
      </svg>

      {/* Date Labels */}
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Apr 1, 2022</span>
        <span>Apr 30, 2022</span>
      </div>
    </div>
  );
};
