import { create } from 'zustand';
import { getUser, updateUser as apiUpdateUser } from '@/src/lib/apiClient';
import type { User, UpdateProfileDto } from '@/src/types';

interface UserProfileState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  updateProfile: (dto: UpdateProfileDto) => Promise<void>;
}

export const useUserStore = create<UserProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getUser();
      set({ profile: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch user profile', isLoading: false });
    }
  },

  updateProfile: async (dto: UpdateProfileDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiUpdateUser(dto);
      set({ profile: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update user profile', isLoading: false });
      throw error;
    }
  }
}));
