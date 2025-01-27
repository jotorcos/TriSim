'use client';

import { getTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function RacePacing() {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [swimTime, setSwimTime] = useState<number>(0);
  const [bikeTime, setBikeTime] = useState<number>(0);
  const [runTime, setRunTime] = useState<number>(0);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations('racePacing');
        setTranslations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
    loadTranslations();
  }, []);

  const totalTime = swimTime + bikeTime + runTime;

  if (error) {
    return <div>Error loading translations: {error}</div>;
  }

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{title}</h1>
      <p className="text-lg text-center max-w-lg mb-6">{description}</p>
      <div className="flex gap-4 mb-6">
        <div>
          <label>{swim}</label>
          <input
            type="number"
            value={swimTime}
            onChange={(e) => setSwimTime(Number(e.target.value))}
          />
        </div>
        <div>
          <label>{bike}</label>
          <input
            type="number"
            value={bikeTime}
            onChange={(e) => setBikeTime(Number(e.target.value))}
          />
        </div>
        <div>
          <label>{run}</label>
          <input
            type="number"
            value={runTime}
            onChange={(e) => setRunTime(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <h2>
          {totalTimeLabel}: {totalTime} mins
        </h2>
      </div>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition mt-6">
        {calculate}
      </button>
    </div>
  );
}
