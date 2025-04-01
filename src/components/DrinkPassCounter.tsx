import React from 'react';
import { useGameStore } from '@/store/gameStore';

const DrinkPassCounter: React.FC = () => {
  const { drinkPasses, addDrinkPass, useDrinkPass } = useGameStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wide text-glow-orange text-center">
            Drink Passes
          </h2>
          <p className="text-white/70 font-serif text-sm">
            Use these to skip drinks throughout the night
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl font-display font-bold text-white">
            {drinkPasses}
          </span>
          <div className="flex items-center justify-center gap-4 w-full">
            <button
              onClick={() => useDrinkPass(1)}
              disabled={drinkPasses <= 0}
              className="flex-1 px-4 py-2 rounded-lg bg-disco-neon-orange/90 hover:bg-disco-neon-orange transition-colors font-display uppercase text-sm font-bold tracking-wider shadow-lg shadow-disco-neon-orange/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use
            </button>
            <button
              onClick={() => addDrinkPass()}
              disabled={drinkPasses >= 10}
              className="flex-1 px-4 py-2 rounded-lg bg-disco-neon-blue/90 hover:bg-disco-neon-blue transition-colors font-display uppercase text-sm font-bold tracking-wider shadow-lg shadow-disco-neon-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkPassCounter; 