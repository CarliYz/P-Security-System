import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Clock, 
  Award, 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  Briefcase,
  GraduationCap,
  Plane
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

interface PersonnelLedgerProps {
  selectedPersonId: string | null;
  onSelectPerson: (id: string) => void;
}

export const PersonnelLedger: React.FC<PersonnelLedgerProps> = ({ selectedPersonId, onSelectPerson }) => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].policePersonnel.ledger;
  const [expandedSection, setExpandedSection] = useState<string | null>('units');
  const [is102Expanded, setIs102Expanded] = useState(false);

  const stats = [
    { label: t.active, value: '14,500', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t.standby, value: '5,200', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
    { label: t.onLeave, value: '3,500', icon: UserCheck, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: t.inTraining, value: '1,800', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const policeTypes = [
    { name: t.types.publicSecurity, unit: t.types.municipalDirect, count: 8420 },
    { name: t.types.trafficPolice, unit: t.types.trafficBureau, count: 4150 },
    { name: t.types.criminalInvestigation, unit: t.types.cid, count: 3780 },
    { name: t.types.swat, unit: t.types.specialOps, count: 1420 },
    { name: t.types.cyberSecurity, unit: t.types.cyberBureau, count: 760 },
    { name: t.types.narcotics, unit: t.types.narcoticsBureau, count: 1180 },
    { name: t.types.internalAdmin, unit: t.types.generalOffice, count: 5290 },
  ];

  const units = [
    { id: '102', name: t.districts.district102, count: 1245 },
    { id: 'bostandyk', name: t.districts.bostandyk, count: 3080 },
    { id: 'zhetysu', name: t.districts.zhetysu, count: 2750 },
    { id: 'medeu', name: t.districts.medeu, count: 3420 },
    { id: 'turksib', name: t.districts.turksib, count: 2890 },
    { id: 'alatau', name: t.districts.alatau, count: 2680 },
    { id: 'airport', name: t.districts.airport, count: 1280 },
    { id: 'nauryzbay', name: t.districts.nauryzbay, count: 1650 },
  ];

  const roster102 = [
    { 
      id: 'baurzhan', 
      name: language === 'zh' ? '包尔江 K.' : language === 'kk' ? 'Бауыржан Қ.' : 'Baurzhan K.', 
      rank: language === 'zh' ? '副局长' : language === 'kk' ? 'Бастықтың орынбасары' : 'Deputy Director', 
      dept: t.types.criminalInvestigation,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200',
      tags: [t.tags.assetAnomaly, t.tags.abuseOfPower, t.tags.gangSuspect],
      status: 'CRITICAL'
    },
    { 
      id: 'alikhan', 
      name: language === 'zh' ? '阿里汗 S.' : language === 'kk' ? 'Әлихан С.' : 'Alikhan S.', 
      rank: language === 'zh' ? '队长' : language === 'kk' ? 'Капитан' : 'Captain', 
      dept: t.types.trafficPolice,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      tags: [t.tags.frequentComplaints, t.tags.disciplinedSlack],
      status: 'CRITICAL'
    },
    { 
      id: 'timur', 
      name: language === 'zh' ? '提木尔 M.' : language === 'kk' ? 'Тимур М.' : 'Timur M.', 
      rank: language === 'zh' ? '督察' : language === 'kk' ? 'Инспектор' : 'Inspector', 
      dept: t.types.publicSecurity,
      avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200',
      tags: [t.tags.poorPerformance, t.tags.unstableEmotion],
      status: 'NORMAL'
    },
    { 
      id: 'serik', 
      name: language === 'zh' ? '赛里克 B.' : language === 'kk' ? 'Серік Б.' : 'Serik B.', 
      rank: language === 'zh' ? '巡警' : language === 'kk' ? 'Патрульдік' : 'Patrol Officer', 
      dept: t.types.publicSecurity,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      tags: [t.tags.illegalExit, t.tags.abuseOfPower],
      status: 'CRITICAL'
    },
    { 
      id: 'yerlan', 
      name: language === 'zh' ? '叶尔兰 A.' : 'Yerlan A.', 
      rank: language === 'zh' ? '登记员' : 'Registrar', 
      dept: language === 'zh' ? '内部行政' : 'Internal Admin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      tags: language === 'zh' ? ['资产不明'] : ['Unknown Assets'],
      status: 'NORMAL'
    },
  ];

  const globalHighRisk = [
    roster102[0],
    roster102[1],
    roster102[3]
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-100 overflow-hidden">
      {/* Upper - Global Stats */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{t.forceStatus}</h3>
            <div className="text-2xl font-bold tracking-tighter">25,000 <span className="text-[10px] font-normal text-slate-400">{t.stats.total}</span></div>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-100">
            <Users className="w-4 h-4 text-slate-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-1.5">
          {stats.map((stat) => (
            <div key={stat.label} className="p-2 border border-slate-100 rounded bg-white hover:border-slate-200 transition-all">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className={cn("w-1 h-1 rounded-full", stat.bg.replace('bg-', 'bg-').replace('50', '500'))} />
                <span className="text-[8px] text-slate-500 uppercase">{stat.label}</span>
              </div>
              <div className="text-xs font-mono font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle - Structure Accordion */}
      <div className="flex-1 overflow-y-auto scroll-thin p-4 space-y-4">
        <div className="space-y-1.5">
          {/* Section 1: Police Types */}
          <div className="border border-slate-100 rounded overflow-hidden">
            <button 
              onClick={() => setExpandedSection(expandedSection === 'types' ? null : 'types')}
              className="w-full flex items-center justify-between p-2 bg-slate-50/50 hover:bg-slate-100 transition-colors border-b border-slate-100 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-3 h-3 text-slate-400" />
                <span className="text-[9px] font-bold uppercase tracking-tight text-slate-500">{t.statsByType}</span>
              </div>
              {expandedSection === 'types' ? <ChevronDown className="w-3 h-3 text-slate-300" /> : <ChevronRight className="w-3 h-3 text-slate-300" />}
            </button>
            <AnimatePresence>
              {expandedSection === 'types' && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden bg-white"
                >
                  <div className="p-1 space-y-0.5">
                    {policeTypes.map((type) => (
                      <div key={type.name} className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded transition-colors">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-600">{type.name}</span>
                          <span className="text-[7px] text-slate-400 uppercase">{t.unit}: {type.unit}</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-slate-400">{type.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 2: Units */}
          <div className="border border-slate-100 rounded overflow-hidden">
            <button 
              onClick={() => setExpandedSection(expandedSection === 'units' ? null : 'units')}
              className="w-full flex items-center justify-between p-2 bg-slate-50/50 hover:bg-slate-100 transition-colors border-b border-slate-100 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-slate-400" />
                <span className="text-[9px] font-bold uppercase tracking-tight text-slate-500">{t.statsByDistrict}</span>
              </div>
              {expandedSection === 'units' ? <ChevronDown className="w-3 h-3 text-slate-300" /> : <ChevronRight className="w-3 h-3 text-slate-300" />}
            </button>
            <AnimatePresence>
              {expandedSection === 'units' && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden bg-white"
                >
                  <div className="p-1 space-y-0.5">
                    {units.map((unit) => (
                      <div key={unit.id} className="space-y-0.5">
                        <button 
                          onClick={() => unit.id === '102' && setIs102Expanded(!is102Expanded)}
                          className={cn(
                            "w-full flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded transition-all",
                            unit.id === '102' && is102Expanded && "bg-slate-50"
                          )}
                        >
                          <span className="text-[9px] font-bold text-slate-600">{unit.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-bold text-slate-400">{unit.count.toLocaleString()}</span>
                            {unit.id === '102' && (is102Expanded ? <ChevronDown className="w-2.5 h-2.5 text-slate-300" /> : <ChevronRight className="w-2.5 h-2.5 text-slate-300" />)}
                          </div>
                        </button>
                        
                        {unit.id === '102' && is102Expanded && (
                          <div className="ml-1 pl-1 border-l border-slate-100 space-y-1 py-1">
                            {roster102.map((person) => (
                              <button 
                                key={person.id} 
                                onClick={() => onSelectPerson(person.id)}
                                className={cn(
                                  "w-full flex items-center gap-2 p-1 rounded transition-all text-left",
                                  selectedPersonId === person.id ? "bg-slate-100 border border-slate-200" : "hover:bg-slate-50 border border-transparent"
                                )}
                              >
                                <div className="w-6 h-6 rounded border border-slate-200 overflow-hidden shrink-0">
                                  <img src={person.avatar} alt={person.name} className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-bold text-slate-700">{person.name}</span>
                                    <span className="text-[6px] text-slate-400 uppercase">{person.rank}</span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lower - High Risk List (Linked to Unit Selection) */}
      <div className={cn(
        "p-4 border-t border-slate-100 bg-slate-50/20 transition-all duration-500",
        is102Expanded ? "h-[240px]" : "h-0 opacity-0 pointer-events-none"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-status-red" />
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-status-red">
              {t.keyAnomalies}
            </h3>
          </div>
          <span className="text-[6px] font-mono text-slate-400 bg-slate-100 px-1 rounded">{t.unitFocus}</span>
        </div>

        <div className="space-y-1.5 overflow-y-auto scroll-thin h-[calc(100%-24px)]">
          {roster102.filter(p => p.status === 'CRITICAL').map((person) => (
            <button
              key={person.id}
              onClick={() => onSelectPerson(person.id)}
              className={cn(
                "w-full border rounded transition-all relative group overflow-hidden p-1.5",
                selectedPersonId === person.id 
                  ? "bg-white border-slate-300 shadow-sm" 
                  : "bg-white/50 border-slate-100 hover:border-slate-200"
              )}
            >
              <div className="flex gap-2.5 items-center">
                <div className={cn(
                  "w-8 h-8 rounded border overflow-hidden shrink-0 transition-all duration-500",
                  person.status === 'CRITICAL' ? "border-status-red/50" : "border-slate-100"
                )}>
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className={cn(
                      "w-full h-full object-cover grayscale transition-all group-hover:grayscale-0",
                      selectedPersonId === person.id && "grayscale-0"
                    )}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-[9px]">{person.name}</span>
                      <span className="text-[7px] text-slate-400">{person.dept} | {person.rank}</span>
                    </div>
                    <span className={cn(
                      "text-[6px] font-mono px-1 rounded",
                      person.status === 'CRITICAL' ? "bg-status-red text-white" : "bg-slate-100 text-slate-500"
                    )}>{person.status === 'CRITICAL' ? t.critical : t.normal}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {person.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className={cn(
                          "px-1 rounded font-bold border whitespace-nowrap",
                          ['Asset Anomaly', 'Abuse of Power', 'Gang Suspect', 'Illegal Exit', '资产异常', '滥用职权', '团伙嫌疑', '非法出境'].includes(tag)
                            ? "bg-status-red/5 text-status-red border-status-red/10 text-[10px]" 
                            : "bg-slate-50 text-slate-400 border-slate-100 text-[6px]"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
