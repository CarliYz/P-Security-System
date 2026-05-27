import React from 'react';
import { User, Users, MapPin, Activity, Calendar, AlertTriangle } from 'lucide-react';
import { Widget } from './CommonWidgets';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';
import { WIDGET_TRANSLATIONS } from '@/src/i18n/ui';

export const KeyPersonScenario: React.FC = () => {
  const { language } = useLanguage();
  const t = WIDGET_TRANSLATIONS.keyPerson[language];

  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full p-4 bg-white font-mono">
      {/* Profile Header */}
      <div className="col-span-12 row-span-1 bg-white border-2 border-black rounded-none flex items-center px-8 gap-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-none bg-black border-2 border-black flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <User className="w-10 h-10" />
          </div>
          <div>
            <div className="text-2xl font-black text-black tracking-tighter uppercase">{language === 'zh' ? '张某某' : 'Zhang XX'} <span className="text-xs font-black text-slate-400 ml-3 tracking-widest">P-9921-X</span></div>
            <div className="text-[10px] font-black text-status-red uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-status-red animate-pulse" />
              {t.monitoringLevel}
            </div>
          </div>
        </div>
        
        <div className="h-12 w-[2px] bg-black/10" />
        
        <div className="flex gap-12">
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.lastSeen}</div>
            <div className="text-sm text-black font-black uppercase tracking-tight">{language === 'zh' ? '天河城广场' : 'Teemall Plaza'} (14:22)</div>
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.behaviorScore}</div>
            <div className="text-sm text-status-yellow font-black uppercase tracking-tight">82 / 100 ({t.abnormal})</div>
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.associatedCase}</div>
            <div className="text-sm text-black underline cursor-pointer font-black uppercase tracking-tight hover:text-status-red transition-colors">C-2023-0882</div>
          </div>
        </div>
      </div>

      {/* Trajectory Map Placeholder */}
      <div className="col-span-8 row-span-5 widget-container bg-slate-50 relative border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
          <button className="bg-black text-white border border-black px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:bg-slate-800 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">{t.trajectory24h}</button>
          <button className="bg-white text-black border-2 border-black px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:bg-slate-50 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">{t.predictivePath}</button>
        </div>
        
        {/* Simulated Trajectory Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <path d="M 100 400 L 200 350 L 350 380 L 500 200 L 650 250" fill="none" stroke="#000000" strokeWidth="3" strokeDasharray="8,8" />
          <circle cx="650" cy="250" r="6" fill="#dc2626" className="animate-ping" />
          <circle cx="650" cy="250" r="4" fill="#dc2626" />
        </svg>
        
        <div className="absolute bottom-6 left-6 bg-white border-2 border-black p-5 rounded-none w-72 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] z-20">
          <div className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">{t.locationContext}</div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-50 border border-status-red/20">
              <MapPin className="w-5 h-5 text-status-red" />
            </div>
            <div>
              <div className="text-sm font-black text-black uppercase tracking-tight">{language === 'zh' ? '天河城广场 - 北门' : 'Teemall Plaza - North Gate'}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">{t.footTraffic}: {t.veryHigh} | {t.surveillance}: 100%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column Analysis */}
      <div className="col-span-4 row-span-3">
        <Widget title={t.behaviorAnalysis}>
          <div className="space-y-6 p-2">
            {[
              { label: t.trajectoryAnomaly, val: 78, status: 'warning' },
              { label: t.socialCircle, val: 45, status: 'normal' },
              { label: t.sensitiveArea, val: 92, status: 'critical' },
              { label: t.consumptionAnomaly, val: 12, status: 'normal' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">{item.label}</span>
                  <span className={cn(
                    item.status === 'critical' ? "text-status-red" : item.status === 'warning' ? "text-status-yellow" : "text-status-green"
                  )}>{item.val}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-none overflow-hidden border border-black/10">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      item.status === 'critical' ? "bg-status-red" : item.status === 'warning' ? "bg-status-yellow" : "bg-status-green"
                    )} 
                    style={{ width: `${item.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>

      <div className="col-span-4 row-span-2">
        <Widget title={t.timelineEvents}>
          <div className="space-y-4 overflow-y-auto h-full scroll-thin pr-2 p-2">
            {[
              { time: '14:22', event: `${t.entered} ${language === 'zh' ? '天河城广场' : 'Teemall Plaza'}`, icon: MapPin },
              { time: '13:05', event: t.shortContact, icon: Users },
              { time: '11:40', event: `${t.appearedAt} ${language === 'zh' ? '体育西路地铁站' : 'Tiyu Xilu Metro Station'}`, icon: Activity },
              { time: '09:15', event: `${t.leftResidence} (${language === 'zh' ? '天河区...' : 'Tianhe District...'})`, icon: Calendar },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 3 && <div className="absolute left-[9px] top-5 bottom-[-16px] w-[2px] bg-black/5" />}
                <div className="w-[20px] h-[20px] flex items-center justify-center bg-white border border-slate-200 z-10">
                  <item.icon className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.time}</div>
                  <div className="text-xs text-black font-black uppercase tracking-tight mt-0.5">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
};
