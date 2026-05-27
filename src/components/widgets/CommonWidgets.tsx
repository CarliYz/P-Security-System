import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Maximize2, MoreVertical } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { WIDGET_TRANSLATIONS } from '@/src/i18n/ui';

interface WidgetProps {
// ... (rest of imports and interface)
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Widget: React.FC<WidgetProps> = ({ title, children, className }) => {
  return (
    <div className={`widget-container border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] bg-white flex flex-col ${className}`}>
      <div className="widget-header bg-black text-white border-b border-black rounded-none px-4 py-2 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">{title}</span>
        <div className="flex items-center gap-3">
          <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-300 transition-colors" />
          <MoreVertical className="w-3.5 h-3.5 cursor-pointer hover:text-slate-300 transition-colors" />
        </div>
      </div>
      <div className="flex-1 p-4 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// Mock Data
const RISK_DATA = [
  { time: '08:00', value: 30 },
  { time: '10:00', value: 45 },
  { time: '12:00', value: 75 },
  { time: '14:00', value: 60 },
  { time: '16:00', value: 85 },
  { time: '18:00', value: 95 },
  { time: '20:00', value: 70 },
];

export const RiskTrendWidget: React.FC = () => {
  const { language } = useLanguage();
  const t = WIDGET_TRANSLATIONS.commonWidgets[language];
  
  return (
    <Widget title={t.riskTrend}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={RISK_DATA}>
          <defs>
            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #000000', fontSize: '10px' }}
            itemStyle={{ color: '#000000' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#000000" 
            fillOpacity={1} 
            fill="url(#colorRisk)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export const ResourceStatusWidget: React.FC = () => {
  const { language } = useLanguage();
  const t = WIDGET_TRANSLATIONS.commonWidgets[language];

  return (
    <Widget title={t.resourceDeployment}>
      <div className="space-y-4 p-1">
        {[
          { label: t.patrolPolice, total: 120, active: 85, color: 'bg-black' },
          { label: t.swatUnits, total: 40, active: 12, color: 'bg-slate-400' },
          { label: t.trafficPolice, total: 200, active: 180, color: 'bg-black' },
          { label: t.uavUnits, total: 15, active: 15, color: 'bg-status-red' },
        ].map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between text-[10px] font-black font-mono uppercase tracking-widest">
              <span className="text-slate-400">{item.label}</span>
              <span className="text-black">{item.active} / {item.total}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-none overflow-hidden border border-black/10">
              <div 
                className={`h-full ${item.color} transition-all duration-500`} 
                style={{ width: `${(item.active / item.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
};
