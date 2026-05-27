import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Clock, 
  ChevronRight, 
  Maximize2, 
  TrendingUp, 
  Users, 
  User,
  Car,
  Smartphone,
  CreditCard,
  Home,
  Phone,
  Video, 
  Radio, 
  Share2, 
  Lock, 
  PhoneCall, 
  FileText, 
  Globe,
  Activity,
  Search,
  Map as MapIcon,
  MapPin,
  ExternalLink,
  Eye,
  Network,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Waves,
  Building2,
  Briefcase,
  Dices,
  Palette,
  Plane,
  Scale,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FastForward,
  Info,
  CheckCircle2,
  Timer,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  X
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import 'echarts-wordcloud';
import { create } from 'zustand';
import dayjs from 'dayjs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  PlaybackPageHeader, 
  EscalationHeroSection, 
  EscalationMainGrid, 
  LiveEscalationFeedSection, 
  ActionControlFooter, 
  IncidentDetailDrawer 
} from './EscalationPlaybackComponents';
import { cn } from '../../lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';
import { MAJOR_EVENT_I18N } from '@/src/i18n/majorEventWarning';

// --- Types & Interfaces ---
// ... (rest of types)

export type EscalationState = 'green' | 'yellow' | 'orange' | 'red';

export interface EscalationStage {
  id: string;
  state: EscalationState;
  title: string;
  timestamp: string;
  shortReason: string;
  confidence: number;
  riskScore: number;
  newEvidenceCount: number;
  recommendedAction: string;
  triggerReason: string;
  whyChanged: string;
}

export interface SourceContribution {
  id: string;
  title: string;
  sourceType: string;
  timestamp: string;
  extractedSignal: string;
  confidence: number;
  contributionScore: number;
  dimensions: { label: string; score: number }[];
  status: 'active' | 'pending' | 'absorbed';
  relatedStageId: string;
  imageUrl?: string;
}

export interface LiveFeedItem {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  sourceLabel: string;
  scoreImpact: number;
  triggeredTransition: boolean;
  relatedSourceId?: string;
  relatedStageId: string;
}

// --- Playback Store ---

interface PlaybackState {
  currentTime: number; // 0 to 100
  isPlaying: boolean;
  speed: number;
  isDrawerOpen: boolean;
  selectedDetailId: string | null;
  setPlaybackTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setDrawerOpen: (open: boolean) => void;
  setSelectedDetailId: (id: string | null) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  currentTime: 0,
  isPlaying: false,
  speed: 1,
  isDrawerOpen: false,
  selectedDetailId: null,
  setPlaybackTime: (time) => set({ currentTime: time }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ speed }),
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  setSelectedDetailId: (id) => set({ selectedDetailId: id }),
}));

// --- Mock Data ---

export const ESCALATION_STAGES: EscalationStage[] = [
  {
    id: 'stage-1',
    state: 'green',
    title: 'Routine Traffic Accident',
    timestamp: '03:12',
    shortReason: 'Initial collision report',
    confidence: 0.58,
    riskScore: 27,
    newEvidenceCount: 1,
    recommendedAction: 'Standard dispatch',
    triggerReason: 'Routine 10-50 call',
    whyChanged: 'Initial event detection via emergency line.'
  },
  {
    id: 'stage-2',
    state: 'yellow',
    title: 'Public Attention Rising',
    timestamp: '03:26',
    shortReason: 'Social media surge',
    confidence: 0.77,
    riskScore: 43,
    newEvidenceCount: 2,
    recommendedAction: 'Continue monitoring',
    triggerReason: 'Abnormal social spread velocity',
    whyChanged: 'Telegram footage leak caused rapid narrative fermentation.'
  },
  {
    id: 'stage-3',
    state: 'orange',
    title: 'Sensitive Narrative Emerging',
    timestamp: '03:41',
    shortReason: 'Misconduct allegations',
    confidence: 0.85,
    riskScore: 61,
    newEvidenceCount: 1,
    recommendedAction: 'Prepare internal review',
    triggerReason: 'Police misconduct narrative detected',
    whyChanged: 'Witness reports suggest official vehicle involvement in racing.'
  },
  {
    id: 'stage-4',
    state: 'red',
    title: 'High-Priority Security Incident',
    timestamp: '03:55',
    shortReason: 'Multi-source confirmation',
    confidence: 0.94,
    riskScore: 88,
    newEvidenceCount: 3,
    recommendedAction: 'Initiate vertical reporting',
    triggerReason: 'Fatalities + misconduct + cross-source confirmation',
    whyChanged: 'Critical threshold reached; high risk of physical unrest.'
  }
];

export const SOURCE_CONTRIBUTIONS: SourceContribution[] = [
  {
    id: 'src-1',
    title: 'Traffic Incident Log',
    sourceType: 'Internal CAD',
    timestamp: '03:12',
    extractedSignal: 'Head-on collision, 2 vehicles',
    confidence: 0.98,
    contributionScore: 15,
    dimensions: [{ label: 'Severity', score: 12 }],
    status: 'active',
    relatedStageId: 'stage-1',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'src-2',
    title: 'Telegram Footage',
    sourceType: 'Social Media',
    timestamp: '03:20',
    extractedSignal: 'High-speed racing detected',
    confidence: 0.82,
    contributionScore: 22,
    dimensions: [{ label: 'Sentiment', score: 18 }, { label: 'Sensitivity', score: 10 }],
    status: 'active',
    relatedStageId: 'stage-2',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'src-3',
    title: 'Local Media Report',
    sourceType: 'News',
    timestamp: '03:32',
    extractedSignal: 'Victim identity confirmed',
    confidence: 0.91,
    contributionScore: 18,
    dimensions: [{ label: 'Severity', score: 20 }],
    status: 'active',
    relatedStageId: 'stage-2',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'src-4',
    title: 'Internal Note #882',
    sourceType: 'Police Intranet',
    timestamp: '03:41',
    extractedSignal: 'Officer involvement suspected',
    confidence: 0.75,
    contributionScore: 25,
    dimensions: [{ label: 'Sensitivity', score: 28 }, { label: 'Confirmation', score: 15 }],
    status: 'active',
    relatedStageId: 'stage-3'
  },
  {
    id: 'src-5',
    title: 'Public Comment Cluster',
    sourceType: 'NLP Analysis',
    timestamp: '03:55',
    extractedSignal: 'Calls for protest at HQ',
    confidence: 0.88,
    contributionScore: 30,
    dimensions: [{ label: 'Sentiment', score: 35 }, { label: 'Confirmation', score: 22 }],
    status: 'active',
    relatedStageId: 'stage-4'
  }
];

