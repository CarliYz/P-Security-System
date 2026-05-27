import React from 'react';
import { SourceItem } from './types';
import { cn } from '@/src/lib/utils';
import { Clock, Shield, ExternalLink, Tag, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import dayjs from 'dayjs';
import { useFlowTraceStore } from '@/src/store/flowTraceStore';

interface SourceInboxPanelProps {
  items: SourceItem[];
  selectedSourceId?: string | null;
  onSelectSource: (id: string) => void;
}

export const SourceInboxPanel: React.FC<SourceInboxPanelProps> = ({
  items,
  selectedSourceId,
  onSelectSource,
}) => {
  const { toggleInbox } = useFlowTraceStore();

  return (
    <div className="w-[260px] h-full border-r border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden transition-all duration-300">
      <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={toggleInbox}
        >
          <Inbox className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
          <h3 className="text-[9px] font-black uppercase tracking-[0.1em] text-black font-mono">Intelligence Inbox</h3>
        </div>
        <button onClick={toggleInbox} className="p-1 hover:bg-slate-100 rounded transition-colors">
          <ChevronLeft className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 scroll-thin">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectSource(item.id)}
            className={cn(
              "p-3 border transition-all cursor-pointer group relative overflow-hidden",
              selectedSourceId === item.id
                ? "bg-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white border-slate-200 hover:border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.05)]"
            )}
          >
            {/* Category Indicator */}
            <div className={cn(
              "absolute top-0 left-0 w-1 h-full",
              item.category === 'social' && "bg-blue-500",
              item.category === 'web' && "bg-purple-500",
              item.category === 'internal' && "bg-status-red"
            )} />

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono group-hover:text-black transition-colors">
                  {item.sourceType}
                </span>
                <div className={cn(
                  "flex items-center gap-1 text-[7px] font-black px-1 py-0.5 border uppercase font-mono",
                  item.confidence === 'verified' && "bg-status-green/10 text-status-green border-status-green/20",
                  item.confidence === 'high' && "bg-blue-50 text-blue-600 border-blue-600/20",
                  item.confidence === 'medium' && "bg-yellow-50 text-yellow-600 border-yellow-600/20",
                  item.confidence === 'low' && "bg-red-50 text-red-600 border-red-600/20"
                )}>
                  <Shield className="w-2 h-2" />
                  {item.confidence === 'verified' ? 'Verified' : 
                   item.confidence === 'high' ? 'High Confidence' :
                   item.confidence === 'medium' ? 'Medium Confidence' : 'Low Confidence'}
                </div>
              </div>

              <h4 className="text-[11px] font-black text-black leading-tight uppercase tracking-tight font-mono">
                {item.title}
              </h4>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 font-mono">
                  <Clock className="w-2.5 h-2.5" />
                  <span>First Seen: {dayjs(item.firstSeenAt).format('HH:mm:ss')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 font-mono">
                  <ExternalLink className="w-2.5 h-2.5" />
                  <span>Source: {item.enteredVia}</span>
                </div>
              </div>

              <div className="p-1.5 bg-slate-50 border border-slate-100 italic text-[9px] text-slate-600 font-bold font-mono leading-relaxed">
                "{item.extractedSignal}"
              </div>

              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 text-slate-400 text-[8px] font-black uppercase tracking-tighter font-mono">
                    <Tag className="w-2 h-2" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
