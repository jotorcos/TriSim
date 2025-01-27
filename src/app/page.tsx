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

  const { welcome, intro, start, learnMore, racePacing, transitions } =
    translations;

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">{welcome}</h1>
        <p className="text-lg text-center max-w-lg mb-6">{intro}</p>

        <div className="flex gap-4 mb-10">
          <Card
            title={racePacing}
            description="Learn about race pacing strategies."
            link="/racePacing"
          />
          <Card
            title={transitions}
            description="Master the transitions for a smooth triathlon."
            link="/transitions"
          />
        </div>
        <div className="flex gap-4">
          <a href="/start">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition">
              {start}
            </button>
          </a>
          <a href="/learn-more">
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition">
              {learnMore}
            </button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
