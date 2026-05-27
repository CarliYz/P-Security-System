import React from 'react';
import { OptimizationOption } from './types';
import { cn } from '@/src/lib/utils';
import { Zap, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useFlowTraceStore } from '@/src/store/flowTraceStore';

interface FlowOptimizationPanelProps {
  options: OptimizationOption[];
  currentTotalMs: number;
  optimizedTotalMs: number;
  estimatedSavingsMs: number;
  onToggleOption: (id: string) => void;
}

export const FlowOptimizationPanel: React.FC<FlowOptimizationPanelProps> = ({
  options,
  currentTotalMs,
  optimizedTotalMs,
  estimatedSavingsMs,
  onToggleOption,
}) => {
  const { toggleOptimization } = useFlowTraceStore();

  const formatDuration = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="h-[100px] border-t border-slate-200 bg-white flex items-stretch divide-x divide-slate-200 shrink-0 transition-all duration-300">
      {/* Simulation Controls */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-1.5 cursor-pointer group"
            onClick={toggleOptimization}
          >
            <Zap className="w-3.5 h-3.5 text-status-green group-hover:scale-110 transition-transform" />
            <h4 className="text-[9px] font-black uppercase tracking-widest text-black font-mono">Optimization Simulator</h4>
          </div>
          <button onClick={toggleOptimization} className="p-1 hover:bg-slate-100 rounded transition-colors">
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
        <div className="flex gap-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onToggleOption(option.id)}
              className={cn(
                "flex-1 p-2 border transition-all flex flex-col gap-0.5 text-left group",
                option.enabled
                  ? "bg-status-green/5 border-status-green shadow-sm"
                  : "bg-white border-slate-200 hover:border-black"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-tight font-mono",
                  option.enabled ? "text-status-green" : "text-black"
                )}>
                  {option.label}
                </span>
                {option.enabled && <CheckCircle2 className="w-2.5 h-2.5 text-status-green" />}
              </div>
              <span className="text-[8px] text-slate-400 font-bold font-mono leading-tight group-hover:text-slate-600 truncate">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Impact Results */}
      <div className="w-[340px] p-3 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono">Current Time</span>
          <span className="text-base font-black text-black font-mono tracking-tighter">{formatDuration(currentTotalMs)}</span>
        </div>
        
        <ArrowRight className="w-4 h-4 text-slate-300" />

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-black text-status-green uppercase tracking-widest font-mono">Optimized</span>
            <span className="bg-status-green text-white px-1 py-0.5 text-[7px] font-black font-mono">-{formatDuration(estimatedSavingsMs)}</span>
          </div>
          <span className="text-base font-black text-status-green font-mono tracking-tighter">{formatDuration(optimizedTotalMs)}</span>
        </div>

        <button className="bg-black text-white px-4 py-2 text-[9px] font-black uppercase tracking-[0.1em] font-mono hover:bg-slate-800 transition-colors shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
          Apply Strategy
        </button>
      </div>
    </div>
  );
};
