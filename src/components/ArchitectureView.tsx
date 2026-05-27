import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Cpu, 
  Layers, 
  Zap, 
  Activity, 
  Shield, 
  Network, 
  Search, 
  FileText, 
  AlertTriangle, 
  TrendingUp,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LayerProps {
  index: number;
  title: string;
  enTitle: string;
  items: string[];
  keywords: string[];
  color: string;
  isActive: boolean;
}

const ArchitectureLayer: React.FC<LayerProps> = ({ index, title, enTitle, items, keywords, color, isActive }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotateX: 45, rotateZ: -10 }}
      animate={{ 
        opacity: isActive ? 1 : 0.1, 
        y: index * -80, 
        rotateX: 45, 
        rotateZ: -10,
        scale: isActive ? 1.05 : 1,
        z: index * 30
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "absolute w-[520px] h-[300px] backdrop-blur-md p-6 flex flex-col transition-all duration-500",
        isActive 
          ? "bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" 
          : "bg-slate-100/30 border border-slate-200"
      )}
      style={{ 
        transformStyle: 'preserve-3d',
        left: '55%',
        top: '50%',
        marginLeft: '-260px',
        marginTop: '-150px'
      }}
    >
      <div className="flex justify-between items-start mb-6 border-b border-slate-200 pb-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Layer {["IV", "III", "II", "I"][3-index]}</span>
          <h3 className="text-lg font-black uppercase tracking-tight text-black">{title}</h3>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{enTitle}</span>
        </div>
        <div className={cn(
          "w-10 h-10 flex items-center justify-center border-2 transition-all duration-500",
          isActive ? "border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" : "border-slate-200 bg-slate-50 text-slate-400"
        )}>
          {index === 3 && <Shield className="w-6 h-6" />}
          {index === 2 && <Cpu className="w-6 h-6" />}
          {index === 1 && <Layers className="w-6 h-6" />}
          {index === 0 && <Database className="w-6 h-6" />}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Core Modules</span>
          <div className="grid grid-cols-1 gap-1.5">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={cn("w-1 h-1", isActive ? "bg-black" : "bg-slate-300")} />
                <span className={cn("text-[9px] font-bold uppercase leading-tight", isActive ? "text-slate-800" : "text-slate-400")}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Keywords</span>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw, i) => (
              <span key={i} className={cn(
                "px-2 py-0.5 border text-[8px] font-black uppercase tracking-tighter transition-all",
                isActive ? "bg-black text-white border-black" : "bg-white border-slate-200 text-slate-400"
              )}>
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={cn("absolute -right-1 -bottom-1 w-8 h-8 border-r-2 border-b-2 transition-all", isActive ? "border-black" : "border-slate-200")} />
      <div className={cn("absolute -left-1 -top-1 w-8 h-8 border-l-2 border-t-2 transition-all", isActive ? "border-black" : "border-slate-200")} />
    </motion.div>
  );
};

const DataParticle: React.FC<{ delay: number; startY: number }> = ({ delay, startY }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: startY, x: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: startY - 600,
        x: [0, 20, -20, 0]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        delay,
        ease: "linear"
      }}
      className="absolute w-1 h-1 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)] z-[60]"
      style={{ left: '50%', marginLeft: '-0.5px' }}
    />
  );
};

