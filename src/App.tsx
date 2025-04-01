import React from 'react';
import { useGameStore } from '@/store/gameStore';
import CharacterSelection from '@/components/CharacterSelection';
import GameScreen from '@/components/GameScreen';

const App: React.FC = () => {
  const isGameStarted = useGameStore((state) => state.isGameStarted);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {!isGameStarted ? <CharacterSelection /> : <GameScreen />}
    </div>
  );
};

export default App; 