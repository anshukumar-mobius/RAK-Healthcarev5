'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  GitBranch, 
  Play, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Users,
  Target,
  Activity,
  Zap,
  FileText,
  BarChart3
} from 'lucide-react';

const playbooks = [
  {
    id: 'PB-001',
    name: 'Critical Lab Alert Pipeline',
    description: 'Automated response to critical laboratory values',
    trigger: 'be6 CriticalLabPosted',
    agentSequence: ['Sentinel', 'Aegis', 'Companion', 'Archivist'],
    successMetrics: ['Alert TTA ≤ 5 min', 'Resolution ≤ 60 min'],
    status: 'active',
    lastExecution: '2024-02-05T14:30:00Z',
    successRate: 94,
    avgExecutionTime: '4.2 min'
  },
  {
    id: 'PB-002',
    name: 'Discharge Summary Automation',
    description: 'AI-assisted discharge documentation workflow',
    trigger: 'be12 DischargeInitiated',
    agentSequence: ['Synthesizer', 'Navigator', 'Aegis', 'Archivist'],
    successMetrics: ['Documentation time ≤ 8 min', 'Accuracy ≥ 95%'],
    status: 'active',
    lastExecution: '2024-02-05T16:45:00Z',
    successRate: 89,
    avgExecutionTime: '7.8 min'
  },
  {
    id: 'PB-003',
    name: 'Quality Audit CAPA Creation',
    description: 'Automatic CAPA generation from audit findings',
    trigger: 'be23 AuditFindingIdentified',
    agentSequence: ['Navigator', 'Aegis', 'Archivist'],
    successMetrics: ['CAPA creation ≤ 2 hours', 'Assignment accuracy 100%'],
    status: 'active',
    lastExecution: '2024-02-04T09:15:00Z',
    successRate: 96,
    avgExecutionTime: '45 min'
  },
  {
    id: 'PB-004',
    name: 'Sepsis Detection Protocol',
    description: 'Early sepsis identification and intervention',
    trigger: 'be8 SIRSCriteriaMet',
    agentSequence: ['Sentinel', 'Navigator', 'Aegis', 'Companion'],
    successMetrics: ['Detection lead time ≤ 12 min', 'False positive ≤ 15%'],
    status: 'active',
    lastExecution: '2024-02-05T11:20:00Z',
    successRate: 91,
    avgExecutionTime: '11.5 min'
  }
];

const processFlows = [
  {
    id: 'FLOW-001',
    name: 'Patient Admission → Vitals Digitization → EWS Computation',
    steps: [
      { name: 'Patient Registration', status: 'completed', duration: '2 min' },
      { name: 'Vitals Collection', status: 'completed', duration: '3 min' },
      { name: 'EWS Calculation', status: 'completed', duration: '30 sec' },
      { name: 'Risk Assessment', status: 'completed', duration: '1 min' }
    ],
    slaTarget: '7 min',
    actualTime: '6.5 min',
    status: 'completed'
  },
  {
    id: 'FLOW-002',
    name: 'Critical Lab Result → Alert → Task Routing → Escalation',
    steps: [
      { name: 'Lab Result Received', status: 'completed', duration: '0 sec' },
      { name: 'Critical Value Detection', status: 'completed', duration: '15 sec' },
      { name: 'Alert Generation', status: 'completed', duration: '30 sec' },
      { name: 'Nurse Notification', status: 'in-progress', duration: '2 min' },
      { name: 'Physician Escalation', status: 'pending', duration: null }
    ],
    slaTarget: '5 min',
    actualTime: '2.75 min',
    status: 'in-progress'
  },
  {
    id: 'FLOW-003',
    name: 'Discharge Planning → Documentation → ICD Coding',
    steps: [
      { name: 'Discharge Order', status: 'completed', duration: '1 min' },
      { name: 'Summary Generation', status: 'completed', duration: '5 min' },
      { name: 'ICD Code Suggestion', status: 'completed', duration: '2 min' },
      { name: 'Physician Review', status: 'pending', duration: null }
    ],
    slaTarget: '15 min',
    actualTime: '8 min',
    status: 'pending-review'
  },
  {
    id: 'FLOW-004',
    name: 'Quality Audit → NC Detection → CAPA Creation → Verification',
    steps: [
      { name: 'Audit Execution', status: 'completed', duration: '30 min' },
      { name: 'Finding Analysis', status: 'completed', duration: '10 min' },
      { name: 'CAPA Generation', status: 'completed', duration: '5 min' },
      { name: 'Assignment & Notification', status: 'completed', duration: '2 min' },
      { name: 'Verification Planning', status: 'pending', duration: null }
    ],
    slaTarget: '2 hours',
    actualTime: '47 min',
    status: 'completed'
  }
];

