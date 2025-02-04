'use client';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TransitionT1() {
  const { translations, error } = useTranslations('transitions');
  const [action, setAction] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);
  const INITIAL_MARIO_VERTICAL_POSITION_DESKTOP = 91;
  const INITIAL_MARIO_VERTICAL_POSITION_MOBILE = 48;
  const [initialMarioVerticalPosition, setInitialMarioVerticalPosition] =
    useState<number>(INITIAL_MARIO_VERTICAL_POSITION_DESKTOP); // Default to desktop value

  const MARIO_HEIGHT = 100;
  const MARIO_JUMP_HEIGHT = 70;
  const BOX_HEIGHT =
    initialMarioVerticalPosition + MARIO_HEIGHT + MARIO_JUMP_HEIGHT;
  const [marioPosition, setMarioPosition] = useState<number>(0);
  const [marioVerticalPosition, setMarioVerticalPosition] = useState<number>(
    INITIAL_MARIO_VERTICAL_POSITION_DESKTOP
  ); // Default to desktop value

  useEffect(() => {
    const updateMarioPosition = () => {
      const newPosition =
        window.innerWidth < 640
          ? INITIAL_MARIO_VERTICAL_POSITION_MOBILE
          : INITIAL_MARIO_VERTICAL_POSITION_DESKTOP;
      setInitialMarioVerticalPosition(newPosition);
      setMarioVerticalPosition(newPosition);
    };

    // Run once on mount
    updateMarioPosition();

    // Listen for screen resizing
    window.addEventListener('resize', updateMarioPosition);
    return () => window.removeEventListener('resize', updateMarioPosition);
  }, []);
  const [jumpedActions, setJumpedActions] = useState<
    { position: number; action: string }[]
  >([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing'
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [runningSprite, setRunningSprite] = useState<number>(1);

  const correctSequence = ['removeGoggles', 'putHelmet', 'putBib', 'grabBike'];
  const [shuffledSequence, setShuffledSequence] = useState<string[]>([]);
  const finishLine = 90;
  let interval: ReturnType<typeof setInterval> | undefined;

  useEffect(() => {
    setShuffledSequence(shuffleArray(correctSequence));
  }, []);

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleAction = (newAction: string) => {
    if (gameStatus !== 'playing') return;
    if (newAction === correctSequence[step]) {
      setAction(newAction);
      setStep((prev) => prev + 1);
      setMarioVerticalPosition(
        initialMarioVerticalPosition + MARIO_JUMP_HEIGHT
      );

      // Store the jump position and action
      setJumpedActions((prev) => [
        ...prev,
        { position: marioPosition, action: newAction },
      ]);

      setTimeout(() => {
        setMarioVerticalPosition(initialMarioVerticalPosition);
      }, 250);

      if (step === correctSequence.length - 1) {
        setGameStatus('won');
        setIsActive(false);
      }
    } else {
      setGameStatus('lost');
      setIsActive(false);
    }
  };

  const toggleGame = () => {
    if (isActive) {
      setIsActive(false);
      setGameStatus('lost');
    } else {
      setAction(null);
      setStep(0);
      setMarioPosition(0);
      setMarioVerticalPosition(initialMarioVerticalPosition);
      setGameStatus('playing');
      setIsActive(true);
      setShuffledSequence(shuffleArray(correctSequence));
      setJumpedActions([]);
    }
  };

  useEffect(() => {
    if (isActive && gameStatus === 'playing') {
      interval = setInterval(() => {
        setMarioPosition((prev) => prev + 1);
        setRunningSprite((prev) => (prev === 1 ? 2 : 1));
      }, 100);
    } else if (interval !== undefined) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [isActive, gameStatus]);

  useEffect(() => {
    if (marioPosition >= finishLine && gameStatus === 'playing') {
      setGameStatus('lost');
      setIsActive(false);
    }
  }, [marioPosition, gameStatus]);

  const actionImages = {
    removeGoggles: {
      src: '/images/remove-goggles.jpg',
      alt: translations?.t1Steps.removeGoggles,
    },
    putHelmet: {
      src: '/images/put-helmet.jpg',
      alt: translations?.t1Steps.putHelmet,
    },
    putBib: { src: '/images/put-bib.png', alt: translations?.t1Steps.putBib },
    grabBike: {
      src: '/images/grab-bike2.jpg',
      alt: translations?.t1Steps.grabBike,
    },
  };

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
      <div className="w-full max-w-[1200px] h-[22rem] sm:h-[42rem] bg-[url(/images/mario-background-large.jpg)] bg-bottom bg-cover relative mb-8">
        {/* Render stored action images at static positions */}
        {jumpedActions.map(({ position, action }, index) => {
          const image = actionImages[action as keyof typeof actionImages];
          return (
            <div
              key={index}
              className="absolute transition-opacity duration-500"
              style={{
                left: `${position}%`, // Keep it where Mario jumped
                bottom: `${BOX_HEIGHT}px`, // Adjust height to keep it above ground
              }}
            >
              <Image src={image.src} alt={image.alt} width={60} height={660} />
            </div>
          );
        })}

        {/* Mario */}
        <div
          className="absolute transition-transform duration-500 ease-in-out"
          style={{
            left: `${marioPosition}%`,
            bottom: `${marioVerticalPosition}px`,
          }}
        >
          <Image
            src={`/images/mario-running${runningSprite}.png`}
            alt="Mario"
            width={50}
            height={50}
          />
        </div>

        {/* Finish Line */}
        <div
          className="absolute bottom-0 right-0 h-full w-2 bg-red-600"
          style={{ left: `${finishLine}%` }}
        >
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-600 font-bold">
            Finish
          </span>
        </div>

        {gameStatus === 'won' && (
          <div className="text-4xl flex justify-center items-center bg-white h-20 font-bold text-green-600 mb-4">
            You Win! 🎉
          </div>
        )}
        {gameStatus === 'lost' && (
          <div className="text-4xl flex justify-center items-center bg-white h-20 font-bold text-red-600 mb-4">
            You Lose! 😢
          </div>
        )}
      </div>
      <button
        className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
        onClick={toggleGame}
      >
        {isActive ? translations.stopTimer : translations.startTimer}
      </button>
      <div className="flex flex-col items-center space-y-4 my-8">
        {shuffledSequence.map((actionKey) => (
          <button
            key={actionKey}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
            onClick={() => handleAction(actionKey)}
            disabled={gameStatus !== 'playing'}
          >
            {translations.t1Steps[actionKey]}
          </button>
        ))}
      </div>
    </div>
  );
}
