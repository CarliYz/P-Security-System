import { OntologyNode, OntologyEdge } from './types';

const CLUSTERS = [
  { id: 'cluster_core_people', name: 'CORE PERSONS', region: 'center' },
  { id: 'cluster_vehicle_infra', name: 'VEHICLE & INFRA', region: 'top' },
  { id: 'cluster_unknown_network', name: 'UNKNOWN NETWORK', region: 'left' },
  { id: 'cluster_nightlife_comms_finance', name: 'NIGHTLIFE / COMMS / TRANSFER', region: 'lower-left' },
  { id: 'cluster_victim_context', name: 'VICTIM CONTEXT', region: 'lower-right' },
  { id: 'cluster_media_institution', name: 'MEDIA / OVERSIGHT / RESPONSE', region: 'right' },
];

export const generateMockData = () => {
  const nodes: OntologyNode[] = [];
  const edges: OntologyEdge[] = [];

  // Helper to get random position in region with extreme spread to avoid overlap
  const getPos = (region: string) => {
    // Virtual canvas size 4000x3000
    // Grid 3x3 mapping:
    // 1 2 3
    // 4 5 6
    // 7 8 9
    const grid = {
      1: { x: 666, y: 500 },
      2: { x: 2000, y: 500 },
      3: { x: 3333, y: 500 },
      4: { x: 666, y: 1500 },
      5: { x: 2000, y: 1500 },
      6: { x: 3333, y: 1500 },
      7: { x: 666, y: 2500 },
      8: { x: 2000, y: 2500 },
      9: { x: 3333, y: 2500 }
    };

    const target = grid[region as unknown as keyof typeof grid] || grid[5];
    return {
      x: target.x + (Math.random() - 0.5) * 800,
      y: target.y + (Math.random() - 0.5) * 600
    };
  };

  // 1. Core People (Center - Region 5)
  const corePeople = [
    { id: 'p_pak', label: 'Alexander Pak', sublabel: 'Suspect / Driver', risk: 'high', type: 'person' },
    { id: 'p_deputy', label: 'Deputy Dir. V', sublabel: 'Police Official', risk: 'high', type: 'person' },
    { id: 'p_associate_1', label: 'Associate X', sublabel: 'Financial Handler', risk: 'medium', type: 'person' },
    { id: 'p_associate_2', label: 'Associate Y', sublabel: 'Logistics', risk: 'medium', type: 'person' },
  ];

  corePeople.forEach(p => {
    nodes.push({
      id: p.id,
      label: p.label,
      sublabel: p.sublabel,
      type: p.type as any,
      clusterId: 'cluster_core_people',
      confidence: 'confirmed',
      riskLevel: p.risk as any,
      position: getPos('5'),
      meta: {}
    });
  });

  // 2. Vehicles (Region 1)
  const vehicles = [
    { id: 'v_zeekr', label: 'Zeekr 001 FR', sublabel: 'KZ 102 POL (Fake)', type: 'vehicle' },
    { id: 'v_mercedes', label: 'Mercedes E-Class', sublabel: 'Victim Vehicle', type: 'vehicle' },
    { id: 'v_unknown_1', label: 'Unknown Racer A', sublabel: 'Black Sedan', type: 'vehicle' },
    { id: 'v_unknown_2', label: 'Unknown Racer B', sublabel: 'White Coupe', type: 'vehicle' },
  ];

  vehicles.forEach(v => {
    nodes.push({
      id: v.id,
      label: v.label,
      sublabel: v.sublabel,
      type: 'vehicle',
      clusterId: 'cluster_vehicle_infra',
      confidence: 'confirmed',
      position: getPos('1'),
      meta: {}
    });
    // Ensure connection to core suspect
    edges.push({
      id: `e_v_${v.id}_pak`,
      source: v.id,
      target: 'p_pak',
      label: 'driven_by',
      confidence: 'confirmed',
      relationType: 'usage'
    });
  });

  // 3. Infrastructure - Camera (Region 2)
  for (let i = 1; i <= 10; i++) {
    const id = `cam_${i}`;
    nodes.push({
      id,
      label: `VMS-CAM-${i.toString().padStart(3, '0')}`,
      sublabel: 'Traffic Monitoring',
      type: 'camera',
      clusterId: 'cluster_vehicle_infra',
      confidence: 'confirmed',
      position: getPos('2'),
      meta: {}
    });
    edges.push({
      id: `e_cam_${i}_v`,
      source: id,
      target: 'v_zeekr',
      label: 'captured',
      confidence: 'confirmed',
      relationType: 'observation'
    });
  }

  // 4. Infrastructure - Base Station (Region 3)
  for (let i = 1; i <= 8; i++) {
    const id = `bs_${i}`;
    nodes.push({
      id,
      label: `Base Station ${i}`,
      sublabel: 'LTE/5G Node',
      type: 'base_station',
      clusterId: 'cluster_vehicle_infra',
      confidence: 'confirmed',
      position: getPos('3'),
      meta: {}
    });
    edges.push({
      id: `e_bs_${i}_pak`,
      source: id,
      target: 'p_pak',
      label: 'signal_link',
      confidence: 'confirmed',
      relationType: 'observation'
    });
  }

  // 5. Digital Assets - Phone/Device (Region 4)
  for (let i = 1; i <= 10; i++) {
    const id = `dev_${i}`;
    nodes.push({
      id,
      label: `Device ${i + 100}`,
      sublabel: 'Mobile Terminal',
      type: i % 2 === 0 ? 'phone' : 'device',
      clusterId: 'cluster_unknown_network',
      confidence: 'confirmed',
      position: getPos('4'),
      meta: {}
    });
    edges.push({
      id: `e_dev_${i}_pak`,
      source: id,
      target: 'p_pak',
      label: 'owned_by',
      confidence: 'confirmed',
      relationType: 'ownership'
    });
  }

  // 6. Spatial (Region 6)
  const locations = [
    { id: 'loc_alfarabi', label: 'Al-Farabi Ave', sublabel: 'Incident Location', type: 'location' },
    { id: 'loc_mendikulov', label: 'Mendikulov St', sublabel: 'Intersection', type: 'location' },
  ];
  locations.forEach(l => {
    nodes.push({
      id: l.id,
      label: l.label,
      sublabel: l.sublabel,
      type: 'location',
      clusterId: 'cluster_vehicle_infra',
      confidence: 'confirmed',
      position: getPos('6'),
      meta: {}
    });
    edges.push({
      id: `e_loc_${l.id}_pak`,
      source: 'p_pak',
      target: l.id,
      label: 'present_at',
      confidence: 'confirmed',
      relationType: 'spatial'
    });
  });

  // 7. Digital Assets - App/Bank/Transfer (Region 7 & 8)
  for (let i = 1; i <= 15; i++) {
    const id = `fin_${i}`;
    const type = i % 3 === 0 ? 'app_account' : (i % 3 === 1 ? 'bank_account' : 'transfer');
    nodes.push({
      id,
      label: `${type.replace('_', ' ').toUpperCase()} ${i}`,
      sublabel: 'Financial Node',
      type: type as any,
      clusterId: 'cluster_nightlife_comms_finance',
      confidence: 'confirmed',
      position: getPos(i % 2 === 0 ? '7' : '8'),
      meta: {}
    });
    edges.push({
      id: `e_fin_${i}_pak`,
      source: id,
      target: 'p_pak',
      label: 'financial_link',
      confidence: 'confirmed',
      relationType: 'finance'
    });
  }

  // 8. Others (Region 9)
  const others = [
    { id: 'org_racing', label: 'Underground Racing Club', type: 'organization' },
    { id: 'act_investigation', label: 'Operation Nightfall', type: 'investigation_action' },
    { id: 'hosp_central', label: 'Central Trauma Center', type: 'hospital_record' },
    { id: 'reg_traffic', label: 'Traffic Safety Act', type: 'regulation' },
  ];
  others.forEach(o => {
    nodes.push({
      id: o.id,
      label: o.label,
      sublabel: 'System Entity',
      type: o.type as any,
      clusterId: 'cluster_media_institution',
      confidence: 'confirmed',
      position: getPos('9'),
      meta: {}
    });
    edges.push({
      id: `e_other_${o.id}_pak`,
      source: o.id,
      target: 'p_pak',
      label: 'context_link',
      confidence: 'confirmed',
      relationType: 'generic'
    });
  });

  // Fill remaining to 300 with random but strictly connected nodes
  const allTypes: any[] = ['phone', 'device', 'bank_account', 'transfer', 'app_account', 'property'];
  for (let i = nodes.length; i < 300; i++) {
    const type = allTypes[Math.floor(Math.random() * allTypes.length)];
    const region = (Math.floor(Math.random() * 3) + 7).toString(); // Randomly in 7, 8, 9
    
    nodes.push({
      id: `node_${i}`,
      label: `${type.toUpperCase()} ${i}`,
      sublabel: 'Entity Detail',
      type,
      clusterId: 'cluster_unknown_network',
      confidence: 'confirmed',
      position: getPos(region),
      meta: {}
    });

    // Ensure connection
    edges.push({
      id: `edge_${i}`,
      source: `node_${i}`,
      target: nodes[Math.floor(Math.random() * 10)].id, // Connect to core nodes
      label: 'linked',
      confidence: 'confirmed',
      relationType: 'generic'
    });
  }

  return { nodes, edges };
};
