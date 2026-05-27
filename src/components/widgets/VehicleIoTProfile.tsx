import React from 'react';
import ReactECharts from 'echarts-for-react';
import { 
  Activity, 
  Battery, 
  Camera, 
  Cpu, 
  Database, 
  MapPin, 
  Play, 
  ShieldAlert, 
  Video, 
  Wifi 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface VehicleIoTProfileProps {
  vehicleId: string | null;
}

export const VehicleIoTProfile: React.FC<VehicleIoTProfileProps> = ({ vehicleId }) => {
  const isHighRisk = vehicleId === 'KZ-777-POL';
  const isNormal = vehicleId === 'KZ-102-POL';

  if (!vehicleId || (!isHighRisk && !isNormal)) {
    return (
      <div className="h-full flex items-center justify-center bg-white border-r border-slate-100 text-slate-300">
        <div className="flex flex-col items-center gap-4">
          <Database className="w-12 h-12" />
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest">Select a vehicle to load IoT profile</p>
        </div>
      </div>
    );
  }

  const profileData = isHighRisk ? {
    id: 'KZ-777-POL',
    owner: 'A. Ivanov Deputy Director',
    model: 'Zeekr 001 Dual Motor',
    unit: 'Almaty 102nd Precinct',
    statusColor: 'bg-status-red',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400',
    speed: 165,
    battery: 82,
    batteryColor: 'bg-status-red',
    batteryText: 'Rapid battery drain in short time, suggests aggressive driving',
    gpsWarning: true,
    obdWarning: true,
    inference: [
      'Excessive maintenance time: 130 days on paper, but vehicle remains active on network.',
      'Physical collision matching: 95% similarity to the racing shadow captured by Al-Farabi Avenue video checkpoint.',
      'Abnormal hardware wear: Tire and battery degradation far exceed normal duty loss.'
    ]
  } : {
    id: 'KZ-102-POL',
    owner: 'S. Petrov Sergeant',
    model: 'Toyota Camry 2021',
    unit: 'Almaty 102nd Precinct',
    statusColor: 'bg-status-green',
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400',
    speed: 45,
    battery: 98,
    batteryColor: 'bg-status-green',
    batteryText: 'Battery health good, consistent with daily duty wear',
    gpsWarning: false,
    obdWarning: false,
    inference: [
      'Vehicle trajectory matches daily patrol logic.',
      'Maintenance records authentic, performance metrics within standard range.',
      'No unauthorized late-night duty records.'
    ]
  };

  const gaugeOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 200,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 4,
            color: [[0.3, '#e2e8f0'], [0.7, '#e2e8f0'], [1, isHighRisk ? '#ef4444' : '#22c55e']]
          }
        },
        pointer: {
          length: '60%',
          width: 2,
          itemStyle: { color: isHighRisk ? '#ef4444' : '#22c55e' }
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: { show: false },
        data: [{ value: profileData.speed }]
      }
    ]
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-100 overflow-hidden relative">
      {/* Top - Entity Profile */}
      <div className="p-4 border-b border-slate-50">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <img 
              src={profileData.img} 
              alt="Police Vehicle"
              className="w-24 h-16 object-cover rounded border border-slate-100"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold tracking-tight">{profileData.id}</h3>
              <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", profileData.statusColor)} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-slate-400 uppercase w-12">Owner</span>
                <span className="text-[9px] text-slate-600">{profileData.owner}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-slate-400 uppercase w-12">Model</span>
                <span className="text-[9px] text-slate-600">{profileData.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-slate-400 uppercase w-12">Unit</span>
                <span className="text-[9px] text-slate-600">{profileData.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle - IoT Grid */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto scroll-thin pb-4">
        {/* Basic Info Section */}
        <div className="grid grid-cols-2 gap-3 pb-2 border-b border-black/5">
          <div className="space-y-1">
            <span className="text-[8px] text-slate-400 uppercase font-black">Fuel Level</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-slate-100">
                <div className="h-full bg-black w-[45%]" />
              </div>
              <span className="text-[10px] font-black">45%</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] text-slate-400 uppercase font-black">Engine Temp</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black">98°C</span>
              <div className="h-1.5 flex-1 bg-slate-100">
                <div className="h-full bg-status-yellow w-[70%]" />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] text-slate-400 uppercase font-black">Tire Pressure</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black">2.4 bar</span>
              <div className="h-1.5 flex-1 bg-slate-100">
                <div className="h-full bg-status-green w-[95%]" />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] text-slate-400 uppercase font-black">Brake Wear</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black">12%</span>
              <div className="h-1.5 flex-1 bg-slate-100">
                <div className="h-full bg-status-green w-[12%]" />
              </div>
            </div>
          </div>
        </div>

        {/* GPS */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] text-slate-500 uppercase tracking-wider">GPS/BeiDou: Signal Status</span>
            </div>
            {profileData.gpsWarning && <span className="text-[8px] px-1 bg-status-red/10 text-status-red rounded">Spoofed Signal Warning</span>}
          </div>
          <div className="text-[9px] font-mono text-slate-400 pl-4.5">43.2389° N, 76.8897° E</div>
        </div>

        {/* OBD */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] text-slate-500 uppercase tracking-wider">OBD Data: Ignition Status (ON)</span>
            </div>
            {profileData.obdWarning && <span className="text-[8px] px-1 bg-status-red/10 text-status-red rounded">Frequent Night Starts</span>}
          </div>
          <div className="flex items-center gap-4 pl-4.5">
            <div className="w-16 h-10">
              <ReactECharts option={gaugeOption} style={{ height: '100%', width: '100%' }} />
            </div>
            <div className="text-[11px] font-mono text-slate-600">{profileData.speed} <span className="text-[8px] text-slate-400">km/h (CUR)</span></div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Battery className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] text-slate-500 uppercase tracking-wider">Performance: Battery Health</span>
            </div>
            {isHighRisk && <span className="text-[8px] px-1 bg-status-red/10 text-status-red rounded">Abnormal Degradation</span>}
          </div>
          <div className="pl-4.5 space-y-1">
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden w-32">
              <div className={cn("h-full", profileData.batteryColor)} style={{ width: `${profileData.battery}%` }} />
            </div>
            <p className="text-[8px] text-slate-400 italic">{profileData.batteryText}</p>
          </div>
        </div>

        {/* Video */}
        <div className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Video className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] text-slate-500 uppercase tracking-wider">On-board Real-time Video (HD Live Feed)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-status-red animate-pulse" />
              <span className="text-[8px] font-mono text-status-red font-bold uppercase">REC</span>
            </div>
          </div>
          <div className="relative aspect-video bg-black rounded-none overflow-hidden border-2 border-black group">
            <iframe 
              className="w-full h-full"
              src={isHighRisk ? "https://www.youtube.com/embed/oPf3sBExNLE?autoplay=1&mute=1&controls=0&loop=1&playlist=oPf3sBExNLE" : "https://www.youtube.com/embed/5W_v07J96Hc?autoplay=1&mute=1&controls=0&loop=1&playlist=5W_v07J96Hc"} 
              title="Police Vehicle HD Feed"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div className="absolute top-2 right-2 flex flex-col items-end gap-1 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-none text-[7px] font-mono text-white border border-white/10 uppercase tracking-widest">
                1080P // 60FPS
              </div>
              <div className="bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-none text-[7px] font-mono text-white border border-white/10">
                CAM_FRONT_01
              </div>
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-none text-[7px] font-mono text-white border border-white/10 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-status-green animate-pulse" />
                ENCRYPTED STREAM
              </div>
            </div>
          </div>
        </div>

        {/* Inference Conclusion */}
        <div className="bg-slate-50 border-2 border-black p-3 space-y-2">
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Inference Analysis</div>
          <div className="space-y-1.5">
            {profileData.inference.map((text, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[9px] mt-0.5">{isHighRisk ? '🚨' : '✅'}</span>
                <p className="text-[9px] text-slate-600 leading-tight font-bold">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
