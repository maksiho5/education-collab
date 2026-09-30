'use client';
import { useEffect } from 'react';

import RegisterPage from '@/src/components/RegisterForm';
import { useAuthStore } from '@/src/auth/store';
import { useAuthCheck } from '@/src/auth/hooks';
import Navigation from '@/src/components/Navigation';

export default function LoginPage() {
  useAuthCheck();
  const ok = useAuthStore((s) => s.ok);

  return (
    <>
      <Navigation />

      {ok ? <h1>Готово</h1> : <RegisterPage />}
    </>
  );
}
