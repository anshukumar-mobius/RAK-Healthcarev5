'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useAppStore } from '@/lib/store';
import { Bot, BarChart3, GitBranch, TrendingUp } from 'lucide-react';

const searchItems = [
  { id: 'sentinel', title: 'Sentinel Agent', type: 'agent', href: '/agents/sentinel', icon: Bot },
  { id: 'navigator', title: 'Navigator Agent', type: 'agent', href: '/agents/navigator', icon: Bot },
  { id: 'cmo-dashboard', title: 'CMO Dashboard', type: 'dashboard', href: '/dashboards/cmo', icon: BarChart3 },
  { id: 'quality-dashboard', title: 'Quality Dashboard', type: 'dashboard', href: '/dashboards/quality', icon: BarChart3 },
  { id: 'discharge-process', title: 'Discharge Process', type: 'process', href: '/processes/discharge', icon: GitBranch },
  { id: 'sepsis-detection', title: 'Sepsis Detection KPI', type: 'kpi', href: '/roi?kpi=sepsis', icon: TrendingUp },
];

export function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette } = useAppStore();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    toggleCommandPalette();
    setSearch('');
  };

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={toggleCommandPalette}>
      <CommandInput 
        placeholder="Search agents, KPIs, processes..." 
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Agents">
          {filteredItems
            .filter(item => item.type === 'agent')
            .map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandGroup heading="Dashboards">
          {filteredItems
            .filter(item => item.type === 'dashboard')
            .map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandGroup heading="Processes">
          {filteredItems
            .filter(item => item.type === 'process')
            .map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandGroup heading="KPIs">
          {filteredItems
            .filter(item => item.type === 'kpi')
            .map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}