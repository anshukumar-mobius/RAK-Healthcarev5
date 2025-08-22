'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Shield,
  Activity,
  Bot,
  Database,
  BarChart3
} from 'lucide-react';

const roadmapPhases = [
  {
    id: 'phase-1',
    name: 'Phase 1: Foundation & Critical Systems',
    timeline: 'Months 1-3 (Q1 2024)',
    status: 'in-progress',
    progress: 75,
    budget: '$2.8M',
    description: 'Core infrastructure, HIS integration, and critical alert systems',
    keyDeliverables: [
      {
        name: 'HIS Integration (Sage-MIMSYS)',
        status: 'completed',
        description: 'Primary hospital information system connectivity',
        impact: 'Foundation for all data flows'
      },
      {
        name: 'Sentinel Agent Deployment',
        status: 'completed',
        description: 'Real-time patient monitoring and critical alerts',
        impact: '50% reduction in sepsis detection time'
      },
      {
        name: 'Discharge Summary Automation',
        status: 'in-progress',
        description: 'AI-assisted documentation workflow',
        impact: '73% reduction in documentation time'
      },
      {
        name: 'WhatsApp Alert Integration',
        status: 'completed',
        description: 'PHI-minimized mobile notifications',
        impact: '67% faster alert response'
      }
    ],
    risks: [
      { risk: 'HIS integration complexity', mitigation: 'Dedicated integration team', status: 'mitigated' },
      { risk: 'Staff training requirements', mitigation: 'Phased rollout approach', status: 'monitoring' }
    ]
  },
  {
    id: 'phase-2',
    name: 'Phase 2: Analytics & Workflow Automation',
    timeline: 'Months 4-6 (Q2 2024)',
    status: 'planned',
    progress: 15,
    budget: '$1.2M',
    description: 'Advanced analytics, predictive capabilities, and quality management',
    keyDeliverables: [
      {
        name: 'Navigator Analytics Platform',
        status: 'planned',
        description: 'Performance benchmarking and outlier detection',
        impact: 'Data-driven quality improvements'
      },
      {
        name: 'Predictive Risk Scoring',
        status: 'planned',
        description: 'ML-powered patient risk assessment',
        impact: 'Proactive intervention capabilities'
      },
      {
        name: 'Quality Management Automation',
        status: 'planned',
        description: 'Automated CAPA creation and tracking',
        impact: '49% faster CAPA closure'
      },
      {
        name: 'Telemedicine Documentation',
        status: 'planned',
        description: 'Specialized coding for virtual consultations',
        impact: '85% coding readiness for telemedicine'
      }
    ],
    risks: [
      { risk: 'Data quality requirements', mitigation: 'Enhanced validation rules', status: 'planned' },
      { risk: 'Change management', mitigation: 'Comprehensive training program', status: 'planned' }
    ]
  },
  {
    id: 'phase-3',
    name: 'Phase 3: Advanced Automation & Scaling',
    timeline: 'Months 7-9 (Q3-Q4 2024)',
    status: 'planned',
    progress: 0,
    budget: '$0.8M',
    description: 'Full automation, claims integration, and performance optimization',
    keyDeliverables: [
      {
        name: 'Claims Precheck Integration',
        status: 'planned',
        description: 'Automated claims validation before submission',
        impact: '95% claims pass rate target'
      },
      {
        name: 'Advanced Workflow Automation',
        status: 'planned',
        description: 'End-to-end process automation',
        impact: '78% workflow automation rate'
      },
      {
        name: 'ROI Measurement & Scaling',
        status: 'planned',
        description: 'Comprehensive impact measurement',
        impact: '425% cumulative ROI achievement'
      },
      {
        name: 'Multi-site Preparation',
        status: 'planned',
        description: 'Framework for scaling to other facilities',
        impact: 'Scalable architecture foundation'
      }
    ],
    risks: [
      { risk: 'Integration complexity', mitigation: 'Modular architecture approach', status: 'planned' },
      { risk: 'Performance optimization', mitigation: 'Continuous monitoring', status: 'planned' }
    ]
  }
];