export const LIVE_FEED_ITEMS: LiveFeedItem[] = [
  { id: 'f-1', timestamp: '03:12', type: 'DETECTION', description: 'Traffic collision detected from Telegram footage', sourceLabel: 'OSINT_BOT', scoreImpact: 12, triggeredTransition: true, relatedStageId: 'stage-1' },
  { id: 'f-2', timestamp: '03:18', type: 'UPDATE', description: 'Casualty count revised from 1 to 3', sourceLabel: 'CAD_102', scoreImpact: 8, triggeredTransition: false, relatedStageId: 'stage-1' },
  { id: 'f-3', timestamp: '03:26', type: 'ESCALATION', description: 'Public spread velocity exceeds baseline threshold', sourceLabel: 'RADAR_ENGINE', scoreImpact: 15, triggeredTransition: true, relatedStageId: 'stage-2' },
  { id: 'f-4', timestamp: '03:35', type: 'SIGNAL', description: 'Narrative shift: "Elite immunity" keywords detected', sourceLabel: 'NLP_CORE', scoreImpact: 10, triggeredTransition: false, relatedStageId: 'stage-2' },
  { id: 'f-5', timestamp: '03:41', type: 'ESCALATION', description: 'Police misconduct narrative detected across 2 channels', sourceLabel: 'SNA_MODULE', scoreImpact: 20, triggeredTransition: true, relatedStageId: 'stage-3' },
  { id: 'f-6', timestamp: '03:48', type: 'ALERT', description: 'Cross-platform resonance: TikTok ➡️ Telegram', sourceLabel: 'OSINT_SPIDER', scoreImpact: 12, triggeredTransition: false, relatedStageId: 'stage-3' },
  { id: 'f-7', timestamp: '03:55', type: 'CRITICAL', description: 'Cross-source correlation confirms high-priority incident', sourceLabel: 'AI_FUSION', scoreImpact: 25, triggeredTransition: true, relatedStageId: 'stage-4' }
];

interface MajorEventWarningProps {
  onClose?: () => void;
}

const INTELLIGENCE_REPORTS = [
  {
    title: "1. Transmission Rate and Abnormal Increment Monitoring (Data Extremum Alert)",
    content: "Public opinion is exhibiting an unnatural, explosive vertical climb. Within the past hour, discussion volume has surged by 485%; over the past 12 hours, it has skyrocketed by 14,200%; and the cumulative increment over the past 3 days has reached a staggering 92,000%. The overall viral growth rate exceeds the baseline for standard public safety incidents in the country by 850%."
  },
  {
    title: "2. Narrative Shift and High-Sensitivity Rumor Evolution (Qualitative Transformation)",
    content: "The focus of online discussions has undergone a highly dangerous shift. In the initial stage of the incident (T+0 to T+6 hours), topics were concentrated on the objective 'tragic car crash' and 'emergency rescue.' However, the narrative was rapidly redirected toward class antagonism and systemic injustice. Currently, rhetoric regarding 'the privileged class being above the law' and 'distrust in the system' has assumed absolute dominance, accounting for 78.4% of the total voice volume."
  },
  {
    title: "3. Coordinated Inauthentic Behavior and Bot Matrix (Identification of Behind-the-Scenes Instigators)",
    content: "The large model traceability system has explicitly locked onto 8,425 high-risk accounts suspected to be bots. Operating in a cross-platform matrix pattern, this astroturfing network is aggressively inciting three extreme false narratives: High-ranking police officials have accepted $30 million in 'blood money' (45%); The Zeekr brand is cooperating with the government to lock vehicles via OTA (32%); Calling on the public to besiege the Almaty Police Department and City Hall (23%)."
  },
  {
    title: "4. Disaster Dynamics Prediction and Golden Intervention Window (Tactical Deduction Alert)",
    content: "Incident management has entered the final 'Golden 48-Hour' window. Simulation models indicate that if the government fails to take overwhelming, physical actions with absolute credibility during this period, online public opinion will spiral completely out of control (expected to surge by another 15 to 20 times). Furthermore, there is a 90% probability that this will translate into a large-scale, offline mass riot and stability crisis over the weekend."
  }
];

const TypewriterCard = () => {
  const { language } = useLanguage();
  const INTELLIGENCE_REPORTS = MAJOR_EVENT_I18N[language].intelligence;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const currentReport = INTELLIGENCE_REPORTS[currentIndex];

  useEffect(() => {
    let charIndex = 0;
    const content = currentReport.content;
    const typingDuration = 10000; // 10 seconds for typing
    const stayDuration = 5000; // 5 seconds stay
    const charInterval = typingDuration / content.length;

    setDisplayText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < content.length) {
        setDisplayText(content.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        const timer = setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % INTELLIGENCE_REPORTS.length);
        }, stayDuration);
        return () => clearTimeout(timer);
      }
    }, charInterval);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <div className="bg-white border border-black p-4 h-full flex flex-col overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-status-red" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -20 }} // Left-to-right dynamic effect
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-3 bg-black" />
            <h3 className="text-[10px] font-black text-black leading-tight tracking-widest uppercase font-mono">
              {currentReport.title}
            </h3>
          </div>
          <div className="text-[10px] text-black leading-relaxed font-bold whitespace-pre-wrap font-mono tracking-tight">
            {displayText.split(/(\d+(?:,\d+)*(?:\.\d+)?%?|T\+\d+|\d+\s*(?:hours?|days?|years?|x|level|units?|times?|items?|million|billion|USD|times)?|\[.*?\]|Golden 48-Hour|the privileged class being above the law|distrust in the system)/gi).map((part, i) => {
              if (/(\d+(?:,\d+)*(?:\.\d+)?%?|T\+\d+|\d+\s*(?:hours?|days?|years?|x|level|units?|times?|items?|million|billion|USD|times)?|\[.*?\]|Golden 48-Hour|the privileged class being above the law|distrust in the system)/i.test(part)) {
                return <span key={i} className="text-status-red font-black">{part}</span>;
              }
              return part;
            })}
            {isTyping && <span className="inline-block w-1 h-3 bg-status-red ml-1 animate-pulse align-middle" />}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex gap-1">
        {INTELLIGENCE_REPORTS.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-0.5 flex-1 transition-all duration-700",
              i === currentIndex ? "bg-black" : "bg-slate-100"
            )} 
          />
        ))}
      </div>
    </div>
  );
};

