import React, { useState } from 'react';
import { PersonnelLedger } from './PersonnelLedger';
import { PersonnelHologram } from './PersonnelHologram';
import { PersonnelIntelligence } from './PersonnelIntelligence';
import { motion, AnimatePresence } from 'motion/react';

export const PolicePersonnelDemo: React.FC = () => {
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>('baurzhan');

  return (
    <div className="h-full w-full flex bg-white overflow-hidden">
      {/* 30% Left: Personnel Ledger & Stats */}
      <div className="w-[30%] h-full">
        <PersonnelLedger 
          selectedPersonId={selectedPersonId} 
          onSelectPerson={setSelectedPersonId} 
        />
      </div>

      {/* 30% Middle: Personnel Hologram & AI Profile */}
      <div className="w-[30%] h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPersonId || 'empty'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <PersonnelHologram personId={selectedPersonId} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 40% Right: Intelligence Map & Ontology */}
      <div className="w-[40%] h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPersonId || 'empty-right'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <PersonnelIntelligence personId={selectedPersonId} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
