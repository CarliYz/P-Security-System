export type ConfidenceLevel = 'confirmed' | 'inferred' | 'alleged';

export type EntityType =
  | 'person'
  | 'vehicle'
  | 'incident'
  | 'location'
  | 'phone'
  | 'device'
  | 'base_station'
  | 'camera'
  | 'bank_account'
  | 'transfer'
  | 'app_account'
  | 'property'
  | 'organization'
  | 'source'
  | 'call_record'
  | 'chat_event'
  | 'route_segment'
  | 'investigation_action'
  | 'hospital_record'
  | 'regulation';

export interface OntologyNode {
  id: string;
  label: string;
  sublabel?: string;
  type: EntityType;
  clusterId: string;
  confidence: ConfidenceLevel;
  riskLevel?: 'low' | 'medium' | 'high';
  status?: string;
  icon?: string;
  pinned?: boolean;
  position?: { x: number; y: number };
  meta: Record<string, any>;
}

export interface OntologyEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  confidence: ConfidenceLevel;
  relationType: string;
  weight?: number;
  clusterBridge?: boolean;
  meta?: Record<string, any>;
}

export interface OntologyCluster {
  id: string;
  name: string;
  region: 'center' | 'top' | 'left' | 'lower-left' | 'lower-right' | 'right';
  colorToken: string;
  collapsed?: boolean;
}
