'use client';

import Card from '@/components/Card';
import { useTranslations } from '@/hooks/useTranslations';

export default function Home() {
  const { translations, error } = useTranslations('home');

  if (error) return <div>Error loading translations: {error}</div>;
  if (!translations) return '';

  return (
    <>
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
            description="Checklist para la carrera"
            link="/checklist"
          />
        </div>
      </main>
    </>
  );
}
