import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Car, 
  Clock, 
  FileText, 
  Info, 
  Search, 
  Settings, 
  ShieldAlert, 
  Wrench 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

interface VehicleLedgerProps {
  onSelectVehicle: (id: string) => void;
  selectedVehicleId: string | null;
}

export const VehicleLedger: React.FC<VehicleLedgerProps> = ({ onSelectVehicle, selectedVehicleId }) => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].officialVehicles;
  const [activeTab, setActiveTab] = useState('MAINTENANCE');
  const [showAnomalyWarning, setShowAnomalyWarning] = useState(false);

  const stats = [
    { id: 'MISSION', label: t.mockData.stats.mission, count: 450, color: 'bg-blue-500' },
    { id: 'IDLE', label: t.mockData.stats.idle, count: 680, color: 'bg-slate-400' },
    { id: 'MAINTENANCE', label: t.mockData.stats.maintenance, count: 85, color: 'bg-status-red' },
    { id: 'SCRAPPED', label: t.mockData.stats.scrapped, count: 25, color: 'bg-black' },
  ];

  const maintenanceList = [
    { id: 'KZ-777-POL', brand: 'Zeekr 001', buyDate: '2023.05', years: '0.8', duration: 130, isAnomaly: true },
    { id: 'KZ-102-POL', brand: 'Toyota Camry', buyDate: '2021.02', years: '3.1', duration: 12, isAnomaly: true },
    { id: 'KZ-445-POL', brand: 'VW Passat', buyDate: '2020.11', years: '3.4', duration: 45, isAnomaly: true },
    { id: 'KZ-889-POL', brand: 'Zeekr 001', buyDate: '2023.08', years: '0.5', duration: 5 },
    { id: 'KZ-231-POL', brand: 'Ford Explorer', buyDate: '2019.06', years: '4.8', duration: 18 },
    { id: 'KZ-556-POL', brand: 'Toyota LC300', buyDate: '2022.01', years: '2.2', duration: 30 },
    { id: 'KZ-012-POL', brand: 'Toyota Camry', buyDate: '2018.03', years: '6.1', duration: 15 },
    { id: 'KZ-045-POL', brand: 'VW Passat', buyDate: '2017.11', years: '6.4', duration: 22 },
    { id: 'KZ-089-POL', brand: 'Zeekr 001', buyDate: '2018.08', years: '5.5', duration: 8 },
    { id: 'KZ-031-POL', brand: 'Ford Explorer', buyDate: '2016.06', years: '7.8', duration: 45 },
    { id: 'KZ-056-POL', brand: 'Toyota LC300', buyDate: '2017.01', years: '7.2', duration: 12 },
  ];

  const missionList = [
    { id: 'KZ-111-POL', brand: 'Toyota Camry', buyDate: '2022.03', years: '2.0', duration: '-' },
    { id: 'KZ-222-POL', brand: 'VW Passat', buyDate: '2021.05', years: '2.8', duration: '-' },
  ];

  const currentList = activeTab === 'MAINTENANCE' ? maintenanceList : missionList;

  return (
    <div className="h-full flex flex-col bg-white border-r border-black overflow-hidden font-mono">
      {/* Top - Status Overview */}
      <div className="p-4 border-b border-black bg-slate-50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.subtitle}</h3>
            <div className="text-3xl font-black tracking-tighter text-black">1,240 <span className="text-[12px] font-bold text-slate-400">{t.kpis.unarchivedCases}</span></div>
          </div>
          <div className="p-2.5 bg-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
            <Car className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {stats.map(stat => (
            <button 
              key={stat.id} 
              onClick={() => setActiveTab(stat.id)}
              className={cn(
                "p-3 border transition-all rounded-none text-left",
                activeTab === stat.id 
                  ? "bg-black border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" 
                  : "bg-white border-slate-200 text-black hover:border-black"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-none",
                  activeTab === stat.id ? "bg-white" : stat.color
                )} />
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-tight",
                  activeTab === stat.id ? "text-slate-300" : "text-slate-500"
                )}>{stat.label}</span>
              </div>
              <div className="text-sm font-black">{stat.count}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Middle - Interactive List */}
      <div className="flex-1 flex flex-col min-h-0 relative bg-white">
        <div className="px-4 py-2.5 border-b border-black flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Wrench className="w-3 h-3 text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              {activeTab === 'MAINTENANCE' ? t.mockData.ledger.title : t.mockData.ledger.activeTitle}
            </span>
          </div>
          <div className="text-[9px] font-bold text-white/50">LIVE_SYNC</div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-thin">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr className="border-b border-black">
                <th className="px-4 py-2 text-[9px] font-black text-black uppercase w-[25%] tracking-wider">Plate</th>
                <th className="px-2 py-2 text-[9px] font-black text-black uppercase w-[25%] tracking-wider">Brand</th>
                <th className="px-2 py-2 text-[9px] font-black text-black uppercase w-[20%] tracking-wider">BuyDate</th>
                <th className="px-2 py-2 text-[9px] font-black text-black uppercase w-[15%] tracking-wider">Years</th>
                <th className="px-2 py-2 text-[9px] font-black text-black uppercase text-right w-[15%] tracking-wider">Dur.</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map(vehicle => (
                <tr 
                  key={vehicle.id}
                  onClick={() => {
                    onSelectVehicle(vehicle.id);
                  }}
                  className={cn(
                    "group cursor-pointer transition-colors border-b border-slate-100",
                    selectedVehicleId === vehicle.id ? "bg-slate-100" : "hover:bg-slate-50",
                    (vehicle as any).isAnomaly && "bg-red-50/30 hover:bg-red-50/50"
                  )}
                >
                  <td className="px-4 py-3">
                    <div className={cn(
                      "text-[10px] font-black",
                      (vehicle as any).isAnomaly ? "text-status-red" : (selectedVehicleId === vehicle.id ? "text-black" : "text-slate-600")
                    )}>{vehicle.id}</div>
                  </td>
                  <td className="px-2 py-3">
                    <div className={cn(
                      "text-[10px] font-bold truncate uppercase",
                      (vehicle as any).isAnomaly ? "text-status-red/70" : "text-slate-500"
                    )}>{vehicle.brand}</div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="text-[10px] text-slate-400 font-bold">{vehicle.buyDate}</div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="text-[10px] text-slate-400 font-bold">{vehicle.years}Y</div>
                  </td>
                  <td className="px-2 py-3 text-right">
                    <div className={cn(
                      "text-[10px] font-black",
                      (vehicle as any).isAnomaly || vehicle.id === 'KZ-777-POL' ? "text-status-red" : "text-slate-400"
                    )}>
                      {vehicle.duration}{vehicle.duration !== '-' ? 'D' : ''}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Floating Warning - Integrated */}
        {activeTab === 'MAINTENANCE' && (
          <div className="absolute bottom-6 left-4 right-4 bg-white border-2 border-black p-4 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] backdrop-blur-sm z-20">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-status-red shrink-0" />
              <div className="space-y-2">
                <div className="text-[10px] font-black text-status-red uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-status-red animate-pulse" />
                  {t.mockData.ledger.anomalyDetected}
                </div>
                <p className="text-[11px] leading-relaxed text-black font-bold">
                  {t.mockData.ledger.anomalyDesc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
