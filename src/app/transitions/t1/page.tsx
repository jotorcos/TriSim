'use client';
import { useTranslations } from '@/hooks/useTranslations';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { useGameLogic } from './hooks/useGameLogic';

export default function TransitionT1() {
  const { translations, error } = useTranslations('transitions');

  const {
    marioPosition,
    marioVerticalPosition,
    runningSprite,
    jumpedActions,
    BOX_HEIGHT,
    gameStatus,
    isActive,
    shuffledSequence,
    handleAction,
    toggleGame,
  } = useGameLogic();

  if (error) return <div>Error loading translations: {error}</div>;
  if (!translations) return '';

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center">
        {translations.t1}
      </h1>
      <div className="mb-4">
        <p>{translations.intro}</p>
      </div>

      <GameBoard
        marioPosition={marioPosition}
        marioVerticalPosition={marioVerticalPosition}
        runningSprite={runningSprite}
        jumpedActions={jumpedActions}
        boxHeight={BOX_HEIGHT}
        finishLine={90}
        gameStatus={gameStatus}
      />

      <GameControls
        isActive={isActive}
        shuffledSequence={shuffledSequence}
        onAction={handleAction}
        onToggleGame={toggleGame}
      />
    </div>
  );
}
