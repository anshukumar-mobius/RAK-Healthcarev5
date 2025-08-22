'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Bot, 
  CheckCircle, 
  Clock,
  TrendingUp,
  AlertTriangle,
  User,
  Calendar,
  Target,
  Activity,
  Mic,
  Play
} from 'lucide-react';
import { useTriggerDischargeWorkflow } from '@/lib/queries';

const codingQueue = [
  {
    id: 'ICD-001',
    patientId: 'PAT-205',
    patientName: 'Fatima K. (masked)',
    admissionDate: '2024-01-28',
    dischargeDate: '2024-02-01',
    primaryDiagnosis: 'Pneumonia',
    aiSuggestion: 'J18.9 - Pneumonia, unspecified organism',
    confidence: 92,
    status: 'pending-review',
    coder: 'Layla Ibrahim',
    priority: 'high'
  },
  {
    id: 'ICD-002',
    patientId: 'PAT-178',
    patientName: 'Ahmed S. (masked)',
    admissionDate: '2024-01-30',
    dischargeDate: '2024-02-02',
    primaryDiagnosis: 'Acute MI',
    aiSuggestion: 'I21.9 - Acute myocardial infarction, unspecified',
    confidence: 88,
    status: 'in-progress',
    coder: 'Sara Al-Mansouri',
    priority: 'critical'
  },
  {
    id: 'ICD-003',
    patientId: 'PAT-192',
    patientName: 'Omar M. (masked)',
    admissionDate: '2024-01-25',
    dischargeDate: '2024-01-29',
    primaryDiagnosis: 'Diabetes complications',
    aiSuggestion: 'E11.9 - Type 2 diabetes mellitus without complications',
    confidence: 76,
    status: 'needs-review',
    coder: 'Khalid Hassan',
    priority: 'medium'
  }
];

const transcriptionBatches = [
  {
    id: 'BATCH-001',
    date: '2024-02-05',
    totalFiles: 45,
    processed: 42,
    qualityScore: 94,
    status: 'processing',
    estimatedCompletion: '14:30'
  },
  {
    id: 'BATCH-002',
    date: '2024-02-04',
    totalFiles: 38,
    processed: 38,
    qualityScore: 96,
    status: 'completed',
    estimatedCompletion: 'Completed'
  },
  {
    id: 'BATCH-003',
    date: '2024-02-03',
    totalFiles: 52,
    processed: 52,
    qualityScore: 91,
    status: 'completed',
    estimatedCompletion: 'Completed'
  }
];

const telemedicineQuality = [
  {
    provider: 'Dr. Sarah Al-Rashid',
    specialty: 'Cardiology',
    sessions: 28,
    documentationScore: 94,
    codingAccuracy: 92,
    avgSessionTime: '18 min'
  },
  {
    provider: 'Dr. Ahmed Hassan',
    specialty: 'Internal Medicine',
    sessions: 35,
    documentationScore: 89,
    codingAccuracy: 88,
    avgSessionTime: '22 min'
  },
  {
    provider: 'Dr. Fatima Al-Zahra',
    specialty: 'Pediatrics',
    sessions: 22,
    documentationScore: 96,
    codingAccuracy: 94,
    avgSessionTime: '16 min'
  }
];

