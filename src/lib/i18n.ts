export async function getTranslations(page: string, locale?: string) {
  // Default to Spanish (es) if no locale is provided
  const currentLocale = locale || 'es';

  const response = await fetch(`/locales/${currentLocale}.json`);
  if (!response.ok) {
    throw new Error(
      `Failed to load translation file for locale "${currentLocale}".`
    );
  }

  const translations = await response.json();

  if (!translations[page]) {
    console.error('Available translations:', translations); // Debugging output
    throw new Error(`Translations for page "${page}" not found.`);
  }

  return translations[page];
}
