import React, { useMemo, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType, 
  Node, 
  Edge,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  AlertTriangle, 
  Car, 
  MapPin, 
  Shield, 
  User, 
  Activity, 
  Zap, 
  History, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Fix Leaflet icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface VehicleSpatialOntologyProps {
  vehicleId: string | null;
}

// Map Controller to handle view updates
const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Custom Node for Palantir Foundry Style
const CustomNode = ({ data }: any) => {
  return (
    <div className={cn(
      "px-3 py-2 rounded border bg-slate-900 text-white min-w-[150px] shadow-2xl transition-all hover:border-slate-400",
      data.isWarning ? "border-status-red/50" : "border-slate-800"
    )}>
      <Handle type="target" position={Position.Top} className="w-1 h-1 bg-slate-700 border-none" />
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "w-8 h-8 rounded overflow-hidden shrink-0 border border-slate-700",
          data.isWarning && "border-status-red/30"
        )}>
          <img 
            src={data.imageUrl || `https://picsum.photos/seed/${data.label}/100/100`} 
            alt={data.label}
            className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[7px] font-mono text-slate-500 uppercase tracking-[0.2em] leading-none mb-1">{data.label}</div>
          <div className="text-[9px] font-medium truncate text-slate-400">{data.value}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-1 h-1 bg-slate-700 border-none" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const VehicleSpatialOntology: React.FC<VehicleSpatialOntologyProps> = ({ vehicleId }) => {
  const isSelected = vehicleId === 'KZ-777-POL';

  // React Flow Data
  const initialNodes: Node[] = [
    { 
      id: 'center', 
      type: 'custom', 
      position: { x: 250, y: 150 }, 
      data: { 
        label: 'Vehicle Entity', 
        value: 'KZ-777-POL (Zeekr 001)', 
        imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=100' 
      } 
    },
    { 
      id: 'unit', 
      type: 'custom', 
      position: { x: 50, y: 50 }, 
      data: { 
        label: 'Unit', 
        value: 'Almaty 102nd Precinct', 
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=100' 
      } 
    },
    { 
      id: 'owner', 
      type: 'custom', 
      position: { x: 450, y: 50 }, 
      data: { 
        label: 'Responsible', 
        value: 'A. Ivanov (Deputy Chief)', 
        isWarning: true,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
      } 
    },
    { 
      id: 'op1', 
      type: 'custom', 
      position: { x: 50, y: 250 }, 
      data: { 
        label: 'Operation', 
        value: 'Night-Owl Patrol', 
        imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=100'
      } 
    },
    { 
      id: 'op2', 
      type: 'custom', 
      position: { x: 250, y: 300 }, 
      data: { 
        label: 'Operation', 
        value: 'Falcon Response', 
        imageUrl: 'https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?auto=format&fit=crop&q=80&w=100'
      } 
    },
    { 
      id: 'status-v', 
      type: 'custom', 
      position: { x: 450, y: 250 }, 
      data: { 
        label: 'Virtual Status', 
        value: 'Maintenance (North Shop)', 
        imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=100'
      } 
    },
    { 
      id: 'status-p', 
      type: 'custom', 
      position: { x: 450, y: 350 }, 
      data: { 
        label: 'Physical Status', 
        value: 'Active (Al-Farabi Ave)', 
        isWarning: true,
        imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=100'
      } 
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1', source: 'unit', target: 'center', label: 'Belongs to', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#e2e8f0' } },
    { id: 'e2', source: 'owner', target: 'center', label: 'Responsible', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444', strokeWidth: 1 } },
    { id: 'e3', source: 'center', target: 'op1', label: 'Participated', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#e2e8f0' } },
    { id: 'e4', source: 'center', target: 'op2', label: 'Participated', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#e2e8f0' } },
    { id: 'e5', source: 'center', target: 'status-v', label: 'Reported', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#e2e8f0' } },
    { id: 'e6', source: 'center', target: 'status-p', label: 'Conflict', markerEnd: { type: MarkerType.ArrowClosed }, animated: true, style: { stroke: '#ef4444' } },
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Top - GIS Map */}
      <div className="h-[55%] border-b border-slate-100 relative bg-white overflow-hidden">
        <MapContainer 
          center={[43.2389, 76.8897]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <MapController center={isSelected ? [43.2389, 76.8897] : [43.2389, 76.8897]} zoom={13} />
          
          {isSelected && (
            <>
              {/* Main Road Anomaly Lines */}
              <Polyline 
                positions={[
                  [43.215, 76.85],
                  [43.225, 76.88],
                  [43.235, 76.91],
                  [43.238, 76.94],
                  [43.239, 76.97]
                ]} 
                color="#ef4444" 
                weight={4}
                opacity={0.9}
                dashArray="10, 10"
              />
              <Polyline 
                positions={[
                  [43.212, 76.852],
                  [43.222, 76.882],
                  [43.232, 76.912],
                  [43.235, 76.942],
                  [43.236, 76.972]
                ]} 
                color="#ef4444" 
                weight={4}
                opacity={0.6}
                dashArray="5, 15"
              />
              <Marker position={[43.2389, 76.8897]}>
                <Popup>
                  <div className="text-[10px] font-mono">
                    <div className="font-bold">KZ-777-POL</div>
                    <div className="text-status-red">ANOMALY DETECTED</div>
                  </div>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
        
        {isSelected && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/60 border border-slate-100 px-3 py-1.5 rounded shadow-sm backdrop-blur-md z-20">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-status-red" />
              <span className="text-[9px] text-slate-500 tracking-tight">
                Anomaly Evaluation: This vehicle, currently "under maintenance", has traveled the exact same high-risk late-night route 3 times in one week.
              </span>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/40 border border-slate-100 p-2 rounded text-[8px] font-mono space-y-1 backdrop-blur-sm">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" /> ANOMALY ROUTE</div>
        </div>
      </div>

      {/* Bottom - Ontology Graph */}
      <div className="h-[45%] relative bg-white">
        <div className="absolute top-3 left-4 z-10">
          <h3 className="text-[9px] font-mono text-slate-300 uppercase tracking-widest">Entity Relationship Ontology</h3>
        </div>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          className="bg-white"
        >
          <Background color="#f1f5f9" gap={20} />
        </ReactFlow>
      </div>
    </div>
  );
};