const codingAccuracyTrends = [
  { month: 'Oct', accuracy: 78, target: 85 },
  { month: 'Nov', accuracy: 82, target: 85 },
  { month: 'Dec', accuracy: 86, target: 85 },
  { month: 'Jan', accuracy: 89, target: 85 },
  { month: 'Feb', accuracy: 92, target: 85 }
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
    case 'processing': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'pending-review': return 'bg-yellow-100 text-yellow-800';
    case 'needs-review': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function HIMCodingDashboard() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [showTranscriptionDemo, setShowTranscriptionDemo] = useState(false);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const searchParams = useSearchParams();
  const demo = searchParams.get('demo');
  const triggerDischarge = useTriggerDischargeWorkflow();

  useEffect(() => {
    if (demo === 'discharge-summary') {
      handleDischargeDemo();
    }
  }, [demo]);

  const handleDischargeDemo = () => {
    triggerDischarge.mutate('PAT-DEMO-001', {
      onSuccess: (data) => {
        console.log('Discharge workflow triggered:', data);
      }
    });
  };

  const handleTranscriptionDemo = () => {
    setShowTranscriptionDemo(true);
    setTranscriptionProgress(0);
    
    // Simulate real-time transcription
    const interval = setInterval(() => {
      setTranscriptionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleAcceptSuggestion = (caseId: string) => {
    console.log('Accepting AI suggestion for case:', caseId);
  };

  const handleRejectSuggestion = (caseId: string) => {
    console.log('Rejecting AI suggestion for case:', caseId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">HIM/Coding Manager Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Medical coding, documentation integrity, and transcription quality management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleTranscriptionDemo}>
            Real-time Transcription Demo
          </Button>
          <Button onClick={handleDischargeDemo} disabled={triggerDischarge.isPending}>
            {triggerDischarge.isPending ? 'Processing...' : 'Discharge Automation Demo'}
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {codingQueue.filter(c => c.status === 'pending-review').length} Pending Review
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="coding" className="space-y-6">
        <TabsList>
          <TabsTrigger value="coding">ICD-10 Queue</TabsTrigger>
          <TabsTrigger value="transcription">Transcription Monitor</TabsTrigger>
          <TabsTrigger value="telemedicine">Telemedicine Quality</TabsTrigger>
          <TabsTrigger value="trends">Accuracy Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="coding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                ICD-10 Coding Queue with AI Suggestions
              </CardTitle>
              <CardDescription>
                AI-powered coding suggestions with confidence scores and validation workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {codingQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCase(item.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{item.patientName}</h4>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <span>Admission: {item.admissionDate}</span>
                          <span>Discharge: {item.dischargeDate}</span>
                          <span>Primary Dx: {item.primaryDiagnosis}</span>
                          <span>Coder: {item.coder}</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">AI Suggestion:</span>
                            <Badge variant="outline" className="text-blue-700">
                              {item.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm font-mono">{item.aiSuggestion}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcceptSuggestion(item.id);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRejectSuggestion(item.id);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                    {item.confidence < 80 && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-yellow-800">
                            Low confidence - Manual review recommended
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Transcription Demo */}
          {showTranscriptionDemo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-red-500" />
                  Real-time Transcription with Live ICD Tagging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Playing Audio
                    </Button>
                    <Progress value={transcriptionProgress} className="flex-1" />
                    <span className="text-sm text-muted-foreground">{transcriptionProgress}%</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm font-mono leading-relaxed">
                      "Patient presented with chest pain and shortness of breath. 
                      <span className="bg-blue-100 px-1 rounded">ECG showed ST elevation</span> in leads II, III, and aVF. 
                      <span className="bg-green-100 px-1 rounded">Troponin levels elevated</span>. 
                      Diagnosis: <span className="bg-yellow-100 px-1 rounded font-semibold">Acute inferior myocardial infarction</span>."
                    </p>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Live ICD Suggestions:</p>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800">I21.19 - Acute inferior STEMI</Badge>
                        <Badge className="bg-green-100 text-green-800">95% confidence</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="transcription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Batch Transcription Integrity Monitor
              </CardTitle>
              <CardDescription>
                File batch processing with quality flags and completion tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {transcriptionBatches.map((batch) => (
                  <Card key={batch.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{batch.id}</CardTitle>
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </div>
                      <CardDescription>{batch.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress:</span>
                          <span className="font-medium">
                            {batch.processed}/{batch.totalFiles}
                          </span>
                        </div>
                        <Progress value={(batch.processed / batch.totalFiles) * 100} />
                        <div className="flex justify-between text-sm">
                          <span>Quality Score:</span>
                          <span className={`font-medium ${
                            batch.qualityScore >= 95 ? 'text-green-600' :
                            batch.qualityScore >= 90 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {batch.qualityScore}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Completion:</span>
                          <span className="font-medium">{batch.estimatedCompletion}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telemedicine" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Telemedicine Documentation Quality
              </CardTitle>
              <CardDescription>
                Provider-specific quality scorecards for telemedicine sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {telemedicineQuality.map((provider) => (
                  <div key={provider.provider} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{provider.provider}</h4>
                        <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                      </div>
                      <Badge variant="outline">
                        {provider.sessions} sessions
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {provider.documentationScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Documentation</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {provider.codingAccuracy}%
                        </div>
                        <p className="text-xs text-muted-foreground">Coding Accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {provider.avgSessionTime}
                        </div>
                        <p className="text-xs text-muted-foreground">Avg Session</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Coding Accuracy Trends
              </CardTitle>
              <CardDescription>
                Monthly coding accuracy with baseline and target comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end gap-2 h-40">
                  {codingAccuracyTrends.map((month, index) => (
                    <div key={month.month} className="flex-1 flex flex-col items-center">
                      <div className="flex flex-col items-center gap-1 mb-2">
                        <div
                          className="w-full bg-blue-500 rounded-t"
                          style={{ height: `${(month.accuracy / 100) * 120}px` }}
                        />
                        <div
                          className="w-full border-2 border-dashed border-gray-400 rounded"
                          style={{ height: `${(month.target / 100) * 120}px`, marginTop: `-${(month.target / 100) * 120}px` }}
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{month.accuracy}%</div>
                        <div className="text-xs text-muted-foreground">{month.month}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                    <span>Actual Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dashed border-gray-400 rounded" />
                    <span>Target (85%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}