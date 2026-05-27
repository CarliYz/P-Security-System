import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, Clock, CheckCircle2, ChevronRight, AlertTriangle, FileText, Send, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DecisionCardProps {
  statusTag: string;
  statusColor: 'red' | 'amber' | 'blue-gray' | 'green';
  title: string;
  summary: string;
  meta: string;
  reminder: string;
  primaryAction: string;
  secondaryAction: string;
  onPrimaryClick?: () => void;
}

const DecisionCard: React.FC<DecisionCardProps> = ({
  statusTag,
  statusColor,
  title,
  summary,
  meta,
  reminder,
  primaryAction,
  secondaryAction,
  onPrimaryClick
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePrimaryClick = () => {
    setIsProcessing(true);
    if (onPrimaryClick) onPrimaryClick();
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const getTagStyles = () => {
    switch (statusColor) {
      case 'red': return 'bg-red-50 text-red-600 border-red-100';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'blue-gray': return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'green': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 transition-all hover:shadow-sm group">
      <div className="flex items-center gap-2 mb-1">
        <span className={cn(
          "text-[8px] px-1.5 py-0.5 rounded border font-bold uppercase tracking-wider shrink-0",
          getTagStyles()
        )}>
          {statusTag}
        </span>
        <h4 className="text-[10px] font-black text-black truncate flex-1 tracking-tight">{title}</h4>
        <span className="text-[8px] font-mono text-slate-400 font-bold shrink-0">{meta}</span>
      </div>
      
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-slate-600 truncate leading-tight mb-0.5">{summary}</p>
          <div className="flex items-center gap-1 text-[8px] text-slate-400 font-medium italic truncate">
            <Clock className="w-2.5 h-2.5" />
            {reminder}
          </div>
        </div>
        
        <div className="flex items-center gap-1 shrink-0">
          <button 
            onClick={handlePrimaryClick}
            disabled={isProcessing}
            className={cn(
              "px-2 py-1 rounded text-[9px] font-bold transition-all flex items-center justify-center gap-1 min-w-[52px]",
              isProcessing 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-slate-200 text-black hover:bg-slate-300 active:scale-[0.98]"
            )}
          >
            {isProcessing ? "Processing" : primaryAction}
          </button>
          <button className="px-2 py-1 rounded border border-slate-200 text-[9px] font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.98]">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

interface ExecutiveDecisionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveDecisionDrawer: React.FC<ExecutiveDecisionDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-[2000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-24 left-4 h-[50vh] w-[28vw] min-w-[380px] max-w-[440px] bg-slate-50 border border-slate-200 rounded-[14px] shadow-2xl z-[2001] flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-4 pb-3 bg-white border-b border-slate-100 relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              
              <h2 className="text-base font-black text-black tracking-tighter">Today's Pending Decisions</h2>
              <p className="text-[10px] text-slate-500 font-medium">Critical matters requiring rapid executive review</p>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">High Priority 2</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-amber-500" />
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Bottleneck 1</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Pending 2</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <DecisionCard
                  statusTag="High Priority"
                  statusColor="red"
                  title="Approve External Press Release Tone"
                  summary="First draft completed. Confirm wording and release time."
                  meta="Progress: 92%"
                  reminder="If not confirmed within 10 mins, release window may be missed"
                  primaryAction="Approve"
                  secondaryAction="View Draft"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <DecisionCard
                  statusTag="Pending"
                  statusColor="blue-gray"
                  title="Confirm Leadership Briefing Version"
                  summary="Minister and Presidential versions generated. Confirm recipient."
                  meta="Progress: 80%"
                  reminder="Recipient not locked, briefing flow will be delayed"
                  primaryAction="Confirm"
                  secondaryAction="Preview"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DecisionCard
                  statusTag="Bottleneck"
                  statusColor="amber"
                  title="Advance Cross-Dept Countersigning"
                  summary="Draft completed. 2 departments pending countersign."
                  meta="Countersign: 4/6"
                  reminder="Current max delay: 47 mins"
                  primaryAction="Urge"
                  secondaryAction="View Chain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <DecisionCard
                  statusTag="Pending"
                  statusColor="blue-gray"
                  title="Review Sentiment Response Advice"
                  summary="Risk analysis generated. Confirm strategy and timing."
                  meta="Status: Analysis Generated"
                  reminder="Heat is rising. Priority processing recommended."
                  primaryAction="Adopt"
                  secondaryAction="View Report"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <DecisionCard
                  statusTag="Near Completion"
                  statusColor="green"
                  title="Confirm Final Analysis & Archive"
                  summary="Fact and evidence chains closed. Confirm conclusions."
                  meta="Closure: 87%"
                  reminder="Archive first, then supplement backfill materials"
                  primaryAction="Confirm"
                  secondaryAction="View Conclusion"
                />
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <button className="flex-1 py-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                View All Matters
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-1.5 rounded-md border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
