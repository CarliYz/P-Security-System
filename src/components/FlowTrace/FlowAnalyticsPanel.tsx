import React from 'react';
import { BottleneckItem, LayerTimingItem, ApprovalFrictionItem } from './types';
import { cn } from '@/src/lib/utils';
import ReactECharts from 'echarts-for-react';
import { AlertTriangle, Clock, ShieldCheck, Zap, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { useFlowTraceStore } from '@/src/store/flowTraceStore';

interface FlowAnalyticsPanelProps {
  bottlenecks: BottleneckItem[];
  layerTimings: LayerTimingItem[];
  repeatedApprovals: ApprovalFrictionItem[];
}

export const FlowAnalyticsPanel: React.FC<FlowAnalyticsPanelProps> = ({
  bottlenecks,
  layerTimings,
  repeatedApprovals,
}) => {
  const { toggleAnalytics } = useFlowTraceStore();

  const timingChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'category',
      data: layerTimings.map(t => t.laneLabel),
      axisLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#94a3b8'
      },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'Total Time',
        type: 'bar',
        data: layerTimings.map(t => t.totalMs / 60000),
        itemStyle: {
          color: '#000'
        },
        barWidth: '40%'
      }
    ]
  };

  return (
    <div className="w-[280px] border-l border-slate-200 flex flex-col bg-slate-50/30 overflow-hidden transition-all duration-300">
      <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={toggleAnalytics}
        >
          <BarChart3 className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
          <h3 className="text-[9px] font-black uppercase tracking-[0.1em] text-black font-mono">Process Analytics</h3>
        </div>
        <button onClick={toggleAnalytics} className="p-1 hover:bg-slate-100 rounded transition-colors">
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-thin">
        {/* Bottleneck Ranking */}
        <section className="space-y-3">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-status-red" />
            <h4 className="text-[9px] font-black uppercase tracking-widest text-black font-mono">Bottleneck Ranking</h4>
          </div>
          <div className="space-y-2">
            {bottlenecks.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white border border-slate-200 flex flex-col gap-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black text-slate-400 uppercase font-mono">{item.laneLabel}</span>
                  <span className="text-[8px] font-black text-status-red font-mono">{Math.round(item.durationMs / 60000)}m</span>
                </div>
                <div className="text-[10px] font-black text-black uppercase tracking-tight font-mono">{item.label}</div>
                <div className="text-[8px] text-slate-500 font-bold font-mono leading-tight italic">"{item.reason}"</div>
                <div className="flex items-center gap-1 text-[8px] font-black text-status-green font-mono mt-0.5">
                  <Zap className="w-2.5 h-2.5" />
                  Est. Savings: {Math.round(item.savingsPotentialMs / 60000)}m
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Layer Timing Chart */}
        <section className="space-y-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-black" />
            <h4 className="text-[9px] font-black uppercase tracking-widest text-black font-mono">Layer Timing (mins)</h4>
          </div>
          <div className="h-40">
            <ReactECharts option={timingChartOption} style={{ height: '100%' }} />
          </div>
        </section>

        {/* Repeated Approvals */}
        <section className="space-y-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-status-yellow" />
            <h4 className="text-[9px] font-black uppercase tracking-widest text-black font-mono">Approval Friction</h4>
          </div>
          <div className="space-y-1.5">
            {repeatedApprovals.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 border-b border-slate-100 last:border-0">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-black uppercase font-mono">{item.label}</span>
                  <span className="text-[7px] font-bold text-slate-400 uppercase font-mono">{item.laneLabel}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-status-yellow font-mono">x{item.approvalCount}</span>
                  <span className="text-[7px] font-bold text-slate-400 font-mono">+{Math.round(item.extraDelayMs / 60000)}m</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
