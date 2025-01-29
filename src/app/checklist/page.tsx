'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function Checklist() {
  const { translations, error } = useTranslations('checklist');

  if (error) return <div>Error loading translations: {error}</div>;
  if (!translations) return <div>Loading...</div>;

  const { title, intro, item1, item2, item3, item4, item5, save } =
    translations;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-center max-w-3xl mb-6">{intro}</p>

      <ul className="list-disc space-y-2 mb-6 max-w-xl mx-auto">
        <li className="text-base sm:text-lg">{item1}</li>
        <li className="text-base sm:text-lg">{item2}</li>
        <li className="text-base sm:text-lg">{item3}</li>
        <li className="text-base sm:text-lg">{item4}</li>
        <li className="text-base sm:text-lg">{item5}</li>
      </ul>

      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300">
        {save}
      </button>
    </div>
  );
}
