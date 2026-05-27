import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Zap, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Printer, 
  Save, 
  Share2, 
  Send, 
  ChevronRight, 
  AlertTriangle, 
  RefreshCw,
  MoreVertical,
  Download,
  Edit3,
  Eye,
  History,
  Lock,
  Settings,
  Layers,
  Cpu,
  Network,
  Activity,
  Maximize2,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';
import { 
  DraftType, 
  DraftParameterFormData, 
  ExecutionStep, 
  DraftSection, 
  ExecutionStepStatus,
  DraftPreviewStatus
} from './types';
import { 
  DRAFT_TYPES, 
  PRESS_RELEASE_STEPS, 
  OFFICIAL_DOC_STEPS, 
  LEADERSHIP_BRIEF_STEPS,
  PRESS_RELEASE_CONTENT,
  LEADERSHIP_BRIEF_CONTENT,
  PUBLIC_OPINION_REPORT_CONTENT,
  OFFICIAL_DOC_CONTENT,
  SOP_DISPOSAL_CONTENT,
  CIRCULATION_CONTENT
} from './mock';

export const ExecutiveDraftingPage: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language] || PRE_EVENT_I18N.en;

  const [selectedType, setSelectedType] = useState<DraftType>('press_release');
  const [isGenerating, setIsGenerating] = useState(false);
  const [steps, setSteps] = useState<ExecutionStep[]>(PRESS_RELEASE_STEPS);
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [sections, setSections] = useState<DraftSection[]>([]);
  const [previewStatus, setPreviewStatus] = useState<DraftPreviewStatus>('drafting');
  const [isExpanded, setIsExpanded] = useState(false);
  const incidentId = 'E-20260321-AF-01';

  // Form Data
  const [formData, setFormData] = useState<DraftParameterFormData>({
    topic: '3.21 Almaty Major Traffic Accident',
    eventTitle: 'Al-Farabi Avenue Multi-Vehicle Collision',
    audience: 'public_release',
    tone: 'external_official',
    templateMode: 'press_format',
    securityLevel: 'internal',
    intelligenceSources: ['social_media', 'police_internal', 'video_material'],
    autoInsertConclusion: true,
    includeDisposalSuggestions: true,
    enterApprovalFlow: true,
    generatePrintReady: true,
    exportWord: true,
    exportPdf: true
  });

  // Handle Type Change
  useEffect(() => {
    setIsGenerating(false);
    setCurrentStepIdx(-1);
    setPreviewStatus('drafting');
    setSections([]);
    
    const typeSteps = t.executiveDrafting?.steps?.[selectedType as keyof typeof t.executiveDrafting.steps] || t.executiveDrafting?.steps?.press_release || [];
    setSteps(typeSteps.map((s: any, i: number) => ({ 
      id: String(i), 
      title: s.title, 
      description: s.desc, 
      status: 'pending',
      group: i < 2 ? 'initialization' : i < 4 ? 'intelligence' : i < 5 ? 'drafting' : i < 6 ? 'polishing' : 'finalization'
    })));
  }, [selectedType, t]);

  const startGeneration = () => {
    setIsGenerating(true);
    setCurrentStepIdx(0);
    setPreviewStatus('drafting');
    setSections([]);
    
    const content = t.executiveDrafting?.content?.[selectedType as keyof typeof t.executiveDrafting.content] || t.executiveDrafting?.content?.press_release;
    
    if (content) {
      setSections(content.slice(0, 1).map((s, i) => ({
        id: String(i),
        title: s.title,
        content: s.content,
        order: i + 1,
        isCompleted: false,
        isEditable: true
      })));
    }
  };

  // Simulation Logic
  useEffect(() => {
    if (isGenerating && currentStepIdx < steps.length) {
      const timer = setTimeout(() => {
        setSteps(prev => prev.map((s, i) => {
          if (i === currentStepIdx) return { ...s, status: 'completed' };
          if (i === currentStepIdx + 1) return { ...s, status: 'running' };
          return s;
        }));

        const content = t.executiveDrafting?.content?.[selectedType as keyof typeof t.executiveDrafting.content] || t.executiveDrafting?.content?.press_release;

        if (content) {
          const progressMap: Record<number, number> = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };
          const sectionCount = progressMap[currentStepIdx + 1] || 1;
          setSections(content.slice(0, sectionCount).map((s, i) => ({
            id: String(i),
            title: s.title,
            content: s.content,
            order: i + 1,
            isCompleted: false,
            isEditable: true
          })));
        }

        if (currentStepIdx === steps.length - 1) {
          setIsGenerating(false);
          setPreviewStatus('final_draft_ready');
        } else {
          setCurrentStepIdx(prev => prev + 1);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, currentStepIdx, steps.length, selectedType, t]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-mono text-black">
      {/* Header */}
      <header className="h-12 border-b border-slate-200 flex items-center px-4 justify-between shrink-0 bg-white z-50">
        <div className="flex items-center gap-4">
          <Shield className="w-5 h-5 text-black" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{t.executiveDrafting.subtitle}</span>
            <h1 className="text-sm font-black uppercase tracking-tighter">{t.executiveDrafting.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <span className="text-status-green flex items-center gap-1">
              <div className="w-1 h-1 bg-status-green" />
              SECURE ENCLAVE
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-none" />
          </div>
        </div>
      </header>

      {/* Main Content Area - Centered Window */}
      <div className="flex-1 overflow-hidden p-4 flex items-center justify-center">
        <div className="w-full max-w-7xl h-full bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
          {/* Internal Header */}
          <div className="h-10 border-b border-slate-200 bg-slate-50 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t.executiveDrafting.interfaceVersion}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-status-green" />
                <span className="text-[8px] font-black text-slate-400 uppercase">{t.executiveDrafting.engineReady}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 border border-slate-300" />
                <div className="w-2 h-2 border border-slate-300" />
                <div className="w-2 h-2 border border-slate-300 bg-slate-300" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Left: Document Type (30%) */}
            <div className="w-[30%] border-r border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden">
              <div className="p-3 border-b border-slate-200 bg-white">
                <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.executiveDrafting.selectTemplate}</h3>
                <div className="space-y-1">
                    {DRAFT_TYPES.map(type => {
                      const translatedType = t.executiveDrafting?.draftTypes?.[type.id as keyof typeof t.executiveDrafting.draftTypes];
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id as any)}
                          className={cn(
                            "w-full p-2 flex items-start gap-3 transition-all border",
                            selectedType === type.id 
                              ? "bg-black border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                          )}
                        >
                          <div 
                            className="w-6 h-6 shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: type.color + '20' }}
                          >
                            <FileText className="w-3.5 h-3.5" style={{ color: type.color }} />
                          </div>
                          <div className="flex flex-col gap-0.5 text-left">
                            <span className="text-[9px] font-black uppercase tracking-tight">{translatedType?.title || type.title}</span>
                            <span className={cn(
                              "text-[7px] font-bold uppercase leading-tight",
                              selectedType === type.id ? "text-slate-400" : "text-slate-400"
                            )}>{translatedType?.desc || type.description}</span>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3 scroll-thin">
                <div>
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.executiveDrafting.contextualInputs}</h3>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-500">{t.executiveDrafting.targetAudience}</label>
                      <select className="w-full bg-white border border-slate-200 px-2 py-1 text-[9px] font-bold focus:outline-none focus:border-black">
                        {t.executiveDrafting.audiences.map(audience => (
                          <option key={audience}>{audience}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-500">{t.executiveDrafting.securityClassification}</label>
                      <div className="flex gap-1">
                        {t.executiveDrafting.securityLevels.map(level => (
                          <button key={level} className="flex-1 py-1 border border-slate-200 text-[7px] font-black hover:bg-slate-100">{level}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-500">{t.executiveDrafting.intelligenceSources}</label>
                      <div className="grid grid-cols-2 gap-1">
                        {t.executiveDrafting.sources.map(source => (
                          <div key={source} className="flex items-center gap-1.5">
                            <input type="checkbox" defaultChecked className="w-2.5 h-2.5 accent-black" />
                            <span className="text-[8px] font-bold text-slate-600">{source}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-slate-200 bg-white">
                <button 
                  onClick={startGeneration}
                  disabled={isGenerating}
                  className={cn(
                    "w-full py-2 text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                    isGenerating ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-black text-white hover:bg-slate-800"
                  )}
                >
                  {isGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                  {isGenerating ? t.executiveDrafting.drafting : t.executiveDrafting.startGeneration}
                </button>
              </div>
            </div>

            {/* Center: Generation Area (40%) */}
            <div className="w-[40%] flex flex-col bg-white overflow-hidden relative">
              <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-status-blue" />
                  <h3 className="text-[9px] font-black uppercase tracking-widest">{t.executiveDrafting.workspace}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsExpanded(true)} className="p-1 hover:bg-slate-100 border border-slate-200"><Maximize2 className="w-3 h-3" /></button>
                  <button className="p-1 hover:bg-slate-100 border border-slate-200"><RefreshCw className="w-3 h-3" /></button>
                  <button className="p-1 hover:bg-slate-100 border border-slate-200"><Download className="w-3 h-3" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 scroll-thin">
                <div className="w-full bg-white shadow-sm border border-slate-200 min-h-full p-12 font-serif relative">
                  {/* Document Header Logos */}
                  {(sections.length > 0 || isGenerating) && (
                    <div className="flex justify-between items-start mb-10 border-b-2 border-slate-100 pb-6">
                      <div className="flex items-center gap-3">
                        <Shield className="w-12 h-12 text-black" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase">{t.executiveDrafting.ministry}</span>
                          <span className="text-[8px] font-bold text-slate-400">{t.executiveDrafting.bureau}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black uppercase">{t.executiveDrafting.confidential}</span>
                          <span className="text-[8px] font-bold text-slate-400">{t.executiveDrafting.ref}: {incidentId}</span>
                        </div>
                        <Zap className="w-12 h-12 text-status-blue" />
                      </div>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {sections.length === 0 && !isGenerating ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-200 text-center py-20">
                        <FileText className="w-10 h-10 opacity-10 mb-3" />
                        <div className="text-[8px] font-black uppercase tracking-[0.2em] opacity-30">Waiting for generation...</div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {sections.map((section) => (
                          <motion.div 
                            key={section.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                          >
                            <h3 className={cn(
                              "font-black uppercase tracking-widest",
                              section.title === 'Title' 
                                ? "text-xl text-center text-status-red border-none pb-6 mb-6 border-b-2 border-status-red/10" 
                                : "text-[12px] text-black border-b border-slate-100 pb-2"
                            )}>
                              {section.content && section.title !== 'Title' && section.title}
                              {section.title === 'Title' && section.content}
                            </h3>
                            {section.title !== 'Title' && (
                              <p className={cn(
                                "leading-relaxed text-justify font-medium text-[13px] text-slate-500"
                              )}>
                                {section.content}
                              </p>
                            )}
                          </motion.div>
                        ))}
                        {isGenerating && (
                          <div className="flex items-center gap-2 pt-2">
                            <div className="flex gap-0.5">
                              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-black" />
                              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-black" />
                              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-black" />
                            </div>
                            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">AI is drafting...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                  
                  {/* Watermark */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] rotate-[-30deg] select-none">
                    <span className="text-6xl font-black">AEGIS DRAFT</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-3 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder={t.executiveDrafting.refinePlaceholder}
                    className="flex-1 bg-slate-50 border border-slate-200 px-3 py-1.5 text-[9px] font-bold focus:outline-none focus:border-black"
                  />
                  <button 
                    className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Execution Flow (30%) */}
            <div className="w-[30%] border-l border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden">
              <div className="p-3 border-b border-slate-200 bg-white">
                <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.executiveDrafting.executionFlow}</h3>
                <div className="space-y-2">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="flex gap-2 relative">
                      {idx !== steps.length - 1 && (
                        <div className="absolute left-[7px] top-4 bottom-[-8px] w-px bg-slate-200" />
                      )}
                      <div className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 z-10 transition-all duration-500",
                        step.status === 'completed' ? "bg-status-green border-status-green text-white" :
                        step.status === 'running' ? "bg-white border-status-blue text-status-blue animate-pulse" :
                        "bg-white border-slate-200 text-slate-300"
                      )}>
                        {step.status === 'completed' ? <CheckCircle2 className="w-2.5 h-2.5" /> : <div className="w-1 h-1 rounded-full bg-current" />}
                      </div>
                      <div className="flex flex-col gap-0">
                        <span className={cn(
                          "text-[8px] font-black uppercase tracking-tight",
                          step.status === 'pending' ? "text-slate-400" : "text-black"
                        )}>{step.title}</span>
                        <span className="text-[7px] font-bold text-slate-400 leading-tight truncate max-w-[180px]">{step.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-3 overflow-y-auto scroll-thin">
                <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.executiveDrafting.auditLog}</h3>
                <div className="space-y-1">
                  {[
                    { time: '12:04:12', action: 'Draft initialized', user: 'SYSTEM' },
                    { time: '12:04:15', action: 'Context injected: CASE_091', user: 'AI_CORE' },
                    { time: '12:04:18', action: 'Template applied: SITREP', user: 'AI_CORE' },
                    { time: '12:04:22', action: 'Entity extraction complete', user: 'AI_CORE' },
                  ].slice(0, currentStepIdx + 3).map((log, i) => (
                    <div key={i} className="flex items-center gap-2 text-[7px] font-mono">
                      <span className="text-slate-400">[{log.time}]</span>
                      <span className="text-black font-bold truncate">{log.action}</span>
                      <span className="ml-auto text-slate-300">{log.user}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-slate-200 bg-white">
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-1.5 border border-slate-200 text-[8px] font-black uppercase hover:bg-slate-50 flex items-center justify-center gap-1">
                    <Printer className="w-3 h-3" /> {t.executiveDrafting.print}
                  </button>
                  <button className="py-1.5 border border-slate-200 text-[8px] font-black uppercase hover:bg-slate-50 flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" /> {t.executiveDrafting.export}
                  </button>
                </div>
                <button className="w-full mt-2 py-2 bg-black text-white text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 flex items-center justify-center gap-2">
                  <Share2 className="w-3 h-3" /> {t.executiveDrafting.submitApproval}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-6 border-t border-slate-200 bg-white flex items-center justify-between px-4 text-[8px] font-black text-slate-400 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-status-green" />
            <span className="text-black">{t.executiveDrafting.engineNominal}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-status-green" />
            <span className="text-black">{t.executiveDrafting.sopValidation}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>{t.executiveDrafting.region}</span>
          <span>{t.executiveDrafting.build}</span>
          <span className="text-slate-300">{t.executiveDrafting.copyright}</span>
        </div>
      </footer>

      {/* Expanded Workspace Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-0 sm:p-10"
          >
            <div className="w-full h-full bg-white border-2 border-black flex flex-col relative overflow-hidden">
              <div className="h-12 border-b border-black bg-slate-50 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-status-blue" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.executiveDrafting.expandedWorkspace}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">{t.executiveDrafting.ministry} // {t.executiveDrafting.bureau}</span>
                </div>
                <button onClick={() => setIsExpanded(false)} className="p-1 hover:bg-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto bg-white scroll-thin">
                <div className="w-full p-8 sm:p-12 font-serif relative">
                  {/* Document Header Logos */}
                  {(sections.length > 0 || isGenerating) && (
                    <div className="flex justify-between items-start mb-10 border-b-2 border-slate-100 pb-6">
                      <div className="flex items-center gap-4">
                        <Shield className="w-14 h-14 text-black" />
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black uppercase">{t.executiveDrafting.ministry}</span>
                          <span className="text-[9px] font-bold text-slate-400">{t.executiveDrafting.bureau}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-[11px] font-black uppercase">{t.executiveDrafting.confidential}</span>
                          <span className="text-[9px] font-bold text-slate-400">{t.executiveDrafting.ref}: {incidentId}</span>
                        </div>
                        <Zap className="w-14 h-14 text-status-blue" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    {sections.map((section) => (
                      <div key={section.id} className="space-y-3">
                        <h3 className={cn(
                          "font-black uppercase tracking-widest",
                          section.title === 'Title' 
                            ? "text-2xl text-center text-status-red border-none pb-6 mb-6 border-b-2 border-status-red/10" 
                            : "text-[13px] text-black border-b border-slate-100 pb-2"
                        )}>
                          {section.content && section.title !== 'Title' && section.title}
                          {section.title === 'Title' && section.content}
                        </h3>
                        {section.title !== 'Title' && (
                          <p className="leading-relaxed text-justify font-medium text-[14px] text-slate-600">
                            {section.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Watermark */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-30deg] select-none">
                    <span className="text-9xl font-black">AEGIS DRAFT</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-black bg-slate-50 flex items-center gap-4 shrink-0">
                <div className="flex-1 flex items-center gap-3 bg-white border border-black px-4 py-2">
                  <Edit3 className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder={t.executiveDrafting.refineExpandedPlaceholder}
                    className="flex-1 bg-transparent text-[11px] font-bold focus:outline-none"
                  />
                </div>
                <button className="px-8 py-2 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  {t.executiveDrafting.applyRefinement}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
