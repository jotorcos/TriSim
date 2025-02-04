import { useEffect, useState } from 'react';

const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function useGameState() {
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing'
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [jumpedActions, setJumpedActions] = useState<
    Array<{ position: number; action: string }>
  >([]);

  const correctSequence = ['removeGoggles', 'putHelmet', 'putBib', 'grabBike'];
  const [shuffledSequence, setShuffledSequence] = useState<string[]>([]);

  useEffect(() => {
    setShuffledSequence(shuffleArray(correctSequence));
  }, []);

  return {
    gameStatus,
    setGameStatus,
    isActive,
    setIsActive,
    step,
    setStep,
    jumpedActions,
    setJumpedActions,
    shuffledSequence,
    setShuffledSequence,
    correctSequence,
  };
}