const AI_CONCLUSIONS = [
  {
    id: 1,
    title: "🔸 Conclusion 1: Spatio-Temporal Anomaly & SNR Deviation",
    content: "[ ALERT: MASS CASUALTY ] Call volume in target sector deviated from baseline by 2250% in 15 mins. Nearly 50 independent sources reported from the same coordinates. Classified as a high-visibility, fatal public safety incident with a massive witness base and high risk of information leakage."
  },
  {
    id: 2,
    title: "🔸 Conclusion 2: Semantic Mutation & Escalation",
    content: "[ CRITICAL: NATURE OF INCIDENT ALTERED ] NLP engine detected dangerous semantic evolution.\nPhase 1 (03:05-03:08): Requests focused on 'Medical Rescue' and 'Traffic Accident'.\nPhase 2 (03:12-03:15): Requests rapidly mutated into 'Police Misconduct Complaints'. The incident has evolved from a physical crash into a systemic trust crisis."
  },
  {
    id: 3,
    title: "🔸 Conclusion 3: Emotional Volatility & Riot Warning",
    content: "[ EMOTION: PANIC ➡️ RAGE ] Voice tensor analysis shows acoustic features shifting from 'Shocked Screams/Trembling' to 'Rage/Profanity'. System projection: 85% probability of physical conflict and mass unrest between onlookers and first responders."
  },
  {
    id: 4,
    title: "🔸 Conclusion 4: AI Tactical Mitigation Recommendation",
    content: "[ RECOMMENDATION: DEPLOY INTERNAL AFFAIRS ] Given that precinct officers face cover-up allegations and have lost credibility. Recommendation: Immediately freeze further Almaty Traffic Police deployments; bypass hierarchy to deploy MIA Internal Affairs and OMON directly to the scene for total takeover and isolation."
  }
];