export const ArchitectureView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer(prev => (prev === 0 ? 3 : prev - 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const layers = [
    {
      title: "Command Decision & Intelligent Application Layer",
      enTitle: "Layer I: Command, Decision & Intelligent Application Layer",
      items: [
        "Major Event Warning & Intelligent Disposal Console",
        "Intelligent Exploration Agent Workbench",
        "Event Data Flow Trace Console",
        "Public Opinion Intervention & Communication Guidance Console",
        "Ministerial One-Click Drafting Hub",
        "Leadership Briefing & Executive Summary Console"
      ],
      keywords: ["Insights", "Real-time", "Coordination", "Briefing", "Drafting", "Warning", "Decision"],
      color: "bg-black"
    },
    {
      title: "AI Core Reasoning & Analytics Engine Layer",
      enTitle: "Layer II: AI Core Reasoning & Analytics Engine",
      items: [
        "Multi-Table Semantic Understanding Engine",
        "Cross-DB Query Orchestration Engine",
        "Multi-Modal Intelligence Extraction Engine",
        "Event Spatio-Temporal Reconstruction Engine",
        "Knowledge Graph Inference Engine",
        "Risk Assessment & Disposal Recommendation Engine"
      ],
      keywords: ["LLM", "Semantic", "Entity", "Timeline", "Graph", "Inference", "Compliance", "Context"],
      color: "bg-status-blue"
    },
    {
      title: "Dynamic Event Ontology & Cognitive Mapping Layer",
      enTitle: "Layer III: Dynamic Event Ontology & Cognitive Mapping Layer",
      items: [
        "Person/Vehicle/Device Entity Mapping",
        "Relationship Graph & Event Chain Construction",
        "Spatio-Temporal Segment & Communication Link Aggregation",
        "Lifecycle Action Recognition",
        "Digital Twin Ontology Mapping",
        "Approval Flow Path Modeling"
      ],
      keywords: ["Graph", "P-V-L-T", "Event Chain", "Lifecycle", "Digital Twin", "Cognitive"],
      color: "bg-status-green"
    },
    {
      title: "Multi-Source Event Data Fusion Layer",
      enTitle: "Layer IV: Multi-Source Event Data Fusion Layer",
      items: [
        "Social Media / Web Intelligence Stream",
        "Police Intranet / Event Master DB Records",
        "Checkpoint Capture / LBS Signaling Data",
        "Mobile Payment / Communication Analysis Records",
        "Spatio-Temporal Geography / Resource Location Data",
        "External Access / Historical Archive Data"
      ],
      keywords: ["Structured", "Unstructured", "Streaming", "Geo", "Internal", "External", "Fusion"],
      color: "bg-slate-400"
    }
  ];

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col overflow-hidden font-mono text-black">
      {/* Header */}
      <div className="h-24 border-b-2 border-black flex items-center justify-between px-16 shrink-0 bg-white">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-1">SYSTEM ARCHITECTURE</span>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-black">Intelligent Closed-Loop from Data Fusion to Decision Application</h1>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From Data Fusion to Executive Decision</span>
        </div>
        <button 
          onClick={onClose}
          className="w-14 h-14 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <X className="w-7 h-7 group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Main Stage */}
      <div className="flex-1 relative flex items-center overflow-hidden bg-white">
        {/* Connection Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <AnimatePresence mode="wait">
            <motion.path
              key={activeLayer}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              d={`M ${window.innerWidth * 0.4} ${window.innerHeight * 0.5} 
                 C ${window.innerWidth * 0.45} ${window.innerHeight * 0.5}, 
                   ${window.innerWidth * 0.45} ${window.innerHeight * 0.5 + (3 - activeLayer) * -40}, 
                   ${window.innerWidth * 0.48} ${window.innerHeight * 0.5 + (3 - activeLayer) * -40}`}
              fill="none"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <motion.circle
              key={`dot-${activeLayer}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              cx={window.innerWidth * 0.48}
              cy={window.innerHeight * 0.5 + (3 - activeLayer) * -40}
              r="3"
              fill="black"
            />
          </AnimatePresence>
        </svg>

        {/* Left Side: Image */}
        <div className="w-1/2 h-full p-16 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl aspect-[4/3] overflow-hidden bg-white"
          >
            <img 
              src="https://raw.githubusercontent.com/CarliYz/image/9362ac7477848bd0fb02f28ee1e518e867027de3/Gemini_Generated_Image_isin4visin4visin.png" 
              alt="Architecture Concept"
              className="w-full h-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Right Side: Layers */}
        <div className="w-1/2 h-full relative perspective-[2000px] flex items-center justify-center">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ 
                 backgroundImage: 'linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px',
                 transform: 'rotateX(60deg) translateY(-200px) scale(2)'
               }} />

          {/* Layers */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {layers.map((layer, i) => (
              <ArchitectureLayer 
                key={i}
                index={3 - i}
                title={layer.title}
                enTitle={layer.enTitle}
                items={layer.items}
                keywords={layer.keywords}
                color={layer.color}
                isActive={activeLayer === (3 - i)}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 right-12 text-right z-20">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">Architecture Version</div>
          <div className="text-2xl font-black text-black">V2.4.0_STABLE</div>
          <div className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">AEGIS DEFENSE SYSTEMS © 2026</div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="h-12 border-t-2 border-black bg-white flex items-center px-16 justify-between shrink-0">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500" />
            <span className="text-[10px] font-black uppercase text-slate-900">Lifecycle: Active</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500" />
            <span className="text-[10px] font-black uppercase text-slate-900">Reasoning: Online</span>
          </div>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          SECURE ENCLAVE ACTIVE // AIP CORE CONNECTED
        </div>
      </div>
    </div>
  );
};
