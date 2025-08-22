export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  dashboardPath: string;
}

export interface Agent {
  id: string;
  name: string;
  type: 'monitor' | 'explorer' | 'coordinator' | 'synthesizer' | 'archivist';
  domain: string;
  status: 'active' | 'inactive' | 'maintenance';
  description: string;
  purpose: string;
  kpis: KPI[];
  inputs: string[];
  outputs: string[];
  rules: string[];
  dashboards: string[];
  lastActive?: string;
  metrics?: AgentMetrics;
}

export interface AgentMetrics {
  accuracy?: string;
  leadTime?: string;
  reduction?: string;
  coverage?: string;
  [key: string]: string | undefined;
}

export interface Alert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  patientId?: string;
  patientName?: string;
  unit?: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  escalationLevel: number;
  slaDeadline?: string;
}

export interface KPI {
  id: string;
  name: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  target?: number;
  threshold?: {
    good: number;
    warning: number;
    critical: number;
  };
  definition?: string;
  formula?: string;
  lastUpdated?: string;
}

export interface BusinessProcess {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'failed';
  steps: ProcessStep[];
  sla?: number;
  owner?: string;
  lastRun?: string;
  successRate?: number;
}

export interface ProcessStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  timestamp?: string;
  description?: string;
}

export interface BusinessEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  lastFired?: string;
  frequency?: string;
  subscribers?: string[];
  payload?: Record<string, any>;
}

export interface Playbook {
  id: string;
  name: string;
  description: string;
  trigger: string;
  agentSequence: string[];
  successMetrics: string[];
  status: 'active' | 'draft' | 'archived';
  lastExecution?: string;
  successRate?: number;
}

export interface Integration {
  id: string;
  name: string;
  type: 'HIS' | 'EMR' | 'API' | 'Database';
  status: 'connected' | 'disconnected' | 'error';
  reliability?: number;
  lastSync?: string;
  version?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  department: string;
  dashboardPath: string;
  permissions: string[];
  avatar?: string;
  description?: string;
}