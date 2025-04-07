// src/lib/types.ts
// types/transaction.ts
export interface Transaction {
  id : string;
  amount: number;
  
  metadata?: {
    name?: string;
    type?: string;
    email?: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  };
  payment_reference?: string;
  type: 'deposit' | 'withdrawal' | 'chargeback' | 'cashback' | 'referral';
  status?: 'successful' | 'pending' | 'failed';
  date: string;
}


// Add other shared types here if needed

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}