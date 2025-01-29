'use client';

import { useTranslations } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function Footer() {
  const { translations, error } = useTranslations('footer');

  if (error) return <div>Error loading translations: {error}</div>;
  if (!translations) return '';

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <p className="text-center lg:text-left">{translations.footerText}</p>
        <Link href="/contact" className="hover:underline">
          {translations.contact}
        </Link>
      </div>
    </footer>
  );
}
