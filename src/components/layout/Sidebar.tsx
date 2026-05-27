import React, { useState } from 'react';
import { 
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Shield,
  Activity,
  History
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/src/i18n/ui';
import { SCENARIOS_I18N } from '@/src/i18n/scenarios';

interface SidebarProps {
  activeScenarioId: string;
  onScenarioChange: (id: string) => void;
  onShowArchitecture: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeScenarioId, onScenarioChange, onShowArchitecture }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language].sidebar;
  const SCENARIOS = SCENARIOS_I18N[language];

  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);
  const [expandedScenarios, setExpandedScenarios] = useState<string[]>([]);

  const togglePhase = (phase: string) => {
    setExpandedPhases(prev => 
      prev.includes(phase) ? prev.filter(p => p !== phase) : [phase]
    );
  };

  const toggleScenario = (id: string) => {
    setExpandedScenarios(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const PHASES = [
    { id: 'PRE', label: language === 'zh' ? '事前预警' : language === 'kk' ? 'ОҚИҒАҒА ДЕЙІН' : 'PRE-EVENT', icon: Shield },
    { id: 'DURING', label: language === 'zh' ? '事中指挥' : language === 'kk' ? 'ОҚИҒА КЕЗІНДЕ' : 'DURING-EVENT', icon: Activity },
    { id: 'POST', label: language === 'zh' ? '事后评估' : language === 'kk' ? 'ОҚИҒАДАН КЕЙІН' : 'POST-EVENT', icon: History },
  ];

  // Mock counts for scenarios
  const SCENARIO_METRICS: Record<string, { count: number; color: string }> = {
    'police-assets': { count: 156, color: 'text-status-green' },
    'police-vehicles': { count: 42, color: 'text-status-green' },
    'police-personnel': { count: 88, color: 'text-status-green' },
    'police-equipment': { count: 12, color: 'text-status-yellow' },
    'traffic-network': { count: 9, color: 'text-status-red' },
    'anomaly-warning': { count: 5, color: 'text-status-red' },
    'social-assets': { count: 24, color: 'text-status-yellow' },
    'key-vehicles': { count: 15, color: 'text-status-yellow' },
    'key-persons': { count: 9, color: 'text-status-red' },
    'global-opinion': { count: 99, color: 'text-status-red' },
    'major-event-warning': { count: 4, color: 'text-status-yellow' },
    'key-intel': { count: 7, color: 'text-status-red' },
    'emergency-cmd': { count: 8, color: 'text-status-red' },
    'case-analysis': { count: 24, color: 'text-status-red' },
    'performance-eval': { count: 15, color: 'text-status-yellow' },
  };

  const isSidebarExpanded = expandedPhases.length > 0;

  const renderScenarioItem = (s: any, depth = 0) => {
    const metric = SCENARIO_METRICS[s.id] || { count: 0, color: 'text-slate-300' };
    const hasChildren = s.children && s.children.length > 0;
    const isExpanded = expandedScenarios.includes(s.id);

    return (
      <div key={s.id} className="space-y-1">
        <button
          onClick={() => {
            if (hasChildren) {
              toggleScenario(s.id);
            } else {
              onScenarioChange(s.id);
            }
          }}
          className={cn(
            "w-full flex items-center justify-between p-2.5 text-[11px] rounded-none transition-all border-2 group uppercase tracking-tight",
            activeScenarioId === s.id 
              ? "bg-slate-50 border-black text-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]" 
              : "text-slate-500 border-transparent hover:bg-slate-50 hover:border-black/20",
            depth > 0 && "ml-2 w-[calc(100%-8px)]"
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {hasChildren && (
              isExpanded ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <span className="truncate">{s.name}</span>
          </div>
          {metric.count > 0 && (
            <span className={cn("font-black text-[10px] shrink-0 px-1.5 py-0.5 border border-black/10 bg-white shadow-sm", metric.color)}>
              {metric.count}
            </span>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="pl-3 space-y-1.5 border-l border-black/5 ml-2">
            {s.children.map((child: any) => renderScenarioItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside 
      className={cn(
        "border-r-2 border-black bg-white flex flex-col z-40 transition-all duration-300 ease-in-out overflow-hidden font-mono",
        isSidebarExpanded ? "w-72" : "w-20"
      )}
    >
      {/* Scenario Navigation Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b-2 border-black h-16 flex items-center justify-center bg-slate-50">
          {isSidebarExpanded ? (
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.scenarios}</h2>
          ) : (
            <div className="w-3 h-3 bg-black animate-pulse rounded-none" />
          )}
        </div>

        <div className="flex-1 py-6 space-y-6 overflow-y-auto scroll-thin">
          {PHASES.map((phase) => (
            <div key={phase.id} className="px-3 space-y-3">
              <button 
                onClick={() => togglePhase(phase.id)}
                className={cn(
                  "w-full flex items-center transition-all duration-200 border-2 rounded-none",
                  isSidebarExpanded ? "justify-between p-3" : "justify-center p-4",
                  expandedPhases.includes(phase.id) 
                    ? "bg-black text-slate-400 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" 
                    : "text-slate-500 border-transparent hover:bg-slate-50 hover:border-black/10"
                )}
                title={phase.label}
              >
                <div className="flex items-center gap-4">
                  <phase.icon className={cn("transition-transform", isSidebarExpanded ? "w-5 h-5" : "w-7 h-7")} />
                  {isSidebarExpanded && <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">{phase.label}</span>}
                </div>
                {isSidebarExpanded && (expandedPhases.includes(phase.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
              </button>
              
              {isSidebarExpanded && expandedPhases.includes(phase.id) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pl-3 space-y-2 border-l-2 border-black/5 ml-2"
                >
                  {SCENARIOS.filter(s => s.phase === phase.id).map(s => renderScenarioItem(s))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t-2 border-black bg-slate-50 flex justify-center">
        <button 
          onClick={onShowArchitecture}
          className="flex items-center gap-4 text-slate-400 hover:text-black cursor-pointer group transition-colors"
        >
          <MoreHorizontal className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          {isSidebarExpanded && <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.architecture}</span>}
        </button>
      </div>
    </aside>
  );
};
