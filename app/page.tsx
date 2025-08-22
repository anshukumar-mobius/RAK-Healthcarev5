'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Shield, 
  FileText, 
  TrendingUp, 
  Bell,
  BarChart3,
  Bot,
  GitBranch,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const heroFeatures = [
  'Real-time patient safety alerts',
  'Automated documentation workflow', 
  'Predictive risk intervention',
  'JCI compliance automation'
];

const dashboardPreviews = [
  {
    id: 'cmo',
    title: 'CMO Dashboard',
    description: 'Strategic clinical performance oversight',
    path: '/dashboards/cmo',
    icon: BarChart3,
    metrics: ['Risk Heatmap', 'Performance Trends', 'JCI Readiness']
  },
  {
    id: 'quality',
    title: 'Head of Quality',
    description: 'CAPA tracking and audit compliance',
    path: '/dashboards/quality',
    icon: Shield,
    metrics: ['CAPA Closure', 'Audit Timeline', 'Evidence Monitor']
  },
  {
    id: 'nursing',
    title: 'Nursing Supervisor', 
    description: 'Patient safety and alert management',
    path: '/dashboards/nursing-supervisor',
    icon: Bell,
    metrics: ['Alert Center', 'EWS Trends', 'Med Safety']
  },
  {
    id: 'him',
    title: 'HIM/Coding Manager',
    description: 'Documentation integrity and coding',
    path: '/dashboards/him-coding', 
    icon: FileText,
    metrics: ['ICD-10 Queue', 'Transcription QA', 'Coding Accuracy']
  }
];

const agentShowcase = [
  {
    id: 'sentinel',
    title: 'Sentinel',
    subtitle: 'Real-Time Risk Monitor',
    description: 'Continuous patient monitoring with predictive alerting',
    metrics: [
      { label: 'Sepsis Detection', value: '12 min average lead time' },
      { label: 'ICU Early Warning', value: '94% accuracy' },
      { label: 'Alert Fatigue Reduction', value: '23% fewer false positives' }
    ],
    cta: 'Simulate Critical Lab Alert',
    path: '/agents/sentinel'
  },
  {
    id: 'navigator', 
    title: 'Navigator',
    subtitle: 'Performance Explorer',
    description: 'Advanced analytics for clinical excellence',
    metrics: [
      { label: 'Physician Benchmarking', value: 'Cross-specialty analysis' },
      { label: 'Unit Variation Analysis', value: 'KPI comparison mapping' },
      { label: 'Quality Opportunities', value: 'Improvement identification' }
    ],
    cta: 'Explore Outliers',
    path: '/agents/navigator'
  }
];

const demoScenarios = [
  {
    id: 1,
    title: 'Critical Lab Alert',
    description: 'Dr. Ahmed receives a WhatsApp alert about patient 101\'s critical potassium level within 3 minutes of the lab result, with direct EMR deep-link access.',
    icon: AlertTriangle,
    duration: '3 min',
    outcome: 'Immediate response'
  },
  {
    id: 2, 
    title: 'Discharge Documentation',
    description: 'Nurse Sara completes a discharge summary in 8 minutes using AI-assisted templates, with automatic ICD code suggestions and reconciliation checks.',
    icon: FileText,
    duration: '8 min',
    outcome: '73% time reduction'
  },
  {
    id: 3,
    title: 'Quality Audit',
    description: 'Quality Manager identifies hand hygiene non-compliance during rounds, automatically creating a CAPA for the unit HOD with 30-day closure target.',
    icon: CheckCircle,
    duration: '2 min',
    outcome: 'Automated CAPA'
  }
];

const roiMetrics = [
  { label: 'Documentation Time', before: '45 min', after: '12 min', improvement: '-73%' },
  { label: 'Alert Response', before: '15 min', after: '5 min', improvement: '-67%' },
  { label: 'Coding Accuracy', before: '78%', after: '92%', improvement: '+18%' },
  { label: 'CAPA Closure', before: '45 days', after: '23 days', improvement: '-49%' }
];

export default function LandingPage() {
  const router = useRouter();
  const { personas, setCurrentPersona } = useAppStore();

  useEffect(() => {
    // Set default persona to CMO for demo
    const cmoPersona = personas.find(p => p.id === 'cmo');
    if (cmoPersona) {
      setCurrentPersona(cmoPersona);
    }
  }, [personas, setCurrentPersona]);

  const handleDashboardPreview = (path: string) => {
    router.push(path);
  };

  const handleCriticalAlert = () => {
    const nursingPersona = personas.find(p => p.id === 'nursing-supervisor');
    if (nursingPersona) {
      setCurrentPersona(nursingPersona);
      router.push('/dashboards/nursing-supervisor?demo=critical-alert');
    }
  };

  const handleDischargeDemo = () => {
    const himPersona = personas.find(p => p.id === 'him-coding');
    if (himPersona) {
      setCurrentPersona(himPersona);
      router.push('/dashboards/him-coding?demo=discharge-summary');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4" variant="outline">
            RAK Hospital - AI Decision Support
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Transforming RAK Hospital's Clinical Excellence with{' '}
            <span className="text-primary">AI-Powered Decision Support</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            {heroFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={() => handleDashboardPreview('/dashboards/cmo')}>
              Open CMO Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={handleCriticalAlert}>
              Trigger Critical Lab Alert
            </Button>
            <Button size="lg" variant="outline" onClick={handleDischargeDemo}>
              Run Discharge Automation Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Role-Based Dashboard Demos */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Role-Based Dashboard Demos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience personalized clinical decision support tailored for each healthcare role
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardPreviews.map((dashboard) => (
            <Card key={dashboard.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <dashboard.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                    <CardDescription>{dashboard.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {dashboard.metrics.map((metric, index) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                      {metric}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleDashboardPreview(dashboard.path)}
                >
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Agent Showcase */}
      <section className="container mx-auto px-4 py-16 bg-muted/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Agent Showcase</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Intelligent AI agents powering clinical decision support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {agentShowcase.map((agent) => (
            <Card key={agent.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bot className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{agent.title}</CardTitle>
                    <CardDescription>{agent.subtitle}</CardDescription>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {agent.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {agent.metrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.label}:</span>
                      <Badge variant="outline">{metric.value}</Badge>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => router.push(agent.path)}
                >
                  {agent.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Scenarios */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Demo Scenarios & User Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world workflows showcasing AI-driven clinical improvements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoScenarios.map((scenario) => (
            <Card key={scenario.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <scenario.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {scenario.description}
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {scenario.duration}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    {scenario.outcome}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ROI Preview */}
      <section className="container mx-auto px-4 py-16 bg-muted/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ROI & Impact Metrics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Measurable improvements in clinical efficiency and patient outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {roiMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Before:</span>
                    <span>{metric.before}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">After:</span>
                    <span>{metric.after}</span>
                  </div>
                  <Badge 
                    className={`w-full justify-center ${
                      metric.improvement.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {metric.improvement}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => router.push('/roi')}>
            View Detailed ROI Analysis
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl mb-4">
              Ready to Transform RAK Hospital's Clinical Excellence?
            </CardTitle>
            <CardDescription className="text-lg">
              Explore the complete AI Decision Support platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push('/dashboards/cmo')}>
                Start with CMO Dashboard
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/agents')}>
                Explore All Agents
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/roadmap')}>
                View Implementation Roadmap
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}