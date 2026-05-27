import React, { useMemo, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  ConnectionLineType,
  Node,
  Edge,
  MarkerType,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FlowLane, FlowChain, FlowNode, FlowEdge } from './types';
import { FlowNodeCard } from './nodes/FlowNodeCard';
import { ReportingNode } from './nodes/ReportingNode';
import { cn } from '@/src/lib/utils';
import dayjs from 'dayjs';

interface FlowSwimlaneBoardProps {
  lanes: FlowLane[];
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId?: string | null;
  onNodeClick: (nodeId: string) => void;
  laneHeight?: number;
}

const nodeTypes = {
  flowNode: FlowNodeCard,
  reportingNode: ReportingNode,
};

export const FlowSwimlaneBoard: React.FC<FlowSwimlaneBoardProps> = ({
  lanes,
  nodes,
  edges,
  selectedNodeId,
  onNodeClick,
  laneHeight = 140,
}) => {
  const rfNodes: Node[] = useMemo(() => {
    return nodes.map((node) => ({
      id: node.id,
      type: (node as any).type || 'flowNode',
      position: { 
        x: (dayjs(node.enterAt).unix() - dayjs(nodes[0]?.enterAt || dayjs()).unix()) * 0.1 + 100, 
        y: (lanes.find(l => l.id === node.laneId)?.order || 1) * laneHeight 
      },
      data: (node as any).type === 'reportingNode' ? { ...(node as any).data, onNodeClick } : {
        title: node.title,
        action: node.action,
        durationLabel: `${Math.round(node.durationMs / 60000)}m`,
        owner: node.owner,
        status: node.status,
        isBottleneck: node.isBottleneck,
        systemName: node.systemName,
      },
      selected: selectedNodeId === node.id,
    }));
  }, [nodes, lanes, selectedNodeId, laneHeight]);

  const rfEdges: Edge[] = useMemo(() => {
    return edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: ConnectionLineType.SmoothStep,
      animated: edge.isCriticalPath,
      style: { 
        stroke: edge.isCriticalPath ? '#ef4444' : '#000', 
        strokeWidth: edge.isCriticalPath ? 3 : 1.5,
        opacity: edge.isCriticalPath ? 1 : 0.3
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edge.isCriticalPath ? '#ef4444' : '#000',
      },
    }));
  }, [edges]);

  const onRfNodeClick = useCallback((_: any, node: Node) => {
    onNodeClick(node.id);
  }, [onNodeClick]);

  return (
    <div className="flex-1 bg-white relative overflow-hidden">
      {/* Swimlane Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {lanes.map((lane, i) => (
            <div 
            key={lane.id} 
            className={cn(
              "absolute left-0 right-0 border-b border-slate-200 flex items-center px-4",
              i % 2 === 0 ? "bg-slate-50/30" : "bg-white"
            )}
            style={{ 
              top: (lane.order * laneHeight) - (laneHeight / 2), 
              height: laneHeight 
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] font-mono leading-none">
                LANE_{lane.order.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                {lane.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onRfNodeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        className="z-10"
      >
        <Background color="#000" gap={20} size={1} opacity={0.05} />
        <Controls className="!bg-white !border !border-slate-200 !shadow-none !rounded-none" />
        
        <Panel position="top-right" className="bg-white border border-slate-200 p-3 shadow-sm">
          <div className="flex flex-col gap-2">
            <h4 className="text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono">Legend</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-status-red" />
                <span className="text-[8px] font-black uppercase font-mono">Critical Path / Delay</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-black" />
                <span className="text-[8px] font-black uppercase font-mono">Standard Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 border border-black" />
                <span className="text-[8px] font-black uppercase font-mono">Completed Node</span>
              </div>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
