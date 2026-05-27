import React, { useState, useEffect } from 'react';
import { TopNav } from './components/layout/TopNav';
import { Sidebar } from './components/layout/Sidebar';
import { RightPanel } from './components/layout/RightPanel';
import { Activity } from 'lucide-react';
import { KeyPersonScenario } from './components/widgets/KeyPersonScenario';
import { EmergencyCmdScenario } from './components/widgets/EmergencyCmdScenario';
import { CaseAnalysisScenario } from './components/widgets/CaseAnalysisScenario';
import { PreEventScenario } from './components/widgets/PreEventScenario';
import { DuringEventScenario } from './components/widgets/DuringEventScenario';
import { PostEventScenario } from './components/widgets/PostEventScenario';
import { MajorEventWarning } from './components/widgets/MajorEventWarning';
import { KeyIntelligenceScenario } from './components/widgets/KeyIntelligenceScenario';
import { KazakhstanMap } from './components/widgets/KazakhstanMap';
import { PoliceVehicleDemo } from './components/widgets/PoliceVehicleDemo';
import { PolicePersonnelDemo } from './components/personnel/PolicePersonnelDemo';
import { ArchitectureView } from './components/ArchitectureView';
import { SCENARIOS as DEFAULT_SCENARIOS } from './types/ontology';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from './context/LanguageContext';
import { UI_TRANSLATIONS } from './i18n/ui';
import { SCENARIOS_I18N } from './i18n/scenarios';

export default function App() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language].app;
  const SCENARIOS = SCENARIOS_I18N[language];

  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [viewMode, setViewMode] = useState<'GLOBAL' | 'DETAILED'>('GLOBAL');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setViewMode('GLOBAL');
  }, [activeScenarioId]);

  const getAllScenarios = (scenarios: typeof SCENARIOS): typeof SCENARIOS => {
    return scenarios.reduce((acc, s) => {
      return [...acc, s, ...(s.children ? getAllScenarios(s.children) : [])];
    }, [] as typeof SCENARIOS);
  };

  const allScenarios = getAllScenarios(SCENARIOS);
  const activeScenario = allScenarios.find(s => s.id === activeScenarioId);

  const renderScenario = () => {
    if (!activeScenarioId) return <KazakhstanMap />;

    switch (activeScenarioId) {
      case 'police-vehicles':
        return <PoliceVehicleDemo />;
      case 'police-personnel':
        return <PolicePersonnelDemo />;
      case 'key-persons':
        return <KeyPersonScenario />;
      case 'emergency-cmd':
        return <EmergencyCmdScenario />;
      case 'key-intel':
        return <KeyIntelligenceScenario />;
      case 'case-analysis':
        return <CaseAnalysisScenario />;
      case 'major-event-warning':
        return <MajorEventWarning onClose={() => setActiveScenarioId(null)} />;
      case 'post-eval':
      case 'performance-eval':
        return <PostEventScenario />;
      default:
        if (activeScenario?.phase === 'PRE') return <PreEventScenario />;
        if (activeScenario?.phase === 'DURING') return <DuringEventScenario viewMode={viewMode} setViewMode={setViewMode} />;
        if (activeScenario?.phase === 'POST') return <PostEventScenario />;
        
        return <KazakhstanMap />;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col items-center justify-center text-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-6" />
          <div className="font-mono text-sm tracking-[0.3em] uppercase font-bold">
            {t.booting}
          </div>
          <div className="mt-4 text-[10px] text-slate-400 font-mono font-bold">
            {t.verifying}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white select-none text-black font-mono">
      <TopNav 
        isRightPanelOpen={isRightPanelOpen}
        onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
        onTitleClick={() => setActiveScenarioId(null)}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          activeScenarioId={activeScenarioId || ''} 
          onScenarioChange={setActiveScenarioId} 
          onShowArchitecture={() => setShowArchitecture(true)}
        />
        
        <main className="flex-1 relative bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenarioId || 'map'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full h-full flex flex-col"
            >
              {/* Scenario Header (Context Bar) */}
              <div className="h-12 border-b-2 border-black bg-slate-50 flex items-center px-6 justify-between shrink-0 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.context}</span>
                  <span className="text-sm font-black text-black uppercase tracking-tight">{activeScenario?.name || t.nationalSecurityGrid}</span>
                  {activeScenario && (
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-none font-black border-2 uppercase tracking-widest",
                      activeScenario.phase === 'PRE' && "bg-blue-50 text-blue-600 border-blue-600/20",
                      activeScenario.phase === 'DURING' && "bg-red-50 text-red-600 border-red-600/20",
                      activeScenario.phase === 'POST' && "bg-green-50 text-green-600 border-green-600/20",
                    )}>
                      {activeScenario.phase === 'PRE' ? t.pre : activeScenario.phase === 'DURING' ? t.during : t.post}
                    </span>
                  )}
                  {activeScenario?.phase === 'DURING' && (
                    <div className="flex items-center gap-4 ml-6 pl-6 border-l-2 border-black/10">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-status-red animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-900">{t.opinionMonitoringSystem}</span>
                      </div>
                      <div className="flex bg-black/5 p-1 rounded-none border border-black/10">
                        <button 
                          onClick={() => setViewMode('GLOBAL')}
                          className={cn(
                            "px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-none transition-all",
                            viewMode === 'GLOBAL' ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {t.global}
                        </button>
                        <button 
                          onClick={() => setViewMode('DETAILED')}
                          className={cn(
                            "px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-none transition-all",
                            viewMode === 'DETAILED' ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {t.detailed}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>{t.latency} <span className="text-black">14ms</span></span>
                  <span>{t.uploads} <span className="text-black">1.2GB/s</span></span>
                  <span className="text-status-green flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-status-green rounded-none" />
                    {t.secureEnclave}
                  </span>
                </div>
              </div>

              {/* Scenario Content */}
              <div className="h-[calc(100%-48px)]">
                {renderScenario()}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {isRightPanelOpen && <RightPanel />}
      </div>

      {/* Global Status Bar */}
      <footer className="h-8 border-t-2 border-black bg-white flex items-center justify-between px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-none bg-status-green" />
            <span className="text-black">{t.ontologyEngine}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-none bg-status-green" />
            <span className="text-black">{t.aipCore}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span>{t.region}</span>
          <span>BUILD: 2024.04.02.REL-01</span>
          <span className="text-slate-300">© 2024 AEGIS DEFENSE SYSTEMS</span>
        </div>
      </footer>

      <AnimatePresence>
        {showArchitecture && (
          <ArchitectureView onClose={() => setShowArchitecture(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
