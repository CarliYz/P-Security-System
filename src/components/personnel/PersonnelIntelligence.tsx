import React, { useMemo, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType, 
  Node, 
  Edge,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { 
  AlertTriangle, 
  Car, 
  MapPin, 
  Shield, 
  User, 
  Activity, 
  Zap, 
  History, 
  AlertCircle,
  Home,
  CreditCard,
  Smartphone,
  Globe,
  Link as LinkIcon,
  Search,
  Network,
  Phone,
  Briefcase,
  DollarSign,
  Lock,
  Terminal,
  Hash
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
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

interface PersonnelIntelligenceProps {
  personId: string | null;
}

// Custom Node for Palantir Foundry Style
const CustomNode = ({ data }: any) => {
  return (
    <div className={cn(
      "px-3 py-2 rounded border bg-white text-slate-700 min-w-[150px] shadow-sm transition-all hover:border-slate-400",
      data.isWarning ? "border-status-red/50 bg-red-50/10" : "border-slate-200"
    )}>
      <Handle type="target" position={Position.Top} className="w-1 h-1 bg-slate-300 border-none" />
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "w-8 h-8 rounded overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center bg-slate-50",
          data.isWarning && "border-status-red/30"
        )}>
          {data.imageUrl ? (
            <img 
              src={data.imageUrl} 
              alt={data.label}
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all"
              referrerPolicy="no-referrer"
            />
          ) : (
            <data.icon className="w-4 h-4 text-slate-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[7px] font-mono text-slate-500 uppercase tracking-[0.2em] leading-none mb-1">{data.label}</div>
          <div className="text-[9px] font-bold truncate text-slate-600">{data.value}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-1 h-1 bg-slate-300 border-none" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const PersonnelIntelligence: React.FC<PersonnelIntelligenceProps> = ({ personId }) => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].policePersonnel.intelligence;
  const isSelected = personId === 'baurzhan';

  // Almaty Base Stations (Mock 20 points)
  const baseStations = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      pos: [43.22 + Math.random() * 0.05, 76.85 + Math.random() * 0.1] as [number, number]
    }));
  }, []);

  const linePath = useMemo(() => baseStations.map(bs => bs.pos), [baseStations]);

  // React Flow Data (Expanded 2x)
  const initialNodes: Node[] = [
    { 
      id: 'center', 
      type: 'custom', 
      position: { x: 400, y: 200 }, 
      data: { 
        label: language === 'zh' ? '人员实体' : 'Person Entity', 
        value: language === 'zh' ? '包尔江. K' : 'Baurzhan. K', 
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' 
      } 
    },
    // Family & Associates
    { id: 'exwife', type: 'custom', position: { x: 650, y: 100 }, data: { label: language === 'zh' ? '关联人 (前妻)' : 'Associate (Ex-wife)', value: language === 'zh' ? '艾古尔 (疑似财务代理)' : 'Aigul (Suspected Financial Proxy)', isWarning: true, icon: User } },
    { id: 'informant', type: 'custom', position: { x: 650, y: 300 }, data: { label: language === 'zh' ? '线人' : 'Informant', value: language === 'zh' ? '赛里克 B.' : 'Serik B.', icon: Phone } },
    { id: 'brother', type: 'custom', position: { x: 150, y: 100 }, data: { label: language === 'zh' ? '亲属' : 'Relative', value: language === 'zh' ? '叶尔兰 K.' : 'Yerlan K.', icon: User } },
    
    // Assets
    { id: 'home', type: 'custom', position: { x: 150, y: 300 }, data: { label: language === 'zh' ? '房产' : 'Property', value: language === 'zh' ? '市中心隐秘公寓' : 'Hidden Downtown Apartment', icon: Home } },
    { id: 'car', type: 'custom', position: { x: 400, y: 50 }, data: { label: language === 'zh' ? '车辆' : 'Vehicle', value: 'Toyota Land Cruiser', icon: Car } },
    { id: 'car2', type: 'custom', position: { x: 400, y: 350 }, data: { label: language === 'zh' ? '车辆' : 'Vehicle', value: 'Zeekr (KZ-777)', icon: Car } },
    { id: 'safehouse', type: 'custom', position: { x: -100, y: 300 }, data: { label: language === 'zh' ? '安全屋' : 'Safe House', value: 'Medeu-09', icon: Lock } },
    
    // Financial
    { id: 'bank', type: 'custom', position: { x: 650, y: 200 }, data: { label: language === 'zh' ? '银行账户' : 'Bank Account', value: 'Halyk Bank', icon: CreditCard } },
    { id: 'offshore', type: 'custom', position: { x: 900, y: 200 }, data: { label: language === 'zh' ? '离岸账户' : 'Offshore Account', value: 'Cyprus Bank', isWarning: true, icon: Globe } },
    { id: 'crypto', type: 'custom', position: { x: 900, y: 100 }, data: { label: language === 'zh' ? '加密钱包' : 'Crypto Wallet', value: 'BTC-Cold-01', isWarning: true, icon: DollarSign } },
    { id: 'shell', type: 'custom', position: { x: 900, y: 300 }, data: { label: language === 'zh' ? '壳公司' : 'Shell Company', value: 'Almaty Logistics Ltd', isWarning: true, icon: Briefcase } },
    
    // Digital
    { id: 'device', type: 'custom', position: { x: 150, y: 200 }, data: { label: language === 'zh' ? '设备' : 'Device', value: 'iPhone 15 (Encrypted)', icon: Smartphone } },
    { id: 'device2', type: 'custom', position: { x: -100, y: 200 }, data: { label: language === 'zh' ? '黑卡手机' : 'Burner Phone', value: 'Nokia 105', isWarning: true, icon: Smartphone } },
    { id: 'vpn', type: 'custom', position: { x: -100, y: 100 }, data: { label: 'VPN Node', value: 'Nord-Node-7', icon: Network } },
    { id: 'ip', type: 'custom', position: { x: 150, y: 0 }, data: { label: 'IP Address', value: '10.16.2.204', icon: Hash } },
    { id: 'terminal', type: 'custom', position: { x: -100, y: 0 }, data: { label: language === 'zh' ? '终端' : 'Terminal', value: 'Workstation-01', icon: Terminal } },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1', source: 'center', target: 'home', label: language === 'zh' ? '所有者' : 'OWNER', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e2', source: 'center', target: 'car', label: language === 'zh' ? '所有者' : 'OWNER', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e3', source: 'center', target: 'exwife', label: language === 'zh' ? '前妻' : 'EX-WIFE', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e4', source: 'center', target: 'bank', label: language === 'zh' ? '持有者' : 'HOLDER', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e5', source: 'bank', target: 'offshore', label: language === 'zh' ? '转账' : 'TRANSFER', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
    { id: 'e6', source: 'center', target: 'device', label: language === 'zh' ? '使用者' : 'USER', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e7', source: 'device', target: 'vpn', label: language === 'zh' ? '隧道' : 'TUNNEL', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e8', source: 'center', target: 'informant', label: language === 'zh' ? '联系人' : 'CONTACT', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e9', source: 'center', target: 'brother', label: language === 'zh' ? '兄弟' : 'BROTHER', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e10', source: 'center', target: 'car2', label: language === 'zh' ? '使用者' : 'USER', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
    { id: 'e11', source: 'home', target: 'safehouse', label: language === 'zh' ? '关联' : 'LINKED', style: { stroke: '#cbd5e1', strokeDasharray: '5 5' } },
    { id: 'e12', source: 'bank', target: 'crypto', label: language === 'zh' ? '购买' : 'PURCHASE', animated: true, style: { stroke: '#ef4444' } },
    { id: 'e13', source: 'offshore', target: 'shell', label: language === 'zh' ? '受益人' : 'BENEFICIARY', style: { stroke: '#ef4444' } },
    { id: 'e14', source: 'center', target: 'device2', label: language === 'zh' ? '幽灵设备' : 'GHOST', animated: true, style: { stroke: '#ef4444' } },
    { id: 'e15', source: 'device2', target: 'vpn', label: language === 'zh' ? '隧道' : 'TUNNEL', animated: true, style: { stroke: '#ef4444' } },
    { id: 'e16', source: 'center', target: 'ip', label: language === 'zh' ? '登录' : 'LOGGED', style: { stroke: '#cbd5e1' } },
    { id: 'e17', source: 'ip', target: 'terminal', label: language === 'zh' ? '访问' : 'ACCESS', style: { stroke: '#cbd5e1' } },
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Top - GIS Map */}
      <div className="h-[55%] border-b border-slate-100 relative bg-slate-50 overflow-hidden">
        <MapContainer 
          center={[43.2389, 76.8897]} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* Base Stations */}
          {baseStations.map(bs => (
            <CircleMarker 
              key={bs.id} 
              center={bs.pos} 
              radius={2} 
              pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.5 }} 
            />
          ))}

          {/* Animated Signal Lines */}
          <Polyline 
            positions={linePath} 
            pathOptions={{ 
              color: '#3b82f6', 
              weight: 1, 
              opacity: 0.4,
              dashArray: '10, 10',
              className: 'animate-signal'
            }} 
          />

          <style>{`
            .animate-signal {
              stroke-dasharray: 10;
              animation: signal-flow 30s linear infinite;
            }
            @keyframes signal-flow {
              from { stroke-dashoffset: 1000; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>

          {isSelected && (
            <Marker position={[43.2389, 76.8897]}>
              <Popup>
                <div className="text-[9px] font-mono">
                  <div className="font-bold text-status-red">{t.signalLost}</div>
                  <div className="text-slate-400">02:15:04</div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white/80 border border-slate-100 p-2 rounded text-[8px] font-mono space-y-1 backdrop-blur-sm z-[1000]">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t.activeBaseStation}</div>
          <div className="flex items-center gap-2"><div className="w-4 h-0.5 border-t border-dashed border-blue-400" /> {t.signalTraffic}</div>
        </div>

        {/* Anomaly Evaluation */}
        {isSelected && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/80 border border-slate-100 px-3 py-1.5 rounded shadow-sm backdrop-blur-md z-[1000]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-status-red" />
              <span className="text-[9px] text-slate-500 tracking-tight">
                {t.spoofingWarning}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom - Ontology Graph */}
      <div className="h-[45%] relative bg-slate-50/30 overflow-hidden">
        <div className="absolute top-3 left-4 z-10">
          <h3 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">{t.ontologyExpanded}</h3>
        </div>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          className="bg-transparent"
        >
          <Background color="#e2e8f0" gap={20} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

