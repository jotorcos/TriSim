import { useEffect } from 'react';
import { useGameState } from './useGameState';
import { useMarioPosition } from './useMarioPosition';

const MARIO_JUMP_HEIGHT = 70;
const FINISH_LINE = 90;
const MARIO_HEIGHT = 100;

const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function useGameLogic() {
  const mario = useMarioPosition();
  const gameState = useGameState();

  const handleAction = (newAction: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (newAction === gameState.correctSequence[gameState.step]) {
      gameState.setStep((prev) => prev + 1);
      mario.setMarioVerticalPosition(
        mario.initialMarioVerticalPosition + MARIO_JUMP_HEIGHT
      );
      // Store the jump position and action
      gameState.setJumpedActions((prev) => [
        ...prev,
        { position: mario.marioPosition, action: newAction },
      ]);

      setTimeout(() => {
        mario.setMarioVerticalPosition(mario.initialMarioVerticalPosition);
      }, 250);

      if (gameState.step === gameState.correctSequence.length - 1) {
        gameState.setGameStatus('won');
        gameState.setIsActive(false);
      }
    } else {
      gameState.setGameStatus('lost');
      gameState.setIsActive(false);
    }
  };

  const toggleGame = () => {
    if (gameState.isActive) {
      gameState.setIsActive(false);
      gameState.setGameStatus('lost');
    } else {
      gameState.setStep(0);
      mario.setMarioPosition(0);
      mario.setMarioVerticalPosition(mario.initialMarioVerticalPosition);
      gameState.setGameStatus('playing');
      gameState.setIsActive(true);
      gameState.setShuffledSequence(shuffleArray(gameState.correctSequence));
      gameState.setJumpedActions([]);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (gameState.isActive && gameState.gameStatus === 'playing') {
      interval = setInterval(() => {
        mario.setMarioPosition((prev) => prev + 1);
        mario.setRunningSprite((prev) => (prev === 1 ? 2 : 1));
      }, 100);
    } else if (interval !== undefined) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [gameState.isActive, gameState.gameStatus]);

  useEffect(() => {
    if (
      mario.marioPosition >= FINISH_LINE &&
      gameState.gameStatus === 'playing'
    ) {
      gameState.setGameStatus('lost');
      gameState.setIsActive(false);
    }
  }, [mario.marioPosition, gameState.gameStatus]);

  return {
    ...mario,
    ...gameState,
    handleAction,
    toggleGame,
    BOX_HEIGHT:
      mario.initialMarioVerticalPosition + MARIO_HEIGHT + MARIO_JUMP_HEIGHT,
  };
}
