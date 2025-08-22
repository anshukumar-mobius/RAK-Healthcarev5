import { NextResponse } from 'next/server';

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
    }
  },
  {
    id: 'navigator',
    name: 'Navigator', 
    type: 'explorer',
    domain: 'Performance Analytics',
    status: 'active',
    description: 'Advanced analytics platform for clinical performance exploration and benchmarking',
    purpose: 'Provide comprehensive analytics and benchmarking capabilities to identify performance variations, improvement opportunities, and best practices across the organization',
    kpis: [
      { id: 'physician-benchmarking', name: 'Physician Performance Variance', value: 'Cross-specialty analysis', unit: '', trend: 'stable' },
      { id: 'unit-variation', name: 'Unit-to-Unit KPI Variation', value: 'Mapped across 12 units', unit: '', trend: 'stable' },
      { id: 'improvement-opportunities', name: 'Quality Improvement Opportunities', value: '18 identified', unit: 'opportunities', trend: 'up' }
    ],
    inputs: ['Clinical outcomes', 'Process metrics', 'Cost data', 'Quality indicators'],
    outputs: ['Performance reports', 'Benchmark comparisons', 'Improvement recommendations', 'Trend forecasts'],
    rules: ['Statistical variation detection', 'Outlier identification', 'Peer comparison algorithms', 'Improvement opportunity scoring'],
    dashboards: ['CMO', 'Quality Manager', 'Department Heads'],
    lastActive: new Date().toISOString(),
    metrics: {
      coverage: 'Cross-specialty analysis',
      variation: 'KPI variation analysis',
      opportunities: 'Quality improvement mapping'
    }
  },
  {
    id: 'aegis',
    name: 'Aegis',
    type: 'coordinator', 
    domain: 'Workflow Orchestration',
    status: 'active',
    description: 'Intelligent workflow coordination and task automation system',
    purpose: 'Orchestrate complex clinical workflows, automate routine tasks, and ensure seamless coordination between different departments and systems',
    kpis: [
      { id: 'workflow-automation', name: 'Workflow Automation Rate', value: '78', unit: '%', trend: 'up', target: 80 },
      { id: 'task-completion', name: 'Task Completion Time', value: '32', unit: '% reduction', trend: 'down', target: 30 },
      { id: 'coordination-efficiency', name: 'Coordination Efficiency', value: '89', unit: '%', trend: 'up', target: 85 }
    ],
    inputs: ['Workflow triggers', 'Task queues', 'User preferences', 'System status'],
    outputs: ['Automated workflows', 'Task assignments', 'Progress tracking', 'Exception handling'],
    rules: ['Priority-based routing', 'Load balancing', 'SLA enforcement', 'Escalation protocols'],
    dashboards: ['Operations Manager', 'Department Supervisors', 'IT Administrator'],
    lastActive: new Date().toISOString()
  },
  {
    id: 'synthesizer',
    name: 'Synthesizer',
    type: 'synthesizer',
    domain: 'Documentation',
    status: 'active', 
    description: 'AI-powered clinical documentation synthesis and automation',
    purpose: 'Transform clinical data into comprehensive, accurate documentation while reducing manual effort and improving consistency',
    kpis: [
      { id: 'documentation-time', name: 'Documentation Time Reduction', value: '73', unit: '% reduction', trend: 'down', target: 70 },
      { id: 'accuracy-improvement', name: 'Documentation Accuracy', value: '96', unit: '%', trend: 'up', target: 95 },
      { id: 'template-usage', name: 'AI Template Adoption', value: '84', unit: '%', trend: 'up', target: 80 }
    ],
    inputs: ['Clinical data', 'Patient records', 'Voice notes', 'Structured templates'],
    outputs: ['Discharge summaries', 'Progress notes', 'Treatment plans', 'ICD code suggestions'],
    rules: ['Clinical documentation guidelines', 'ICD-10 mapping', 'Template matching', 'Quality validation'],
    dashboards: ['HIM/Coding Manager', 'Clinical Documentation', 'Quality Assurance'],
    lastActive: new Date().toISOString()
  },
  {
    id: 'archivist',
    name: 'Archivist',
    type: 'archivist',
    domain: 'Audit & Compliance',
    status: 'active',
    description: 'Comprehensive audit trail and compliance monitoring system',
    purpose: 'Maintain detailed audit trails, ensure compliance with regulations, and provide complete transparency for all system activities',
    kpis: [
      { id: 'audit-coverage', name: 'Audit Trail Coverage', value: '100', unit: '%', trend: 'stable', target: 100 },
      { id: 'compliance-score', name: 'Compliance Score', value: '97', unit: '%', trend: 'up', target: 95 },
      { id: 'evidence-availability', name: 'Evidence Availability', value: '99.8', unit: '%', trend: 'stable', target: 99 }
    ],
    inputs: ['System logs', 'User actions', 'Data changes', 'Access records'],
    outputs: ['Audit reports', 'Compliance dashboards', 'Evidence packages', 'Access logs'],
    rules: ['HIPAA compliance', 'JCI requirements', 'Data retention policies', 'Access control validation'],
    dashboards: ['Security Officer', 'Compliance Manager', 'Quality Assurance'],
    lastActive: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json(agents);
}