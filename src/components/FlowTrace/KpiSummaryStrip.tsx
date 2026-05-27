import React from 'react';
import { FlowKpiItem } from './types';
import { cn } from '@/src/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiSummaryStripProps {
  kpis: FlowKpiItem[];
}

export const KpiSummaryStrip: React.FC<KpiSummaryStripProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-6 border-b border-slate-200 divide-x divide-slate-200 bg-slate-50 h-8">
      {kpis.map((kpi) => (
        <div key={kpi.key} className="px-3 flex items-center justify-between hover:bg-white transition-colors group">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em] font-mono group-hover:text-black transition-colors whitespace-nowrap">
              {kpi.label}
            </span>
            <div className={cn(
              "text-[11px] font-black font-mono tracking-tighter",
              kpi.tone === 'danger' && "text-status-red",
              kpi.tone === 'warning' && "text-status-yellow",
              kpi.tone === 'success' && "text-status-green",
              kpi.tone === 'default' && "text-black"
            )}>
              {kpi.value}
            </div>
          </div>
          
          {kpi.trend && (
            <div className={cn(
              "p-0.5",
              kpi.trend === 'up' && "text-status-red",
              kpi.trend === 'down' && "text-status-green",
              kpi.trend === 'flat' && "text-slate-300"
            )}>
              {kpi.trend === 'up' && <TrendingUp className="w-2.5 h-2.5" />}
              {kpi.trend === 'down' && <TrendingDown className="w-2.5 h-2.5" />}
              {kpi.trend === 'flat' && <Minus className="w-2.5 h-2.5" />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
