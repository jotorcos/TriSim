'use client';

import { getTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function Transitions() {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations('transitions');
        setTranslations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
    loadTranslations();
  }, []);

  if (error) {
    return <div>Error loading translations: {error}</div>;
  }

  if (!translations) return <div>Loading...</div>;

  const { title, intro, t1, t2, practiceNow } = translations;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{title}</h1>
      <p className="text-lg text-center max-w-lg mb-6">{intro}</p>
      <div className="mb-6">
        <h2>{t1}</h2>
        <h2>{t2}</h2>
      </div>
      <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition">
        {practiceNow}
      </button>
    </div>
  );
}
