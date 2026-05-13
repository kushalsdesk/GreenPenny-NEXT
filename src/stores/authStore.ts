import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/src/lib/supabase/client";

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showLogin: boolean;
  isVerifying: boolean;
  verificationEmail: string | null;

  setShowLogin: (show: boolean) => void;
  clearError: () => void;
  setVerifying: (email: string) => void;
  clearVerifying: () => void;

  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      showLogin: false,
      isVerifying: false,
      verificationEmail: null,

      setShowLogin: (show: boolean) => {
        set({ showLogin: show, error: null });
      },
      clearError: () => {
        set({ error: null });
      },
      setVerifying: (email: string) => {
        set({ isVerifying: true, verificationEmail: email });
      },
      clearVerifying: () => {
        set({ isVerifying: false, verificationEmail: null });
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });

        try {
          const supabase = createClient();

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name },
              emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL
                ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
                : `${window.location.origin}/auth/callback`,
            },
          });

          if (error) {
            set({ isLoading: false, error: error.message });
            throw new Error(error.message);
          }

          if (data.user) {
            if (data.user.identities && data.user.identities.length === 0) {
              const errorMsg = "Email already registered. Please sign in.";
              set({ isLoading: false, error: errorMsg });
              throw new Error(errorMsg);
            }

            set({
              isLoading: false,
              error: null,
              isVerifying: true,
              verificationEmail: email,
            });
          }
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Signup Failed";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const supabase = createClient();

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false, error: error.message });
            throw new Error(error.message);
          }

          if (data.user) {
            const user: User = {
              id: data.user.id,
              email: data.user.email!,
              name:
                data.user.user_metadata?.name || data.user.email!.split("@")[0],
              avatarUrl: data.user.user_metadata?.avatar_url ?? undefined,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
              showLogin: false,
            });
          }
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Login Failed";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });

        try {
          const supabase = createClient();

          const redirectTo = process.env.NEXT_PUBLIC_SITE_URL
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            : `${window.location.origin}/auth/callback`;

          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo },
          });

          if (error) {
            set({ isLoading: false, error: error.message });
            throw new Error(error.message);
          }
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Google login failed";
          set({ isLoading: false, error: message });
        }
      },

      checkSession: async () => {
        set({ isLoading: true, error: null });

        try {
          const supabase = createClient();

          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            throw new Error(error.message);
          }

          if (session?.user) {
            const user: User = {
              id: session.user.id,
              email: session.user.email!,
              name:
                session.user.user_metadata?.name ||
                session.user.email!.split("@")[0],
              avatarUrl: session.user.user_metadata?.avatar_url ?? undefined,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: unknown) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });

        try {
          const supabase = createClient();

          const { error } = await supabase.auth.signOut();

          if (error) {
            set({ isLoading: false, error: error.message });
            throw new Error(error.message);
          }

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            showLogin: false,
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Logout Failed";
          set({ isLoading: false, error: message });
          throw error;
        }
      },
    }),
    {
      name: "green-penny-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
