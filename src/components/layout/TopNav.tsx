import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Search, 
  Bell, 
  User, 
  Settings, 
  LayoutGrid, 
  Map as MapIcon, 
  Activity, 
  Database,
  Menu,
  Network,
  Languages,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage, Language } from '@/src/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/src/i18n/ui';

interface TopNavProps {
  isRightPanelOpen: boolean;
  onToggleRightPanel: () => void;
  onTitleClick: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ isRightPanelOpen, onToggleRightPanel, onTitleClick }) => {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'kk', label: 'Қазақ' },
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.label;

  return (
    <header className="h-16 border-b-2 border-black bg-white flex items-center justify-between px-6 z-50 font-mono">
      <div className="flex items-center gap-12 flex-1">
        <motion.button 
          onClick={onTitleClick}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 text-black group"
        >
          <div className="p-1.5 bg-black text-white rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] group-hover:shadow-none transition-all">
            <Shield className="w-6 h-6" />
          </div>
          <span className="font-black tracking-tighter text-xl uppercase flex flex-col items-start leading-none">
            AI STATECRAFT
            <span className="text-[10px] text-slate-400 font-black tracking-[0.3em] mt-1">{UI_TRANSLATIONS[language].topNav.forMinister}</span>
          </span>
        </motion.button>
        
        <div className="flex items-center gap-3 flex-1 max-w-[40%]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder={UI_TRANSLATIONS[language].topNav.searchPlaceholder}
              className="bg-slate-50 border-2 border-black/10 rounded-none py-2.5 pl-11 pr-4 text-[11px] w-full focus:outline-none focus:border-black transition-all font-black uppercase tracking-widest"
            />
          </div>
          <button 
            onClick={onToggleRightPanel}
            className={cn(
              "p-2.5 rounded-none border-2 transition-all relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] active:translate-y-0.5 active:shadow-none",
              isRightPanelOpen ? "bg-black text-white border-black" : "bg-white text-black border-black hover:bg-slate-50"
            )}
            title="Graph Data Status"
          >
            <Network className="w-6 h-6" />
            {isRightPanelOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-status-green border-2 border-white" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: 20, width: 0 }}
                  className="flex items-center bg-white border-2 border-black mr-2 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "px-3 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors whitespace-nowrap border-r last:border-r-0 border-black/10",
                        language === lang.code ? "bg-slate-100" : ""
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 border-2 border-black transition-all font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-none",
                isLangOpen ? "bg-black text-white" : "bg-white text-black hover:bg-slate-50"
              )}
            >
              <Languages className="w-4 h-4" />
              <span>{currentLangLabel}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", isLangOpen && "rotate-90")} />
            </button>
          </div>

          <button className="p-2.5 text-black hover:bg-slate-50 transition-colors relative border-2 border-transparent hover:border-black/5">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-status-red border-2 border-white" />
          </button>
          <button className="p-2.5 text-black hover:bg-slate-50 transition-colors border-2 border-transparent hover:border-black/5">
            <Settings className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4 pl-6 border-l-2 border-black/10">
            <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
              <User className="w-6 h-6" />
            </div>
            <div className="hidden lg:block">
              <div className="text-[10px] font-black text-slate-400 leading-none uppercase tracking-widest">{UI_TRANSLATIONS[language].topNav.operator}</div>
              <div className="text-xs font-black uppercase tracking-tight mt-1">KARLEE_01</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
