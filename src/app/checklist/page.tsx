'use client';

import { EmptyState } from '@/components/EmptyState';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { useTranslations } from '@/hooks/useTranslations';

export default function Checklist() {
  const { translations, error } = useTranslations('checklist');

  if (error) return <ErrorDisplay message={error} />;
  if (!translations) return <EmptyState />;

  const { title, intro, items, save } = translations;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 text-center">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-center max-w-3xl mb-6">{intro}</p>

      <ul className="list-disc space-y-2 mb-6 max-w-xl mx-auto">
        {items.map((item: string, index: number) => (
          <li key={index} className="text-base sm:text-lg">
            {item}
          </li>
        ))}
      </ul>

      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300">
        {save}
      </button>
    </div>
  );
}
