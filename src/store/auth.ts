import { create } from "zustand";

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: any | null;
  setUser: (user: any | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  user: null,
  setUser: (user: any) => set({ user }),
}));
