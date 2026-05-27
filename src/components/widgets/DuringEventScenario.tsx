import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ReactECharts from 'echarts-for-react';
import { 
  MessageSquare, 
  TrendingUp, 
  AlertCircle, 
  Globe, 
  Shield, 
  Activity,
  BarChart3,
  Search,
  Filter,
  MoreHorizontal,
  Zap,
  ArrowRight,
  User,
  Video,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
  LayoutGrid,
  FileSearch,
  Sparkles,
  Send
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { DURING_EVENT_I18N } from '@/src/i18n/duringEvent';

// Fix Leaflet icon issue
// ... (rest of imports)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface OpinionTopic {
  id: number;
  title: string;
  keywords: string;
  coords: [number, number];
  imageUrl: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  volume: string;
  source: string;
  type: string;
  topSources: string[];
}

const SOCIAL_PLATFORMS = [
  { name: 'TikTok', count: 520000 },
  { name: 'Telegram', count: 380000 },
  { name: 'X', count: 210000 },
  { name: 'Facebook', count: 150000 },
  { name: 'Instagram', count: 120000 },
  { name: 'YouTube', count: 90000 },
  { name: 'VK', count: 50000 },
  { name: 'WhatsApp', count: 30000 },
  { name: 'Reddit', count: 20000 },
  { name: 'LinkedIn', count: 10000 },
];

interface DuringEventScenarioProps {
  viewMode: 'GLOBAL' | 'DETAILED';
  setViewMode: (mode: 'GLOBAL' | 'DETAILED') => void;
}

