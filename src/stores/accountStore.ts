import { create } from 'zustand';
import { 
  getAccounts, 
  createAccount as apiCreateAccount, 
  updateAccount as apiUpdateAccount, 
  deleteAccount as apiDeleteAccount 
} from '@/src/lib/apiClient';
import type { Account, CreateAccountDto, UpdateAccountDto } from '@/src/types';

interface AccountState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;

  fetchAccounts: () => Promise<void>;
  createAccount: (dto: CreateAccountDto) => Promise<void>;
  updateAccount: (id: string, dto: UpdateAccountDto) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  isLoading: false,
  error: null,

  fetchAccounts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getAccounts();
      set({ accounts: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch accounts', isLoading: false });
    }
  },

  createAccount: async (dto: CreateAccountDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiCreateAccount(dto);
      const currentAccounts = get().accounts;
      set({ accounts: [...currentAccounts, response.data], isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to create account', isLoading: false });
      throw error;
    }
  },

  updateAccount: async (id: string, dto: UpdateAccountDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiUpdateAccount(id, dto);
      const updatedAccounts = get().accounts.map(acc => 
        acc.id === id ? response.data : acc
      );
      set({ accounts: updatedAccounts, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update account', isLoading: false });
      throw error;
    }
  },

  deleteAccount: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiDeleteAccount(id);
      const updatedAccounts = get().accounts.filter(acc => acc.id !== id);
      set({ accounts: updatedAccounts, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete account', isLoading: false });
      throw error;
    }
  }
}));
