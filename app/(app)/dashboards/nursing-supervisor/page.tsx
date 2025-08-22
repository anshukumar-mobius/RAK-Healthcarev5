'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  User,
  Activity,
  TrendingUp,
  Shield,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAlerts, useTriggerCriticalAlert } from '@/lib/queries';
import { useAppStore } from '@/lib/store';

const patientAlerts = [
  {
    id: 'ALT-001',
    patientId: 'PAT-101',
    patientName: 'Ahmed M. (masked)',
    room: 'ICU-205',
    alertType: 'Critical Lab',
    severity: 'critical',
    message: 'Potassium level 6.8 mEq/L (Critical: >6.5)',
    timestamp: new Date(Date.now() - 300000),
    status: 'active',
    assignedTo: 'Nurse Aisha',
    escalationLevel: 1,
    timeToAcknowledge: 180, // seconds
    slaDeadline: new Date(Date.now() + 900000)
  },
  {
    id: 'ALT-002',
    patientId: 'PAT-089',
    patientName: 'Omar S. (masked)',
    room: 'ICU-203',
    alertType: 'Respiratory Distress',
    severity: 'critical',
    message: 'SpO2 85%, increased respiratory rate',
    timestamp: new Date(Date.now() - 600000),
    status: 'acknowledged',
    assignedTo: 'Nurse Fatima',
    escalationLevel: 2,
    timeToAcknowledge: 120,
    slaDeadline: new Date(Date.now() + 600000)
  },
  {
    id: 'ALT-003',
    patientId: 'PAT-156',
    patientName: 'Khalid A. (masked)',
    room: 'CARD-301',
    alertType: 'Medication Safety',
    severity: 'high',
    message: 'Potential warfarin-amiodarone interaction',
    timestamp: new Date(Date.now() - 1800000),
    status: 'resolved',
    assignedTo: 'Nurse Sara',
    escalationLevel: 1,
    timeToAcknowledge: 90,
    slaDeadline: new Date(Date.now() - 600000)
  }
];

const ewsData = [
  { patientId: 'PAT-101', name: 'Ahmed M.', room: 'ICU-205', currentScore: 8, trend: 'up', history: [4, 5, 6, 7, 8] },
  { patientId: 'PAT-089', name: 'Omar S.', room: 'ICU-203', currentScore: 6, trend: 'stable', history: [6, 6, 7, 6, 6] },
  { patientId: 'PAT-156', name: 'Khalid A.', room: 'CARD-301', currentScore: 3, trend: 'down', history: [5, 4, 4, 3, 3] },
  { patientId: 'PAT-234', name: 'Layla K.', room: 'ICU-201', currentScore: 5, trend: 'up', history: [2, 3, 4, 4, 5] }
];

const medicationAlerts = [
  {
    id: 'MED-001',
    patientId: 'PAT-178',
    patientName: 'Fatima H.',
    room: 'WARD-3-12',
    medication: 'Warfarin 5mg',
    issue: 'Dose adjustment needed - INR 3.8',
    severity: 'high',
    status: 'pending'
  },
  {
    id: 'MED-002',
    patientId: 'PAT-192',
    patientName: 'Mohammed A.',
    room: 'CARD-205',
    medication: 'Digoxin 0.25mg',
    issue: 'Drug level monitoring due',
    severity: 'medium',
    status: 'acknowledged'
  }
];

