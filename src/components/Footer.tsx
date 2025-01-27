'use client';

import { getTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations('footer');
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
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <p className="text-center lg:text-left">{translations.footerText}</p>
        <a href="/contact" className="hover:underline">
          {translations.contact}
        </a>
      </div>
    </footer>
  );
}
