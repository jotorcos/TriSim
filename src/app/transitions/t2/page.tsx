'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function TransitionT2() {
  const { translations, error } = useTranslations('transitions');

  if (error) return <div>Error loading translations: {error}</div>;
  if (!translations) return <div>Loading...</div>;

  const { title, intro, t1, t2, practiceNow } = translations;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center">
        {t2}
      </h1>
      <button className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300">
        {practiceNow}
      </button>
    </div>
  );
}
