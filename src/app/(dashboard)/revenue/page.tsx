'use client';

import { useState, useEffect } from 'react';
import { fetchDashboardData } from '@/app/lib/api';
import FinancialDashboard from '@/app/components/BalanceCard';
import TransactionList from '@/app/components/TransactionList';
import Skeleton from '@/app/components/UI/Skeleton';
import { User, Wallet, Transaction } from '@/app/lib/type';

interface DashboardData {
  user: User;
  wallet: Wallet;
  transactions: Transaction[];
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="max-w-full mx-4 sm:mx-[5%] py-4 sm:py-8 px-4 sm:px-8">
        <div className="p-4 mb-4 text-red-600 bg-red-100 rounded-lg">{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-full mx-4 sm:mx-[5%] py-4 sm:py-8 px-4 sm:px-8">
        <Skeleton count={3} />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="max-w-full mx-4 sm:mx-[5%] py-4 sm:py-8 px-4 sm:px-8">
        <div>Data not available.</div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-4 sm:mx-[5%] py-4 sm:py-8 px-4 sm:px-8 overflow-hidden">
      {/* Mobile responsive container */}
      <div className="flex flex-col">
        <div className="w-full mb-4 sm:mb-0">
          <FinancialDashboard
            availableBalance={dashboardData.wallet?.balance}
            ledgerBalance={dashboardData.wallet?.ledger_balance}
            totalPayout={dashboardData.wallet?.total_payout}
            totalRevenue={dashboardData.wallet?.total_revenue}
            pendingPayout={dashboardData.wallet?.pending_payout}
          />
        </div>
        <div className="w-full">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}

