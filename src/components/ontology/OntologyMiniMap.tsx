import React from 'react';
import { Map as MapIcon } from 'lucide-react';

export const OntologyMiniMap: React.FC = () => {
  return (
    <div className="absolute bottom-6 right-6 z-20 w-48 h-32 bg-white border border-black shadow-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-1.5 bg-slate-100 border-b border-black flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <MapIcon className="w-3 h-3 text-slate-500" />
          <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Static Overview</span>
        </div>
        <div className="text-[8px] font-bold text-slate-400 font-mono">300 NODES</div>
      </div>
      
      {/* Static Mini Map Content */}
      <div className="w-full h-full p-4 pt-8 relative bg-slate-50/50">
        {/* Cluster Regions - Static representation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-slate-200 rounded-full bg-slate-100/50" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-8 border border-slate-200 rounded-sm bg-slate-100/50" />
        <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-16 border border-slate-200 rounded-sm bg-slate-100/50" />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-16 border border-slate-200 rounded-sm bg-slate-100/50" />
        <div className="absolute bottom-4 left-1/4 w-12 h-10 border border-slate-200 rounded-sm bg-slate-100/50" />
        <div className="absolute bottom-4 right-1/4 w-12 h-10 border border-slate-200 rounded-sm bg-slate-100/50" />
        
        {/* Static Dots representing nodes */}
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-0.5 h-0.5 bg-slate-400 rounded-full"
            style={{ 
              top: `${(Math.sin(i * 13) * 40 + 50)}%`, 
              left: `${(Math.cos(i * 17) * 40 + 50)}%` 
            }}
          />
        ))}
      </div>
    </div>
  );
};
