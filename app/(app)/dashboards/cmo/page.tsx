'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const riskHeatmapData = [
  { unit: 'ICU', risk: 'high', count: 3, trend: 'up' },
  { unit: 'Emergency', risk: 'medium', count: 7, trend: 'stable' },
  { unit: 'Surgery', risk: 'low', count: 2, trend: 'down' },
  { unit: 'Cardiology', risk: 'medium', count: 4, trend: 'stable' },
  { unit: 'Pediatrics', risk: 'low', count: 1, trend: 'down' },
  { unit: 'Oncology', risk: 'high', count: 5, trend: 'up' },
];

const performanceTrends = [
  { specialty: 'Cardiology', score: 92, trend: 'up', change: '+3%' },
  { specialty: 'Neurology', score: 88, trend: 'stable', change: '0%' },
  { specialty: 'Orthopedics', score: 85, trend: 'down', change: '-2%' },
  { specialty: 'Emergency', score: 91, trend: 'up', change: '+5%' },
];

const outlierActions = [
  {
    id: '1',
    outlier: 'Sepsis detection delay - ICU',
    action: 'Enhanced monitoring protocol',
    status: 'in-progress',
    owner: 'Dr. Ahmed Hassan',
    deadline: '2024-02-15'
  },
  {
    id: '2', 
    outlier: 'Medication error rate - Ward 3',
    action: 'Staff training & system update',
    status: 'completed',
    owner: 'Sarah Al-Zahra',
    deadline: '2024-01-20'
  },
  {
    id: '3',
    outlier: 'Discharge documentation time',
    action: 'AI-assisted documentation',
    status: 'planned',
    owner: 'Dr. Khalid Mansour',
    deadline: '2024-02-28'
  }
];

const jciChapters = [
  { chapter: 'Patient Safety Goals', score: 94, status: 'excellent' },
  { chapter: 'Quality & Patient Safety', score: 88, status: 'good' },
  { chapter: 'Prevention & Control', score: 92, status: 'excellent' },
  { chapter: 'Medication Management', score: 85, status: 'good' },
  { chapter: 'Clinical Records', score: 91, status: 'excellent' },
  { chapter: 'Patient Education', score: 87, status: 'good' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-blue-600'; 
    case 'warning': return 'text-yellow-600';
    case 'critical': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function CMODashboard() {
  const [showSepsisImprovement, setShowSepsisImprovement] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const searchParams = useSearchParams();
  const demo = searchParams.get('demo');

  useEffect(() => {
    if (demo === 'sepsis-improvement') {
      setShowSepsisImprovement(true);
    }
  }, [demo]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CMO Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Strategic oversight of clinical operations and quality performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="real-time"
              checked={realTimeUpdates}
              onCheckedChange={setRealTimeUpdates}
            />
            <label htmlFor="real-time" className="text-sm">
              Real-time updates
            </label>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Live
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Risk Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Risk Heatmap by Unit
              </CardTitle>
              <CardDescription>
                Navigator + Risk Impact Analyzer - Real-time risk assessment across service lines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {riskHeatmapData.map((item) => (
                  <div
                    key={item.unit}
                    className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{item.unit}</h4>
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : item.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : (
                        <Target className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <Badge className={getRiskColor(item.risk)}>
                      {item.risk.toUpperCase()}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.count} active alerts
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Clinical Performance Trends
                  </CardTitle>
                  <CardDescription>
                    Performance metrics by specialty with trend analysis
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="sepsis-improvement"
                    checked={showSepsisImprovement}
                    onCheckedChange={setShowSepsisImprovement}
                  />
                  <label htmlFor="sepsis-improvement" className="text-sm">
                    Show sepsis detection improvement
                  </label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceTrends.map((item) => (
                  <div
                    key={item.specialty}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <h4 className="font-medium">{item.specialty}</h4>
                      <p className="text-sm text-muted-foreground">
                        Overall Performance Score
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {showSepsisImprovement && item.specialty === 'Emergency' && (
                        <Badge className="bg-green-100 text-green-800">
                          Sepsis detection: -12min lead time
                        </Badge>
                      )}
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-2xl font-bold">{item.score}</span>
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                        <div className={`text-sm flex items-center gap-1 ${
                          item.trend === 'up' ? 'text-green-600' : 
                          item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {item.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : item.trend === 'down' ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : (
                            <Target className="h-3 w-3" />
                          )}
                          {item.change}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Outlier to Action Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Outlier-to-Action Pipeline
              </CardTitle>
              <CardDescription>
                Systematic tracking of outliers, actions, and improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outlierActions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.outlier}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.action}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {item.owner}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Due: {item.deadline}
                        </Badge>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Badge
                        className={
                          item.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {item.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {item.status === 'in-progress' && <Activity className="h-3 w-3 mr-1" />}
                        {item.status === 'planned' && <Clock className="h-3 w-3 mr-1" />}
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          {/* JCI Readiness Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                JCI Readiness Score by Chapter
              </CardTitle>
              <CardDescription>
                Joint Commission International compliance assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jciChapters.map((chapter) => (
                  <Card key={chapter.chapter} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{chapter.chapter}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">{chapter.score}%</div>
                          <div className={`text-sm ${getStatusColor(chapter.status)}`}>
                            {chapter.status.toUpperCase()}
                          </div>
                        </div>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                          chapter.status === 'excellent' ? 'border-green-500 text-green-500' :
                          chapter.status === 'good' ? 'border-blue-500 text-blue-500' : 
                          'border-yellow-500 text-yellow-500'
                        }`}>
                          <span className="text-sm font-bold">{chapter.score}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Deep insights into clinical performance and operational efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Advanced analytics dashboard with predictive modeling and trend analysis coming soon...
                </p>
                <Button className="mt-4">
                  Explore Navigator Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}