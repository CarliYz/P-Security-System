import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeStatus } from '../types';
import { cn } from '@/src/lib/utils';
import { Clock, User, AlertTriangle, CheckCircle2, Timer, ShieldAlert } from 'lucide-react';

interface FlowNodeCardProps {
  data: {
    title: string;
    subtitle?: string;
    durationLabel: string;
    owner: string;
    status: NodeStatus;
    isBottleneck?: boolean;
    action: string;
    systemName: string;
  };
  selected?: boolean;
}

export const FlowNodeCard: React.FC<FlowNodeCardProps> = ({ data, selected }) => {
  return (
    <div className={cn(
      "w-[180px] bg-white border p-2.5 transition-all relative group",
      selected ? "border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "border-slate-200 shadow-sm",
      data.status === 'delayed' && "border-status-red/50",
      data.status === 'completed' && "border-black",
      data.status === 'waiting' && "border-status-yellow/50",
      data.status === 'optimized' && "border-status-green/50"
    )}>
      <Handle type="target" position={Position.Left} className="w-1.5 h-1.5 !bg-black !border-none" />
      
      {data.isBottleneck && (
        <div className="absolute -top-2 -right-2 bg-status-red text-white p-1 shadow-sm z-10 animate-bounce">
          <ShieldAlert className="w-3 h-3" />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono group-hover:text-black transition-colors">
            {data.systemName}
          </span>
          <div className={cn(
            "text-[7px] font-black px-1 py-0.5 border uppercase font-mono",
            data.status === 'completed' && "bg-black text-white border-black",
            data.status === 'delayed' && "bg-red-50 text-status-red border-status-red/20",
            data.status === 'waiting' && "bg-yellow-50 text-status-yellow border-status-yellow/20",
            data.status === 'optimized' && "bg-green-50 text-status-green border-status-green/20"
          )}>
            {data.status === 'completed' ? 'Completed' :
             data.status === 'delayed' ? 'Delayed' :
             data.status === 'waiting' ? 'Waiting' :
             data.status === 'optimized' ? 'Optimized' : data.status}
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <h4 className="text-[11px] font-black text-black uppercase tracking-tight font-mono leading-tight">
            {data.title}
          </h4>
          <div className="text-[9px] font-bold text-slate-500 uppercase font-mono italic">
            {data.action}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-100">
          <div className="flex items-center gap-1 text-[8px] font-bold text-slate-400 font-mono">
            <Timer className="w-2.5 h-2.5" />
            <span className={cn(
              "font-black",
              data.status === 'delayed' ? "text-status-red" : "text-black"
            )}>{data.durationLabel}</span>
          </div>
          <div className="flex items-center gap-1 text-[8px] font-bold text-slate-400 font-mono">
            <User className="w-2.5 h-2.5" />
            <span className="text-black truncate">{data.owner}</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-1.5 h-1.5 !bg-black !border-none" />
    </div>
  );
};
