import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Shield, 
  AlertCircle, 
  Video, 
  Navigation, 
  MessageSquare, 
  Activity, 
  MapPin, 
  Info, 
  Radio, 
  CheckCircle2, 
  XCircle,
  Clock,
  Users,
  Zap,
  PhoneCall,
  PhoneOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

// --- Types ---

interface CommLogEntry {
  id: string;
  time: string;
  source: string;
  message: string;
  type: 'normal' | 'alert' | 'sensitive';
}

interface ConferenceMessage {
  id: string;
  time: string;
  dept: string;
  role: string;
  message: string;
}

interface Recommendation {
  id: string;
  title: string;
  reason: string;
  action: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// --- Seed Data ---

const INCIDENT_STATES = [
  {
    summary: "03:29 First dispatch. High-speed collision on Al-Farabi Avenue. 1 fatality initially found. Emergency units rushing to the core area.",
    fatalities: 1,
    criticalInjured: 0,
    policeUnits: 12,
    medicalTeams: 4
  },
  {
    summary: "Rescue operations in full swing. Extraction reveals more trapped individuals. Confirmed fatalities risen to 4. Surrounding roads physically isolated.",
    fatalities: 4,
    criticalInjured: 0,
    policeUnits: 24,
    medicalTeams: 8
  },
  {
    summary: "Medical assessment complete. 1 injured with extremely unstable vitals sent to trauma center. Final count: 3 fatalities, 1 critical injury. Evidence collection ongoing.",
    fatalities: 3,
    criticalInjured: 1,
    policeUnits: 18,
    medicalTeams: 6
  }
];

const INITIAL_INCIDENT = {
  id: 'E-20260321-AF-01',
  type: 'Major Traffic Accident / Illegal Racing Alert',
  location: 'Al-Farabi Ave × Mendikulov St',
  status: 'ACTIVE COMMAND',
  roadStatus: 'CORE LANES BLOCKED',
  publicRisk: 'HIGH',
  sensitiveFlag: 'ALLEGED POLICE-LINKED VEHICLE',
};

const CONFERENCE_SEEDS: Omit<ConferenceMessage, 'id'>[] = [
  { time: '03:29:49', dept: 'CMD-01', role: 'Command Desk', message: 'Confirming accident core location, initiating <red>Major Traffic Accident Response</red>. First, lock down casualty count, passable lanes, and secondary collision risks.' },
  { time: '03:29:52', dept: 'UAV-01', role: 'UAV Recon', message: 'On site. Overhead footage shows severe frontal overlap, center area completely blocked. <red>Impact Core</red> initially judged to be in the middle of the main road.' },
  { time: '03:29:56', dept: 'EMS-12', role: 'EMS Dispatch', message: 'We see at least <red>3 unresponsive persons</red> in the Mercedes. Another injured person on the road likely from the other vehicle, status <red>Critical</red>.' },
  { time: '03:29:59', dept: 'TPD-03', role: 'Traffic Control', message: 'Eastbound traffic slowed, but vehicles still approaching from the west. Recommend immediate <red>Two-way Lockdown</red> and clearing emergency lanes.' },
  { time: '03:30:03', dept: 'FIR-02', role: 'Fire Rescue', message: 'Copy. Passenger side and front cabin severely crushed, hydraulic spreaders entering. No fire visible, but risk of electrical and fuel leaks.' },
  { time: '03:30:06', dept: 'HSP-07', role: 'Hospital Link', message: 'Trauma center reserved 1 ER slot and 1 ICU bed. Confirm if <red>Critical Injury</red> is stable for transport ASAP.' },
  { time: '03:30:10', dept: 'CMD-01', role: 'Command Desk', message: 'Copy all units. Traffic police expand perimeter to 500m. EMS prioritize the <red>Critical Patient</red>. UAV maintain high-altitude tracking of the suspect vehicle escape route.' },
  { time: '03:30:15', dept: 'POL-09', role: 'Field Unit', message: 'Suspect vehicle identified as a <red>Zeekr 001 FR</red>, license plate KZ 102 POL. Tracing LBS signals and checkpoint history now.' },
  { time: '03:30:20', dept: 'INT-04', role: 'Intelligence', message: 'LBS hit. Suspect phone active near <red>Sairan Lake</red>. Signal is moving fast. Coordinating with local precinct for interception.' },
  { time: '03:30:25', dept: 'CMD-01', role: 'Command Desk', message: 'Understood. All units near Sairan Lake, prepare for <red>High-Speed Intercept</red>. Do not engage without backup.' },
  { time: '03:30:30', dept: 'MED-02', role: 'Medical Supervisor', message: 'Critical patient stabilized for transport. ETA to trauma center: 8 minutes. Requesting <red>Green Wave</red> on Abay Ave.' },
];

const RECOMMENDATION_SEEDS: Recommendation[] = [
  { id: '1', title: 'Initiate Trauma Center Priority Link', reason: 'Latest report shows <red>1 Critical Injury</red>', action: 'Immediately contact city trauma center dispatch, open green emergency channel and reserve ICU bed.', status: 'pending' },
  { id: '2', title: 'Expand Core Lockdown Perimeter', reason: 'Traffic police and UAV report <red>Increasing Onlookers</red>', action: 'Expand perimeter from 100m to 300m and set up second-tier traffic diversion points.', status: 'pending' },
  { id: '3', title: 'Secure Scene Video Evidence', reason: 'Conference stream mentions <red>High-speed Racing</red>', action: 'Immediately package and retrieve 15-min video cache from checkpoints, intersections, and preceding road segments.', status: 'pending' },
  { id: '4', title: 'Initiate Prosecution / Forensic Notification', reason: 'Key info: <red>3 Fatalities</red> reported', action: 'Notify forensic duty team and prosecution liaison to standby; synchronize death confirmation and evidence chain preservation.', status: 'pending' },
  { id: '5', title: 'Answer Incoming High-Priority Call', reason: 'Incoming call from <red>City Mayor Office</red>', action: 'Establish secure voice link and provide preliminary incident briefing.', status: 'pending' },
];

// --- Helper Components ---

const HighlightedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const parts = text.split(/(<red>.*?<\/red>|<amber>.*?<\/amber>)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('<red>')) {
          return <span key={i} className="text-status-red font-black">{part.replace(/<\/?red>/g, '')}</span>;
        }
        if (part.startsWith('<amber>')) {
          return <span key={i} className="text-status-yellow font-black">{part.replace(/<\/?amber>/g, '')}</span>;
        }
        return part;
      })}
    </span>
  );
};

