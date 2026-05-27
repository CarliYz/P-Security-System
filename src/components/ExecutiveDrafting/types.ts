export type DraftType =
  | 'official_document'
  | 'press_release'
  | 'leadership_brief'
  | 'public_opinion_report'
  | 'sop_disposal_draft'
  | 'circulation_package';

export type DraftAudience =
  | 'internal'
  | 'minister'
  | 'president'
  | 'public_release'
  | 'inter_department';

export type DraftTone =
  | 'formal'
  | 'stable'
  | 'external_official'
  | 'internal_briefing'
  | 'high_level_concise';

export type TemplateMode =
  | 'full'
  | 'one_page'
  | 'summary'
  | 'press_format'
  | 'sop_format';

export type SecurityLevel =
  | 'internal'
  | 'restricted'
  | 'confidential';

export type IntelligenceSourceType =
  | 'social_media'
  | 'open_web'
  | 'police_internal'
  | 'video_material'
  | 'public_opinion_analysis'
  | 'case_conclusions';

export interface DraftParameterFormData {
  topic: string;
  eventTitle: string;
  audience: DraftAudience;
  tone: DraftTone;
  templateMode: TemplateMode;
  securityLevel: SecurityLevel;
  intelligenceSources: IntelligenceSourceType[];
  autoInsertConclusion: boolean;
  includeDisposalSuggestions: boolean;
  enterApprovalFlow: boolean;
  generatePrintReady: boolean;
  exportWord: boolean;
  exportPdf: boolean;
}

export type ExecutionStepStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'needs_confirmation'
  | 'failed';

export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  status: ExecutionStepStatus;
  startedAt?: string;
  finishedAt?: string;
  durationMs?: number;
  note?: string;
  sourceCount?: number;
  progressPercent?: number;
  group?: string;
}

export type DraftPreviewStatus =
  | 'drafting'
  | 'first_draft_ready'
  | 'under_review'
  | 'final_draft_ready'
  | 'ready_for_distribution';

export interface DraftSection {
  id: string;
  title: string;
  order: number;
  content: string;
  isCompleted: boolean;
  isEditable: boolean;
}

export interface DraftDocument {
  id: string;
  draftType: DraftType;
  title: string;
  summary?: string;
  sections: DraftSection[];
  finalConclusion?: string;
  generatedBy: string;
  generatedAt: string;
}

export interface DocumentTypeOption {
  id: DraftType;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  isSelected: boolean;
  recommended?: boolean;
}
