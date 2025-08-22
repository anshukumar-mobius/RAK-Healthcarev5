import { NextRequest, NextResponse } from 'next/server';

const agents = [
  {
    id: 'sentinel',
    name: 'Sentinel',
    type: 'monitor',
    domain: 'Patient Safety',
    status: 'active',
    description: 'Real-time patient monitoring and risk detection system',
    purpose: 'Continuous surveillance of patient vital signs, lab results, and clinical indicators to provide early warning alerts and prevent adverse events',
    kpis: [
      { id: 'sepsis-detection', name: 'Sepsis Detection Lead Time', value: '12', unit: 'minutes', trend: 'down', target: 15 },
      { id: 'icu-accuracy', name: 'ICU Early Warning Accuracy', value: '94', unit: '%', trend: 'up', target: 90 },
      { id: 'alert-fatigue', name: 'Alert Fatigue Reduction', value: '23', unit: '% fewer false positives', trend: 'down', target: 20 }
    ],
    inputs: ['Vital signs', 'Lab results', 'Medication orders', 'Clinical notes'],
    outputs: ['Critical alerts', 'Risk scores', 'Trend analysis', 'Escalation notifications'],
    rules: ['SIRS criteria detection', 'NEWS/MEWS scoring', 'Drug interaction checking', 'Critical value thresholds'],
    dashboards: ['Nursing Supervisor', 'CMO', 'Emergency Department'],
    lastActive: new Date().toISOString(),
    metrics: {
      accuracy: '94%',
      leadTime: '12 min average',
      reduction: '23% fewer false positives'
    },
    recentActions: [
      { id: '1', timestamp: new Date(Date.now() - 300000).toISOString(), action: 'Critical potassium alert triggered', patient: 'Patient 101' },
      { id: '2', timestamp: new Date(Date.now() - 900000).toISOString(), action: 'Sepsis risk detected', patient: 'Patient 205' },
      { id: '3', timestamp: new Date(Date.now() - 1800000).toISOString(), action: 'Drug interaction warning', patient: 'Patient 156' }
    ],
    linkedProcesses: ['PB-001: Critical Lab Alert Pipeline', 'PB-005: Sepsis Detection Protocol', 'PB-012: Medication Safety Check'],
    configuration: {
      alertThresholds: {
        'Critical Lab Values': 'Immediate',
        'Sepsis Risk Score': '>= 6',
        'Drug Interactions': 'Major only'
      },
      escalationRules: {
        'Level 1': 'Primary nurse notification',
        'Level 2': 'Physician alert + 5min delay',
        'Level 3': 'Supervisor escalation + 15min'
      }
    },
    apiEndpoints: [
      'GET /api/agents/sentinel/status',
      'POST /api/agents/sentinel/alerts',
      'GET /api/agents/sentinel/metrics',
      'PUT /api/agents/sentinel/config'
    ]
  },
  // Add other agents as needed...
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const agent = agents.find(a => a.id === params.id);
  
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
  }

  return NextResponse.json(agent);
}