const TypewriterText: React.FC<{ 
  text: string; 
  onComplete?: () => void;
  delay?: number;
}> = ({ text, onComplete, delay = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay, onComplete]);

  return <HighlightedText text={displayedText} className="text-slate-500" />;
};

const ScoreboardNumber: React.FC<{ value: number; colorClass?: string; size?: string }> = ({ value, colorClass, size = "text-2xl" }) => {
  return (
    <div className={cn("relative overflow-hidden", size === "text-4xl" ? "h-12" : "h-8")}>
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className={cn("font-black leading-none", size, colorClass)}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

// --- Main Component ---

export const EmergencyCmdScenario: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language as keyof typeof PRE_EVENT_I18N] || PRE_EVENT_I18N.en;
  
  const translatedIncidentStates = useMemo(() => INCIDENT_STATES.map((state, i) => ({
    ...state,
    summary: t.emergencyCmd.incidentStates[i] || state.summary
  })), [t.emergencyCmd.incidentStates]);

  const translatedConferenceSeeds = useMemo(() => CONFERENCE_SEEDS.map((seed, i) => ({
    ...seed,
    role: t.emergencyCmd.conferenceSeeds[i]?.role || seed.role,
    message: t.emergencyCmd.conferenceSeeds[i]?.message || seed.message
  })), [t.emergencyCmd.conferenceSeeds]);

  const translatedRecommendationSeeds = useMemo(() => RECOMMENDATION_SEEDS.map((seed, i) => ({
    ...seed,
    title: t.emergencyCmd.recommendations[i]?.title || seed.title,
    reason: t.emergencyCmd.recommendations[i]?.reason || seed.reason,
    action: t.emergencyCmd.recommendations[i]?.action || seed.action
  })), [t.emergencyCmd.recommendations]);

  const [incidentStateIdx, setIncidentStateIdx] = useState(0);
  const [confMessages, setConfMessages] = useState<ConferenceMessage[]>([]);
  const [commLogs, setCommLogs] = useState<CommLogEntry[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [currentTime, setCurrentTime] = useState('03:31:15');
  const [isTyping, setIsTyping] = useState(false);
  const [nextMsgIdx, setNextMsgIdx] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with some data to avoid empty state
  useEffect(() => {
    const initialMsgs = translatedConferenceSeeds.slice(0, 3).map((m, i) => ({
      ...m,
      id: `init-conf-${i}`
    }));
    setConfMessages(initialMsgs);
    setNextMsgIdx(3);

    const initialLogs = initialMsgs.map((m, i) => ({
      id: `init-log-${i}`,
      time: m.time,
      source: m.dept,
      message: m.message,
      type: m.message.includes('<red>') ? 'alert' : 'normal' as const
    })).reverse();
    setCommLogs(initialLogs);

    setRecommendations([translatedRecommendationSeeds[0], translatedRecommendationSeeds[1]]);
  }, [translatedConferenceSeeds, translatedRecommendationSeeds]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [confMessages]);

  // Incident State Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIncidentStateIdx(prev => (prev + 1) % translatedIncidentStates.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [translatedIncidentStates.length]);

  // Conference & CommLog Linkage
  useEffect(() => {
    if (isTyping || confMessages.length === 0) return;

    const triggerNext = () => {
      setIsTyping(true);
      const msg = translatedConferenceSeeds[nextMsgIdx];
      const newMsg = { ...msg, id: `conf-${Date.now()}` };
      
      setConfMessages(prev => [...prev, newMsg]);
      setNextMsgIdx(prev => (prev + 1) % translatedConferenceSeeds.length);
    };

    const timer = setTimeout(triggerNext, 6000);
    return () => clearTimeout(timer);
  }, [isTyping, nextMsgIdx, confMessages.length, translatedConferenceSeeds]);

  const handleMsgComplete = React.useCallback(() => {
    setIsTyping(false);
    
    setConfMessages(currentMsgs => {
      const lastMsg = currentMsgs[currentMsgs.length - 1];
      if (!lastMsg) return currentMsgs;

      // Add to CommLog
      const newLog: CommLogEntry = {
        id: `log-${Date.now()}`,
        time: lastMsg.time,
        source: lastMsg.dept,
        message: lastMsg.message,
        type: lastMsg.message.includes('<red>') ? 'alert' : 'normal'
      };
      
      setCommLogs(prev => [newLog, ...prev].slice(0, 8));

      // Link Recommendation based on keywords
      const msgText = lastMsg.message.toLowerCase();
      let rec: Recommendation | null = null;

      if (msgText.includes('casualty') || msgText.includes('injured') || msgText.includes('critical') || msgText.includes('伤') || msgText.includes('死')) {
        rec = translatedRecommendationSeeds[0];
      } else if (msgText.includes('lockdown') || msgText.includes('traffic') || msgText.includes('perimeter') || msgText.includes('封锁') || msgText.includes('交通')) {
        rec = translatedRecommendationSeeds[1];
      } else if (msgText.includes('footage') || msgText.includes('video') || msgText.includes('racing') || msgText.includes('视频') || msgText.includes('飙车')) {
        rec = translatedRecommendationSeeds[2];
      } else if (msgText.includes('fatalities') || msgText.includes('unresponsive') || msgText.includes('死亡')) {
        rec = translatedRecommendationSeeds[3];
      }

      if (rec) {
        setRecommendations(prev => {
          if (prev.some(r => r.id === rec!.id)) return prev;
          return [rec!, ...prev].slice(0, 3);
        });
      }

      // Randomly trigger the "Answer Call" recommendation
      if (Math.random() > 0.7) {
        const callRec = translatedRecommendationSeeds[4];
        setRecommendations(prev => {
          if (prev.some(r => r.id === callRec.id)) return prev;
          return [callRec, ...prev].slice(0, 3);
        });
      }

      return currentMsgs;
    });
  }, [translatedRecommendationSeeds]);

  const handleAcceptRec = (id: string) => {
    const rec = recommendations.find(r => r.id === id);
    if (!rec) return;

    setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
    
    // Add confirmation message to chat
    const newMsg: ConferenceMessage = {
      id: `conf-ack-${Date.now()}`,
      time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      dept: 'CMD-01',
      role: language === 'zh' ? '指挥台' : 'Command Desk',
      message: language === 'zh' ? `操作已授权: <amber>${rec.title}</amber>。正在启动协议。` : `Action Authorized: <amber>${rec.title}</amber>. Initiating protocol now.`
    };
    setConfMessages(prev => [...prev, newMsg]);

    setTimeout(() => {
      setRecommendations(prev => prev.filter(r => r.id !== id));
    }, 2000);
  };

  const currentState = translatedIncidentStates[incidentStateIdx];
  const lastMsgIdx = confMessages.length - 1;

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] font-mono text-black overflow-hidden">
      <div className="flex-1 grid grid-cols-12 grid-rows-12 gap-px bg-black/10 p-px overflow-hidden">
        
        {/* LEFT PANEL: Incident & Logs */}
        <div className="col-span-3 row-span-12 flex flex-col bg-white border-r border-black overflow-hidden">
          {/* Module 1: Incident Card (Redesigned) */}
          <div className="h-[40%] flex flex-col border-b border-black bg-slate-50/50 overflow-hidden">
            {/* Top 30%: Indicators */}
            <div className="px-3 py-1.5 h-[25%] border-b border-black/5 flex flex-col justify-center space-y-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-status-red" />
                  <span className="text-[9px] font-black uppercase tracking-tighter">{t.emergencyCmd.incidentProfile}</span>
                </div>
                <div className="px-1.5 py-0.5 bg-black text-white text-[7px] font-black animate-pulse">{t.emergencyCmd.active}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-[8px] font-black text-slate-400 uppercase">{t.emergencyCmd.id}: <span className="text-black">{INITIAL_INCIDENT.id}</span></div>
                <div className="text-[8px] font-black text-slate-400 uppercase">{t.emergencyCmd.status}: <span className="text-status-red">{INITIAL_INCIDENT.status}</span></div>
              </div>
              <div className="text-[8px] font-black text-slate-400 uppercase truncate">{t.emergencyCmd.location}: <span className="text-black">{INITIAL_INCIDENT.location}</span></div>
            </div>
            
            {/* Middle 40%: Dynamic Summary */}
            <div className="px-3 py-1.5 h-[45%] bg-white border-y border-black/5 flex flex-col justify-center">
              <div className="text-[8px] font-black text-slate-400 uppercase mb-0.5">{t.emergencyCmd.situationSummary}</div>
              <div className="text-[9px] font-bold text-slate-700 leading-tight overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={incidentStateIdx}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.4 }}
                  >
                    {currentState.summary}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom 30%: Casualties */}
            <div className="px-3 py-1.5 h-[30%] grid grid-cols-2 gap-px bg-black/5 bg-slate-50/80">
              <div className="flex flex-col items-center justify-center border-r border-b border-black/5">
                <div className="text-[8px] font-black text-slate-400 uppercase">{t.emergencyCmd.fatalities}</div>
                <ScoreboardNumber value={currentState.fatalities} colorClass="text-status-red" size="text-xl" />
              </div>
              <div className="flex flex-col items-center justify-center border-b border-black/5">
                <div className="text-[8px] font-black text-slate-400 uppercase">{t.emergencyCmd.criticalInjured}</div>
                <ScoreboardNumber value={currentState.criticalInjured} colorClass="text-status-yellow" size="text-xl" />
              </div>
              <div className="flex flex-col items-center justify-center border-r border-black/5">
                <div className="text-[8px] font-black text-slate-400 uppercase">{t.emergencyCmd.policeUnits}</div>
                <ScoreboardNumber value={currentState.policeUnits || 0} colorClass="text-blue-600" size="text-lg" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-[8px] font-black text-slate-400 uppercase">{t.emergencyCmd.medicalTeams}</div>
                <ScoreboardNumber value={currentState.medicalTeams || 0} colorClass="text-status-green" size="text-lg" />
              </div>
            </div>
          </div>

          {/* Module 2: Comm Log (Linked) */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-1.5 bg-black text-white flex items-center justify-between">
              <span className="text-[8px] font-black uppercase tracking-widest">{t.emergencyCmd.intelligenceStream}</span>
              <Activity className="w-3 h-3 text-status-green" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-thin bg-white">
              <AnimatePresence initial={false}>
                {commLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-3 border-l-2 text-[9px] leading-relaxed shadow-sm",
                      log.type === 'alert' ? "border-status-red bg-red-50/20" : "border-slate-200 bg-slate-50/20"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full bg-black" />
                      <span className="font-black text-slate-400">[{log.time}]</span>
                      <span className="font-black uppercase tracking-tighter px-1 bg-black text-white text-[7px]">{log.source}</span>
                    </div>
                    <div className="font-bold text-slate-600 pl-3">
                      <HighlightedText text={log.message} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CENTER PANEL: CAM Feeds & Map */}
        <div className="col-span-6 row-span-12 flex flex-col bg-slate-100 overflow-hidden">
          <div className="grid grid-cols-3 grid-rows-2 gap-px bg-black h-1/2">
            {[
              { label: 'CAM-01 | UAV OVERWATCH', url: 'https://www.youtube.com/embed/UTmPI4wI0hY' },
              { label: 'CAM-02 | EASTBOUND APPROACH', url: 'https://www.youtube.com/embed/G0p87sfO9t8' },
              { label: 'CAM-03 | WESTBOUND BARRIER', url: 'https://www.youtube.com/embed/DIYatR1pt_I' },
              { label: 'CAM-04 | IMPACT CORE', url: 'https://www.youtube.com/embed/DCUlzOvdq8Q' },
              { label: 'CAM-05 | EMS LANE', url: 'https://www.youtube.com/embed/ExZpeA5E_ro' },
              { label: 'CAM-06 | OUTER PERIMETER', url: 'https://www.youtube.com/embed/3VSbwch8phA' }
            ].map((cam, i) => (
              <div key={i} className="bg-slate-900 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-5 bg-black/80 flex items-center justify-between px-2 z-10">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">{cam.label}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-status-red animate-pulse" />
                </div>
                <div className="w-full h-full">
                  <iframe 
                    src={`${cam.url}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playlist=${cam.url.split('/').pop()}`}
                    className="w-full h-full border-none pointer-events-none scale-110"
                    allow="autoplay; encrypted-media"
                    title={cam.label}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Module 5: GIS Map (Real GIS Integration) */}
          <div className="flex-1 bg-white relative overflow-hidden border-t border-black">
            <div className="absolute inset-0">
              <iframe 
                src="https://maps.google.com/maps?q=43.2185,76.9538&z=13&output=embed&gestureHandling=greedy&scrollwheel=true"
                className="w-full h-full border-none grayscale-[0.2] contrast-[1.1]"
                title="Almaty Incident GIS"
              />
              {/* Tactical Overlay on top of real map */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative">
                  <div className="w-[200px] h-[200px] rounded-full border-2 border-status-red/40 bg-status-red/5 animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <MapPin className="w-8 h-8 text-status-red drop-shadow-lg fill-status-red/20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 flex flex-col gap-1">
              <div className="bg-black/90 text-white px-2 py-1 text-[8px] font-black uppercase tracking-widest border border-white/10">
                Lat: 43.2185 | Lng: 76.9538
              </div>
              <div className="bg-black/90 text-white px-2 py-1 text-[8px] font-black uppercase tracking-widest border border-white/10">
                Intersection: Al-Farabi / Mendikulov
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Coordination & Decisions */}
        <div className="col-span-3 row-span-12 flex flex-col bg-white border-l border-black overflow-hidden">
          {/* Module 4: Coordination Room (Typewriter) */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-status-green" />
                <span className="text-[9px] font-black uppercase tracking-widest">{t.emergencyCmd.coordinationRoom}</span>
              </div>
              <span className="text-[7px] font-black text-white/50">{t.emergencyCmd.liveStream}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-thin bg-slate-50/30">
              <AnimatePresence initial={false}>
                {confMessages.map((msg, idx) => {
                  const isSelf = msg.dept.startsWith('CMD');
                  const isLast = idx === lastMsgIdx;
                  return (
                    <motion.div 
                      key={msg.id} 
                      initial={{ opacity: 0, x: isSelf ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        isSelf ? "self-start items-start" : "self-end items-end ml-auto"
                      )}
                    >
                      <div className={cn(
                        "flex items-center gap-2 mb-1",
                        isSelf ? "flex-row" : "flex-row-reverse"
                      )}>
                        <span className={cn(
                          "px-1.5 py-0.5 text-[7px] font-black text-white uppercase rounded-sm",
                          isSelf ? "bg-status-green" : "bg-slate-400"
                        )}>
                          {msg.dept}
                        </span>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{msg.role}</span>
                        <span className="text-[7px] font-black text-slate-300">[{msg.time}]</span>
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-[10px] font-bold leading-relaxed shadow-sm border",
                        isSelf 
                          ? "bg-[#e7f6ed] border-[#c3e6cb] text-[#155724] rounded-tl-none" 
                          : "bg-white border-slate-200 text-slate-700 rounded-tr-none"
                      )}>
                        {isLast ? (
                          <TypewriterText 
                            text={msg.message} 
                            onComplete={handleMsgComplete}
                            delay={60}
                          />
                        ) : (
                          <HighlightedText text={msg.message} />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={chatEndRef} />
              </AnimatePresence>
            </div>
          </div>

          {/* Module 6: Decision Support (Feishu Style) */}
          <div className="h-[35%] flex flex-col border-t border-black bg-slate-50 overflow-hidden">
            <div className="px-4 py-1.5 bg-slate-200 border-b border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-status-red" />
                <span className="text-[8px] font-black uppercase tracking-widest text-status-red">{t.emergencyCmd.aiDecisionSupport}</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2 scroll-thin">
              <AnimatePresence>
                {recommendations.map((rec) => (
                  <motion.div 
                    key={rec.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-2.5 bg-white border border-black/10 shadow-sm flex flex-col h-[48%]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[9px] font-black uppercase truncate pr-2">{rec.title}</div>
                      <AlertCircle className="w-3 h-3 text-status-red shrink-0" />
                    </div>
                    <div className="flex-1 text-[8px] leading-tight text-slate-500 overflow-hidden">
                      <span className="font-black text-slate-400 uppercase">{t.emergencyCmd.trigger}: </span>
                      <HighlightedText text={rec.reason} />
                      <span className="mx-1">|</span>
                      <span className="font-bold text-slate-700 italic">{rec.action}</span>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handleAcceptRec(rec.id)}
                        className="flex-1 h-6 bg-[#28c445] text-white rounded-full flex items-center justify-center gap-1 hover:bg-[#23ad3d] transition-colors shadow-sm"
                      >
                        <PhoneCall className="w-2.5 h-2.5" />
                        <span className="text-[8px] font-black uppercase">{t.emergencyCmd.accept}</span>
                      </button>
                      <button className="flex-1 h-6 bg-[#f54a45] text-white rounded-full flex items-center justify-center gap-1 hover:bg-[#d9413d] transition-colors shadow-sm">
                        <PhoneOff className="w-2.5 h-2.5" />
                        <span className="text-[8px] font-black uppercase">{t.emergencyCmd.reject}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Ticker */}
      <div className="h-6 bg-black flex items-center px-4 overflow-hidden shrink-0">
        <div className="flex items-center gap-4 whitespace-nowrap animate-marquee">
          <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">{t.emergencyCmd.liveIncident}: E-20260321-AF-01</span>
          <div className="w-px h-2 bg-white/20" />
          <span className="text-[8px] font-bold text-white/60 uppercase">Al-Farabi Ave / Mendikulov St | {t.emergencyCmd.fatalities}: {currentState.fatalities} | {t.emergencyCmd.criticalInjured}: {currentState.criticalInjured}</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .scroll-thin::-webkit-scrollbar { width: 2px; }
        .scroll-thin::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); }
      `}} />
    </div>
  );
};
