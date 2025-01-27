'use client';

import { getTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  link: string;
}

export default function Card({ title, description, link }: CardProps) {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations('card');
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col sm:flex-row sm:space-x-4">
      <div className="sm:w-1/3">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="mb-4">{description}</p>
        <a href={link} className="text-blue-600 hover:underline">
          {translations.learnMore}
        </a>
      </div>
    </div>
  );
}
