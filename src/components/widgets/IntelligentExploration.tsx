import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  Shield, 
  Layers, 
  Cpu, 
  Network,
  Filter,
  AlertCircle,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

type ExplorationState = 'INITIAL' | 'PROCESSING' | 'COMPLETED';

interface DbCard {
  id: string;
  title: string;
  volume: string;
  updatedAt: string;
  tables: string[];
  status: 'CONNECTED' | 'NOT_CONNECTED' | 'SYNCING' | 'OFFLINE';
  capabilities: string[];
}

const DB_ASSETS: DbCard[] = [
  {
    id: 'db_01',
    title: 'OSINT Collection DB',
    volume: '48.2M',
    updatedAt: '2 min ago',
    tables: ['social_post_index', 'social_media_asset', 'post_entity_extract'],
    status: 'CONNECTED',
    capabilities: ['Cross-DB Query', 'Semantic Governance Complete', 'Event Extraction Supported']
  },
  {
    id: 'db_02',
    title: 'Web Intel Collection DB',
    volume: '11.6M',
    updatedAt: '5 min ago',
    tables: ['web_article_master', 'article_keyword_map', 'site_crawl_task'],
    status: 'CONNECTED',
    capabilities: ['Correlation Computing', 'Timeline Restoration', 'Source Comparison']
  },
  {
    id: 'db_03',
    title: 'LBS Signaling DB',
    volume: '3.8B',
    updatedAt: '1 min ago',
    tables: ['lbs_device_ping', 'night_movement_cluster', 'base_station_hit'],
    status: 'CONNECTED',
    capabilities: ['Device Positioning', 'Spatio-Temporal Clustering', 'Trajectory Reconstruction']
  },
  {
    id: 'db_04',
    title: 'Police Case Master DB',
    volume: '6.4M',
    updatedAt: '8 min ago',
    tables: ['case_master', 'incident_person_link', 'disposal_action_log'],
    status: 'CONNECTED',
    capabilities: ['Cross-DB Query', 'Case Master Index', 'Disposal Chain Restoration']
  },
  {
    id: 'db_05',
    title: 'Person Relationship DB',
    volume: '41.3M',
    updatedAt: '12 min ago',
    tables: ['person_master', 'relation_network', 'identity_binding'],
    status: 'CONNECTED',
    capabilities: ['Person Mapping', 'Relationship Extraction', 'Identity Normalization']
  },
  {
    id: 'db_06',
    title: 'Video Checkpoint Capture DB',
    volume: '920M',
    updatedAt: '30 sec ago',
    tables: ['camera_capture_index', 'vehicle_plate_hit', 'road_camera_event'],
    status: 'CONNECTED',
    capabilities: ['Vehicle Association', 'Trajectory Verification', 'Time-Window Query']
  },
  {
    id: 'db_07',
    title: 'Mobile Payment Behavior DB',
    volume: '680M',
    updatedAt: '4 min ago',
    tables: ['merchant_txn_trace', 'payer_receiver_link', 'night_consumption_cluster'],
    status: 'CONNECTED',
    capabilities: ['Payment Chain Identification', 'Anomaly Pattern Discovery', 'Correlation Computing']
  },
  {
    id: 'db_08',
    title: 'Resource Location DB',
    volume: '9.7M',
    updatedAt: '15 min ago',
    tables: ['resource_point_master', 'hotel_checkin_trace', 'venue_activity_hit'],
    status: 'SYNCING',
    capabilities: ['Location Merging', 'Accommodation ID', 'Venue Activity Match']
  },
  {
    id: 'db_09',
    title: 'Checkpoint Surveillance DB',
    volume: '113M',
    updatedAt: '6 min ago',
    tables: ['checkpoint_vehicle_log', 'risk_plate_watchlist', 'route_intercept_record'],
    status: 'CONNECTED',
    capabilities: ['Risk Plate Monitoring', 'Intercept Record Association', 'Path Tracking']
  },
  {
    id: 'db_10',
    title: 'Key Vehicle Trajectory DB',
    volume: '74M',
    updatedAt: '1 min ago',
    tables: ['vehicle_route_segment', 'speed_risk_frame', 'road_cross_event'],
    status: 'CONNECTED',
    capabilities: ['Speed Risk ID', 'Trajectory Slicing', 'Segment Event Alignment']
  },
  {
    id: 'db_11',
    title: 'IM Communication Analysis DB',
    volume: '220M',
    updatedAt: '7 min ago',
    tables: ['app_contact_graph', 'call_chain_summary', 'message_time_window'],
    status: 'OFFLINE',
    capabilities: ['High-Freq Contact ID', 'Comm Window Extraction', 'Pending Online Semantic Analysis']
  },
  {
    id: 'db_12',
    title: 'Industry Regulation Interface DB',
    volume: '18M',
    updatedAt: '—',
    tables: ['registered_entity_index', 'license_binding', 'operator_record'],
    status: 'NOT_CONNECTED',
    capabilities: ['Pending Authorization', 'Entity Verification', 'Industry Profiling']
  }
];

