'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Link, 
  Database, 
  Wifi, 
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Settings,
  RefreshCw,
  Zap
} from 'lucide-react';

const integrations = [
  {
    id: 'sage-mimsys',
    name: 'Sage-MIMSYS 2016',
    type: 'HIS',
    status: 'connected',
    reliability: 99.2,
    lastSync: '2024-02-05T16:45:00Z',
    version: '2016.3.1',
    description: 'Primary Hospital Information System integration',
    endpoints: 4,
    dataFlow: 'Bidirectional'
  },
  {
    id: 'lab-system',
    name: 'Laboratory Information System',
    type: 'LIS',
    status: 'connected',
    reliability: 98.7,
    lastSync: '2024-02-05T16:44:30Z',
    version: '3.2.1',
    description: 'Lab results and critical value integration',
    endpoints: 2,
    dataFlow: 'Inbound'
  },
  {
    id: 'pharmacy-system',
    name: 'Pharmacy Management System',
    type: 'PMS',
    status: 'connected',
    reliability: 97.8,
    lastSync: '2024-02-05T16:43:15Z',
    version: '4.1.0',
    description: 'Medication orders and dispensing integration',
    endpoints: 3,
    dataFlow: 'Bidirectional'
  },
  {
    id: 'radiology-pacs',
    name: 'PACS Radiology System',
    type: 'PACS',
    status: 'maintenance',
    reliability: 95.4,
    lastSync: '2024-02-05T14:20:00Z',
    version: '2.8.3',
    description: 'Radiology images and reports integration',
    endpoints: 2,
    dataFlow: 'Inbound'
  },
  {
    id: 'whatsapp-api',
    name: 'WhatsApp Business API',
    type: 'API',
    status: 'connected',
    reliability: 99.8,
    lastSync: '2024-02-05T16:45:45Z',
    version: '2.0',
    description: 'PHI-minimized alert notifications',
    endpoints: 1,
    dataFlow: 'Outbound'
  }
];

const dataFlowSteps = [
  { 
    id: 1, 
    name: 'EMR Data Collection', 
    component: 'Sage-MIMSYS', 
    status: 'active',
    throughput: '1,247 records/min'
  },
  { 
    id: 2, 
    name: 'HIS Integration Layer', 
    component: 'HIS Integrator', 
    status: 'active',
    throughput: '1,245 records/min'
  },
  { 
    id: 3, 
    name: 'Real-time Processing', 
    component: 'Sentinel Agent', 
    status: 'active',
    throughput: '1,243 records/min'
  },
  { 
    id: 4, 
    name: 'Workflow Orchestration', 
    component: 'Aegis Coordinator', 
    status: 'active',
    throughput: '156 tasks/min'
  },
  { 
    id: 5, 
    name: 'Task Distribution', 
    component: 'Task Queue', 
    status: 'active',
    throughput: '154 tasks/min'
  },
  { 
    id: 6, 
    name: 'Outcome Tracking', 
    component: 'Archivist', 
    status: 'active',
    throughput: '152 events/min'
  }
];

