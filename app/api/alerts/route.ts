import { NextRequest, NextResponse } from 'next/server';

const alerts = [
  {
    id: '1',
    type: 'critical',
    title: 'Critical Lab Result - Potassium',
    description: 'Patient 101: Potassium level 6.8 mEq/L (Critical: >6.5)',
    patientId: 'PAT-101',
    patientName: 'Ahmed M. (masked)',
    unit: 'ICU',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: 'active',
    assignedTo: 'Dr. Sarah Al-Rashid',
    escalationLevel: 1,
    slaDeadline: new Date(Date.now() + 900000).toISOString()
  },
  {
    id: '2',
    type: 'high',
    title: 'Sepsis Risk Alert',
    description: 'Patient 205: SIRS criteria met, elevated lactate',
    patientId: 'PAT-205',
    patientName: 'Fatima K. (masked)',
    unit: 'Emergency',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    status: 'acknowledged',
    assignedTo: 'Dr. Ahmed Hassan',
    escalationLevel: 2,
    slaDeadline: new Date(Date.now() + 300000).toISOString()
  },
  {
    id: '3',
    type: 'medium',
    title: 'Medication Interaction',
    description: 'Patient 156: Potential warfarin-amiodarone interaction',
    patientId: 'PAT-156',
    patientName: 'Khalid A. (masked)',
    unit: 'Cardiology',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: 'resolved',
    assignedTo: 'Dr. Layla Ibrahim',
    escalationLevel: 1,
    slaDeadline: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: '4',
    type: 'critical',
    title: 'Respiratory Distress',
    description: 'Patient 089: SpO2 85%, increased respiratory rate',
    patientId: 'PAT-089',
    patientName: 'Omar S. (masked)',
    unit: 'ICU',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    status: 'active',
    assignedTo: 'Nurse Aisha Mohammed',
    escalationLevel: 2,
    slaDeadline: new Date(Date.now() + 600000).toISOString()
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  let filteredAlerts = alerts;
  
  if (type) {
    filteredAlerts = alerts.filter(alert => alert.type === type);
  }
  
  return NextResponse.json(filteredAlerts);
}