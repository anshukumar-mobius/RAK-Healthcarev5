'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Activity, 
  TrendingUp, 
  Settings,
  Link,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  GitBranch,
  FileText,
  Shield
} from 'lucide-react';
import { useAgent } from '@/lib/queries';
import { formatDistanceToNow } from 'date-fns';

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

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.id as string;
  const { data: agent, isLoading } = useAgent(agentId);
  const [selectedTab, setSelectedTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse text-muted-foreground">Loading agent details...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Agent not found</p>
        </div>
      </div>
    );
  }

  const TypeIcon = agentTypeIcons[agent.type as keyof typeof agentTypeIcons];
  const typeColor = agentTypeColors[agent.type as keyof typeof agentTypeColors];

  return (
    <div className="space-y-6">
      {/* Agent Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg bg-muted ${typeColor}`}>
            <TypeIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <p className="text-muted-foreground mt-1">{agent.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{agent.type}</Badge>
              <Badge variant="outline">{agent.domain}</Badge>
              <Badge className={
                agent.status === 'active' ? 'bg-green-100 text-green-800' :
                agent.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }>
                {agent.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            Monitor
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
          <TabsTrigger value="actions">Recent Actions</TabsTrigger>
          <TabsTrigger value="processes">Linked Processes</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="api">API Endpoints</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Purpose & Description */}
            <Card>
              <CardHeader>
                <CardTitle>Purpose & Function</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {agent.purpose}
                </p>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agent.kpis?.map((kpi) => (
                    <div key={kpi.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{kpi.name}</p>
                        {kpi.definition && (
                          <p className="text-xs text-muted-foreground">{kpi.definition}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {kpi.value} {kpi.unit}
                        </Badge>
                        {kpi.trend && (
                          <TrendingUp className={`h-3 w-3 ${
                            kpi.trend === 'up' ? 'text-green-500' : 
                            kpi.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                          }`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inputs & Outputs */}
            <Card>
              <CardHeader>
                <CardTitle>Data Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Inputs</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.inputs?.map((input, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {input}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Outputs</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.outputs?.map((output, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {output}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Business Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {agent.rules?.map((rule, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rule}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agent.kpis?.map((kpi) => (
              <Card key={kpi.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{kpi.name}</CardTitle>
                  {kpi.definition && (
                    <CardDescription className="text-xs">{kpi.definition}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{kpi.value}</span>
                      <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                    </div>
                    {kpi.target && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Target: {kpi.target}</span>
                          <span>{Math.round((Number(kpi.value) / kpi.target) * 100)}%</span>
                        </div>
                        <Progress value={Math.min(100, (Number(kpi.value) / kpi.target) * 100)} />
                      </div>
                    )}
                    {kpi.trend && (
                      <Badge variant="outline" className={
                        kpi.trend === 'up' ? 'text-green-600' :
                        kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }>
                        {kpi.trend === 'up' ? '↗' : kpi.trend === 'down' ? '↘' : '→'} {kpi.trend}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
              <CardDescription>
                Latest activities and decisions made by this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              {agent.recentActions ? (
                <div className="space-y-4">
                  {agent.recentActions.map((action: any) => (
                    <div key={action.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Activity className="h-4 w-4 text-blue-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{action.action}</p>
                        {action.patient && (
                          <p className="text-xs text-muted-foreground">Patient: {action.patient}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(action.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No recent actions available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Linked Business Processes</CardTitle>
              <CardDescription>
                Processes and playbooks that utilize this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              {agent.linkedProcesses ? (
                <div className="space-y-3">
                  {agent.linkedProcesses.map((process: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <GitBranch className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">{process}</span>
                      <Button size="sm" variant="outline" className="ml-auto">
                        <Link className="h-3 w-3 mr-1" />
                        View Process
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GitBranch className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No linked processes available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration (Read-Only)</CardTitle>
              <CardDescription>
                Current agent configuration and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {agent.configuration ? (
                <div className="space-y-6">
                  {Object.entries(agent.configuration).map(([section, config]) => (
                    <div key={section}>
                      <h4 className="text-sm font-medium mb-3 capitalize">
                        {section.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-xs text-muted-foreground">
                          {JSON.stringify(config, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No configuration details available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Available API endpoints for this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              {agent.apiEndpoints ? (
                <div className="space-y-3">
                  {agent.apiEndpoints.map((endpoint: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Badge variant="outline" className="font-mono text-xs">
                        {endpoint.split(' ')[0]}
                      </Badge>
                      <code className="text-sm flex-1">{endpoint.split(' ')[1]}</code>
                      <Button size="sm" variant="outline">
                        Test
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Link className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No API endpoints available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}