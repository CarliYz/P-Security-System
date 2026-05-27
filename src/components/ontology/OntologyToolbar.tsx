import React from 'react';
import { 
  Maximize2, 
  RotateCcw, 
  Lock, 
  Unlock, 
  Search, 
  Filter,
  Eye,
  EyeOff,
  Users,
  Car,
  ShieldAlert,
  Globe,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import { useOntologyStore } from './useOntologyStore';
import { cn } from '@/src/lib/utils';

export const OntologyToolbar: React.FC = () => {
  const { 
    activeFilters, 
    toggleCluster, 
    toggleConfidence, 
    resetView,
    searchKeyword,
    setSearchKeyword
  } = useOntologyStore();

  const CLUSTERS = [
    { id: 'cluster_core_people', icon: Users, label: 'Core' },
    { id: 'cluster_vehicle_infra', icon: Car, label: 'Infra' },
    { id: 'cluster_unknown_network', icon: ShieldAlert, label: 'Network' },
    { id: 'cluster_nightlife_comms_finance', icon: DollarSign, label: 'Finance' },
    { id: 'cluster_victim_context', icon: Globe, label: 'Victim' },
    { id: 'cluster_media_institution', icon: MessageSquare, label: 'Media' },
  ];

  return (
    <div className="absolute top-6 left-6 z-20 flex flex-col gap-4">
      {/* Main Controls */}
      <div className="bg-white border border-black shadow-sm p-1 flex flex-col gap-1 w-10">
        <button 
          onClick={resetView}
          className="p-2 hover:bg-slate-100 transition-colors text-slate-600"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="h-px bg-slate-200 mx-1" />
        <button className="p-2 hover:bg-slate-100 transition-colors text-slate-600" title="Lock Layout">
          <Lock className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-100 transition-colors text-slate-600" title="Fullscreen">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Cluster Filters - Narrowed to 1/3 width (approx 10-12 units) */}
      <div className="bg-white border border-black shadow-sm p-1 flex flex-col gap-1 w-10">
        <div className="px-1 py-1 text-[7px] font-black text-slate-400 tracking-tighter uppercase border-b border-slate-100 mb-1 text-center">
          CLST
        </div>
        {CLUSTERS.map(c => (
          <button
            key={c.id}
            onClick={() => toggleCluster(c.id)}
            className={cn(
              "p-2 flex items-center justify-center transition-all group",
              activeFilters.visibleClusters.includes(c.id) 
                ? "bg-black text-white" 
                : "text-slate-400 hover:bg-slate-50"
            )}
            title={c.label}
          >
            <c.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Confidence Filters */}
      <div className="bg-white border border-black shadow-sm p-1 flex flex-col gap-1 w-10">
        <div className="px-1 py-1 text-[7px] font-black text-slate-400 tracking-tighter uppercase border-b border-slate-100 mb-1 text-center">
          CONF
        </div>
        {[
          { id: 'confirmed', label: 'Confirmed', color: 'bg-slate-600' },
          { id: 'inferred', label: 'Inferred', color: 'bg-slate-400' },
          { id: 'alleged', label: 'Alleged', color: 'bg-red-500' },
        ].map(l => (
          <button
            key={l.id}
            onClick={() => toggleConfidence(l.id as any)}
            className={cn(
              "p-2 flex items-center justify-center transition-all",
              (activeFilters as any)[`show${l.id.charAt(0).toUpperCase() + l.id.slice(1)}`]
                ? "opacity-100"
                : "opacity-30 grayscale"
            )}
            title={l.label}
          >
            <div className={cn("w-2 h-2 rounded-full", l.color)} />
          </button>
        ))}
      </div>
    </div>
  );
};
