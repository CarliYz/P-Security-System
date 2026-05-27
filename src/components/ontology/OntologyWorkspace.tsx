import React from 'react';
import { OntologyGraphCanvas } from './OntologyGraphCanvas';
import { OntologyToolbar } from './OntologyToolbar';
import { OntologyDetailDrawer } from './OntologyDetailDrawer';
import { OntologyMiniMap } from './OntologyMiniMap';
import { Database, Activity, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

export const OntologyWorkspace: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].ontology;

  return (
    <div className="flex-1 relative bg-slate-50 overflow-hidden flex flex-col">
      {/* Workspace Header */}
      <div className="h-12 border-b border-black bg-white flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800 font-mono">
              {t.title}
            </h2>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase">{t.nodes}:</span>
              <span className="text-[9px] font-black text-black font-mono">300</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase">{t.edges}:</span>
              <span className="text-[9px] font-black text-black font-mono">412</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase">{t.engine}:</span>
              <span className="text-[9px] font-black text-blue-600 font-mono">CYTOSCAPE.JS</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-1 bg-green-50 border border-green-200">
            <ShieldCheck className="w-3 h-3 text-green-600" />
            <span className="text-[8px] font-black text-green-700 uppercase tracking-widest">{t.secureEnclave}</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 border border-blue-200">
            <Activity className="w-3 h-3 text-blue-600" />
            <span className="text-[8px] font-black text-blue-700 uppercase tracking-widest">{t.liveSync}</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <OntologyGraphCanvas />
        <OntologyToolbar />
        <OntologyMiniMap />
        <OntologyDetailDrawer />
        
        {/* Floating Status Bar - Now with Legend Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black text-slate-400 px-6 py-2 flex items-center gap-8 shadow-2xl border border-white/10">
          {/* System Status */}
          <div className="flex items-center gap-2 pr-4 border-r border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/90">{t.systemActive}</span>
          </div>

          {/* Entity Types Legend */}
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">{t.entities}:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-white border border-slate-300 rounded-sm" />
                <span className="text-[8px] font-bold font-mono">{t.standard}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-red-50 border border-red-500 rounded-sm" />
                <span className="text-[8px] font-bold font-mono text-red-400">{t.highRisk}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-amber-50 border border-amber-500 rounded-sm" />
                <span className="text-[8px] font-bold font-mono text-amber-400">{t.medRisk}</span>
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Confidence Legend */}
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">{t.confidence}:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-[1px] bg-slate-400" />
                <span className="text-[8px] font-bold font-mono">{t.confirmed}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-[1px] border-t border-dashed border-slate-500" />
                <span className="text-[8px] font-bold font-mono">{t.inferred}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-[1px] border-t border-dashed border-red-500" />
                <span className="text-[8px] font-bold font-mono text-red-500/80">{t.alleged}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cluster Labels (Visual only, floating over regions) */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
          <span className="text-[14px] font-black text-slate-900 uppercase tracking-[0.5em]">{t.clusters.infrastructure}</span>
        </div>
        <div className="absolute top-1/2 left-20 -translate-y-1/2 pointer-events-none opacity-20 -rotate-90">
          <span className="text-[14px] font-black text-slate-900 uppercase tracking-[0.5em]">{t.clusters.unknown}</span>
        </div>
        <div className="absolute top-1/2 right-20 -translate-y-1/2 pointer-events-none opacity-20 rotate-90">
          <span className="text-[14px] font-black text-slate-900 uppercase tracking-[0.5em]">{t.clusters.media}</span>
        </div>
      </div>
    </div>
  );
};