const milestones = [
  {
    id: 'M1',
    name: 'HIS Integration Complete',
    date: '2024-01-15',
    status: 'completed',
    phase: 'Phase 1',
    description: 'Sage-MIMSYS integration with 99.2% reliability achieved'
  },
  {
    id: 'M2',
    name: 'Sentinel Agent Live',
    date: '2024-01-30',
    status: 'completed',
    phase: 'Phase 1',
    description: 'Real-time monitoring active across ICU and Emergency'
  },
  {
    id: 'M3',
    name: 'Mobile Alerts Deployed',
    date: '2024-02-10',
    status: 'completed',
    phase: 'Phase 1',
    description: 'WhatsApp integration with PHI protection active'
  },
  {
    id: 'M4',
    name: 'Discharge Automation Beta',
    date: '2024-02-28',
    status: 'in-progress',
    phase: 'Phase 1',
    description: 'AI-assisted documentation in pilot departments'
  },
  {
    id: 'M5',
    name: 'Navigator Platform Launch',
    date: '2024-04-15',
    status: 'planned',
    phase: 'Phase 2',
    description: 'Advanced analytics and benchmarking capabilities'
  },
  {
    id: 'M6',
    name: 'Quality Automation Live',
    date: '2024-05-30',
    status: 'planned',
    phase: 'Phase 2',
    description: 'Automated CAPA creation and tracking system'
  }
];

const dependencies = [
  {
    from: 'HIS Integration',
    to: 'Sentinel Agent',
    type: 'technical',
    status: 'resolved',
    description: 'Data connectivity required for real-time monitoring'
  },
  {
    from: 'Sentinel Agent',
    to: 'Mobile Alerts',
    type: 'functional',
    status: 'resolved',
    description: 'Alert generation needed for notification system'
  },
  {
    from: 'Discharge Automation',
    to: 'Navigator Analytics',
    type: 'data',
    status: 'active',
    description: 'Documentation data feeds analytics platform'
  },
  {
    from: 'Navigator Analytics',
    to: 'Quality Automation',
    type: 'insights',
    status: 'planned',
    description: 'Performance insights drive quality improvements'
  }
];