const AIConclusionsPanel = () => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language];
  const AI_CONCLUSIONS = t.conclusions;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % AI_CONCLUSIONS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const visibleConclusions = AI_CONCLUSIONS.slice(0, index + 1);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <ShieldAlert className="w-3.5 h-3.5 text-status-red" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 font-mono">
          {t.ui.cadCalls.aiIntelligenceConclusions}
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto scroll-thin pr-2">
        <AnimatePresence initial={false}>
          {visibleConclusions.map((conclusion) => (
            <motion.div
              key={conclusion.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="border-l border-black pl-3"
            >
              <div className="text-[10px] font-black text-black mb-1.5 font-mono uppercase">
                {conclusion.title}
              </div>
              <div className="text-[9px] text-slate-600 leading-relaxed font-bold font-mono">
                {conclusion.content.split(/(\[.*?\]|ALERT|CRITICAL|EMOTION|RECOMMENDATION|MASS CASUALTY|NATURE OF INCIDENT ALTERED|PANIC ➡️ RAGE|DEPLOY INTERNAL AFFAIRS|RIOT POLICE \(OMON\))/g).map((part, i) => {
                  if (/(\[.*?\]|ALERT|CRITICAL|EMOTION|RECOMMENDATION|MASS CASUALTY|NATURE OF INCIDENT ALTERED|PANIC ➡️ RAGE|DEPLOY INTERNAL AFFAIRS|RIOT POLICE \(OMON\))/.test(part)) {
                    return <span key={i} className="text-status-red font-black uppercase">{part}</span>;
                  }
                  return part;
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="flex gap-1 mt-2">
        {AI_CONCLUSIONS.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-0.5 flex-1 transition-all duration-700",
              i <= index ? "bg-black" : "bg-slate-100"
            )} 
          />
        ))}
      </div>
    </div>
  );
};

export const MajorEventWarning: React.FC<MajorEventWarningProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const t = MAJOR_EVENT_I18N[language] || MAJOR_EVENT_I18N.en;
  const ESCALATION_STAGES = t.stages;
  const SOURCE_CONTRIBUTIONS = t.sources;
  const LIVE_FEED_ITEMS = t.liveFeed;
  const MEDIA_ITEMS = t.media;
  const TIMELINE_EVENTS = t.timeline;

  const { currentTime: playbackTime, setPlaybackTime, isPlaying, speed, setIsPlaying } = usePlaybackStore();

  useEffect(() => {
    // Auto-play on entry
    setIsPlaying(true);
  }, [setIsPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        // Loop back to 0 if it reaches 100
        const nextTime = playbackTime + (0.5 * speed);
        setPlaybackTime(nextTime >= 100 ? 0 : nextTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackTime, speed, setPlaybackTime]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [cadCalls, setCadCalls] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const carouselTimer = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % MEDIA_ITEMS.length);
    }, 5000);
    const timelineTimer = setInterval(() => {
      setTimelineIndex((prev) => (prev + 1) % TIMELINE_EVENTS.length);
    }, 5000);
    
    // Simulate CAD calls incoming
    const initialCalls = [
      {
        date: language === 'zh' ? "2026/03/21" : "03/21/2026",
        time: "03:18",
        eventNo: "#87736795",
        emotions: [t.ui.cadCalls.angry, t.ui.cadCalls.hostile],
        title: t.ui.cadCalls.crowdGathering,
        narrative: t.ui.cadCalls.narratives.crowdGathering
      },
      {
        date: language === 'zh' ? "2026/03/21" : "03/21/2026",
        time: "03:05",
        eventNo: "#87736780",
        emotions: [t.ui.cadCalls.panic, t.ui.cadCalls.shock],
        title: t.ui.cadCalls.majorAccident,
        narrative: t.ui.cadCalls.narratives.majorAccident
      }
    ];
    setCadCalls(initialCalls);

    const callTimer = setInterval(() => {
      const newCall = {
        date: language === 'zh' ? "2026/03/21" : "03/21/2026",
        time: new Date().toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-GB', { hour: '2-digit', minute: '2-digit' }),
        eventNo: `#877${Math.floor(Math.random() * 90000 + 10000)}`,
        emotions: [t.ui.cadCalls.suspicious, t.ui.cadCalls.urgent],
        title: t.ui.cadCalls.recklessDriving,
        narrative: t.ui.cadCalls.narratives.recklessDriving
      };
      setCadCalls(prev => [newCall, ...prev.slice(0, 3)]);
    }, 12000);

    return () => {
      clearInterval(timer);
      clearInterval(carouselTimer);
      clearInterval(timelineTimer);
      clearInterval(callTimer);
    };
  }, []);

  const visibleTimelineEvents = [
    TIMELINE_EVENTS[timelineIndex],
    TIMELINE_EVENTS[(timelineIndex - 1 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length],
    TIMELINE_EVENTS[(timelineIndex - 2 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length],
  ];

  // 1. Cluster Data (Screenshot Rightmost -> UI Left)
  const generateOsintClusterData = () => {
    const nodes = [];
    const links = [];
    const clusterCenters = [
      { x: 0, y: 0 }, { x: 150, y: 100 }, { x: -150, y: 120 }, 
      { x: 120, y: -130 }, { x: -130, y: -110 }, { x: 0, y: 200 }
    ];
    
    clusterCenters.forEach((center, cIdx) => {
      const centerId = `c_${cIdx}`;
      nodes.push({
        id: centerId,
        x: center.x,
        y: center.y,
        symbolSize: 12,
        itemStyle: { color: '#D32F2F' }
      });
      
      for (let i = 0; i < 30; i++) {
        const nodeId = `n_${cIdx}_${i}`;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 60;
        nodes.push({
          id: nodeId,
          x: center.x + Math.cos(angle) * dist,
          y: center.y + Math.sin(angle) * dist,
          symbolSize: Math.random() * 4 + 2,
          itemStyle: { color: Math.random() > 0.8 ? '#2E7D32' : '#94a3b8', opacity: 0.6 }
        });
        links.push({ source: centerId, target: nodeId });
      }
    });
    return { nodes, links };
  };

  // 2. Core Data (Screenshot Middle -> UI Middle)
  const generateOsintCoreData = () => {
    const nodes = [];
    const links = [];
    nodes.push({ id: 'core', x: 0, y: 0, symbolSize: 20, itemStyle: { color: '#D32F2F' } });
    
    for (let i = 0; i < 250; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 180;
      const nodeId = `core_n_${i}`;
      nodes.push({
        id: nodeId,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        symbolSize: Math.random() * 5 + 2,
        itemStyle: { 
          color: dist < 50 ? '#D32F2F' : (Math.random() > 0.9 ? '#2E7D32' : '#94a3b8'),
          opacity: 0.7 
        }
      });
      if (dist < 80 || Math.random() > 0.9) {
        links.push({ source: 'core', target: nodeId });
      }
    }
    return { nodes, links };
  };

  // 3. Spherical Data (Screenshot Leftmost -> UI Right)
  const generateOsintSphericalData = () => {
    const nodes = [];
    const links = [];
    for (let i = 0; i < 400; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 0.5) * 150;
      const nodeId = `sphere_n_${i}`;
      nodes.push({
        id: nodeId,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        symbolSize: Math.random() * 4 + 1,
        itemStyle: { 
          color: Math.random() > 0.95 ? '#2E7D32' : (Math.random() > 0.8 ? '#D32F2F' : '#94a3b8'),
          opacity: 0.5 
        }
      });
      if (Math.random() > 0.98) {
        for (let j = 0; j < 5; j++) {
          links.push({ source: nodeId, target: `sphere_n_${Math.floor(Math.random() * 400)}` });
        }
      }
    }
    return { nodes, links };
  };

  const createStaticOption = (data) => ({
    backgroundColor: 'transparent',
    animation: false,
    silent: true,
    series: [{
      type: 'graph',
      layout: 'none',
      data: data.nodes,
      links: data.links,
      roam: false,
      lineStyle: { color: '#cbd5e1', width: 0.3, opacity: 0.2 },
      itemStyle: { borderWidth: 0 }
    }]
  });

  const osintClusterOption = createStaticOption(generateOsintClusterData());
  const osintCoreOption = createStaticOption(generateOsintCoreData());
  const osintSphericalOption = createStaticOption(generateOsintSphericalData());

  const cadVolumeOption = {
    backgroundColor: 'transparent',
    grid: { top: 25, bottom: 20, left: 30, right: 10 },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: '#ef4444', width: 1, type: 'dashed' } }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['03:00', '03:02', '03:04', '03:06', '03:08', '03:10', '03:12', '03:14'],
      axisLabel: { fontSize: 8, color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#e2e8f0' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 8, color: '#94a3b8' },
      splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } }
    },
    series: [
      {
        name: 'Call Volume',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        sampling: 'lttb',
        itemStyle: { color: '#ef4444' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0)' }
            ]
          }
        },
        lineStyle: { width: 2, color: '#ef4444' },
        data: [2, 1, 9, 16, 11, 5, 3, 2],
        markPoint: {
          symbol: 'pin',
          symbolSize: 20,
          data: [
            { name: 'CRASH', coord: ['03:04', 9], value: 'CRASH', itemStyle: { color: '#ef4444' }, label: { fontSize: 7, fontWeight: 'bold', offset: [0, -2] } },
            { name: 'PEAK', coord: ['03:06', 16], value: 'PEAK', itemStyle: { color: '#dc2626' }, label: { fontSize: 7, fontWeight: 'bold', offset: [0, -2] } }
          ]
        }
      }
    ]
  };

  const VoiceWaveform = () => (
    <div className="relative h-16 w-full flex items-center justify-center px-4 bg-white/50 overflow-hidden">
      {/* Center Line */}
      <div className="absolute w-full h-[1px] bg-slate-800/80 z-10" />
      
      <div className="flex items-center gap-[1px] h-full w-full">
        {[...Array(120)].map((_, i) => {
          // Generate a symmetrical jagged height pattern
          const baseHeight = Math.sin(i * 0.2) * 15 + 20;
          const randomFactor = Math.random() * 15;
          const height = Math.max(2, baseHeight + randomFactor);
          
          return (
            <motion.div
              key={i}
              className="flex-1 bg-black opacity-80" // Style change to black
              style={{ height: `${height}%`, minWidth: '1px' }}
              animate={{ 
                height: [
                  `${height}%`, 
                  `${height * (0.6 + Math.random() * 0.8)}%`, 
                  `${height}%`
                ] 
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, // Slower (was 1.5 + random)
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          );
        })}
      </div>
    </div>
  );

  const cadWordCloudOption = {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    animation: false, // Totally static
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '90%',
      height: '90%',
      right: null,
      bottom: null,
      sizeRange: [8, 32],
      rotationRange: [0, 0], // No rotation for cleaner static look
      rotationStep: 0,
      gridSize: 8,
      drawOutOfBound: false,
      layoutAnimation: false,
      textStyle: {
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 'bold',
        color: '#ef4444'
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          textShadowBlur: 10,
          textShadowColor: '#333'
        }
      },
      data: [
        { name: 'Fatal Crash', value: 1000 },
        { name: 'Blood Everywhere', value: 950 },
        { name: 'Street Racing', value: 800 },
        { name: 'Police Inaction', value: 750 },
        { name: 'Police Ignored', value: 700 },
        { name: 'Hit and Run', value: 650 },
        { name: 'Al-Farabi', value: 500 },
        { name: 'Zeekr', value: 450 },
        { name: '200KM/H', value: 400 },
        { name: 'Complaints Surge', value: 350 },
        { name: 'On-site Collusion', value: 300 },
        { name: 'Cover-up Crime', value: 250 },
        { name: '3 Lives Lost', value: 200 },
        { name: 'Alexander Pak', value: 150 },
        { name: 'Disregard for Life', value: 100 },
        { name: 'Sentiment Out of Control', value: 90 },
        { name: 'Ambulance Delay', value: 80 },
        { name: 'Privileged Class', value: 70 },
        { name: 'Systemic Distrust', value: 60 },
        { name: 'Riot Warning', value: 50 }
      ]
    }]
  };

  const SNATransferFlow = ({ title = "SNA TRANSACTION FLOW ANALYSIS", scale = "OMEGA" }) => {
    const nodes = [
      { id: 'ap', name: 'Alexander Pak', type: 'Target', x: 400, y: 300, icon: <User className="w-3 h-3" /> },
      { id: 'ps', name: 'Pak Sr.', type: 'Family', x: 300, y: 200, icon: <Users className="w-3 h-3" /> },
      { id: 'dv', name: 'Deputy Dir. V', type: 'Bureau', x: 500, y: 200, icon: <ShieldCheck className="w-3 h-3" /> },
      { id: 'os', name: 'Officer S.', type: 'Personnel', x: 580, y: 320, icon: <ShieldAlert className="w-3 h-3" /> },
      { id: 'sc_a', name: 'Shell Co A (BVI)', type: 'Layering', x: 250, y: 350, icon: <Building2 className="w-3 h-3" /> },
      { id: 'sc_b', name: 'Shell Co B (Cayman)', type: 'Layering', x: 180, y: 280, icon: <Building2 className="w-3 h-3" /> },
      { id: 'sc_c', name: 'Shell Co C (Sey)', type: 'Layering', x: 220, y: 450, icon: <Building2 className="w-3 h-3" /> },
      { id: 're_h', name: 'Almaty Real Estate', type: 'Integration', x: 400, y: 100, icon: <Home className="w-3 h-3" /> },
      { id: 'la_i', name: 'Luxury Auto Ltd', type: 'Integration', x: 620, y: 220, icon: <Car className="w-3 h-3" /> },
      { id: 'hb_a', name: 'Halyk Bank (Main)', type: 'Financial', x: 400, y: 480, icon: <CreditCard className="w-3 h-3" /> },
      { id: 'sb_a', name: 'Swiss Bank (Secret)', type: 'Financial', x: 80, y: 300, icon: <CreditCard className="w-3 h-3" /> },
      { id: 'cw_c', name: 'Crypto Wallet', type: 'Financial', x: 150, y: 150, icon: <Zap className="w-3 h-3" /> },
      { id: 'ft_s', name: 'Family Trust (SG)', type: 'Family', x: 300, y: 520, icon: <Briefcase className="w-3 h-3" /> },
      { id: 'as_a', name: 'Mule A', type: 'Associate', x: 720, y: 300, icon: <User className="w-3 h-3" /> },
      { id: 'as_b', name: 'Mule B', type: 'Associate', x: 720, y: 400, icon: <User className="w-3 h-3" /> },
      { id: 'as_c', name: 'Mule C', type: 'Associate', x: 650, y: 480, icon: <User className="w-3 h-3" /> },
      { id: 'cl_n', name: 'Casino Node', type: 'Integration', x: 550, y: 520, icon: <Dices className="w-3 h-3" /> },
      { id: 'ai_i', name: 'Art Investment', type: 'Integration', x: 750, y: 180, icon: <Palette className="w-3 h-3" /> },
      { id: 'pj_l', name: 'Jet Leasing Co', type: 'Integration', x: 80, y: 450, icon: <Plane className="w-3 h-3" /> },
      { id: 'lf_f', name: 'Legal Firm', type: 'Facilitator', x: 520, y: 80, icon: <Scale className="w-3 h-3" /> },
      { id: 'ot_j', name: 'Offshore Trust (JSY)', type: 'Layering', x: 100, y: 100, icon: <Lock className="w-3 h-3" /> },
      { id: 'pe_f', name: 'Private Equity Fund', type: 'Layering', x: 650, y: 100, icon: <TrendingUp className="w-3 h-3" /> }
    ];

    const links = [
      { from: 'ap', to: 'ps', type: 'family' },
      { from: 'ap', to: 'dv', type: 'bribe' },
      { from: 'ap', to: 'sc_a', type: 'transfer' },
      { from: 'sc_a', to: 'sc_b', type: 'layering' },
      { from: 'sc_b', to: 'sb_a', type: 'offshore' },
      { from: 'ap', to: 'hb_a', type: 'main' },
      { from: 'hb_a', to: 'ft_s', type: 'trust' },
      { from: 'dv', to: 'lf_f', type: 'professional' },
      { from: 'ap', to: 'la_i', type: 'purchase' },
      { from: 'ps', to: 're_h', type: 'investment' },
      { from: 'ap', to: 'cw_c', type: 'crypto' },
      { from: 'cw_c', to: 'sb_a', type: 'exit' },
      { from: 'ap', to: 'as_a', type: 'mule' },
      { from: 'ap', to: 'as_b', type: 'mule' },
      { from: 'ap', to: 'as_c', type: 'mule' },
      { from: 'as_a', to: 'cl_n', type: 'laundering' },
      { from: 'as_b', to: 'cl_n', type: 'laundering' },
      { from: 'cl_n', to: 'hb_a', type: 'clean' },
      { from: 'ap', to: 'pj_l', type: 'lease' },
      { from: 'as_c', to: 'ai_i', type: 'art' },
      { from: 'sc_b', to: 'ot_j', type: 'layering' },
      { from: 'dv', to: 'pe_f', type: 'investment' }
    ];

    return (
      <div className="relative w-full h-full bg-white overflow-hidden select-none border border-black flex flex-col font-mono">
        <div className="flex-1 relative overflow-hidden">
          {/* Palantir Grid Background */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '10px 10px' 
          }} />

          {/* SVG Layer for Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
            <defs>
              <marker id="palantirArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
              </marker>
            </defs>

            {links.map((link, i) => {
              const fromNode = nodes.find(n => n.id === link.from);
              const toNode = nodes.find(n => n.id === link.to);
              if (!fromNode || !toNode) return null;

              // Calculate control point for curved lines
              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;
              const dx = toNode.x - fromNode.x;
              const dy = toNode.y - fromNode.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const offset = dist * 0.1;
              const cpX = midX - dy * (offset / dist);
              const cpY = midY + dx * (offset / dist);

              return (
                <g key={i}>
                  <path
                    d={`M ${fromNode.x} ${fromNode.y} Q ${cpX} ${cpY} ${toNode.x} ${toNode.y}`}
                    stroke="#000"
                    strokeWidth="0.5"
                    fill="none"
                    markerEnd="url(#palantirArrow)"
                    style={{ opacity: 0.2 }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes Layer */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute group cursor-pointer"
              style={{ 
                left: node.x, 
                top: node.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={cn(
                "bg-white border border-black px-1.5 py-1 rounded-none shadow-sm min-w-[80px] flex items-center gap-1.5 transition-all hover:shadow-md hover:scale-105",
                node.type === 'Target' ? "bg-red-50 border-red-600" : "border-black"
              )}>
                <div className={cn(
                  "w-4 h-4 rounded-none flex items-center justify-center shrink-0",
                  node.type === 'Target' ? "bg-red-600 text-white" : "bg-black text-white"
                )}>
                  {node.icon}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[7px] font-black text-black uppercase tracking-tighter truncate max-w-[60px]">
                    {node.name}
                  </span>
                  <span className="text-[5px] font-black text-slate-400 uppercase tracking-widest">
                    {node.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 z-[10] bg-white text-black overflow-y-auto scroll-smooth font-sans selection:bg-slate-100">
      <PlaybackPageHeader />

      <main className="max-w-[1600px] mx-auto p-4 space-y-4 pb-24">
        <EscalationHeroSection />
        <EscalationMainGrid />

      {/* OSINT Global Radar Engine Section (Preserved) */}
      <section className="bg-white border border-slate-200 shadow-sm mx-4 mb-12">
          <div className="px-4 py-2 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-400 font-mono">OSINT Global Radar Engine</h2>
          </div>

      {/* Row 1: OSINT DATA */}
      <div className="flex border-b border-black">
        <div className="w-[70%] p-4 bg-white flex gap-2">
          {/* Left: Clusters */}
          <div className="flex-1 h-48 border border-black bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            <ReactECharts option={osintClusterOption} style={{ height: '100%' }} />
            <div className="absolute bottom-1.5 left-2 text-[7px] font-mono text-slate-400 uppercase font-bold">Scale: Cluster-Alpha</div>
          </div>

          {/* Middle: Core */}
          <div className="flex-1 h-48 border border-black bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            <ReactECharts option={osintCoreOption} style={{ height: '100%' }} />
            <div className="absolute bottom-1.5 left-2 text-[7px] font-mono text-slate-400 uppercase font-bold">Scale: Core-Beta</div>
          </div>

          {/* Right: Spherical */}
          <div className="flex-1 h-48 border border-black bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            <ReactECharts option={osintSphericalOption} style={{ height: '100%' }} />
            <div className="absolute bottom-1.5 left-2 text-[7px] font-mono text-slate-400 uppercase font-bold">Scale: Sphere-Gamma</div>
          </div>
        </div>
        <div className="w-[30%] p-0 bg-white border-l border-black">
          <TypewriterCard />
        </div>
      </div>

      <div className="px-4 py-2 border-b border-black bg-slate-50">
        <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-black font-mono">{t.ui.dispatchCenter}</h2>
      </div>

      {/* Row 2: CAD VOICE-AI */}
      <div className="flex border-b border-black h-[400px]">
        <div className="w-[70%] p-4 bg-white flex gap-0 border-r border-black">
          {/* Left Side: CAD HISTORY */}
          <div className="w-1/2 pr-6 border-r border-black flex flex-col">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black text-black uppercase tracking-widest font-mono">{t.ui.cadHistoryTitle}</h3>
              <div className="flex items-center gap-2 text-black">
                <Phone className="w-3.5 h-3.5" />
                <MapPin className="w-3.5 h-3.5" />
                <Car className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Column Headers */}
            <div className="flex items-center gap-3 py-1 border-b border-black text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">
              <div className="w-[70px]">{t.ui.timestamp}</div>
              <div className="w-[80px]">{t.ui.eventNo}</div>
              <div className="flex-1">{t.ui.emotions}</div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto space-y-4 pt-4 pr-2 scroll-thin">
              {(t.ui.cadHistoryItems || []).map((event: any, idx: number) => (
                <div key={idx} className="border-b border-black/10 pb-4 last:border-0 group">
                  {/* Top: Date and Event Number */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {event.date} {event.time}
                    </div>
                    <div className="font-mono text-[10px] font-black text-black">
                      {t.ui.eventNo}: {event.eventNo}
                    </div>
                  </div>

                  {/* Middle: Black box with white text for Title */}
                  <div className="mb-2 flex flex-wrap gap-2 items-center">
                    <div className="bg-black text-white px-2 py-1 text-[9px] font-black uppercase tracking-widest font-mono">
                      {event.title}
                    </div>
                    <div className="flex gap-1">
                      {event.emotions.map((emo: string, i: number) => (
                        <span key={i} className="text-[8px] font-black text-status-red border border-status-red/30 px-1 py-0.5 uppercase tracking-tighter">
                          {emo}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom: Italicized narrative content */}
                  <div className="text-[10px] text-slate-600 italic leading-relaxed font-bold font-mono uppercase tracking-tight">
                    {event.narrative}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Chart & Word Cloud & AI Insights */}
          <div className="w-1/2 pl-8 flex flex-col relative">
            <div className="border-b border-black/10 pb-2">
              <div className="text-[8px] font-mono font-black text-slate-400 mb-1 uppercase tracking-widest">{t.ui.callVolumeVelocity}</div>
              <div className="h-24">
                <ReactECharts option={cadVolumeOption} style={{ height: '100%' }} />
              </div>
            </div>
            
            <div className="pt-2 flex flex-col border-b border-black/10 pb-2">
              <div className="text-[8px] font-mono font-black text-slate-400 mb-2 uppercase tracking-widest">{t.ui.keywordCloud}</div>
              <div className="h-24 border border-black/10 bg-white relative overflow-hidden">
                <ReactECharts 
                  option={cadWordCloudOption} 
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
                <div className="absolute bottom-1 right-2 text-[6px] font-mono text-slate-300 uppercase tracking-widest font-bold">{t.ui.semanticCloud}</div>
              </div>
            </div>

            <div className="pt-2 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-3 bg-black" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono">{t.ui.aiTacticalInference}</span>
              </div>
              <p className="text-[9px] text-black leading-tight font-bold mb-2 font-mono">
                {t.ui.aiTacticalInferenceText}
              </p>
              <div className="h-10">
                <VoiceWaveform />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] p-6 bg-white flex flex-col overflow-y-auto max-h-[450px]">
          <AIConclusionsPanel />
        </div>
      </div>

          <div className="px-8 py-4 border-b border-black bg-slate-50/50">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 font-mono">{t.ui.skynetPlatform}</h2>
          </div>

          {/* Row 3: VMS VIDEO ANALYTICS */}
          <div className="flex border-b border-black">
            <div className="w-[70%] p-8 bg-white border-r border-black">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-black" />
                  <span className="text-[10px] font-bold uppercase tracking-widest font-mono">{t.ui.vmsVideoAnalytics}</span>
                </div>
                <div className="font-mono text-[10px] font-bold text-status-red tracking-widest">{t.ui.velocity}: 215 KM/H</div>
              </div>
              <div className="h-64 border border-black relative overflow-hidden bg-slate-900">
                {/* Mock GIS Map for Al-Farabi Ave */}
                <div className="absolute inset-0 opacity-40 grayscale" style={{ 
                  backgroundImage: 'url(https://picsum.photos/seed/almaty-city-map/1200/800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                
                {/* Map Grid Overlay */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', 
                  backgroundSize: '40px 40px' 
                }} />

                {/* GIS Elements */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Al-Farabi Ave Main Road Structure */}
                  <path d="M 0 180 Q 400 160 800 140" stroke="#1e293b" strokeWidth="24" fill="none" opacity="0.5" />
                  
                  {/* Two Red Lines (Lanes) */}
                  <path id="eastboundLane" d="M 0 185 Q 400 165 800 145" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.8" />
                  <path id="westboundLane" d="M 800 135 Q 400 155 0 175" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.8" />
                  
                  {/* Connecting Lines from Video Windows to Road */}
                  <line x1="80" y1="75" x2="120" y2="175" stroke="#000" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="400" y1="75" x2="400" y2="160" stroke="#000" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="720" y1="75" x2="680" y2="145" stroke="#000" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Incident Point */}
                  <circle cx="450" cy="158" r="4" fill="#ef4444" className="animate-pulse" />
                  <circle cx="450" cy="158" r="8" stroke="#ef4444" strokeWidth="1" fill="none" className="animate-ping" />
                  
                  {/* Car 1: Eastbound (Left to Right) */}
                  <g>
                    <rect width="8" height="4" fill="#ffffff" rx="1" transform="translate(-4,-2)" />
                    <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#eastboundLane" />
                    </animateMotion>
                  </g>

                  {/* Car 2: Westbound (Right to Left) */}
                  <g>
                    <rect width="8" height="4" fill="#ef4444" rx="1" transform="translate(-4,-2)" />
                    <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#westboundLane" />
                    </animateMotion>
                  </g>
                  
                  {/* Police Units */}
                  <g transform="translate(420, 165)">
                    <rect width="12" height="6" fill="#000" rx="1" />
                    <text x="14" y="6" fill="#000" className="text-[8px] font-mono font-bold">UNIT-01-XXX</text>
                  </g>
                </svg>

                {/* Floating Video Windows */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Left Video */}
                  <div className="absolute top-4 left-4 w-44 h-28 bg-black border border-black shadow-lg pointer-events-auto overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-black flex items-center px-2 justify-between z-10 border-b border-white/20">
                      <span className="text-[7px] font-mono text-white font-bold">CAM-01 [AL-FARABI WEST]</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <iframe 
                      className="w-full h-full pt-4"
                      src="https://www.youtube.com/embed/Vi0JiFqB5dc?autoplay=1&mute=1&controls=0&loop=1&playlist=Vi0JiFqB5dc&enablejsapi=1" 
                      title="CAM-01"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>

                  {/* Center Video */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-44 h-28 bg-black border border-black shadow-lg pointer-events-auto overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-black flex items-center px-2 justify-between z-10 border-b border-white/20">
                      <span className="text-[7px] font-mono text-white font-bold">CAM-02 [INCIDENT SITE]</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <iframe 
                      className="w-full h-full pt-4"
                      src="https://www.youtube.com/embed/b5KMKucqRkA?autoplay=1&mute=1&controls=0&loop=1&playlist=b5KMKucqRkA&enablejsapi=1" 
                      title="CAM-02"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>

                  {/* Right Video */}
                  <div className="absolute top-4 right-12 w-44 h-28 bg-black border border-black shadow-lg pointer-events-auto overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-black flex items-center px-2 justify-between z-10 border-b border-white/20">
                      <span className="text-[7px] font-mono text-white font-bold">{t.ui.cam03}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <iframe 
                      className="w-full h-full pt-4"
                      src="https://www.youtube.com/embed/LsR7g7_Q6Fg?autoplay=1&mute=1&controls=0&loop=1&playlist=LsR7g7_Q6Fg&enablejsapi=1" 
                      title="CAM-03"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>

                {/* Map Controls UI */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white border border-black p-1.5 shadow-sm">
                    <Maximize2 className="w-3 h-3 text-black" />
                  </div>
                  <div className="bg-white border border-black p-1.5 shadow-sm">
                    <Search className="w-3 h-3 text-black" />
                  </div>
                </div>

                {/* GIS Coordinates Overlay */}
                <div className="absolute bottom-4 left-4 bg-black border border-white/20 px-3 py-2 backdrop-blur-md flex flex-col gap-1 shadow-2xl z-20">
                  <div className="text-[9px] font-mono text-emerald-400 font-bold tracking-[0.2em]">
                    {t.ui.gisLabel}
                  </div>
                  <a 
                    href="https://www.google.com/search?q=Almaty+Zeekr+accident+location+details"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[7px] font-mono text-blue-400 font-bold flex items-center gap-1.5 hover:text-blue-300 transition-colors"
                  >
                    <Globe className="w-2.5 h-2.5" />
                    {t.ui.googleIntel}
                    <ExternalLink className="w-2 h-2" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-[30%] p-8 flex flex-col justify-center bg-slate-50/20">
              <div className="space-y-6">
                <div className="border-b border-black pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2 font-mono">{t.ui.targetBehavior}</span>
                  <span className="text-sm font-bold text-status-red font-mono">{t.ui.illegalRacing}</span>
                </div>
                <p className="text-xs text-black leading-relaxed font-bold font-mono">
                  {t.ui.behaviorDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BOTTOM: ADVANCED INTELLIGENCE GRID */}
        <section className="p-4 bg-white border-t border-black">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black font-mono">{t.ui.advancedIntelligence}</h2>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* UAV INSPECTION */}
            <div className="bg-white border border-black p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-black" />
                  <span className="text-[9px] font-black uppercase tracking-widest font-mono">{t.ui.uavInspection}</span>
                </div>
                <span className="text-[7px] font-mono font-black text-emerald-600">{t.ui.swarmDeployed}</span>
              </div>
              <div className="aspect-video bg-slate-100 border border-black mb-4 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=600&fit=crop&q=80" 
                  className="w-full h-full object-cover grayscale opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.05 }} />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-600 animate-pulse" />
                  <span className="text-[7px] font-mono text-emerald-600 font-black uppercase">LIVE_FEED // T+8 MINS</span>
                </div>
              </div>
              <p className="text-[9px] text-black leading-tight font-bold font-mono">
                {t.ui.uavDescription}
              </p>
            </div>

            {/* CROWD DYNAMICS */}
            <div className="bg-white border border-black p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-black" />
                  <span className="text-[9px] font-black uppercase tracking-widest font-mono">{t.ui.crowdDynamics}</span>
                </div>
                <span className="text-[7px] font-mono font-black text-status-red">{t.ui.trafficFlowHigh}</span>
              </div>
              <div className="aspect-video border border-black mb-4 relative overflow-hidden bg-slate-900">
                {/* Almaty District GIS Map (Screenshot) */}
                <div className="absolute inset-0 opacity-80" style={{ 
                  backgroundImage: 'url(https://raw.githubusercontent.com/CarliYz/image/main/%E6%88%AA%E5%B1%8F2026-04-07%2016.26.18.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                
                {/* Map Grid Overlay */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                  backgroundSize: '30px 30px' 
                }} />

                {/* Heatmaps */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <radialGradient id="redHeat" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="yellowHeat" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#eab308" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                    </radialGradient>
                    <filter id="blurFilter">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                    </filter>
                  </defs>

                  {/* Left Red Heatmap */}
                  <circle cx="25%" cy="40%" r="40" fill="url(#redHeat)" filter="url(#blurFilter)" />
                  {/* Right Red Heatmap */}
                  <circle cx="75%" cy="45%" r="45" fill="url(#redHeat)" filter="url(#blurFilter)" />
                  {/* Center-Bottom Yellow Heatmap (Smaller) */}
                  <circle cx="50%" cy="75%" r="25" fill="url(#yellowHeat)" filter="url(#blurFilter)" />
                </svg>

                {/* GIS Label */}
                <div className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[7px] font-mono text-emerald-400 font-black uppercase tracking-widest">
                  {t.ui.gisLabel}
                </div>
              </div>
              <p className="text-[9px] text-black leading-tight font-bold font-mono">
                {t.ui.crowdDescription}
              </p>
            </div>

            {/* SNA MATRIX */}
            <div className="bg-white border border-black p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Network className="w-3.5 h-3.5 text-black" />
                  <span className="text-[9px] font-black uppercase tracking-widest font-mono">{t.ui.snaMatrix}</span>
                </div>
                <span className="text-[7px] font-mono font-black text-slate-400">{t.ui.relationshipMatrix}</span>
              </div>
              <div className="aspect-video border border-black mb-4">
                <SNATransferFlow title={t.ui.snaTitle} scale={t.ui.snaScale} />
              </div>
              <p className="text-[9px] text-black leading-tight font-bold font-mono">
                {t.ui.snaDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Footer Spacer */}
        <div className="h-32" />
      </main>

      <ActionControlFooter />
      <IncidentDetailDrawer />
    </div>
  );
};
