'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Target,
  Activity
} from 'lucide-react';

const capaData = [
  {
    id: 'CAPA-2024-001',
    title: 'Hand Hygiene Compliance - ICU',
    priority: 'high',
    status: 'in-progress',
    owner: 'Dr. Sarah Al-Rashid',
    dueDate: '2024-02-15',
    progress: 65,
    slaStatus: 'on-track',
    description: 'Improve hand hygiene compliance rates in ICU from 78% to 95%'
  },
  {
    id: 'CAPA-2024-002', 
    title: 'Medication Error Reduction - Ward 3',
    priority: 'critical',
    status: 'completed',
    owner: 'Fatima Hassan',
    dueDate: '2024-01-30',
    progress: 100,
    slaStatus: 'completed',
    description: 'Implement barcode scanning for medication administration'
  },
  {
    id: 'CAPA-2024-003',
    title: 'Patient Fall Prevention Protocol',
    priority: 'medium',
    status: 'planned',
    owner: 'Ahmed Mohammed',
    dueDate: '2024-03-01',
    progress: 15,
    slaStatus: 'at-risk',
    description: 'Update fall risk assessment and prevention protocols'
  }
];

const auditTimeline = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'JCI Mock Survey',
    status: 'completed',
    findings: 3,
    severity: 'minor',
    department: 'Emergency'
  },
  {
    id: '2',
    date: '2024-01-22',
    type: 'Internal Quality Audit',
    status: 'completed', 
    findings: 1,
    severity: 'major',
    department: 'Surgery'
  },
  {
    id: '3',
    date: '2024-02-05',
    type: 'Medication Safety Review',
    status: 'in-progress',
    findings: 0,
    severity: null,
    department: 'Pharmacy'
  },
  {
    id: '4',
    date: '2024-02-12',
    type: 'Infection Control Audit',
    status: 'scheduled',
    findings: 0,
    severity: null,
    department: 'ICU'
  }
];

const evidenceMonitor = [
  {
    category: 'Patient Safety Policies',
    total: 45,
    current: 42,
    expiring: 3,
    freshness: 93
  },
  {
    category: 'Clinical Protocols',
    total: 78,
    current: 71,
    expiring: 7,
    freshness: 91
  },
  {
    category: 'Training Records',
    total: 156,
    current: 148,
    expiring: 8,
    freshness: 95
  },
  {
    category: 'Equipment Calibration',
    total: 89,
    current: 85,
    expiring: 4,
    freshness: 96
  }
];

const attestationData = [
  { department: 'Emergency', completed: 45, total: 50, percentage: 90 },
  { department: 'ICU', completed: 28, total: 30, percentage: 93 },
  { department: 'Surgery', completed: 38, total: 42, percentage: 90 },
  { department: 'Cardiology', completed: 25, total: 28, percentage: 89 },
  { department: 'Pediatrics', completed: 22, total: 25, percentage: 88 }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'planned': return 'bg-yellow-100 text-yellow-800';
    case 'scheduled': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function QualityDashboard() {
  const [selectedCapa, setSelectedCapa] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const demo = searchParams.get('demo');

  const handleTracerExecution = () => {
    // Simulate tracer execution creating new CAPA
    console.log('Simulating tracer execution → automatic CAPA creation');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Head of Quality Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            CAPA tracking, audit compliance, and JCI readiness management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleTracerExecution}>
            Simulate Tracer Execution
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            JCI Ready
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="capa" className="space-y-6">
        <TabsList>
          <TabsTrigger value="capa">CAPA Tracking</TabsTrigger>
          <TabsTrigger value="audits">Audit Timeline</TabsTrigger>
          <TabsTrigger value="evidence">Evidence Monitor</TabsTrigger>
          <TabsTrigger value="attestation">Policy Attestation</TabsTrigger>
        </TabsList>

        <TabsContent value="capa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                CAPA Closure Tracking (Aegis Automation)
              </CardTitle>
              <CardDescription>
                Corrective and Preventive Action management with automated workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capaData.map((capa) => (
                  <div
                    key={capa.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCapa(capa.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{capa.title}</h4>
                          <Badge className={getPriorityColor(capa.priority)}>
                            {capa.priority}
                          </Badge>
                          <Badge className={getStatusColor(capa.status)}>
                            {capa.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {capa.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {capa.owner}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {capa.dueDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {capa.id}
                          </span>
                        </div>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <div className="text-2xl font-bold mb-1">{capa.progress}%</div>
                        <Progress value={capa.progress} className="w-20 mb-2" />
                        <Badge 
                          variant="outline"
                          className={
                            capa.slaStatus === 'completed' ? 'text-green-600' :
                            capa.slaStatus === 'on-track' ? 'text-blue-600' :
                            'text-red-600'
                          }
                        >
                          {capa.slaStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Audit Compliance Timeline
              </CardTitle>
              <CardDescription>
                Scheduled audits, findings, and compliance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditTimeline.map((audit, index) => (
                  <div key={audit.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${
                        audit.status === 'completed' ? 'bg-green-500' :
                        audit.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`} />
                      {index < auditTimeline.length - 1 && (
                        <div className="w-px h-12 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{audit.type}</h4>
                        <Badge className={getStatusColor(audit.status)}>
                          {audit.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{audit.date}</span>
                        <span>{audit.department}</span>
                        {audit.findings > 0 && (
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {audit.findings} findings ({audit.severity})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                Evidence Freshness Monitor
              </CardTitle>
              <CardDescription>
                Document and evidence aging with renewal thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {evidenceMonitor.map((category) => (
                  <Card key={category.category}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Current:</span>
                          <span className="font-medium">{category.current}/{category.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Expiring Soon:</span>
                          <span className={`font-medium ${
                            category.expiring > 5 ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {category.expiring}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Freshness Score:</span>
                            <span className="font-bold">{category.freshness}%</span>
                          </div>
                          <Progress value={category.freshness} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attestation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Policy Attestation Status
              </CardTitle>
              <CardDescription>
                Staff policy acknowledgment and training completion by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attestationData.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{dept.department}</h4>
                      <p className="text-sm text-muted-foreground">
                        {dept.completed} of {dept.total} staff completed
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold">{dept.percentage}%</div>
                        <Progress value={dept.percentage} className="w-20" />
                      </div>
                      <Badge className={
                        dept.percentage >= 95 ? 'bg-green-100 text-green-800' :
                        dept.percentage >= 85 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {dept.percentage >= 95 ? 'Excellent' :
                         dept.percentage >= 85 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}