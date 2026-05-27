import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Car, 
  MapPin, 
  ShieldAlert, 
  Activity, 
  Link2, 
  FileText,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useOntologyStore } from './useOntologyStore';
import { cn } from '@/src/lib/utils';

export const OntologyDetailDrawer: React.FC = () => {
  const { selectedNodeId, detailDrawerOpen, setDetailDrawerOpen } = useOntologyStore();

  // In a real app, we'd fetch details based on selectedNodeId
  // For now, we'll show a generic detail view

  return (
    <AnimatePresence>
      {detailDrawerOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 w-[350px] h-full bg-white border-l border-black z-30 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-black flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-black flex items-center justify-center">
                <User className="w-5 h-5 text-slate-800" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-black font-mono tracking-tight leading-tight uppercase">
                  Entity Details
                </h3>
                <p className="text-[10px] font-bold text-slate-400 font-mono tracking-widest">
                  ID: {selectedNodeId}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setDetailDrawerOpen(false)}
              className="p-2 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Status & Risk */}
            <div className="flex gap-4">
              <div className="flex-1 p-3 bg-red-50 border border-red-200 rounded-sm">
                <div className="text-[8px] font-black text-red-400 uppercase tracking-widest mb-1">Risk Level</div>
                <div className="text-xs font-bold text-red-700 font-mono">HIGH RISK</div>
              </div>
              <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-sm">
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
                <div className="text-xs font-bold text-slate-700 font-mono">UNDER INVESTIGATION</div>
              </div>
            </div>

            {/* Attributes */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-3 h-3 text-slate-400" />
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Attributes</h4>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Full Name', value: 'Alexander Pak' },
                  { label: 'Role', value: 'Primary Suspect' },
                  { label: 'Citizenship', value: 'Kazakhstan' },
                  { label: 'Last Known Loc', value: 'Almaty District 102' },
                  { label: 'Confidence', value: '98.4% (Confirmed)' },
                ].map((attr, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">{attr.label}</span>
                    <span className="text-[10px] font-bold text-black font-mono">{attr.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Network Summary */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-3 h-3 text-slate-400" />
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Network Summary</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Connections', value: '42' },
                  { label: 'Vehicles', value: '3' },
                  { label: 'Locations', value: '12' },
                  { label: 'Incidents', value: '1' },
                ].map((stat, i) => (
                  <div key={i} className="p-3 border border-slate-100 rounded-sm">
                    <div className="text-[18px] font-black text-black font-mono leading-none mb-1">{stat.value}</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Evidence */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-3 h-3 text-slate-400" />
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Recent Evidence</h4>
              </div>
              <div className="space-y-3">
                {[
                  { date: '2026.03.21 03:05', type: 'VMS', desc: 'Camera AF-0809 capture' },
                  { date: '2026.03.21 03:20', type: 'CAD', desc: '102 Call association' },
                  { date: '2026.03.22 14:00', type: 'OSINT', desc: 'Telegram post identification' },
                ].map((ev, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 group cursor-pointer hover:border-black transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-bold text-slate-400 font-mono">{ev.date}</span>
                      <span className="text-[8px] font-black text-blue-600 font-mono uppercase bg-blue-50 px-1">{ev.type}</span>
                    </div>
                    <p className="text-[10px] font-bold text-black font-mono leading-tight">{ev.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-black bg-slate-50">
            <button className="w-full bg-black text-white py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
              <ExternalLink className="w-3 h-3" />
              Open Full Profile
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
