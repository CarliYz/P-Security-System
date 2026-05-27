import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, SkipBack, SkipForward, FastForward, 
  Shield, Zap, Activity, AlertTriangle, Info, 
  CheckCircle2, Timer, ChevronDown, ChevronUp,
  Download, Printer, X, Globe, FileText, MapPin, Video,
  Maximize2, Share2, Lock, ShieldAlert, TrendingUp, BarChart3, ArrowRight, Layers, Phone, ChevronRight
} from 'lucide-react';
import { create } from 'zustand';
import dayjs from 'dayjs';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell
} from 'recharts';
import { cn } from '../../lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';
import { MAJOR_EVENT_I18N } from '@/src/i18n/majorEventWarning';
import { 
  EscalationState, 
  EscalationStage, 
  SourceContribution, 
  LiveFeedItem,
  usePlaybackStore
} from './MajorEventWarning';

export const PlaybackPageHeader: React.FC = () => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language] || MAJOR_EVENT_I18N.en;
  const ESCALATION_STAGES = t.stages;
  
  const { currentTime, isPlaying, speed, togglePlay, setPlaybackTime, setSpeed } = usePlaybackStore();
  
  const activeStage = useMemo(() => {
    if (currentTime < 25) return ESCALATION_STAGES[0];
    if (currentTime < 50) return ESCALATION_STAGES[1];
    if (currentTime < 75) return ESCALATION_STAGES[2];
    return ESCALATION_STAGES[3];
  }, [currentTime]);

  return (
    <header className="sticky top-0 z-[110] bg-slate-50 border-b-2 border-black px-6 h-12 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.ui.context}</span>
        <h1 className="text-sm font-black text-black uppercase tracking-tight font-mono whitespace-nowrap">
          {t.ui.title}
        </h1>
        <span className="text-[10px] px-2 py-0.5 rounded-none font-black border-2 uppercase tracking-widest bg-red-50 text-status-red border-status-red/20">
          {t.ui.criticalPreEvent}
        </span>
      </div>

      <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>{t.ui.latency} <span className="text-black">12ms</span></span>
        <span className="text-status-red flex items-center gap-1.5 animate-pulse">
          <div className="w-1.5 h-1.5 bg-status-red rounded-none" />
          {t.ui.threatLevel}
        </span>
      </div>

      <div className="flex items-center gap-4 ml-6 pl-6 border-l-2 border-black/10">
        {/* State Chips */}
        <div className="flex items-center gap-0.5 border border-slate-200 p-0.5 bg-slate-50">
          {['green', 'yellow', 'orange', 'red'].map((state) => (
            <button
              key={state}
              onClick={() => {
                if (state === 'green') setPlaybackTime(0);
                if (state === 'yellow') setPlaybackTime(30);
                if (state === 'orange') setPlaybackTime(60);
                if (state === 'red') setPlaybackTime(90);
              }}
              className={cn(
                "px-2 py-0.5 text-[8px] font-black uppercase tracking-widest transition-all",
                activeStage.state === state 
                  ? (state === 'green' ? "bg-status-green text-white" : 
                     state === 'yellow' ? "bg-status-yellow text-white" : 
                     state === 'orange' ? "bg-orange-500 text-white" : "bg-status-red text-white")
                  : "bg-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Playback Controls Inline */}
        <div className="flex items-center gap-3 bg-black text-white px-3 py-1 shadow-sm">
          <button onClick={() => setPlaybackTime(0)} className="hover:text-slate-300"><SkipBack size={12} /></button>
          <button onClick={togglePlay} className="hover:text-slate-300">
            {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
          </button>
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-[9px] font-black font-mono w-10">{activeStage.timestamp}</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={currentTime} 
              onChange={(e) => setPlaybackTime(parseInt(e.target.value))}
              className="flex-1 h-0.5 bg-slate-700 appearance-none cursor-pointer accent-white"
            />
          </div>
          <button onClick={() => setSpeed(speed === 1 ? 2 : 1)} className="text-[8px] font-black uppercase tracking-widest min-w-[20px] border-l border-white/20 pl-2">
            {speed}x
          </button>
        </div>
      </div>
    </header>
  );
};

export const EscalationHeroSection: React.FC = () => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language] || MAJOR_EVENT_I18N.en;
  const ESCALATION_STAGES = t.stages;
  const SOURCE_CONTRIBUTIONS = t.sources;

  const { currentTime, setDrawerOpen } = usePlaybackStore();
  
  const activeStage = useMemo(() => {
    if (currentTime < 25) return ESCALATION_STAGES[0];
    if (currentTime < 50) return ESCALATION_STAGES[1];
    if (currentTime < 75) return ESCALATION_STAGES[2];
    return ESCALATION_STAGES[3];
  }, [currentTime]);

  const activeSources = useMemo(() => {
    const stageIdx = ESCALATION_STAGES.indexOf(activeStage);
    return SOURCE_CONTRIBUTIONS.filter((_, idx) => idx <= stageIdx + 1).slice(0, 5);
  }, [activeStage]);

  const featuredEvidence = useMemo(() => {
    return activeSources[activeSources.length - 1] || SOURCE_CONTRIBUTIONS[0];
  }, [activeSources]);

  return (
    <section className="grid grid-cols-12 gap-3">
      {/* Left: Incident State Transition (Compressed) */}
      <div className="col-span-4 bg-white border border-black p-3 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-3.5 h-3.5" />
          <h3 className="text-[9px] font-black uppercase tracking-widest">{t.ui.stateTransition}</h3>
        </div>
        <div className="flex-1 flex flex-col justify-between relative min-h-[140px]">
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-slate-100" />
          {ESCALATION_STAGES.map((stage, idx) => {
            const isActive = activeStage.id === stage.id;
            const isPast = ESCALATION_STAGES.indexOf(activeStage) >= idx;
            
            return (
              <div key={stage.id} className="flex gap-3 relative z-10">
                <div className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500",
                  isActive ? "bg-black border-black text-white scale-105 shadow-md" : 
                  isPast ? "bg-slate-100 border-slate-300 text-slate-400" : "bg-white border-slate-200 text-slate-200"
                )}>
                  {isPast && !isActive ? <CheckCircle2 size={10} /> : <span className="text-[7px] font-black">{idx + 1}</span>}
                </div>
                <div className={cn(
                  "flex flex-col transition-all duration-500",
                  isActive ? "opacity-100 translate-x-0.5" : "opacity-40"
                )}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black font-mono">[{stage.timestamp}]</span>
                    <span className={cn(
                      "text-[7px] px-1 py-0.5 font-black uppercase border",
                      stage.state === 'green' ? "bg-green-50 text-status-green border-status-green/20" :
                      stage.state === 'yellow' ? "bg-yellow-50 text-status-yellow border-status-yellow/20" :
                      stage.state === 'orange' ? "bg-orange-500 text-white border-orange-600" :
                      "bg-red-50 text-status-red border-status-red/20"
                    )}>{stage.state}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tight">{stage.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center: Content Summary (NEW) */}
      <div 
        className="col-span-5 bg-white border border-black p-3 flex flex-col cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setDrawerOpen(true)}
      >
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-3.5 h-3.5" />
          <h3 className="text-[9px] font-black uppercase tracking-widest">{t.ui.contentSummary}</h3>
        </div>
        <div className="flex-1 flex gap-4">
          {/* Left 1/6: Image */}
          <div className="w-1/6 shrink-0 aspect-[3/4] bg-slate-100 border border-slate-200 overflow-hidden">
            {featuredEvidence.imageUrl ? (
              <img 
                src={featuredEvidence.imageUrl} 
                alt="Summary" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Globe size={20} />
              </div>
            )}
          </div>
          {/* Right 5/6: Text */}
          <div className="flex-1 flex flex-col justify-between py-0.5">
            <div className="space-y-2">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-tight leading-tight block">
                  {featuredEvidence.title}
                </span>
                <p className="text-[9px] font-bold text-slate-600 leading-tight uppercase">
                  {featuredEvidence.extractedSignal}
                </p>
              </div>
              <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase italic border-l-2 border-slate-200 pl-2">
                “{t.ui.incidentEvolution}”
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">REF: {featuredEvidence.id}</span>
              <span className="text-[8px] font-black text-status-blue uppercase">{t.ui.clickForDetail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Merged Risk Snapshot + Escalation Reasoning */}
      <div className="col-span-3 bg-black text-white p-3 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-status-red" />
          <h3 className="text-[9px] font-black uppercase tracking-widest">{t.ui.riskCommandSummary}</h3>
        </div>
        
        <div className="flex-1 flex flex-col gap-3">
          {/* Top: Risk Score Gauge */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#334155" strokeWidth="4" />
                <motion.circle 
                  cx="32" cy="32" r="28" fill="none" 
                  stroke={activeStage.state === 'green' ? '#2E7D32' : activeStage.state === 'yellow' ? '#FBC02D' : activeStage.state === 'orange' ? '#f97316' : '#D32F2F'} 
                  strokeWidth="4"
                  strokeDasharray="175.9"
                  initial={{ strokeDashoffset: 175.9 }}
                  animate={{ strokeDashoffset: 175.9 - (175.9 * activeStage.riskScore / 100) }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black tracking-tighter leading-none">{activeStage.riskScore}</span>
                <span className="text-[6px] font-black text-slate-500 uppercase tracking-widest">{t.ui.risk}</span>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-black text-slate-500 uppercase">{t.ui.state}</span>
                <span className={cn(
                  "text-[9px] font-black uppercase",
                  activeStage.state === 'red' ? "text-status-red" : "text-white"
                )}>{activeStage.state}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-black text-slate-500 uppercase">{t.ui.confidence}</span>
                <span className="text-[9px] font-black">{(activeStage.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-black text-slate-500 uppercase">{t.ui.response}</span>
                <span className="text-[9px] font-black">LVL {activeStage.state === 'red' ? 'IV' : activeStage.state === 'orange' ? 'III' : activeStage.state === 'yellow' ? 'II' : 'I'}</span>
              </div>
            </div>
          </div>

          {/* Bottom: Reasoning Text */}
          <div className="flex-1 flex flex-col justify-between border-t border-white/10 pt-2">
            <div className="space-y-1.5">
              <div className="space-y-0.5">
                <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{t.ui.trigger}</span>
                <p className="text-[9px] font-black uppercase leading-tight line-clamp-2">{activeStage.triggerReason}</p>
              </div>
              <p className="text-[8px] font-bold text-slate-400 leading-tight uppercase italic">
                "{activeStage.whyChanged}"
              </p>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <span className="text-[8px] font-black text-status-blue uppercase">{activeStage.recommendedAction}</span>
              <ArrowRight size={12} className="text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EscalationMainGrid: React.FC = () => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language] || MAJOR_EVENT_I18N.en;
  const ESCALATION_STAGES = t.stages;
  const SOURCE_CONTRIBUTIONS = t.sources;
  const LIVE_FEED_ITEMS = t.liveFeed;

  const { currentTime, setSelectedDetailId, setDrawerOpen } = usePlaybackStore();
  
  const activeStage = useMemo(() => {
    if (currentTime < 25) return ESCALATION_STAGES[0];
    if (currentTime < 50) return ESCALATION_STAGES[1];
    if (currentTime < 75) return ESCALATION_STAGES[2];
    return ESCALATION_STAGES[3];
  }, [currentTime]);

  const activeSources = useMemo(() => {
    const stageIdx = ESCALATION_STAGES.indexOf(activeStage);
    return SOURCE_CONTRIBUTIONS.filter((_, idx) => idx <= stageIdx + 1).slice(0, 5);
  }, [activeStage]);

  const visibleFeed = useMemo(() => {
    const stageIdx = ESCALATION_STAGES.indexOf(activeStage);
    return LIVE_FEED_ITEMS.filter(item => {
      const itemStageIdx = ESCALATION_STAGES.findIndex(s => s.id === item.relatedStageId);
      return itemStageIdx <= stageIdx;
    }).reverse(); // Newest at top
  }, [activeStage]);

  return (
    <section className="grid grid-cols-12 gap-3">
      {/* Left: Live Escalation Feed (Moved here, BBC Style) */}
      <div className="col-span-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" />
            <h3 className="text-[9px] font-black uppercase tracking-widest">{t.ui.liveEscalationFeed}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-status-red animate-pulse" />
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{t.ui.liveStream}</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-black p-3 h-[280px] overflow-y-auto scroll-thin font-mono">
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {visibleFeed.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex items-start gap-3 text-[9px] py-1.5 border-b border-slate-200 last:border-0 transition-colors",
                    idx === 0 ? "bg-white/80 -mx-1 px-1 border-l-2 border-black" : "opacity-80"
                  )}
                >
                  <span className="text-slate-400 shrink-0 font-bold">[{item.timestamp}]</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-1 py-0.5 text-[7px] font-black uppercase",
                        item.type === 'CRITICAL' ? "bg-status-red text-white" :
                        item.type === 'ESCALATION' ? "bg-status-yellow text-white" :
                        "bg-slate-200 text-slate-600"
                      )}>{item.type}</span>
                      <span className="font-black text-black uppercase leading-tight">{item.description}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[7px] font-bold text-slate-400 uppercase">
                      <span>SRC: {item.sourceLabel}</span>
                      {item.triggeredTransition && <span className="text-status-red font-black">TRANSITION TRIGGERED</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleFeed.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-300 uppercase text-[9px] font-black tracking-widest">
                {t.ui.awaitingData}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle: Source Contribution (Compressed) */}
      <div className="col-span-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5" />
          <h3 className="text-[9px] font-black uppercase tracking-widest">{t.ui.sourceContribution}</h3>
        </div>
        <div className="space-y-1.5 flex-1">
          {SOURCE_CONTRIBUTIONS.map((source) => {
            const isActive = activeSources.some(s => s.id === source.id);
            return (
              <motion.div 
                key={source.id}
                initial={false}
                animate={{ 
                  opacity: isActive ? 1 : 0.2,
                  scale: isActive ? 1 : 0.98
                }}
                onClick={() => {
                  if (isActive) {
                    setSelectedDetailId(source.id);
                    setDrawerOpen(true);
                  }
                }}
                className={cn(
                  "bg-white border p-2 flex items-center gap-3 cursor-pointer transition-all group",
                  isActive ? "border-black shadow-sm hover:shadow-md" : "border-slate-100"
                )}
              >
                <div className={cn(
                  "w-6 h-6 flex items-center justify-center shrink-0 border",
                  isActive ? "bg-slate-50 border-black" : "bg-white border-slate-100"
                )}>
                  {source.sourceType === 'Social Media' ? <Globe size={12} /> : 
                   source.sourceType === 'Internal CAD' ? <Phone size={12} /> : 
                   source.sourceType === 'News' ? <FileText size={12} /> : <Zap size={12} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-tight truncate">{source.title}</span>
                    <span className="text-[7px] font-black font-mono text-slate-400">+{source.contributionScore}</span>
                  </div>
                  <div className="h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? `${source.contributionScore * 2}%` : 0 }}
                      className="h-full bg-black"
                    />
                  </div>
                </div>
                <ChevronRight size={12} className={cn("text-slate-200 transition-colors", isActive && "group-hover:text-black")} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right: Risk Build-up / Reasoning (Compressed) */}
      <div className="col-span-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <h3 className="text-[9px] font-black uppercase tracking-widest">{t.ui.riskBuildUp}</h3>
        </div>
        <div className="bg-white border border-black p-3 flex-1 flex flex-col">
          {/* Layer 1: Risk Dimensions */}
          <div className="mb-4 space-y-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: t.ui.impact, score: activeStage.riskScore * 0.4 },
                { label: 'Sentiment', score: activeStage.riskScore * 0.3 },
                { label: 'Sensitivity', score: activeStage.riskScore * 0.2 },
                { label: 'Confirmation', score: activeStage.riskScore * 0.1 },
              ].map((dim, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex justify-between items-end">
                    <span className="text-[8px] font-black uppercase tracking-tight text-slate-500">{dim.label}</span>
                    <span className="text-[8px] font-black">{dim.score.toFixed(0)}</span>
                  </div>
                  <div className="h-1 bg-slate-100">
                    <motion.div 
                      initial={false}
                      animate={{ width: `${dim.score * 2}%` }}
                      className={cn(
                        "h-full",
                        activeStage.state === 'red' ? "bg-status-red" : "bg-black"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 2: Score Evolution */}
          <div className="flex-1 min-h-[80px] flex flex-col border-t border-slate-100 pt-2">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.ui.riskScoreEvolution}</span>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ESCALATION_STAGES.filter((_, idx) => idx <= ESCALATION_STAGES.indexOf(activeStage))}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis hide domain={[0, 100]} />
                  <Area 
                    type="monotone" 
                    dataKey="riskScore" 
                    stroke="#000" 
                    strokeWidth={1.5}
                    fillOpacity={1} 
                    fill="url(#colorRisk)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Layer 3: Reasoning (Compressed) */}
          <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{t.ui.reasoningLogic}</span>
            <div className="space-y-1">
              {[
                "Public spread accelerated",
                "Narrative shift detected"
              ].map((text, i) => (
                <div key={i} className="flex gap-1.5 items-center">
                  <div className="w-1 h-1 bg-black shrink-0" />
                  <span className="text-[8px] font-bold text-black uppercase truncate">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const LiveEscalationFeedSection: React.FC = () => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language] || MAJOR_EVENT_I18N.en;
  const ESCALATION_STAGES = t.stages;
  const LIVE_FEED_ITEMS = t.liveFeed;

  const { currentTime } = usePlaybackStore();
  
  const activeStage = useMemo(() => {
    if (currentTime < 25) return ESCALATION_STAGES[0];
    if (currentTime < 50) return ESCALATION_STAGES[1];
    if (currentTime < 75) return ESCALATION_STAGES[2];
    return ESCALATION_STAGES[3];
  }, [currentTime]);

  const visibleFeed = useMemo(() => {
    const stageIdx = ESCALATION_STAGES.indexOf(activeStage);
    return LIVE_FEED_ITEMS.filter(item => {
      const itemStageIdx = ESCALATION_STAGES.findIndex(s => s.id === item.relatedStageId);
      return itemStageIdx <= stageIdx;
    });
  }, [activeStage]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <h3 className="text-[10px] font-black uppercase tracking-widest">{t.ui.liveEscalationFeed}</h3>
        </div>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{t.ui.intelligenceStream}</span>
      </div>
      <div className="bg-slate-50 border border-black p-4 h-[240px] overflow-y-auto scroll-thin font-mono">
        <div className="space-y-3">
          {visibleFeed.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex items-start gap-4 text-[10px] py-2 border-b border-slate-200 last:border-0",
                idx === visibleFeed.length - 1 && "bg-white/50 -mx-2 px-2 border-l-2 border-black"
              )}
            >
              <span className="text-slate-400 shrink-0">[{item.timestamp}]</span>
              <span className={cn(
                "px-1.5 py-0.5 text-[8px] font-black uppercase shrink-0",
                item.type === 'CRITICAL' ? "bg-status-red text-white" :
                item.type === 'ESCALATION' ? "bg-status-yellow text-white" :
                "bg-slate-200 text-slate-600"
              )}>{item.type}</span>
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-bold text-black uppercase leading-tight">{item.description}</span>
                <div className="flex items-center gap-3 text-[8px] font-bold text-slate-400 uppercase">
                  <span>SRC: {item.sourceLabel}</span>
                  <span>IMPACT: +{item.scoreImpact}</span>
                  {item.triggeredTransition && <span className="text-status-red font-black">TRANSITION TRIGGERED</span>}
                </div>
              </div>
            </motion.div>
          ))}
          {visibleFeed.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-300 uppercase text-[10px] font-black tracking-widest">
              {t.ui.awaitingData}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const ActionControlFooter: React.FC = () => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language] || MAJOR_EVENT_I18N.en;
  const ESCALATION_STAGES = t.stages;
  
  const { currentTime } = usePlaybackStore();
  
  const activeStage = useMemo(() => {
    if (currentTime < 25) return ESCALATION_STAGES[0];
    if (currentTime < 50) return ESCALATION_STAGES[1];
    if (currentTime < 75) return ESCALATION_STAGES[2];
    return ESCALATION_STAGES[3];
  }, [currentTime, ESCALATION_STAGES]);

  const isRed = activeStage.state === 'red';
  const isYellow = activeStage.state === 'yellow' || activeStage.state === 'orange' || isRed;

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t border-black z-[120] flex items-center px-6 justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            activeStage.state === 'red' ? "bg-status-red" : 
            activeStage.state === 'green' ? "bg-status-green" : "bg-status-yellow"
          )} />
          <span className="text-[9px] font-black uppercase tracking-widest">{t.ui.commandReadiness} {activeStage.state}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          disabled={!isYellow}
          className={cn(
            "px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-black",
            isYellow ? "bg-white text-black hover:bg-slate-50" : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
          )}
        >
          <Video size={12} /> {t.ui.videoRoom}
        </button>
        <button 
          disabled={!isYellow}
          className={cn(
            "px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-black",
            isYellow ? "bg-white text-black hover:bg-slate-50" : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
          )}
        >
          <Lock size={12} /> {t.ui.enclaveLock}
        </button>
        <button 
          disabled={!isRed}
          className={cn(
            "px-6 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm",
            isRed ? "bg-status-red text-white hover:bg-red-700" : "bg-slate-100 text-slate-300 cursor-not-allowed"
          )}
        >
          <ShieldAlert size={12} /> {t.ui.deployWarrants}
        </button>
      </div>
    </footer>
  );
};

export const IncidentDetailDrawer: React.FC = () => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language] || MAJOR_EVENT_I18N.en;
  const SOURCE_CONTRIBUTIONS = t.sources;

  const { isDrawerOpen, setDrawerOpen, selectedDetailId } = usePlaybackStore();
  const [activeTab, setActiveTab] = useState<'summary' | 'evidence' | 'logic' | 'timeline' | 'actions'>('summary');

  const selectedSource = useMemo(() => {
    return SOURCE_CONTRIBUTIONS.find(s => s.id === selectedDetailId) || SOURCE_CONTRIBUTIONS[0];
  }, [selectedDetailId]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[480px] bg-white border-l-2 border-black z-[160] flex flex-col shadow-2xl"
          >
            <div className="h-16 border-b border-black flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-tight">{t.ui.incidentDetailAnalysis}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">REF: {selectedSource.id}</span>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex border-b border-slate-200 shrink-0">
              {['summary', 'evidence', 'logic', 'timeline', 'actions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all border-b-2",
                    activeTab === tab ? "border-black text-black bg-slate-50" : "border-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-8 scroll-thin">
              {activeTab === 'summary' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.ui.sourceOverview}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.ui.sourceType}</span>
                        <span className="text-[11px] font-black uppercase">{selectedSource.sourceType}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.ui.timestamp}</span>
                        <span className="text-[11px] font-black uppercase">{selectedSource.timestamp}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.ui.risk}</span>
                        <span className="text-[11px] font-black uppercase">+{selectedSource.contributionScore}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.ui.confidence}</span>
                        <span className="text-[11px] font-black uppercase">{(selectedSource.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.ui.extractedSignal}</h3>
                    <p className="text-sm font-black uppercase tracking-tight leading-relaxed">
                      {selectedSource.extractedSignal}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.ui.systemRecommendation}</span>
                    <p className="text-[10px] font-bold text-slate-700 leading-relaxed uppercase italic">
                      "Cross-reference this signal with existing LBS data to confirm physical presence of associated entities."
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'evidence' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.ui.visualEvidence}</h3>
                    <div className="aspect-video bg-slate-100 border border-black overflow-hidden relative">
                      {selectedSource.imageUrl ? (
                        <img 
                          src={selectedSource.imageUrl} 
                          alt="Evidence" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <FileText size={48} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.ui.metadata}</h3>
                    <div className="space-y-2 font-mono text-[9px]">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-400 uppercase">File Hash</span>
                        <span className="text-black font-bold">SHA256: 882A...F912</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-400 uppercase">Origin IP</span>
                        <span className="text-black font-bold">192.168.42.105</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-400 uppercase">Encryption</span>
                        <span className="text-black font-bold">AES-256-GCM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'logic' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.ui.contributionLogic}</h3>
                    <div className="space-y-6">
                      {selectedSource.dimensions.map((dim, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-end">
                            <span className="text-[11px] font-black uppercase tracking-tight">{dim.label} {t.ui.impact}</span>
                            <span className="text-[11px] font-black text-status-red">+{dim.score}</span>
                          </div>
                          <div className="h-2 bg-slate-100 border border-slate-200">
                            <div className="h-full bg-black" style={{ width: `${dim.score * 2}%` }} />
                          </div>
                          <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase">
                            This source contributed significantly to the {dim.label.toLowerCase()} dimension by providing verified {selectedSource.extractedSignal.toLowerCase()}.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-black bg-slate-50 shrink-0">
              <button className="w-full py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                Download Full Intelligence Pack
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
