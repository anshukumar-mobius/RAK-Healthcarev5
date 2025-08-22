'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TopBar } from './top-bar';
import { Sidebar } from './sidebar';
import { ActivityRail } from './activity-rail';
import { CommandPalette } from './command-palette';
import { useAppStore } from '@/lib/store';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, loadInitialData } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadInitialData();
  }, [loadInitialData]);

  if (!mounted) {
    return null;
  }

  // Hide shell on landing page for clean marketing layout
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          <ActivityRail />
        </div>
      </div>
      <CommandPalette />
    </div>
  );
}