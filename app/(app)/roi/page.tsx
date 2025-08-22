'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Clock,
  Target,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  Activity
} from 'lucide-react';

const beforeAfterMetrics = [
  {
    category: 'Documentation Time',
    before: { value: 45, unit: 'min', description: 'Manual discharge summary creation' },
    after: { value: 12, unit: 'min', description: 'AI-assisted with templates' },
    improvement: -73,
    impact: 'High',
    annualSavings: '$2.4M'
  },
  {
    category: 'Alert Response Time',
    before: { value: 15, unit: 'min', description: 'Manual notification and escalation' },
    after: { value: 5, unit: 'min', description: 'Automated WhatsApp alerts' },
    improvement: -67,
    impact: 'Critical',
    annualSavings: '$1.8M'
  },
  {
    category: 'Coding Accuracy',
    before: { value: 78, unit: '%', description: 'Manual ICD-10 coding' },
    after: { value: 92, unit: '%', description: 'AI-powered code suggestions' },
    improvement: 18,
    impact: 'High',
    annualSavings: '$3.2M'
  },
  {
    category: 'CAPA Closure Time',
    before: { value: 45, unit: 'days', description: 'Manual tracking and follow-up' },
    after: { value: 23, unit: 'days', description: 'Automated workflow management' },
    improvement: -49,
    impact: 'Medium',
    annualSavings: '$0.8M'
  },
  {
    category: 'Sepsis Detection Lead Time',
    before: { value: 24, unit: 'min', description: 'Manual vital sign monitoring' },
    after: { value: 12, unit: 'min', description: 'Real-time AI monitoring' },
    improvement: -50,
    impact: 'Critical',
    annualSavings: '$4.1M'
  },
  {
    category: 'Quality Audit Efficiency',
    before: { value: 8, unit: 'hours', description: 'Manual audit and reporting' },
    after: { value: 3, unit: 'hours', description: 'Automated evidence collection' },
    improvement: -63,
    impact: 'Medium',
    annualSavings: '$1.2M'
  }
];

const rakSpecificKPIs = [
  {
    id: 'news-mews-digitization',
    name: 'NEWS/MEWS Digitization Coverage',
    current: 87,
    target: 95,
    priority: 'Phase 1',
    description: 'Automated early warning score calculation and monitoring',
    status: 'on-track',
    timeline: 'Q2 2024'
  },
  {
    id: 'discharge-automation',
    name: 'Discharge Summary Automation',
    current: 65,
    target: 90,
    priority: 'Phase 1',
    description: 'AI-assisted discharge documentation workflow',
    status: 'in-progress',
    timeline: 'Q1 2024'
  },
  {
    id: 'telemedicine-coding',
    name: 'Telemedicine Coding Readiness',
    current: 78,
    target: 85,
    priority: 'Phase 2',
    description: 'Automated coding for telemedicine consultations',
    status: 'planned',
    timeline: 'Q3 2024'
  },
  {
    id: 'claims-precheck',
    name: 'Claims Precheck Pass Rate',
    current: 89,
    target: 95,
    priority: 'Phase 3',
    description: 'Automated claims validation before submission',
    status: 'planned',
    timeline: 'Q4 2024'
  },
  {
    id: 'jci-compliance',
    name: 'JCI Compliance Automation',
    current: 82,
    target: 95,
    priority: 'Phase 1',
    description: 'Automated evidence collection and compliance tracking',
    status: 'on-track',
    timeline: 'Q2 2024'
  },
  {
    id: 'medication-safety',
    name: 'Medication Safety Alerts',
    current: 91,
    target: 98,
    priority: 'Phase 1',
    description: 'Real-time drug interaction and dosing alerts',
    status: 'completed',
    timeline: 'Q1 2024'
  }
];

