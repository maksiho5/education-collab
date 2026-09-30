'use client';

import { useAuthCheck } from '@/src/auth/hooks';
import { useAuthStore } from '@/src/auth/store';
import LoginForm from '@/src/components/LoginForm';
import Navigation from '@/src/components/Navigation';

import React from 'react';

function LoginPage() {
  useAuthCheck();
  const ok = useAuthStore((s) => s.ok);

  return (
    <>
      <Navigation />

      {ok ? <h1>ГОтово</h1> : <LoginForm />}
    </>
  );
}

export default LoginPage;
