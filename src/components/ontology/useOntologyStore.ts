import { create } from 'zustand';
import { ConfidenceLevel } from './types';

interface OntologyStore {
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  activeFilters: {
    showConfirmed: boolean;
    showInferred: boolean;
    showAlleged: boolean;
    visibleClusters: string[];
  };
  layoutLocked: boolean;
  searchKeyword: string;
  detailDrawerOpen: boolean;

  setSelectedNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
  toggleCluster: (clusterId: string) => void;
  toggleConfidence: (level: ConfidenceLevel) => void;
  setSearchKeyword: (keyword: string) => void;
  setDetailDrawerOpen: (open: boolean) => void;
  resetView: () => void;
}

export const useOntologyStore = create<OntologyStore>((set) => ({
  selectedNodeId: null,
  hoveredNodeId: null,
  activeFilters: {
    showConfirmed: true,
    showInferred: true,
    showAlleged: true,
    visibleClusters: [
      'cluster_core_people',
      'cluster_vehicle_infra',
      'cluster_unknown_network',
      'cluster_nightlife_comms_finance',
      'cluster_victim_context',
      'cluster_media_institution',
    ],
  },
  layoutLocked: false,
  searchKeyword: '',
  detailDrawerOpen: false,

  setSelectedNode: (id) => set({ selectedNodeId: id, detailDrawerOpen: !!id }),
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  toggleCluster: (clusterId) =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        visibleClusters: state.activeFilters.visibleClusters.includes(clusterId)
          ? state.activeFilters.visibleClusters.filter((id) => id !== clusterId)
          : [...state.activeFilters.visibleClusters, clusterId],
      },
    })),
  toggleConfidence: (level) =>
    set((state) => {
      const key = `show${level.charAt(0).toUpperCase() + level.slice(1)}` as keyof typeof state.activeFilters;
      return {
        activeFilters: {
          ...state.activeFilters,
          [key]: !state.activeFilters[key],
        },
      };
    }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setDetailDrawerOpen: (open) => set({ detailDrawerOpen: open }),
  resetView: () =>
    set({
      selectedNodeId: null,
      hoveredNodeId: null,
      searchKeyword: '',
      detailDrawerOpen: false,
    }),
}));
