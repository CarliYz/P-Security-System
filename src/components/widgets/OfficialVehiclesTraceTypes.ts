import { ExecutionStepStatus } from '../ExecutiveDrafting/types';

export interface VehicleAnomalyCase {
  id: string;
  vehicleId: string;
  severity: 'high' | 'medium' | 'low';
  status: 'detected' | 'verified' | 'assigned' | 'maintenance' | 'reviewed' | 'archived';
  owner: string;
  elapsedTime: string;
  latestUpdate: string;
  description: string;
  triggerTime: string;
  ruleSource: string;
  delayRisk: boolean;
  suggestedAction: string;
}

export interface TraceNode {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'delayed' | 'blocked' | 'returned' | 'archived';
  duration: string;
  owner: string;
  hasWarning?: boolean;
}

export const ANOMALY_CASES: VehicleAnomalyCase[] = [
  {
    id: 'CASE-2024-001',
    vehicleId: 'KZ-777-POL',
    severity: 'high',
    status: 'maintenance',
    owner: 'A. Ivanov',
    elapsedTime: '130 Days',
    latestUpdate: '2 hours ago',
    description: 'Maintenance budget exceeds 150%; No entry records at North District Auto.',
    triggerTime: '2024-03-21 02:15:00',
    ruleSource: 'Budget & IoT Conflict Rule',
    delayRisk: true,
    suggestedAction: 'Immediate physical inspection and driver interview required.'
  },
  {
    id: 'CASE-2024-002',
    vehicleId: 'KZ-102-POL',
    severity: 'low',
    status: 'archived',
    owner: 'S. Petrov',
    elapsedTime: '2 Days',
    latestUpdate: '1 day ago',
    description: 'Routine maintenance completed ahead of schedule.',
    triggerTime: '2024-03-19 10:00:00',
    ruleSource: 'Standard Maintenance SOP',
    delayRisk: false,
    suggestedAction: 'None. Archive complete.'
  },
  {
    id: 'CASE-2024-003',
    vehicleId: 'KZ-445-POL',
    severity: 'medium',
    status: 'verified',
    owner: 'M. Kuanysh',
    elapsedTime: '45 Days',
    latestUpdate: '5 hours ago',
    description: 'Abnormal hardware wear detected via OBD.',
    triggerTime: '2024-03-20 14:30:00',
    ruleSource: 'Hardware Wear Anomaly',
    delayRisk: false,
    suggestedAction: 'Schedule technical audit.'
  }
];

export const TRACE_NODES: Record<string, TraceNode[]> = {
  'KZ-777-POL': [
    { id: '1', title: 'Detected', status: 'completed', duration: '5m', owner: 'AI_CORE' },
    { id: '2', title: 'Verified', status: 'completed', duration: '2h', owner: 'M. Sadykov' },
    { id: '3', title: 'Assigned', status: 'completed', duration: '1d', owner: 'A. Ivanov' },
    { id: '4', title: 'Maintenance', status: 'delayed', duration: '130d', owner: 'North Shop', hasWarning: true },
    { id: '5', title: 'Reviewed', status: 'pending', duration: '-', owner: 'Audit Dept' },
    { id: '6', title: 'Archived', status: 'pending', duration: '-', owner: '-' }
  ],
  'KZ-102-POL': [
    { id: '1', title: 'Detected', status: 'completed', duration: '2m', owner: 'AI_CORE' },
    { id: '2', title: 'Verified', status: 'completed', duration: '1h', owner: 'System' },
    { id: '3', title: 'Assigned', status: 'completed', duration: '1h', owner: 'S. Petrov' },
    { id: '4', title: 'Maintenance', status: 'completed', duration: '1d', owner: 'Central Shop' },
    { id: '5', title: 'Reviewed', status: 'completed', duration: '4h', owner: 'S. Petrov' },
    { id: '6', title: 'Archived', status: 'archived', duration: '10m', owner: 'System' }
  ]
};
