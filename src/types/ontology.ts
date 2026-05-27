export type ObjectType = 'PERSON' | 'VEHICLE' | 'EVENT' | 'LOCATION' | 'ORGANIZATION';

export interface OntologyObject {
  id: string;
  type: ObjectType;
  name: string;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'UNKNOWN';
  properties: Record<string, any>;
  links: string[]; // IDs of related objects
}

export interface Scenario {
  id: string;
  name: string;
  phase: 'PRE' | 'DURING' | 'POST';
  description: string;
  children?: Scenario[];
}

export const SCENARIOS: Scenario[] = [
  { 
    id: 'police-assets', 
    name: 'Police Asset Management', 
    phase: 'PRE', 
    description: 'Full lifecycle management of internal police resources',
    children: [
      { id: 'police-vehicles', name: 'Official Vehicles', phase: 'PRE', description: 'Real-time location and status of official vehicles' },
      { id: 'police-personnel', name: 'Police Personnel', phase: 'PRE', description: 'On-duty status and distribution of police personnel' },
      { id: 'police-equipment', name: 'Police Equipment', phase: 'PRE', description: 'Inventory and usage of police equipment' },
      { id: 'traffic-network', name: 'Traffic Network', phase: 'PRE', description: 'Real-time traffic flow of city road network' },
      { id: 'anomaly-warning', name: 'Anomaly Warning', phase: 'PRE', description: 'Warning for abnormal asset usage' },
    ]
  },
  { 
    id: 'social-assets', 
    name: 'Social Asset Management', 
    phase: 'PRE', 
    description: 'Dynamic control of key social resources',
    children: [
      { id: 'key-vehicles', name: 'Key Vehicles', phase: 'PRE', description: 'Socially key controlled vehicles' },
      { id: 'key-persons', name: 'Key Persons', phase: 'PRE', description: 'Socially key controlled personnel' },
    ]
  },
  
  { id: 'global-opinion', name: 'Global Sentiment Monitoring', phase: 'DURING', description: 'Real-time monitoring of global internet sentiment' },
  { id: 'major-event-warning', name: 'Major Event Warning', phase: 'DURING', description: 'Early warning for major sudden events' },
  { id: 'key-intel', name: 'Key Intelligence Analysis', phase: 'DURING', description: 'Deep mining and analysis of core intelligence' },
  { id: 'emergency-cmd', name: 'Emergency Command', phase: 'DURING', description: 'Flat command and multi-police coordination' },

  { id: 'case-analysis', name: 'Executive Drafting Hub', phase: 'POST', description: 'Deep mining of spatio-temporal collisions and relationship graphs' },
  { id: 'performance-eval', name: 'Flow Trace & Evaluation', phase: 'POST', description: 'Full-process digital review and performance evaluation' },
];
