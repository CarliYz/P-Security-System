import React from 'react';
import { FlowNode } from './types';
import { cn } from '@/src/lib/utils';
import { X, Clock, User, Activity, Shield, AlertCircle, Zap } from 'lucide-react';
import dayjs from 'dayjs';

interface FlowNodeDetailDrawerProps {
  open: boolean;
  node: FlowNode | null;
  onClose: () => void;
}

export const FlowNodeDetailDrawer: React.FC<FlowNodeDetailDrawerProps> = ({
  open,
  node,
  onClose,
}) => {
  if (!node) return null;

  return (
    <div className={cn(
      "fixed top-0 right-0 h-full w-[400px] bg-white border-l-4 border-black shadow-[-20px_0px_60px_rgba(0,0,0,0.1)] z-[100] transition-transform duration-300 ease-out",
      open ? "translate-x-0" : "translate-x-full"
    )}>
      {/* Header */}
      <div className="p-6 border-b-2 border-black flex items-center justify-between bg-slate-50">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">Node Details</span>
          <h2 className="text-xl font-black text-black uppercase tracking-tighter font-mono">{node.title}</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-8 space-y-8 overflow-y-auto h-[calc(100%-100px)] scroll-thin">
        {/* Status & Timing */}
        <section className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              <Activity className="w-3 h-3" />
              Status
            </div>
            <div className={cn(
              "px-3 py-1.5 border-2 text-xs font-black uppercase font-mono inline-block",
              node.status === 'completed' && "bg-black text-white border-black",
              node.status === 'delayed' && "bg-red-50 text-status-red border-status-red",
              node.status === 'waiting' && "bg-yellow-50 text-status-yellow border-status-yellow"
            )}>
              {node.status === 'completed' ? 'Completed' :
               node.status === 'delayed' ? 'Delayed' :
               node.status === 'waiting' ? 'Waiting' :
               node.status === 'optimized' ? 'Optimized' : node.status}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              <Clock className="w-3 h-3" />
              Duration
            </div>
            <div className="text-xl font-black text-black font-mono tracking-tighter">
              {Math.round(node.durationMs / 60000)}m
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-4 p-4 bg-slate-50 border border-slate-200">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase font-mono">Enter Time</span>
              <span className="text-xs font-black text-black font-mono">{dayjs(node.enterAt).format('HH:mm:ss')}</span>
            </div>
            <div className="h-px w-12 bg-slate-200" />
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase font-mono">Exit Time</span>
              <span className="text-xs font-black text-black font-mono">{node.exitAt ? dayjs(node.exitAt).format('HH:mm:ss') : 'Processing'}</span>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              <User className="w-3 h-3" />
              Owner / Operator
            </div>
            <div className="text-sm font-black text-black font-mono uppercase">{node.owner}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              <Shield className="w-3 h-3" />
              System / Platform
            </div>
            <div className="text-sm font-black text-black font-mono uppercase">{node.systemName}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
              <Activity className="w-3 h-3" />
              Action Performed
            </div>
            <div className="text-sm font-black text-black font-mono uppercase">{node.action}</div>
          </div>
        </section>

        {/* Bottleneck Info */}
        {node.isBottleneck && (
          <section className="p-6 bg-red-50 border-2 border-status-red space-y-4">
            <div className="flex items-center gap-3 text-status-red">
              <AlertCircle className="w-6 h-6" />
              <h4 className="text-sm font-black uppercase tracking-tight font-mono">Critical Bottleneck Detected</h4>
            </div>
            <p className="text-xs text-status-red font-bold font-mono leading-relaxed italic">
              "{node.delayReason}"
            </p>
            <div className="pt-4 border-t border-status-red/20 flex items-center gap-2 text-status-green">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase font-mono">Optimization: Enable AI Auto-Verification</span>
            </div>
          </section>
        )}

        {/* Approvals */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
            <Shield className="w-3 h-3" />
            Approval Count
          </div>
          <div className="flex gap-2">
            {Array.from({ length: node.approvalCount }).map((_, i) => (
              <div key={i} className="w-8 h-8 border-2 border-black flex items-center justify-center bg-slate-50">
                <Shield className="w-4 h-4 text-black" />
              </div>
            ))}
            {node.approvalCount === 0 && <span className="text-xs font-bold text-slate-300 font-mono italic">No Approval Required</span>}
          </div>
        </section>
      </div>
    </div>
  );
};
