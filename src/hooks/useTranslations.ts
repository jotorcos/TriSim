import { getTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export function useTranslations(key: string) {
  const [translations, setTranslations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await getTranslations(key);
        setTranslations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
    loadTranslations();
  }, [key]);

  return { translations, error };
}
