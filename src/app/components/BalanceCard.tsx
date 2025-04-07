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

const InfoIcon = ({ className }: Props) => (
  <div className="ml-1 text-gray-400">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  availableBalance,
  ledgerBalance,
  totalPayout,
  totalRevenue,
  pendingPayout,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 bg-gray-50">
      {/* Left side - Balance and Chart */}
      <div className="flex-1">
        <div className="mb-4 px-2 sm:px-4">
          <p className="text-gray-600 text-sm mb-1">Available Balance</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-0 sm:mr-4">
              USD {availableBalance}
            </h2>
            <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto">
              Withdraw
            </button>
          </div>
        </div>

        <AnimatedLineGraph />
      </div>

      {/* Right side - Financial details */}
      <div className="w-full md:w-80 space-y-4 sm:space-y-6">
        {/* Ledger Balance */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Ledger Balance</p>
            <span className="ml-auto text-gray-400">
              <InfoIcon />
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">USD {ledgerBalance}</h3>
        </div>

        {/* Total Payout */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Total Payout</p>
            <span className="ml-auto text-gray-400">
              <InfoIcon />
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">USD {totalPayout}</h3>
        </div>

        {/* Total Revenue */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <span className="ml-auto text-gray-400">
              <InfoIcon />
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">USD {totalRevenue}</h3>
        </div>

        {/* Pending Payout */}
        <div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm">Pending Payout</p>
            <span className="ml-auto text-gray-400">
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