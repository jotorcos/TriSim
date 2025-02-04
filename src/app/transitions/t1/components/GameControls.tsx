import { useTranslations } from '@/hooks/useTranslations';

interface GameControlsProps {
  isActive: boolean;
  shuffledSequence: string[];
  onAction: (action: string) => void;
  onToggleGame: () => void;
}

export function GameControls({
  isActive,
  shuffledSequence,
  onAction,
  onToggleGame,
}: GameControlsProps) {
  const { translations } = useTranslations('transitions');
  if (!translations) return null;

  return (
    <>
      <button
        className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
        onClick={onToggleGame}
      >
        {isActive ? translations.stopTimer : translations.startTimer}
      </button>
      <div className="flex flex-col items-center space-y-4 my-8">
        {shuffledSequence.map((actionKey) => (
          <button
            key={actionKey}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out disabled:opacity-70"
            onClick={() => onAction(actionKey)}
            disabled={!isActive}
          >
            {translations.t1Steps[actionKey]}
          </button>
        ))}
      </div>
    </>
  );
}
