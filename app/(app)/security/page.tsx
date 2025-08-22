'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Eye,
  FileText,
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Database,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const auditLogs = [
  {
    id: 'AUD-001',
    timestamp: new Date(Date.now() - 300000),
    userId: 'dr.sarah.alrashid',
    userName: 'Dr. Sarah Al-Rashid',
    action: 'Viewed Patient Record',
    resource: 'Patient PAT-***-101',
    details: 'Accessed critical lab results via mobile alert',
    ipAddress: '192.168.1.***',
    userAgent: 'Mobile App v2.1.0',
    riskLevel: 'low'
  },
  {
    id: 'AUD-002',
    timestamp: new Date(Date.now() - 900000),
    userId: 'nurse.aisha.mohammed',
    userName: 'Nurse Aisha Mohammed',
    action: 'Updated Patient Status',
    resource: 'Patient PAT-***-089',
    details: 'Acknowledged critical respiratory alert',
    ipAddress: '192.168.1.***',
    userAgent: 'Workstation Chrome v120',
    riskLevel: 'low'
  },
  {
    id: 'AUD-003',
    timestamp: new Date(Date.now() - 1800000),
    userId: 'system.sentinel',
    userName: 'Sentinel Agent',
    action: 'Generated Alert',
    resource: 'Critical Lab Alert Pipeline',
    details: 'Potassium level 6.8 mEq/L detected and escalated',
    ipAddress: 'internal',
    userAgent: 'AI Agent v1.2.0',
    riskLevel: 'low'
  },
  {
    id: 'AUD-004',
    timestamp: new Date(Date.now() - 3600000),
    userId: 'admin.it.support',
    userName: 'IT Support Admin',
    action: 'System Configuration',
    resource: 'Agent Configuration',
    details: 'Updated Sentinel alert thresholds',
    ipAddress: '192.168.1.***',
    userAgent: 'Admin Console v1.0.0',
    riskLevel: 'medium'
  }
];

const phiProtectionMeasures = [
  {
    id: 'data-encryption',
    name: 'Data Encryption at Rest & Transit',
    status: 'active',
    compliance: 100,
    description: 'AES-256 encryption for all PHI data storage and transmission',
    lastAudit: '2024-02-01',
    controls: ['Database encryption', 'API encryption', 'File system encryption']
  },
  {
    id: 'access-controls',
    name: 'Role-Based Access Controls',
    status: 'active',
    compliance: 98,
    description: 'Granular permissions based on clinical roles and responsibilities',
    lastAudit: '2024-02-01',
    controls: ['User authentication', 'Role permissions', 'Session management']
  },
  {
    id: 'phi-minimization',
    name: 'PHI Minimization in Communications',
    status: 'active',
    compliance: 95,
    description: 'Automated masking of identifiers in external communications',
    lastAudit: '2024-01-28',
    controls: ['WhatsApp masking', 'SMS anonymization', 'Email filtering']
  },
  {
    id: 'audit-logging',
    name: 'Comprehensive Audit Logging',
    status: 'active',
    compliance: 100,
    description: 'Complete audit trail of all PHI access and modifications',
    lastAudit: '2024-02-01',
    controls: ['Access logging', 'Change tracking', 'Export monitoring']
  }
];

const rbacMatrix = [
  {
    role: 'CMO',
    permissions: ['View All Dashboards', 'System Analytics', 'Strategic Reports', 'User Management'],
    restrictions: ['No Direct Patient Access', 'No System Configuration'],
    dataAccess: 'Aggregated Only'
  },
  {
    role: 'Head of Quality',
    permissions: ['Quality Dashboards', 'CAPA Management', 'Audit Reports', 'Evidence Library'],
    restrictions: ['Limited Patient Details', 'No Financial Data'],
    dataAccess: 'Quality Metrics'
  },
  {
    role: 'Nursing Supervisor',
    permissions: ['Patient Alerts', 'Clinical Data', 'Medication Alerts', 'EWS Monitoring'],
    restrictions: ['Unit-Specific Only', 'No Administrative Data'],
    dataAccess: 'Clinical Data'
  },
  {
    role: 'HIM/Coding Manager',
    permissions: ['Coding Queue', 'Documentation', 'ICD Suggestions', 'Transcription'],
    restrictions: ['Coding-Related Only', 'No Real-time Alerts'],
    dataAccess: 'Documentation'
  }
];

