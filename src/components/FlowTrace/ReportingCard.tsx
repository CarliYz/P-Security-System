import React from 'react';
import { ReportingCardData, ReportingStep } from './types';
import { cn } from '@/src/lib/utils';
import { Clock, CheckCircle2, AlertCircle, Timer, ChevronRight, User, ShieldAlert } from 'lucide-react';

interface ReportingCardProps {
  card: ReportingCardData;
  onClick: (id: string) => void;
}

export const ReportingCard: React.FC<ReportingCardProps> = ({ card, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-status-green';
      case 'delayed': return 'text-status-red';
      case 'waiting': return 'text-status-yellow';
      case 'rejected': return 'text-status-red';
      default: return 'text-slate-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-status-green/5 border-status-green/20';
      case 'delayed': return 'bg-status-red/5 border-status-red/20';
      case 'waiting': return 'bg-status-yellow/5 border-status-yellow/20';
      case 'rejected': return 'bg-status-red/10 border-status-red/30';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div 
      onClick={() => onClick(card.id)}
      className={cn(
        "group relative flex flex-col border bg-white transition-all cursor-pointer hover:shadow-md",
        card.status === 'delayed' || card.status === 'rejected' ? "border-status-red/40" : "border-slate-200 hover:border-black",
        card.isBottleneck && "ring-1 ring-status-red ring-offset-1"
      )}
    >
      {/* Header */}
      <div className="p-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex flex-col">
          <h4 className="text-[9px] font-black uppercase tracking-tight text-black font-mono">{card.title}</h4>
          <div className="flex items-center gap-1 mt-0.5">
            <User className="w-2 h-2 text-slate-400" />
            <span className="text-[7px] font-bold text-slate-400 uppercase font-mono">{card.owner}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={cn(
            "px-1 py-0.5 text-[7px] font-black uppercase font-mono border",
            getStatusBg(card.status),
            getStatusColor(card.status)
          )}>
            {card.status === 'completed' ? 'Completed' : 
             card.status === 'delayed' ? 'Delayed' : 
             card.status === 'rejected' ? 'Rejected' : 'Processing'}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Clock className="w-2 h-2 text-slate-400" />
            <span className="text-[7px] font-black text-slate-500 font-mono">{card.totalDurationLabel}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col gap-1.5">
        {card.isDetailed && card.steps ? (
          <div className="space-y-1">
            {card.steps.map((step) => (
              <div key={step.id} className="flex items-center justify-between group/step">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <div className={cn(
                    "w-1 h-1 rounded-full shrink-0",
                    step.status === 'completed' ? "bg-status-green" : 
                    step.status === 'delayed' ? "bg-status-red" : "bg-status-yellow"
                  )} />
                  <span className="text-[8px] font-bold text-slate-600 truncate font-mono uppercase group-hover/step:text-black transition-colors">
                    {step.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[7px] font-black text-slate-400 font-mono">{step.durationLabel}</span>
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-2.5 h-2.5 text-status-green" />
                  ) : step.status === 'delayed' ? (
                    <AlertCircle className="w-2.5 h-2.5 text-status-red" />
                  ) : (
                    <Timer className="w-2.5 h-2.5 text-status-yellow" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : card.summaryItems ? (
          <div className="flex flex-wrap gap-1">
            {card.summaryItems.map((item, idx) => (
              <span key={idx} className="text-[7px] font-black text-slate-400 border border-slate-100 px-1 py-0.5 uppercase font-mono">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {card.returnReason && (
              <div className="flex items-start gap-1.5 p-1.5 bg-status-red/5 border border-status-red/10">
                <ShieldAlert className="w-2.5 h-2.5 text-status-red shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[7px] font-black text-status-red uppercase font-mono">Return Reason:</span>
                  <p className="text-[7px] font-bold text-slate-600 font-mono leading-tight">{card.returnReason}</p>
                </div>
              </div>
            )}
            {card.delayReason && (
              <p className="text-[7px] font-bold text-status-red font-mono italic">
                * {card.delayReason}
              </p>
            )}
            <div className="flex items-center justify-between mt-1">
              <span className="text-[7px] font-black text-slate-300 uppercase font-mono">Click for Details</span>
              <ChevronRight className="w-2 h-2 text-slate-300" />
            </div>
          </div>
        )}
      </div>

      {/* Bottleneck Indicator */}
      {card.isBottleneck && (
        <div className="absolute -top-1 -right-1">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-red"></span>
          </div>
        </div>
      )}
    </div>
  );
};