const successMetrics = [
  {
    category: 'Clinical Impact',
    metrics: [
      { name: 'Sepsis Detection Lead Time', target: '≤12 minutes', current: '12 min', status: 'achieved' },
      { name: 'Alert Response Time', target: '≤5 minutes', current: '5 min', status: 'achieved' },
      { name: 'Documentation Time', target: '≤12 minutes', current: '12 min', status: 'achieved' }
    ]
  },
  {
    category: 'Quality Metrics',
    metrics: [
      { name: 'Coding Accuracy', target: '≥92%', current: '92%', status: 'achieved' },
      { name: 'CAPA Closure Time', target: '≤25 days', current: '23 days', status: 'achieved' },
      { name: 'JCI Compliance Score', target: '≥95%', current: '91%', status: 'in-progress' }
    ]
  },
  {
    category: 'Financial Impact',
    metrics: [
      { name: 'Annual Cost Savings', target: '$13.5M', current: '$8.3M', status: 'in-progress' },
      { name: 'ROI Achievement', target: '425%', current: '180%', status: 'in-progress' },
      { name: 'Implementation Budget', target: '≤$4.8M', current: '$2.1M', status: 'on-track' }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'planned': return 'bg-gray-100 text-gray-800';
    case 'achieved': return 'bg-green-100 text-green-800';
    case 'on-track': return 'bg-blue-100 text-blue-800';
    case 'at-risk': return 'bg-yellow-100 text-yellow-800';
    case 'delayed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'gantt'>('timeline');

  const overallProgress = roadmapPhases.reduce((sum, phase) => sum + phase.progress, 0) / roadmapPhases.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Implementation Roadmap</h1>
          <p className="text-muted-foreground mt-2">
            Phased deployment timeline with milestones, dependencies, and success metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {Math.round(overallProgress)}% Complete
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="phases" className="space-y-6">
        <TabsList>
          <TabsTrigger value="phases">Implementation Phases</TabsTrigger>
          <TabsTrigger value="milestones">Milestones & Timeline</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="phases" className="space-y-6">
          <div className="space-y-6">
            {roadmapPhases.map((phase) => (
              <Card key={phase.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{phase.name}</CardTitle>
                      <CardDescription className="mt-1">{phase.timeline}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-2">{phase.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(phase.status)}>
                        {phase.status.replace('-', ' ')}
                      </Badge>
                      <p className="text-sm font-medium mt-1">{phase.budget}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span className="font-medium">{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} />
                    </div>

                    {/* Key Deliverables */}
                    <div>
                      <h4 className="font-medium mb-3">Key Deliverables</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.keyDeliverables.map((deliverable, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-sm">{deliverable.name}</h5>
                              <Badge className={getStatusColor(deliverable.status)} variant="outline">
                                {deliverable.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {deliverable.description}
                            </p>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3 text-blue-500" />
                              <span className="text-xs font-medium text-blue-700">
                                {deliverable.impact}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risks & Mitigation */}
                    <div>
                      <h4 className="font-medium mb-3">Risk Management</h4>
                      <div className="space-y-2">
                        {phase.risks.map((risk, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex-1">
                              <span className="text-sm font-medium">{risk.risk}</span>
                              <p className="text-xs text-muted-foreground">{risk.mitigation}</p>
                            </div>
                            <Badge variant="outline" className={getStatusColor(risk.status)}>
                              {risk.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Project Timeline & Milestones
              </CardTitle>
              <CardDescription>
                Key milestones and delivery dates across all implementation phases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Timeline Visualization */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={milestone.id} className="relative flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white ${
                          milestone.status === 'completed' ? 'border-green-500' :
                          milestone.status === 'in-progress' ? 'border-blue-500' :
                          'border-gray-300'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : milestone.status === 'in-progress' ? (
                            <Activity className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{milestone.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{milestone.phase}</Badge>
                              <Badge className={getStatusColor(milestone.status)}>
                                {milestone.status.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {milestone.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Target Date: {new Date(milestone.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                Project Dependencies & Critical Path
              </CardTitle>
              <CardDescription>
                Inter-component dependencies and delivery sequencing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dependencies.map((dep, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="p-2 bg-blue-100 rounded">
                        <Database className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{dep.from}</span>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <div className="h-px bg-gray-300 w-8" />
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {dep.type}
                          </span>
                          <div className="h-px bg-gray-300 w-8" />
                        </div>
                      </div>
                      <div className="p-2 bg-green-100 rounded">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">{dep.to}</span>
                    </div>
                    <Badge className={getStatusColor(dep.status)}>
                      {dep.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Critical Path Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  The critical path runs through HIS Integration → Sentinel Agent → Navigator Analytics → Quality Automation. 
                  Any delays in these components will impact the overall project timeline.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="space-y-6">
            {successMetrics.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.category === 'Clinical Impact' && <Activity className="h-5 w-5 text-red-500" />}
                    {category.category === 'Quality Metrics' && <Shield className="h-5 w-5 text-blue-500" />}
                    {category.category === 'Financial Impact' && <DollarSign className="h-5 w-5 text-green-500" />}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.metrics.map((metric, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">{metric.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Target:</span>
                              <span className="font-medium">{metric.target}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Current:</span>
                              <span className="font-bold text-lg">{metric.current}</span>
                            </div>
                            <Badge className={getStatusColor(metric.status)} variant="outline">
                              {metric.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                Overall Implementation Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{Math.round(overallProgress)}%</div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {milestones.filter(m => m.status === 'completed').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Milestones Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">$2.1M</div>
                  <p className="text-sm text-muted-foreground">Budget Utilized</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">180%</div>
                  <p className="text-sm text-muted-foreground">Current ROI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}