'use client';

import { getTranslations } from '@/lib/i18n';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations('header');
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
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">{translations.welcome}</h1>
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
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <li>
              <Link href="/" className="hover:underline">
                {translations.home}
              </Link>
            </li>
            <li>
              <Link href="/racePacing" className="hover:underline">
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