export const DuringEventScenario: React.FC<DuringEventScenarioProps> = ({ viewMode, setViewMode }) => {
  const { language } = useLanguage();
  const t = DURING_EVENT_I18N[language];
  
  const OPINION_TOPICS = useMemo(() => {
    const baseTopics = DURING_EVENT_I18N['en'].topics;
    const translatedTopics = t.topics;
    return baseTopics.map((topic: any, i: number) => ({
      ...topic,
      title: translatedTopics[i]?.title || topic.title,
      keywords: translatedTopics[i]?.keywords || topic.keywords,
      type: translatedTopics[i]?.type || topic.type,
      coords: [
        [43.2389, 76.8897], [44.5133, 50.2614], [51.1694, 71.4491], [42.3249, 69.5881], [49.8019, 73.1021],
        [43.5000, 77.5000], [47.1167, 51.9167], [50.2833, 57.1667], [51.5000, 72.0000], [50.4111, 80.2275], [43.25, 76.9]
      ][i],
      imageUrl: [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1506012733851-bb0755c8854f?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1494412574743-019485676a21?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=300"
      ][i],
      sentiment: ['NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'POSITIVE', 'POSITIVE', 'POSITIVE', 'POSITIVE', 'POSITIVE', 'NEUTRAL'][i],
      volume: ['6.5M+', '1.1M+', '600K+', '1.3M+', '4M+', '450K+', '320K+', '280K+', '550K+', '2.5M+', '180K+'][i],
      source: ['TikTok/Telegram/X', 'X/Facebook', 'TikTok/Instagram', 'TikTok/Facebook', 'X/Instagram', 'Facebook/Instagram', 'X/LinkedIn', 'TikTok/Instagram', 'Instagram/YouTube', 'TikTok/YouTube', 'Facebook/Telegram'][i],
      topSources: [['TikTok', 'Telegram', 'X'], ['X', 'Facebook', 'Telegram'], ['TikTok', 'Instagram', 'Telegram'], ['TikTok', 'Facebook', 'X'], ['X', 'Instagram', 'Telegram'], ['Facebook', 'Instagram', 'LinkedIn'], ['X', 'LinkedIn', 'Facebook'], ['TikTok', 'Instagram', 'YouTube'], ['Instagram', 'YouTube', 'TikTok'], ['TikTok', 'YouTube', 'Instagram'], ['Facebook', 'Telegram', 'Instagram']][i]
    }));
  }, [language, t]);

  const WEEKLY_TRENDS = useMemo(() => {
    const baseTrends = [
      { name: 'Security', color: '#ef4444' },
      { name: 'Military', color: '#475569' },
      { name: 'Politics', color: '#1e293b' },
      { name: 'Economy', color: '#0f172a' },
      { name: 'Livelihood', color: '#64748b' },
      { name: 'Tech', color: '#94a3b8' },
      { name: 'Education', color: '#cbd5e1' },
    ];
    return baseTrends.map((trend, i) => ({
      ...trend,
      name: t.trends[i] || trend.name,
      data: [
        [45, 52, 68, 85, 78, 82, 88, 92],
        [30, 35, 42, 50, 48, 55, 52, 58],
        [25, 28, 30, 35, 32, 38, 40, 42],
        [20, 22, 25, 28, 30, 28, 32, 35],
        [15, 18, 20, 22, 25, 24, 28, 30],
        [10, 12, 15, 18, 20, 22, 24, 26],
        [5, 8, 10, 12, 15, 14, 16, 18],
      ][i]
    }));
  }, [language, t]);

  const KOL_DATA = t.kolData || [];
  const POST_DATA = t.postData || [];

  const [activeMetric, setActiveMetric] = useState('sentiment');
  const [isSentimentDrilled, setIsSentimentDrilled] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: t.ui.assistantGreeting }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [geoData, setGeoData] = React.useState<any>(null);
  const [selectedTopic, setSelectedTopic] = React.useState<OpinionTopic | null>(null);
  const [selectedPostIndex, setSelectedPostIndex] = React.useState(0);
  const [isAiPanelExpanded, setIsAiPanelExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const volumeTimelineOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', lineStyle: { color: '#cbd5e1', width: 1 } },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#0f172a', fontSize: 10 }
    },
    grid: [
      { left: '8%', right: '4%', height: '60%', top: '10%' },
      { left: '8%', right: '4%', top: '75%', height: '15%' }
    ],
    xAxis: [
      {
        type: 'category',
        data: Array.from({ length: 40 }).map((_, i) => {
          const date = new Date(2026, 2, 1 + i);
          return `${date.getMonth() + 1}.${date.getDate()}`;
        }),
        boundaryGap: true,
        axisLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { fontSize: 9, color: '#64748b', interval: 4 }
      },
      {
        type: 'category',
        gridIndex: 1,
        data: Array.from({ length: 40 }).map((_, i) => {
          const date = new Date(2026, 2, 1 + i);
          return `${date.getMonth() + 1}.${date.getDate()}`;
        }),
        boundaryGap: true,
        axisLine: { lineStyle: { color: '#f1f5f9' } },
        axisTick: { show: false },
        axisLabel: { show: false }
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { fontSize: 9, color: '#64748b' }
      },
      {
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Sentiment Heat (K-Line)',
        type: 'candlestick',
        data: Array.from({ length: 40 }).map((_, i) => {
          let base = 1000 + Math.random() * 500;
          if (i > 10) base += 500;
          if (i > 20) base += 1000;
          if (i > 25) base -= 1000;
          
          const open = base;
          const close = base + (Math.random() - 0.4) * 400;
          const low = Math.min(open, close) - Math.random() * 100;
          const high = Math.max(open, close) + Math.random() * 100;
          return [open, close, low, high];
        }),
        itemStyle: {
          color: '#ef4444',
          color0: '#22c55e',
          borderColor: '#ef4444',
          borderColor0: '#22c55e'
        },
        markPoint: {
          label: {
            show: true,
            position: 'top',
            fontSize: 9,
            fontWeight: 'bold',
            backgroundColor: '#fff',
            padding: [4, 8],
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#e2e8f0',
            formatter: '{b}',
            color: '#0f172a'
          },
          data: [
            { name: t.detailed?.chartMarkers?.kolOutburst || 'KOL Sudden Outburst', coord: [10, 1600], itemStyle: { color: '#ef4444' } },
            { name: t.detailed?.chartMarkers?.miaDismissal || 'MIA Announces Dismissal', coord: [23, 3000], itemStyle: { color: '#ef4444' } },
            { name: t.detailed?.chartMarkers?.officialReport || 'Official Report Released', coord: [25, 4500], itemStyle: { color: '#ef4444' } }
          ]
        }
      },
      {
        name: 'Interaction Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: Array.from({ length: 40 }).map((_, i) => {
          if (i === 25) return 3800000;
          if (i === 23) return 2150000;
          return 500000 + Math.random() * 1000000;
        }),
        itemStyle: {
          color: (params: any) => {
            return params.dataIndex === 25 || params.dataIndex === 23 ? '#ef4444' : '#cbd5e1';
          }
        }
      }
    ]
  };

  const sentimentDoughnutOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    series: [
      {
        name: isSentimentDrilled ? t.ui.coreTarget : t.ui.overallSentiment,
        type: 'pie',
        radius: ['40%', '65%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          position: 'inner',
          formatter: '{d}%',
          fontSize: 9,
          fontWeight: 'bold',
          color: '#fff'
        },
        data: isSentimentDrilled ? [
          { value: 58, name: t.detailed?.sentimentTargets?.police || 'Police', itemStyle: { color: '#ef4444' } },
          { value: 27, name: t.detailed?.sentimentTargets?.perpetrator || 'Perpetrator', itemStyle: { color: '#f97316' } },
          { value: 10, name: t.detailed?.sentimentTargets?.dealers || 'Dealers', itemStyle: { color: '#64748b' } },
          { value: 5, name: t.detailed?.sentimentTargets?.brand || 'Brand', itemStyle: { color: '#94a3b8' } }
        ] : [
          { value: 82.5, name: t.ui.negative, itemStyle: { color: '#ef4444' } },
          { value: 12.0, name: t.ui.neutral, itemStyle: { color: '#94a3b8' } },
          { value: 5.5, name: t.ui.positive, itemStyle: { color: '#22c55e' } }
        ]
      },
      {
        type: 'pie',
        radius: ['40%', '65%'],
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          fontSize: 10,
          color: '#0f172a',
          fontWeight: 'bold'
        },
        labelLine: { show: true, length: 15, length2: 10, lineStyle: { color: '#cbd5e1' } },
        data: isSentimentDrilled ? [
          { value: 58, name: t.detailed?.sentimentTargets?.police || 'Police' },
          { value: 27, name: t.detailed?.sentimentTargets?.perpetrator || 'Perpetrator' },
          { value: 10, name: t.detailed?.sentimentTargets?.dealers || 'Dealers' },
          { value: 5, name: t.detailed?.sentimentTargets?.brand || 'Brand' }
        ] : [
          { value: 82.5, name: t.ui.negative },
          { value: 12.0, name: t.ui.neutral },
          { value: 5.5, name: t.ui.positive }
        ],
        itemStyle: { opacity: 0 },
        tooltip: { show: false }
      }
    ]
  };

  const emotionRadarOption = {
    radar: {
      indicator: [
        { name: t.detailed?.emotionLabels?.corruption || 'Corruption', max: 100 },
        { name: t.detailed?.emotionLabels?.safety || 'Safety', max: 100 },
        { name: t.detailed?.emotionLabels?.ev || 'EV', max: 100 },
        { name: t.detailed?.emotionLabels?.grief || 'Grief', max: 100 }
      ],
      shape: 'circle',
      splitNumber: 4,
      axisName: { color: '#64748b', fontSize: 10, fontWeight: 'bold' },
      splitLine: { lineStyle: { color: ['rgba(15, 23, 42, 0.05)'] } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: 'rgba(15, 23, 42, 0.05)' } }
    },
    series: [
      {
        name: t.ui.emotionBreakdown,
        type: 'radar',
        data: [
          {
            value: [65, 15, 12, 8],
            name: t.ui.emotionGranularity,
            areaStyle: { color: 'rgba(239, 68, 68, 0.3)' },
            lineStyle: { color: '#ef4444', width: 2 },
            symbol: 'none'
          }
        ]
      }
    ]
  };

  React.useEffect(() => {
    if (viewMode === 'DETAILED' && !selectedTopic) {
      setSelectedTopic(OPINION_TOPICS[0]);
    }
  }, [viewMode, selectedTopic, OPINION_TOPICS]);

  const HOT_TOPICS_DATA = [
    { tag: '#ZeekrLocking', volume: '3.2M', trend: '+124%', color: 'text-status-red' },
    { tag: '#AlFarabiCrash', volume: '2.8M', trend: '+85%', color: 'text-status-red' },
    { tag: '#AlmatyPoliceCorruption', volume: '1.5M', trend: '+210%', color: 'text-status-red' },
    { tag: '#JusticeForVictims', volume: '980K', trend: '+45%', color: 'text-slate-600' },
    { tag: '#GreyMarketRisk', volume: '850K', trend: '+32%', color: 'text-slate-600' },
    { tag: '#RoadSafetyKZ', volume: '720K', trend: '+18%', color: 'text-slate-600' },
    { tag: '#DigitalOwnership', volume: '640K', trend: '+12%', color: 'text-slate-600' },
    { tag: '#CorruptionExposed', volume: '590K', trend: '+156%', color: 'text-status-red' },
    { tag: '#EVRegulations', volume: '420K', trend: '+5%', color: 'text-slate-600' },
    { tag: '#PublicOutrage', volume: '380K', trend: '+92%', color: 'text-status-red' },
  ];

  const chartOptions = {
    timeline: {
      xAxis: { type: 'category', data: ['W1', 'W2', 'W3', 'W4'], axisLabel: { fontSize: 8, color: '#94a3b8' }, axisLine: { lineStyle: { color: '#f1f5f9' } } },
      yAxis: { type: 'value', axisLabel: { fontSize: 8, color: '#94a3b8' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
      series: [{ data: [450000, 1200000, 3800000, 1074000], type: 'line', smooth: true, symbol: 'none', areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(239, 68, 68, 0.2)' }, { offset: 1, color: 'rgba(239, 68, 68, 0)' }] } }, itemStyle: { color: '#ef4444' } }],
      grid: { top: 10, bottom: 20, left: 40, right: 10 }
    },
    sentiment: {
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie', radius: ['60%', '85%'], avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 82.5, name: t.ui.negative, itemStyle: { color: '#ef4444' } },
          { value: 12.0, name: t.ui.neutral, itemStyle: { color: '#94a3b8' } },
          { value: 5.5, name: t.ui.positive, itemStyle: { color: '#22c55e' } }
        ]
      }],
      grid: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    platforms: {
      series: [{
        type: 'pie', radius: [5, 45], roseType: 'area',
        itemStyle: { borderRadius: 4 },
        label: { show: false },
        data: [
          { value: 38, name: 'Telegram', itemStyle: { color: '#0088cc' } },
          { value: 28, name: 'TikTok', itemStyle: { color: '#000000' } },
          { value: 18, name: 'Instagram', itemStyle: { color: '#e4405f' } },
          { value: 10, name: 'YouTube', itemStyle: { color: '#ff0000' } },
          { value: 6, name: 'FB/X', itemStyle: { color: '#1877f2' } }
        ]
      }],
      grid: { top: 0, bottom: 0, left: 0, right: 0 }
    }
  };

  React.useEffect(() => {
    // Fetch Kazakhstan GeoJSON for boundaries - Using a more reliable source
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/KAZ.geo.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setGeoData(data))
      .catch(err => {
        console.error('Failed to load GeoJSON:', err);
        // Fallback to a more detailed mock if fetch fails to ensure the map still looks good
        setGeoData({
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: { name: "Kazakhstan" },
            geometry: {
              type: "Polygon",
              coordinates: [[[50.5, 41.5], [77.3, 42.2], [87.3, 49.1], [82.5, 52.3], [70.5, 55.4], [50.2, 54.2], [46.5, 48.5], [50.5, 41.5]]]
            }
          }]
        });
      });
  }, []);

  // Auto-scrolling logic
  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const step = 0.5; // Slow scroll speed
    const interval = setInterval(() => {
      scrollAmount += step;
      if (scrollAmount >= container.scrollHeight - container.clientHeight) {
        scrollAmount = 0;
      }
      container.scrollTop = scrollAmount;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const alertValue = useMemo(() => Math.floor(Math.random() * 9) + 1, []);
  const alertColor = alertValue >= 7 ? '#22c55e' : alertValue >= 4 ? '#eab308' : '#ef4444';

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {viewMode === 'GLOBAL' ? (
          <motion.div 
            key="global"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Top 70% - GIS Map with Opinion Boxes */}
            <div className="h-[70%] relative border-b border-black overflow-hidden">
              <MapContainer 
                center={[48.0196, 66.9237]} 
                zoom={5} 
                style={{ height: '100%', width: '100%', background: '#ffffff' }}
                zoomControl={false}
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                />
                
                {geoData && (
                  <GeoJSON 
                    data={geoData} 
                    style={{
                      color: '#000000',
                      weight: 0.5,
                      fillColor: '#f8fafc',
                      fillOpacity: 0.3
                    }}
                  />
                )}
                
                {OPINION_TOPICS.map((topic) => (
                  <Marker 
                    key={topic.id} 
                    position={topic.coords}
                    icon={L.divIcon({
                      className: 'custom-div-icon',
                      html: `<div class="flex items-stretch bg-white border border-black shadow-sm w-[240px] h-[60px] overflow-hidden pointer-events-auto opacity-90 hover:opacity-100 hover:shadow-md transition-all group rounded-none">
                        <div class="w-[60px] shrink-0 bg-slate-50 border-r border-black overflow-hidden">
                          <img src="${topic.imageUrl}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                        </div>
                        <div class="flex-1 p-2 flex flex-col justify-between min-w-0 bg-white">
                          <div class="text-[9px] font-bold text-black leading-tight line-clamp-2 uppercase tracking-tight font-mono">
                            ${topic.title}
                          </div>
                          <div class="text-[7px] font-mono text-slate-400 font-bold uppercase truncate tracking-tighter">
                            ${topic.keywords}
                          </div>
                        </div>
                      </div>`,
                      iconSize: [240, 60],
                      iconAnchor: [120, 30]
                    })}
                  />
                ))}
              </MapContainer>

              {/* Social Media Feed Overlay - Bottom Left */}
              <div className="absolute bottom-6 left-6 z-[1000] pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md border border-black p-3 rounded-none shadow-lg w-[240px]">
                  <div className="flex items-center gap-2 mb-2 border-b border-black pb-1">
                    <Globe className="w-3 h-3 text-black" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-black font-mono">{t.ui.socialMediaFeed}</span>
                    <span className="ml-auto text-[10px] font-mono font-black text-black">1.58M</span>
                  </div>
                  <div className="grid grid-cols-5 gap-x-2 gap-y-1.5">
                    {SOCIAL_PLATFORMS.map((platform, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-[6px] font-mono text-slate-500 font-bold uppercase truncate w-full text-center">{platform.name}</span>
                        <span className="text-[8px] font-mono font-black text-black">{(platform.count / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 30% - Sentiment Ledger */}
            <div className="h-[30%] flex bg-white overflow-hidden">
              {/* Left: Ledger List */}
              <div className="w-[65%] border-r border-black flex flex-col">
                <div className="h-10 border-b border-black bg-white flex items-center px-4 justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-black" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black font-mono">{t.ui.sentimentLedger}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 border border-black rounded-none">
                      <Search className="w-3 h-3 text-slate-400" />
                      <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">{t.ui.search}</span>
                    </div>
                    <Filter className="w-3.5 h-3.5 text-black cursor-pointer hover:text-slate-600" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto scroll-thin" ref={scrollRef}>
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-white z-20">
                      <tr className="border-b border-black">
                        <th className="px-4 py-2 text-[9px] font-mono text-black uppercase font-bold tracking-wider">ID</th>
                        <th className="px-4 py-2 text-[9px] font-mono text-black uppercase font-bold tracking-wider">Context</th>
                        <th className="px-4 py-2 text-[9px] font-mono text-black uppercase font-bold tracking-wider whitespace-nowrap">Type</th>
                        <th className="px-4 py-2 text-[9px] font-mono text-black uppercase font-bold tracking-wider leading-tight">Sentiment<br/>Analysis</th>
                        <th className="px-4 py-2 text-[9px] font-mono text-black uppercase font-bold tracking-wider">Volume</th>
                        <th className="px-4 py-2 text-[9px] font-mono text-black uppercase font-bold tracking-wider text-right">Top Sources</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OPINION_TOPICS.map((topic, index) => (
                        <tr 
                          key={topic.id} 
                          onClick={() => {
                            setSelectedTopic(topic);
                            setViewMode('DETAILED');
                          }}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                          <td className="px-4 py-2 text-[10px] font-mono text-slate-400 font-bold">
                            {index < 3 ? (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-status-red flex items-center justify-center text-[10px] text-white font-black rounded-none">
                                  {index + 1}
                                </div>
                                #OP-${topic.id.toString().padStart(3, '0')}
                              </div>
                            ) : (
                              `#OP-${topic.id.toString().padStart(3, '0')}`
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-[11px] font-bold text-black truncate max-w-[280px] uppercase tracking-tight font-mono">{topic.title}</div>
                          </td>
                          <td className="px-4 py-2">
                            <span className="text-[9px] px-2 py-0.5 bg-slate-50 border border-black/10 rounded-none text-slate-600 font-mono font-bold uppercase whitespace-nowrap">
                              {topic.type}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "w-1.5 h-1.5 rounded-none",
                                topic.sentiment === 'POSITIVE' ? "bg-status-green" : topic.sentiment === 'NEGATIVE' ? "bg-status-red" : "bg-slate-400"
                              )} />
                              <span className={cn(
                                "text-[9px] font-mono font-bold uppercase",
                                topic.sentiment === 'POSITIVE' ? "text-status-green" : topic.sentiment === 'NEGATIVE' ? "text-status-red" : "text-slate-400"
                              )}>
                                {topic.sentiment}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-[10px] font-mono font-bold text-black">{topic.volume}</td>
                          <td className="px-4 py-2 text-[9px] font-mono text-slate-400 font-bold text-right uppercase">
                            {topic.topSources.join(' / ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Aggregate Metrics - 8-Week Trend */}
              <div className="w-[35%] flex flex-col">
                <div className="h-10 border-b border-black bg-white flex items-center px-4">
                  <TrendingUp className="w-4 h-4 text-black mr-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black font-mono">{t.ui.topicAnalysis}</span>
                </div>
                <div className="flex-1 p-4 flex flex-col overflow-hidden">
                  {/* K-Line Style Trend Chart Area */}
                  <div className="flex-1 relative flex items-end gap-2 pb-8 border-b border-black px-2">
                    {Array.from({ length: 8 }).map((_, weekIndex) => (
                      <div key={weekIndex} className="flex-1 flex flex-col items-center h-full group relative">
                        {/* Vertical grid line */}
                        <div className="absolute inset-y-0 w-[1px] bg-slate-100 left-1/2 -translate-x-1/2" />
                        
                        <div className="relative w-full h-full flex flex-col justify-center items-center gap-1">
                          {WEEKLY_TRENDS.map((trend, i) => {
                            const value = trend.data[weekIndex];
                            const prevValue = weekIndex > 0 ? trend.data[weekIndex - 1] : value;
                            
                            // Simplified K-line: body represents change, wick represents range
                            const bodyHeight = Math.max(Math.abs(value - prevValue), 2);
                            const bottom = Math.min(value, prevValue);
                            
                            return (
                              <div 
                                key={i} 
                                className="absolute w-2 rounded-none transition-all duration-500"
                                style={{ 
                                  height: `${bodyHeight}%`,
                                  bottom: `${bottom}%`,
                                  backgroundColor: trend.color,
                                  opacity: 0.8
                                }}
                              >
                                {/* Wick */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-4 bg-inherit opacity-40 -top-2" />
                              </div>
                            );
                          })}
                        </div>

                        <div className="absolute -bottom-6 left-0 right-0 text-center text-[8px] font-mono text-black font-bold uppercase">
                          W-{7 - weekIndex}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend - Single Row */}
                  <div className="mt-4 flex items-center justify-between gap-2 overflow-x-auto scroll-thin pb-1">
                    {WEEKLY_TRENDS.map((trend, i) => (
                      <div key={i} className="flex items-center gap-1.5 shrink-0">
                        <div className="w-2 h-2 rounded-none" style={{ backgroundColor: trend.color }} />
                        <span className="text-[8px] font-bold text-black uppercase whitespace-nowrap font-mono">{trend.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detailed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 overflow-y-auto bg-slate-50 scroll-smooth"
          >
            <div className="max-w-[1600px] mx-auto p-6 flex gap-6 items-start relative overflow-hidden">
              {/* Left Column: Main Report Content */}
              <div className="flex-1 space-y-6 min-w-0 transition-all duration-500">
                
                {/* Section 1: Topic Header & Overview */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                      <img src={selectedTopic?.imageUrl} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-status-red text-white text-[8px] font-black rounded uppercase tracking-widest">{t.detailed.highPriority}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{t.detailed.caseId}: #OP-001</span>
                      </div>
                      <h2 className="text-xl font-black text-black uppercase tracking-tight leading-tight mb-3">
                        {selectedTopic?.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedTopic?.keywords.split(' ').map(kw => (
                          <span key={kw} className="text-[9px] font-mono font-bold text-status-red bg-red-50 px-2 py-1 rounded-full border border-red-100/50">{kw}</span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3 max-w-3xl">
                        {t.detailed.summary} <span className="text-status-red font-black">{selectedTopic?.volume}</span>.
                      </p>
                      <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          <span className="font-black text-slate-700 uppercase tracking-wider">{t.detailed.participants}:</span> 
                          {t.detailed.participantsList}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3 h-3" />
                          <span className="font-black text-slate-700 uppercase tracking-wider">{t.detailed.lastUpdate}:</span> 
                          2026-03-27 14:22
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Influencer & Content Network (Moved Up) */}
                <div className="grid grid-cols-2 gap-6">
                  {/* KOL Column */}
                  <div className="bg-white border border-slate-200 rounded-xl flex flex-col shadow-sm overflow-hidden">
                    <div className="h-10 border-b border-slate-100 flex items-center px-4 bg-slate-50/50">
                      <User className="w-4 h-4 text-slate-700 mr-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{t.detailed.topKol}</span>
                    </div>
                    <div className="p-4 space-y-3">
                      {KOL_DATA.map((kol, i) => (
                        <div key={i} className="flex items-start gap-4 p-2 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
                          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                            <img src={kol.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                             <span className="text-xs font-bold text-slate-900 truncate">{kol.name}</span>
                              <span className="text-[7px] font-mono font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">{kol.platform}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 leading-relaxed line-clamp-2 font-medium">{kol.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Posts Column */}
                  <div className="bg-white border border-slate-200 rounded-xl flex flex-col shadow-sm overflow-hidden">
                    <div className="h-10 border-b border-slate-100 flex items-center px-4 bg-slate-50/50">
                      <TrendingUp className="w-4 h-4 text-slate-700 mr-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{t.detailed.topPosts}</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {POST_DATA.map((post, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedPostIndex(i)}
                          className={cn(
                            "p-3 cursor-pointer transition-all flex gap-4 items-center",
                            selectedPostIndex === i ? "bg-slate-900 text-white" : "hover:bg-slate-50 bg-white"
                          )}
                        >
                          <div className="w-16 h-12 shrink-0 overflow-hidden rounded-lg shadow-sm">
                            <img src={post.img} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className={cn(
                                "text-[7px] font-mono font-bold px-2 py-0.5 rounded uppercase",
                                selectedPostIndex === i ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                              )}>
                                {post.platform}
                              </span>
                              <span className="text-[8px] font-mono font-bold text-status-red">{post.interaction.split(' ')[1]}</span>
                            </div>
                            <div className={cn(
                              "text-[10px] font-black truncate uppercase tracking-tight",
                              selectedPostIndex === i ? "text-white" : "text-slate-700"
                            )}>{post.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 4: Post Detail Analysis (Moved Up) */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                  <div className="h-12 border-b border-slate-100 flex items-center px-6 bg-slate-50/50 justify-between">
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-slate-900 mr-3" />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-900">{t.detailed.postDetailAnalysis}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-600 font-bold">{t.detailed.verifiedEntry} #{selectedPostIndex + 1}</span>
                  </div>
                  
                  <div className="flex gap-8 p-8">
                    {/* YouTube Video Embed */}
                    <div className="w-1/2 aspect-video bg-black overflow-hidden rounded-xl shadow-2xl shrink-0">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/6Sclh18YuGM" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    
                    {/* Post Details */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-black text-black leading-tight mb-4">
                        {language === 'zh' ? '本周回顾：阿尔法拉比大道发生惨烈交通事故后，议员要求对内务部进行大规模清洗' : 'Итоги недели: депутаты требуют масштабной чистки МВД после трагического ДТП на проспекте Аль-Фараби'}
                      </h3>

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                            i
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-black">Informburo 31</span>
                            <span className="text-[10px] text-slate-500 font-bold">2.13M {t.detailed.subscribers}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end text-right">
                          <div className="text-xs font-black text-black">306 {t.detailed.likes} · 15,681 {t.detailed.views}</div>
                          <div className="text-[10px] text-slate-500 font-bold">{language === 'zh' ? '2026年3月27日' : 'March 27, 2026'}</div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                        <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                          {POST_DATA[selectedPostIndex].content}
                        </p>
                      </div>

                      <div className="border-t border-slate-100 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-black text-black uppercase tracking-widest">193 {t.detailed.comments}</span>
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="space-y-6">
                          {[
                            { user: "Kairat N.", text: language === 'zh' ? '终于有人公开谈论这件事了。需要彻底清理！' : "Finally they started talking about this openly. Need a full cleanup!", likes: "1.2K" },
                            { user: "Almaty_Resident", text: language === 'zh' ? '为什么现在才说？阿尔法拉比大道上的这些赛车每晚都在发生。' : "Why only now? These races on Al-Farabi happen every night.", likes: "856" }
                          ].map((comment, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 shadow-inner" />
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="text-xs font-black text-black">{comment.user}</span>
                                  <span className="text-[10px] text-slate-400">2 {t.detailed.daysAgo}</span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed mb-2">{comment.text}</p>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1.5">
                                    <Zap className="w-3 h-3 text-slate-400" />
                                    <span className="text-[10px] text-slate-500 font-bold">{comment.likes}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-900 font-black uppercase cursor-pointer hover:underline">{t.detailed.reply}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* 1. Volume & Timeline */}
                  <div 
                    onClick={() => setActiveMetric('volume')}
                    className={cn(
                      "bg-white border rounded-xl p-4 flex flex-col shadow-sm cursor-pointer transition-all h-40",
                      activeMetric === 'volume' ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200 hover:border-slate-400"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">{t.detailed.volumeTrend}</span>
                      <TrendingUp className="w-3 h-3 text-slate-500" />
                    </div>
                    <div className="flex-1 min-h-0">
                      <ReactECharts option={chartOptions.timeline} style={{ height: '100%' }} />
                    </div>
                  </div>

                  {/* 2. Sentiment & Emotion */}
                  <div 
                    onClick={() => setActiveMetric('sentiment')}
                    className={cn(
                      "bg-white border rounded-xl p-4 flex flex-col shadow-sm cursor-pointer transition-all h-40",
                      activeMetric === 'sentiment' ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200 hover:border-slate-400"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">{language === 'zh' ? '舆情监测' : 'Public Opinion Monitoring'}</span>
                      <Zap className="w-3 h-3 text-slate-500" />
                    </div>
                    <div className="flex-1 min-h-0">
                      <ReactECharts option={chartOptions.sentiment} style={{ height: '100%' }} />
                    </div>
                  </div>

                  {/* 3. Content & Semantics */}
                  <div 
                    onClick={() => setActiveMetric('content')}
                    className={cn(
                      "bg-white border rounded-xl p-4 flex flex-col shadow-sm cursor-pointer transition-all h-40",
                      activeMetric === 'content' ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200 hover:border-slate-400"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">{t.detailed.topKeywords}</span>
                      <FileSearch className="w-3 h-3 text-slate-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-1.5">
                      {[
                        { w: t.detailed?.keywords?.corruption || 'Corruption', v: '845K', p: 90 },
                        { w: t.detailed?.keywords?.justice || 'Justice', v: '620K', p: 75 },
                        { w: t.detailed?.keywords?.locking || 'Locking', v: '415K', p: 60 }
                      ].map(kw => (
                        <div key={kw.w} className="space-y-1">
                          <div className="flex justify-between text-[8px] font-black uppercase">
                            <span>{kw.w}</span>
                            <span>{kw.v}</span>
                          </div>
                          <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-900" style={{ width: `${kw.p}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Actors & Demographics */}
                  <div 
                    onClick={() => setActiveMetric('actors')}
                    className={cn(
                      "bg-white border rounded-xl p-4 flex flex-col shadow-sm cursor-pointer transition-all h-40",
                      activeMetric === 'actors' ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200 hover:border-slate-400"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">{t.detailed.demographics}</span>
                      <User className="w-3 h-3 text-slate-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-slate-600">{t.detailed.male}</span>
                        <span className="text-xs font-black text-slate-900">68%</span>
                      </div>
                      <div className="h-2 bg-slate-50 rounded-full flex overflow-hidden">
                        <div className="h-full bg-slate-900" style={{ width: '68%' }} />
                        <div className="h-full bg-slate-300" style={{ width: '32%' }} />
                      </div>
                    </div>
                  </div>

                  {/* 5. Channels & Platforms */}
                  <div 
                    onClick={() => setActiveMetric('channels')}
                    className={cn(
                      "bg-white border rounded-xl p-4 flex flex-col shadow-sm cursor-pointer transition-all h-40",
                      activeMetric === 'channels' ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200 hover:border-slate-400"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t.detailed.platformShare}</span>
                      <Globe className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="flex-1 min-h-0">
                      <ReactECharts option={chartOptions.platforms} style={{ height: '100%' }} />
                    </div>
                  </div>

                  {/* 6. Risk & Impact */}
                  <div 
                    onClick={() => setActiveMetric('risk')}
                    className={cn(
                      "bg-slate-900 border rounded-xl p-4 flex flex-col shadow-sm cursor-pointer transition-all h-40",
                      activeMetric === 'risk' ? "border-white ring-1 ring-white" : "border-slate-800 hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{t.detailed.impactAssessment}</span>
                      <Shield className="w-3 h-3 text-white/40" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold text-white/60 uppercase">{t.detailed.dismissedOfficers}</span>
                        <span className="text-sm font-black text-status-red">05</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold text-white/60 uppercase">{t.detailed.salesImpact}</span>
                        <span className="text-sm font-black text-status-red">-75%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Deep Analysis Engine (Moved Down) */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                  <div className="h-12 border-b border-slate-100 flex items-center px-6 bg-slate-50/50 justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-slate-900" />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                        {activeMetric === 'volume' && t.detailed?.analysisTitles?.volume}
                        {activeMetric === 'sentiment' && t.detailed?.analysisTitles?.sentiment}
                        {activeMetric === 'content' && t.detailed?.analysisTitles?.content}
                        {activeMetric === 'actors' && t.detailed?.analysisTitles?.actors}
                        {activeMetric === 'channels' && t.detailed?.analysisTitles?.channels}
                        {activeMetric === 'risk' && t.detailed?.analysisTitles?.risk}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono text-slate-400 font-bold">{t.detailed.analysisEngine} V2.4</span>
                      <div className="w-2.5 h-2.5 rounded-full bg-status-green animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="p-8 min-h-[500px] flex flex-col">
                    {activeMetric === 'volume' ? (
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1 bg-slate-50/50 rounded-xl border border-slate-100 p-6">
                          <ReactECharts option={volumeTimelineOption} style={{ height: '400px' }} />
                        </div>
                      </div>
                    ) : activeMetric === 'sentiment' ? (
                      <div className="flex-1 flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            <button 
                              onClick={() => setIsSentimentDrilled(false)}
                              className={cn(
                                "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                                !isSentimentDrilled ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              )}
                            >
                              {t.detailed.overallSentimentTone}
                            </button>
                            <button 
                              onClick={() => setIsSentimentDrilled(true)}
                              className={cn(
                                "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                                isSentimentDrilled ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              )}
                            >
                              {t.detailed.coreTargetOfAnger}
                            </button>
                          </div>
                          <div className="text-xs text-slate-400 font-medium italic">
                            {isSentimentDrilled ? t.detailed.analysisStatus.sentimentDrilled : t.detailed.analysisStatus.sentimentOverall}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                          <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 flex flex-col h-[400px]">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                              {isSentimentDrilled ? t.detailed.targetOfAngerBreakdown : t.detailed.overallSentimentRatio}
                            </div>
                            <div className="flex-1">
                              <ReactECharts option={sentimentDoughnutOption} style={{ height: '100%' }} />
                            </div>
                          </div>
                          <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 flex flex-col h-[400px]">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{t.detailed.negativeEmotionGranularity}</div>
                            <div className="flex-1">
                              <ReactECharts option={emotionRadarOption} style={{ height: '100%' }} />
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-3">
                              {[
                                { label: t.detailed?.emotionLabels?.corruption || 'Corruption', val: '65%', color: 'bg-red-500' },
                                { label: t.detailed?.emotionLabels?.safety || 'Safety', val: '15%', color: 'bg-orange-500' },
                                { label: t.detailed?.emotionLabels?.ev || 'EV', val: '12%', color: 'bg-slate-50' },
                                { label: t.detailed?.emotionLabels?.grief || 'Grief', val: '8%', color: 'bg-slate-400' }
                              ].map(item => (
                                <div key={item.label} className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                  <div className="flex items-center gap-2">
                                    <div className={cn("w-2 h-2 rounded-full", item.color)} />
                                    <span className="text-[9px] font-bold text-slate-600">{item.label}</span>
                                  </div>
                                  <span className="text-xs font-black text-slate-900">{item.val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-20">
                        <LayoutGrid className="w-16 h-16 mb-6 opacity-10" />
                        <span className="text-sm font-bold uppercase tracking-widest opacity-40">{t.detailed.selectMetric}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Spacer */}
                <div className="h-12" />
              </div>

              {/* Right Column: Collapsible AI Assistant */}
              <div className={cn(
                "sticky top-6 shrink-0 transition-all duration-500 ease-in-out flex items-start",
                isAiPanelExpanded ? "w-[400px]" : "w-12"
              )}>
                {/* Toggle Button */}
                <button 
                  onClick={() => setIsAiPanelExpanded(!isAiPanelExpanded)}
                  className={cn(
                    "w-12 h-12 bg-white border border-slate-200 rounded-l-2xl shadow-lg flex items-center justify-center hover:bg-slate-50 transition-all z-20",
                    isAiPanelExpanded ? "border-r-0" : "rounded-2xl"
                  )}
                >
                  {isAiPanelExpanded ? (
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-status-yellow animate-pulse" />
                  )}
                </button>

                {/* Panel Content */}
                <div className={cn(
                  "bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-2xl flex flex-col overflow-hidden h-[calc(100vh-120px)] transition-all duration-500",
                  isAiPanelExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none w-0"
                )}>
                  <div className="h-14 border-b border-slate-100 flex items-center px-6 bg-slate-50 justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-status-yellow/10 rounded-lg">
                        <Sparkles className="w-5 h-5 text-status-yellow" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest text-black">{t.detailed.aiDataMining}</span>
                        <span className="text-[8px] font-mono text-slate-400 font-bold">GPT-4o-MINI // ACTIVE</span>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-status-green" />
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto scroll-thin space-y-6 bg-slate-50/30">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={cn(
                        "flex flex-col max-w-[90%]",
                        msg.role === 'user' ? "ml-auto items-end" : "items-start"
                      )}>
                        <div className={cn(
                          "p-4 rounded-2xl text-xs leading-relaxed shadow-sm",
                          msg.role === 'user' ? "bg-slate-900 text-white rounded-tr-none" : "bg-white text-black border border-slate-100 rounded-tl-none"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input & Suggestions */}
                  <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {t.detailed.suggestions.map((s: string, i: number) => (
                        <button 
                          key={i}
                          onClick={() => {
                            setChatMessages([...chatMessages, { role: 'user', content: s }]);
                            // Simulate response
                            setTimeout(() => {
                              const response = language === 'zh' 
                                ? `正在为您分析：${s}...\n根据初步数据挖掘，该事件在 TikTok 上的传播主要由 3 个核心枢纽账号驱动，其内容在 24 小时内实现了跨平台（Telegram -> TikTok）的指数级增长。`
                                : `Analyzing for you: ${s}...\nBased on preliminary data mining, the propagation of this event on TikTok is mainly driven by 3 core hub accounts, and its content achieved exponential growth across platforms (Telegram -> TikTok) within 24 hours.`;
                              setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
                            }, 1000);
                          }}
                          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] text-slate-600 transition-colors font-bold"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <input 
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && chatInput.trim()) {
                            setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
                            setChatInput('');
                          }
                        }}
                        placeholder={t.detailed.askAi}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm text-black caret-black placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-all shadow-inner"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-black transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
