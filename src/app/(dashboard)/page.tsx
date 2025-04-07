'use client';

import { useState, useEffect } from 'react';
import { fetchDashboardData } from '@/app/lib/api';
import FinancialDashboard from '@/app/components/BalanceCard';
import TransactionList from '@/app/components/TransactionList';
import Skeleton from '@/app/components/UI/Skeleton';
import { User, Wallet, Transaction }  from '@/app/lib/type';


export default function DashboardPage() {
  interface DashboardData {
    user: User;
    wallet: Wallet;
    transactions: Transaction[];
  }
  
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-full mx-[5%] py-8 px-8">
      {/* Error Handling */}
      {error && <div className="p-4 mb-4 text-red-600 bg-red-100 rounded-lg">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <Skeleton count={3} />
      ) : (
        dashboardData && (
          <>
            {/* Balance Display */}
            <FinancialDashboard
              availableBalance={dashboardData.wallet?.balance}
              ledgerBalance={dashboardData.wallet?.ledger_balance}
              totalPayout={dashboardData.wallet?.total_payout}
              totalRevenue={dashboardData.wallet?.total_revenue}
              pendingPayout={dashboardData.wallet?.pending_payout}
            />

            {/* Transactions Section */}
           
              <TransactionList />
         
          </>
        )
      )}
    </div>
  );
}
