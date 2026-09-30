'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { loginApi, registerApi, refreshApi, getAccountApi } from './api';
import { useAuthStore } from './store';
export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  const setOk = useAuthStore((s) => s.setOk);
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      setTokens(accessToken, refreshToken);
      setUser(res.data);

      setOk(true);
    },
  });
};

export const useRegister = () => {
  const setOk = useAuthStore((s) => s.setOk);
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setUser(data);
      setOk(true);
    },
  });
};

export const useAuthCheck = () => {
  const { accessToken, refreshToken, setTokens, clear } = useAuthStore();
  const setOk = useAuthStore((s) => s.setOk);
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: ['auth-check'],
    queryFn: async () => {
      if (!accessToken && !refreshToken) return null;

      try {
        const { data } = await getAccountApi(accessToken!);
        setOk(true);
        setUser(data);
        return data;
      } catch {
        try {
          const { data } = await refreshApi();

          setTokens(data.accessToken, data.refreshToken);

          const me = await getAccountApi(data.accessToken);
          setOk(true);
          setUser(me.data);

          return me.data;
        } catch {
          clear();
          setOk(false);
          setUser(null);
          return null;
        }
      }
    },
    retry: false,
  });
};
