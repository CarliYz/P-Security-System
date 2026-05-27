import React, { useState, useMemo } from 'react';
import { VehicleLedger } from './VehicleLedger';
import { VehicleIoTProfile } from './VehicleIoTProfile';
import { VehicleSpatialOntology } from './VehicleSpatialOntology';
import { motion, AnimatePresence } from 'motion/react';
import { 
  VehicleTraceHeader, 
  KpiSummaryStrip, 
  CompactTraceRail, 
  TraceAnalyticsPanel,
  RelatedLegacyWorkspacesBar
} from './OfficialVehiclesTraceComponents';
import { UnifiedDetailDrawer } from './OfficialVehiclesTraceDrawer';
import { ANOMALY_CASES, TRACE_NODES, VehicleAnomalyCase } from './OfficialVehiclesTraceTypes';
import { cn } from '@/src/lib/utils';
import { Maximize2, X, Layers, ChevronDown } from 'lucide-react';

import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

export const PoliceVehicleDemo: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles;
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>('KZ-777-POL');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'map' | 'graph' | 'video' | 'compare' | null>(null);

  const selectedCase = useMemo(() => {
    return ANOMALY_CASES.find(c => c.vehicleId === selectedVehicleId) || null;
  }, [selectedVehicleId]);

  const traceNodes = useMemo(() => {
    return selectedVehicleId ? (TRACE_NODES[selectedVehicleId] || []) : [];
  }, [selectedVehicleId]);

  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
    // Auto-open drawer for high risk or newly selected
    if (id === 'KZ-777-POL') {
      setIsDrawerOpen(true);
    }
  };

  const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(true);

  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-10"
      >
        <div className="w-full h-full bg-white border-2 border-black flex flex-col relative">
          <div className="h-12 border-b border-black bg-slate-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest">Expanded Workspace: {activeModal}</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase">Live Sync Active</span>
            </div>
            <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-slate-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {activeModal === 'map' && <VehicleSpatialOntology vehicleId={selectedVehicleId} />}
            {activeModal === 'graph' && <VehicleSpatialOntology vehicleId={selectedVehicleId} />}
            {activeModal === 'video' && <VehicleIoTProfile vehicleId={selectedVehicleId} />}
            {activeModal === 'compare' && (
              <div className="flex h-full">
                <div className="flex-1 border-r border-black"><VehicleSpatialOntology vehicleId="KZ-777-POL" /></div>
                <div className="flex-1"><VehicleSpatialOntology vehicleId="KZ-102-POL" /></div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden font-mono relative">
      {/* New Header Layer */}
      <VehicleTraceHeader 
        selectedVehicleId={selectedVehicleId} 
        onOpenLegacy={() => {}} 
        onCompare={() => setActiveModal('compare')}
      />

      {/* KPI Summary Strip */}
      <KpiSummaryStrip />

      {/* Main Three-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Operations Panel (Legacy Ledger + Enhancements) */}
        <div className="w-[25%] h-full flex flex-col border-r border-black">
          <div className="flex-1 overflow-hidden">
            <VehicleLedger 
              selectedVehicleId={selectedVehicleId} 
              onSelectVehicle={handleSelectVehicle} 
            />
          </div>
          {/* Quick Stats or Small Analytics could go here */}
        </div>

        {/* Middle Column: Trace & Verification Panel */}
        <div className="w-[40%] h-full flex flex-col border-r border-black bg-slate-50/30">
          {/* Trace Rail */}
          <CompactTraceRail nodes={traceNodes} activeNodeId={selectedCase?.status === 'maintenance' ? '4' : undefined} />
          
          {/* Main Content: IoT Profile (Legacy) */}
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setActiveModal('video')}
                className="p-1.5 bg-white border border-black hover:bg-slate-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
            <VehicleIoTProfile vehicleId={selectedVehicleId} />
          </div>

          {/* Trace Analytics (New) */}
          <div className="border-t border-black bg-white">
            <button 
              onClick={() => setIsAnalyticsVisible(!isAnalyticsVisible)}
              className="w-full py-1.5 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors border-b border-black"
            >
              <div className={cn("w-1.5 h-1.5 rounded-full", isAnalyticsVisible ? "bg-status-green" : "bg-slate-300")} />
              <span className="text-[8px] font-black uppercase tracking-widest">
                {isAnalyticsVisible ? t.ui.hideAnalytics : t.ui.showAnalytics}
              </span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", !isAnalyticsVisible && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isAnalyticsVisible && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <TraceAnalyticsPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Evidence & Analytics Panel (Legacy Map/Graph + Enhancements) */}
        <div className="w-[35%] h-full flex flex-col">
          <div className="flex-1 overflow-hidden relative border-b border-black">
             <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button 
                onClick={() => setActiveModal('map')}
                className="p-1.5 bg-white border border-black hover:bg-slate-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
            <VehicleSpatialOntology vehicleId={selectedVehicleId} />
          </div>
          
          {/* Action Footer for Right Panel */}
          <div className="p-4 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-status-red animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">{t.ui.evidenceSync}</span>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-black text-white text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
            >
              {t.ui.reviewFullCase}
            </button>
          </div>
        </div>
      </div>

      {/* Legacy Bridge Bar */}
      <RelatedLegacyWorkspacesBar />

      {/* Unified Detail Drawer */}
      <UnifiedDetailDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        selectedCase={selectedCase}
        traceNodes={traceNodes}
      />

      {/* Modals */}
      <AnimatePresence>
        {renderModal()}
      </AnimatePresence>
    </div>
  );
};
