import React, { useMemo, useCallback, useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  ConnectionLineType,
  Node,
  Edge,
  MarkerType,
  useStore,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ReportingBoardData } from './types';
import { ReportingNode } from './nodes/ReportingNode';
import { cn } from '@/src/lib/utils';
import { 
  CheckCircle2, 
  Timer, 
  AlertCircle, 
  Clock, 
  MousePointer2 
} from 'lucide-react';

interface EscalationReportingBoardProps {
  data: ReportingBoardData;
  onCardClick: (id: string) => void;
}

const nodeTypes = {
  reportingNode: ReportingNode,
};

const SWIMLANE_TITLES = [
  "External Trigger",
  "Reporting Trigger",
  "District Police",
  "Municipal Police",
  "Provincial Bureau",
  "Ministerial Desk"
];

const CARD_WIDTH = 220;
const SWIMLANE_WIDTH = CARD_WIDTH * 1.5; // 330
const VERTICAL_SPACING = 160 * 1.5; // 240

const SwimlaneBackground = () => {
  const transform = useStore((s) => s.transform);
  const [tx, ty, tZoom] = transform;

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div 
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${tZoom})`,
          transformOrigin: '0 0',
          display: 'flex',
          height: '10000px', // Very tall to cover scroll
          width: `${SWIMLANE_WIDTH * SWIMLANE_TITLES.length}px`
        }}
      >
        {SWIMLANE_TITLES.map((title, i) => (
          <div 
            key={i} 
            style={{ width: SWIMLANE_WIDTH }}
            className={cn(
              "flex flex-col border-r border-slate-200/50",
              i % 2 === 1 ? "bg-slate-50" : "bg-white"
            )}
          >
            <div className="h-12 flex items-center justify-center border-b border-slate-200/50 bg-white/80 backdrop-blur-sm">
              <span className="text-[10px] font-black text-black uppercase tracking-[0.2em] font-mono">
                {title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const EscalationReportingBoard: React.FC<EscalationReportingBoardProps> = ({
  data,
  onCardClick,
}) => {
  const rfNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [];
    
    data.zones.forEach((zone, zoneIdx) => {
      zone.cards.forEach((card, cardIdx) => {
        // Center card in swimlane
        const x = zoneIdx * SWIMLANE_WIDTH + (SWIMLANE_WIDTH - CARD_WIDTH) / 2;
        // Waterfall effect: each zone starts slightly lower than the previous one's start
        const staggerY = zoneIdx * 120; 
        
        let yOffset = 0;
        // Adjustments to clear the red arrow path (Provincial -> District)
        // 1. Reporting Trigger (zone_district): Escalation Send & Feedback UP 50
        if (zone.id === 'zone_district') {
          if (card.title === 'Escalation Send' || card.title === 'Escalation Feedback') {
            yOffset = -50;
          }
        }
        
        // 2. Municipal Police (zone_provincial): Level Audit DOWN 50
        if (zone.id === 'zone_provincial') {
          if (card.title === 'Level Audit') {
            yOffset = 50;
          }
        }

        nodes.push({
          id: card.id,
          type: 'reportingNode',
          position: { 
            x: x, 
            y: staggerY + (cardIdx * VERTICAL_SPACING) + 100 + yOffset
          },
          data: {
            ...card,
            onNodeClick: onCardClick
          },
        });
      });
    });
    
    return nodes;
  }, [data, onCardClick]);

  const rfEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = data.connections.map((conn, idx) => {
      const isReverse = conn.type === 'reverse';
      return {
        id: `edge-${idx}`,
        source: conn.sourceCardId,
        target: conn.targetCardId,
        type: ConnectionLineType.SmoothStep,
        label: conn.label ? `${conn.label}${conn.durationLabel ? ` (${conn.durationLabel})` : ''}` : undefined,
        animated: isReverse,
        style: { 
          stroke: isReverse ? '#ef4444' : '#000', 
          strokeWidth: isReverse ? 3 : 1.5,
          strokeDasharray: isReverse ? '6 3' : 'none',
          opacity: isReverse ? 1 : 0.3
        },
        labelStyle: { 
          fill: isReverse ? '#ef4444' : '#64748b', 
          fontWeight: 900, 
          fontSize: 9,
          fontFamily: 'monospace',
        },
        labelBgStyle: {
          fill: isReverse ? '#fee2e2' : '#f8fafc',
          fillOpacity: 0.9,
          padding: 4
        },
        labelBgPadding: [4, 8],
        labelBgBorderRadius: 2,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isReverse ? '#ef4444' : '#000',
          width: 20,
          height: 20,
        },
        sourceHandle: isReverse ? 'bottom' : undefined,
        targetHandle: isReverse ? 'top' : undefined,
      };
    });

    // Add vertical downward arrows between cards in the same zone
    data.zones.forEach((zone) => {
      for (let i = 0; i < zone.cards.length - 1; i++) {
        edges.push({
          id: `v-edge-${zone.id}-${i}`,
          source: zone.cards[i].id,
          target: zone.cards[i+1].id,
          sourceHandle: 'bottom',
          targetHandle: 'top',
          type: ConnectionLineType.SmoothStep,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#000',
            width: 15,
            height: 15,
          },
          style: { stroke: '#000', strokeWidth: 1.5, opacity: 0.2 }
        });
      }
    });

    return edges;
  }, [data]);

  return (
    <ReactFlowProvider>
      <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
        {/* KPI Summary Strip */}
        <div className="flex items-center gap-4 px-6 py-2 bg-slate-900 border-b border-black shrink-0">
          {data.kpis.map((kpi) => (
            <div key={kpi.key} className="flex flex-col">
              <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest font-mono">{kpi.label}</span>
              <span className={cn(
                "text-[10px] font-black font-mono",
                kpi.tone === 'danger' ? "text-status-red" : 
                kpi.tone === 'warning' ? "text-status-yellow" : 
                kpi.tone === 'success' ? "text-status-green" : "text-white"
              )}>
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        {/* Legend Area */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-status-green" />
              <span className="text-[8px] font-black text-slate-500 uppercase font-mono">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="w-3 h-3 text-status-yellow" />
              <span className="text-[8px] font-black text-slate-500 uppercase font-mono">In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-status-red" />
              <span className="text-[8px] font-black text-slate-500 uppercase font-mono">Returned/Delayed</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 bg-slate-300" />
              <span className="text-[8px] font-black text-slate-500 uppercase font-mono">Standard Flow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 bg-status-red" />
              <span className="text-[8px] font-black text-slate-500 uppercase font-mono">Abnormal Return</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase font-mono">Time Stats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MousePointer2 className="w-3 h-3 text-slate-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase font-mono">Click for Details</span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          {/* Swimlane Background */}
          <SwimlaneBackground />

          <ReactFlow
            nodes={rfNodes}
            edges={rfEdges}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => onCardClick(node.id)}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            className="z-10"
          >
            <Background color="#000" gap={20} size={1} opacity={0.05} />
            <Controls className="!bg-white !border !border-slate-200 !shadow-none !rounded-none" />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};
