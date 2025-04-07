import React from 'react';
import { AnimatedLineGraph } from '@/app/components/Graph';

interface FinancialDashboardProps {
  availableBalance: number;
  ledgerBalance: number;
  totalPayout: number;
  totalRevenue: number;
  pendingPayout: number;

}

type Props = {
  className?: string;
};

// Circle with question mark icon
const InfoIcon = ({ className }: Props) => (
  <div className="ml-1 text-gray-400">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className={className}>
    
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// Main component
const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  availableBalance,
  ledgerBalance,
  totalPayout,
  totalRevenue,
  pendingPayout,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50">
      {/* Left side - Balance and Chart */}
      <div className="flex-1">
      <div className="flex items-center mb-8 px-4">
  <div>
    <p className="text-gray-600 text-sm mb-1">Available Balance</p>
    <div className="flex items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mr-24">
        USD {availableBalance}
      </h2>
      <button className="bg-black text-white max-w-3xl px-12 py-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
        Withdraw
      </button>
    </div>
  </div>
</div>


        {/* Animated chart - you'll need to implement or import AnimatedLineGraph */}
        <AnimatedLineGraph />
      </div>

      {/* Right side - Financial details */}
      <div className="w-full md:w-80 space-y-6">
        {/* Ledger Balance */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Ledger Balance</p>
            <span className="ml-40 text-gray-400"> {/* Adjusted margin for smaller screens */}
              <InfoIcon />
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">USD {ledgerBalance}</h3>
        </div>

        {/* Total Payout */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Total Payout</p>
            <span className="ml-46 text-gray-400">
              <InfoIcon />
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">USD {totalPayout}</h3>
        </div>

        {/* Total Revenue */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <span className="ml-45 text-gray-400">
              <InfoIcon />
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">USD {totalRevenue}</h3>
        </div>

        {/* Pending Payout */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Pending Payout</p>
            <span className="ml-42 text-gray-400">
              <InfoIcon />
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">USD {pendingPayout}</h3>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
