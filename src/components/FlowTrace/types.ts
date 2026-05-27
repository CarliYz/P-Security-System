export type FlowType =
  | 'all'
  | 'social'
  | 'web'
  | 'police_internal'
  | 'escalation'
  | 'cross_system';

export type SourceCategory = 'social' | 'web' | 'internal';

export interface SourceItem {
  id: string;
  category: SourceCategory;
  sourceType: string;
  title: string;
  firstSeenAt: string;
  extractedSignal: string;
  confidence: 'low' | 'medium' | 'high' | 'verified';
  enteredVia: string;
  chainId: string;
  tags: string[];
}

export interface FlowLane {
  id: string;
  label: string;
  shortLabel?: string;
  order: number;
  type: 'external' | 'analysis' | 'district' | 'municipal' | 'provincial' | 'ministerial';
}

export type NodeStatus = 'completed' | 'delayed' | 'waiting' | 'optimized' | 'blocked';

export interface FlowNode {
  id: string;
  chainId: string;
  laneId: string;
  title: string;
  subtitle?: string;
  enterAt: string;
  exitAt?: string;
  durationMs: number;
  owner: string;
  action: string;
  status: NodeStatus;
  approvalCount: number;
  systemName: string;
  delayReason?: string;
  isBottleneck?: boolean;
  sourceIds: string[];
  outputNodeIds: string[];
  x?: number;
  y?: number;
}

export interface FlowEdge {
  id: string;
  chainId: string;
  source: string;
  target: string;
  relation: 'forwarded' | 'reviewed' | 'merged' | 'escalated' | 'held' | 'returned';
  transferMs?: number;
  isCriticalPath?: boolean;
}

export interface FlowChain {
  id: string;
  name: string;
  type: FlowType;
  sourceId: string;
  startAt: string;
  endAt?: string;
  totalDurationMs: number;
  escalationLevel: string;
  nodeIds: string[];
  edgeIds: string[];
  status: 'open' | 'completed' | 'delayed';
}

export interface BottleneckItem {
  nodeId: string;
  label: string;
  laneLabel: string;
  durationMs: number;
  reason: string;
  savingsPotentialMs: number;
  severity: 'low' | 'medium' | 'high';
}

export interface LayerTimingItem {
  laneId: string;
  laneLabel: string;
  totalMs: number;
  avgMs: number;
  maxMs: number;
  count: number;
}

export interface ApprovalFrictionItem {
  label: string;
  laneLabel: string;
  approvalCount: number;
  extraDelayMs: number;
}

export interface OptimizationOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  estimatedSavingsMs: number;
}

export interface FlowKpiItem {
  key: string;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'flat';
  tone?: 'default' | 'danger' | 'success' | 'warning';
}

export interface FlowTraceEventMeta {
  eventId: string;
  title: string;
  location: string;
  startedAt: string;
  endedAt?: string;
  flowMode: 'POST';
}

export interface FlowTraceMockData {
  event: FlowTraceEventMeta;
  kpis: FlowKpiItem[];
  lanes: FlowLane[];
  sources: SourceItem[];
  nodes: FlowNode[];
  edges: FlowEdge[];
  chains: FlowChain[];
  bottlenecks: BottleneckItem[];
  layerTimings: LayerTimingItem[];
  repeatedApprovals: ApprovalFrictionItem[];
  optimizationOptions: OptimizationOption[];
  reportingData?: ReportingBoardData;
}

export interface ReportingBoardData {
  kpis: FlowKpiItem[];
  zones: ReportingZone[];
  connections: ReportingConnection[];
}

export interface ReportingZone {
  id: string;
  title: string;
  subtitle?: string;
  order: number;
  cards: ReportingCardData[];
}

export interface ReportingCardData {
  id: string;
  zoneId: string;
  title: string;
  owner: string;
  status: NodeStatus | 'rejected';
  totalDurationLabel: string;
  totalDurationMs: number;
  steps?: ReportingStep[];
  summaryItems?: string[];
  isDetailed?: boolean;
  isBottleneck?: boolean;
  delayReason?: string;
  returnReason?: string;
  lostTimeLabel?: string;
}

export interface ReportingStep {
  id: string;
  label: string;
  status: NodeStatus | 'rejected';
  durationLabel: string;
  durationMs: number;
  executor?: string;
  notes?: string;
}

export interface ReportingConnection {
  id: string;
  sourceCardId: string;
  targetCardId: string;
  type: 'forward' | 'reverse';
  label?: string;
  durationLabel?: string;
  tone: 'neutral' | 'danger';
}
