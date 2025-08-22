import { create } from 'zustand';
import { User, Alert, Agent, BusinessProcess, KPI, Persona } from '@/types';

interface AppState {
  currentUser: User | null;
  currentPersona: Persona | null;
  alerts: Alert[];
  agents: Agent[];
  processes: BusinessProcess[];
  kpis: KPI[];
  personas: Persona[];
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  isOnline: boolean;
  
  // Actions
  setCurrentUser: (user: User) => void;
  setCurrentPersona: (persona: Persona) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (id: string, updates: Partial<Alert>) => void;
  removeAlert: (id: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  toggleCommandPalette: () => void;
  setOnlineStatus: (status: boolean) => void;
  loadInitialData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  currentPersona: null,
  alerts: [],
  agents: [],
  processes: [],
  kpis: [],
  personas: [],
  theme: 'system',
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  isOnline: true,

  setCurrentUser: (user) => set({ currentUser: user }),
  
  setCurrentPersona: (persona) => set({ currentPersona: persona }),
  
  addAlert: (alert) => set((state) => ({ 
    alerts: [alert, ...state.alerts] 
  })),
  
  updateAlert: (id, updates) => set((state) => ({
    alerts: state.alerts.map(alert => 
      alert.id === id ? { ...alert, ...updates } : alert
    )
  })),
  
  removeAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(alert => alert.id !== id)
  })),
  
  setTheme: (theme) => set({ theme }),
  
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  
  toggleCommandPalette: () => set((state) => ({ 
    commandPaletteOpen: !state.commandPaletteOpen 
  })),
  
  setOnlineStatus: (status) => set({ isOnline: status }),
  
  loadInitialData: () => {
    // Load seed data - this would typically come from API
    const seedPersonas: Persona[] = [
      {
        id: 'cmo',
        name: 'Dr. Sarah Al-Rashid',
        role: 'Chief Medical Officer',
        department: 'Executive',
        dashboardPath: '/dashboards/cmo',
        permissions: ['all'],
        description: 'Strategic oversight of clinical operations and quality'
      },
      {
        id: 'quality',
        name: 'Fatima Hassan',
        role: 'Head of Quality',
        department: 'Quality Assurance',
        dashboardPath: '/dashboards/quality',
        permissions: ['quality', 'audit', 'compliance'],
        description: 'Quality management and JCI compliance'
      },
      {
        id: 'nursing-supervisor',
        name: 'Ahmed Mohammed',
        role: 'Nursing Supervisor',
        department: 'Nursing',
        dashboardPath: '/dashboards/nursing-supervisor',
        permissions: ['nursing', 'alerts', 'patient-safety'],
        description: 'Patient safety and nursing workflow optimization'
      },
      {
        id: 'him-coding',
        name: 'Layla Ibrahim',
        role: 'HIM/Coding Manager',
        department: 'Health Information',
        dashboardPath: '/dashboards/him-coding',
        permissions: ['coding', 'documentation', 'analytics'],
        description: 'Medical coding and documentation integrity'
      }
    ];

    set({ personas: seedPersonas });
  }
}));