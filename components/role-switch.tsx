'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export function RoleSwitch() {
  const { currentPersona, personas, setCurrentPersona } = useAppStore();
  const router = useRouter();

  const handleRoleChange = (personaId: string) => {
    const persona = personas.find(p => p.id === personaId);
    if (persona) {
      setCurrentPersona(persona);
      router.push(persona.dashboardPath);
    }
  };

  if (!currentPersona) return null;

  return (
    <Select value={currentPersona.id} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {currentPersona.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">{currentPersona.role}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {personas.map((persona) => (
          <SelectItem key={persona.id} value={persona.id}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {persona.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{persona.role}</p>
                <p className="text-xs text-muted-foreground">{persona.department}</p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}