interface ProcessingTask {
  id: string;
  table: string;
  source: string;
  action: string;
  progress: number;
}

const MOCK_TASKS: ProcessingTask[] = [
  { id: 't1', table: 'camera_capture_index', source: 'Video Checkpoint Capture DB', action: 'Field standardization complete, identifying device capture logic', progress: 100 },
  { id: 't2', table: 'person_device_binding', source: 'Person Relationship DB', action: 'Identity normalization complete, generating person-device binding', progress: 91 },
  { id: 't3', table: 'merchant_txn_trace', source: 'Mobile Payment Behavior DB', action: 'Abnormal nighttime payment pattern identification in progress', progress: 68 },
  { id: 't4', table: 'lbs_device_ping', source: 'LBS Signaling DB', action: 'Base station hit cleaning complete, executing time-window aggregation', progress: 100 },
  { id: 't5', table: 'vehicle_route_segment', source: 'Key Vehicle Trajectory DB', action: 'Segment-level trajectory stitching in progress, preparing for event correlation scoring', progress: 45 },
  { id: 't6', table: 'post_entity_extract', source: 'OSINT Collection DB', action: 'Event, person, location tag extraction complete, performing context compression', progress: 96 },
  { id: 't7', table: 'night_movement_cluster', source: 'LBS Signaling DB', action: 'Nighttime movement clustering generated, identifying companion device clusters', progress: 100 },
  { id: 't8', table: 'road_camera_event', source: 'Video Checkpoint Capture DB', action: 'Capture event alignment in progress, matching road risk segments', progress: 74 },
  { id: 't9', table: 'payer_receiver_link', source: 'Mobile Payment Behavior DB', action: 'Financial relationship construction in progress, filtering abnormal transfer links', progress: 30 },
  { id: 't10', table: 'incident_person_link', source: 'Police Case Master DB', action: 'Case person index update complete, backfilling main event nodes', progress: 100 },
];

