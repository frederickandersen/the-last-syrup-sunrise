import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { CHARACTERS } from '@/types/game';

const CharacterSelection: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const selectCharacter = useGameStore((state) => state.selectCharacter);
  const startGame = useGameStore((state) => state.startGame);

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  const handleConfirm = () => {
    if (selectedCharacter) {
      selectCharacter(selectedCharacter);
      // Reset scroll position
      window.scrollTo({ top: 0, behavior: 'instant' });
      startGame();
    }
  };

  const character = selectedCharacter ? CHARACTERS.find(c => c.id === selectedCharacter) : null;

  return (
    <div className="min-h-screen bg-disco-dark-base text-white p-4 flex flex-col overflow-x-hidden relative">
      {/* Global gradient layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-disco-neon-pink/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,255,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,255,255,0.1),transparent_70%)]" />
        
        <motion.div 
          className="absolute inset-0 bg-disco-neon-pink/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative">
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 relative pt-16 pb-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-bold uppercase tracking-widest mb-4 text-glow-pink relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              The Last Syrup Sunrise
              <div className="absolute -inset-4 bg-disco-neon-pink/10 blur-2xl rounded-full" />
            </motion.h1>

            <motion.p 
              className="text-2xl md:text-3xl font-serif text-disco-neon-blue relative max-w-xs mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Choose your character for the night
              <div className="absolute -inset-4 bg-disco-neon-blue/10 blur-2xl rounded-full" />
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 relative"
          >
            {CHARACTERS.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`character-card relative cursor-pointer group ${
                  selectedCharacter === character.id ? 'ring-2 ring-disco-neon-blue ring-offset-2 ring-offset-disco-dark-base' : ''
                }`}
                onClick={() => handleCharacterSelect(character.id)}
              >
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={`/characters/${character.id}.png`}
                    alt={character.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 ring-2 ring-disco-neon-blue/20 group-hover:ring-disco-neon-blue/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-display font-bold uppercase tracking-wider mb-1 text-glow-blue relative">
                      {character.name}
                      <div className="absolute -inset-1 bg-disco-neon-blue/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h2>
                    <p className="text-base font-serif text-disco-neon-purple line-clamp-2 relative">
                      {character.description}
                      <div className="absolute -inset-1 bg-disco-neon-purple/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCharacter && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedCharacter(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-disco-dark-base/90 backdrop-blur-md rounded-xl p-6 md:p-8 max-w-lg w-full shadow-xl border border-disco-neon-blue/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-disco-neon-blue/5 via-transparent to-disco-neon-purple/5" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-4 relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-disco-neon-blue/30 group">
                    <img
                      src={`/characters/${character?.id}.png`}
                      alt={character?.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 ring-2 ring-disco-neon-blue/20 animate-pulse" />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wider mb-3 text-glow-blue relative">
                      {character?.name}
                      <div className="absolute -inset-1 bg-disco-neon-blue/10 blur-lg rounded-full" />
                    </h2>
                    <p className="text-lg md:text-xl font-serif text-disco-neon-purple leading-normal relative">
                      {character?.description}
                      <div className="absolute -inset-1 bg-disco-neon-purple/10 blur-lg rounded-full" />
                    </p>
                  </div>
                </div>
                
                <div className="mb-6 relative">
                  <p className="text-white/50 text-sm md:text-base text-center relative">
                    Are you ready to embark on this journey? Your character's abilities and challenges will be revealed once confirmed.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 relative">
                  <button
                    onClick={() => setSelectedCharacter(null)}
                    className="flex-1 px-6 py-3 rounded-lg bg-disco-dark-base/80 hover:bg-disco-dark-base/60 transition-colors font-display uppercase text-sm font-bold tracking-wider border border-disco-neon-blue/20 hover:border-disco-neon-blue/40 relative group"
                  >
                    <span className="relative z-10">Cancel</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-disco-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-6 py-3 rounded-lg bg-disco-neon-blue/90 hover:bg-disco-neon-blue transition-colors font-display uppercase text-sm font-bold tracking-wider shadow-lg shadow-disco-neon-blue/20 relative group overflow-hidden"
                  >
                    <span className="relative z-10">Confirm Character</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterSelection;