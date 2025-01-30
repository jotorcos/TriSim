'use client';

import { useTranslations } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function Transitions() {
  const { translations, error } = useTranslations('transitions');

  if (error) return <div>Error loading translations: {error}</div>;
  if (!translations) return '';

  const { title, intro, t1, t2 } = translations;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-center max-w-3xl mb-6">{intro}</p>

      <div className="w-full max-w-md space-y-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Link href="transitions/t1" className="text-xl font-semibold">
            {t1}
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Link href="transitions/t2" className="text-xl font-semibold">
            {t2}
          </Link>
        </div>
      </div>
    </div>
  );
}
