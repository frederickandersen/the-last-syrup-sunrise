import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import CharacterDetails from './CharacterDetails';
import Carousel from './Carousel';
import DrinkPassCounter from './DrinkPassCounter';

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-disco-dark-card/30 rounded-lg mb-4" />
    <div className="h-4 bg-disco-dark-card/30 rounded w-3/4 mb-2" />
    <div className="h-4 bg-disco-dark-card/30 rounded w-1/2" />
  </div>
);

const GameScreen: React.FC = () => {
  const {
    selectedCharacter,
    socialMissions,
    powerCards,
    completeSocialMission,
    usePowerCard,
    advanceToNextBar,
  } = useGameStore();

  const [timeLeft, setTimeLeft] = useState('43:32');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const [minutes, seconds] = prev.split(':').map(Number);
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            return '00:00';
          }
          return `${minutes - 1}:59`;
        }
        return `${minutes}:${(seconds - 1).toString().padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!selectedCharacter) return null;

  const missionItems = socialMissions.map((mission) => (
    <motion.div
      key={mission.id}
      className={`h-[424px] p-4 rounded-lg flex flex-col ${
        mission.completed
          ? 'bg-disco-dark-accent/30 border border-disco-neon-green/30'
          : 'bg-disco-dark-card/50 border border-disco-neon-blue/10'
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex-1 flex flex-col">
        <div className="h-48 w-full rounded-lg overflow-hidden ring-2 ring-disco-neon-blue/20 mb-4">
          <img
            src={`/missions/${mission.id}.png`}
            alt={mission.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-display font-normal uppercase tracking-wide text-glow-blue">
            {mission.name}
          </h3>
          <p className="text-white/90 mt-3 font-serif text-base leading-relaxed">{mission.description}</p>
        </div>
      </div>
      {!mission.completed ? (
        <motion.div 
          className="mt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => completeSocialMission(mission.id)}
            className="w-full px-4 py-2 rounded-lg bg-disco-neon-blue/90 hover:bg-disco-neon-blue transition-colors font-display uppercase text-sm font-bold tracking-wider shadow-lg shadow-disco-neon-blue/20 focus:outline-none focus:ring-2 focus:ring-disco-neon-blue focus:ring-offset-2 focus:ring-offset-disco-dark-base"
            aria-label={`Complete ${mission.name} mission`}
          >
            Complete
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => completeSocialMission(mission.id)}
            className="w-full px-4 py-2 rounded-lg bg-disco-neon-green/90 hover:bg-disco-neon-green/80 transition-colors font-display uppercase text-sm font-bold tracking-wider shadow-lg shadow-disco-neon-green/20 focus:outline-none focus:ring-2 focus:ring-disco-neon-green focus:ring-offset-2 focus:ring-offset-disco-dark-base flex items-center justify-center gap-2"
            aria-label={`Uncomplete ${mission.name} mission`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            Completed
          </button>
        </motion.div>
      )}
    </motion.div>
  ));

  const powerCardItems = powerCards.map((card) => (
    <motion.div
      key={card.id}
      className={`h-[424px] p-4 rounded-lg flex flex-col ${
        card.used
          ? 'bg-disco-dark-accent/20 border border-disco-neon-pink/10 opacity-50'
          : 'bg-disco-dark-card/50 border border-disco-neon-purple/10'
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex-1 flex flex-col">
        <div className="h-48 w-full rounded-lg overflow-hidden ring-2 ring-disco-neon-blue/20 mb-4">
          <img
            src={`/power/${card.id}.png`}
            alt={card.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-display font-normal uppercase tracking-wide text-glow-yellow">
            {card.name}
          </h3>
          <p className="text-white/90 mt-3 font-serif text-base leading-relaxed">{card.description}</p>
        </div>
      </div>
      {!card.used && (
        <motion.div 
          className="mt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => usePowerCard(card.id)}
            className="w-full px-4 py-2 rounded-lg bg-disco-neon-purple/90 hover:bg-disco-neon-purple transition-colors font-display uppercase text-sm font-bold tracking-wider shadow-lg shadow-disco-neon-purple/20 focus:outline-none focus:ring-2 focus:ring-disco-neon-purple focus:ring-offset-2 focus:ring-offset-disco-dark-base"
            aria-label={`Use ${card.name} power card`}
          >
            Use
          </button>
        </motion.div>
      )}
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-disco-dark-base text-white p-4 md:p-8 pb-32">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Character Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CharacterDetails character={selectedCharacter} />
        </motion.div>

        {/* Drink Pass Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="bg-disco-dark-card/50 rounded-lg border border-disco-neon-blue/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-4">
              <DrinkPassCounter />
            </div>
          </motion.div>
        </motion.div>

        {/* Social Missions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Carousel
            items={missionItems}
            title="Social Missions"
            titleColor="text-glow-pink"
          />
        </motion.div>

        {/* Power Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Carousel
            items={powerCardItems}
            title="Power Cards"
            titleColor="text-glow-purple"
          />
        </motion.div>

        {/* Reset Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center relative"
        >
          <motion.button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset the game? This will clear all progress.')) {
                useGameStore.getState().resetGame();
              }
            }}
            className="px-6 py-3 rounded-lg bg-disco-dark-accent/50 hover:bg-disco-dark-accent/70 transition-colors font-display uppercase text-sm font-bold tracking-wider text-white/70 hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-disco-dark-accent focus:ring-offset-2 focus:ring-offset-disco-dark-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Reset game"
          >
            Reset Game
          </motion.button>
        </motion.div>
      </div>

      {/* Sticky Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 bg-disco-dark-card/90 backdrop-blur-md border-t border-disco-neon-blue/20 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-2xl font-display font-bold text-glow-blue">
              {timeLeft}
            </div>
            <div className="text-sm text-white/80">
              Next: Jolene Bar
            </div>
          </div>
          <motion.button
            onClick={advanceToNextBar}
            className="px-8 py-4 rounded-lg bg-disco-neon-blue/90 hover:bg-disco-neon-blue transition-colors font-display uppercase text-sm font-bold tracking-wider shadow-lg shadow-disco-neon-blue/20 focus:outline-none focus:ring-2 focus:ring-disco-neon-blue focus:ring-offset-2 focus:ring-offset-disco-dark-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Advance to next bar"
          >
            Next Bar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameScreen; 