import { DocumentTypeOption, ExecutionStep, DraftSection } from './types';

export const DRAFT_TYPES: DocumentTypeOption[] = [
  {
    id: 'official_document',
    title: 'Official Document',
    description: 'Generate official documents, requests, notices, reports, and circulation files',
    isSelected: false,
    color: '#3b82f6' // Blue
  },
  {
    id: 'press_release',
    title: 'Press Release',
    description: 'Generate press releases for public opinion events, authoritative bulletins, and public statements',
    isSelected: true,
    recommended: true,
    color: '#ef4444' // Red
  },
  {
    id: 'leadership_brief',
    title: 'Leadership Brief',
    description: 'Generate high-level summary materials for ministers, the president, or special task forces',
    isSelected: false,
    color: '#f59e0b' // Amber
  },
  {
    id: 'public_opinion_report',
    title: 'Public Opinion Report',
    description: 'Generate special reports on public opinion dissemination, focus points, risks, and response suggestions',
    isSelected: false,
    color: '#8b5cf6' // Purple
  },
  {
    id: 'sop_disposal_draft',
    title: 'SOP Disposal Draft',
    description: 'Generate response suggestions and action drafts based on police SOPs',
    isSelected: false,
    color: '#10b981' // Green
  },
  {
    id: 'circulation_package',
    title: 'Circulation Package',
    description: 'Generate materials for countersigning, approval, distribution, printing, and archiving',
    isSelected: false,
    color: '#64748b' // Slate
  }
];

export const PRESS_RELEASE_STEPS: ExecutionStep[] = [
  {
    id: '1',
    title: 'Receive Press Release Request',
    description: 'Identified draft type as "Public Opinion Event Press Release"',
    status: 'pending',
    group: 'initialization'
  },
  {
    id: '2',
    title: 'Load Press Release Templates & Rules',
    description: 'Matched media release templates and police SOP public expression rules',
    status: 'pending',
    group: 'initialization'
  },
  {
    id: '3',
    title: 'Read Social Media, Web, Video & Police Sources',
    description: 'Summarizing multi-source intelligence inputs and performing validity screening',
    status: 'pending',
    sourceCount: 46,
    group: 'intelligence'
  },
  {
    id: '4',
    title: 'Extract Core Event Elements',
    description: 'Extracted time, location, personnel, vehicles, disposal actions, and status info',
    status: 'pending',
    group: 'intelligence'
  },
  {
    id: '5',
    title: 'Draft Press Release via Police SOP Structure',
    description: 'Constructing title, lead, event details, disposal progress, and official conclusions',
    status: 'pending',
    group: 'drafting'
  },
  {
    id: '6',
    title: 'Optimize Wording & Clean Sensitive Content',
    description: 'Performing wording correction, consistency checks, and sensitive info removal',
    status: 'pending',
    group: 'polishing'
  },
  {
    id: '7',
    title: 'Generate Final Press Release',
    description: 'Generated publishable version and synced to preview, print, save, and distribution areas',
    status: 'pending',
    group: 'finalization'
  }
];

export const OFFICIAL_DOC_STEPS: ExecutionStep[] = [
  { id: 'o1', title: 'Receive Official Document Task', description: 'Identified draft type: Reporting Material', status: 'pending' },
  { id: 'o2', title: 'Identify Document Category', description: 'Matched request/report/supervision/notice specifications', status: 'pending' },
  { id: 'o3', title: 'Read Matter Background & Event Materials', description: 'Extracted matter background and previous situation summary', status: 'pending' },
  { id: 'o4', title: 'Extract Reporting Items & Handling Advice', description: 'Generated primary recipient and document title', status: 'pending' },
  { id: 'o5', title: 'Generate Body via Official Format', description: 'Arranging body structure and handling suggestions', status: 'pending' },
  { id: 'o6', title: 'Correct Style & Wording Standards', description: 'Completed official style correction', status: 'pending' },
  { id: 'o7', title: 'Generate Final Official Draft', description: 'Initial official draft generated', status: 'pending' }
];

export const LEADERSHIP_BRIEF_STEPS: ExecutionStep[] = [
  { id: 'l1', title: 'Receive Leadership Briefing Task', description: 'Identified briefing target: Presidential Brief', status: 'pending' },
  { id: 'l2', title: 'Compress Intelligence into Executive Summary', description: 'Compressing multi-source intelligence into executive-readable summary', status: 'pending' },
  { id: 'l3', title: 'Identify Key Points for Leadership', description: 'Extracted 4 key points requiring leadership attention', status: 'pending' },
  { id: 'l4', title: 'Generate "Situation-Judgment-Advice" Structure', description: 'Generating "Situation-Judgment-Advice" structure', status: 'pending' },
  { id: 'l5', title: 'Form Initial Briefing Draft', description: 'Initial briefing draft formed', status: 'pending' },
  { id: 'l6', title: 'Output Presidential Review Briefing', description: 'Presidential review version briefing output', status: 'pending' }
];

