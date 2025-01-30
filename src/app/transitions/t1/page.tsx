'use client';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TransitionT1() {
  const { translations, error } = useTranslations('transitions');
  // Game state
  const [action, setAction] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0); // Current step in the sequence
  const [marioPosition, setMarioPosition] = useState<number>(0); // Mario's horizontal position (0% to 100%)
  const [marioVerticalPosition, setMarioVerticalPosition] = useState<number>(0); // Mario's vertical position
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing'
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false); // Track if Mario is jumping
  const correctSequence = ['removeGoggles', 'putHelmet', 'putBib', 'grabBike'];
  const finishLine = 90; // Finish line at 90% of the screen width
  let interval: ReturnType<typeof setInterval> | undefined;

  const handleAction = (newAction: string) => {
    if (gameStatus !== 'playing') return;
    if (newAction === correctSequence[step]) {
      setAction(newAction);
      setStep((prev) => prev + 1); // Move to the next step

      // Trigger jump animation
      setIsJumping(true);
      setMarioVerticalPosition(37); // Jump up
      setTimeout(() => {
        setMarioVerticalPosition(0); // Fall back down
        setIsJumping(false);
      }, 250);

      if (step === correctSequence.length - 1) {
        setGameStatus('won'); // Player completed all steps
        setIsActive(false);
      }
    } else {
      setGameStatus('lost'); // Player failed the sequence
      setIsActive(false);
    }
  };

  const resetGame = () => {
    setAction(null);
    setStep(0);
    setMarioPosition(0);
    setMarioVerticalPosition(0);
    setIsActive(false);
    setGameStatus('playing');
  };

  useEffect(() => {
    if (isActive && gameStatus === 'playing') {
      interval = setInterval(() => {
        setMarioPosition((prev) => prev + 1); // Move Mario to the right
      }, 100); // Adjust speed here
    } else if (interval !== undefined) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [isActive, gameStatus]);

  useEffect(() => {
    if (marioPosition >= finishLine && gameStatus === 'playing') {
      setGameStatus('lost'); // Mario reached the finish line
      setIsActive(false);
    }
  }, [marioPosition, gameStatus]);

  const actionImages = {
    removeGoggles: {
      src: '/images/remove-goggles.png',
      alt: translations?.t1Steps.removeGoggles,
    },
    putHelmet: {
      src: '/images/put-helmet.png',
      alt: translations?.t1Steps.putHelmet,
    },
    putBib: {
      src: '/images/put-bib.webp',
      alt: translations?.t1Steps.putBib,
    },
    grabBike: {
      src: '/images/grab-bike.jpg',
      alt: translations?.t1Steps.grabBike,
    },
  };

  const renderActionImage = () => {
    const image = actionImages[action as keyof typeof actionImages];
    if (!image) return null;
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={250}
        height={250}
        style={{ objectFit: 'fill' }}
      />
    );
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
      {/* Mario Sprite and Track */}
      <div className="w-full h-20 bg-gray-300 relative mb-8">
        <div
          className="absolute transition-transform duration-500 ease-in-out"
          style={{
            left: `${marioPosition}%`,
            bottom: `${marioVerticalPosition}px`,
          }}
        >
          <Image src="/images/mario.jpg" alt="Mario" width={50} height={50} />
        </div>
        <div
          className="absolute bottom-0 right-0 h-full w-2 bg-red-600"
          style={{ left: `${finishLine}%` }}
        >
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-600 font-bold">
            Finish
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        {correctSequence.map((actionKey) => (
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
      {/* Action Image */}
      <div className="mb-6">{renderActionImage()}</div>
      {/* Game Status */}
      {gameStatus === 'won' && (
        <div className="text-4xl font-bold text-green-600 mb-4">
          You Win! 🎉
        </div>
      )}
      {gameStatus === 'lost' && (
        <div className="text-4xl font-bold text-red-600 mb-4">You Lose! 😢</div>
      )}
      {/* Start/Reset Buttons */}
      <button
        className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300"
        onClick={() => setIsActive(!isActive)}
        disabled={gameStatus !== 'playing'}
      >
        {isActive ? translations.stopTimer : translations.startTimer}
      </button>
      <button
        className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300 mt-4"
        onClick={resetGame}
      >
        {translations.reset}
      </button>
    </div>
  );
}
