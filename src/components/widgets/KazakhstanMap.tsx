import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Car, 
  User, 
  Smartphone, 
  Camera, 
  Shield,
  MapPin,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { ExecutiveDecisionDrawer } from './ExecutiveDecisionDrawer';

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

const PROVINCES = [
  { name: 'Astana', coords: [51.2, 71.5] as [number, number] },
  { name: 'Almaty', coords: [43.8, 76.2] as [number, number] },
  { name: 'Shymkent', coords: [42.8, 69.8] as [number, number] },
  { name: 'Karaganda', coords: [49.5, 73.5] as [number, number] },
  { name: 'Aktobe', coords: [49.8, 57.5] as [number, number] },
  { name: 'Taraz', coords: [43.2, 71.0] as [number, number] },
  { name: 'Pavlodar', coords: [52.0, 76.5] as [number, number] },
  { name: 'Ust-Kamenogorsk', coords: [49.5, 82.0] as [number, number] },
  { name: 'Semey', coords: [50.0, 80.5] as [number, number] },
  { name: 'Atyrau', coords: [47.5, 52.5] as [number, number] },
  { name: 'Kostanay', coords: [53.0, 64.0] as [number, number] },
  { name: 'Kyzylorda', coords: [45.2, 65.8] as [number, number] },
  { name: 'Uralsk', coords: [50.8, 51.8] as [number, number] },
  { name: 'Petropavl', coords: [54.5, 69.5] as [number, number] },
  { name: 'Aktau', coords: [44.2, 51.5] as [number, number] },
  { name: 'Kokshetau', coords: [53.0, 69.8] as [number, number] },
  { name: 'Taldykorgan', coords: [45.5, 78.0] as [number, number] },
  { name: 'Turkistan', coords: [43.8, 68.5] as [number, number] },
];

const ASSET_TYPES = [
  { id: 'police-vehicles', name: 'VEH', icon: Car },
  { id: 'police-personnel', name: 'PER', icon: User },
  { id: 'police-equipment', name: 'EQP', icon: Smartphone },
  { id: 'traffic-network', name: 'NET', icon: Camera },
];

export const KazakhstanMap: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  const provinceData = useMemo(() => {
    return PROVINCES.map(province => {
      // Always show all 4 elements for a consistent "four contents" look
      const elements = ASSET_TYPES.map(type => ({
        ...type,
        count: Math.floor(Math.random() * 1000) + 50,
        readiness: Math.floor(Math.random() * 9) + 1
      }));
      
      return {
        ...province,
        elements
      };
    });
  }, []);

  return (
    <div className="relative w-full h-full bg-white overflow-hidden border border-black rounded">
      <MapContainer 
        center={[48.0196, 66.9237]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {provinceData.map((province, idx) => (
          <Marker 
            key={idx} 
            position={province.coords}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="bg-white/60 backdrop-blur-[2px] border border-slate-200/60 p-2 rounded shadow-sm flex flex-col items-start pointer-events-none min-w-[100px]">
                <div class="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5 border-b border-slate-200 pb-0.5 w-full">
                  ${province.name}
                </div>
                <div class="flex flex-col gap-1.5 w-full">
                  ${province.elements.map(el => {
                    const readiness = el.readiness;
                    const color = readiness >= 7 ? '#22c55e' : readiness >= 4 ? '#eab308' : '#ef4444';
                    // Bars ordered 9 to 1 (left to right)
                    // Filling from the right (shortest bars first)
                    const bars = [9,8,7,6,5,4,3,2,1].map((h, i) => {
                      const active = i >= (9 - readiness);
                      return `<div style="height: ${h}px; width: 1.5px; background-color: ${active ? color : '#cbd5e1'}"></div>`;
                    }).join('');

                    return `
                      <div class="flex items-center gap-2 justify-between">
                        <div class="flex items-center gap-1">
                          <svg class="w-2.5 h-2.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            ${el.id === 'police-vehicles' ? '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>' : ''}
                            ${el.id === 'police-personnel' ? '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' : ''}
                            ${el.id === 'police-equipment' ? '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>' : ''}
                            ${el.id === 'traffic-network' ? '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>' : ''}
                          </svg>
                          <span class="text-[7px] font-mono font-bold text-slate-500">${el.name}</span>
                        </div>
                        <div class="flex items-end gap-0.5 h-3">
                          ${bars}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>`,
              iconSize: [100, 80],
              iconAnchor: [50, 40]
            })}
          />
        ))}
      </MapContainer>

      {/* Map Overlays */}
      <div className="absolute top-6 left-0 z-[1000] pointer-events-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => setIsDrawerOpen(true)}
          className="bg-red-600 text-white px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-red-700 transition-all shadow-[4px_0_15px_rgba(220,38,38,0.3)] group"
        >
          <div className="relative">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">System Anomaly</span>
            <span className="text-sm font-black uppercase tracking-tight leading-none">Pending Decisions (5)</span>
          </div>
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </div>

      <ExecutiveDecisionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
        <div className="bg-white/80 backdrop-blur-md border border-black p-3 rounded shadow-lg">
          <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-black/5 pb-1">
            Legend
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {ASSET_TYPES.map(asset => (
              <div key={asset.id} className="flex items-center gap-2">
                <div className="p-1 rounded bg-slate-100">
                  <asset.icon className="w-3 h-3 text-black" />
                </div>
                <span className="text-[9px] font-bold text-slate-600">{asset.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Coordinates Display */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-black text-white px-2 py-1 rounded font-mono text-[8px] tracking-widest opacity-50">
        48.0196° N, 66.9237° E
      </div>
    </div>
  );
};
