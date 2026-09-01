import { create } from 'zustand';

export interface UserProfile {
  id: string;
  phone: string;
  name?: string;
  role: string;
  isAgeVerified: boolean;
  token?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (phone: string, token?: string, name?: string) => void;
  logout: () => void;
  verifyAge: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Default to logged-in user state for seamless e-commerce testing
  isAuthenticated: true,
  user: {
    id: 'usr_drinkit_guest_1',
    phone: '9876543210',
    name: 'Rahul Sharma',
    role: 'CUSTOMER',
    isAgeVerified: true,
    token: 'jwt_access_token_drinkit_2026',
  },
  login: (phone, token, name) =>
    set({
      isAuthenticated: true,
      user: {
        id: `usr_${Date.now()}`,
        phone,
        name: name || 'Valued Customer',
        role: 'CUSTOMER',
        isAgeVerified: true,
        token: token || 'jwt_token_sample',
      },
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
  verifyAge: () =>
    set((state) => ({
      user: state.user ? { ...state.user, isAgeVerified: true } : null,
    })),
}));
