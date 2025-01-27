'use client';

import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function Home() {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations('home');
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
    <>
      <Header />
      <main className="px-4 py-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">{translations.welcome}</h2>
        <p className="mb-8">{translations.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title={translations.racePacing}
            description="Calcula tu estrategia"
            link="/racePacing"
          />
          <Card
            title={translations.transitions}
            description="Practica tus transiciones"
            link="/transitions"
          />
          <Card
            title={translations.checklist}
            description="Lista de verificación para la carrera"
            link="/checklist"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
