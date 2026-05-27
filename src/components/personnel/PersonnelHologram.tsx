import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Award, 
  Zap, 
  Activity, 
  AlertCircle, 
  FileText, 
  CreditCard, 
  Smartphone, 
  Globe, 
  Heart, 
  Lock, 
  Terminal,
  MapPin,
  Stethoscope,
  DollarSign,
  MessageSquare,
  UserCheck,
  Car,
  Users
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { PRE_EVENT_I18N } from '@/src/i18n/preEvent';

interface PersonnelHologramProps {
  personId: string | null;
}

export const PersonnelHologram: React.FC<PersonnelHologramProps> = ({ personId }) => {
  const { language } = useLanguage();
  const t = PRE_EVENT_I18N[language].policePersonnel.hologram;
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, [personId]);

  if (!personId) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50/50 text-slate-300 font-mono text-[10px] uppercase tracking-[0.3em]">
        {t.selectPersonnel}
      </div>
    );
  }

  // Mock Data for Baurzhan
  const profile = {
    name: language === 'zh' ? '包尔江. K' : language === 'kk' ? 'Бауыржан Қ.' : 'Baurzhan. K',
    rank: language === 'zh' ? '副局长级 / 二级警监' : language === 'kk' ? 'Бастықтың орынбасары / 2-дәрежелі полиция комиссары' : 'Deputy Director Level / Level 2 Police Commissioner',
    achievements: language === 'zh' ? '2021年反恐三等功 / 2026年内部警告' : language === 'kk' ? '2021 жылғы терроризмге қарсы 3-дәрежелі еңбегі / 2026 жылғы ішкі ескерту' : '2021 Counter-Terrorism 3rd Class Merit / 2026 Internal Warning',
    actions: language === 'zh' ? '猎鹰行动，3.21重大飙车案主侦' : language === 'kk' ? '«Сұңқар» операциясы, 3.21 ірі көше жарысы ісінің негізгі тергеушісі' : 'Operation Falcon, Lead Investigator of 3.21 Major Street Racing Case',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    stats: [
      { label: t.stats.internalBadgeId, value: 'KZ-ALM-10201', icon: Shield },
      { label: t.stats.passportStatus, value: t.stats.submittedToIA, icon: Globe },
      { label: t.stats.issuedWeapon, value: 'Makarov PM (8821)', icon: Zap },
      { label: t.stats.bodycamMac, value: 'BC-992-0A-1B', icon: Smartphone },
      { label: t.stats.officeTerminalIp, value: '10.16.2.204', icon: Terminal },
      { label: t.stats.mobileTerminalIp, value: '172.20.10.4 (iPhone)', icon: Smartphone },
      { label: t.stats.tabletTerminalIp, value: '172.20.10.8 (iPad Pro)', icon: Smartphone },
      { label: t.stats.bloodTypeDna, value: t.stats.storedInDatabase, icon: Heart },
      { label: t.stats.politicalStatus, value: t.stats.rulingPartyMember, icon: UserCheck },
      { label: t.stats.maritalStatus, value: t.stats.divorced, icon: Heart },
      { label: t.stats.financialStatus, value: t.stats.recentLargeCredit, icon: DollarSign },
      { label: t.stats.psychologicalMedical, value: t.stats.insomniaAnxiety, icon: Stethoscope },
      { label: t.stats.primaryVehicle, value: 'KZ-777-POL (Zeekr)', icon: Car },
      { label: t.stats.residentialAddress, value: language === 'zh' ? '波斯坦德克区阿尔法拉比大道102号4单元802室' : language === 'kk' ? 'Бостандық ауданы, Әл-Фараби даңғылы, 102 үй, 4-блок, 802-пәтер' : 'Room 802, Unit 4, 102 Al-Farabi Ave, Bostandyk District', icon: MapPin },
      { label: t.stats.emergencyContact, value: language === 'zh' ? '艾古尔 (前妻) / +7-701-XXX-XXXX' : language === 'kk' ? 'Айгүл (бұрынғы әйелі) / +7-701-XXX-XXXX' : 'Aigul (Ex-wife) / +7-701-XXX-XXXX', icon: Users },
      { label: 'Telegram', value: '@Baurzhan_K (Monitored)', icon: MessageSquare },
      { label: 'Facebook', value: 'fb.com/baurzhan.kaz (Monitored)', icon: Globe },
      { label: 'Instagram', value: '@baurzhan_official (Monitored)', icon: Globe },
      { label: t.stats.bankCards, value: t.stats.cardsAnomaly, icon: CreditCard },
      { label: t.stats.frequentBaseStations, value: 'BS-ALM-092/104/211', icon: Activity },
      { label: t.stats.frequentRf, value: '433.92MHz / 868MHz', icon: Zap },
    ],
    anomalies: [
      { 
        id: 1, 
        type: t.anomalies.spatioTemporal, 
        icon: MapPin, 
        content: t.anomalies.spatioTemporalDesc 
      },
      { 
        id: 2, 
        type: t.anomalies.physiological, 
        icon: Stethoscope, 
        content: t.anomalies.physiologicalDesc 
      },
      { 
        id: 3, 
        type: t.anomalies.commFinancial, 
        icon: DollarSign, 
        content: t.anomalies.commFinancialDesc 
      }
    ]
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-100 overflow-hidden relative">
      {/* Top - Hero Section */}
      <div className="p-4 border-b border-slate-50 bg-white relative overflow-hidden">
        <div className="flex gap-4 items-center relative z-10">
          <div className="relative shrink-0">
            <div className="w-24 h-32 border border-slate-100 rounded overflow-hidden shadow-sm">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <div className="text-[6px] font-mono font-bold text-black rotate-45 border border-black px-1">KZ-ALM-10201</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-bold tracking-tight uppercase">{profile.name}</h3>
              <div className="w-1.5 h-1.5 rounded-full bg-status-red animate-pulse" />
            </div>
            
            <div className="space-y-1.5">
              <div>
                <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">{t.rank}</div>
                <div className="text-[9px] font-bold text-slate-600">{profile.rank}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">{t.records}</div>
                  <div className="text-[9px] font-bold text-status-red truncate">{profile.achievements}</div>
                </div>
                <div>
                  <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">{t.operations}</div>
                  <div className="text-[9px] font-bold text-slate-600 truncate">{profile.actions}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle - Info Grid */}
      <div className="flex-1 p-3 overflow-y-auto scroll-thin pb-32">
        <div className="grid grid-cols-2 gap-1.5">
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="p-1.5 border border-slate-50 bg-white hover:border-slate-200 transition-colors group rounded-sm">
              <div className="flex items-center gap-1 mb-0.5">
                <stat.icon className="w-2 h-2 text-slate-300 group-hover:text-slate-500 transition-colors" />
                <span className="text-[7px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-slate-500">{stat.label}</span>
              </div>
              <div className="text-[9px] font-mono font-bold text-slate-600 truncate">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom - AI Anomaly Report (Floating Overlay) */}
      <div className="absolute bottom-6 left-4 right-4 bg-white border-2 border-black p-4 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] backdrop-blur-sm z-20">
        <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
          <Zap className="w-3 h-3 text-status-red" />
          <h2 className="text-[10px] font-black uppercase tracking-widest text-black">{t.aiInference}</h2>
        </div>

        <div className="space-y-2">
          {profile.anomalies.map((anomaly, idx) => (
            <motion.div 
              key={anomaly.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-2"
            >
              <div className="shrink-0 mt-0.5">
                <anomaly.icon className="w-2.5 h-2.5 text-slate-300" />
              </div>
              <div className="flex-1">
                <div className="text-[8px] font-bold uppercase tracking-tight text-slate-400 mb-0.5">{anomaly.type}</div>
                <div className="text-[9px] leading-tight text-slate-500">
                  {isTyping ? (
                    <span className="animate-pulse">{t.analyzing}</span>
                  ) : (
                    anomaly.content.split(/(\(02:00-04:00\)|health issues|drug dependency|overseas numbers|shell companies|深夜|健康问题|药物依赖|海外号码|壳公司)/g).map((part, i) => {
                      if (/(\(02:00-04:00\)|health issues|drug dependency|overseas numbers|shell companies|深夜|健康问题|药物依赖|海外号码|壳公司)/.test(part)) {
                        return <span key={i} className="text-status-red font-black uppercase">{part}</span>;
                      }
                      return part;
                    })
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

