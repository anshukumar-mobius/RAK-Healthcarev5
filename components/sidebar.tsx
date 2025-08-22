'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  BarChart3,
  Bot,
  GitBranch,
  Link,
  DollarSign,
  Shield,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboards', href: '/dashboards', icon: BarChart3 },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Processes', href: '/processes', icon: GitBranch },
  { name: 'Integrations', href: '/integrations', icon: Link },
  { name: 'ROI & KPIs', href: '/roi', icon: DollarSign },
  { name: 'Security', href: '/security', icon: Shield },
  { name: 'Roadmap', href: '/roadmap', icon: MapPin },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar, currentPersona } = useAppStore();

  return (
    <div
      className={cn(
        'flex flex-col bg-card border-r transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!sidebarCollapsed && (
          <div>
            <h2 className="text-lg font-semibold">Navigation</h2>
            {currentPersona && (
              <p className="text-xs text-muted-foreground mt-1">
                {currentPersona.role}
              </p>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Button
                key={item.name}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  sidebarCollapsed ? 'px-2' : 'px-3'
                )}
                onClick={() => {
                  if (item.href === '/dashboards' && currentPersona) {
                    router.push(currentPersona.dashboardPath);
                  } else {
                    router.push(item.href);
                  }
                }}
              >
                <item.icon className="h-4 w-4" />
                {!sidebarCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}