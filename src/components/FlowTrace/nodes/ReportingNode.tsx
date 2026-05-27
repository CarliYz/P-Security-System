import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ReportingCard } from '../ReportingCard';
import { ReportingCardData } from '../types';

export const ReportingNode: React.FC<NodeProps<ReportingCardData & { onNodeClick?: (id: string) => void }>> = ({ data }) => {
  return (
    <div className="w-[220px]">
      <Handle type="target" position={Position.Left} className="!bg-slate-300 !w-1 !h-1 !border-none" />
      <ReportingCard card={data} onClick={data.onNodeClick || (() => {})} />
      <Handle type="source" position={Position.Right} className="!bg-slate-300 !w-1 !h-1 !border-none" />
      
      {/* Top/Bottom handles for reverse connections if needed */}
      <Handle type="target" position={Position.Top} id="top" className="!bg-slate-300 !w-1 !h-1 !border-none" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-slate-300 !w-1 !h-1 !border-none" />
    </div>
  );
};
