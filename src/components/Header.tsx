'use client';

import { useTranslations } from '@/hooks/useTranslations';
import Link from 'next/link';
import { useState } from 'react';
import { EmptyState } from './EmptyState';
import { ErrorDisplay } from './ErrorDisplay';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translations, error } = useTranslations('header');

  if (error) return <ErrorDisplay message={error} />;
  if (!translations) return <EmptyState />;

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          {translations.welcome}
        </Link>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
        <nav
          className={`lg:flex space-x-6 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:gap-12">
            <li>
              <Link href="/" className="hover:underline">
                {translations.home}
              </Link>
            </li>
            <li>
              <Link href="/race-pacing" className="hover:underline">
                {translations.racePacing}
              </Link>
            </li>
            <li>
              <Link href="/transitions" className="hover:underline">
                {translations.transitions}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
