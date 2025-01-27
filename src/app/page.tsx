'use client';

import { getTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function Home() {
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    async function loadTranslations() {
      const data = await getTranslations('home');
      setTranslations(data);
    }
    loadTranslations();
  }, []);

  if (!translations) return <div>Loading...</div>;

  const { welcome, intro, start, learnMore } = translations;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{welcome}</h1>
      <p className="text-lg text-center max-w-lg mb-6">{intro}</p>
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition">
          {start}
        </button>
        <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition">
          {learnMore}
        </button>
      </div>
    </div>
  );
}
