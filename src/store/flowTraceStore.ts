import { create } from 'zustand';
import { FlowType, OptimizationOption } from '../components/FlowTrace/types';
import { MOCK_FLOW_DATA } from '../components/FlowTrace/mock';

interface FlowTraceStore {
  activeFlowType: FlowType;
  selectedChainId: string | null;
  selectedNodeId: string | null;
  selectedSourceId: string | null;

  showOnlyDelayed: boolean;
  showOnlyCriticalPath: boolean;
  visibleLaneIds: string[];

  optimizationOptions: OptimizationOption[];

  isInboxVisible: boolean;
  isAnalyticsVisible: boolean;
  isOptimizationVisible: boolean;

  setActiveFlowType: (type: FlowType) => void;
  setSelectedChainId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedSourceId: (id: string | null) => void;

  toggleShowOnlyDelayed: () => void;
  toggleCriticalPath: () => void;
  toggleLaneVisibility: (laneId: string) => void;
  toggleOptimizationOption: (id: string) => void;

  toggleInbox: () => void;
  toggleAnalytics: () => void;
  toggleOptimization: () => void;
  setInboxVisible: (visible: boolean) => void;
  setAnalyticsVisible: (visible: boolean) => void;
  setOptimizationVisible: (visible: boolean) => void;
}

export const useFlowTraceStore = create<FlowTraceStore>((set) => ({
  activeFlowType: 'all',
  selectedChainId: null,
  selectedNodeId: null,
  selectedSourceId: null,

  showOnlyDelayed: false,
  showOnlyCriticalPath: false,
  visibleLaneIds: MOCK_FLOW_DATA.lanes.map(l => l.id),

  optimizationOptions: MOCK_FLOW_DATA.optimizationOptions,

  isInboxVisible: true,
  isAnalyticsVisible: true,
  isOptimizationVisible: true,

  setActiveFlowType: (type) => set({ activeFlowType: type }),
  setSelectedChainId: (id) => set({ selectedChainId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setSelectedSourceId: (id) => set({ selectedSourceId: id }),

  toggleShowOnlyDelayed: () => set((state) => ({ showOnlyDelayed: !state.showOnlyDelayed })),
  toggleCriticalPath: () => set((state) => ({ showOnlyCriticalPath: !state.showOnlyCriticalPath })),
  toggleLaneVisibility: (laneId) => set((state) => ({
    visibleLaneIds: state.visibleLaneIds.includes(laneId)
      ? state.visibleLaneIds.filter(id => id !== laneId)
      : [...state.visibleLaneIds, laneId]
  })),
  toggleOptimizationOption: (id) => set((state) => ({
    optimizationOptions: state.optimizationOptions.map(opt =>
      opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
    )
  })),

  toggleInbox: () => set((state) => ({ isInboxVisible: !state.isInboxVisible })),
  toggleAnalytics: () => set((state) => ({ isAnalyticsVisible: !state.isAnalyticsVisible })),
  toggleOptimization: () => set((state) => ({ isOptimizationVisible: !state.isOptimizationVisible })),
  setInboxVisible: (visible) => set({ isInboxVisible: visible }),
  setAnalyticsVisible: (visible) => set({ isAnalyticsVisible: visible }),
  setOptimizationVisible: (visible) => set({ isOptimizationVisible: visible }),
}));
