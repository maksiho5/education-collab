'use client';

import { useAuthCheck } from '@/src/auth/hooks';
import { useAuthStore } from '@/src/auth/store';
import DashboardComponent from '@/src/components/DashboardComponent';
import Navigation from '@/src/components/Navigation';
import React from 'react';

function Dashboard() {
  useAuthCheck();
  const ok = useAuthStore((s) => s.ok);

  return ok ? (
    <>
      <Navigation />
      <DashboardComponent />
    </>
  ) : (
    <h1>Закрыто</h1>
  );
}

export default Dashboard;