export const PRESS_RELEASE_CONTENT: DraftSection[] = [
  { id: 's1', title: 'Title', order: 1, content: 'Authoritative Bulletin on the Progress of the 3.21 Almaty Major Traffic Accident Response', isCompleted: false, isEditable: true },
  { id: 's2', title: 'Lead', order: 2, content: 'In the early hours of March 21, 2026, a multi-vehicle collision occurred on Al-Farabi Avenue in Almaty. Currently, on-site disposal has basically concluded, and related investigation work is being carried out in an orderly manner.', isCompleted: false, isEditable: true },
  { id: 's3', title: 'Event Overview', order: 3, content: 'The accident occurred at 2:15 AM, involving 3 private cars and 1 light truck. Preliminary judgment indicates a chain collision caused by speeding.', isCompleted: false, isEditable: true },
  { id: 's4', title: 'Police Response Progress', order: 4, content: 'Police immediately cordoned off the scene, and medical departments treated 4 injured persons. Road traffic has now returned to normal, and involved vehicles have been towed away.', isCompleted: false, isEditable: true },
  { id: 's5', title: 'Current Authoritative Conclusion', order: 5, content: 'After preliminary testing, the main person responsible is suspected of drunk driving, and relevant biological samples have been sent for testing.', isCompleted: false, isEditable: true },
  { id: 's6', title: 'Closing Remarks', order: 6, content: 'Citizens are requested not to believe or spread rumors and to follow official follow-up bulletins.', isCompleted: false, isEditable: true }
];

export const LEADERSHIP_BRIEF_CONTENT: DraftSection[] = [
  { id: 'b1', title: 'Situation Summary', order: 1, content: 'The 3.21 accident caused 4 injuries; social attention is extremely high, and public opinion escalation must be prevented.', isCompleted: false, isEditable: true },
  { id: 'b2', title: 'Core Judgment', order: 2, content: 'Primary responsibility for the accident is clear, but foreign nationals are involved, requiring attention to foreign affairs coordination.', isCompleted: false, isEditable: true },
  { id: 'b3', title: 'Current Response Status', order: 3, content: 'The scene has been cleared, and the injured are in stable condition.', isCompleted: false, isEditable: true },
  { id: 'b4', title: 'Items Requiring Leadership Attention', order: 4, content: '1. Dissemination of false videos on social media; 2. Emotional comfort for the families of the injured.', isCompleted: false, isEditable: true },
  { id: 'b5', title: 'Next Steps Advice', order: 5, content: 'It is recommended that the Municipal Bureau issue a unified authoritative bulletin and activate the Level 2 public opinion response plan.', isCompleted: false, isEditable: true }
];

export const PUBLIC_OPINION_REPORT_CONTENT: DraftSection[] = [
  { id: 'p1', title: 'Title', order: 1, content: 'Special Report on Public Opinion Dissemination of the 3.21 Almaty Traffic Accident', isCompleted: false, isEditable: true },
  { id: 'p2', title: 'Dissemination Overview', order: 2, content: 'The event has reached 2M+ impressions across Telegram and Instagram within 4 hours. Sentiment is 65% negative, focusing on illegal racing rumors.', isCompleted: false, isEditable: true },
  { id: 'p3', title: 'Key Focus Points', order: 3, content: '1. Identity of the Zeekr driver; 2. Alleged police involvement in racing; 3. Speed of emergency response.', isCompleted: false, isEditable: true },
  { id: 'p4', title: 'Risk Assessment', order: 4, content: 'High risk of offline protests if official clarification is delayed beyond 12 hours.', isCompleted: false, isEditable: true },
  { id: 'p5', title: 'Response Suggestions', order: 5, content: 'Release bodycam footage immediately to debunk racing rumors and highlight rescue efforts.', isCompleted: false, isEditable: true }
];

export const OFFICIAL_DOC_CONTENT: DraftSection[] = [
  { id: 'o1', title: 'Title', order: 1, content: 'Notice on Strengthening Traffic Safety Management During Nighttime Hours', isCompleted: false, isEditable: true },
  { id: 'o2', title: 'Background', order: 2, content: 'Following the major accident on Al-Farabi Avenue, it is necessary to reinforce nighttime patrols and checkpoint operations.', isCompleted: false, isEditable: true },
  { id: 'o3', title: 'Directives', order: 3, content: '1. Increase patrol frequency by 50%; 2. Deploy mobile radar units at 10 key intersections; 3. Conduct strict sobriety checks.', isCompleted: false, isEditable: true },
  { id: 'o4', title: 'Implementation', order: 4, content: 'All district bureaus must submit their deployment plans by 6:00 PM today.', isCompleted: false, isEditable: true }
];

export const SOP_DISPOSAL_CONTENT: DraftSection[] = [
  { id: 'sop1', title: 'Title', order: 1, content: 'SOP Disposal Draft for High-Speed Collision Events', isCompleted: false, isEditable: true },
  { id: 'sop2', title: 'Initial Actions', order: 2, content: 'Cordon off 500m radius, activate emergency lane, notify nearest Level 1 trauma center.', isCompleted: false, isEditable: true },
  { id: 'sop3', title: 'Evidence Preservation', order: 3, content: 'Secure all VMS data, perform 3D laser scanning of impact core, impound all involved electronic devices.', isCompleted: false, isEditable: true },
  { id: 'sop4', title: 'Communication Protocol', order: 4, content: 'Establish secure link with Command Center, provide updates every 15 minutes.', isCompleted: false, isEditable: true }
];

export const CIRCULATION_CONTENT: DraftSection[] = [
  { id: 'c1', title: 'Title', order: 1, content: 'Circulation Package: 3.21 Incident Preliminary Investigation Report', isCompleted: false, isEditable: true },
  { id: 'c2', title: 'Distribution List', order: 3, content: 'Minister of Interior, Almaty Police Chief, City Prosecutor Office.', isCompleted: false, isEditable: true },
  { id: 'c3', title: 'Approval Status', order: 2, content: 'Pending countersignature from Legal Department.', isCompleted: false, isEditable: true }
];
