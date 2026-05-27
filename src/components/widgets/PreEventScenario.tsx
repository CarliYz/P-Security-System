import React, { useState } from 'react';
import { 
  Shield, 
  Car, 
  User, 
  AlertTriangle, 
  MapPin, 
  ChevronRight, 
  X,
  Smartphone,
  Navigation,
  TrendingUp
} from 'lucide-react';
import { Widget } from './CommonWidgets';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Asset {
  id: string;
  name: string;
  type: 'VEHICLE' | 'EQUIPMENT' | 'PERSON';
  status: 'NORMAL' | 'MINOR' | 'CRITICAL';
  applicant?: string;
  details?: string;
}

const ASSETS: Asset[] = [
  { id: 'POL-001', name: 'White Toyota (A88888)', type: 'VEHICLE', status: 'CRITICAL', applicant: 'Dep. Chief - A', details: 'Suspected Clone/Private Use' },
  { id: 'POL-042', name: 'Body Cam - B2', type: 'EQUIPMENT', status: 'MINOR', applicant: 'Patrol - Zhang', details: 'Overdue' },
  { id: 'POL-109', name: 'Patrol Car - C5', type: 'VEHICLE', status: 'NORMAL', applicant: 'Traffic - Li' },
  { id: 'POL-201', name: 'Mobile Terminal - M1', type: 'EQUIPMENT', status: 'NORMAL', applicant: 'Inspector - Wang' },
];

const HIGH_RISK_LIST = [
  { id: 'V-ZEEKR-01', name: 'Black Zeekr (No Plate)', score: 92, reason: 'Late Night Speeding/Complaints' },
  { id: 'P-9921', name: 'Key Person - Zhang', score: 85, reason: 'Abnormal Gathering Warning' },
  { id: 'V-MERC-02', name: 'Silver Mercedes (B12345)', score: 78, reason: 'Abnormal Trajectory Overlap' },
  { id: 'P-8812', name: 'Related Person - Li', score: 65, reason: 'Frequent Sensitive Area Access' },
];

import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

