import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  role: 'client' | 'staff' | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  role: null,
  login: (email: string) => {
    const role = email.includes('admin') || email.includes('ventify') ? 'staff' : 'client';
    set({ isLoggedIn: true, role });
  },
  logout: () => set({ isLoggedIn: false, role: null }),
}));