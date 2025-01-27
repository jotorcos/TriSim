'use client';

import { getTranslations } from '@/lib/i18n';
import { useState } from 'react';

export default function Checklist() {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations('checklist');
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

  const { title, intro, item1, item2, item3, item4, item5, save } =
    translations;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{title}</h1>
      <p className="text-lg text-center max-w-lg mb-6">{intro}</p>
      <ul className="list-disc mb-6">
        <li>{item1}</li>
        <li>{item2}</li>
        <li>{item3}</li>
        <li>{item4}</li>
        <li>{item5}</li>
      </ul>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition">
        {save}
      </button>
    </div>
  );
}
