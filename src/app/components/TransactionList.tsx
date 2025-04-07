'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { fetchTransactions } from '@/app/lib/api';
import { Transaction } from '@/app/lib/type';
import Filter from '@/app/components/Filter';
import Image from 'next/image';
interface Filters {
  dateRange: {
    start: string;
    end: string;
  };
  transactionType: string[];
  transactionStatus: string[];
}

const TransactionList = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    dateRange: {
      start: '17 Jul 2023',
      end: '17 Aug 2023'
    },
    transactionType: ['Store Transactions', 'Get Tipped', 'Withdrawals', 'Chargebacks', 'Cashbacks', 'Refer & Earn'],
    transactionStatus: ['Successful', 'Pending', 'Failed']
  });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setAllTransactions(data);
        setFilteredTransactions(data); // Initially show all transactions
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch transactions');
        } else {
          setError('Failed to fetch transactions');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);


  const applyFilters = useCallback(() => {
    const filtered = allTransactions.filter(txn => {
      const txnDate = new Date(txn.date);
      const startDate = parseDateString(appliedFilters.dateRange.start);
      const endDate = parseDateString(appliedFilters.dateRange.end);
  
      txnDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
  
      const inDateRange = txnDate >= startDate && txnDate <= endDate;
      const typeMatch = appliedFilters.transactionType.some(type => {
        switch (type) {
          case 'Store Transactions': return txn.type === 'deposit' && txn.metadata?.product_name;
          case 'Get Tipped': return txn.type === 'deposit' && txn.metadata?.type === 'tip';
          case 'Withdrawals': return txn.type === 'withdrawal';
          case 'Chargebacks': return txn.type === 'chargeback';
          case 'Cashbacks': return txn.type === 'cashback';
          case 'Refer & Earn': return txn.type === 'referral';
          default: return false;
        }
      });
      const statusMatch = appliedFilters.transactionStatus.some(status => status.toLowerCase() === txn.status?.toLowerCase());
      return inDateRange && typeMatch && statusMatch;
    });
  
    setFilteredTransactions(filtered);
  }, [allTransactions, appliedFilters]);

  useEffect(() => {
    if (!loading && allTransactions.length > 0 && filtersApplied) {
      applyFilters();
    }
  }, [appliedFilters, allTransactions, loading, filtersApplied, applyFilters]);
  
  const parseDateString = (dateStr: string): Date => {
    const parts = dateStr.split(' ');
    const day = parseInt(parts[0]);
    const month = parts[1];
    const year = parseInt(parts[2]);

    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    return new Date(year, monthMap[month], day);
  };

  const getTransactionIcon = (txn: Transaction) => {
    return txn.type === 'withdrawal' ? (
       <Image 
       src="/icons/call_made.png"  // Path relative to the public folder
        alt="Logo" 
        width={22} 
        height={22} 
        className="object-contain mr-1 mb-1"
      />
                      
    ) : (
      <Image 
      src="/icons/call_received.png"  // Path relative to the public folder
       alt="Logo" 
       width={22} 
       height={22} 
       className="object-contain mr-1 mb-1"
     />
    );
  };

  const handleApplyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
    setFiltersApplied(true);
    setShowFilter(false);
  };

  const handleClearFilters = () => {
    setAppliedFilters({
      dateRange: {
        start: '17 Jul 2023',
        end: '17 Aug 2023'
      },
      transactionType: ['Store Transactions', 'Get Tipped', 'Withdrawals', 'Chargebacks', 'Cashbacks', 'Refer & Earn'],
      transactionStatus: ['Successful', 'Pending', 'Failed']
    });
    setFiltersApplied(false);
    setShowFilter(false);
    setFilteredTransactions(allTransactions); // Reset to show all transactions
  };

  if (loading) return <p className="text-center text-gray-500 py-8">Loading transactions...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <div className="py-6 px-4 md:px-6 rounded-lg">
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{filteredTransactions.length} Transactions</h2>
            <p className="text-sm text-gray-600">
              {filtersApplied ? 'Filtered transactions' : 'All transactions'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 flex items-center gap-1 text-sm font-medium"
            >
              Filter <span className="ml-1">▼</span>
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 flex items-center gap-2 text-sm font-medium">
              Export list
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="absolute right-0 top-full mt-2 z-50">
            <Filter
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
              initialFilters={appliedFilters}
            />
          </div>
        )}
      </div>

      <div className="border-b border-gray-200 mb-6"></div>

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
         filteredTransactions.map((txn: Transaction, idx) => (
            <div key={txn.id || idx} className="flex justify-between items-center py-3">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 
                  ${txn.type === 'withdrawal' ? 'bg-red-50' : 'bg-green-50'}`}>
                  {getTransactionIcon(txn)}
                </div>
                <div>
                  <p className="font-medium text-base text-gray-900">{txn.metadata?.product_name || txn.metadata?.type || txn.type}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{txn.metadata?.name}</p>
                  {txn.status && (
                    <p className={`text-sm font-medium mt-0.5 ${
                      txn.status === 'successful' ? 'text-green-600' :
                      txn.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium text-gray-900">USD {(txn.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-lg font-medium mb-2">No matching transaction found for the selected filter</p>
            <p className="text-gray-500">Change your filters to see more results, or add a new product.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 text-sm font-medium"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;