const safetyGates = [
  {
    id: 'data-validation',
    name: 'Data Validation Gateway',
    status: 'passed',
    lastCheck: '2024-02-05T16:45:00Z',
    description: 'Validates incoming data integrity and format compliance'
  },
  {
    id: 'phi-protection',
    name: 'PHI Protection Layer',
    status: 'passed',
    lastCheck: '2024-02-05T16:45:00Z',
    description: 'Ensures patient data privacy and HIPAA compliance'
  },
  {
    id: 'business-rules',
    name: 'Business Rules Engine',
    status: 'passed',
    lastCheck: '2024-02-05T16:44:30Z',
    description: 'Validates clinical decision rules and thresholds'
  },
  {
    id: 'audit-trail',
    name: 'Audit Trail Verification',
    status: 'passed',
    lastCheck: '2024-02-05T16:44:00Z',
    description: 'Ensures complete audit logging and traceability'
  },
  {
    id: 'failover-ready',
    name: 'Failover Readiness',
    status: 'warning',
    lastCheck: '2024-02-05T16:30:00Z',
    description: 'Secondary systems ready for automatic failover'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected': return 'bg-green-100 text-green-800';
    case 'disconnected': return 'bg-red-100 text-red-800';
    case 'maintenance': return 'bg-yellow-100 text-yellow-800';
    case 'error': return 'bg-red-100 text-red-800';
    case 'active': return 'bg-green-100 text-green-800';
    case 'passed': return 'bg-green-100 text-green-800';
    case 'warning': return 'bg-yellow-100 text-yellow-800';
    case 'failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getReliabilityColor = (reliability: number) => {
  if (reliability >= 99) return 'text-green-600';
  if (reliability >= 95) return 'text-yellow-600';
  return 'text-red-600';
};

export default function IntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const handleTestConnection = (integrationId: string) => {
    console.log('Testing connection for:', integrationId);
  };

  const handleRefreshStatus = () => {
    console.log('Refreshing integration status...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integration Architecture</h1>
          <p className="text-muted-foreground mt-2">
            HIS connectivity, data flow monitoring, and system integration status
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleRefreshStatus}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            {integrations.filter(i => i.status === 'connected').length}/{integrations.length} Connected
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Integration Overview</TabsTrigger>
          <TabsTrigger value="dataflow">Data Flow Diagram</TabsTrigger>
          <TabsTrigger value="safety">Safety Gates</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {integration.type === 'HIS' && <Database className="h-5 w-5 text-blue-600" />}
                        {integration.type === 'API' && <Link className="h-5 w-5 text-blue-600" />}
                        {['LIS', 'PMS', 'PACS'].includes(integration.type) && <Activity className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Reliability</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${getReliabilityColor(integration.reliability)}`}>
                            {integration.reliability}%
                          </span>
                          <Progress value={integration.reliability} className="flex-1" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Version</p>
                        <p className="text-lg font-bold">{integration.version}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Type:</p>
                        <Badge variant="outline">{integration.type}</Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Data Flow:</p>
                        <Badge variant="outline">{integration.dataFlow}</Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Endpoints:</p>
                        <span className="font-medium">{integration.endpoints}</span>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Sync:</p>
                        <span className="font-medium">
                          {new Date(integration.lastSync).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleTestConnection(integration.id)}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Test Connection
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dataflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Data Flow Diagram
              </CardTitle>
              <CardDescription>
                Real-time data processing pipeline from EMR to clinical outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Flow Visualization */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {dataFlowSteps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          step.status === 'active' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                        }`}>
                          <span className="text-sm font-bold">{step.id}</span>
                        </div>
                        <div className="text-center mt-2 max-w-24">
                          <p className="text-xs font-medium">{step.name}</p>
                          <p className="text-xs text-muted-foreground">{step.component}</p>
                        </div>
                        {index < dataFlowSteps.length - 1 && (
                          <div className="absolute top-6 w-full flex justify-center">
                            <div 
                              className="h-0.5 bg-blue-300"
                              style={{
                                left: `${(index + 1) * (100 / dataFlowSteps.length)}%`,
                                width: `${100 / dataFlowSteps.length}%`
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Throughput Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Data Ingestion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <p className="text-xs text-muted-foreground">records/minute</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Task Generation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">156</div>
                      <p className="text-xs text-muted-foreground">tasks/minute</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Event Logging</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">152</div>
                      <p className="text-xs text-muted-foreground">events/minute</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Textual Flow Description */}
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Integration Flow Description:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong>EMR → HIS Integrator → Sentinel → Aegis → Tasks → Outcomes</strong>
                    <br />
                    ↓<br />
                    <strong>Archivist (Audit Trail) ← Configurator (Rules) ← Navigator (Analytics)</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Post-Recovery Safety Gates Checklist
              </CardTitle>
              <CardDescription>
                Critical safety validations and system integrity checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safetyGates.map((gate) => (
                  <div key={gate.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="mt-1">
                      {gate.status === 'passed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {gate.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {gate.status === 'failed' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{gate.name}</h4>
                        <Badge className={getStatusColor(gate.status)}>
                          {gate.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {gate.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Last checked: {new Date(gate.lastCheck).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">System Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">99.8%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Data Latency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1.2s</div>
                <p className="text-xs text-muted-foreground">Average processing time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">0.03%</div>
                <p className="text-xs text-muted-foreground">Integration failures</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Active Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {integrations.filter(i => i.status === 'connected').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  of {integrations.length} total systems
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Integration Status</CardTitle>
              <CardDescription>
                Live monitoring of system connections and data flow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Real-time monitoring dashboard with live metrics and alerts coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}