const labResponseTimes = [
  { category: 'Critical Values', avgTime: 4.2, target: 5.0, compliance: 95 },
  { category: 'Urgent Labs', avgTime: 12.5, target: 15.0, compliance: 88 },
  { category: 'Routine Labs', avgTime: 45.2, target: 60.0, compliance: 92 }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getEWSColor = (score: number) => {
  if (score >= 7) return 'text-red-600';
  if (score >= 5) return 'text-orange-600';
  if (score >= 3) return 'text-yellow-600';
  return 'text-green-600';
};

export default function NursingSupervisorDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [showWhatsAppPreview, setShowWhatsAppPreview] = useState(false);
  const [escalationSteps, setEscalationSteps] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const demo = searchParams.get('demo');
  const triggerAlert = useTriggerCriticalAlert();
  const { addAlert } = useAppStore();

  useEffect(() => {
    if (demo === 'critical-alert') {
      // Simulate escalation workflow
      setEscalationSteps([
        { id: 1, name: 'Alert Generated', status: 'completed', timestamp: new Date() },
        { id: 2, name: 'Primary Nurse Notified', status: 'completed', timestamp: new Date() },
        { id: 3, name: 'WhatsApp Sent', status: 'in-progress', timestamp: new Date() },
        { id: 4, name: 'Physician Escalation', status: 'pending', timestamp: null }
      ]);
      setShowWhatsAppPreview(true);
    }
  }, [demo]);

  const handleTriggerAlert = () => {
    triggerAlert.mutate({
      title: 'Critical Lab Alert - Potassium',
      description: 'Patient 101: Potassium level 6.8 mEq/L (Critical: >6.5)',
      patientId: 'PAT-101',
      unit: 'ICU'
    }, {
      onSuccess: (data) => {
        if (data.alert) {
          addAlert(data.alert);
        }
        setEscalationSteps([
          { id: 1, name: 'Alert Generated', status: 'completed', timestamp: new Date() },
          { id: 2, name: 'Primary Nurse Notified', status: 'in-progress', timestamp: new Date() },
          { id: 3, name: 'WhatsApp Preparation', status: 'pending', timestamp: null },
          { id: 4, name: 'Physician Escalation', status: 'pending', timestamp: null }
        ]);
        setShowWhatsAppPreview(true);
      }
    });
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
  };

  const handleEscalateAlert = (alertId: string) => {
    console.log('Escalating alert:', alertId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nursing Supervisor Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Patient safety alerts, early warning systems, and medication monitoring
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleTriggerAlert} disabled={triggerAlert.isPending}>
            {triggerAlert.isPending ? 'Triggering...' : 'Trigger Mock Critical Alert'}
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {patientAlerts.filter(a => a.status === 'active').length} Active Alerts
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Alert Center</TabsTrigger>
          <TabsTrigger value="ews">Early Warning</TabsTrigger>
          <TabsTrigger value="medication">Medication Safety</TabsTrigger>
          <TabsTrigger value="response">Response Times</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Patient-Level Alert Center (Sentinel)
                  </CardTitle>
                  <CardDescription>
                    Prioritized alerts with severity, patient info, and response timers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patientAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 border-l-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                          alert.severity === 'critical' ? 'border-l-red-500 bg-red-50' :
                          alert.severity === 'high' ? 'border-l-orange-500 bg-orange-50' :
                          'border-l-yellow-500 bg-yellow-50'
                        }`}
                        onClick={() => setSelectedAlert(alert.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{alert.alertType}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {alert.room}
                              </span>
                            </div>
                            <h4 className="font-medium mb-1">
                              {alert.patientName} - {alert.message}
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {alert.assignedTo}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                Level {alert.escalationLevel}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {alert.status === 'active' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAcknowledgeAlert(alert.id);
                                  }}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Acknowledge
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEscalateAlert(alert.id);
                                  }}
                                >
                                  <Phone className="h-3 w-3 mr-1" />
                                  Escalate
                                </Button>
                              </>
                            )}
                            {alert.status === 'acknowledged' && (
                              <Badge className="bg-blue-100 text-blue-800">
                                Acknowledged
                              </Badge>
                            )}
                            {alert.status === 'resolved' && (
                              <Badge className="bg-green-100 text-green-800">
                                Resolved
                              </Badge>
                            )}
                          </div>
                        </div>
                        {alert.status === 'active' && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Time to SLA breach:</span>
                              <span className="font-medium">
                                {Math.floor((alert.slaDeadline.getTime() - Date.now()) / 60000)}m remaining
                              </span>
                            </div>
                            <Progress 
                              value={Math.max(0, (alert.slaDeadline.getTime() - Date.now()) / (15 * 60 * 1000) * 100)} 
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Escalation Workflow */}
              {escalationSteps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Escalation Workflow (Aegis)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {escalationSteps.map((step, index) => (
                        <div key={step.id} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            step.status === 'completed' ? 'bg-green-500' :
                            step.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{step.name}</p>
                            {step.timestamp && (
                              <p className="text-xs text-muted-foreground">
                                {step.timestamp.toLocaleTimeString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* WhatsApp Preview */}
              {showWhatsAppPreview && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      PHI-Minimized WhatsApp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 p-3 rounded-lg border">
                      <p className="text-sm font-medium mb-1">🚨 RAK Hospital Alert</p>
                      <p className="text-sm">
                        Critical Lab: Patient ***-101<br/>
                        Room: ICU-***<br/>
                        K+ Level: CRITICAL<br/>
                        Assigned: Dr. S***
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Tap to access EMR (secure link)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Early Warning Score Trends (NEWS/MEWS)
              </CardTitle>
              <CardDescription>
                Per-patient early warning scores with trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ewsData.map((patient) => (
                  <Card key={patient.patientId}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{patient.name}</CardTitle>
                          <CardDescription>{patient.room}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getEWSColor(patient.currentScore)}`}>
                            {patient.currentScore}
                          </div>
                          <Badge variant="outline" className={
                            patient.trend === 'up' ? 'text-red-600' :
                            patient.trend === 'down' ? 'text-green-600' :
                            'text-gray-600'
                          }>
                            {patient.trend}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-1 h-12">
                        {patient.history.map((score, index) => (
                          <div
                            key={index}
                            className={`flex-1 rounded-t ${getEWSColor(score).replace('text-', 'bg-').replace('-600', '-200')}`}
                            style={{ height: `${(score / 10) * 100}%` }}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last 5 measurements
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Medication Safety Alerts
              </CardTitle>
              <CardDescription>
                Drug interactions, dosing alerts, and monitoring requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicationAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.patientName}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {alert.room}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>{alert.medication}</strong> - {alert.issue}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                        <Button size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Critical Lab Response Times
              </CardTitle>
              <CardDescription>
                Response time metrics and SLA compliance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {labResponseTimes.map((metric) => (
                  <div key={metric.category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{metric.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        Target: {metric.target} minutes
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold">{metric.avgTime}m</div>
                        <div className="text-sm text-muted-foreground">Average</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{metric.compliance}%</div>
                        <div className="text-sm text-muted-foreground">Compliance</div>
                      </div>
                      <Progress value={metric.compliance} className="w-20" />
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