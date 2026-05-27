import React, { useEffect, useRef, useMemo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { useOntologyStore } from './useOntologyStore';
import { generateMockData } from './mockData';
import { cn } from '@/src/lib/utils';

const STYLESHEET: any[] = [
  {
    selector: 'node',
    style: {
      'shape': 'round-rectangle',
      'background-color': '#ffffff',
      'border-width': 1,
      'border-color': '#d7dde6',
      'label': 'data(label)',
      'font-size': 9,
      'font-weight': 'bold',
      'color': '#1e293b',
      'text-wrap': 'wrap',
      'text-max-width': 80,
      'text-valign': 'center',
      'text-halign': 'center',
      'width': 100,
      'height': 40,
      'padding': '10px',
      'text-margin-y': 0,
    }
  },
  {
    selector: 'node[riskLevel = "high"]',
    style: {
      'border-color': '#ef4444',
      'border-width': 2,
      'background-color': '#fef2f2',
    }
  },
  {
    selector: 'node[riskLevel = "medium"]',
    style: {
      'border-color': '#f59e0b',
      'border-width': 1.5,
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-color': '#000000',
      'border-width': 2,
      'shadow-blur': 10,
      'shadow-color': '#000000',
      'shadow-opacity': 0.2,
    }
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'width': 1,
      'line-color': '#cbd5e1',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#cbd5e1',
      'label': 'data(label)',
      'font-size': 7,
      'color': '#64748b',
      'text-background-color': '#ffffff',
      'text-background-opacity': 0.8,
      'text-background-padding': 2,
      'arrow-scale': 0.8,
    }
  },
  {
    selector: 'edge[confidence = "inferred"]',
    style: {
      'line-style': 'dashed',
      'line-color': '#94a3b8'
    }
  },
  {
    selector: 'edge[confidence = "alleged"]',
    style: {
      'line-style': 'dashed',
      'line-color': '#ef4444',
      'color': '#ef4444'
    }
  },
  {
    selector: '.highlighted',
    style: {
      'line-color': '#000000',
      'width': 2,
      'target-arrow-color': '#000000',
      'z-index': 999
    }
  },
  {
    selector: '.faded',
    style: {
      'opacity': 0.1,
      'events': 'no'
    }
  }
];

export const OntologyGraphCanvas: React.FC = () => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const { 
    setSelectedNode, 
    setHoveredNode, 
    activeFilters, 
    searchKeyword 
  } = useOntologyStore();

  const { nodes, edges } = useMemo(() => generateMockData(), []);

  const elements = useMemo(() => {
    const filteredNodes = nodes.filter(n => 
      activeFilters.visibleClusters.includes(n.clusterId) &&
      (searchKeyword === '' || n.label.toLowerCase().includes(searchKeyword.toLowerCase()))
    );

    const nodeIds = new Set(filteredNodes.map(n => n.id));

    const filteredEdges = edges.filter(e => 
      nodeIds.has(e.source) && nodeIds.has(e.target) &&
      ((e.confidence === 'confirmed' && activeFilters.showConfirmed) ||
       (e.confidence === 'inferred' && activeFilters.showInferred) ||
       (e.confidence === 'alleged' && activeFilters.showAlleged))
    );

    return [
      ...filteredNodes.map(n => ({
        data: { ...n },
        position: n.position
      })),
      ...filteredEdges.map(e => ({
        data: { ...e }
      }))
    ];
  }, [nodes, edges, activeFilters, searchKeyword]);

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;

      cy.on('tap', 'node', (evt) => {
        setSelectedNode(evt.target.id());
      });

      cy.on('tap', (evt) => {
        if (evt.target === cy) {
          setSelectedNode(null);
        }
      });

      cy.on('mouseover', 'node', (evt) => {
        setHoveredNode(evt.target.id());
        const node = evt.target;
        cy.elements().addClass('faded');
        node.neighborhood().add(node).removeClass('faded').addClass('highlighted');
      });

      cy.on('mouseout', 'node', () => {
        setHoveredNode(null);
        cy.elements().removeClass('faded highlighted');
      });
    }
  }, [setSelectedNode, setHoveredNode]);

  return (
    <div className="w-full h-full relative bg-slate-50 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
        backgroundSize: '20px 20px' 
      }} />
      
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={STYLESHEET}
        cy={(cy) => { cyRef.current = cy; }}
        layout={{ name: 'preset' }}
        zoom={0.8}
        minZoom={0.2}
        maxZoom={2}
      />
    </div>
  );
};
