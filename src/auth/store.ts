import { useEffect } from 'react';
import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  ok: boolean;
  user: null | any;
  setUser: (data: any) => void;
  setTokens: (access: string, refresh: string) => void;
  setOk: (ok: boolean) => void;
  clear: () => void;
}
let storage: any = '';
if (typeof window !== 'undefined') {
  storage = localStorage.getItem('accessToken');
}
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: storage || '',
  refreshToken: null,
  ok: false,
  user: null,
  setUser: (data: any) => set({ user: data }),
  setTokens: (access, refresh) => {
    localStorage.setItem('accessToken', access);
    return set({ accessToken: access, refreshToken: refresh });
  },
  setOk: (ok) => set({ ok: ok }),
  clear: () => set({ accessToken: null, refreshToken: null }),
}));
