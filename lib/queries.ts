import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Agent, Alert, BusinessProcess, KPI, AuditLog, Integration } from '@/types';

// Query keys
export const queryKeys = {
  agents: ['agents'] as const,
  agent: (id: string) => ['agent', id] as const,
  alerts: (type?: string) => ['alerts', type] as const,
  processes: ['processes'] as const,
  kpis: (timeframe?: string) => ['kpis', timeframe] as const,
  auditLogs: ['audit-logs'] as const,
  integrations: ['integrations'] as const,
  risks: (unit?: string) => ['risks', unit] as const,
};

// API functions
const api = {
  async getAgents(): Promise<Agent[]> {
    const response = await fetch('/api/agents');
    return response.json();
  },

  async getAgent(id: string): Promise<Agent> {
    const response = await fetch(`/api/agents/${id}`);
    return response.json();
  },

  async getAlerts(type?: string): Promise<Alert[]> {
    const url = type ? `/api/alerts?type=${type}` : '/api/alerts';
    const response = await fetch(url);
    return response.json();
  },

  async getProcesses(): Promise<BusinessProcess[]> {
    const response = await fetch('/api/processes');
    return response.json();
  },

  async getKPIs(timeframe?: string): Promise<KPI[]> {
    const url = timeframe ? `/api/kpis?timeframe=${timeframe}` : '/api/kpis';
    const response = await fetch(url);
    return response.json();
  },

  async triggerCriticalAlert(data: any) {
    const response = await fetch('/api/alerts/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async triggerDischargeWorkflow(patientId: string) {
    const response = await fetch('/api/workflows/discharge-summary/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId }),
    });
    return response.json();
  },
};

// Query hooks
export const useAgents = () => {
  return useQuery({
    queryKey: queryKeys.agents,
    queryFn: api.getAgents,
  });
};

export const useAgent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.agent(id),
    queryFn: () => api.getAgent(id),
    enabled: !!id,
  });
};

export const useAlerts = (type?: string) => {
  return useQuery({
    queryKey: queryKeys.alerts(type),
    queryFn: () => api.getAlerts(type),
  });
};

export const useProcesses = () => {
  return useQuery({
    queryKey: queryKeys.processes,
    queryFn: api.getProcesses,
  });
};

export const useKPIs = (timeframe?: string) => {
  return useQuery({
    queryKey: queryKeys.kpis(timeframe),
    queryFn: () => api.getKPIs(timeframe),
  });
};

// Mutation hooks
export const useTriggerCriticalAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.triggerCriticalAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.alerts() });
    },
  });
};

export const useTriggerDischargeWorkflow = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.triggerDischargeWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.processes });
    },
  });
};