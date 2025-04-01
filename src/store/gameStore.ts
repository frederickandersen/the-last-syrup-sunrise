import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CHARACTERS, SOCIAL_MISSIONS, POWER_CARDS } from '@/types/game';
import { GameState } from '@/types/game';

interface GameStore extends GameState {
  selectCharacter: (characterId: string) => void;
  startGame: () => void;
  completeSocialMission: (missionId: string) => void;
  usePowerCard: (cardId: string) => void;
  advanceToNextBar: () => void;
  resetGame: () => void;
  addDrinkPass: () => void;
  useDrinkPass: (amount: number) => void;
}

const initialState: GameState = {
  selectedCharacter: null,
  socialMissions: SOCIAL_MISSIONS,
  powerCards: POWER_CARDS,
  currentBar: 0,
  completedMissions: 0,
  isGameStarted: false,
  drinkPasses: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      selectCharacter: (characterId: string) => {
        const character = CHARACTERS.find((c) => c.id === characterId);
        if (character) {
          set({ selectedCharacter: character });
        }
      },

      startGame: () => {
        set({ isGameStarted: true });
      },

      completeSocialMission: (missionId: string) => {
        set((state) => {
          const mission = state.socialMissions.find(m => m.id === missionId);
          if (!mission) return state;

          return {
            socialMissions: state.socialMissions.map((mission) =>
              mission.id === missionId
                ? { ...mission, completed: !mission.completed }
                : mission
            ),
            completedMissions: mission.completed 
              ? state.completedMissions - 1 
              : state.completedMissions + 1,
          };
        });
      },

      usePowerCard: (cardId: string) => {
        set((state) => ({
          powerCards: state.powerCards.map((card) =>
            card.id === cardId
              ? { ...card, used: true }
              : card
          ),
        }));
      },

      advanceToNextBar: () => {
        set((state) => ({
          currentBar: state.currentBar + 1,
        }));
      },

      addDrinkPass: () => {
        set((state) => ({
          drinkPasses: Math.min(state.drinkPasses + 1, 10),
        }));
      },

      useDrinkPass: (amount: number) => {
        set((state) => ({
          drinkPasses: Math.max(state.drinkPasses - amount, 0),
        }));
      },

      resetGame: () => {
        localStorage.removeItem('game-storage');
        set(initialState);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 