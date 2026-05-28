import { create } from 'zustand';
import { 
  getTransactions, 
  createTransaction as apiCreateTransaction, 
  updateTransaction as apiUpdateTransaction, 
  deleteTransaction as apiDeleteTransaction 
} from '@/src/lib/apiClient';
import type { 
  Transaction, 
  CreateTransactionDto, 
  UpdateTransactionDto, 
  TransactionFilters,
  PaginatedTransactions 
} from '@/src/types';

interface TransactionState {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  fetchTransactions: (filters?: Partial<TransactionFilters>) => Promise<void>;
  createTransaction: (dto: CreateTransactionDto) => Promise<void>;
  updateTransaction: (id: string, dto: UpdateTransactionDto) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  isLoading: false,
  error: null,

  fetchTransactions: async (filters: Partial<TransactionFilters> = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getTransactions(filters);
      set({ 
        transactions: response.data.data, 
        total: response.data.meta.total,
        page: response.data.meta.page,
        limit: response.data.meta.limit,
        totalPages: response.data.meta.totalPages,
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch transactions', isLoading: false });
    }
  },

  createTransaction: async (dto: CreateTransactionDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiCreateTransaction(dto);
      // Prepend the new transaction to the current list
      const currentTransactions = get().transactions;
      set({ transactions: [response.data, ...currentTransactions], isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to create transaction', isLoading: false });
      throw error;
    }
  },

  updateTransaction: async (id: string, dto: UpdateTransactionDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiUpdateTransaction(id, dto);
      const updatedTransactions = get().transactions.map(txn => 
        txn.id === id ? response.data : txn
      );
      set({ transactions: updatedTransactions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update transaction', isLoading: false });
      throw error;
    }
  },

  deleteTransaction: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiDeleteTransaction(id);
      const updatedTransactions = get().transactions.filter(txn => txn.id !== id);
      set({ transactions: updatedTransactions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete transaction', isLoading: false });
      throw error;
    }
  }
}));
