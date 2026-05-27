import React from 'react';
import { 
  Users, 
  Car, 
  AlertTriangle, 
  MapPin, 
  BarChart3,
  PieChart,
  Activity,
  Database
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const DATA_INDICATORS = [
  { label: 'Personnel', count: 1242, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
  { label: 'Vehicles', count: 856, icon: Car, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5%' },
  { label: 'Events', count: 42, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', trend: '-2%' },
  { label: 'Locations', count: 156, icon: MapPin, color: 'text-green-600', bg: 'bg-green-50', trend: '0%' },
];

export const RightPanel: React.FC = () => {
  return (
    <aside className="w-80 border-l border-black bg-white flex flex-col z-40">
      <div className="p-4 border-b border-black bg-slate-50">
        <div className="flex items-center gap-2 text-black mb-1">
          <Database className="w-4 h-4" />
          <h2 className="text-[10px] font-mono uppercase tracking-widest font-bold">Graph Data Status</h2>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase font-mono">Real-time Ontology Metrics</p>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin p-4 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-4">
          {DATA_INDICATORS.map((item) => (
            <div key={item.label} className="p-4 bg-white border border-slate-200 rounded hover:border-black transition-all group shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded border border-black/5", item.bg, item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border",
                  item.trend.startsWith('+') ? "text-status-green border-status-green/30 bg-status-green/5" : 
                  item.trend.startsWith('-') ? "text-status-red border-status-red/30 bg-status-red/5" : 
                  "text-slate-400 border-slate-200 bg-slate-50"
                )}>
                  {item.trend}
                </div>
              </div>
              <div className="text-2xl font-bold text-black mb-1">{item.count.toLocaleString()}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Distribution Chart Placeholder */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold">Distribution Analysis</h4>
            <PieChart className="w-3 h-3 text-slate-400" />
          </div>
          <div className="h-40 bg-slate-50 border border-slate-200 rounded flex items-center justify-center relative overflow-hidden">
            {/* Simple CSS-based donut chart representation */}
            <div className="w-24 h-24 rounded-full border-[12px] border-black border-t-slate-200 border-r-slate-300 border-b-slate-400 animate-spin-slow" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-black">2,296</span>
              <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">Total Objects</span>
            </div>
          </div>
        </section>

        {/* System Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold">Data Ingestion</h4>
            <Activity className="w-3 h-3 text-slate-400" />
          </div>
          <div className="space-y-2">
            {[
              { label: 'Ontology Sync', val: '98%', status: 'SUCCESS' },
              { label: 'Graph Compute', val: '1.2ms', status: 'SUCCESS' },
              { label: 'Memory Usage', val: '4.2GB', status: 'WARNING' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-black">{stat.val}</span>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    stat.status === 'SUCCESS' ? "bg-status-green" : "bg-status-yellow"
                  )} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <button className="w-full py-2 bg-black text-white text-xs font-bold rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </aside>
  );
};
