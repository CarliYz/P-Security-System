import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Clock, 
  MapPin, 
  Video, 
  Network, 
  ExternalLink,
  Shield,
  Info,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Download,
  Share2,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { VehicleSpatialOntology } from './VehicleSpatialOntology';
import { VehicleIoTProfile } from './VehicleIoTProfile';
import { motion, AnimatePresence } from 'motion/react';
import { VehicleAnomalyCase, TraceNode } from './OfficialVehiclesTraceTypes';

import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

interface UnifiedDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCase: VehicleAnomalyCase | null;
  traceNodes: TraceNode[];
}

export const UnifiedDetailDrawer: React.FC<UnifiedDetailDrawerProps> = ({ isOpen, onClose, selectedCase, traceNodes }) => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles;
  const [activeTab, setActiveTab] = useState<'summary' | 'timeline' | 'evidence' | 'related' | 'legacy'>('summary');

  if (!selectedCase) return null;

  const tabs = [
    { id: 'summary', label: t.workspaces.originalDetail, icon: Info },
    { id: 'timeline', label: t.lifecycle.title, icon: Clock },
    { id: 'evidence', label: t.analytics.title, icon: FileText },
    { id: 'related', label: t.workspaces.title, icon: Network },
    { id: 'legacy', label: t.legacyPage, icon: ExternalLink },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9998] pointer-events-auto"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[450px] bg-white border-l border-black shadow-2xl z-[9999] flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-black bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-tight">{selectedCase.id}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{selectedCase.vehicleId} // TRACE_DETAIL</span>
                </div>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-black bg-white">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 py-3 flex flex-col items-center gap-1 transition-all border-r border-slate-100 last:border-r-0",
                    activeTab === tab.id ? "bg-black text-white" : "text-slate-400 hover:bg-slate-50"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-thin">
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.workspaces.originalDetail}</h3>
                      <span className={cn(
                        "px-2 py-0.5 text-[8px] font-black uppercase border",
                        selectedCase.severity === 'high' ? "bg-red-50 text-status-red border-status-red/20" : "bg-slate-50 text-slate-500 border-slate-200"
                      )}>{selectedCase.severity === 'high' ? t.kpis.highSeverity : selectedCase.severity}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Current Status', value: selectedCase.status, color: 'text-status-yellow' },
                        { label: 'Current Owner', value: selectedCase.owner },
                        { label: 'Elapsed Time', value: selectedCase.elapsedTime, color: 'text-status-red' },
                        { label: 'Latest Update', value: selectedCase.latestUpdate },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <span className="text-[8px] font-black text-slate-400 uppercase">{item.label}</span>
                          <div className={cn("text-[11px] font-black uppercase", item.color || "text-black")}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                    <div className="p-4 bg-slate-50 border border-black/5 space-y-2">
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t.analytics.title}</h4>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed">
                        {selectedCase.id === 'CASE-2024-001' ? t.mockData.cases.case1.desc :
                         selectedCase.id === 'CASE-2024-002' ? t.mockData.cases.case2.desc :
                         selectedCase.id === 'CASE-2024-003' ? t.mockData.cases.case3.desc :
                         selectedCase.description}
                      </p>
                    </div>

                  <div className="space-y-3">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Metadata</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'Trigger Time', value: selectedCase.triggerTime },
                        { label: 'Rule Source', value: selectedCase.ruleSource },
                        { label: 'SLA Risk', value: selectedCase.delayRisk ? 'HIGH_DELAY_RISK' : 'NOMINAL', color: selectedCase.delayRisk ? 'text-status-red' : 'text-status-green' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{item.label}</span>
                          <span className={cn("text-[9px] font-black uppercase", item.color || "text-black")}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.lifecycle.title}</h3>
                  <div className="relative pl-6 space-y-8">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />
                    {traceNodes.map((node, i) => (
                      <div key={node.id} className="relative">
                        <div className={cn(
                          "absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center z-10",
                          node.status === 'completed' ? "border-status-green" :
                          node.status === 'delayed' ? "border-status-red" : "border-slate-200"
                        )}>
                          {node.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5 text-status-green" />}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "text-[10px] font-black uppercase tracking-tight",
                              node.status === 'completed' ? "text-black" : "text-slate-400"
                            )}>{t.mockData?.nodes?.[node.status as keyof typeof t.mockData.nodes] || node.title}</span>
                            <span className="text-[8px] font-bold text-slate-300 uppercase">{node.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Owner: {node.owner}</span>
                            <span className={cn(
                              "text-[7px] font-black uppercase px-1",
                              node.status === 'completed' ? "text-status-green bg-green-50" :
                              node.status === 'delayed' ? "text-status-red bg-red-50" : "text-slate-300 bg-slate-50"
                            )}>{node.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'evidence' && (
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.analytics.title}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Location Snapshot</span>
                        <button className="text-[8px] font-black text-blue-600 uppercase hover:underline">Live Map</button>
                      </div>
                      <div className="aspect-video bg-slate-100 border border-slate-200 overflow-hidden">
                        <VehicleSpatialOntology vehicleId={selectedCase.vehicleId} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase flex items-center gap-1.5"><Video className="w-3 h-3" /> Video Reference</span>
                        <button className="text-[8px] font-black text-blue-600 uppercase hover:underline">Play Feed</button>
                      </div>
                      <div className="aspect-video bg-black border border-black overflow-hidden">
                        <VehicleIoTProfile vehicleId={selectedCase.vehicleId} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase flex items-center gap-1.5"><FileText className="w-3 h-3" /> System Logs</span>
                      <div className="p-3 bg-slate-900 rounded-none font-mono text-[8px] text-slate-400 space-y-1">
                        <div>[02:15:01] TRG_RULE: BUDGET_OVERRUN_150</div>
                        <div>[02:15:05] SRC_IOT: KZ-777-POL ACTIVE_ON_NET</div>
                        <div>[02:15:10] CONFLICT: STATUS_MAINTENANCE vs POS_ACTIVE</div>
                        <div className="text-status-red">[02:15:12] ALERT: HIGH_SEVERITY_ANOMALY</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'related' && (
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.workspaces.title}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: 'Full Asset Profile', icon: Shield },
                      { label: 'Maintenance History', icon: Clock },
                      { label: 'Map Monitoring Console', icon: MapPin },
                      { label: 'Graph Investigation Workspace', icon: Network },
                      { label: 'Video Monitor Panel', icon: Video },
                    ].map((item, i) => (
                      <button key={i} className="w-full p-3 border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-all group">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-slate-400 group-hover:text-black" />
                          <span className="text-[10px] font-black uppercase tracking-tight text-slate-600 group-hover:text-black">{item.label}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-black" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'legacy' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-16 h-16 bg-slate-100 flex items-center justify-center border border-slate-200">
                    <ExternalLink className="w-8 h-8 text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black uppercase tracking-widest">{t.legacyPage}</h4>
                    <p className="text-[9px] text-slate-400 font-bold max-w-[200px]">
                      {t.subtitle}
                    </p>
                  </div>
                  <button className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:bg-slate-800 transition-all">
                    {t.legacyPage}
                  </button>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-black bg-white grid grid-cols-2 gap-2">
              <button className="py-2 border border-black text-[9px] font-black uppercase flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                <Download className="w-3.5 h-3.5" /> Export Report
              </button>
              <button className="py-2 bg-black text-white text-[9px] font-black uppercase flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                <Share2 className="w-3.5 h-3.5" /> Assign Case
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