const businessEvents = [
  { id: 'be1', name: 'PatientAdmitted', category: 'Clinical', lastFired: '2024-02-05T16:45:00Z', subscribers: 3 },
  { id: 'be6', name: 'CriticalLabPosted', category: 'Laboratory', lastFired: '2024-02-05T14:30:00Z', subscribers: 5 },
  { id: 'be8', name: 'SIRSCriteriaMet', category: 'Clinical', lastFired: '2024-02-05T11:20:00Z', subscribers: 4 },
  { id: 'be12', name: 'DischargeInitiated', category: 'Administrative', lastFired: '2024-02-05T16:45:00Z', subscribers: 6 },
  { id: 'be23', name: 'AuditFindingIdentified', category: 'Quality', lastFired: '2024-02-04T09:15:00Z', subscribers: 3 },
  { id: 'be34', name: 'MedicationOrdered', category: 'Pharmacy', lastFired: '2024-02-05T15:22:00Z', subscribers: 4 },
  { id: 'be45', name: 'InfectionControlAlert', category: 'Safety', lastFired: '2024-02-03T08:30:00Z', subscribers: 2 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'pending-review': return 'bg-yellow-100 text-yellow-800';
    case 'failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function ProcessesPage() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleReplayDemo = (flowId: string) => {
    console.log('Replaying demo for flow:', flowId);
    setSelectedFlow(flowId);
  };

  const handleTriggerPlaybook = (playbookId: string) => {
    console.log('Triggering playbook:', playbookId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Business Processes & Orchestration</h1>
          <p className="text-muted-foreground mt-2">
            Automated workflows, playbooks, and business event management
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <GitBranch className="h-3 w-3" />
          {playbooks.filter(p => p.status === 'active').length} Active Playbooks
        </Badge>
      </div>

      <Tabs defaultValue="playbooks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="playbooks">Orchestration Playbooks</TabsTrigger>
          <TabsTrigger value="simulator">Process Flow Simulator</TabsTrigger>
          <TabsTrigger value="events">Business Events</TabsTrigger>
          <TabsTrigger value="analytics">Process Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="playbooks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {playbooks.map((playbook) => (
              <Card key={playbook.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{playbook.name}</CardTitle>
                      <CardDescription className="mt-1">{playbook.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(playbook.status)}>
                      {playbook.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Trigger Event:</p>
                      <Badge variant="outline" className="text-xs">
                        {playbook.trigger}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Agent Sequence:</p>
                      <div className="flex items-center gap-2">
                        {playbook.agentSequence.map((agent, index) => (
                          <div key={agent} className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {agent}
                            </Badge>
                            {index < playbook.agentSequence.length - 1 && (
                              <span className="text-muted-foreground">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Success Metrics:</p>
                      <div className="space-y-1">
                        {playbook.successMetrics.map((metric, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Target className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-muted-foreground">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{playbook.successRate}%</div>
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{playbook.avgExecutionTime}</div>
                        <p className="text-xs text-muted-foreground">Avg Time</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleTriggerPlaybook(playbook.id)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Trigger
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                Process Flow Simulator
              </CardTitle>
              <CardDescription>
                Interactive simulation of key business processes with real-time status tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {processFlows.map((flow) => (
                  <div key={flow.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{flow.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>SLA: {flow.slaTarget}</span>
                          <span>Actual: {flow.actualTime}</span>
                          <Badge className={getStatusColor(flow.status)}>
                            {flow.status}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleReplayDemo(flow.id)}
                        disabled={flow.status === 'in-progress'}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        {flow.status === 'in-progress' ? 'Running...' : 'Replay Demo'}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {flow.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            step.status === 'completed' ? 'bg-green-500' :
                            step.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                            'bg-gray-300'
                          }`} />
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-sm font-medium">{step.name}</span>
                            <div className="flex items-center gap-2">
                              {step.duration && (
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {step.duration}
                                </Badge>
                              )}
                              {step.status === 'completed' && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              {step.status === 'in-progress' && (
                                <Activity className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span>{flow.steps.filter(s => s.status === 'completed').length}/{flow.steps.length} steps</span>
                      </div>
                      <Progress 
                        value={(flow.steps.filter(s => s.status === 'completed').length / flow.steps.length) * 100} 
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-500" />
                Business Events Registry
              </CardTitle>
              <CardDescription>
                System events with subscribers and firing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {businessEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-xs">
                        {event.id}
                      </Badge>
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.subscribers} subscribers</p>
                        <p className="text-xs text-muted-foreground">
                          Last fired: {new Date(event.lastFired).toLocaleString()}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle>Event Details: {selectedEvent}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm">
{`{
  "eventId": "${selectedEvent}",
  "timestamp": "${new Date().toISOString()}",
  "payload": {
    "patientId": "PAT-***",
    "unitId": "ICU-***",
    "severity": "critical",
    "metadata": {
      "source": "HIS-Integration",
      "version": "1.2.0"
    }
  },
  "subscribers": [
    "Sentinel",
    "Aegis", 
    "Archivist"
  ]
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Total Executions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">92.5%</div>
                <p className="text-xs text-muted-foreground">Average across all playbooks</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Avg Execution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">6.8 min</div>
                <p className="text-xs text-muted-foreground">Down 23% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">SLA Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">94.2%</div>
                <p className="text-xs text-muted-foreground">Within target thresholds</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Process Performance Trends</CardTitle>
              <CardDescription>
                Execution metrics and performance analysis over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Advanced process analytics and trend visualization coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}