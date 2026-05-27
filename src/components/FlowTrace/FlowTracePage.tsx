import React, { useMemo } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import dayjs from 'dayjs';
import { FlowTraceHeader } from './FlowTraceHeader';
import { KpiSummaryStrip } from './KpiSummaryStrip';
import { SourceInboxPanel } from './SourceInboxPanel';
import { FlowSwimlaneBoard } from './FlowSwimlaneBoard';
import { FlowAnalyticsPanel } from './FlowAnalyticsPanel';
import { FlowOptimizationPanel } from './FlowOptimizationPanel';
import { FlowNodeDetailDrawer } from './FlowNodeDetailDrawer';
import { EscalationReportingBoard } from './EscalationReportingBoard';
import { useFlowTraceStore } from '@/src/store/flowTraceStore';
import { MOCK_DATA_I18N } from '@/src/i18n/mock_data';
import { useLanguage } from '@/src/context/LanguageContext';

export const FlowTracePage: React.FC = () => {
  const { language } = useLanguage();
  const MOCK_FLOW_DATA = MOCK_DATA_I18N[language];

  const {
    activeFlowType,
    setActiveFlowType,
    selectedSourceId,
    setSelectedSourceId,
    selectedNodeId,
    setSelectedNodeId,
    optimizationOptions,
    toggleOptimizationOption,
    isInboxVisible,
    isAnalyticsVisible,
    isOptimizationVisible,
  } = useFlowTraceStore();

  const isEscalationMode = activeFlowType === 'escalation';

  const escalationData = useMemo(() => {
    if (!MOCK_FLOW_DATA?.reportingData) return { lanes: [], nodes: [], edges: [] };
    
    const lanes: any[] = MOCK_FLOW_DATA.reportingData.zones.map(zone => ({
      id: zone.id,
      label: zone.title,
      order: zone.order,
      type: 'custom'
    }));

    const nodes: any[] = [];
    const edges: any[] = [];
    
    let currentTime = dayjs('2026-03-21T03:00:00Z');

    MOCK_FLOW_DATA.reportingData.zones.forEach((zone) => {
      zone.cards.forEach((card) => {
        const enterAt = currentTime.toISOString();
        const exitAt = currentTime.add(card.totalDurationMs, 'ms').toISOString();
        
        nodes.push({
          id: card.id,
          chainId: 'escalation',
          laneId: zone.id,
          title: card.title,
          enterAt,
          exitAt,
          durationMs: card.totalDurationMs,
          owner: card.owner,
          action: card.isDetailed ? 'Detailed Audit' : 'Process Handling',
          status: card.status === 'rejected' ? 'delayed' : card.status,
          approvalCount: card.isDetailed ? 3 : 1,
          systemName: 'Escalation Management System',
          sourceIds: [],
          outputNodeIds: [],
          delayReason: card.delayReason || card.returnReason,
          isBottleneck: card.isBottleneck,
          type: 'reportingNode',
          data: card 
        });

        currentTime = currentTime.add(card.totalDurationMs + 1800000, 'ms'); 
      });
    });

    MOCK_FLOW_DATA.reportingData.connections.forEach((conn) => {
      edges.push({
        id: conn.id,
        chainId: 'escalation',
        source: conn.sourceCardId,
        target: conn.targetCardId,
        relation: conn.type === 'reverse' ? 'returned' : 'escalated',
        isCriticalPath: conn.type === 'forward',
        label: conn.label
      });
    });

    return { lanes, nodes, edges };
  }, [MOCK_FLOW_DATA]);

  const filteredNodes = useMemo(() => {
    if (!MOCK_FLOW_DATA) return [];
    if (isEscalationMode) return escalationData.nodes;
    if (activeFlowType === 'all') return MOCK_FLOW_DATA.nodes || [];
    return (MOCK_FLOW_DATA.nodes || []).filter(n => {
      const chain = MOCK_FLOW_DATA.chains?.find(c => c.id === n.chainId);
      return chain?.type === activeFlowType;
    });
  }, [activeFlowType, isEscalationMode, escalationData, MOCK_FLOW_DATA]);

  const filteredEdges = useMemo(() => {
    if (!MOCK_FLOW_DATA) return [];
    if (isEscalationMode) return escalationData.edges;
    if (activeFlowType === 'all') return MOCK_FLOW_DATA.edges || [];
    return (MOCK_FLOW_DATA.edges || []).filter(e => {
      const chain = MOCK_FLOW_DATA.chains?.find(c => c.id === e.chainId);
      return chain?.type === activeFlowType;
    });
  }, [activeFlowType, isEscalationMode, escalationData, MOCK_FLOW_DATA]);

  const currentLanes = useMemo(() => {
    if (isEscalationMode) return escalationData.lanes;
    return MOCK_FLOW_DATA.lanes;
  }, [isEscalationMode, escalationData]);

  const selectedNode = useMemo(() => {
    // Check standard nodes first
    const standardNode = MOCK_FLOW_DATA.nodes.find(n => n.id === selectedNodeId);
    if (standardNode) return standardNode;

    // Check reporting cards
    if (MOCK_FLOW_DATA.reportingData) {
      for (const zone of MOCK_FLOW_DATA.reportingData.zones) {
        const card = zone.cards.find(c => c.id === selectedNodeId);
        if (card) {
          // Map ReportingCardData to FlowNode for the drawer
          return {
            id: card.id,
            chainId: 'escalation',
            laneId: card.zoneId,
            title: card.title,
            enterAt: new Date().toISOString(), // Mock
            exitAt: new Date().toISOString(), // Mock
            durationMs: card.totalDurationMs,
            owner: card.owner,
            action: card.isDetailed ? 'Detailed Audit' : 'Process Handling',
            status: card.status === 'rejected' ? 'delayed' : card.status,
            approvalCount: card.isDetailed ? 3 : 1,
            systemName: 'Escalation Management System',
            sourceIds: [],
            outputNodeIds: [],
            delayReason: card.delayReason || card.returnReason,
            isBottleneck: card.isBottleneck,
          };
        }
      }
    }
    return null;
  }, [selectedNodeId]);

  const currentTotalMs = MOCK_FLOW_DATA.chains.reduce((acc, c) => acc + c.totalDurationMs, 0);
  const estimatedSavingsMs = optimizationOptions
    .filter(opt => opt.enabled)
    .reduce((acc, opt) => acc + opt.estimatedSavingsMs, 0);
  const optimizedTotalMs = currentTotalMs - estimatedSavingsMs;

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <FlowTraceHeader
        title={language === 'zh' ? '事件数据流向追溯' : language === 'kk' ? 'ОҚИҒА ДЕРЕКТЕРІНІҢ АҒЫНЫН БАҚЫЛАУ' : 'Incident Data Flow Traceability'}
        subtitle={language === 'zh' ? '事件数据流向追溯' : language === 'kk' ? 'ОҚИҒА ДЕРЕКТЕРІНІҢ АҒЫНЫН БАҚЫЛАУ' : 'INCIDENT DATA FLOW TRACEABILITY'}
        caseName={MOCK_FLOW_DATA.event.title}
        mode="POST"
        activeFlowType={activeFlowType}
        onFlowTypeChange={setActiveFlowType}
      />

      <KpiSummaryStrip kpis={isEscalationMode ? (MOCK_FLOW_DATA.reportingData?.kpis || []) : MOCK_FLOW_DATA.kpis} />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: Source Inbox */}
        <AnimatePresence initial={false}>
          {isInboxVisible && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="z-30"
            >
              <SourceInboxPanel
                items={MOCK_FLOW_DATA.sources}
                selectedSourceId={selectedSourceId}
                onSelectSource={setSelectedSourceId}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Left Toggle Handle */}
        {!isInboxVisible && (
          <div 
            onClick={() => useFlowTraceStore.getState().setInboxVisible(true)}
            className="absolute left-0 top-0 bottom-0 w-8 bg-slate-900 border-r border-white/10 flex items-center justify-center cursor-pointer z-40 hover:bg-black transition-colors"
          >
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">
              {language === 'zh' ? '情报收件箱' : language === 'kk' ? 'БАРЛАУ КІРІС ЖӘШІГІ' : 'Intelligence Inbox'}
            </span>
          </div>
        )}

        {/* Main Board Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {isEscalationMode ? (
            <EscalationReportingBoard 
              data={MOCK_FLOW_DATA.reportingData!} 
              onCardClick={setSelectedNodeId}
            />
          ) : (
            <FlowSwimlaneBoard
              lanes={currentLanes}
              nodes={filteredNodes}
              edges={filteredEdges}
              selectedNodeId={selectedNodeId}
              onNodeClick={setSelectedNodeId}
            />
          )}
        </div>

        {/* Right Panel: Flow Analytics */}
        <AnimatePresence initial={false}>
          {isAnalyticsVisible && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="z-30"
            >
              <FlowAnalyticsPanel
                bottlenecks={MOCK_FLOW_DATA.bottlenecks}
                layerTimings={MOCK_FLOW_DATA.layerTimings}
                repeatedApprovals={MOCK_FLOW_DATA.repeatedApprovals}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Toggle Handle */}
        {!isAnalyticsVisible && (
          <div 
            onClick={() => useFlowTraceStore.getState().setAnalyticsVisible(true)}
            className="absolute right-0 top-0 bottom-0 w-8 bg-slate-900 border-l border-white/10 flex items-center justify-center cursor-pointer z-40 hover:bg-black transition-colors"
          >
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
              {language === 'zh' ? '流程分析' : language === 'kk' ? 'ПРОЦЕСС ТАЛДАУЫ' : 'Process Analytics'}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Panel: Optimization Simulator */}
      <div className="relative">
        <AnimatePresence initial={false}>
          {isOptimizationVisible && (
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="z-30"
            >
              <FlowOptimizationPanel
                options={optimizationOptions}
                currentTotalMs={currentTotalMs}
                optimizedTotalMs={optimizedTotalMs}
                estimatedSavingsMs={estimatedSavingsMs}
                onToggleOption={toggleOptimizationOption}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Toggle Handle */}
        {!isOptimizationVisible && (
          <div 
            onClick={() => useFlowTraceStore.getState().setOptimizationVisible(true)}
            className="h-8 bg-slate-900 border-t border-white/10 flex items-center justify-center cursor-pointer hover:bg-black transition-colors"
          >
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              {language === 'zh' ? '优化模拟器' : language === 'kk' ? 'ОПТИМИЗАЦИЯ СИМУЛЯТОРЫ' : 'Optimization Simulator'}
            </span>
          </div>
        )}
      </div>

      <FlowNodeDetailDrawer
        open={!!selectedNodeId}
        node={selectedNode as any}
        onClose={() => setSelectedNodeId(null)}
      />
    </div>
  );
};