export const PreEventScenario: React.FC = () => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language as keyof typeof PRE_EVENT_I18N] || PRE_EVENT_I18N.en;
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [threshold, setThreshold] = useState(80);

  const assetsWithTranslations = ASSETS.map((asset, i) => ({
    ...asset,
    name: t.assetMonitoring.assets[i]?.name || asset.name,
    applicant: t.assetMonitoring.assets[i]?.applicant || asset.applicant,
    details: t.assetMonitoring.assets[i]?.details || asset.details,
  }));

  const highRiskWithTranslations = HIGH_RISK_LIST.map((item, i) => ({
    ...item,
    name: t.highRiskMonitoring.list[i]?.name || item.name,
    reason: t.highRiskMonitoring.list[i]?.reason || item.reason,
  }));

  return (
    <div className="grid grid-cols-12 gap-4 h-full p-4 overflow-hidden bg-white">
      {/* Card 1: Police Asset Monitoring */}
      <div className="col-span-6 flex flex-col gap-4 h-full">
        <Widget title={t.assetMonitoring.title}>
          <div className="space-y-2 overflow-y-auto h-full scroll-thin pr-2">
            {assetsWithTranslations.map((asset) => (
              <div 
                key={asset.id}
                onClick={() => asset.status === 'CRITICAL' && setSelectedAsset(asset)}
                className={cn(
                  "p-3 rounded-none bg-white border border-slate-200 flex items-center justify-between transition-all cursor-pointer group",
                  asset.status === 'CRITICAL' ? "hover:border-black border-status-red/50" : "hover:border-black"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-none border border-black/10",
                    asset.type === 'VEHICLE' ? "bg-slate-50 text-black" : "bg-slate-50 text-black"
                  )}>
                    {asset.type === 'VEHICLE' ? <Car className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black font-mono uppercase">{asset.name}</div>
                    <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-tighter">{asset.id} | {asset.applicant}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-none font-bold border font-mono uppercase",
                    asset.status === 'NORMAL' && "text-status-green border-status-green/30 bg-status-green/5",
                    asset.status === 'MINOR' && "text-status-yellow border-status-yellow/30 bg-status-yellow/5",
                    asset.status === 'CRITICAL' && "text-status-red border-status-red/30 bg-status-red/5 animate-pulse"
                  )}>
                    {asset.status === 'NORMAL' ? t.assetMonitoring.normal : asset.status === 'MINOR' ? t.assetMonitoring.overdue : t.assetMonitoring.abuse}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-black" />
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>

      {/* Card 2: Social High-Risk Monitoring */}
      <div className="col-span-6 flex flex-col gap-4 h-full">
        <Widget title={t.highRiskMonitoring.title}>
          <div className="flex flex-col h-full">
            <div className="mb-4 p-3 bg-slate-50 border border-black rounded-none">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-wider font-bold">
                <span>{t.highRiskMonitoring.threshold}</span>
                <span className="text-black">{threshold}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-none overflow-hidden relative border border-black/5">
                <div 
                  className="h-full bg-black transition-all duration-500"
                  style={{ width: `${threshold}%` }}
                />
                <div className="absolute top-0 left-[80%] w-[1px] h-full bg-white/50" />
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto scroll-thin pr-2">
              {highRiskWithTranslations.sort((a, b) => b.score - a.score).map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  className={cn(
                    "p-3 rounded-none bg-white border border-slate-200 flex items-center justify-between transition-all",
                    item.score >= 80 && "border-black bg-slate-50 shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-none flex items-center justify-center font-bold text-xs border border-black font-mono",
                      item.score >= 80 ? "bg-black text-white" : "bg-white text-slate-400"
                    )}>
                      {item.score}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black font-mono uppercase">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-tighter">{item.reason}</div>
                    </div>
                  </div>
                  {item.score >= 80 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-none bg-status-red text-white font-bold animate-pulse font-mono uppercase">
                      {t.highRiskMonitoring.highRisk}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Widget>
      </div>

      {/* Detail Drawer for Asset Abuse */}
      <AnimatePresence>
        {selectedAsset && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAsset(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[450px] h-full bg-white border-l border-black z-[70] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-black" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-black font-mono">{t.assetMonitoring.analysisDetail}</h3>
                </div>
                <button onClick={() => setSelectedAsset(null)} className="p-1 hover:bg-slate-100 rounded-none border border-transparent hover:border-black">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6 flex-1 overflow-y-auto scroll-thin pr-2">
                <section className="space-y-4">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest">{t.assetMonitoring.dataComparison}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 border border-black rounded-none">
                      <div className="text-[9px] font-mono text-slate-400 mb-2 font-bold uppercase">{t.assetMonitoring.registryInfo}</div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-black font-mono uppercase">{t.assetMonitoring.registryToyota}</div>
                        <div className="text-[10px] text-slate-500 font-bold font-mono uppercase">{t.assetMonitoring.registryDistrict}</div>
                        <div className="text-[10px] text-slate-500 font-bold font-mono uppercase">{t.assetMonitoring.registryStatus}</div>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 border border-status-red rounded-none">
                      <div className="text-[9px] font-mono text-status-red mb-2 font-bold uppercase">{t.assetMonitoring.captured}</div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-status-red font-mono uppercase">{t.assetMonitoring.capturedZeekr}</div>
                        <div className="text-[10px] text-status-red/70 font-bold font-mono uppercase">{t.assetMonitoring.capturedLocation}</div>
                        <div className="text-[10px] text-status-red/70 font-bold font-mono uppercase">{t.assetMonitoring.capturedTime}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-black rounded-none text-center">
                    <span className="text-xs font-bold text-black font-mono uppercase tracking-tight">{t.assetMonitoring.result}: {t.assetMonitoring.suspectedClone}</span>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest">{t.assetMonitoring.signalOverlap}</h4>
                  <div className="p-4 bg-slate-50 border border-black rounded-none flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                          <circle cx="32" cy="32" r="28" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="175.9" strokeDashoffset={175.9 * (1 - 0.12)} />
                        </svg>
                        <span className="absolute text-xs font-bold text-black font-mono">12%</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-black font-mono uppercase">{t.assetMonitoring.overlapScore}</div>
                        <div className="text-[10px] text-slate-400 font-bold font-mono uppercase">{t.assetMonitoring.officerGps}</div>
                      </div>
                    </div>
                    <AlertTriangle className="w-6 h-6 text-status-red animate-bounce" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold font-mono uppercase">
                      <Smartphone className="w-3 h-3" />
                      <span>{t.assetMonitoring.deviceGps}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold font-mono uppercase">
                      <Navigation className="w-3 h-3" />
                      <span>{t.assetMonitoring.vehicleGps}</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="pt-6 border-t border-black flex gap-3">
                <button className="flex-1 py-3 bg-black text-white text-[10px] font-bold rounded-none hover:bg-slate-800 transition-colors uppercase tracking-widest font-mono">
                  {t.assetMonitoring.issueOrder}
                </button>
                <button className="flex-1 py-3 border border-black text-black text-[10px] font-bold rounded-none hover:bg-slate-50 uppercase tracking-widest font-mono">
                  {t.assetMonitoring.markFalsePositive}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
