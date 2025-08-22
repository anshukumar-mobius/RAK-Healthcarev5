'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Search, 
  Filter,
  Activity,
  TrendingUp,
  Shield,
  FileText,
  GitBranch,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAgents, useTriggerCriticalAlert } from '@/lib/queries';
import { useAppStore } from '@/lib/store';

const agentTypeIcons = {
  monitor: AlertTriangle,
  explorer: Eye,
  coordinator: GitBranch,
  synthesizer: FileText,
  archivist: Shield,
};

const agentTypeColors = {
  monitor: 'text-red-500',
  explorer: 'text-blue-500', 
  coordinator: 'text-purple-500',
  synthesizer: 'text-green-500',
  archivist: 'text-orange-500',
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
};

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const router = useRouter();
  const { data: agents = [], isLoading } = useAgents();
  const triggerAlert = useTriggerCriticalAlert();
  const { addAlert } = useAppStore();

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || agent.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCriticalAlert = (agentId: string) => {
    if (agentId === 'sentinel') {
      triggerAlert.mutate({
        title: 'Critical Lab Alert - Demo',
        description: 'Simulated critical potassium level for demonstration',
        patientId: 'PAT-DEMO-001',
        unit: 'ICU'
      }, {
        onSuccess: (data) => {
          if (data.alert) {
            addAlert(data.alert);
          }
          router.push('/dashboards/nursing-supervisor?demo=critical-alert');
        }
      });
    }
  };

  const handleExploreOutliers = () => {
    router.push('/dashboards/cmo?demo=outliers');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse text-muted-foreground">Loading agents...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Agents</h1>
          <p className="text-muted-foreground mt-2">
            Intelligent automation powering RAK Hospital's clinical decision support
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Bot className="h-3 w-3" />
          {agents.filter(a => a.status === 'active').length} Active Agents
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search agents by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Types</option>
                <option value="monitor">Monitor</option>
                <option value="explorer">Explorer</option>
                <option value="coordinator">Coordinator</option>
                <option value="synthesizer">Synthesizer</option>
                <option value="archivist">Archivist</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="showcase" className="space-y-6">
        <TabsList>
          <TabsTrigger value="showcase">Featured Agents</TabsTrigger>
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="showcase" className="space-y-6">
          {/* Featured Agent Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sentinel Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Sentinel</CardTitle>
                    <CardDescription>Real-Time Risk Monitor</CardDescription>
                  </div>
                  <Badge className={statusColors.active}>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Continuous patient monitoring with predictive alerting capabilities
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sepsis Detection:</span>
                    <Badge variant="outline" className="text-green-700 bg-green-50">
                      12 min average lead time
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">ICU Early Warning:</span>
                    <Badge variant="outline" className="text-blue-700 bg-blue-50">
                      94% accuracy
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Alert Fatigue Reduction:</span>
                    <Badge variant="outline" className="text-purple-700 bg-purple-50">
                      23% fewer false positives
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleCriticalAlert('sentinel')}
                    disabled={triggerAlert.isPending}
                  >
                    {triggerAlert.isPending ? 'Triggering...' : 'Simulate Critical Lab Alert'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/agents/sentinel')}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Navigator Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Navigator</CardTitle>
                    <CardDescription>Performance Explorer</CardDescription>
                  </div>
                  <Badge className={statusColors.active}>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Advanced analytics for clinical excellence and benchmarking
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Physician Benchmarking:</span>
                    <Badge variant="outline" className="text-indigo-700 bg-indigo-50">
                      Cross-specialty analysis
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Unit Variation Analysis:</span>
                    <Badge variant="outline" className="text-teal-700 bg-teal-50">
                      KPI comparison mapping
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Quality Opportunities:</span>
                    <Badge variant="outline" className="text-emerald-700 bg-emerald-50">
                      Improvement identification
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={handleExploreOutliers}
                  >
                    Explore Outliers
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/agents/navigator')}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          {/* All Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => {
              const TypeIcon = agentTypeIcons[agent.type as keyof typeof agentTypeIcons];
              const typeColor = agentTypeColors[agent.type as keyof typeof agentTypeColors];
              
              return (
                <Card key={agent.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${typeColor}`}>
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription>{agent.domain}</CardDescription>
                      </div>
                      <Badge className={statusColors[agent.status as keyof typeof statusColors]}>
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {agent.description}
                    </p>
                    
                    {agent.kpis && agent.kpis.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {agent.kpis.slice(0, 2).map((kpi) => (
                          <div key={kpi.id} className="flex justify-between items-center text-sm">
                            <span className="font-medium">{kpi.name}:</span>
                            <Badge variant="outline">
                              {kpi.value} {kpi.unit}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => router.push(`/agents/${agent.id}`)}
                      >
                        View Details
                      </Button>
                      {agent.lastActive && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredAgents.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No agents found matching your criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Overview</CardTitle>
              <CardDescription>
                Aggregate performance metrics across all active agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">99.2%</div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">847</div>
                  <p className="text-sm text-muted-foreground">Alerts Generated (24h)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">23%</div>
                  <p className="text-sm text-muted-foreground">False Positive Reduction</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">156</div>
                  <p className="text-sm text-muted-foreground">Workflows Automated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}