const jciEvidence = [
  {
    chapter: 'Patient Safety Goals',
    evidenceCount: 45,
    lastUpdated: '2024-02-05',
    completeness: 94,
    status: 'ready',
    keyEvidence: ['Hand hygiene compliance', 'Medication reconciliation', 'Fall prevention']
  },
  {
    chapter: 'Quality & Patient Safety',
    evidenceCount: 38,
    lastUpdated: '2024-02-04',
    completeness: 91,
    status: 'ready',
    keyEvidence: ['Quality indicators', 'Patient safety events', 'Improvement activities']
  },
  {
    chapter: 'Prevention & Control',
    evidenceCount: 52,
    lastUpdated: '2024-02-03',
    completeness: 96,
    status: 'ready',
    keyEvidence: ['Infection control', 'Surveillance data', 'Outbreak management']
  },
  {
    chapter: 'Medication Management',
    evidenceCount: 41,
    lastUpdated: '2024-02-02',
    completeness: 88,
    status: 'in-progress',
    keyEvidence: ['Medication errors', 'High-alert medications', 'Pharmacy oversight']
  }
];

const phiCommunicationSamples = [
  {
    type: 'WhatsApp Alert',
    original: 'Critical Lab: Ahmed Mohammed Al-Rashid, Room ICU-205, Potassium 6.8 mEq/L',
    masked: '🚨 Critical Lab: Patient ***-101, Room ICU-***, K+ Level: CRITICAL',
    protection: 'Name masked, Room partially masked, Specific values generalized'
  },
  {
    type: 'SMS Notification',
    original: 'Discharge ready: Fatima Hassan Al-Zahra, DOB 15/03/1985, MRN 12345678',
    masked: 'Discharge ready: Patient ***-205, DOB **/**/19**, MRN ****5678',
    protection: 'Name masked, DOB year only, MRN partially masked'
  },
  {
    type: 'Email Summary',
    original: 'Quality audit findings for Dr. Khalid Mansour - 3 non-conformances identified',
    masked: 'Quality audit findings for Provider K.M. - 3 non-conformances identified',
    protection: 'Provider name abbreviated, clinical details preserved'
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'high': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'ready': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'warning': return 'bg-yellow-100 text-yellow-800';
    case 'error': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function SecurityPage() {
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security & Compliance</h1>
          <p className="text-muted-foreground mt-2">
            PHI protection, audit trails, RBAC management, and JCI compliance evidence
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            HIPAA Compliant
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            JCI Ready
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="phi-protection" className="space-y-6">
        <TabsList>
          <TabsTrigger value="phi-protection">PHI Protection</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
          <TabsTrigger value="rbac">RBAC Management</TabsTrigger>
          <TabsTrigger value="jci-evidence">JCI Evidence</TabsTrigger>
        </TabsList>

        <TabsContent value="phi-protection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PHI Protection Measures */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-500" />
                    PHI Protection Measures
                  </CardTitle>
                  <CardDescription>
                    Comprehensive data protection and privacy controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {phiProtectionMeasures.map((measure) => (
                      <div key={measure.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{measure.name}</h4>
                          <Badge className={getStatusColor(measure.status)}>
                            {measure.compliance}% compliant
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {measure.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Compliance Score</span>
                            <span>{measure.compliance}%</span>
                          </div>
                          <Progress value={measure.compliance} />
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-1">Active Controls:</p>
                          <div className="flex flex-wrap gap-1">
                            {measure.controls.map((control, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {control}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* PHI-Minimized Communication Samples */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    PHI-Minimized Communications
                  </CardTitle>
                  <CardDescription>
                    Examples of automated PHI masking in external communications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {phiCommunicationSamples.map((sample, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center gap-2">
                          {sample.type.includes('WhatsApp') && <Smartphone className="h-4 w-4 text-green-600" />}
                          {sample.type.includes('SMS') && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          {sample.type.includes('Email') && <FileText className="h-4 w-4 text-purple-600" />}
                          <h4 className="font-medium">{sample.type}</h4>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-600 font-medium mb-1">ORIGINAL (Internal Only)</p>
                            <p className="text-sm font-mono">{sample.original}</p>
                          </div>
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-xs text-green-600 font-medium mb-1">MASKED (External)</p>
                            <p className="text-sm font-mono">{sample.masked}</p>
                          </div>
                        </div>
                        
                        <div className="p-2 bg-blue-50 rounded text-xs text-blue-700">
                          <strong>Protection Applied:</strong> {sample.protection}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Complete Audit Trail (Archivist)
              </CardTitle>
              <CardDescription>
                Comprehensive logging of all system activities and PHI access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedLog(log.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          log.riskLevel === 'low' ? 'bg-green-500' :
                          log.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <h4 className="font-medium">{log.action}</h4>
                          <p className="text-sm text-muted-foreground">{log.resource}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getRiskColor(log.riskLevel)} bg-opacity-10`}>
                          {log.riskLevel} risk
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">User:</span> {log.userName}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {log.ipAddress}
                      </div>
                    </div>
                    
                    <p className="text-sm mt-2">{log.details}</p>
                    
                    {selectedLog === log.id && (
                      <div className="mt-4 pt-4 border-t bg-muted p-3 rounded">
                        <h5 className="font-medium mb-2">Detailed Information</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Audit ID:</span> {log.id}
                          </div>
                          <div>
                            <span className="font-medium">User Agent:</span> {log.userAgent}
                          </div>
                          <div>
                            <span className="font-medium">Timestamp:</span> {log.timestamp.toISOString()}
                          </div>
                          <div>
                            <span className="font-medium">Session ID:</span> sess_***{Math.random().toString(36).substr(2, 6)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rbac" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                Role-Based Access Control Matrix
              </CardTitle>
              <CardDescription>
                Granular permissions and data access controls by clinical role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rbacMatrix.map((role, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedRole(role.role)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-lg">{role.role}</h4>
                      <Badge variant="outline">{role.dataAccess}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-green-700 mb-2">✓ Permissions</h5>
                        <div className="space-y-1">
                          {role.permissions.map((permission, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-sm">{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-red-700 mb-2">✗ Restrictions</h5>
                        <div className="space-y-1">
                          {role.restrictions.map((restriction, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              <span className="text-sm">{restriction}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {selectedRole === role.role && (
                      <div className="mt-4 pt-4 border-t">
                        <h5 className="font-medium mb-2">Data Access Scope</h5>
                        <p className="text-sm text-muted-foreground">
                          This role has access to <strong>{role.dataAccess}</strong> level data with the above permissions and restrictions applied.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jci-evidence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                JCI Evidence Library Management
              </CardTitle>
              <CardDescription>
                Automated evidence collection and compliance documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jciEvidence.map((chapter) => (
                  <Card key={chapter.chapter}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{chapter.chapter}</CardTitle>
                        <Badge className={getStatusColor(chapter.status)}>
                          {chapter.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{chapter.evidenceCount}</div>
                            <p className="text-xs text-muted-foreground">Evidence Items</p>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{chapter.completeness}%</div>
                            <p className="text-xs text-muted-foreground">Complete</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Readiness Score</span>
                            <span>{chapter.completeness}%</span>
                          </div>
                          <Progress value={chapter.completeness} />
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Key Evidence Areas:</p>
                          <div className="flex flex-wrap gap-1">
                            {chapter.keyEvidence.map((evidence, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {evidence}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Last updated: {chapter.lastUpdated}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Policy Attestation Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Policy Attestation Tracking
              </CardTitle>
              <CardDescription>
                Staff acknowledgment and training completion status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Overall Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">91%</div>
                      <p className="text-sm text-muted-foreground">Staff Completed</p>
                      <Progress value={91} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Pending Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">23</div>
                      <p className="text-sm text-muted-foreground">Staff Pending</p>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800">Due This Week</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Policy Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">5</div>
                      <p className="text-sm text-muted-foreground">Recent Updates</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-800">This Month</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}