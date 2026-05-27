import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Shield, 
  Search, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Info,
  Clock,
  Eye,
  Share2,
  FileText,
  Navigation,
  Car,
  Smartphone,
  Camera,
  Globe,
  Maximize2,
  Video,
  Network,
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Activity
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { OntologyWorkspace } from '../ontology/OntologyWorkspace';
import { IntelligentExploration } from './IntelligentExploration';
import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

// Fix Leaflet icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for the map
const accidentIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-8 h-8 bg-status-red rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-pulse">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const carIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-6 h-6 bg-slate-900 rounded-full border border-white flex items-center justify-center shadow-md">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
        </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Al-Farabi Avenue Trajectory Points - Aligned to Al-Farabi Ave (approx 30 deg angle)
const TRAJECTORY: [number, number][] = [
  [43.2120, 76.8900],
  [43.2140, 76.9050],
  [43.2160, 76.9200],
  [43.2178, 76.9280], // Accident Point
  [43.2190, 76.9450],
  [43.2210, 76.9600],
];

const ACCIDENT_POINT: [number, number] = [43.2178, 76.9280];

const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const KeyIntelligenceScenario: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language] || PRE_EVENT_I18N.en;

  const [activeScenario, setActiveScenario] = useState<'SPATIO' | 'RECON' | 'CORR' | 'CROSS'>('SPATIO');
  const [isLeftOverlayVisible, setIsLeftOverlayVisible] = useState(false);
  const [isRightOverlayVisible, setIsRightOverlayVisible] = useState(false);
  const [expandedLabels, setExpandedLabels] = useState<Set<string>>(new Set());
  
  const [carPos, setCarPos] = useState<[number, number]>(TRAJECTORY[0]);
  const [car2Pos, setCar2Pos] = useState<[number, number]>(TRAJECTORY[TRAJECTORY.length - 1]);
  const [progress, setProgress] = useState(0);

  // SPATIO Replay States
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [replayStatus, setReplayStatus] = useState<'IDLE' | 'APPROACH' | 'CONFLICT' | 'IMPACT' | 'SECURED'>('IDLE');

  // RECON States
  const [reconStep, setReconStep] = useState(0);
  const [isReconRunning, setIsReconRunning] = useState(false);
  const [showReconVideo, setShowReconVideo] = useState(false);

  const [surveyStep, setSurveyStep] = useState(0);
  const [isSurveyRunning, setIsSurveyRunning] = useState(false);
  const [showSurveyImages, setShowSurveyImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const RECON_STEPS = t.keyIntelligence.reconSteps;

  const SURVEY_STEPS = t.keyIntelligence.surveySteps;

  // SPATIO Replay Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isReplaying && playbackTime < 30) {
      interval = setInterval(() => {
        setPlaybackTime(prev => {
          const next = prev + (0.1 * playbackSpeed);
          return next >= 30 ? 30 : next;
        });
      }, 100);
    } else if (playbackTime >= 30) {
      setIsReplaying(false);
    }
    return () => clearInterval(interval);
  }, [isReplaying, playbackTime, playbackSpeed]);

  useEffect(() => {
    if (playbackTime === 0) setReplayStatus('IDLE');
    else if (playbackTime < 10) setReplayStatus('APPROACH');
    else if (playbackTime < 18) setReplayStatus('CONFLICT');
    else if (playbackTime < 20) setReplayStatus('IMPACT');
    else setReplayStatus('SECURED');
  }, [playbackTime]);

  const getVehiclePosition = (time: number, vehicleType: 'ZEEKR' | 'UNKNOWN' | 'MERCEDES') => {
    const collisionTime = 18;
    const collisionIndex = 3;
    
    if (vehicleType === 'ZEEKR' || vehicleType === 'UNKNOWN') {
      // Right to Left: Starts at index 5, reaches index 3 at 18s
      const startIdx = 5;
      const endIdx = collisionIndex;
      
      if (time <= collisionTime) {
        const p = time / collisionTime;
        const segment = p * (startIdx - endIdx);
        const currentIdx = startIdx - Math.floor(segment);
        const nextIdx = Math.max(endIdx, currentIdx - 1);
        const segProg = segment % 1;
        
        const start = TRAJECTORY[currentIdx];
        const end = TRAJECTORY[nextIdx];
        
        // Offset UNKNOWN slightly
        const offset = vehicleType === 'UNKNOWN' ? 0.0005 : 0;
        return [
          start[0] + (end[0] - start[0]) * segProg + offset,
          start[1] + (end[1] - start[1]) * segProg + offset
        ] as [number, number];
      } else {
        // Post impact: stay at collision point or move slightly past
        return TRAJECTORY[collisionIndex];
      }
    } else {
      // Mercedes: Left to Right: Starts at index 0, reaches index 3 at 18s
      const startIdx = 0;
      const endIdx = collisionIndex;
      
      if (time <= collisionTime) {
        const p = time / collisionTime;
        const segment = p * (endIdx - startIdx);
        const currentIdx = startIdx + Math.floor(segment);
        const nextIdx = Math.min(endIdx, currentIdx + 1);
        const segProg = segment % 1;
        
        const start = TRAJECTORY[currentIdx];
        const end = TRAJECTORY[nextIdx];
        
        return [
          start[0] + (end[0] - start[0]) * segProg,
          start[1] + (end[1] - start[1]) * segProg
        ] as [number, number];
      } else {
        return TRAJECTORY[collisionIndex];
      }
    }
  };

  const startRecon = () => {
    if (isReconRunning) return;
    setIsReconRunning(true);
    setReconStep(0);
    setShowReconVideo(false);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setReconStep(currentStep);
      if (currentStep >= RECON_STEPS.length) {
        clearInterval(interval);
        setIsReconRunning(false);
        setShowReconVideo(true);
      }
    }, 500); // 20 steps in 10s = 0.5s per step
  };

  const startSurvey = () => {
    if (isSurveyRunning) return;
    setIsSurveyRunning(true);
    setSurveyStep(0);
    setShowSurveyImages(false);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setSurveyStep(currentStep);
      if (currentStep >= SURVEY_STEPS.length) {
        clearInterval(interval);
        setIsSurveyRunning(false);
        setShowSurveyImages(true);
      }
    }, 1000); // 5 steps in 5s
  };

  const toggleLabel = (id: string) => {
    const next = new Set(expandedLabels);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedLabels(next);
  };

  // Animate cars along trajectory
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 0.002) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalPoints = TRAJECTORY.length - 1;
    
    // Car 1: Moves from start to collision point (index 3)
    const car1Progress = Math.min(progress * 2, 1);
    const segment1 = Math.floor(car1Progress * 3);
    const segProg1 = (car1Progress * 3) % 1;
    if (segment1 < 3) {
      const start = TRAJECTORY[segment1];
      const end = TRAJECTORY[segment1 + 1];
      setCarPos([
        start[0] + (end[0] - start[0]) * segProg1,
        start[1] + (end[1] - start[1]) * segProg1
      ]);
    } else {
      setCarPos(TRAJECTORY[3]);
    }

    // Car 2: Moves from end to collision point (index 3)
    const car2Progress = Math.min(progress * 2, 1);
    const segment2 = Math.floor(car2Progress * 2);
    const segProg2 = (car2Progress * 2) % 1;
    const revTrajectory = [...TRAJECTORY].reverse();
    if (segment2 < 2) {
      const start = revTrajectory[segment2];
      const end = revTrajectory[segment2 + 1];
      setCar2Pos([
        start[0] + (end[0] - start[0]) * segProg2,
        start[1] + (end[1] - start[1]) * segProg2
      ]);
    } else {
      setCar2Pos(TRAJECTORY[3]);
    }
  }, [progress]);

  return (
    <div className="w-full h-full flex bg-slate-50 overflow-hidden">
      {/* Left Panel: Intelligence Feed */}
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-status-red" />
              <h2 className="text-sm font-black uppercase tracking-tighter">{t.keyIntelligence.title}</h2>
            </div>
            <div className="px-2 py-0.5 bg-red-50 text-status-red text-[10px] font-black rounded border border-red-100 animate-pulse">
              {t.keyIntelligence.live}
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={t.keyIntelligence.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[
            {
              id: 'RECON',
              title: t.keyIntelligence.scenarios.recon.title,
              desc: t.keyIntelligence.scenarios.recon.desc,
              icon: <Video className="w-4 h-4" />,
              color: 'bg-yellow-50 text-status-yellow'
            },
            {
              id: 'SPATIO',
              title: t.keyIntelligence.scenarios.spatio.title,
              desc: t.keyIntelligence.scenarios.spatio.desc,
              icon: <Navigation className="w-4 h-4" />,
              color: 'bg-red-50 text-status-red'
            },
            {
              id: 'CORR',
              title: t.keyIntelligence.scenarios.corr.title,
              desc: t.keyIntelligence.scenarios.corr.desc,
              icon: <Network className="w-4 h-4" />,
              color: 'bg-blue-50 text-blue-600'
            },
            {
              id: 'CROSS',
              title: t.keyIntelligence.scenarios.cross.title,
              desc: t.keyIntelligence.scenarios.cross.desc,
              icon: <Share2 className="w-4 h-4" />,
              color: 'bg-purple-50 text-purple-600'
            }
          ].map(item => {
            const sentences = item.desc.split('. ');
            const mainDesc = sentences[0] + (sentences.length > 1 ? '.' : '');
            const tooltipDesc = sentences.slice(1).join('. ');

            return (
              <div 
                key={item.id}
                onClick={() => setActiveScenario(item.id as any)}
                className={cn(
                  "p-4 border transition-all cursor-pointer rounded-xl group relative",
                  activeScenario === item.id 
                    ? "bg-slate-50 border-slate-400 shadow-md" 
                    : "bg-white border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-8 h-8 rounded flex items-center justify-center", item.color)}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">{item.title}</span>
                  </div>
                  {activeScenario === item.id && (
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                  )}
                </div>
                <div className="relative">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {mainDesc}
                  </p>
                  {tooltipDesc && (
                    <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-black text-white text-[9px] rounded shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none z-[2000] transition-opacity border border-white/10 leading-normal">
                      {tooltipDesc}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          {/* Global Detail Button Removed */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center justify-end pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-3 group">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-status-red rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-black uppercase tracking-widest">{t.keyIntelligence.accidentCoords}: 43.2178, 76.9280</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main View Area */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          {activeScenario === 'SPATIO' && (
            <div className="flex-1 relative flex flex-col">
              <MapContainer 
                center={ACCIDENT_POINT} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <MapController center={ACCIDENT_POINT} zoom={15} />
                
                {/* Layer 2: User-drawn event corridor with glow */}
                <Polyline 
                  positions={TRAJECTORY} 
                  color="#ef4444" 
                  weight={12} 
                  opacity={0.1} 
                />
                <Polyline 
                  positions={TRAJECTORY} 
                  color="#ef4444" 
                  weight={6} 
                  opacity={0.2} 
                />
                <Polyline 
                  positions={TRAJECTORY} 
                  color="#ef4444" 
                  weight={2} 
                  opacity={0.8} 
                  dashArray="10, 15"
                />

                {/* Layer 3: Directional movement arrows (Simulated with moving dash) */}
                {isReplaying && (
                  <Polyline 
                    positions={TRAJECTORY} 
                    color="#ef4444" 
                    weight={1} 
                    opacity={0.5} 
                    dashArray="5, 20"
                    dashOffset={String(-playbackTime * 20)}
                  />
                )}

                {/* Layer 4: Vehicle Markers */}
                {/* ZEEKR */}
                <Marker 
                  position={getVehiclePosition(playbackTime, 'ZEEKR')} 
                  icon={L.divIcon({
                    className: 'custom-div-icon',
                    html: `
                      <div class="relative group">
                        <div class="w-6 h-6 bg-status-red rounded-full border-2 border-white shadow-lg flex items-center justify-center ${playbackTime > 0 && playbackTime < 18 ? 'animate-pulse' : ''}">
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-[8px] font-black whitespace-nowrap shadow-xl">
                          ZEEKR | 220 ${t.keyIntelligence.speed}
                        </div>
                      </div>
                    `
                  })} 
                />

                {/* UNKNOWN */}
                <Marker 
                  position={getVehiclePosition(playbackTime, 'UNKNOWN')} 
                  icon={L.divIcon({
                    className: 'custom-div-icon',
                    html: `
                      <div class="relative group">
                        <div class="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-[8px] font-black whitespace-nowrap shadow-xl">
                          UNKNOWN | 220 ${t.keyIntelligence.speed}
                        </div>
                      </div>
                    `
                  })} 
                />

                {/* MERCEDES */}
                <Marker 
                  position={getVehiclePosition(playbackTime, 'MERCEDES')} 
                  icon={L.divIcon({
                    className: 'custom-div-icon',
                    html: `
                      <div class="relative group">
                        <div class="w-6 h-6 bg-slate-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-[8px] font-black whitespace-nowrap shadow-xl">
                          MERCEDES | 80 ${t.keyIntelligence.speed}
                        </div>
                      </div>
                    `
                  })} 
                />

                {/* Layer 5: Collision Point */}
                {playbackTime >= 18 && (
                  <Marker 
                    position={ACCIDENT_POINT} 
                    icon={L.divIcon({
                      className: 'custom-div-icon',
                      html: `
                        <div class="relative">
                          <div class="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-status-red/30 rounded-full animate-ping"></div>
                          <div class="w-10 h-10 bg-status-red rounded-full border-4 border-white flex items-center justify-center shadow-2xl">
                            <AlertTriangle class="w-5 h-5 text-white" />
                          </div>
                          <div class="absolute top-12 left-1/2 -translate-x-1/2 bg-status-red text-white px-3 py-1.5 rounded border-2 border-white text-[10px] font-black whitespace-nowrap shadow-2xl">
                            ${t.keyIntelligence.collision} | 03:08
                          </div>
                        </div>
                      `
                    })} 
                  >
                    <Popup>
                      <div className="p-2 w-48 font-sans">
                        <div className="text-[10px] font-black uppercase text-status-red mb-1">{t.keyIntelligence.collisionDetails.title}</div>
                        <div className="text-[9px] text-slate-600 space-y-1">
                          <p><strong>{t.keyIntelligence.collisionDetails.time}:</strong> 03:08:12</p>
                          <p><strong>{t.keyIntelligence.collisionDetails.type}:</strong> {t.keyIntelligence.collisionDetails.typeValue}</p>
                          <p><strong>{t.keyIntelligence.collisionDetails.energy}:</strong> 4.2 GJ</p>
                          <p><strong>{t.keyIntelligence.collisionDetails.casualty}:</strong> {t.keyIntelligence.collisionDetails.casualtyValue}</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Layer 6: Risk Zone */}
                {playbackTime >= 20 && (
                  <Marker 
                    position={ACCIDENT_POINT} 
                    icon={L.divIcon({
                      className: 'custom-div-icon',
                      html: `
                        <div class="w-48 h-48 -translate-x-1/2 -translate-y-1/2 bg-status-red/10 border-2 border-status-red/30 rounded-full flex items-center justify-center">
                          <div class="text-[10px] font-black text-status-red uppercase tracking-widest bg-white/80 px-2 py-1 border border-status-red/20">${t.keyIntelligence.majorIncidentArea}</div>
                        </div>
                      `
                    })}
                  />
                )}
              </MapContainer>

              {/* Replay Card (Top Left Overlay) */}
              <div className="absolute top-20 left-4 z-[1002] w-64">
                <div className="p-3 bg-white/90 backdrop-blur-md text-black rounded-xl shadow-2xl border-2 border-black">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3 h-3 text-status-red" />
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-black">{t.keyIntelligence.replayTitle}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="text-[8px] text-slate-500 font-mono">{t.keyIntelligence.eventWindow}:</div>
                    <div className="text-[8px] font-mono text-black">02:50 – 03:20</div>
                    <div className="text-[8px] text-slate-500 font-mono">{t.keyIntelligence.racingVehicles}:</div>
                    <div className="text-[8px] font-mono text-status-red">2 (ZEEKR, UNKNOWN)</div>
                    <div className="text-[8px] text-slate-500 font-mono">{t.keyIntelligence.opposingVehicles}:</div>
                    <div className="text-[8px] font-mono text-black">1 (MERCEDES)</div>
                  </div>
                </div>
              </div>

              {/* Status Box (Top Right) */}
              <div className="absolute top-20 right-4 z-[1002] flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-64">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black">
                      <span className="text-slate-400 uppercase">{t.keyIntelligence.accidentCoords}</span>
                      <span>43.2178, 76.9280</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-black">
                      <span className="text-slate-400 uppercase">{t.keyIntelligence.eventWindow}</span>
                      <span>02:50 – 03:20</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-black">
                      <span className="text-slate-400 uppercase">{t.keyIntelligence.currentStatus}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded",
                        replayStatus === 'IMPACT' ? "bg-status-red text-white animate-pulse" : "bg-black text-white"
                      )}>
                        {replayStatus === 'IDLE' && t.keyIntelligence.statusIdle}
                        {replayStatus === 'APPROACH' && t.keyIntelligence.statusApproach}
                        {replayStatus === 'CONFLICT' && t.keyIntelligence.statusConflict}
                        {replayStatus === 'IMPACT' && t.keyIntelligence.statusImpact}
                        {replayStatus === 'SECURED' && t.keyIntelligence.statusSecured}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Context Tags */}
                <div className="flex flex-col gap-1 items-end">
                  {[t.keyIntelligence.tags.racing, t.keyIntelligence.tags.majorCrash, t.keyIntelligence.tags.reconstruction].map((tag, i) => (
                    <div key={i} className="bg-black text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 shadow-lg">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Timeline Module */}
              <div className="absolute bottom-6 left-6 right-6 z-[1002]">
                <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center gap-6">
                  {/* Controls */}
                  <div className="flex items-center gap-2 border-r border-slate-200 pr-6">
                    <button 
                      onClick={() => {
                        setPlaybackTime(0);
                        setIsReplaying(true);
                      }}
                      className="p-2 hover:bg-slate-100 transition-colors rounded"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setIsReplaying(!isReplaying)}
                      className="p-2 bg-black text-white rounded hover:bg-slate-800 transition-colors"
                    >
                      {isReplaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => setPlaybackSpeed(prev => prev === 1 ? 2 : 1)}
                      className={cn(
                        "px-2 py-1 text-[10px] font-black border-2 border-black transition-all",
                        playbackSpeed === 2 ? "bg-black text-white" : "bg-white text-black"
                      )}
                    >
                      {playbackSpeed}X
                    </button>
                  </div>

                  {/* Progress Slider */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between text-[10px] font-black font-mono">
                      <span>02:50</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-status-red rounded-full animate-pulse" />
                        <span className="text-status-red">{t.keyIntelligence.replaying}: 02:{Math.floor(50 + (playbackTime/30) * 30).toString().padStart(2, '0')}</span>
                      </div>
                      <span>03:20</span>
                    </div>
                    <div className="relative h-12 bg-slate-50 border border-black/10 rounded-lg overflow-hidden cursor-pointer group flex items-end px-1 gap-0.5"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        setPlaybackTime((x / rect.width) * 30);
                      }}
                    >
                      {/* Palantir-style Histogram Bars */}
                      {Array.from({ length: 60 }).map((_, i) => {
                        const height = [
                          15, 20, 18, 25, 30, 28, 35, 40, 45, 50, // Approach
                          60, 70, 85, 95, 100, 90, 80, 70, 60, 50, // Conflict
                          100, 100, 40, 30, 25, 20, 15, 10, 8, 5, // Impact & Fade
                          10, 15, 20, 25, 30, 35, 40, 45, 50, 55, // Secured activity
                          60, 65, 70, 75, 80, 85, 90, 95, 100, 90,
                          80, 70, 60, 50, 40, 30, 20, 15, 10, 5
                        ][i] || 20;
                        
                        const isActive = (playbackTime / 30) * 60 > i;
                        
                        return (
                          <div 
                            key={i} 
                            className={cn(
                              "flex-1 transition-all duration-300",
                              isActive ? "bg-status-red" : "bg-slate-200 group-hover:bg-slate-300"
                            )}
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                      
                      {/* Playhead */}
                      <motion.div 
                        className="absolute inset-y-0 w-0.5 bg-black z-10"
                        animate={{ left: `${(playbackTime / 30) * 100}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    </div>
                    
                    {/* Phase Labels */}
                    <div className="flex text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                      <div style={{ width: '33.33%' }}>{t.keyIntelligence.phases.racing}</div>
                      <div style={{ width: '26.66%' }}>{t.keyIntelligence.phases.conflict}</div>
                      <div style={{ width: '6.66%' }} className="text-status-red">{t.keyIntelligence.phases.impact}</div>
                      <div className="flex-1 text-right">{t.keyIntelligence.phases.secured}</div>
                    </div>
                  </div>

                  <div className="pl-6 border-l border-slate-200 flex flex-col items-end">
                    <div className="text-[10px] font-black uppercase tracking-widest">{t.keyIntelligence.autoReplay}</div>
                    <div className="w-8 h-4 bg-slate-100 rounded-full p-0.5 relative">
                      <div className="w-3 h-3 bg-black rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeScenario === 'RECON' && (
            <div className="flex-1 bg-slate-100 p-6 flex flex-col gap-6 overflow-hidden">
              <div className="flex-[2] flex gap-6 min-h-0">
                {/* Left 2/3: Video/Rendering Area */}
                <div className="w-2/3 bg-black relative border-2 border-black overflow-hidden flex items-center justify-center">
                  {!showReconVideo ? (
                    <div className="w-full h-full bg-white flex items-center justify-center relative">
                      {isReconRunning && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10"
                          animate={{ 
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: '200% 200%' }}
                        />
                      )}
                      <div className="text-center z-10">
                        <div className="text-2xl font-black text-black uppercase tracking-[0.3em] mb-2">
                          {isReconRunning ? t.keyIntelligence.recon.rendering : t.keyIntelligence.recon.waiting}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {isReconRunning ? t.keyIntelligence.recon.engineActive : t.keyIntelligence.recon.engineStandby}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <video 
                      className="w-full h-full object-contain"
                      src="https://raw.githubusercontent.com/CarliYz/image/main/%E6%8E%A5%E4%B8%8B%E6%9D%A5%E6%88%91%E8%A6%81%E5%81%9A_s%E5%B7%A6%E5%8F%B3%E7%9A%84%E8%A7%86%E9%A2%91%EF%BC%8C%E7%94%A8%E4%BB%A5%E4%B8%8B%E8%8B%B1%E6%96%87%E5%88%86%E6%AE%B5_Prompt%EF%BC%8C.mp4"
                      autoPlay loop muted
                    />
                  )}
                  
                  <div className="absolute top-4 left-4 z-20 text-black pointer-events-none">
                    {/* Floating Label Removed */}
                  </div>
                </div>

                {/* Right 1/3: Control Panel */}
                <div className="w-1/3 bg-white border-2 border-black p-4 flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  {/* Accident Recon Section */}
                  <div className="flex flex-col mb-6">
                    <button 
                      onClick={startRecon}
                      disabled={isReconRunning}
                      className={cn(
                        "w-full py-3 text-[10px] font-black uppercase tracking-widest border-2 border-black transition-all mb-4",
                        isReconRunning ? "bg-slate-100 text-slate-400" : "bg-black text-white hover:bg-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
                      )}
                    >
                      {t.keyIntelligence.recon.btnRecon}
                    </button>
                    
                    <div className="space-y-2 min-h-[130px]">
                      {(RECON_STEPS || []).slice(Math.max(0, reconStep - 5), reconStep).map((step, i) => (
                        <motion.div 
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between gap-2 border-b border-slate-50 pb-1"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-1 h-1 bg-black rounded-full shrink-0" />
                            <span className="text-[9px] font-bold text-slate-500 leading-tight">{step}</span>
                          </div>
                          <Check className="w-3 h-3 text-status-green shrink-0" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Survey Recon Section - Follows directly */}
                  <div className="flex flex-col">
                    <button 
                      onClick={startSurvey}
                      disabled={isSurveyRunning}
                      className={cn(
                        "w-full py-3 text-[10px] font-black uppercase tracking-widest border-2 border-black transition-all mb-4",
                        isSurveyRunning ? "bg-slate-100 text-slate-400" : "bg-black text-white hover:bg-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
                      )}
                    >
                      {t.keyIntelligence.surveyRecon}
                    </button>
                    
                    <div className="space-y-2 min-h-[130px]">
                      {(SURVEY_STEPS || []).slice(Math.max(0, surveyStep - 5), surveyStep).map((step, i) => (
                        <motion.div 
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between gap-2 border-b border-slate-50 pb-1"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-1 h-1 bg-black rounded-full shrink-0" />
                            <span className="text-[9px] font-bold text-slate-500 leading-tight">{step}</span>
                          </div>
                          <Check className="w-3 h-3 text-status-green shrink-0" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 1/3: Detail Windows */}
              <div className="flex-1 flex gap-6">
                {[
                  { 
                    title: t.keyIntelligence.physicalMap, 
                    img: 'https://raw.githubusercontent.com/CarliYz/image/main/Gemini_Generated_Image_ezqudqezqudqezqu.png'
                  },
                  { 
                    title: t.keyIntelligence.digitalMap, 
                    img: 'https://raw.githubusercontent.com/CarliYz/image/main/Gemini_Generated_Image_7hfkay7hfkay7hfk.png'
                  },
                  { 
                    title: t.keyIntelligence.nebulaMap, 
                    img: 'https://raw.githubusercontent.com/CarliYz/image/main/Gemini_Generated_Image_a6dy7sa6dy7sa6dy.png'
                  }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => showSurveyImages && setSelectedImage(i)}
                    className={cn(
                      "flex-1 bg-white/80 backdrop-blur-md border-2 border-black p-4 flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all",
                      showSurveyImages && "cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                    )}
                  >
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-3 border-b border-black/10 pb-2">{item.title}</h4>
                    <div className="flex-1 relative flex items-center justify-center bg-slate-50 border border-black/5 overflow-hidden">
                      {showSurveyImages ? (
                        <motion.img 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          src={item.img} 
                          className="w-full h-full object-cover transition-all duration-500" 
                          referrerPolicy="no-referrer" 
                        />
                      ) : (
                        <div className="text-center w-full h-full relative flex items-center justify-center">
                          {isSurveyRunning ? (
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5"
                              animate={{ 
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                opacity: [0.2, 0.4, 0.2]
                              }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              style={{ backgroundSize: '200% 200%' }}
                            />
                          ) : null}
                          <div className="relative z-10">
                            {isSurveyRunning ? (
                              <div className="text-[10px] font-black text-black uppercase tracking-widest">{t.keyIntelligence.imageGenerating}</div>
                            ) : (
                              <div className="text-[8px] text-slate-300 font-mono uppercase tracking-widest">{t.keyIntelligence.noData}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Zoom Modal */}
              <AnimatePresence>
                {selectedImage !== null && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-12"
                    onClick={() => setSelectedImage(null)}
                  >
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-6xl h-[70vh] flex overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedImage === 1 ? (
                        <>
                          {/* Digital Generation Detailed View */}
                          <div className="w-[80%] h-full bg-slate-900 relative overflow-hidden">
                            <img 
                              src="https://raw.githubusercontent.com/CarliYz/image/main/Gemini_Generated_Image_7hfkay7hfkay7hfk.png" 
                              className="w-full h-full object-cover opacity-90"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 pointer-events-none border-r-2 border-black/20" />
                            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                              {t.keyIntelligence.digitalAnalysis}
                            </div>
                          </div>
                          <div className="w-[20%] h-full bg-white p-6 flex flex-col border-l-4 border-black">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">{t.keyIntelligence.digitalExtraction}</h3>
                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-thin">
                              {t.keyIntelligence.digitalFeatures.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-status-red rounded-full mt-1 shrink-0" />
                                  <span className="text-[10px] font-bold text-slate-500 leading-tight">{item}</span>
                                </div>
                              ))}
                            </div>
                            <button 
                              onClick={() => setSelectedImage(null)}
                              className="mt-6 w-full py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                            >
                              {t.keyIntelligence.closeDetails}
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full relative group">
                          <img 
                            src={[
                              'https://raw.githubusercontent.com/CarliYz/image/main/Gemini_Generated_Image_ezqudqezqudqezqu.png',
                              'https://raw.githubusercontent.com/CarliYz/image/main/Gemini_Generated_Image_7hfkay7hfkay7hfk.png',
                              'https://raw.githubusercontent.com/CarliYz/image/main/Gemini_Generated_Image_a6dy7sa6dy7sa6dy.png'
                            ][selectedImage]} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                            {[
                              t.keyIntelligence.physicalMap,
                              t.keyIntelligence.digitalMap,
                              t.keyIntelligence.nebulaMap
                            ][selectedImage]}
                          </div>
                          <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-slate-800 transition-all"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {activeScenario === 'CORR' && (
            <OntologyWorkspace />
          )}

          {activeScenario === 'CROSS' && (
            <IntelligentExploration />
          )}
        </div>
      </div>
    </div>
  );
};
