import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/types/game';

interface CharacterDetailsProps {
  character: Character;
}

const AccordionSection: React.FC<{
  title: string;
  titleColor: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}> = ({ title, titleColor, children, isOpen, onClick }) => (
  <motion.div
    className="border-t border-disco-neon-blue/10"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full py-4 flex items-center justify-between group"
    >
      <h3 className={`text-lg font-display uppercase tracking-wide ${titleColor}`}>
        {title}
      </h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-white/50 group-hover:text-white/80 transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pb-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    perks: true,
    flaws: false,
    compulsions: false,
    secretObjective: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-disco-dark-card/50 rounded-xl overflow-hidden border border-disco-neon-blue/10">
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-6">
        <div className="w-full md:w-1/3">
          <div className="aspect-square relative rounded-lg overflow-hidden ring-2 ring-disco-neon-blue/20">
            <img
              src={`/characters/${character.id}.png`}
              alt={character.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 space-y-6">
          <div>
            <h2 className="text-3xl font-display font-bold uppercase tracking-wider mb-2 text-glow-blue">
              {character.name}
            </h2>
            <p className="text-lg font-serif text-disco-neon-purple/90 mb-6 leading-relaxed">
              {character.description}
            </p>
          </div>

          <div className="space-y-6">
            <AccordionSection
              title="Perks"
              titleColor="text-glow-blue"
              isOpen={openSections.perks}
              onClick={() => toggleSection('perks')}
            >
              <ul className="space-y-2">
                {character.perks.map((perk, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-white/50 mr-2">•</span>
                    <span className="text-white/90 font-serif leading-relaxed">{perk}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection
              title="Flaws"
              titleColor="text-glow-pink"
              isOpen={openSections.flaws}
              onClick={() => toggleSection('flaws')}
            >
              <ul className="space-y-2">
                {character.flaws.map((flaw, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-white/50 mr-2">•</span>
                    <span className="text-white/90 font-serif leading-relaxed">{flaw}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection
              title="Compulsions"
              titleColor="text-glow-orange"
              isOpen={openSections.compulsions}
              onClick={() => toggleSection('compulsions')}
            >
              <ul className="space-y-2">
                {character.compulsions.map((compulsion, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-white/50 mr-2">•</span>
                    <span className="text-white/90 font-serif leading-relaxed">{compulsion}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection
              title="Secret Objective"
              titleColor="text-glow-purple"
              isOpen={openSections.secretObjective}
              onClick={() => toggleSection('secretObjective')}
            >
              <p className="text-white/90 font-serif leading-relaxed">
                {character.secretObjective}
              </p>
            </AccordionSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails; 