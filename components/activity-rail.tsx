'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Bell, ChevronRight, AlertTriangle, CheckCircle, Clock, AlertCircle, Info } from 'lucide-react';
import { useAlerts } from '@/lib/queries';

const activities = [
  {
    id: '1',
    type: 'alert',
    title: 'Critical Lab Result',
    description: 'Patient 101 - Potassium level critical',
    timestamp: new Date(Date.now() - 300000),
    severity: 'critical',
  },
  {
    id: '2',
    type: 'process',
    title: 'Discharge Summary',
    description: 'Automated for Patient 205',
    timestamp: new Date(Date.now() - 900000),
    severity: 'success',
  },
  {
    id: '3',
    type: 'audit',
    title: 'Quality Audit',
    description: 'Hand hygiene compliance check',
    timestamp: new Date(Date.now() - 1800000),
    severity: 'warning',
  },
  {
    id: '4',
    type: 'agent',
    title: 'Sentinel Update',
    description: 'Risk monitoring calibration',
    timestamp: new Date(Date.now() - 3600000),
    severity: 'info',
  },
];

const severityIcons = {
  critical: AlertTriangle,
  high: AlertCircle,
  medium: Clock,
  low: Info,
  success: CheckCircle,
  warning: Clock,
  info: Bell,
};

const severityColors = {
  critical: 'text-red-500',
  high: 'text-orange-500',
  medium: 'text-yellow-500',
  low: 'text-blue-400',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export function ActivityRail() {
  const [expanded, setExpanded] = useState(false);
  const { data: alerts = [] } = useAlerts();

  const recentActivities = [
    ...alerts.slice(0, 2).map(alert => ({
      id: alert.id,
      type: 'alert',
      title: alert.title,
      description: alert.description,
      timestamp: new Date(alert.timestamp),
      severity: alert.type as keyof typeof severityIcons,
    })),
    ...activities.slice(0, 6)
  ];

  return (
    <div className="w-80 border-l bg-card">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-sm font-semibold">Activity & Alerts</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = severityIcons[activity.severity];
            
            return (
              <div key={activity.id}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${severityColors[activity.severity]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs capitalize"
                      >
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                {index < recentActivities.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}