export const IntelligentExploration: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].exploration;
  const [state, setState] = useState<ExplorationState>('INITIAL');
  const [selectedDbs, setSelectedDbs] = useState<string[]>([]);
  const [activeTasks, setActiveTasks] = useState<ProcessingTask[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const startExploration = () => {
    if (selectedDbs.length === 0) return;
    setState('PROCESSING');
    setOverallProgress(0);
    setActiveTasks(MOCK_TASKS.slice(0, 5));
  };

  useEffect(() => {
    if (state === 'PROCESSING') {
      const timer = setInterval(() => {
        setOverallProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setState('COMPLETED');
            return 100;
          }
          return prev + 2;
        });

        // Rotate tasks
        setActiveTasks(prev => {
          const next = [...prev];
          const completedIdx = next.findIndex(t => t.progress >= 100);
          if (completedIdx !== -1) {
            const currentTaskIds = next.map(t => t.id);
            const availableTask = MOCK_TASKS.find(t => !currentTaskIds.includes(t.id));
            if (availableTask) {
              next[completedIdx] = { ...availableTask, progress: 0 };
            }
          }
          return next.map(t => ({
            ...t,
            progress: Math.min(100, t.progress + Math.random() * 10)
          }));
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [state]);

  const toggleDb = (id: string) => {
    if (state !== 'INITIAL') return;
    setSelectedDbs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    // Mock response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'assistant', content: t.agent.assistantResponse }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-mono text-black">
      {/* Header */}
      <header className="h-12 border-b border-slate-200 flex items-center px-4 justify-between shrink-0 bg-white z-50">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.subtitle}</span>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black uppercase tracking-tighter">{t.title}</h1>
              <span className="bg-black text-white px-1.5 py-0.5 text-[8px] font-black tracking-widest">{t.postIncident}</span>
            </div>
          </div>
          <div className="relative w-64 ml-4">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder={t.search} 
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 text-[9px] font-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
            />
          </div>
        </div>

        {/* Merged Indicators */}
        <div className="flex items-center gap-8">
          {[
            { label: t.kpis.connected, value: 27 },
            { label: t.kpis.tables, value: 191 },
            { label: t.kpis.governed, value: 151 },
            { label: t.kpis.activeTasks, value: state === 'PROCESSING' ? 5 : 0 },
            { label: t.kpis.mappings, value: '28,431' }
          ].map(kpi => (
            <div key={kpi.label} className="flex flex-col gap-0">
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</span>
              <span className="text-xs font-black">{kpi.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <span>{t.latency}: <span className="text-black">14ms</span></span>
            <span className="text-status-green flex items-center gap-1">
              <div className="w-1 h-1 bg-status-green" />
              {t.secureEnclave}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-black">KARLEE_B1</span>
              <span className="text-[7px] font-black text-slate-400">{t.operator}</span>
            </div>
            <div className="w-7 h-7 bg-black rounded-none" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Data Asset Wall (60%) */}
        <div className="w-[60%] border-r border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden relative">
          {/* Progress Module (Floating) */}
          <AnimatePresence>
            {(state === 'PROCESSING' || state === 'COMPLETED') && (
              <motion.div 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="absolute top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 p-4 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.1em] text-black">{t.progress.title}</h3>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">
                      {t.progress.subtitle.replace('{total}', '191').replace('{completed}', state === 'COMPLETED' ? '191' : '151')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black">{state === 'COMPLETED' ? '100%' : `${overallProgress}%`}</span>
                    {state === 'PROCESSING' && <RefreshCw className="w-3.5 h-3.5 animate-spin text-status-blue" />}
                    {state === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-status-green" />}
                  </div>
                </div>
                <div className="h-1 bg-slate-100 mb-4">
                  <motion.div 
                    className="h-full bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: state === 'COMPLETED' ? '100%' : `${overallProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {activeTasks.map((task) => (
                    <div key={task.id} className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black uppercase text-black">{task.table}</span>
                        <span className="text-[7px] font-black text-slate-400">{Math.round(task.progress)}%</span>
                      </div>
                      <div className="text-[8px] text-slate-500 font-bold leading-tight truncate">{task.action}</div>
                      <div className="h-0.5 bg-slate-50">
                        <motion.div 
                          className="h-full bg-slate-300"
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DB Cards Grid (3 Columns) */}
          <div className="flex-1 overflow-y-auto p-4 scroll-thin">
            <div className="grid grid-cols-3 gap-4">
              {DB_ASSETS.map((db) => (
                <div 
                  key={db.id}
                  onClick={() => toggleDb(db.id)}
                  className={cn(
                    "p-3 border transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between min-h-[160px]",
                    selectedDbs.includes(db.id)
                      ? "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white border-slate-200 hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]",
                    db.status === 'OFFLINE' && "opacity-60 grayscale",
                    db.status === 'NOT_CONNECTED' && "opacity-40"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Database className={cn("w-3.5 h-3.5", selectedDbs.includes(db.id) ? "text-black" : "text-slate-400")} />
                        <h4 className="text-[9px] font-black uppercase tracking-tight leading-tight">
                          {language === 'zh' ? (
                            db.title === 'OSINT Collection DB' ? 'OSINT 采集数据库' :
                            db.title === 'Web Intel Collection DB' ? 'Web 情报采集数据库' :
                            db.title === 'LBS Signaling DB' ? 'LBS 信令数据库' :
                            db.title === 'Police Case Master DB' ? '警方案件主数据库' :
                            db.title === 'Person Relationship DB' ? '人员关系数据库' :
                            db.title === 'Video Checkpoint Capture DB' ? '视频卡口抓拍数据库' :
                            db.title === 'Mobile Payment Behavior DB' ? '移动支付行为数据库' :
                            db.title === 'Resource Location DB' ? '资源位置数据库' :
                            db.title === 'Checkpoint Surveillance DB' ? '卡口监控数据库' :
                            db.title === 'Key Vehicle Trajectory DB' ? '重点车辆轨迹数据库' :
                            db.title === 'IM Communication Analysis DB' ? '即时通讯分析数据库' :
                            db.title === 'Industry Regulation Interface DB' ? '行业监管接口数据库' : db.title
                          ) : db.title}
                        </h4>
                      </div>
                      <div className={cn(
                        "text-[6px] font-black px-1 py-0.5 border uppercase shrink-0",
                        db.status === 'CONNECTED' && "bg-status-green/10 text-status-green border-status-green/20",
                        db.status === 'SYNCING' && "bg-status-blue/10 text-status-blue border-status-blue/20 animate-pulse",
                        db.status === 'OFFLINE' && "bg-slate-100 text-slate-400 border-slate-200",
                        db.status === 'NOT_CONNECTED' && "bg-red-50 text-status-red border-status-red/20"
                      )}>
                        {db.status.replace('_', ' ')}
                      </div>
                    </div>

                    <div className="flex gap-2 text-[7px] font-bold text-slate-400">
                      <span>VOL: <span className="text-black">{db.volume}</span></span>
                      <span>UPD: <span className="text-black">{db.updatedAt}</span></span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap gap-1">
                        {db.tables.slice(0, 2).map(t => (
                          <span key={t} className="text-[6px] font-bold text-slate-600 bg-slate-50 px-1 border border-slate-200 truncate max-w-[80px]">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 pt-1.5 border-t border-slate-100">
                      {db.capabilities.slice(0, 2).map(c => (
                        <span key={c} className="text-[6px] font-black text-status-blue uppercase tracking-tighter truncate">
                          {language === 'zh' ? (
                            c === 'Cross-DB Query' ? '跨库查询' :
                            c === 'Semantic Governance Complete' ? '语义治理完成' :
                            c === 'Event Extraction Supported' ? '支持事件提取' :
                            c === 'Correlation Computing' ? '关联计算' :
                            c === 'Timeline Restoration' ? '时间线还原' :
                            c === 'Source Comparison' ? '来源比对' :
                            c === 'Device Positioning' ? '设备定位' :
                            c === 'Spatio-Temporal Clustering' ? '时空聚类' :
                            c === 'Trajectory Reconstruction' ? '轨迹重建' :
                            c === 'Case Master Index' ? '案件主索引' :
                            c === 'Disposal Chain Restoration' ? '处置链还原' :
                            c === 'Person Mapping' ? '人员映射' :
                            c === 'Relationship Extraction' ? '关系提取' :
                            c === 'Identity Normalization' ? '身份归一化' :
                            c === 'Vehicle Association' ? '车辆关联' :
                            c === 'Trajectory Verification' ? '轨迹验证' :
                            c === 'Time-Window Query' ? '时间窗口查询' :
                            c === 'Payment Chain Identification' ? '支付链识别' :
                            c === 'Anomaly Pattern Discovery' ? '异常模式发现' :
                            c === 'Location Merging' ? '位置合并' :
                            c === 'Accommodation ID' ? '住宿识别' :
                            c === 'Venue Activity Match' ? '场馆活动匹配' :
                            c === 'Risk Plate Monitoring' ? '风险车牌监测' :
                            c === 'Intercept Record Association' ? '拦截记录关联' :
                            c === 'Path Tracking' ? '路径追踪' :
                            c === 'Speed Risk ID' ? '超速风险识别' :
                            c === 'Trajectory Slicing' ? '轨迹切片' :
                            c === 'Segment Event Alignment' ? '路段事件对齐' :
                            c === 'High-Freq Contact ID' ? '高频联系人识别' :
                            c === 'Comm Window Extraction' ? '通信窗口提取' :
                            c === 'Pending Online Semantic Analysis' ? '等待在线语义分析' :
                            c === 'Pending Authorization' ? '等待授权' :
                            c === 'Entity Verification' ? '实体验证' :
                            c === 'Industry Profiling' ? '行业画像' : c
                          ) : c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedDbs.includes(db.id) && (
                    <div className="mt-2 pt-1 border-t border-black flex items-center gap-1 text-[7px] font-black text-black uppercase">
                      <CheckCircle2 className="w-2 h-2" />
                      {language === 'zh' ? '在队列中' : 'IN QUEUE'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Merged Panel (40%) */}
        <div className="w-[40%] flex flex-col bg-white overflow-hidden">
          {/* Top: Exploration Flow & Semantic Engine (30%) */}
          <div className="h-[30%] border-b border-slate-200 flex flex-col bg-slate-50/50 overflow-hidden">
            <div className="flex-1 flex overflow-hidden divide-x divide-slate-200">
              {/* Flow Part */}
              <div className="flex-1 p-3 flex flex-col gap-3 min-w-0">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.1em]">{t.flow.title}</h3>
                </div>
                <div className="flex items-center justify-between relative px-2">
                  <div className="absolute top-1/2 left-4 right-4 h-px bg-slate-200 -translate-y-1/2 z-0" />
                  {[1, 2, 3, 4, 5].map((step, i) => (
                    <div key={i} className={cn(
                      "relative z-10 w-5 h-5 border flex items-center justify-center text-[8px] font-black",
                      state === 'COMPLETED' || (state === 'PROCESSING' && i < 3)
                        ? "bg-black border-black text-white"
                        : "bg-white border-slate-200 text-slate-300"
                    )}>
                      {step}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {t.flow.steps.map(l => (
                    <span key={l} className="text-[7px] font-black text-slate-400 uppercase">{l}</span>
                  ))}
                </div>
              </div>

              {/* Engine Part */}
              <div className="flex-1 p-3 flex flex-col gap-2 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5" />
                    <h3 className="text-[9px] font-black uppercase tracking-[0.1em]">{t.engine.title}</h3>
                  </div>
                  {state === 'PROCESSING' && <RefreshCw className="w-2.5 h-2.5 animate-spin text-status-blue" />}
                </div>
                <div className="space-y-1.5 overflow-y-auto scroll-thin pr-1">
                  {(state === 'PROCESSING' ? activeTasks : MOCK_TASKS.slice(0, 3)).map((task) => (
                    <div key={task.id} className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[7px] font-black text-black truncate max-w-[100px]">{task.table}</span>
                        <span className="text-[7px] font-black">{Math.round(task.progress)}%</span>
                      </div>
                      <div className="h-0.5 bg-slate-100">
                        <motion.div className="h-full bg-black" initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Intelligent Exploration Agent (70%) */}
          <div className="h-[70%] flex flex-col bg-white overflow-hidden relative">
            <div className="p-2 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-black flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-[9px] font-black uppercase tracking-widest leading-none">{t.agent.title}</h2>
                    <span className="text-[6px] font-bold text-slate-400 uppercase">{t.agent.subtitle}</span>
                  </div>
                </div>

                {state === 'INITIAL' ? (
                  <button 
                    onClick={startExploration}
                    disabled={selectedDbs.length === 0}
                    className={cn(
                      "px-3 py-1 text-[8px] font-black uppercase tracking-[0.1em] transition-all flex items-center gap-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0",
                      selectedDbs.length > 0 ? "bg-black text-white hover:bg-slate-800" : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                    )}
                  >
                    {t.agent.btnStart}
                  </button>
                ) : state === 'PROCESSING' ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[8px] font-black text-status-blue">{overallProgress}%</span>
                    <div className="w-16 h-1 bg-slate-100 border border-black/5">
                      <motion.div className="h-full bg-status-blue" initial={{ width: 0 }} animate={{ width: `${overallProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-status-green/10 border border-status-green/20 shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5 text-status-green" />
                    <span className="text-[7px] font-black text-status-green uppercase">{t.agent.ready}</span>
                  </div>
                )}
              </div>
              
              <p className="text-[8px] text-slate-600 font-bold leading-tight">
                {t.agent.desc}
              </p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {state === 'COMPLETED' ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 scroll-thin">
                    <div className="p-1.5 bg-slate-50 border border-slate-200 text-[8px] font-bold text-slate-600 leading-relaxed italic">
                      "{t.agent.contextGenerated}"
                    </div>

                    {/* Insight Suggestions */}
                    <div className="grid grid-cols-1 gap-1">
                      {t.insightSuggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => setInputValue(s.title)}
                          className="p-1.5 bg-white border border-slate-200 text-left hover:border-black transition-all group"
                        >
                          <div className="text-[7px] font-black uppercase tracking-tight text-black group-hover:text-status-blue truncate">{s.title}</div>
                        </button>
                      ))}
                    </div>

                    {chatMessages.map((msg, i) => (
                      <div key={i} className={cn(
                        "flex flex-col gap-0.5 max-w-[90%]",
                        msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                      )}>
                        <div className={cn(
                          "p-1.5 text-[8px] font-bold leading-relaxed",
                          msg.role === 'user' ? "bg-black text-white" : "bg-slate-50 border border-slate-200 text-black"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="p-2 border-t border-slate-200 bg-white">
                    <div className="relative flex items-center gap-2">
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t.agent.placeholder}
                        className="flex-1 bg-slate-50 border border-slate-200 px-2 py-1 text-[8px] font-bold focus:outline-none focus:ring-1 focus:ring-black transition-all"
                      />
                      <button 
                        onClick={handleSend}
                        className="w-7 h-7 bg-black text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-200 p-4 text-center">
                  <MessageSquare className="w-8 h-8 opacity-10 mb-1" />
                  <div className="text-[7px] font-black uppercase tracking-[0.2em] opacity-30">
                    {language === 'zh' ? '等待上下文...' : 'Waiting for context...'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-6 border-t border-slate-200 bg-white flex items-center justify-between px-4 text-[8px] font-black text-slate-400 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-status-green" />
            <span className="text-black">ONTOLOGY ENGINE: NOMINAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-status-green" />
            <span className="text-black">SEMANTIC INDEX: ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-status-blue animate-pulse" />
            <span className="text-black">TABLE GOVERNANCE: RUNNING</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>REGION: ASIA-SOUTH-1</span>
          <span>BUILD: 2026.04.08_REL-EXPLORATION</span>
          <span className="text-slate-300">© 2026 AEGIS DEFENSE SYSTEMS</span>
        </div>
      </footer>
    </div>
  );
};
