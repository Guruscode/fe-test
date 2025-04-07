import React from 'react';
import { formatCurrency } from '@/app/utils/format';

interface StatsCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, amount, icon }) => {
  return (
    <div className="stats-card bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{formatCurrency(amount)}</h3>
        </div>
        <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;