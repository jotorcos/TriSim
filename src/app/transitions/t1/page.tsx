'use client';

import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TransitionT1() {
  const { translations, error } = useTranslations('transitions');

  // Inicialización de los hooks fuera de cualquier condición
  const [action, setAction] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  let interval: ReturnType<typeof setInterval> | undefined;

  const handleAction = (newAction: string) => {
    setAction(newAction);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimer(0);
  };

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else if (interval !== undefined) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [isActive]);

  const actionImages = {
    removeGoggles: {
      src: '/images/remove-goggles.png',
      alt: translations?.goggles,
    },
    putHelmet: {
      src: '/images/put-helmet.png',
      alt: translations?.helmet,
    },
    putBib: {
      src: '/images/put-bib.webp',
      alt: translations?.bib,
    },
    grabBike: {
      src: '/images/grab-bike.jpg',
      alt: translations?.bike,
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

      <div className="flex flex-col items-center space-y-4 mb-8">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={() => handleAction('removeGoggles')}
        >
          {translations.goggles}
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={() => handleAction('putHelmet')}
        >
          {translations.helmet}
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={() => handleAction('putBib')}
        >
          {translations.bib}
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={() => handleAction('grabBike')}
        >
          {translations.bike}
        </button>
      </div>

      <div className="mb-6">{renderActionImage()}</div>

      <div className="text-xl font-bold mb-4">
        {translations.time}: {timer}s
      </div>

      <button
        className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300"
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? translations.stopTimer : translations.startTimer}
      </button>

      <button
        className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300 mt-4"
        onClick={resetTimer}
      >
        {translations.reset}
      </button>
    </div>
  );
}
