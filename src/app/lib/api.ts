const API_BASE_URL = 'https://fe-task-api.mainstack.io';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Wallet {
  balance: number;
  ledger_balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
}

export interface Transaction {
  id: string;
  amount: number;
  metadata?: {
    name: string;
    type: string;
    email: string;
    quantity?: number;
    country: string;
    product_name?: string;
  };
  payment_reference: string;
  status: 'successful' | 'pending' | 'failed';
  type: 'deposit' | 'withdrawal';
  date: string;
}

export const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/user`);
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
};

export const fetchWallet = async (): Promise<Wallet> => {
  const response = await fetch(`${API_BASE_URL}/wallet`);
  if (!response.ok) throw new Error('Failed to fetch wallet data');
  return response.json();
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch(`${API_BASE_URL}/transactions`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
};

export const fetchDashboardData = async () => {
  try {
    const [user, wallet, transactions] = await Promise.all([
      fetchUser(),
      fetchWallet(),
      fetchTransactions(),
    ]);
    return { user, wallet, transactions };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to load dashboard data');
  }
};