const costBenefitAnalysis = {
  implementation: {
    year1: 2.8,
    year2: 1.2,
    year3: 0.8,
    total: 4.8
  },
  benefits: {
    year1: 4.2,
    year2: 8.7,
    year3: 12.3,
    total: 25.2
  },
  roi: {
    year1: 50,
    year2: 625,
    year3: 1438,
    cumulative: 425
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'on-track': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'planned': return 'bg-gray-100 text-gray-800';
    case 'at-risk': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'Critical': return 'text-red-600';
    case 'High': return 'text-orange-600';
    case 'Medium': return 'text-yellow-600';
    case 'Low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

export default function ROIPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3-year');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const totalAnnualSavings = beforeAfterMetrics.reduce((sum, metric) => 
    sum + parseFloat(metric.annualSavings.replace('$', '').replace('M', '')), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ROI & Impact Metrics</h1>
          <p className="text-muted-foreground mt-2">
            Measurable improvements in clinical efficiency and patient outcomes
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            ${totalAnnualSavings.toFixed(1)}M Annual Savings
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="before-after" className="space-y-6">
        <TabsList>
          <TabsTrigger value="before-after">Before vs After</TabsTrigger>
          <TabsTrigger value="rak-kpis">RAK-Specific KPIs</TabsTrigger>
          <TabsTrigger value="cost-benefit">Cost-Benefit Analysis</TabsTrigger>
          <TabsTrigger value="attribution">Outcome Attribution</TabsTrigger>
        </TabsList>

        <TabsContent value="before-after" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {beforeAfterMetrics.map((metric, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.category}</CardTitle>
                    <Badge className={`${getImpactColor(metric.impact)} bg-opacity-10`}>
                      {metric.impact} Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Before/After Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg border">
                        <p className="text-xs text-muted-foreground mb-1">BEFORE</p>
                        <div className="text-2xl font-bold text-red-600">
                          {metric.before.value} {metric.before.unit}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {metric.before.description}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg border">
                        <p className="text-xs text-muted-foreground mb-1">AFTER</p>
                        <div className="text-2xl font-bold text-green-600">
                          {metric.after.value} {metric.after.unit}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {metric.after.description}
                        </p>
                      </div>
                    </div>

                    {/* Improvement Badge */}
                    <div className="text-center">
                      <Badge className={`text-lg px-4 py-2 ${
                        metric.improvement > 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {metric.improvement > 0 ? '+' : ''}{metric.improvement}% 
                        {metric.improvement > 0 ? ' Improvement' : ' Reduction'}
                      </Badge>
                    </div>

                    {/* Annual Savings */}
                    <div className="text-center pt-2 border-t">
                      <p className="text-sm text-muted-foreground">Estimated Annual Savings</p>
                      <p className="text-xl font-bold text-green-600">{metric.annualSavings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Overall Impact Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">${totalAnnualSavings.toFixed(1)}M</div>
                  <p className="text-sm text-muted-foreground">Total Annual Savings</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">-52%</div>
                  <p className="text-sm text-muted-foreground">Average Time Reduction</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">+18%</div>
                  <p className="text-sm text-muted-foreground">Quality Improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">425%</div>
                  <p className="text-sm text-muted-foreground">3-Year ROI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rak-kpis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rakSpecificKPIs.map((kpi) => (
              <Card key={kpi.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{kpi.name}</CardTitle>
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardDescription>{kpi.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Progress</span>
                        <span className="font-medium">{kpi.current}% of {kpi.target}%</span>
                      </div>
                      <Progress value={(kpi.current / kpi.target) * 100} />
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{kpi.current}%</div>
                        <p className="text-xs text-muted-foreground">Current</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{kpi.target}%</div>
                        <p className="text-xs text-muted-foreground">Target</p>
                      </div>
                    </div>

                    {/* Timeline and Priority */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <Badge variant="outline">{kpi.priority}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {kpi.timeline}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cost-benefit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-red-500" />
                  Implementation Investment
                </CardTitle>
                <CardDescription>
                  Phased investment over 3-year implementation period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Year 1 (Phase 1)</p>
                      <p className="text-sm text-muted-foreground">Core systems & Sentinel</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">${costBenefitAnalysis.implementation.year1}M</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Year 2 (Phase 2)</p>
                      <p className="text-sm text-muted-foreground">Navigator & advanced analytics</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">${costBenefitAnalysis.implementation.year2}M</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Year 3 (Phase 3)</p>
                      <p className="text-sm text-muted-foreground">Full automation & scaling</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">${costBenefitAnalysis.implementation.year3}M</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">Total Investment</p>
                      <p className="text-xl font-bold text-red-600">${costBenefitAnalysis.implementation.total}M</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Cumulative Benefits
                </CardTitle>
                <CardDescription>
                  Projected savings and efficiency gains over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Year 1 Benefits</p>
                      <p className="text-sm text-muted-foreground">Early wins & quick improvements</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${costBenefitAnalysis.benefits.year1}M</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Year 2 Benefits</p>
                      <p className="text-sm text-muted-foreground">Scaled automation impact</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${costBenefitAnalysis.benefits.year2}M</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Year 3 Benefits</p>
                      <p className="text-sm text-muted-foreground">Full system optimization</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">${costBenefitAnalysis.benefits.year3}M</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">Total Benefits</p>
                      <p className="text-xl font-bold text-green-600">${costBenefitAnalysis.benefits.total}M</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROI Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Return on Investment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{costBenefitAnalysis.roi.year1}%</div>
                  <p className="text-sm text-muted-foreground">Year 1 ROI</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{costBenefitAnalysis.roi.year2}%</div>
                  <p className="text-sm text-muted-foreground">Year 2 ROI</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{costBenefitAnalysis.roi.year3}%</div>
                  <p className="text-sm text-muted-foreground">Year 3 ROI</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{costBenefitAnalysis.roi.cumulative}%</div>
                  <p className="text-sm text-muted-foreground">3-Year Cumulative ROI</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="font-medium text-green-800">Investment Payback</p>
                </div>
                <p className="text-sm text-green-700">
                  Full investment recovery achieved in <strong>14 months</strong> with continued returns thereafter.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Executive Outcome Attribution
              </CardTitle>
              <CardDescription>
                Direct attribution of improvements to specific AI interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Sentinel Agent Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Sepsis Detection:</span>
                          <Badge className="bg-green-100 text-green-800">-50% lead time</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Alert Response:</span>
                          <Badge className="bg-blue-100 text-blue-800">-67% response time</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">False Positives:</span>
                          <Badge className="bg-purple-100 text-purple-800">-23% reduction</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Synthesizer Agent Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Documentation Time:</span>
                          <Badge className="bg-green-100 text-green-800">-73% reduction</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Coding Accuracy:</span>
                          <Badge className="bg-blue-100 text-blue-800">+18% improvement</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Template Adoption:</span>
                          <Badge className="bg-purple-100 text-purple-800">84% usage</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Aegis Coordinator Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">CAPA Closure:</span>
                          <Badge className="bg-green-100 text-green-800">-49% faster</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Workflow Automation:</span>
                          <Badge className="bg-blue-100 text-blue-800">78% automated</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Task Completion:</span>
                          <Badge className="bg-purple-100 text-purple-800">-32% time</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="font-medium mb-4">Key Success Factors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Real-time Processing</p>
                        <p className="text-sm text-muted-foreground">
                          Sub-second response times for critical alerts and decision support
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Workflow Integration</p>
                        <p className="text-sm text-muted-foreground">
                          Seamless integration with existing clinical workflows and systems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Evidence-based Decisions</p>
                        <p className="text-sm text-muted-foreground">
                          All recommendations backed by clinical evidence and best practices
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Continuous Learning</p>
                        <p className="text-sm text-muted-foreground">
                          AI models continuously improve based on outcomes and feedback
                        </p>
                      </div>
                    </div>
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