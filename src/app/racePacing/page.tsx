'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useState } from 'react';

export default function RacePacing() {
  const [swimTime, setSwimTime] = useState<number>(0);
  const [bikeTime, setBikeTime] = useState<number>(0);
  const [runTime, setRunTime] = useState<number>(0);

  const totalTime = swimTime + bikeTime + runTime;

  const { translations, error } = useTranslations('racePacing');

  if (error) return <div>Error loading translations: {error}</div>;
  if (!translations) return <div>Loading...</div>;

  const {
    title,
    description,
    swim,
    bike,
    run,
    totalTime: totalTimeLabel,
    calculate,
  } = translations;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-center max-w-3xl mb-6">
        {description}
      </p>

      <div className="w-full max-w-md space-y-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <label className="block text-sm font-semibold">{swim}</label>
          <input
            type="number"
            value={swimTime}
            onChange={(e) => setSwimTime(Number(e.target.value))}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <label className="block text-sm font-semibold">{bike}</label>
          <input
            type="number"
            value={bikeTime}
            onChange={(e) => setBikeTime(Number(e.target.value))}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <label className="block text-sm font-semibold">{run}</label>
          <input
            type="number"
            value={runTime}
            onChange={(e) => setRunTime(Number(e.target.value))}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">
          {totalTimeLabel}: {totalTime} mins
        </h2>
      </div>

      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300">
        {calculate}
      </button>
    </div>
  );
}
