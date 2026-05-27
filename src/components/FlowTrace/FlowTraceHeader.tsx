import React from 'react';
import { FlowType } from './types';
import { cn } from '@/src/lib/utils';
import { Filter, Activity } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';

interface FlowTraceHeaderProps {
  title: string;
  subtitle: string;
  caseName: string;
  mode: 'POST' | 'AUDIT' | 'TRACE';
  activeFlowType: FlowType;
  onFlowTypeChange: (type: FlowType) => void;
}

export const FlowTraceHeader: React.FC<FlowTraceHeaderProps> = ({
  title,
  subtitle,
  caseName,
  mode,
  activeFlowType,
  onFlowTypeChange,
}) => {
  const { language } = useLanguage();

  const flowTypes: { label: string; value: FlowType }[] = [
    { label: language === 'zh' ? '全链条' : language === 'kk' ? 'БАРЛЫҚ ТІЗБЕКТЕР' : 'All Chains', value: 'all' },
    { label: language === 'zh' ? '升级流程' : language === 'kk' ? 'ЭСКАЛАЦИЯ' : 'Escalation', value: 'escalation' },
    { label: language === 'zh' ? '社交媒体' : language === 'kk' ? 'ӘЛЕУМЕТТІК ЖЕЛІ' : 'Social Media', value: 'social' },
    { label: language === 'zh' ? '网页舆情' : language === 'kk' ? 'ВЕБ-ПІКІР' : 'Web Sentiment', value: 'web' },
    { label: language === 'zh' ? '警务内网' : language === 'kk' ? 'ПОЛИЦИЯ ІШКІ ЖЕЛІСІ' : 'Police Intranet', value: 'police_internal' },
  ];

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-200 bg-white px-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-black uppercase tracking-tighter text-black font-mono">{title}</h1>
          <span className="bg-black text-white px-1.5 py-0.5 text-[8px] font-black tracking-widest font-mono">{mode}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em] font-mono">{subtitle}</span>
          <div className="h-2 w-px bg-slate-200" />
          <span className="text-[8px] font-black text-black uppercase tracking-tight font-mono">{language === 'zh' ? '案件' : language === 'kk' ? 'ІС' : 'Case'}: {caseName}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-slate-50 p-0.5 border border-slate-200">
          <Filter className="w-3 h-3 text-slate-400 ml-1.5" />
          {flowTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onFlowTypeChange(type.value)}
              className={cn(
                "px-2.5 py-1 text-[8px] font-black uppercase tracking-widest transition-all",
                activeFlowType === type.value
                  ? "bg-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-status-green/5 border border-status-green/20">
          <Activity className="w-3 h-3 text-status-green animate-pulse" />
          <span className="text-[8px] font-black text-status-green uppercase tracking-widest font-mono">{language === 'zh' ? '追踪引擎已激活' : language === 'kk' ? 'БАҚЫЛАУ ҚОЗҒАЛТҚЫШЫ БЕЛСЕНДІ' : 'Trace Engine Active'}</span>
        </div>
      </div>
    </div>
  );
};
