import React from 'react';
import { 
  Shield, 
  ExternalLink, 
  Layers, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Timer,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Maximize2,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
  MapPin,
  Video,
  Network,
  BarChart3
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { VehicleAnomalyCase, TraceNode } from './OfficialVehiclesTraceTypes';
import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

// --- Sub-components ---

export const VehicleTraceHeader: React.FC<{ 
  selectedVehicleId: string | null;
  onOpenLegacy: () => void;
  onCompare: () => void;
}> = ({ selectedVehicleId, onOpenLegacy, onCompare }) => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles;

  return (
    <div className="h-14 border-b border-black bg-white flex items-center px-6 justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-slate-100 border border-black/10">
          <Shield className="w-5 h-5 text-black" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-black uppercase tracking-tight">{t.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.subtitle}</span>
            <div className="flex gap-1">
              {['PRE-EVENT', 'OFFICIAL VEHICLES', 'TRACEABILITY'].map(tag => (
                <span key={tag} className="text-[7px] px-1.5 py-0.5 bg-slate-100 text-slate-500 font-black border border-slate-200 uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {selectedVehicleId && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 mr-4">
            <div className="w-1.5 h-1.5 bg-status-red animate-pulse" />
            <span className="text-[9px] font-black text-status-red uppercase">{t.activeCase}: {selectedVehicleId}</span>
          </div>
        )}
        <div className="flex gap-1">
          <button onClick={onOpenLegacy} className="px-3 py-1.5 border border-black text-[9px] font-black uppercase hover:bg-slate-50 transition-all flex items-center gap-1.5">
            <ExternalLink className="w-3 h-3" /> {t.legacyPage}
          </button>
          <button onClick={onCompare} className="px-3 py-1.5 bg-black text-white text-[9px] font-black uppercase hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            <Layers className="w-3 h-3" /> {t.compareMode}
          </button>
        </div>
      </div>
    </div>
  );
};

export const KpiSummaryStrip: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles.kpis;

  const kpis = [
    { label: t.activeExceptions, value: '12', trend: '+2', color: 'text-status-red' },
    { label: t.highSeverity, value: '04', trend: '0', color: 'text-status-red' },
    { label: t.inReview, value: '08', trend: '-1', color: 'text-status-yellow' },
    { label: t.awaitingDispatch, value: '15', trend: '+5', color: 'text-status-yellow' },
    { label: t.longestDelay, value: '130D', trend: 'STUCK', color: 'text-status-red' },
    { label: t.unarchivedCases, value: '42', trend: '+12', color: 'text-slate-400' },
  ];

  return (
    <div className="h-16 border-b border-black bg-slate-50 flex items-center px-4 gap-px">
      {kpis.map((kpi, i) => (
        <div key={i} className="flex-1 h-full bg-white border-x border-slate-100 flex flex-col justify-center px-4 group hover:bg-slate-50 transition-colors">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</span>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-xl font-black tracking-tighter", kpi.color)}>{kpi.value}</span>
            <span className="text-[8px] font-bold text-slate-300 uppercase">{kpi.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CompactTraceRail: React.FC<{ nodes: TraceNode[]; activeNodeId?: string }> = ({ nodes, activeNodeId }) => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles;
  const lifecycleT = t.lifecycle;

  return (
    <div className="p-4 bg-white border-b border-black">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-black" />
          <span className="text-[10px] font-black uppercase tracking-widest">{lifecycleT.title}</span>
        </div>
        <div className="flex items-center gap-4 text-[8px] font-bold text-slate-400 uppercase">
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-status-green" /> {lifecycleT.completed}</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-status-yellow" /> {lifecycleT.pending}</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-status-red" /> {lifecycleT.delayed}</div>
        </div>
      </div>
      <div className="flex items-center gap-0">
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <button className={cn(
              "flex-1 flex flex-col p-2 border transition-all group relative",
              node.status === 'completed' ? "bg-green-50/30 border-status-green/20" :
              node.status === 'delayed' ? "bg-red-50/30 border-status-red/20" :
              node.status === 'pending' ? "bg-white border-slate-200" : "bg-slate-50 border-slate-100",
              activeNodeId === node.id && "ring-1 ring-black ring-inset shadow-sm"
            )}>
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-tight",
                  node.status === 'completed' ? "text-status-green" :
                  node.status === 'delayed' ? "text-status-red" : "text-slate-500"
                )}>{t.mockData?.nodes?.[node.status as keyof typeof t.mockData.nodes] || node.title}</span>
                {node.hasWarning && <AlertTriangle className="w-2.5 h-2.5 text-status-red animate-pulse" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-black">{node.duration}</span>
                <span className="text-[7px] font-bold text-slate-400 uppercase truncate max-w-[60px]">{node.owner}</span>
              </div>
              {node.status === 'delayed' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-status-red" />
              )}
            </button>
            {i < nodes.length - 1 && (
              <div className="w-4 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-slate-300" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const TraceAnalyticsPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles.analytics;

  return (
    <div className="bg-slate-50 border border-black/5 flex flex-col">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center justify-between hover:bg-slate-100 transition-colors w-full text-left"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-black" />
          <span className="text-[10px] font-black uppercase tracking-widest">{t.title}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: t.longestDelay, value: '130 Days', sub: 'North Shop' },
                  { label: t.reviewRework, value: '3 Times', sub: t.highSeverity },
                  { label: t.blockers, value: '02 Active', sub: 'SOP Conflict' },
                  { label: t.closureRate, value: '85%', sub: 'Target 95%' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-2 border border-slate-200">
                    <div className="text-[7px] font-black text-slate-400 uppercase mb-1">{item.label}</div>
                    <div className="text-sm font-black text-black">{item.value}</div>
                    <div className="text-[7px] font-bold text-slate-300 uppercase">{item.sub}</div>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-red-50 border border-red-100">
                <div className="text-[8px] font-black text-status-red uppercase mb-1 flex items-center gap-1">
                  <Timer className="w-3 h-3" /> {t.bottleneck}
                </div>
                <p className="text-[9px] font-bold text-red-800 leading-tight">
                  {t.bottleneckDesc}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RelatedLegacyWorkspacesBar: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles.workspaces;

  return (
    <div className="h-10 border-t border-black bg-white flex items-center px-4 justify-between shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.title}:</span>
        <div className="flex gap-2">
          {[
            { id: 'originalDetail', label: t.originalDetail },
            { id: 'maintenanceQueue', label: t.maintenanceQueue },
            { id: 'mapMonitor', label: t.mapMonitor },
            { id: 'graphWorkspace', label: t.graphWorkspace },
            { id: 'videoPanel', label: t.videoPanel },
            { id: 'archiveRecord', label: t.archiveRecord }
          ].map(ws => (
            <button key={ws.id} className="px-2 py-1 border border-slate-200 text-[8px] font-black uppercase hover:bg-slate-50 transition-all">
              {ws.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[8px] font-bold text-slate-300 uppercase">System: AEGIS_TRACE_v2.4</span>
      </div>
    </div>
  );
};

